package loanapplications.spring.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;

import loanapplications.spring.models.LoanApplication;
import loanapplications.spring.models.LoanStatus;
import loanapplications.spring.models.User;
import loanapplications.spring.repositories.LoanApplicationRepository;
import loanapplications.spring.repositories.UserRepository;

@Service
public class LoanApplicationService {

    @Autowired
    private LoanApplicationRepository loanApplicationRepository;

    @Autowired
    private UserRepository userRepository;

    // Applying  for a loan
    public ResponseEntity<Map<String, Object>> applyForLoan(LoanApplication loanApplication, UserDetails userDetails) {
        Map<String, Object> response = new HashMap<>();

        // Find user 
        Optional<User> userOptional = userRepository.findByName(userDetails.getUsername());

        if (!userOptional.isPresent()) {
            response.put("success", false);
            response.put("message", "User not found.");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userOptional.get();

        // Check for existing pending loan application for this user
        Optional<LoanApplication> existingLoan = loanApplicationRepository.findByCustomerIdAndStatus(user.getId(),"PENDING");

        if (existingLoan.isPresent()) {
            response.put("success", false);
            response.put("message", "You already have a pending loan application.");
            return ResponseEntity.badRequest().body(response);
        }

        loanApplication.setCustomer(user);
        loanApplication.setStatus(LoanStatus.PENDING);
        loanApplicationRepository.save(loanApplication);

        response.put("success", true);
        response.put("loanId", loanApplication.getId());
        response.put("status", loanApplication.getStatus());
        response.put("message", "Loan application submitted successfully.");
        return ResponseEntity.ok(response);
    }


    // Gettin a loan status by loanId
    public ResponseEntity<Map<String, Object>> getLoanStatus(Long loanId) {
        Map<String, Object> response = new HashMap<>();
        Optional<LoanApplication> loanApplication = loanApplicationRepository.findById(loanId);

        if (!loanApplication.isPresent()) {
            response.put("success", false);
            response.put("message", "Loan application not found.");
            return ResponseEntity.status(404).body(response);
        }

        response.put("success", true);
        response.put("loanDetails", loanApplication.get());
        return ResponseEntity.ok(response);
    }

    // Updating a loan by loan id
    public ResponseEntity<Map<String, Object>> updateLoan(Long loanId, LoanApplication updatedLoanApplication) {
        Map<String, Object> response = new HashMap<>();
        Optional<LoanApplication> loanApplication = loanApplicationRepository.findById(loanId);

        if (!loanApplication.isPresent()) {
            response.put("success", false);
            response.put("message", "Loan application not found.");
            return ResponseEntity.status(404).body(response);
        }

        LoanApplication existingLoan = loanApplication.get();
        existingLoan.setLoanAmount(updatedLoanApplication.getLoanAmount());
        existingLoan.setLoanPurpose(updatedLoanApplication.getLoanPurpose());
        existingLoan.setRepaymentPeriod(updatedLoanApplication.getRepaymentPeriod());

        loanApplicationRepository.save(existingLoan);
        response.put("success", true);
        response.put("message", "Loan application updated successfully.");
        response.put("loanDetails", existingLoan);
        return ResponseEntity.ok(response);
    }

    //Getting all loan applications for a specific customer
    public ResponseEntity<List<LoanApplication>> getCustomerLoanApplications(Long customerId) {
        List<LoanApplication> loanApplications = loanApplicationRepository.findByCustomerId(customerId);
        return ResponseEntity.ok(loanApplications);
    }
}
