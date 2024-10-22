package loanapplications.spring.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Disable CSRF for simplicity (not recommended for production)
            .authorizeRequests()
            .antMatchers("/api/auth/register", "/api/auth/login").permitAll() // Allow access to registration and login endpoints
            .anyRequest().authenticated(); // Require authentication for any other request
        
        return http.build();
    }

    
}
