package  loanapplications.spring.controllers;


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
@RequestMapping("/api/users")
public class UserAPIController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil; // JWT Utility for generating tokens

    // Function to register customers
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> createNewAccount(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        // Validate email and contact
        if (userService.existsByEmail(user.getEmail())) {
            response.put("success", false);
            response.put("message", "User with this email already exists");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        if (userService.existsByContact(user.getContact())) {
            response.put("success", false);
            response.put("message", "User with this phone number already exists");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        userService.createUser(user);
        String userToken = jwtUtil.generateToken(user.getEmail()); // Generate JWT token

        response.put("success", true);
        response.put("data", user);
        response.put("token", userToken);
        response.put("message", "Account created successfully");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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

