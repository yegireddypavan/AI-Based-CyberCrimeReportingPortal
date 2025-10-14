package com.example.CyberCrime.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
        System.out.println("✅ Email sent successfully to " + to);
    }

    public void sendReportToAuthority(String complaint, String userEmail) {
        String authorityEmail = "ashubavireddy@gmail.com"; // replace with actual email later
        String subject = "🚨 New Cyber Crime Report Submitted";
        String body = "User Email: " + userEmail + "\n\nComplaint Details:\n" + complaint;
        sendEmail(authorityEmail, subject, body);
    }

    public void sendAcknowledgmentToUser(String userEmail, String complaint) {
        String subject = "🛡️ Cyber Crime Complaint Acknowledgment";
        String body = "Dear User,\n\nYour complaint has been successfully registered.\n"
                + "Our team will review and take appropriate action soon.\n\n"
                + "Complaint Summary:\n" + complaint + "\n\n"
                + "Regards,\nCyber Crime Cell Support";
        sendEmail(userEmail, subject, body);
    }
}
