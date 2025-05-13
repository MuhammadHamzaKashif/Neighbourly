package com.example.semesterProjectBackend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class SecurityContextPersistenceFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {

        // 1. Try to get existing session WITHOUT creating new one
        HttpSession session = request.getSession(false);

        // 2. Restore context if session exists and is valid
        if (session != null) {
            try {
                SecurityContext context = (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");
                if (context != null) {
                    SecurityContextHolder.setContext(context);
                    System.out.println("🔵 Restored context for session: " + session.getId());
                }
            } catch (IllegalStateException e) {
                System.out.println("⚠️ Session was invalidated - creating new one");
                session = request.getSession(true); // Create new session if old was invalid
            }
        }

        try {
            chain.doFilter(request, response);
        } finally {
            // 3. Only save context if authentication exists and session is valid
            SecurityContext context = SecurityContextHolder.getContext();
            if (context.getAuthentication() != null &&
                    context.getAuthentication().isAuthenticated() &&
                    !(context.getAuthentication() instanceof AnonymousAuthenticationToken)) {

                if (session == null) {
                    session = request.getSession(true);
                }

                try {
                    session.setAttribute("SPRING_SECURITY_CONTEXT", context);
                    System.out.println("🟢 Saved context to session: " + session.getId());
                } catch (IllegalStateException e) {
                    System.out.println("⚠️ Failed to save context - session invalidated");
                }
            }
        }
    }
}