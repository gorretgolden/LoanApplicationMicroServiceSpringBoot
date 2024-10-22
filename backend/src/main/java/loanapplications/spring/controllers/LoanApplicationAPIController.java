// package loanapplications.spring.controllers;

// import loanapplications.spring.models.LoanApplication;
// import loanapplications.spring.models.User;
// import loanapplications.spring.repositories.LoanApplicationRepository;
// import loanapplications.spring.repositories.UserRepository;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import jakarta.validation.Valid; // Or javax.validation.Valid;

// import loanapplications.spring.models.LoanStatus;

// @RestController
// @RequestMapping("/api/loanApplications")
// public class LoanApplicationAPIController {

//     private final LoanApplicationRepository loanApplicationRepository;
//     private final UserRepository userRepository;

//     public LoanApplicationAPIController(LoanApplicationRepository loanApplicationRepository, UserRepository userRepository) {
//         this.loanApplicationRepository = loanApplicationRepository;
//         this.userRepository = userRepository;
//     }

//     // Show user's loan applications
//     @GetMapping("/customer/{customerId}")
//     public ResponseEntity<?> customerLoanApplications(@PathVariable Long customerId) {
//         User customer = userRepository.findById(customerId).orElse(null);

//         if (customer == null) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
//         }

//         List<LoanApplication> customerLoanApplications = loanApplicationRepository.findByCustomerIdOrderByIdDesc(customerId);

//         if (!customerLoanApplications.isEmpty()) {
//             return ResponseEntity.ok().body(customerLoanApplications);
//         } else {
//             return ResponseEntity.ok().body("You have not applied for any loan.");
//         }
//     }

//     // Create a new loan application
//     @PostMapping
//     public ResponseEntity<?> apply(@Valid @RequestBody LoanApplication loanApplication) {
//         User customer = userRepository.findById(loanApplication.getCustomer().getId()).orElse(null);

//         if (customer == null) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
//         }

//         // Check for pending applications
//         if (loanApplicationRepository.existsByCustomerIdAndStatus(loanApplication.getCustomer().getId(), LoanStatus.PENDING)) {
//             return ResponseEntity.status(HttpStatus.CONFLICT).body("You have a pending loan application.");
//         }

//         loanApplication.setStatus(LoanStatus.PENDING);
//         loanApplicationRepository.save(loanApplication);

//         return ResponseEntity.status(HttpStatus.CREATED).body("Loan Application submitted successfully.");
//     }

//     // View the loan application status
//     @GetMapping("/{id}")
//     public ResponseEntity<?> showLoanStatus(@PathVariable Long id) {
//         LoanApplication loanApplication = loanApplicationRepository.findById(id).orElse(null);

//         if (loanApplication == null) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The loan application ID doesn't exist.");
//         }

//         return ResponseEntity.ok().body(loanApplication);
//     }

//     // Update the loan application
//     @PutMapping("/{id}")
//     public ResponseEntity<?> updateLoan(@PathVariable Long id, @RequestBody LoanApplication updatedApplication) {
//         LoanApplication loanApplication = loanApplicationRepository.findById(id).orElse(null);

//         if (loanApplication == null) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The loan application ID doesn't exist.");
//         }

//         // Only allow updates for pending loans
//         if (loanApplication.getStatus() != LoanStatus.PENDING) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Approved and rejected loans can't be updated.");
//         }

//         if (updatedApplication.getLoanAmount() > 0) {
//             loanApplication.setLoanAmount(updatedApplication.getLoanAmount());
//         }
//         if (updatedApplication.getRepaymentPeriod() > 0) {
//             loanApplication.setRepaymentPeriod(updatedApplication.getRepaymentPeriod());
//         }
//         if (updatedApplication.getLoanPurpose() != null) {
//             loanApplication.setLoanPurpose(updatedApplication.getLoanPurpose());
//         }

//         loanApplicationRepository.save(loanApplication);
//         return ResponseEntity.ok().body("Loan application updated successfully.");
//     }
// }
