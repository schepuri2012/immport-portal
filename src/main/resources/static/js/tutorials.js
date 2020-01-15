var tutConfig = tutConfig || {};
tutConfig.selected = "N"; // "A" apis "B" prog basics "G" galaxy "D" data analysis "C" curation "I" immport data
tutConfig.tutorial = "none"; // gets the panel id
tutConfig.tutSelected = "N";

var api_text = "<p>ImmPort Application Program Interfaces (APIs) can be used to query the Shared Data content, " +
		"and download result files. An exhaustive documentation can be found <a " +
		"href='" + immPortApiDocsUrl + "' target='_blank'>here</a>.</p>" +
		"<p>To learn more about ImmPort APIs the following tutorials are currently available:</p>" +
		"<ul>" +
		"  <li>Using the Query and File Download API</li>" +
		"  <a href='http://docs.immport.org/#python/QueryAndDownload.html' target='_blank'>HTML</a>&nbsp;--&nbsp;" +
		"  <a href='http://docs.immport.org/#python/QueryAndDownload.ipynb' target='_blank'>Jupyter Notebook</a><br /><br />" +
		"  <li>Multiple Methods for Downloading and Analyzing ImmPort Data</li>" +
		"  <a href='http://docs.immport.org/#python/MultipleDownloadMethods.html' target='_blank'>HTML</a>&nbsp;--&nbsp;" +
		"  <a href='http://docs.immport.org/#python/MultipleDownloadMethods.ipynb' target='_blank'>Jupyter Notebook</a><br/>" +
		"</ul>" +
		"<p>To learn more about Jupyter Notebook, have a look at the 'Basics of Programming' section.</p>",
	prog_basics_text = "<p>Useful links and tutorials exploring basics of programming, with a focus on Python, Jupyter Notebooks and R.</p>" +
			"<ul>" +
			  "<li>What is programming?</li>" +
			  "<a href='/documentation/data/tutorial/slides/what_is_programming.pptx' target='_blank'>Slides</a> -" +
			  "- <a href='/documentation/data/tutorial/what_is_programming.pdf' target='_blank'>PDF</a></li><br/><br/>" +
			  "<li>Python</li>" +
			  "<ul>" +
			"<li>Official Reference  - <a href='https://www.python.org/' target='_blank'>here</a> -- and " +
			"PEP8 <a href='https://www.python.org/dev/peps/pep-0008/' target='_blank'>standard</a></li>" +
			"<li>Conda package manager - <a href='https://conda.io/docs/' target='_blank'>Doc</a>&nbsp;--&nbsp;" +
			"<a href='https://conda.io/miniconda.html' target='_blank'>Install guide</a></li>" +
			"<li>Python basics - <a href='/documentation/data/tutorial/slides/programming_basics.pptx' target='_blank'>Slides</a>&nbsp;--&nbsp;" +
			  "<a href='/documentation/data/tutorial/programming_basics.pdf' target='_blank'>PDF</a>&nbsp;--&nbsp;" +
			  "<a href='/documentation/data/tutorial/notebooks/programming_basics.ipynb' target='_blank'>Jupyter notebook</a>&nbsp;--&nbsp;" +
			  "<a href='/documentation/data/tutorial/html/programming_basics.html' target='_blank'>HTML</a></li>" +
			"<li>Useful python libraries - <a href='https://pandas.pydata.org/' target='_blank'>Pandas</a>&nbsp;--&nbsp;" +
			  "<a href='http://scikit-learn.org/stable/' target='_blank'>scikit-learn</a></li>" +
			"</li>" +
			  "</ul>" +
			"For more Python examples, have a look at the notebooks in the Data analysis and Preparing Data Upload section.<br/><br/>" +
			  "<li>R</li>" +
			  "<ul>" +
			"<li>Official Reference  - <a href='https://www.r-project.org/' target='_blank'>here</a>&nbsp;--&nbsp;" +
			  "<a href='https://cran.r-project.org/' target='_blank'>CRAN</a> -- and Hadley Wickham's&nbsp;" +
			  "<a href='http://adv-r.had.co.nz/Style.html' target='_blank'>style guide.</a></li>" +
			"<li>Most bio-informatics libraries are available on <a href='https://www.bioconductor.org/' target='_blank'>BioConductor</a></li>" +
			"<li>Basics of R - One of <i>many</i>(!) good resources on R <a href='https://www.statmethods.net/' target='_blank'>here</a>.</li>" +
			"<li><a href='https://www.rstudio.com/' target='_blank'>RStudio</a> - interface to make R programming easier.</li>" +
			  "</ul><br/>" +
			  "<li>Jupyter Notebooks</li>" +
			  "<a href='http://jupyter.org/' target='_blank'>Jupyter</a> Notebooks can be used to develop and run (and re-run) code, and share " +
			  "work easily. Jupyter comes with a python kernel, but a <a href='https://github.com/jupyter/jupyter/wiki/Jupyter-kernels' target='_blank'>" +
			  "host</a> of other kernels including R are also available." +
			  "<ul>" +
			"<li>Install Jupyter notebook - <a href='http://jupyter.org/install.html' target='_blank'>Guide</a></li>" +
			"<li>Use Jupyter notebook - <a href='https://jupyter.readthedocs.io/en/latest/running.html#running' target='_blank'>Docs</a>&nbsp;--&nbsp;" +
			"<span class='vid youtube' title='https://www.youtube.com/watch?v=jZ952vChhuI' ytSrc='jZ952vChhuI'>Video</span></li>" +
			"<li>Install R kernel for Jupyter notebook - <span class='vid youtube' title='https://www.youtube.com/watch?v=SXBxKe8sK6I' ytSrc='SXBxKe8sK6I'>Video</a></li>" +
			  "</ul>" +
			"</ul>",
	data_upload_text = "<p>Uploading data to ImmPort doesn't have to be a challenge. Here are some resources to help you get started.</p>" +
				"<ul>" +
				"<li>ImmPort Data Model</li>" +
				"<a href='" + sharedDataUrl + "/dataModelDocumentation?table=study'}' target='_blank'>Table and Columns</a>&nbsp;--&nbsp;" +
				"<a href='" + dataUploadDataModelViewerUrl + "' target='_blank'>Data Model</a>&nbsp;--&nbsp;" +
				/*"<a href='http://www.immport.org/immport-open/public/schema/schemaDiagram/AllTables' target='_blank'>Entity-Relationship diagrams</a>&nbsp;--&nbsp;" +*/
				"<span class='vid youtube' title='https://www.youtube.com/watch?v=VzX6PH5MdEw' ytSRC='VzX6PH5MdEw'>Video</span>" +
				"<br /><br />" +
				  "<li>Upload Templates - " +
					"<span class='vid youtube' title='https://www.youtube.com/watch?v=Q5VoLFeY_Dk' ytSRC='Q5VoLFeY_Dk'>Video</span>&nbsp;--&nbsp;" +
				  "<a href='" + dataUploadTemplateListUrl + "' target='_blank'>List</a> -- " +
				"<a href='" + dataUploadTemplateDescriptionInteractiveUrl + "' target='_blank'>Documentation</a> -- " +
				"<a href='http://www.immport.org/downloads/data/upload/templates/ImmPort.Upload.Templates.Description.pdf' target='_blank'>PDF</a></li><br/>" +
				  "<li>Data Upload Process - " +
					"<a href='" + dataUploadUrl + "' target='_blank'>Documentation</a> -- " +  
					"<span class='vid youtube' title='https://www.youtube.com/watch?v=qCTRtRni2p4' ytSRC='qCTRtRni2p4'>Video</span>" + 
					"</li><br/>" +
				  "<li>Validate your templates before upload with the online ImmPort Validator - " +
				"<span class='vid youtube' title='https://www.youtube.com/watch?v=yEY_Mi9HiKE' ytSRC='yEY_Mi9HiKE'>Video</span></li><br/>" +
				  "<li>Upload Data to ImmPort - " +
				  "<span class='vid youtube' title='https://www.youtube.com/watch?v=yEY_Mi9HiKE' ytSRC='yEY_Mi9HiKE'>Video</span></li><br/>" +
				  "<li>Understand the ImmPort Private Data interface - " +
				  "<span class='vid youtube' title='https://www.youtube.com/watch?v=EpJoPGuMndo' ytSRC='EpJoPGuMndo'>Video</span></li><br/>" +
				  "<li>Curation notebooks</li>" +
				  "<ul>" +
				"<li>Change Dates to Study Days - <a href='/documentation/data/tutorial/notebooks/Curation_Notebook-Change_dates_to_Study_Day.ipynb' target='_blank'>Notebook</a> -" +
				"- <a href='/documentation/data/tutorial/html/Curation_Notebook-Change_dates_to_Study_Day.html' target='_blank'>HTML</a></li>" +
				"<li>Split and Transpose Multi-Sample files, one sample per row - " +
				"<a href='/documentation/data/tutorial/notebooks/Curation_Notebook-Split_and_Transpose_Multi-Sample_files-1_sample_per_row.ipynb' target='_blank'>Notebook</a> -" +
				"- <a href='/documentation/data/tutorial/html/Curation_Notebook-Split_and_Transpose_Multi-Sample_files-1_sample_per_row.html' target='_blank'>HTML</a></li>" +
				"<li>Split Multi-Sample files, one sample per row - " +
				"<a href='/documentation/data/tutorial/notebooks/Curation_Notebook-Split_Multi-Sample_files-1_sample_per_row.ipynb' target='_blank'>Notebook</a> -" +
				"- <a href='/documentation/data/tutorial/html/Curation_Notebook-Split_Multi-Sample_files-1_sample_per_row.html' target='_blank'>HTML</a></li>" +
				"<li>Split Multi-Sample files, many samples per row, many columns - " +
				"<a href='/documentation/data/tutorial/notebooks/Curation_Notebook-Split_Multi-Sample_files-many_samples_per_row_many_columns.ipynb' target='_blank'>Notebook</a> -" +
				"- <a href='/documentation/data/tutorial/html/Curation_Notebook-Split_Multi-Sample_files-many_samples_per_row_many_columns.html' target='_blank'>HTML</a></li>" +
				"<li>Split Multi-Sample files, many samples per row, one column - " +
				"<a href='/documentation/data/tutorial/notebooks/Curation_Notebook-Split_Multi-Sample_files-many_samples_per_row_1_column.ipynb' target='_blank'>Notebook</a> -" +
				"- <a href='/documentation/data/tutorial/html/Curation_Notebook-Split_Multi-Sample_files-many_samples_per_row_1_column.html' target='_blank'>HTML</a></li>" +
				"<li>Generate Map of Experiment Sample Accession to File Info ID from Upload Report - " +
				"<a href='/documentation/data/tutorial/notebooks/Curation_Notebook-Generate_Map_of_Experiment_Sample_Accession_to_File_Info_ID_From_Upload_Report.ipynb' target='_blank'>Notebook</a> -" +
				"- <a href='/documentation/data/tutorial/html/Curation_Notebook-Generate_Map_of_Experiment_Sample_Accession_to_File_Info_ID_From_Upload_Report.html' target='_blank'>HTML</a></li>" +
				"<li>Generate Map of Experiment Sample Accession to File Info ID  - " +
				"<a href='/documentation/data/tutorial/notebooks/Curation_Notebook-Generate_Map_of_Experiment_Sample_Accession_to_File_Info_ID.ipynb' target='_blank'>Notebook</a> -" +
				"- <a href='/documentation/data/tutorial/html/Curation_Notebook-Generate_Map_of_Experiment_Sample_Accession_to_File_Info_ID.html' target='_blank'>HTML</a></li>" +
				"<li>Compare lists - " +
				"<a href='/documentation/data/tutorial/notebooks/Curation_Notebook-Compare_lists.ipynb' target='_blank'>Notebook</a> -" +
				"- <a href='/documentation/data/tutorial/html/Curation_Notebook-Compare_lists.html' target='_blank'>HTML</a></li>" +
				"<li>Rename a list of files - " +
				"<a href='/documentation/data/tutorial/notebooks/Curation_Notebook-Rename_a_list_of_files.ipynb' target='_blank'>Notebook</a> -" +
				"- <a href='/documentation/data/tutorial/html/Curation_Notebook-Rename_a_list_of_files.html' target='_blank'>HTML</a></li>" +
				"<li>Replace user-defined IDs by ImmPort Accession - " +
				"<a href='/documentation/data/tutorial/notebooks/Curation_Notebook-Replace_user-defined_IDs_by_ImmPort_Accession.ipynb' target='_blank'>Notebook</a> -" +
				"- <a href='/documentation/data/tutorial/html/Curation_Notebook-Replace_user-defined_IDs_by_ImmPort_Accession.html' target='_blank'>HTML</a></li>" +
				"<li>Remove first few lines of file - " +
				"<a href='/documentation/data/tutorial/notebooks/Curation_Notebook-Remove_first_few_lines_of_file.ipynb' target='_blank'>Notebook</a> -" +
				"- <a href='/documentation/data/tutorial/html/Curation_Notebook-Remove_first_few_lines_of_file.html' target='_blank'>HTML</a></li>" +
				"<li>Convert SAS files to TSV - " +
				"<a href='/documentation/data/tutorial/notebooks/Curation_Notebook-Convert_SAS_files_to_TSV.ipynb' target='_blank'>Notebook</a> -" +
				"- <a href='/documentation/data/tutorial/html/Curation_Notebook-Convert_SAS_files_to_TSV.html' target='_blank'>HTML</a></li>" +
				  "</ul>" +
				"</ul>",
	data_analysis_text = "<p>You have data, now what? Here are some data analysis tutorials in Python and R based on ImmPort data.</p>" +
			"<ul>" +
				"<li>ImmPort Data - Lab tests and Assessment Exploration - SDY4</li>" + 
				"This tutorial goes through how to extract Assessment and Lab Test data from one ImmPort study, convert a long and narrow data structure to a short " +
				"and wide one, and display a particular set of results.<br />" + 
				"The analysis code is written in Python, using the popular pandas, matplotlib abd seaborn libraries." + 
				"<ul>" + 
				"<li>Analysis in Python, TSV input - <a href='/documentation/data/tutorial/notebooks/ExampleDataPreparationSDY4.ipynb' target='_blank'>Jupyter notebook</a> --" + 
				"<a href='/documentation/data/tutorial/html/ExampleDataPreparationSDY4.html' target='_blank'>HTML</a></li>" + 
				"</ul><br />" + 
				"<li>ImmPort Data - Flow Cytometry Derived Results Exploration - SDY736</li>" + 
				"This tutorial goes through how to obtain and analyze demographics and Flow Cytometry analysis derived data from one ImmPort " +
				"study, bringing together Subject information with FCS derived data.<br />" + 
				"The analysis code is written in Python, using the popular pandas, matplotlib abd seaborn libraries." + 
				"<ul>" + 
				"<li>Analysis in Python, TSV input - <a href='/documentation/data/tutorial/notebooks/ExploreSDY736.ipynb' target='_blank'>Jupyter notebook</a> --" + 
				"<a href='/documentation/data/tutorial/html/ExploreSDY736.html' target='_blank'>HTML</a></li>" + 
				"</ul><br />" + 

			  "<li>ImmPort Data - HAI data re-analysis - SDY212</li>" +
			  "This tutorial is an example of re-analysis of an Influenza Vaccine Response Study using HAI (hemagglutination inhibition) " +
			  "assays. The tutorial goes through how to acquire, analyze, and display the demographic and HAI assay data from one study in ImmPort.<br/>" +
			  "There are two versions of the analysis code, one written in R and the other in Python. Both versions complete the same analysis " +
			  "steps and render graphic summaries of the results. The analysis written in R can be run either on the MySQL version of the data download or on tab-separated formatted files." +
			  "<ul>" +
			"<li>Analysis in R, MySQL input - <a href='" + portalUrl + "/docs/reference/InfluenzaVaccination_SDY212_MySQL.html' target='_blank'>HTML</a> -- " +
			  "<a href='" + portalUrl + "/docs/reference/InfluenzaVaccination_SDY212_MySQL.R' target='_blank'>R Code</a> -- " +
			  "<a href='" + portalUrl + "/docs/reference/InfluenzaVaccination_SDY212_MySQL.Rmd' target='_blank'>R Markdown</a></li>" +
			"<li>Analysis in R, TSV input - <a href='" + portalUrl + "/docs/reference/InfluenzaVaccination_SDY212_Tab.html' target='_blank'>HTML</a> -- " +
			  "<a href='" + portalUrl + "/docs/reference/InfluenzaVaccination_SDY212_Tab.R' target='_blank'>R Code</a> -- " +
			  "<a href='" + portalUrl + "/docs/reference/InfluenzaVaccination_SDY212_Tab.Rmd' target='_blank'>R Markdown</a></li>" +
			"<li>Analysis in Python, TSV input - <a href='" + portalUrl + "/docs/reference/InfluenzaVaccination_SDY212_Tab-v2.2017.ipynb' target='_blank'>Jupyter notebook</a> -- " +
			  "<a href='" + portalUrl + "/docs/reference/InfluenzaVaccination_SDY212_Tab-v2.2017.html' target='_blank'>HTML</a></li>" +
			  "</ul><br />" +
			  
			  "<li>ImmPort Data - DeepLearning of Cytometry Data</li>" +
			  "This tutorial builds a tailored deep-learning model for CyTOF data to diagnosis latent Cytomegalovirus infection.<br/>" +
			  "Analysis in Python, TSV input - <a href='" + deepLearningCytometryDataUrl + "' target='_blank'> Jupyter notebook</a> -- <a href='/resources/deeplearning' target='_blank'> HTML</a><br/>" + 			  
			  "<br/>" +
			  
			  "<li>Exploratory Data Analysis Basics</li>" +
			  "There are a lot of resources online to learn more about Exploratory Data Analysis (EDA). Here are a select few:" +
			"<ul>" +
			  "<li>Exploratory Data Analysis with R, Roger Peng - <a href='https://leanpub.com/exdata' target='_blank'>book</a></li>" +
			  "<li>EDA in R, class by Roger Peng and Jeff Leak - <a href='https://www.coursera.org/learn/exploratory-data-analysis' target='_blank'>coursera</a></li>" +
			  "<li>Reproducible Data Analysis in Jupyter, Jake Vanderplas - " +
			  "<a href='https://www.youtube.com/channel/UCscdxGKSj4hOaVFYvslW1-g' target='_blank'>Videos</a> -- " +
			  "<a href='https://jakevdp.github.io/blog/2014/06/10/is-seattle-really-seeing-an-uptick-in-cycling/' target='_blank'>Article</a>" +
			  "</li>" +
			  "<li>A Complete Tutorial to Learn Data Science with Python from Scratch - " +
			  "<a href='https://www.analyticsvidhya.com/blog/2016/01/complete-tutorial-learn-data-science-python-scratch-2/' target='_blank'>Article</a></li>" +
			  "<li>Awesome Data Science. 2.0 Introduction to Pandas and Exploratory Data Analysis - " +
			  "<span class='vid youtube' title='https://www.youtube.com/watch?v=8TSPXB6yjNk' ytSRC='8TSPXB6yjNk'>Video</span></li>" +
			  "<li>Analyzing and Manipulating Data with Pandas - " +
			  "<span class='vid youtube' title='https://www.youtube.com/watch?v=0CFFTJUZ2dc' ytSrc='0CFFTJUZ2dc'>Video</span></li>" +
			"</ul>" +
			"</ul>",
	galaxy_text = "<p>Still missing the old ImmPort Data Analysis interface? Here are some tips that might help you get used to the new ImmPort Data Analysis platform, ImmPort Galaxy.</p>" +
			"<ul>" +
			  "<li>Navigating ImmPort Galaxy</li>" +
			  "ImmPort's Data Analysis platform is an instance of the Galaxy Project - more info <a href='https://galaxyproject.org/' target='_blank'>here</a>." +
			    "<ul>" +
			      "<li>ImmPort Galaxy FAQ - <a href='https://immportgalaxy.org/static/immportgalaxyhelp.html' target='_blank'>HTML</a></li>" +
			      "<li>Create an account - <span class='vid youtube' title='https://www.youtube.com/watch?v=nO8vIv8En9Y' ytSrc='nO8vIv8En9Y'>Video</span></li>" +
			      "<li>Upload files - <span class='vid youtube' title='https://www.youtube.com/watch?v=gfG6YdWyVNU' ytSrc='gfG6YdWyVNU'>Video</span></li>" +
			      "<li>More about files in Galaxy - <span class='vid youtube' title='https://www.youtube.com/watch?v=jjzALENv5gU' ytSrc='jjzALENv5gU'>Video</span></li>" +
			      "<li>Galaxy tool interface explained - <span class='vid youtube' title='https://www.youtube.com/watch?v=Rh-4tXTeX0g' ytSrc='h-4tXTeX0g'>Video</span></li>" +
			      "<li>Create a dataset collection - <span class='vid youtube' title='https://www.youtube.com/watch?v=F3qNs1_675g' ytSrc='F3qNs1_675g'>Video</span></li>" +
			      "<li>Working with dataset collections - <span class='vid youtube' title='https://www.youtube.com/watch?v=K-bgypyg8gc' ytSrc='K-bgypyg8gc'>Video</span></li>" +
			      "<li>Deleting/recovering files - <span class='vid youtube' title='https://www.youtube.com/watch?v=qgTqG8pKzWs' ytSrc='qgTqG8pKzWs'>Video</span></li>" +
			      "<li>Manage and import histories - <span class='vid youtube' title='https://www.youtube.com/watch?v=MZB9LWBpFiI' ytSrc='MZB9LWBpFiI'>Video</span></li>" +
			      "<li>Sharing histories - <span class='vid youtube' title='https://www.youtube.com/watch?v=oKZUebCVP-M' ytSrc='oKZUebCVP-M'>Video</span></li>" +
			      "<li>Deleting/recovering histories - <span class='vid youtube' title='https://www.youtube.com/watch?v=Z6jvNUg-ZSc' ytSrc='Z6jvNUg-ZSc'>Video</span></li>" +
			      "<li>Create and share workflows - <span class='vid youtube' title='https://www.youtube.com/watch?v=m2u4sG3uYqc' ytSrc='m2u4sG3uYqc'>Video</span></li>" +
			      "<li>Import a workflow - <span class='vid youtube' title='https://www.youtube.com/watch?v=izCQ6b1DRIM' ytSrc='izCQ6b1DRIM'>Video</span></li>" +
			      "<li>Add links to workflows on tool panel - <span class='vid youtube' title='https://www.youtube.com/watch?v=Hmou9AM6z-8' ytSrc='Hmou9AM6z-8'>Video</span></li>" +
			      "<li>Run workflow - <span class='vid youtube' title='https://www.youtube.com/watch?v=KZf9Cwy62YQ' ytSrc='KZf9Cwy62YQ'>Video</span></li>" +
			      "<li>Using Galaxy scratchbooks - <span class='vid youtube' title='https://www.youtube.com/watch?v=yR_LE9S0hio' ytSrc='yR_LE9S0hio'>Video</span></li>" +
			    "</ul><br/>" +
			  "<li>Installing your own ImmPort Galaxy instance</li>" +
			  "ImmPort Galaxy and associated tools are all on GitHub." +
			  "<a href='https://github.com/ImmPortDB/immport-galaxy' target='_blank'>ImmPort Galaxy</a> -- " +
			  "<a href='https://github.com/ImmPortDB/ig-flowtools' target='_blank'>Tools</a><br/>" +
			  "Some tools are also available for install via <a href='https://bioconda.github.io/' target='_blank'>bioconda</a>, " +
			  "the bio-informatics channel of the <a href='https://conda.io/docs/' target='_blank'>conda</a> package manager." +
			"</ul>",
	ip_data_text = "<p>Data shared through ImmPort is standardized according to a very specific data model. The same data structure " +
			"can then be expected throughout ImmPort Study data, making re-analyses and meta-analyses that much easier to undertake.</p>" +
			"<p>Here are some resources to help understand the ImmPort data model, explore data in ImmPort and get started with your own analysis.</p>" +
			"<ul>" +
			"<li>ImmPort Shared Data Model</li>" +
			"<a href='" + sharedDataUrl + "/dataModelDocumentation?table=study'}' target='_blank'>Table and Columns</a>&nbsp;--&nbsp;" +
			"<a href='" + dataUploadDataModelViewerUrl + "' target='_blank'>Data Model</a>&nbsp;--&nbsp;" +
			/*"<a href='http://www.immport.org/immport-open/public/schema/schemaDiagram/AllTables' target='_blank'>Entity-Relationship diagrams1</a>&nbsp;--&nbsp;" +*/
			"<span class='vid youtube' title='https://www.youtube.com/watch?v=VzX6PH5MdEw' ytSRC='VzX6PH5MdEw'>Video</span>" +
			"<br /><br />" +
			"<li>Explore Data in ImmPort</li>" +
			"<ul>" +
			"<li>ImmPort Overview&nbsp;-&nbsp;<span class='vid youtube' title='https://www.youtube.com/watch?v=fkVfrcSoAZI' ytSRC='fkVfrcSoAZI'>Video</span></li>" +
			"<li>Search for Data&nbsp;-&nbsp;<span class='vid youtube' title='https://www.youtube.com/watch?v=Bf2dXprzE4g' ytSRC='Bf2dXprzE4g'>Video</span></li>" +
			"<li>Data Catalogs&nbsp;-&nbsp;<span class='vid youtube' title='https://www.youtube.com/watch?v=swTPvOjoweg' ytSRC='swTPvOjoweg'>Video</span></li>" +			
			"<li>Study Overview&nbsp;-&nbsp;<span class='vid youtube' title='https://www.youtube.com/watch?v=Y0UUFoXkmWk' ytSRC='Y0UUFoXkmWk'>Video</span></li>" +
			"<li>Data Download&nbsp;-&nbsp;" +
			"<span class='vid youtube' title='https://www.youtube.com/watch?v=iCGEv6MGUVg' ytSRC='iCGEv6MGUVg'>Video</span>&nbsp;--&nbsp;" +
			"<a href='http://asperasoft.com/software/transfer-clients/connect-web-browser-plug-in/' target='_blank'>Aspera Doc</a> &nbsp;--&nbsp;<a href='" + asperaInstallHelpUrl +"' target='_blank'>Install Aspera</a> </li>" +
			"<li>RImmPort&nbsp;-&nbsp;<a href='https://bioconductor.org/packages/release/bioc/html/RImmPort.html' target='_blank'>BioConductor</a>&nbsp;--&nbsp;" +
			"<a href='https://www.ncbi.nlm.nih.gov/pubmed/28057685' target='_blank'>Pubmed</a></li></ul>" +
			"Ravi Shankar (<a href='https://khatrilab.stanford.edu/start' target='_blank'>Khatri Lab</a> at Stanford) developed RImmPort to manipulate ImmPort " +
			"Shared Data <strong>once downloaded</strong>. This package is <strong>not</strong> maintained by the ImmPort Dev Team, any questions or comments should be directed to Ravi Shankar.<br />" +
			"</ul>" +
			"<p>To get started with analyzing data, check out the data analysis section.</p>",
	tutDivs = {
		'N': 'none',
		'A': '.apis',
		'B': '.prog_basics',
		'C': '.data_upload',
		'D': '.data_analysis',
		'G': '.galaxy',
		'I': '.ip_data'
	},
	tutoCategories = {
		'A': 'Using ImmPort APIs',
		'B': 'Basics of Programming',
		'C': 'Data Curation and Upload',
		'D': 'Basic and more Advanced Data Analysis',
		'G': 'ImmPort Galaxy',
		'I': 'ImmPort Data Model'		
    },
    tutorialText = {
		'A': api_text,
		'B': prog_basics_text,
		'C': data_upload_text,
		'D': data_analysis_text,
		'G': galaxy_text,
		'I': ip_data_text
};

