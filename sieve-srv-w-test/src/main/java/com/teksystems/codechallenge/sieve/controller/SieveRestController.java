package com.teksystems.codechallenge.sieve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teksystems.codechallenge.sieve.model.SieveResult;
import com.teksystems.codechallenge.sieve.service.SieveService;
import org.springframework.web.bind.annotation.ResponseBody;


@RestController
@RequestMapping("/")// ===> http://localhost:8080/
//@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SieveRestController {

    //@Autowired
    private SieveService sieveService;

    public SieveRestController(
        SieveService sieveService
    ){
        this.sieveService = sieveService;
    }

    @RequestMapping("/")
	public @ResponseBody String appName() {
		return "Sieve of Eratosthenes";
	}

    @GetMapping(path = "sieve/{n}", produces = "application/JSON")
    //@CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<SieveResult> getData(@PathVariable("n") int n) {

        //TODO validate input: an integer n > 1.
        //return new ResponseEntity<>(resL, HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(
            sieveService.getSieveResult(n),
            HttpStatus.OK
        );
    }

}
