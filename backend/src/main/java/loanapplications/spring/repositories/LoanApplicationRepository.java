package loanapplications.spring.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import loanapplications.spring.models.LoanApplication;
import loanapplications.spring.models.LoanStatus;
import loanapplications.spring.models.User;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    List<LoanApplication> findByCustomerIdOrderByIdDesc(Long customerId);
    LoanApplication findFirstByCustomerAndStatus(User customer, LoanStatus status);
    boolean existsByCustomerIdAndStatus(Long customerId, LoanStatus status);
    List<LoanApplication> findByCustomerIdAndStatus(Long customerId, LoanStatus status);
    List<LoanApplication> findByCustomerId(Long customerId);
}
