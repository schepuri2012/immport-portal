package org.immport.portal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.context.annotation.Bean;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import org.immport.core.properties.ApplicationProperties;
import org.immport.core.properties.DataQueryApiProperties;
import org.immport.core.properties.AuthenticationProperties;
import org.immport.core.properties.AuthorizationServerProperties;
import org.immport.core.properties.EcosystemProperties;
import org.immport.core.service.ApiAccessService;
import org.immport.core.service.TokenService;
import org.immport.core.service.impl.ApiAccessServiceImpl;
import org.immport.core.service.impl.TokenServiceImpl;
import org.immport.portal.properties.ImmPortPortalProperties;


@SpringBootApplication
@EnableConfigurationProperties
public class Application {

    /** The logger. */
    private static final Logger log = LoggerFactory.getLogger(Application.class);


    /*
     * Application Properties
     */
    @Bean
    @ConfigurationProperties(prefix = "immport.application", ignoreUnknownFields = false)
    ApplicationProperties applicationProperties() {
        return new ApplicationProperties();
    }


    /*
     * Ecosystem Properties
     */
    @Bean
    @ConfigurationProperties(prefix = "immport.ecosystem", ignoreUnknownFields = false)
    EcosystemProperties ecosystemProperties() {
        return new EcosystemProperties();
    }
    
    /*
     * Portal Properties
     */
    @Bean
    @ConfigurationProperties(prefix = "immport.portal", ignoreUnknownFields = false)
    ImmPortPortalProperties immPortPortalProperties() {
        return new ImmPortPortalProperties();
    }
    
    /*
     * Data Query API Properties
     */
    @Bean
    @ConfigurationProperties(prefix = "immport.data.query.api", ignoreUnknownFields = false)
    DataQueryApiProperties dataQueryApiProperties() {
    	return new DataQueryApiProperties();
    }
    
    /*
     * Authentication Properties
     */
    @Bean
    @ConfigurationProperties(prefix = "immport.authentication", ignoreUnknownFields = false)
    AuthenticationProperties authenticationProperties() {
        return new AuthenticationProperties();
    }   
    
    /*
     * Api Access Service
     */
    @Bean    
    ApiAccessService apiAccessService() {
        return new ApiAccessServiceImpl();
    }

    /*
     * Token Service
     */
    @Bean    
    TokenService tokenService() {
        return new TokenServiceImpl();
    }
    
    /*
     * Authorization Server Properties
     */
    @Bean
    @ConfigurationProperties(prefix = "immport.authorizationServer", ignoreUnknownFields = false)
    AuthorizationServerProperties authorizationServerProperties() {
        return new AuthorizationServerProperties();
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


}
