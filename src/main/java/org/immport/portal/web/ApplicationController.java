package org.immport.portal.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.apache.commons.compress.utils.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.immport.core.properties.DataQueryApiProperties;
import org.immport.core.properties.EcosystemProperties;
import org.immport.core.service.ApiAccessService;
import org.immport.portal.properties.ImmPortPortalProperties;
import org.json.JSONObject;


@Controller
public class ApplicationController {

    /** The logger. */
    private static final Logger log = LoggerFactory.getLogger(ApplicationController.class);

    @Autowired
    EcosystemProperties ecosystemProperties;
    
    @Autowired
    ImmPortPortalProperties immPortPortalProperties;

    @Autowired
   	ApiAccessService apiAccessService;
    
    @Autowired
    DataQueryApiProperties dataQueryApiProperties;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public void root(HttpServletResponse response) throws IOException {
        String homeUrl = ecosystemProperties.getHomeUrl();
        log.debug("redirecting to " + homeUrl);
        response.sendRedirect(homeUrl);
        return; 
    }


    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String home() {
        String viewName = "home";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/resources/mod", method = RequestMethod.GET)
    public String mod(HttpServletResponse response, Model model) throws IOException {
		try {
			String viewName = "mod";
		    log.debug("returning view " + viewName);
		    setresrcpgcnts("/resrcpgcnt/cntByPgmID?programIds=" + immPortPortalProperties.getModProgramIds(),model);
			return viewName;
		} catch(Exception exception) {
			 int statusCode = HttpServletResponse.SC_NOT_FOUND;
	         String errorMessage = exception.getMessage();
	         log.error("returning status code " + statusCode + " with error message " + errorMessage);
	         response.sendError(statusCode, errorMessage);
	         return null;
		}
    }  

    @RequestMapping(value = "/resources/tutorials", method = RequestMethod.GET)
    public String tutorials() {
        String viewName = "tutorials";
        log.debug("returning view " + viewName);
        return viewName;
    }  
    
    @RequestMapping(value = "/dataBrowserHelp", method = RequestMethod.GET)
    public String browserhelp() {
        String viewName = "dataBrowserHelp";
        log.debug("returning view " + viewName);
        return viewName;
    } 
    
    @RequestMapping(value = "/installAsperaHelp", method = RequestMethod.GET)
    public String installAspera() {
        String viewName = "installAsperaHelp";
        log.debug("returning view " + viewName);
        return viewName;
    }      
    
    @RequestMapping(value = "/agreement", method = RequestMethod.GET)
    public String agreement() {
        String viewName = "agreement";
        log.debug("returning view " + viewName);
        return viewName;
    }

    @RequestMapping(value = "/resources", method = RequestMethod.GET)
    public String resources() {
        String viewName = "resources";
        log.debug("returning view " + viewName);
        return viewName;
    }  
    
    @RequestMapping(value = "/resources/hipc", method = RequestMethod.GET)  
    public String hipc(HttpServletResponse response, Model model) throws IOException  { 
    		try {
    			String viewName = "hipc";
    		    log.debug("returning view " + viewName);
    		    setresrcpgcnts("/resrcpgcnt/cntByPgmID?programIds=" + immPortPortalProperties.getHipcProgramIds(),model);
    			return viewName;
    		} catch(Exception exception) {
    			 int statusCode = HttpServletResponse.SC_NOT_FOUND;
    	         String errorMessage = exception.getMessage();
    	         log.error("returning status code " + statusCode + " with error message " + errorMessage);
    	         response.sendError(statusCode, errorMessage);
    	         return null;
    		}
    	}
    
    @RequestMapping(value = "/resources/amp-ra-sle", method = RequestMethod.GET)
    public String amp_ra_sle(HttpServletResponse response, Model model) {
    	try {
    		String viewName = "amp-ra-sle";
    		log.debug("returning view " + viewName);
    		setresrcpgcnts("/resrcpgcnt/cntByPgmID?programIds=" + immPortPortalProperties.getAmpProgramIds(),model);
    		return viewName;
		} catch(Exception exception) {
			int statusCode = HttpServletResponse.SC_NOT_FOUND;
			String errorMessage = exception.getMessage();
			log.error("returning status code " + statusCode + " with error message " + errorMessage);
		//	response.sendError(statusCode, errorMessage);
			return null;
		}
    }
    
    @RequestMapping(value = "/resources/immtransplant", method = RequestMethod.GET)
    public String ttn() {
        String viewName = "immTransplant";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/resources/deeplearning", method = RequestMethod.GET)
    public String deeplearning() {
        String viewName = "deeplearning";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/resources/uh2-emory", method = RequestMethod.GET)
    public String uh2_emory() {
        String viewName = "uh2-emory";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/resources/uh2-yale", method = RequestMethod.GET)
    public String uh2_yale() {
        String viewName = "uh2-yale";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/privacyPolicy", method = RequestMethod.GET)
    public String privacyPolicy() {
        String viewName = "privacyPolicy";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/disclaimer", method = RequestMethod.GET)
    public String disclaimer() {
        String viewName = "disclaimer";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/accessibility", method = RequestMethod.GET)
    public String accessibility() {
        String viewName = "accessibility";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/cite", method = RequestMethod.GET)
    public String cite() {
        String viewName = "cite";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/about", method = RequestMethod.GET)
    public String about() {
        String viewName = "about";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/resources/fluVaccine", method = RequestMethod.GET)
    public String fluVaccine() {
        String viewName = "fluVaccine";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/resources/documentation", method = RequestMethod.GET)
    public String documentation() {
        String viewName = "documentation";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/dataUpload", method = RequestMethod.GET)     
    public String dataUpload() {
        String viewName = "dataUpload";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/resources/cytokineRegistry", method = RequestMethod.GET)     
    public String cytokineRegistry() {
        String viewName = "cytokineRegistry";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    
    @RequestMapping(value = "/overview", method = RequestMethod.GET)     
    public String overview() {
        String viewName = "overview";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/registration", method = RequestMethod.GET)     
    public String registration() {
        String viewName = "registration";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/resources/dataTemplates", method = RequestMethod.GET)     
    public String dataTemplates() {
        String viewName = "dataTemplates";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/navigation", method = RequestMethod.GET)     
    public String navigation() {
        String viewName = "navigation";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
    @RequestMapping(value = "/documentation/data/upload/validator", method = RequestMethod.GET)
    public String validator() {
        String viewName = "documentation/data/upload/validator";
        log.debug("returning view " + viewName);
        return viewName;
    }
    
	@RequestMapping(value = "/getData", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public @ResponseBody byte[] getDataFromFile(HttpServletResponse response, @RequestParam(value = "dataType") String dataType ) throws IOException {
		String localFilePath = ecosystemProperties.getLocalFileSystemPathForS3Data() + "/" + dataType + ".json";
	    try(InputStream in = new FileInputStream(localFilePath)){;
		    return IOUtils.toByteArray(in);
	    }	
	}
	
	private void setresrcpgcnts( String urlParm, Model model ) throws Exception {
		apiAccessService.getAccessToken();
		String returnResponse = apiAccessService.executeApiGet(dataQueryApiProperties.getBaseUrl(), urlParm);
		JSONObject obj = new JSONObject(returnResponse);
		Integer expMTechCnt = obj.getInt("measuretechcnt");
		Integer expSmplCnt = obj.getInt("expsmplcnt");
		Integer cntrctStudyCnt = obj.getInt("studycnt");
		Integer subjCnt = obj.getInt("subjectcnt");
		model.addAttribute("expMeasureTechCnt",expMTechCnt);
		model.addAttribute("expSmplCnt",expSmplCnt);
		model.addAttribute("contractStudyCnt",cntrctStudyCnt);
		model.addAttribute("subjectCnt",subjCnt);	
		
	}
	

}
