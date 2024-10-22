package loanapplications.spring.services;

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

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

 // Change the return type to Optional<User>
 public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
}

// Change the return type to Optional<User>
public Optional<User> findByContact(String contact) {
    return userRepository.findByContact(contact);
}

// Check if user exists by email
public boolean existsByEmail(String email) {
    return findByEmail(email).isPresent();
}

// Check if user exists by contact
public boolean existsByContact(String contact) {
    return findByContact(contact).isPresent();
}
}
