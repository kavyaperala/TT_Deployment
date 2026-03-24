package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.model.Company;
import com.example.demo.model.Student;
import com.example.demo.repository.CompanyRepository;
import com.example.demo.repository.StudentRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/placement")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private CompanyRepository companyRepo;

    // Add Student
    @PostMapping("/student")
    public String addStudent(@RequestBody Student student) {
        studentRepo.addStudent(student);
        return "Student Added Successfully";
    }

    // Add Company
    @PostMapping("/company")
    public String addCompany(@RequestBody Company company) {
        companyRepo.addCompany(company);
        return "Company Added Successfully";
    }

    // Check Eligibility
    @PostMapping("/eligibility")
    public String checkEligibility(@RequestBody Student student,
                                   @RequestParam String companyName) {

        List<Company> companies = companyRepo.getAllCompanies();

        if (companies == null || companies.isEmpty()) {
            return "No companies available";
        }

        for (Company company : companies) {

            if (company.getCompanyName().equalsIgnoreCase(companyName)) {

                StringBuilder suggestions = new StringBuilder();
                List<String> missingSkills = new ArrayList<>();

                // ✅ Normalize student skills
                List<String> studentSkills = (student.getSkills() == null)
                        ? new ArrayList<>()
                        : student.getSkills().stream()
                            .map(s -> s.toLowerCase().trim())
                            .collect(Collectors.toList());

                // ✅ Normalize company skills
                List<String> companySkills = (company.getRequiredSkills() == null)
                        ? new ArrayList<>()
                        : company.getRequiredSkills().stream()
                            .map(s -> s.toLowerCase().trim())
                            .collect(Collectors.toList());

                // ✅ CGPA check
                if (student.getCgpa() < company.getMinCgpa()) {
                    suggestions.append("Improve CGPA to at least ")
                               .append(company.getMinCgpa()).append(". ");
                }

                // ✅ Backlog check
                if (student.getBacklogs() > company.getMaxBacklogs()) {
                    suggestions.append("Clear all backlogs. ");
                }

                // ✅ Skills check (FIXED)
                for (String skill : companySkills) {
                    if (!studentSkills.contains(skill)) {
                        missingSkills.add(skill);
                    }
                }

                if (!missingSkills.isEmpty()) {
                    suggestions.append("Learn skills: ")
                               .append(missingSkills).append(". ");
                }

                // ✅ Probability calculation
                int probability = 0;

                if (student.getCgpa() >= company.getMinCgpa()) {
                    probability += 40;
                }

                if (student.getBacklogs() <= company.getMaxBacklogs()) {
                    probability += 30;
                }

                if (missingSkills.isEmpty()) {
                    probability += 30;
                }

                // ✅ Final result
                if (suggestions.length() == 0) {
                    return student.getName() + " is ELIGIBLE for "
                            + company.getCompanyName()
                            + "\nSelection Probability: " + probability + "%"
                            + "\nMissing Skills: None";
                } else {
                    return student.getName() + " is NOT ELIGIBLE for "
                            + company.getCompanyName()
                            + "\nSelection Probability: " + probability + "%"
                            + "\nMissing Skills: " + missingSkills
                            + "\nSuggestions: " + suggestions;
                }
            }
        }

        return "Company not found";
    }
}