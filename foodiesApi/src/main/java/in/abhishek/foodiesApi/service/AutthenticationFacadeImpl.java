package in.abhishek.foodiesApi.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AutthenticationFacadeImpl implements AutthenticationFacade {
    @Override
    public Authentication getAuthentication() {
       return SecurityContextHolder.getContext().getAuthentication();
    }
}
