var table = $('#modDataCenters');
var url;
if (useLocalFileSystemForS3Data) {
	url = "/getData?dataType=" + "modCenters";
} else {
	url = immportS3ApiBaseUrl + "/resources/portal/modCenters";
}
    	var lastIdx = null;
    	$.ajax({
    		"url": url,
    		"type": "GET",
    		"dataType": "json",
    		"success": function(json) {
    			console.log(json);
    			var dataSets = json;
    			
				    $('#modDataCenters').DataTable( {
    					"dom": 'Z<"row"<"col-sm-6 padding-left-0"l><"col-sm-6 padding-right-0"f>><"row"t><"row"<"col-sm-6 padding-left-0"i><"col-sm-6 padding-right-0"p>>',
   				    	"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				        "data": dataSets,
				        "columns": [
		                    { data: 'Center Names' },
		                    { data: 'Center Themes' },
		                    { data: 'Center Studies' }
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
					        	   "width": "55%"
					           }
				        	]

				    } );
    			
    		},
    		"error": function(error) {
    			console.log(error);		
    		}	
    	});
    	