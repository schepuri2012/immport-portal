var table = $('#hipcDataSet');
    	var lastIdx = null;
        var url;
        if (useLocalFileSystemForS3Data) {
        	url = "/getData?dataType=" + "hipcStudies";
        } else {
        	url = immportS3ApiBaseUrl + "/resources/portal/hipcStudies";
        }
    	$.ajax({
    		"url": url,
    		"type": "GET",
    		"dataType": "json",
    		"success": function(json) {
    			var dataSets = json;
    			
				    $('#hipcDataSet').DataTable( {
    					"dom": 'Z<"row"<"col-sm-6 padding-left-0"l><"col-sm-6 padding-right-0"f>><"row"t><"row"<"col-sm-6 padding-left-0"i><"col-sm-6 padding-right-0"p>>',
   				    	"lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
   				    	"order": [[0,"desc"], [1,"desc"]],
				        "data": dataSets,
				        "columns": [
		                    { data: 'Supporting Data' },
		                    { data: 'Study Title' },
		                    { data: 'Num of Subjects' },
		                    { data: 'Experiment Measurement Techniques' },
		                    { data: 'Pis' },
		                    { data: 'Publications' },
		                    { data: 'Pubmed ID' }
		                ],
		                "columnDefs": [
				        	{
				                "targets": 0,
				                "render": function(data,type,row) {
				                	if (data.includes("SDY")) {
				                 	    return "<a target='_blank' href='" + sharedDataStudyDetailUrl + "/" + data + "'>" + data + "</a>";			      
				                	} else {
				                		return "";
				                	}
				                 }
				            },
				        	{
				        	   "targets": 6,
				        	   "render": function(data,type,row) {
				        		   var result = "";
				        		   if (data.includes(",")) {
				        			   var urls = data.split(",");
				        			   for (var i = 0; i < urls.length; i++) {
				        				   result = result + "<br>" + "<a target='_blank' href='" + "https://www.ncbi.nlm.nih.gov/pubmed/" + urls[i] + "'>" + urls[i] + "</a>";
				        			   }
				        			   return result;
				        		   } else {
				        			   return "<a target='_blank' href='" + "https://www.ncbi.nlm.nih.gov/pubmed/" + data + "'>" + data + "</a>";
				        		   }
				        		   
				               }
				           }],
				        "scrollX": true,
				        "scrollY": true,
				        "scrollY": "50vh",
				        "pageLength": 10
				    } );
    			
    		},
    		"error": function(error) {
    			console.log(error);		
    		}	
    	});
    	

    	
     