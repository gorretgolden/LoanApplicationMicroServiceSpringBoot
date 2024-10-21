package loanapplications.spring.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import loanapplications.spring.models.LoanApplication;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    Optional<LoanApplication> findByCustomerIdAndStatus(Long customerId, String status);
    List<LoanApplication> findByCustomerId(Long customerId);
}
