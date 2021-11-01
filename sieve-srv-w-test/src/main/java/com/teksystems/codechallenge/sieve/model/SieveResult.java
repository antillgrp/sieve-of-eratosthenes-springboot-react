package com.teksystems.codechallenge.sieve.model;

import java.util.List;

public class SieveResult {

    public final int n;
    public final List<Integer> primes;
    public final List<List<Integer>> multiplesLists;

    public SieveResult(
        int n,
        List<Integer> primes,
        List<List<Integer>> multiplesLists
    ) {
        this.n = n;
        this.primes = primes;
        this.multiplesLists = multiplesLists;
    }
}
