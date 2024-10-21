package loanapplications.spring.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import loanapplications.spring.models.User;
import loanapplications.spring.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    //function to register customers
    public Map<String, Object> registerUser(User user) {
        Map<String, Object> response = new HashMap<>();

        // Checking for a user with an existing email
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            response.put("success", false);
            response.put("message", "User with this email already exists");
            return response;
        }
        // Checking for a user with an existing contact number

        if (userRepository.findByContact(user.getContact()).isPresent()) {
            response.put("success", false);
            response.put("message", "User with this phone number already exists");
            return response;
        }

        //saving the password while its encrypted
        user.setPassword(passwordEncoder.encode(user.getPassword())); 

        //Saving the new user/customer
        userRepository.save(user);

        //Updating the reponse pbject
        response.put("success", true);
        response.put("data", user);
        response.put("message", "Account created successfully");
        return response;
    }

    //function to login a customer
    public Map<String, Object> loginUser(String email, String password) {
        Map<String, Object> response = new HashMap<>();

        //Checking if the email from the request exists in the db
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isEmpty()) {
            response.put("success", false);
            response.put("message", "Email address doesn't exist");
            return response;
        }

        //if user exists but with a wrong password from the request
        User user = existingUser.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid password");
            return response;
        }

        //Generating a token for the user
        String token = generateToken(user); 
        //Updating the reponse object
        response.put("success", true);
        response.put("token", token);
        response.put("data", user);
        response.put("message", "You successfully logged into your account");
        return response;
    }

    private String generateToken(User user) {
       
        return "token"; 
    }
}
