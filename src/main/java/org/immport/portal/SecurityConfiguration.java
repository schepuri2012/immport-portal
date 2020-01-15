package org.immport.portal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.immport.core.configuration.SslConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@Import({ SslConfiguration.class })
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    /** The logger. */
    private static final Logger log = LoggerFactory.getLogger(SecurityConfiguration.class);


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // @formatter:off
    	http.authorizeRequests().antMatchers("/*").permitAll();
    }
    
    
    public SecurityConfiguration() {
        log.debug("Creating instance of class SecurityConfiguration");
    }
	
}
