//This file is used to connect the frontend to the backend
package com.nba.nba_stats.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                // match your controller paths
                .addMapping("/api/**")
                // allow your React dev server
                .allowedOrigins("http://localhost:3000")
                // methods you need
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // if you need headers like Authorization
                .allowedHeaders("*")
                // expose any headers back to the client
                .exposedHeaders("Authorization")
                // whether cookies are supported
                .allowCredentials(true)
        ;
    }
}