// add bigpicture code:
var prepareLightbox = function(){
	$('.vid').on("click", function(){
		BigPicture({
	      el: this,
	      ytSrc: this.getAttribute('ytSrc')
		});
	});
}


var displayTutorials = function(tutoConfig) {
	tutoConfig.tutorial = tutDivs[tutoConfig.selected];
	// move panels on the side if selection, or back if unselected
	// display / hide middle pane
	// highlight selected panel or not
	// figure transitions for hiding/showing
	
	if (tutoConfig.tutorial !== 'none') {
		// different code if divs already changed -- don't need to change them again
		if (!$('.tutoList').is('visible')){
			$('.toHide').hide('blind', {direction: "right"});
			$('.toHideL').hide('blind', {direction: "left"});
			$('.tutoCat').removeClass('col-md-6').removeClass('col-xs-12').addClass('col-md-3').addClass('col-xs-6');
			$('.tutDiv').removeClass('col-md-6').removeClass('col-xs-12').addClass('col-md-12').addClass('col-xs-24');
			$('.tutDiv').css("margin-top", "1px");
			$('.toShow').show('drop', {direction: "up"});
			$('.tutoList').show('drop', {direction: "left"});			
		}
		$(tutDivs[tutoConfig.tutSelected]).removeClass("tutorial-highlight");
		$(tutDivs[tutoConfig.selected]).addClass("tutorial-highlight");
		tutoConfig.tutSelected = tutoConfig.selected;
		$('.tutoTitle').html(tutoCategories[tutoConfig.selected]);
		$('.tutoText').html(tutorialText[tutoConfig.selected]);
		//show tutorial lists
	} else {
		$(tutDivs[tutoConfig.tutSelected]).removeClass("tutorial-highlight");
		$('.tutoList').hide('blind', {direction: "right"});
		$('.tutoCat').removeClass('col-md-3').removeClass('col-xs-6').addClass('col-md-6').addClass('col-xs-12');
		$('.tutDiv').removeClass('col-md-12').removeClass('col-xs-24').addClass('col-md-6').addClass('col-xs-12');
		$('.tutDiv').css("margin-top", "15px");
		$('.toHide').show('drop', {direction: "right"});
		$('.toHideL').show('drop', {direction: "right"});
		$('.toShow').hide('blind', {direction: "down"});
	}
	prepareLightbox();
};

$(document).ready(function() {
	$('.apis').click(function(){
		tutConfig.selected = tutConfig.selected === "A" ? "N" : "A";
	    displayTutorials(tutConfig);
	});
	
	$(".prog_basics").on("click", function(){
		tutConfig.selected = tutConfig.selected === "B" ? "N" : "B";
	    displayTutorials(tutConfig);
	});

	$(".galaxy").on("click", function(){
		tutConfig.selected = tutConfig.selected === "G" ? "N" : "G";
	    displayTutorials(tutConfig);
	});

	$(".ip_data").on("click", function(){
		tutConfig.selected = tutConfig.selected === "I" ? "N" : "I";
	    displayTutorials(tutConfig);
	});

	$(".data_analysis").on("click", function(){
		tutConfig.selected = tutConfig.selected === "D" ? "N" : "D";
	    displayTutorials(tutConfig);
	});

	$(".data_upload").on("click", function(){
		tutConfig.selected = tutConfig.selected === "C" ? "N" : "C";
	    displayTutorials(tutConfig);
	});

});
