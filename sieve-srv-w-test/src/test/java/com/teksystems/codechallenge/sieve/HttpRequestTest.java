package com.teksystems.codechallenge.sieve;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import com.teksystems.codechallenge.sieve.model.SieveResult;
import com.teksystems.codechallenge.sieve.service.SieveService;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.Arrays;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class HttpRequestTest {

	@LocalServerPort
	private int port;

	@Autowired
	private SieveService service;

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	public void greetingShouldReturnDefaultMessage() throws Exception {

		assertThat(
			this.restTemplate.getForObject(
				"http://localhost:" + port + "/test",
				String.class
			)
		).contains("Sieve of Eratosthenes");

		SieveResult sr1 = this.service.getSieveResult(10);

		SieveResult sr2 = this.restTemplate.getForObject(
			"http://localhost:" + port + "/sieve/10",
			SieveResult.class
		);

		assertThat(sr1.primes)
		.isEqualTo(sr2.primes);

		assertThat(sr2.primes)
		.isEqualTo(
			new ArrayList<Integer>(
				Arrays.asList(new Integer[]{2,3,5,7})
			)
		);

		assertThat(sr1.multiplesLists)
		.isEqualTo(sr2.multiplesLists);
	}
}