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

    // 1. Apply for a loan
    @PostMapping("/apply")
    public ResponseEntity<Map<String, Object>> applyForLoan(@RequestBody LoanApplication loanApplication,
                                                            @AuthenticationPrincipal UserDetails userDetails) {
        return loanApplicationService.applyForLoan(loanApplication, userDetails);
    }

    // 2. Show loan status by loanId
    @GetMapping("/{loanId}")
    public ResponseEntity<Map<String, Object>> getLoanStatus(@PathVariable Long loanId) {
        return loanApplicationService.getLoanStatus(loanId);
    }

    // 3. Update a loan by loanId
    @PutMapping("/{loanId}")
    public ResponseEntity<Map<String, Object>> updateLoan(@PathVariable Long loanId,
                                                          @RequestBody LoanApplication updatedLoanApplication) {
        return loanApplicationService.updateLoan(loanId, updatedLoanApplication);
    }

    // 4. Get all loan applications by customerId
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<LoanApplication>> getCustomerLoanApplications(@PathVariable Long customerId) {
        return loanApplicationService.getCustomerLoanApplications(customerId);
    }
}
