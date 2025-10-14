package com.example.CyberCrime.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;

    // Store OTP with timestamp
    private final Map<String, OtpDetails> otpStorage = new ConcurrentHashMap<>();

    private static final int OTP_EXPIRATION_MINUTES = 5;

    // Generate and store OTP
    public String generateOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStorage.put(email, new OtpDetails(otp, LocalDateTime.now()));
        return otp;
    }

    // Send OTP Email
    public void sendOtpEmail(String email, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Your OTP - CyberCrime Reporting Portal");
            message.setText("Your One-Time Password (OTP) is: " + otp + "\n\nThis OTP is valid for 5 minutes.");

            mailSender.send(message);
            System.out.println("✅ OTP sent to: " + email);
        } catch (Exception e) {
            System.out.println("❌ Failed to send email: " + e.getMessage());
        }
    }

    // Validate OTP
    public boolean validateOtp(String email, String enteredOtp) {
        OtpDetails otpDetails = otpStorage.get(email);
        if (otpDetails == null) return false;

        // Check expiration
        if (otpDetails.timestamp.plusMinutes(OTP_EXPIRATION_MINUTES).isBefore(LocalDateTime.now())) {
            otpStorage.remove(email);
            return false;
        }

        // Check match
        boolean isValid = otpDetails.otp.equals(enteredOtp);
        if (isValid) {
            otpStorage.remove(email);

            // ✅ Send welcome email after successful OTP verification
            sendWelcomeEmail(email);
        }
        return isValid;
    }

    // Send Welcome Email
    private void sendWelcomeEmail(String email) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("🎉 Welcome to Cyber Crime Reporting Portal");
            message.setText(
                    "Dear User,\n\n"
                            + "Your email has been successfully verified!\n"
                            + "Welcome to the Cyber Crime Reporting Portal.\n\n"
                            + "You can now log in and file cyber crime complaints securely.\n\n"
                            + "Stay safe online,\n"
                            + "Cyber Crime Cell Team 🛡️"
            );
            mailSender.send(message);
            System.out.println("📩 Welcome email sent successfully to: " + email);
        } catch (Exception e) {
            System.out.println("❌ Failed to send welcome email: " + e.getMessage());
        }
    }

    // Inner class to hold OTP and time
    private static class OtpDetails {
        String otp;
        LocalDateTime timestamp;

        OtpDetails(String otp, LocalDateTime timestamp) {
            this.otp = otp;
            this.timestamp = timestamp;
        }
    }
}
