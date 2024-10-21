package loanapplications.spring.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import loanapplications.spring.models.LoanApplication;

public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    List<LoanApplication> findByCustomerId(Long customerId);

    // Method to find loan applications by customer ID and order them by ID in descending order
     List<LoanApplication> findByCustomerIdOrderByIdDesc(Long customerId);
    boolean existsByCustomerIdAndStatus(Long customerId, String status);
}
