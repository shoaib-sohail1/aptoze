# aptoze
🚀 Unlock the Power of Mobile Traffic Monetization with aptoze.com 📱💰  As a seasoned #developer, I'm excited to introduce you to a groundbreaking solution for mobile download traffic monetization: aptoze.com. It's not just a product; it's the result of my passion and expertise in development.

# Why Choose this.?
Say goodbye to mediocre earnings and embrace the potential of high-yield opportunities. Your journey to maximizing mobile traffic earnings starts here, backed by my years of development experience.
Ready to leverage my development expertise and explore the full potential of mobile traffic monetization? Dive into aptoze.com today. Your success story awaits! 💼💡
#monetization #mobiletraffic #earnings #developerexpertise #phpdeveloper #adnetwork #ppi #adagency

    <?php
    $the_page 	= (isset($_GET['nav']) && !empty($_GET['nav']) ?trim($_GET['nav']): '');
    include('common/header.php');
    ?>
    <body>
    	<!-- Preloader -->
    	<div class="preloader-it">
    		<div class="la-anim-1"></div>
    	</div> 
    	<!-- /Preloader -->
        <div class="wrapper theme-1-active pimary-color-red">
    	
    		<?php include('common/top-menu.php');?>
    		
    		<?php 
    		
    		if(isset($_SESSION['md5ax_userType']) && !empty($_SESSION['md5ax_userType'])){
    			if($_SESSION['md5ax_userType']=='1nsbnk_user'){
    				include('common/user-left-sidebar.php');
    			}else if($_SESSION['md5ax_userType']=='1nsbnk_admnx'){
    				include('common/admn-left-sidebar.php');
    			}
    		}
    		
    		
    		//;?>
    		
    		<!-- Main Content -->
    		<div class="page-wrapper">
                <div class="container-fluid">
    				<?php
    				if(isset($_SESSION['md5ax_userType']) && !empty($_SESSION['md5ax_userType'])){
    					if($_SESSION['md5ax_userType']=='1nsbnk_user'){
    						
    						if(isset($_SESSION['md5ax_userID']) && !empty($_SESSION['md5ax_userID']) && is_numeric($_SESSION['md5ax_userID'])){
    							is_user_profile_complete($_SESSION['md5ax_userID']);
    							show_alert_by_admin();
    						}
    						
    						$template_dir = 'user-templates/';
    					}else if($_SESSION['md5ax_userType']=='1nsbnk_admnx'){
    						$template_dir = 'admn-md5x98-templates/';
    					}
    					
    					$templates_files = scandir($template_dir, 1);
    					if($this_admn_id==144){
    						$filter_mngr = array('all-users.php','manage-payments.php','user-payments.php','user-stats.php');
    						foreach($templates_files as $templ_key=>$templ_val){
    							if(in_array($templ_val,$filter_mngr)){
    								unset($templates_files[$templ_key]);
    							}
    						}
    					}
    					
    					if($the_page==''){
    						if($this_admn_id==144){
    							include($template_dir.'no-page-exist.php');
    						}else{
    							include($template_dir.'home.php');
    						}
    						
    					}else if(in_array($the_page.'.php',$templates_files)){
    						
    						include($template_dir.$the_page.'.php');
    						
    					}else{
    						
    						include($template_dir.'no-page-exist.php');
    						
    					}
    				}
    				
    				include('common/footer.php');
    				
    				?>
    			</div>
    		</div>
            <!-- /Main Content -->
    		
        </div>
        <!-- /#wrapper -->
    	
    	<!-- JavaScript -->
    	
        
    
        <!-- Bootstrap Core JavaScript -->
        <script src="vendors/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    	
    	<!-- Slimscroll JavaScript -->
    	<script src="dist/js/jquery.slimscroll.js"></script>
    	
    	<!-- Switchery JavaScript -->
    	<script src="vendors/bower_components/switchery/dist/switchery.min.js"></script>
    
    	<!-- Select2 JavaScript -->
    	<script src="vendors/bower_components/select2/dist/js/select2.full.min.js"></script>
    	
    	<!-- Bootstrap Select JavaScript -->
    	<script src="vendors/bower_components/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
    	
    	<!-- Bootstrap Tagsinput JavaScript -->
    		<script src="vendors/bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js"></script>
    		
    	<!-- Bootstrap Touchspin JavaScript -->
    		<script src="vendors/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js"></script>
    		
    	<!-- Multiselect JavaScript -->
    	<script src="vendors/bower_components/multiselect/js/jquery.multi-select.js"></script>
    	
    	<!-- Data table JavaScript -->
    	<script src="vendors/bower_components/datatables/media/js/jquery.dataTables.min.js"></script>
    	<script src="vendors/bower_components/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    	<script src="vendors/bower_components/datatables.net-buttons/js/buttons.flash.min.js"></script>
    	<script src="vendors/bower_components/jszip/dist/jszip.min.js"></script>
    	<script src="vendors/bower_components/pdfmake/build/pdfmake.min.js"></script>
    	<script src="vendors/bower_components/pdfmake/build/vfs_fonts.js"></script>
    	
    	<script src="vendors/bower_components/datatables.net-buttons/js/buttons.html5.min.js"></script>
    	<script src="vendors/bower_components/datatables.net-buttons/js/buttons.print.min.js"></script>
    	<script src="vendors/bower_components/datatables.net-buttons/js/buttons.colVis.min.js"></script>
    	<script src="dist/js/export-table-data.js"></script>
    	
    	
    	
    	<!-- Bootstrap Switch JavaScript -->
    	<script src="vendors/bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js"></script>
    	<!-- Moment JavaScript -->
    	<script type="text/javascript" src="vendors/bower_components/moment/min/moment-with-locales.min.js"></script>
    	<!-- Bootstrap Daterangepicker JavaScript -->
    	<script src="vendors/bower_components/bootstrap-daterangepicker/daterangepicker.js"></script><script src="vendors/bower_components/dropify/dist/js/dropify.min.js"></script>
    	<!-- Form Advance Init JavaScript -->
    	<script src="dist/js/form-advance-data.js"></script>
    	<!-- Fancy Dropdown JS -->
    	<script src="dist/js/dropdown-bootstrap-extended.js"></script>
    	<!-- Clipboard  -->
    	<script src="dist/js/clipboard.min.js"></script>
    	<!-- Bootstrap Datetimepicker JavaScript -->
    	<script type="text/javascript" src="vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>
    	
    	<!-- Type-Watch -->
    	<script src="dist/js/jquery.typewatch.js"></script>
    	<!-- Progressbar Animation JavaScript -->
    	<script src="vendors/bower_components/waypoints/lib/jquery.waypoints.min.js"></script>
    	<script src="vendors/bower_components/jquery.counterup/jquery.counterup.min.js"></script>
    	<!-- Sweet-Alert  -->
    	<script src="vendors/bower_components/sweetalert/dist/sweetalert.min.js"></script>
    	<!-- Init JavaScript -->
    	<script src="dist/js/init.js"></script>
    	
    	<?php  
    	if(isset($_SESSION['md5ax_userType']) && $_SESSION['md5ax_userType']=='1nsbnk_user'){
    	?>
    	<script src="dist/js/aa-user-js.js?v=15"></script>
    	
    	<?php 
    	}else if(isset($_SESSION['md5ax_userType']) && $_SESSION['md5ax_userType']=='1nsbnk_admnx'){?>
    	<script src="dist/js/admin-md5x8skq0dk-js.js?v=35"></script>
    	<?php if($the_page=='user-stats'){?>
    		<script type="text/javascript">
    		$(function () {
    				var min_date = Date.parse('2001', "yyyy");
    				var max_date = Date.parse('2050', "yyyy");
    				$('#new-stats-date').datetimepicker({
    					format: 'YYYY-MM-DD',
    					minDate:new Date(min_date),
    					maxDate:new Date(max_date)
    				});
    			});
    			</script>
    	<?php } 
    	if($the_page=='all-users'){?>
    	<script>
    	$.getScript('vendors/jquery-ui.min.js', function() {
    		
    		$( "ul.user-meta-sortable" ).sortable({
    			update: function(event, ui) {
    				var thiss 		= this;
    				var this_length = $(thiss).children('li').length;
    				for(var i=0;i<this_length;i++){
    					$(thiss).children('li:eq('+i+')').children('.drag-selector').text(i+1);
    				}
    			}
    		});
    		$( "ul.user-meta-sortable" ).disableSelection();			
    	});
    	</script>
    	
    	
    	<?php 
    		}
    	} ?>
    </body>
    </html>
    <?php $conn->close(); ?>



