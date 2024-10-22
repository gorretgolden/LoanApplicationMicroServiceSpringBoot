package loanapplications.spring.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import loanapplications.spring.models.User;
import loanapplications.spring.security.utils.JwtUtil;
import loanapplications.spring.services.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserAPIController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil; // using jwt  Utility for generating tokens

    // Function to register customers
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> createNewAccount(@RequestBody User user) {
        System.out.println("Received user: " + user.toString());
        Map<String, Object> response = new HashMap<>();

        // Validating required fields
        if (user.getName() == null || user.getName().isEmpty()) {
            response.put("success", false);
            response.put("message", "Name is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            response.put("success", false);
            response.put("message", "Email is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            response.put("success", false);
            response.put("message", "Password is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (user.getGender() == null || user.getGender().isEmpty()) {
            response.put("success", false);
            response.put("message", "Gender is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (user.getContact() == null || user.getContact().isEmpty()) {
            response.put("success", false);
            response.put("message", "Contact is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // Validating password length
        if (user.getPassword().length() < 8) {
            response.put("success", false);
            response.put("message", "Password must be at least 8 characters long");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // Validating contact length
        if (user.getContact().length() != 10) {
            response.put("success", false);
            response.put("message", "Contact must be exactly 10 digits long");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        //validating email and contact

        if (userService.existsByEmail(user.getEmail())) {
            response.put("success", false);
            response.put("message", "User with this email already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (userService.existsByContact(user.getContact())) {
            response.put("success", false);
            response.put("message", "User with this phone number already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {

            userService.createUser(user);
            String userToken = jwtUtil.generateToken(user.getEmail()); // Generating a JWT token

            response.put("success", true);
            response.put("data", user);
            response.put("token", userToken);
            response.put("message", "Account created successfully");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            //return ResponseEntity.ok(Map.of("message", "Request received", "user", user));
        }

    }

    // Function to login users
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<User> existingUserOpt = userService.findByEmail(email);

        if (!existingUserOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "Email address doesn't exist"));
        }

        User existingUser = existingUserOpt.get();
        if (!new BCryptPasswordEncoder().matches(password, existingUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", "Invalid password"));
        }

        String userToken = jwtUtil.generateToken(existingUser.getEmail()); // Generate JWT token

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", existingUser);
        response.put("token", userToken);
        response.put("message", "You successfully logged into your account");

        return ResponseEntity.ok(response);
    }
}
