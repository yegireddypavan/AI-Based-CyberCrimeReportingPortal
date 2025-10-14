package com.example.CyberCrime.controller;

import com.example.CyberCrime.entity.Report;
import com.example.CyberCrime.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<Report> createReport(@RequestBody Map<String, String> body) {
        String text = body.get("text");
        String email = body.get("email");

        if (text == null || text.isEmpty() || email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            Report report = reportService.processAndSaveReport(email, text);
            return ResponseEntity.status(HttpStatus.CREATED).body(report);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }
}
