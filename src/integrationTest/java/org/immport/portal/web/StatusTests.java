package org.immport.portal.web;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gargoylesoftware.htmlunit.Page;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebResponse;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.core.env.Environment;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.htmlunit.webdriver.WebConnectionHtmlUnitDriver;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureJsonTesters
public class StatusTests {

    /** The logger. */
    private static final Logger log = LoggerFactory.getLogger(StatusTests.class);

    private static final String ADMIN_HEALTH_ENDPOINT = "/admin/health";

    private static final String ADMIN_HEALTH_ENDPOINT_STATUS = "UP";

    private static ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private Environment environment;

    @Autowired
    private JacksonTester<Map<String, Object>> jsonMap;

    private String immportPortalBaseUrl;

    private WebClient webClient;

    @Before
    public void setUp() {
        assertThat(environment).as("Object environment is null.").isNotNull();

        this.immportPortalBaseUrl = environment.getProperty("IMMPORT_PORTAL_BASE_URL");
        log.debug("immportPortalBaseUrl = " + immportPortalBaseUrl);
        assertThat(this.immportPortalBaseUrl).as("Object this.immportPortalBaseUrl is null.").isNotNull();

        WebConnectionHtmlUnitDriver webConnectionHtmlUnitDriver = new WebConnectionHtmlUnitDriver();
        this.webClient = webConnectionHtmlUnitDriver.getWebClient();
        assertThat(webClient).as("Object webClient is null.").isNotNull();
    }

    @Test
    public void testHealthEndpointWithoutBasicAuthentication() throws IOException {
        String url = this.immportPortalBaseUrl + ADMIN_HEALTH_ENDPOINT;
        log.debug("url = " + url);
        Page page = this.webClient.getPage(url);
        log.debug("page = " + page);
        WebResponse webResponse = page.getWebResponse();
        log.debug("webResponse = " + webResponse);
        String content = webResponse.getContentAsString();
        log.debug("content = " + content);
        @SuppressWarnings("unchecked")
        Map<String, Object> resultMap = (Map<String, Object>) objectMapper.readValue(content, Map.class);
        assertThat(this.jsonMap.write(resultMap)).hasJsonPathStringValue("@.status");
        assertThat(this.jsonMap.write(resultMap)).extractingJsonPathStringValue("@.status")
                .isEqualTo(ADMIN_HEALTH_ENDPOINT_STATUS);
    }

}
