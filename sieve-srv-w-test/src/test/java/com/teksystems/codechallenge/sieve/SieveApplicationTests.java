package com.teksystems.codechallenge.sieve;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.teksystems.codechallenge.sieve.controller.SieveRestController;

@SpringBootTest
class SieveApplicationTests {

	@Autowired
	private SieveRestController sieveRestController;

	@Test
	void contextLoads() {
		assertThat(sieveRestController).isNotNull();
	}

}
