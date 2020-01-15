        var url;
        if (useLocalFileSystemForS3Data) {
        	url = "/getData?dataType=" + "hipcCenters";
        } else {
        	url = immportS3ApiBaseUrl + "/resources/portal/hipcCenters";
        }
    	var table = $('#hipcDataCenters');
    	var lastIdx = null;
    	$.ajax({
    		"url": url,
    		"type": "GET",
    		"dataType": "json",
    		"success": function(json) {
    			var dataSets = json;
    			
				    $('#hipcDataCenters').DataTable( {
    					"dom": 'Z<"row"<"col-sm-6 padding-left-0"l><"col-sm-6 padding-right-0"f>><"row"t><"row"<"col-sm-6 padding-left-0"i><"col-sm-6 padding-right-0"p>>',
   				    	"lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
   				    	"order": [[0,"desc"], [1,"desc"]],
				        "data": dataSets,
				        "columns": [
		                    { data: 'Data Center' },
		                    { data: 'Description' },
		                    { data: 'Project Dates' },
		                    { data: 'Shared Studies' }
		                ],
		                "columnDefs": [
				        	{
					        	   "targets": 0,
					        	   "width": "15%"
					           }, {
					        	   "targets": 1,
					        	   "width": "30%"
					           }, {
					        	   "targets": 2,
					        	   "width": "20%"
					           }, {
					        	   "targets": 3,
					        	   "width": "35%"
					           }
				        	],
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
    	