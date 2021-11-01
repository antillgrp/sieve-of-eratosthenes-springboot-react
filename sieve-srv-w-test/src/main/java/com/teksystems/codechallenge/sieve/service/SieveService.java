package com.teksystems.codechallenge.sieve.service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.teksystems.codechallenge.sieve.model.SieveResult;

@Service
public class SieveService {

    //input: an integer n > 1.
    public SieveResult getSieveResult(int n) {

        //TODO validate n

        List<Integer> primes = new ArrayList<>();
        List<List<Integer>> multiplesLists = new ArrayList<>();

        //let A be an array of Boolean values, indexed by integers 2 to n
        int [] primeCandidates = new int[n + 1];
        primeCandidates[0]=primeCandidates[1]=-1;
        for (int i = 2; i < n + 1 ; i++) primeCandidates[i] = i;

        //for i = 2, 3, 4, ..., not exceeding √n do
        for(int i = 2; i < Math.sqrt(n); i++){

            List<Integer> iMultiples = new LinkedList<>();

            //if A[i] is true
            if(primeCandidates[i] > 0){
                iMultiples.add(primeCandidates[i]);
                //for j = i2, i2+i, i2+2i, i2+3i, ..., not exceeding n do
                for (int c = 1, j = i*i; j < n + 1; j = i*i + (c++)*i){

                    iMultiples.add(Math.abs(primeCandidates[j]));
                    //A[j] := false
                    if(primeCandidates[j] > 0) primeCandidates[j] *= -1;
                }
            }
            multiplesLists.add(iMultiples);
        }

        for (int i : primeCandidates) if(i > 0) primes.add(i);

        return new SieveResult(n, primes, multiplesLists);
	}
}
