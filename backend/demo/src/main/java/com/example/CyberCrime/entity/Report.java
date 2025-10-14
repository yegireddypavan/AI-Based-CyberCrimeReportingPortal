package com.example.CyberCrime.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;        // original user input
    private String crimeType;   // classified by AI
    @Column(length = 2000)
    private String complaint;   // drafted complaint

    private LocalDateTime createdAt = LocalDateTime.now();
}
