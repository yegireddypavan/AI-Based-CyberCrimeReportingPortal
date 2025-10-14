package com.example.CyberCrime.controller;

import com.example.CyberCrime.entity.User;
import com.example.CyberCrime.repository.UserRepository;
import com.example.CyberCrime.service.EmailService;
import com.example.CyberCrime.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;

    // ✅ Step 1: Request OTP during registration
    @PostMapping("/register/request-otp")
    public String requestOtp(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return "User already exists!";
        }

        String otp = otpService.generateOtp(user.getEmail());
        otpService.sendOtpEmail(user.getEmail(), otp);

        return "OTP sent to your registered email!";
    }

    @PostMapping("/register/verify-otp")
    public String verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String role = request.getOrDefault("role", "USER"); // ✅ Default role = USER
        String otp = request.get("otp");

        if (otpService.validateOtp(email, otp)) {
            Optional<User> existingUser = userRepository.findByEmail(email);
            if (existingUser.isPresent()) {
                return "User already exists!";
            }

            User newUser = new User();
            newUser.setEmail(email);
            newUser.setPassword(passwordEncoder.encode(password));
            newUser.setRole(role); // ✅ Always set
            userRepository.save(newUser);

            return "Registration successful! Welcome email sent.";
        } else {
            return "Invalid or expired OTP!";
        }
    }


    // ✅ Normal login (no OTP)
    @PostMapping("/login")
    public String login(@RequestBody User loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return "Login successful!";
            }
        }
        return "Invalid email or password!";
    }
}
