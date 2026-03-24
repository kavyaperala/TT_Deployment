package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.model.Company;
import com.example.demo.model.Student;

public class EligibilityService {

    public List<String> checkEligibility(Student student, List<Company> companies) {

        List<String> eligibleCompanies = new ArrayList<>();

        for (Company company : companies) {

            if (student.getCgpa() >= company.getMinCgpa() &&
                student.getBacklogs() <= company.getMaxBacklogs()) {

                eligibleCompanies.add(company.getCompanyName());
            }
        }

        return eligibleCompanies;
    }
}