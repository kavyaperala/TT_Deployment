package com.example.demo;

import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Student;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/resume")
public class ResumeController {

    @PostMapping("/check")
    public String checkEligibility(@RequestBody Student student) {

        if (student.getName() == null || student.getSkills() == null) {
            return "Please fill all details properly";
        }

        double cgpa = student.getCgpa();
        List<String> skills = student.getSkills();

        List<String> requiredSkills = Arrays.asList("java", "sql", "spring boot");

        List<String> missingSkills = new ArrayList<>();

        for (String skill : requiredSkills) {
            if (!skills.contains(skill.toLowerCase())) {
                missingSkills.add(skill);
            }
        }

        int probability = 100 - (missingSkills.size() * 30);
        if (probability < 0) probability = 0;

        String result = student.getName() + " is ";

        if (cgpa >= 7 && missingSkills.isEmpty()) {
            result += "ELIGIBLE\n";
        } else {
            result += "NOT ELIGIBLE\n";
        }

        result += "Selection Probability: " + probability + "%\n";
        result += "Missing Skills: " + missingSkills;

        return result;
    }
}