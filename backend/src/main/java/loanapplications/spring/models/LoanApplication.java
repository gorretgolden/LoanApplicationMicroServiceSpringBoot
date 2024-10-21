package loanapplications.spring.models;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity // The class represents a table in the database
@Table(name = "loan_applications") // Used to define a table for the loan applications
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int loan_amount;
    private String loan_purpose;
    private int repayment_period;

    //Using the loan status enum
    @Enumerated(EnumType.STRING)
    private LoanStatus status;

    // One to many relationship between the user and loan applications
    @ManyToOne
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    private User customer;


	public LoanApplication() {

	}
 

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getLoanAmount() {
        return loan_amount;
    }

    public void setLoanAmount(int loan_amount) {
        this.loan_amount = loan_amount;
    }

    public String getLoanPurpose() {
        return loan_purpose;
    }

    public void setLoanPurpose(String loan_purpose) {
        this.loan_purpose = loan_purpose;
    }

    public int getRepaymentPeriod() {
        return repayment_period;
    }

    public void setRepaymentPeriod(int repayment_period) {
        this.repayment_period = repayment_period;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }
}
