package com.example.CyberCrime.controller;
import java.util.*;
import com.example.CyberCrime.service.EmailService;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private EmailService emailService;
    @GetMapping("/email")
    public String testEmail() {
        System.out.println("success"); // should print in console
        emailService.sendEmail("saibhargav_damarla@srmap.edu.in", "from pavan", "modda gudu");
        return "Email sent successfully!";
    }

}
