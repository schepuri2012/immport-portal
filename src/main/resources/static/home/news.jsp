<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<link rel="stylesheet" type="text/css" href="http://cdn.datatables.net/plug-ins/3cfcc339e89/integration/bootstrap/3/dataTables.bootstrap.css">
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/external/DataTables/DataTables-1.10.4/extensions/ColVis/css/dataTables.colVis.css" />" >
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/external/DataTables/DataTables-1.10.4/extensions/TableTools/css/dataTables.tableTools.css" />" >

<script src="<c:url value="/resources/external/DataTables/DataTables-1.10.4/media/js/jquery.dataTables.js" />" type="text/javascript"></script>
<script src="http://cdn.datatables.net/plug-ins/3cfcc339e89/integration/bootstrap/3/dataTables.bootstrap.js" type="text/javascript"></script>
<script src="<c:url value="/resources/external/DataTables/DataTables-1.10.4/extensions/dataTables.colResize.js" />" type="text/javascript"></script>
<script src="<c:url value="/resources/external/DataTables/DataTables-1.10.4/extensions/ColVis/js/dataTables.colVis.js" />" type="text/javascript"></script>
<script src="<c:url value="/resources/external/DataTables/DataTables-1.10.4/extensions/TableTools/js/dataTables.tableTools.js" />" type="text/javascript"></script>

<div class="row">
	<h2 style="margin-bottom:25px;">News</h2>
</div>
<div class="row">
    <div class="col-md-12">
     <table id="newsTable" class="table table-striped table-hover table-bordered table-condensed table-responsive">
        <thead>
            <tr>
                <th>Sort Date</th>
                <th>Date</th>
                <th>Description</th>
                <th>Link</th>
            </tr>
        </thead>
 
        <tfoot>
            <tr>
            	<th>Sort Date</th>
                <th>Date</th>
                <th>Description</th>
                <th>Link</th>
            </tr>
        </tfoot>
 
        <tbody>
       </tbody>
       </table>
    </div>
</div>

<div class="row">
        <h2 style="margin-bottom:25px;">Events</h2>
</div>
<div class="row" style="margin-bottom:30px;">
    <div class="col-md-12">
     <table id="eventsTable" class="table table-striped table-hover table-bordered table-condensed table-responsive">
        <thead>
            <tr>
                <th>Sort Date</th>
                <th>Date</th>
                <th>Name</th>
                <th>Title</th>
                <th>Location</th>
                <th>Presenter</th>
                <th>Link</th>
            </tr>
        </thead>
 
        <tfoot>
            <tr>
            	<th>Sort Date</th>
                <th>Date</th>
                <th>Name</th>
                <th>Title</th>
                <th>Location</th>
                <th>Presenter</th>
                <th>Link</th>
            </tr>
        </tfoot>
 
        <tbody>
       </tbody>
       </table>
    </div>
</div>

<script>
var CONTEXT_ROOT = '<%= request.getContextPath() %>';
var newsURL = CONTEXT_ROOT + '/resources/data/news.txt';
var eventsURL = CONTEXT_ROOT + '/resources/data/events.txt';
var newsTable = $('#newsTable');
var eventsTable = $('#eventsTable');
var lastIdx = null;

$().ready(function(){
	$.ajax({
		"url": newsURL,
		"type": "GET",
		"dataType": "text",
		"success": function(data) {
			var news = [];
			var lines = data.split("\n");
			var len = lines.length - 1;
	        for (var i = 1; i < len; i++) {
	        	  var record = lines[i].split("\t");
	        	  news.push(record);
	        }
			var dTable = newsTable.DataTable({
				"dom": 'Z<"row"<"col-sm-6"l><"col-sm-6"f>><"row"t><"row"<"col-sm-6"i><"col-sm-6"p>>',
				"order": [[0,"desc"]],
				"colResize": {
		            "handleWidth": 20
		        },
		        "columnDefs": [
		           {
		        	   "width": "0%",
		        	   "targets": 0,
		        	   "bVisible": false
		           },
		           {
		        	   "width": "20%",
		        	   "targets": 1,
		        	   "iDataSort": 0
		           },
		           {
		        	   "width": "75%",
		        	   "targets": 2,
		           },
		           {
		        	   "width": "5%",
		        	   "targets": 3,
		        	   "render": function(data,type,row) {
		        		   if (data != "") {
        	    	           	   return '<a href="' + data + '" target="_blank"><i class="fa fa-external-link fa-lg"><i></a>';
		        		   } else {
		        			   return "";
		        		   }
		        	   }
		           }
		        ],
				"lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
				"scrollX": false,
				"data": news
			});
			$('#newsTable tbody')
		    .on( 'mouseover', 'td', function () {
		        var colIdx = dTable.cell(this).index().column;

		        if ( colIdx !== lastIdx ) {
		            $( dTable.cells().nodes() ).removeClass( 'active' );
		            $( dTable.column( colIdx ).nodes() ).addClass( 'active' );
		        }
		    } )
		    .on( 'mouseleave', function () {
		        $( dTable.cells().nodes() ).removeClass( 'active' );
		    } );
		},
		"error": function() {
			var msg="News file is not available";
			$('#errorMsg').append(msg);	
		}	
	});
	
	$.ajax({
		"url": eventsURL,
		"type": "GET",
		"dataType": "text",
		"success": function(data) {
			var news = [];
			var lines = data.split("\n");
			var len = lines.length - 1;
	        for (var i = 1; i < len; i++) {
	        	  var record = lines[i].split("\t");
	        	  news.push(record);
	        }
			var dTable = eventsTable.DataTable({
				"dom": 'Z<"row"<"col-sm-6"l><"col-sm-6"f>><"row"t><"row"<"col-sm-6"i><"col-sm-6"p>>',
				"order": [[0,"desc"]],
				"colResize": {
		            "handleWidth": 20
		        },
		        "columnDefs": [
		           {
		        	   "width": "0%",
		        	   "targets": 0,
		        	   "bVisible": false
		           },
		           {
		        	   "width": "20%",
		        	   "targets": 1,
		        	   "iDataSort": 0
		           },
		           {
		        	   "width": "25%",
		        	   "targets": 2,
		           },
		           {
		        	   "width": "25%",
		        	   "targets": 3,
		           },
		           {
		        	   "width": "15%",
		        	   "targets": 4,
		           },
		           {
		        	   "width": "10%",
		        	   "targets": 5,
		           },
		           {
		        	   "width": "5%",
		        	   "targets": 6,
		        	   "render": function(data,type,row) {
		        		   if (data != "") {
        	    	           	   return '<a href="' + data + '" target="_blank"><i class="fa fa-external-link fa-lg"><i></a>';
		        		   } else {
		        			   return "";
		        		   }
		        	   }
		           }
		        ],
				"lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
				"scrollX": false,
				"data": news
			});
			$('#eventsTable tbody')
		    .on( 'mouseover', 'td', function () {
		        var colIdx = dTable.cell(this).index().column;

		        if ( colIdx !== lastIdx ) {
		            $( dTable.cells().nodes() ).removeClass( 'active' );
		            $( dTable.column( colIdx ).nodes() ).addClass( 'active' );
		        }
		    } )
		    .on( 'mouseleave', function () {
		        $( dTable.cells().nodes() ).removeClass( 'active' );
		    } );
		},
		"error": function() {
			var msg="Events file is not available";
			$('#errorMsg').append(msg);	
		}	
	});
});

</script>
