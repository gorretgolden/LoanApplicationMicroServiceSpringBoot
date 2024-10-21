package loanapplications.spring.services;

import loanapplications.spring.models.LoanApplication;
import loanapplications.spring.models.User;
import loanapplications.spring.repositories.LoanApplicationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

import loanapplications.spring.models.LoanStatus;

@Service
public class LoanApplicationService {

    @Autowired
    private LoanApplicationRepository loanApplicationRepository;

    //Function for loan applications
    public Map<String, Object> applyForLoan(LoanApplication loanApplication, User customer) {
        Map<String, Object> response = new HashMap<>();
        
        // Checking for an existing customer 
        if (customer == null) {
            response.put("success", false);
            response.put("message", "Customer not found.");
            return response;
        }
        
        // Checking for existing pending applications
        if (loanApplicationRepository.findByCustomerIdOrderByIdDesc(customer.getId()).stream()
                .anyMatch(app -> app.getStatus() == LoanStatus.PENDING)) {
            response.put("success", false);
            response.put("message", "You have a pending loan application.");
            return response;
        }

        // Setting the loan application  status
        loanApplication.setStatus(LoanStatus.PENDING);
        loanApplication.setCustomer(customer);
        
        // saving loan application
        loanApplicationRepository.save(loanApplication);

        response.put("success", true);
        response.put("loanId", loanApplication.getId());
        response.put("status", loanApplication.getStatus());
        response.put("message", "Your Loan Application has been submitted successfully.");
        return response;
    }
}
