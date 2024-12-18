package com.ERS.Java;

import java.io.IOException;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;

import com.ERS.Java.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;

public class UserLoginTest {
    ApplicationContext app;
    HttpClient webClient;
    ObjectMapper objectMapper;

    @BeforeEach
    public void setup() throws IOException, InterruptedException {
        String[] args = new String[] {};
        webClient = HttpClient.newHttpClient();
        objectMapper = new ObjectMapper();
        app = SpringApplication.run(EmployeeReimbursementSystemApplication.class, args);
        Thread.sleep(500);
    }

    @AfterEach
    public void tearDown() throws InterruptedException {
        Thread.sleep(500);
        SpringApplication.exit(app);
    }

/**
 * Tests the login functionality by creating a User object with predefined
 * username and password, and serializing it to a JSON string.
 * This test verifies if the User object can be successfully serialized.
 * 
 * @throws IOException if an I/O error occurs when sending or receiving
 * @throws InterruptedException if the operation is interrupted
 */

    @Test
    public void testLogin() throws IOException, InterruptedException {
        String json = "{\"userId\":0,\"firstName\":\"Hello\",\"lastName\":\"World\",\"username\":\"username1\",\"password\":\"password\",\"role\":\"Employee\"}";
        HttpRequest postRequest = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8080/login"))
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .header("Content-Type", "application/json")
                .build();
        HttpResponse<String> response = webClient.send(postRequest, HttpResponse.BodyHandlers.ofString());
        int status = response.statusCode();
        Assertions.assertEquals(200, status);
        ObjectMapper om = new ObjectMapper();
        User expectedResult = new User(9999, "Hello", "World", "username1", "password", "Employee", false);
        User actualResult = om.readValue(response.body().toString(), User.class);
        Assertions.assertEquals(expectedResult, actualResult);
    }
    
}
