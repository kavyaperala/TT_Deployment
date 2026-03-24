package com.example.demo.repository;

import com.example.demo.model.Company;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CompanyRepository {

    // ✅ IMPORTANT: Initialize the list
    private List<Company> companies = new ArrayList<>();

    // Add company
    public void addCompany(Company company) {
        companies.add(company);
    }

    // Get all companies
    public List<Company> getAllCompanies() {
        return companies;
    }
}