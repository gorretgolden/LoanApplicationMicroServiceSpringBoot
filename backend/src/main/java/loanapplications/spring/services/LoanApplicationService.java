package loanapplications.spring.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import loanapplications.spring.models.LoanApplication;
import loanapplications.spring.models.LoanStatus;
import loanapplications.spring.repositories.LoanApplicationRepository;

@Service
public class LoanApplicationService {

    @Autowired
    private LoanApplicationRepository loanApplicationRepository;

    public List<LoanApplication> getLoanApplicationsByCustomerIdAndStatus(Long customerId, LoanStatus status) {
        return loanApplicationRepository.findByCustomerIdAndStatus(customerId, status);
    }

    public List<LoanApplication> getLoanApplicationsByCustomerId(Long customerId) {
        return loanApplicationRepository.findByCustomerId(customerId);
    }
}

