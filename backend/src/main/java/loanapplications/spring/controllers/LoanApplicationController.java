package loanapplications.spring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import loanapplications.spring.models.LoanApplication;
import loanapplications.spring.services.LoanApplicationService;

@RestController
@RequestMapping("/api/loans")
public class LoanApplicationController {

    @Autowired
    private LoanApplicationService loanApplicationService;

    // Applying for a loan
    @PostMapping("/apply")
    public ResponseEntity<Map<String, Object>> applyForLoan(@RequestBody LoanApplication loanApplication,
                                                            @AuthenticationPrincipal UserDetails userDetails) {
        return loanApplicationService.applyForLoan(loanApplication, userDetails);
    }

    // Showing the loan status by loan id
    @GetMapping("/{loanId}")
    public ResponseEntity<Map<String, Object>> getLoanStatus(@PathVariable Long loanId) {
        return loanApplicationService.getLoanStatus(loanId);
    }

    // Updating  a loan by loan id
    @PutMapping("/{loanId}")
    public ResponseEntity<Map<String, Object>> updateLoan(@PathVariable Long loanId,
                                                          @RequestBody LoanApplication updatedLoanApplication) {
        return loanApplicationService.updateLoan(loanId, updatedLoanApplication);
    }

    // Getting all loan applications for the customer by customer if
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<LoanApplication>> getCustomerLoanApplications(@PathVariable Long customerId) {
        return loanApplicationService.getCustomerLoanApplications(customerId);
    }
}
