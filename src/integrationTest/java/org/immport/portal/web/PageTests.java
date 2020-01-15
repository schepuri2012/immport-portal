package org.immport.portal.web;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.TreeSet;

import com.gargoylesoftware.htmlunit.Page;
import com.gargoylesoftware.htmlunit.ScriptException;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebResponse;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.htmlunit.webdriver.WebConnectionHtmlUnitDriver;

@SpringBootTest
@RunWith(SpringRunner.class)
public class PageTests {

    /** The logger. */
    private static final Logger log = LoggerFactory.getLogger(PageTests.class);

    @Autowired
    private Environment environment;

    private String immportPortalBaseUrl;
    private Collection<String> validatedUrls = new TreeSet<String>();
    private Collection<String> errorMessages = new ArrayList<String>();

    @Before
    public void setUp() {
        assertThat(environment).as("Object environment is null.").isNotNull();

        this.immportPortalBaseUrl = environment.getProperty("IMMPORT_PORTAL_BASE_URL");
        log.debug("immportPortalBaseUrl = " + immportPortalBaseUrl);
        assertThat(this.immportPortalBaseUrl).as("Environment variable IMMPORT_PORTAL_BASE_URL must be set.")
                .isNotNull();

        /*
         * This resources pages /resources/hipc and /resources/mod call the
         * ImmPort Data Query API to obtain counts. Therefore, environment
         * variables IMMPORT_API_ACCESS_USERNAME and IMMPORT_API_ACCESS_USERNAME
         * must be set.
         */
        boolean apiAccessCredentialsSet = false;
        if ((environment.getProperty("IMMPORT_API_ACCESS_USERNAME") != null)
                && (environment.getProperty("IMMPORT_API_ACCESS_PASSWORD") != null)) {
            apiAccessCredentialsSet = true;
        }
        assertThat(apiAccessCredentialsSet)
                .as("Environment variables IMMPORT_API_ACCESS_USERNAME and IMMPORT_API_ACCESS_PASSWORD must be set.")
                .isTrue();
    }

    @Test
    public void testApplicationLinks() {
        /*
         * Validate the links on the pages that belong to this application
         * (starting with the Home Page)
         */
        String url = this.immportPortalBaseUrl + "/home";
        validatePageLinks(url, true, true);

        /*
         * Print the validated URLs
         */
        if (!validatedUrls.isEmpty()) {
            log.info("");
            log.info(">>> Validated URLs (" + validatedUrls.size() + ")");
            log.info("");
            for (String validatedUrl : validatedUrls) {
                log.info("Validated URL: " + validatedUrl);
            }
            log.info("");
        }

        /*
         * Print the error messages (if any)
         */
        if (!errorMessages.isEmpty()) {
            log.error("");
            log.error(">>> Error Messages (" + errorMessages.size() + ")");
            log.error("");
            for (String errorMessage : errorMessages) {
                log.error("Invalid URL: " + errorMessage);
            }
            log.error("");
        }
        assertThat(errorMessages.isEmpty())
                .as(errorMessages.size() + " of the " + validatedUrls.size()
                        + " validated URLs in this application were invalid.  Please see the log file for details.")
                .isTrue();
    }

    private void validatePageLinks(String url, boolean enableJavascript, boolean validateBodyLinks) {
        try {
            log.debug("url = " + url);
            /*
             * Create a new instance of WebConnectionHtmlUnitDriver / WebDriver
             */
            WebConnectionHtmlUnitDriver webConnectionHtmlUnitDriver = new WebConnectionHtmlUnitDriver(enableJavascript);
            WebClient webClient = webConnectionHtmlUnitDriver.getWebClient();
            WebDriver webDriver = (WebDriver) webConnectionHtmlUnitDriver;

            /*
             * Load the HTML page and validate the returned HTTP status code
             */
            Page page = webClient.getPage(url);
            WebResponse webResponse = page.getWebResponse();
            int statusCode = webResponse.getStatusCode();
            log.debug("statusCode = " + statusCode);
            if (statusCode != HttpStatus.OK.value()) {
                /*
                 * Add an error message to the collection of error messages to
                 * be printed at the end of the test
                 */
                errorMessages.add("URL " + url + " returned HTTP status code " + statusCode);

                /*
                 * Add the current URL to the collection of previously validated
                 * URLs
                 */
                validatedUrls.add(url);

                return;
            }

            /*
             * Add the current URL to the collection of previously validated
             * URLs
             */
            validatedUrls.add(url);

            /*
             * Check if this page is an HTML page (it could be a PDF file)
             */
            if (page.isHtmlPage()) {
                /*
                 * Check if the links inside the body of the page should be
                 * validated
                 */
                if (validateBodyLinks) {
                    /*
                     * Get the body element
                     */
                    WebElement bodyElement = webDriver.findElement(By.tagName("body"));
                    /*
                     * Get the anchor elements inside the body element
                     */
                    List<WebElement> anchors = bodyElement.findElements(By.tagName("a"));

                    /*
                     * Validate the anchor elements inside the body element
                     */
                    for (WebElement anchor : anchors) {
                        String anchorUrl = anchor.getAttribute("href");
                        /*
                         * Check if this anchor's URL has already been validated
                         */
                        if (!validatedUrls.contains(anchorUrl)) {
                            /*
                             * Only validate http://... and https://... URLs
                             */
                            if ((anchorUrl.startsWith("http:")) || (anchorUrl.startsWith("https:"))) {

                                if (anchorUrl.startsWith(immportPortalBaseUrl)) {
                                    /*
                                     * This URL is part of this application
                                     * 
                                     * Validate the page
                                     */
                                    validatePageLinks(anchorUrl, true, true);

                                } else {
                                    /*
                                     * This URL is NOT part of this application
                                     * 
                                     * Validate the page without enabling
                                     * JavaScript or validating links inside the
                                     * body
                                     */
                                    validatePageLinks(anchorUrl, false, false);
                                }
                            }
                        }
                    }
                }
            }
        } catch (ScriptException exception) {
            /*
             * This is a JavaScript exception. Simply ignore it.
             */
        } catch (Exception exception) {
            /*
             * Add an error message to the collection of error messages to be
             * printed at the end of the test
             */
            errorMessages.add("URL " + url + " threw exception " + exception.getClass().getName() + ": "
                    + exception.getMessage());

            /*
             * Add the current URL to the collection of previously validated
             * URLs
             */
            validatedUrls.add(url);

            return;
        }
    }

}