package loanapplications.spring.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import loanapplications.spring.models.User;


public  interface UserRepository extends JpaRepository<User, Long>{
    
    Optional<User> findByName(String name);
    Optional<User> findByEmail(String email);
    Optional<User> findByContact(String contact);

}