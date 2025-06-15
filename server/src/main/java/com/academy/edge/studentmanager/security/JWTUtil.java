package com.academy.edge.studentmanager.security;


import com.academy.edge.studentmanager.configs.ApplicationProperties;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class JWTUtil {
    private final ApplicationProperties applicationProperties;

    public String generateToken(UserDetails userDetails) {
        int oneDay = 1000 * 60 * 60 * 24;

        return JWT.create()
                .withSubject("User details")
                .withClaim("username", userDetails.getUsername())
                .withIssuedAt(Instant.now())
                .withIssuer("com.academy.edge.studentmanager")
                .withExpiresAt(Instant.now().plusMillis(oneDay))
                .sign(Algorithm.HMAC256(this.applicationProperties.jwtSecret()));

    }

    public String validateTokenAndRetrieveUsername(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC256(this.applicationProperties.jwtSecret()))
                .withSubject("User details")
                .withIssuer("com.academy.edge.studentmanager")
                .build();
        try {
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getClaim("username").asString();
        } catch (TokenExpiredException e) {
            return null;
        }
    }
}