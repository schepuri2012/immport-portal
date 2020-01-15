/*        var url = '/documentation/data/amp/AMP_studies.tsv';
    
    	var lastIdx = null;
    	
    	$().ready(function(){
    		$.ajax({
    			"url": url,
    			"type": "GET",
    			"dataType": "text",
    			"success": function(data) {
    				var dataSets = [];
    				var lines = data.split("\n");
    				var len = lines.length - 1;
    		        for (var i = 1; i < len-1; i++) {
    		        	  var record = lines[i].split("\t");
    		        	  dataSets.push(record);
    		        }
    		        
   				    $('#AmpDataSet').DataTable( {
    					"dom": 'Z<"row"<"col-sm-6 padding-left-0"l><"col-sm-6 padding-right-0"f>><"row"t><"row"<"col-sm-6 padding-left-0"i><"col-sm-6 padding-right-0"p>>',
   				    	"lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
   				    	"order": [[0,"desc"], [1,"desc"]],
				        "data": dataSets,
				        "scrollX": true,
				        "scrollY": true,
				        "scrollY": "50vh",
				        "pageLength": 10,
				        "columnDefs": [{
			                "targets": 0,
			                "render": function(data1,type,row) {
			                	if (data1.includes("SDY")) {
			                	 return "<a target='_blank' href='" + sharedDataStudyDetailUrl + "/" + data1 + "'>" + data1 + "</a>";
			                	} else {
			                		return "";
			                	}
			                 }
			            },
                         {
				        	   "targets": 5,
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
				           }]
				    } );

			
    				
    			},
    			"error": function() {
    				var msg="Data Sets file is not available";
    				alert(msg);
    			}	
    		});	
    		
    	}); */

		var table = $('#AmpDataSet');
        var url;
        if (useLocalFileSystemForS3Data) {
        	url = "/getData?dataType=" + "ampStudies";
        } else {
        	url = immportS3ApiBaseUrl + "/resources/portal/ampStudies";
        }
    	var lastIdx = null;
    	$.ajax({
    		"url": url,
    		"type": "GET",
    		"dataType": "json",
    		"success": function(json) {
    			var dataSets = json;
    			
				    $('#AmpDataSet').DataTable( {
    					"dom": 'Z<"row"<"col-sm-6 padding-left-0"l><"col-sm-6 padding-right-0"f>><"row"t><"row"<"col-sm-6 padding-left-0"i><"col-sm-6 padding-right-0"p>>',
   				    	"lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
   				    	"order": [[0,"desc"], [1,"desc"]],
				        "data": dataSets,
				        "columns": [
		                    { data: 'Supporting Data' },
		                    { data: 'Study Title' },
		                    { data: 'Num of Subjects' },
		                    { data: 'Pis' },
		                    { data: 'Publications' },
		                    { data: 'Pubmed ID' },
		                    { data: 'DOI' }
		                ],
		                "columnDefs": [{
			                "targets": 0,
			                "render": function(data1,type,row) {
			                	if (data1.includes("SDY")) {
			                	 return "<a target='_blank' href='" + sharedDataStudyDetailUrl + "/" + data1 + "'>" + data1 + "</a>";
			                	} else {
			                		return "";
			                	}
			                 }
			            },
                         {
				        	   "targets": 5,
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

