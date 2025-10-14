package com.example.CyberCrime.service;

import com.example.CyberCrime.entity.Report;
import com.example.CyberCrime.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service  // ✅ FIXED (you had '@Servicethis' typo)
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final EmailService emailService;

    public Report processAndSaveReport(String userEmail, String text) {

        // 1️⃣ Call FastAPI AI service (classification)
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> request = new HashMap<>();
        request.put("text", text);

        Map<String, String> response = restTemplate.postForObject(
                "http://localhost:8000/classify",
                request,
                Map.class
        );

        // 2️⃣ Extract classification result
        String crimeType = response != null ? response.getOrDefault("crime_type", "Unknown") : "Unknown";
        String complaint = response != null ? response.getOrDefault("complaint", text) : text;

        // 3️⃣ Save report to database
        Report report = Report.builder()
                .text(text)
                .crimeType(crimeType)
                .complaint(complaint)
                .createdAt(LocalDateTime.now())
                .build();

        reportRepository.save(report);

        // 4️⃣ Send notification emails
        emailService.sendReportToAuthority(complaint, userEmail);
        emailService.sendAcknowledgmentToUser(userEmail, complaint);

        return report;
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }
}
