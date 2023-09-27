<?php
require_once(CLASSES_DIR.'Paginator.class.php');
	global $conn;
	
	$this_filter = '?nav='.$the_page;
	$where 		= '';
	$filter_arr = array();
	
	if(isset($_GET['user-status']) && !empty($_GET['user-status'])){
		$filter_arr[] = "users.user_status = '".$_GET['user-status']."'";
		$this_filter .= '&user-status='.trim($_GET['user-status']);
	}
	
	if(isset($_GET['db-field']) && !empty($_GET['db-field']) && isset($_GET['search-db']) && !empty($_GET['search-db'])){
		if($_GET['db-field']=='email'){
			$filter_arr[] = "users.user_email LIKE '%".$_GET['search-db']."%'";
		}else if($_GET['db-field']=='id'){
			$filter_arr[] = "users.user_id = ".$_GET['search-db'];
		}else if($_GET['db-field']=='name'){
			$filter_arr[] = "(users.user_firstname LIKE '%".$_GET['search-db']."%' OR users.user_lastname LIKE '%".$_GET['search-db']."%')";
		}else if($_GET['db-field']=='payment'){
			$filter_arr[] = TBL_IB_GATEWAYS.".pay_name LIKE '%".$_GET['search-db']."%'";
		}
		
		$this_filter .= '&db-field='.trim($_GET['db-field']).'&search-db='.$_GET['search-db'];
	}
	
	$f_inc = 1;
	if(!empty($filter_arr)){
		foreach($filter_arr as $s_filter){
			if($f_inc==1){
				$where .=' WHERE '.$s_filter.' ';
			}else{
				$where .=' AND '.$s_filter.' ';
			}
			$f_inc++;
		}
	}
	
	
	$limit      = 40;
	$pages      = (isset($_GET['page']))?$_GET['page']:1;
	$links      = 7;
	$query      = "SELECT * FROM ".TBL_IB_ADMIN." as users
					LEFT JOIN ".TBL_IB_COUNTRIES." ON users.user_country = ".TBL_IB_COUNTRIES.".country_id 
					LEFT JOIN ".TBL_IB_GATEWAYS." ON users.user_pay = ".TBL_IB_GATEWAYS.".pay_id
					{$where} ORDER BY users.user_id ASC";
	$Paginator  = new Paginator($conn, $query);
	$results    = $Paginator->getData($limit,$pages);
	$total = isset($results->total) && !empty($results->total)?$results->total:0;
	$total_pages = ceil($total / $limit );
	$start_numbers = ($total>0?($pages - 1) * $limit + 1:0);
	
	if ($total>0) {
		if($total>$limit){
			$end_numbers = $pages * $limit;
		}else{
			$end_numbers = $total;
		}
	}else{
		$end_numbers = 0;
	}
	if($total>0 && $pages==$total_pages){
		$end_numbers = $start_numbers+($total-$start_numbers);
	}
	//pa($results);
	
?>
<style>

#sortable { list-style-type: none; margin: 0; padding: 0; }
#sortable li { margin: 3px 3px 3px 0; padding: 1px; float: left; font-size: 4em; text-align: center; }
.user-meta-sortable li{margin-bottom:10px;}
.inner-unit {
    display: inline-block;
    width: 90%;
}
.drag-selector {
    display: inline-block;
	font-weight: bold;
    color: green;
	vertical-align: 16px;
	cursor: all-scroll;
	min-width: 26px;
	text-align: center;
}
.close-area{
	display: inline-block;
	
}
.close-area img{
	vertical-align: 16px;
	cursor: pointer;
}
.has-error{
	border-color:red;
}



#users-table td:nth-child(3),#users-table th:nth-child(3){
	max-width:130px;
}


.show-user-details, .hide-user-details {
    font-size: 12px;
    font-weight: bold;
}
.user-status-input,.user-meta-title {
    font-weight: bold;
}

</style>
<!-- Title -->
<div class="row heading-bg">
	<div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
		<h5 class="txt-dark">Users</h5>
	</div>
	<!-- Breadcrumb -->
	<div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
		<ol class="breadcrumb">
			
			<li class="active">Users</li>
			<li class="active"><span>All Users</span></li>
		</ol>
	</div>
	<!-- /Breadcrumb -->
</div>
<!-- /Title -->



<div class="row">
	<div class="col-md-12">
		<div class="panel panel-default card-view">
			<div class="panel-heading">
				<div class="row">
					<div class="col-md-6">
						<div class="form-wrap">
							<form class="form-inline" method="GET" enctype="multipart/form-data">
								<input name="nav" value="<?php echo $the_page;?>" type="hidden">
								<div class="input-group">
									<select class="form-control" name="user-status">
										<option value="">Select Status</option>
										<?php
											$all_users_status = get_all_user_status();
											if(isset($all_users_status) && !empty($all_users_status)){
												foreach($all_users_status as $single_user_status){
													echo '<option value="'.$single_user_status.'"'.(isset($_GET['user-status']) && $_GET['user-status']==$single_user_status?' selected="selected"':'').'>'.ucwords($single_user_status).'</option>';
												}
											}
										?>
									</select>
								</div>
								<div class="input-group">
									<select class="form-control" name="db-field">
										<option value="">Select db Field</option>
										<?php
											$db_fields = array('name','payment','email','id');
											if(isset($db_fields) && !empty($db_fields)){
												foreach($db_fields as $single_db_fields){
													echo '<option value="'.$single_db_fields.'"'.(isset($_GET['db-field']) && $_GET['db-field']==$single_db_fields?' selected="selected"':'').'>'.$single_db_fields.'</option>';
												}
											}
										?>
									</select>
								</div>
								<div class="input-group">
									<input type="text" name="search-db" value="<?php echo (isset($_GET['search-db']) && !empty($_GET['search-db'])?$_GET['search-db']:'');?>" class="form-control" placeholder="Search db Field">
									<span class="input-group-btn">
										<button type="submit" class="btn btn-danger">Go</button>
									</span>
								</div>
							</form>
						</div>
					</div>
				
					<div class="col-md-6">
						<div class="pull-right">
							
							<button class="btn btn-info btn-outline btn-rounded">Page: <?php echo  $pages.' of '.ceil($total / $limit );?></button>
							<button class="btn btn-success btn-outline btn-rounded">Results: <?php echo $start_numbers.' - '.$end_numbers;?></button>
							<button class="btn btn-primary btn-outline btn-rounded">Total: <?php echo $total;?></button>
						</div>
					</div>
				</div>				
				<div class="clearfix"></div>
			</div>
			<div class="panel-wrapper collapse in">
				<div class="panel-body">
					
					<!-- User-Meta-modal -->
					<div id="user-meta-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<input type="hidden" id="user-meta-hidden-id" value="">
									
									<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
									<h5 class="modal-title">
									<button class="add-more-meta btn btn-sm btn-warning btn-icon-anim btn-square" data-toggle="tooltip" data-original-title="Add More Notes"><i class="fa fa-plus-square"></i><span class="caret"></span></button>
									<button class="del-all-user-meta btn btn-sm btn-info btn-icon-anim btn-square" data-toggle="tooltip" data-original-title="Del All Notes"><i class="icon-trash"></i></button>
									<button class="reload-user-meta btn btn-sm btn-primary btn-icon-anim btn-square" data-toggle="tooltip" data-original-title="Reload Notes"><i class="icon-reload"></i></button>
									Add Update Notes For user
										<img id="user-meta-loading" src="dist/img/circle_loading.gif" style="display:none;">
									</h5>									
								</div>
								<div id="user-meta-modal-body" class="modal-body text-center" style="background-color: #efefef;">
										<form id="user-meta-form">
											<ul class="user-meta-sortable">
												
											</ul>
										</form>
										
										<button class="save-all-user-meta btn btn-sm btn-success btn-icon-anim btn-square" data-toggle="tooltip" data-original-title="Save All Notes"><i class="icon-check"></i></button>		
								</div>
							</div>
							<!-- /.modal-content -->
						</div>
						<!-- /.modal-dialog -->
					</div>
					<!-- /.User-Meta-modal -->
				
					<div class="table-wrap">
						<div class="table-responsive">
						  <table id="users-table" class="table table-hover mb-0">
							<thead>
							  <tr>
								<th>User ID</th>
								<th>Full Name</th>
								<th>Contact</th>
								<th>Payment Method</th>
								<th class="text-nowrap">Actions</th>
							  </tr>
							</thead>
							<tbody>
								<?php
									$inc = $start_numbers;
									if(isset($results->data) && !empty($results->data)){
										for( $i = 0; $i < count( $results->data ); $i++ ){
									?>
											<tr>
												<td><?php echo $results->data[$i]['user_id'];?></td>
												<td><?php echo $results->data[$i]['user_firstname'].' '.$results->data[$i]['user_lastname'];?></td>
												<td>
												<?php 
												echo '<strong>Email:</strong> '.$results->data[$i]['user_email'].'<br>';
												echo '<strong>'.$results->data[$i]['user_msngr'].':</strong> '.$results->data[$i]['user_msngr_id'];?>
												<div><a href="javascript:void(0);" class="show-user-details btn btn-info btn-outline pt-0 pb-0 pl-5 pr-5" data-user-id="<?php echo $results->data[$i]['user_id'];?>">+Expand</a></div>
												<div id="<?php echo 'user-details-'.$results->data[$i]['user_id'];?>" class="text-left" style="display:none;">
												
												<?php 													
													echo '<strong>Phone:</strong> '.$results->data[$i]['user_phone'].'<br>';
													echo '<strong>Address:</strong> '.$results->data[$i]['user_address'].'<br>';
													echo '<strong>City/Country:</strong> '.$results->data[$i]['user_city'].' - '.$results->data[$i]['country_name'].'<br>';
													echo '<strong>Signup Date:</strong> '.date('d-M-Y',strtotime($results->data[$i]['reg_date'])).'<br>';
												?>
												</div>
												</td>
												
												<td>
												<?php 
													
													echo (!empty($results->data[$i]['pay_name'])?$results->data[$i]['pay_name']:'N/A');
													echo '<br>'.(!empty($results->data[$i]['user_pay_email_id'])?$results->data[$i]['user_pay_email_id']:'N/A');
												?>
												</td>
												
													
													
																									
												
												
												<td>
													<?php if($results->data[$i]['user_type']!='1nsbnk_admnx'){?>
													
													<!-- Rev modal content -->
													<div id="<?php echo 'user-rev-modal-'.$results->data[$i]['user_id'];?>" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
														<div class="modal-dialog modal-sm">
															<div class="modal-content">
																<div class="modal-header">
																	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
																	<h5 class="modal-title">Rev. Share % <i class="zmdi zmdi-info mr-20 text-primary" style="font-size: 16px;" data-toggle="tooltip" data-placement="left" data-original-title="Integer Values Only, Decimal Floating point Will be automaticaly rounded"></i> <?php echo 'USER ID = '.$results->data[$i]['user_id'];?></h5>
																</div>
																<div class="modal-body">
																
																	<div class="text-center">
																		<img id="<?php echo 'user-rev-loading-'.$results->data[$i]['user_id'];?>" src="dist/img/circle_loading.gif" style="display:none;">
																		<div class="clearfix"></div>
																	</div>
																	<div class="input-group mb-15">
																		<span class="input-group-addon"><i class="fa fa-percent"></i></span>
																		<input type="text" id="<?php echo 'user-rev-'.$results->data[$i]['user_id'];?>" class="form-control" value="<?php echo $results->data[$i]['user_revenue_share'];?>" disabled="disbaled">
																		
																		<div class="input-group-btn">
																			<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> <span class="caret"></span></button>
																			<ul class="rev-ul-parent-btn dropdown-menu dropdown-menu-right">
																				<li><a href="javascript:void(0)" class="rev-ul-child-btn unlock-rev" data-user-id="<?php echo $results->data[$i]['user_id'];?>">Unlock</a></li>
																				<li><a href="javascript:void(0)" class="update-user-rev" data-user-id="<?php echo $results->data[$i]['user_id'];?>">Update Value</a></li>
																			</ul>
																		</div>
																	</div>
																
																</div>
															</div>
															<!-- /.modal-content -->
														</div>
														<!-- /.modal-dialog -->
													</div>
													<!-- /.rev-modal -->
													<span class="btn pl-5 pr-5" data-toggle="modal" data-target="<?php echo '#user-rev-modal-'.$results->data[$i]['user_id'];?>"> <i data-toggle="tooltip" data-original-title="Revenue Share" class="fa fa-percent text-info"></i> </span> 
												
												<!-- payment cycle modal content -->
													<div id="<?php echo 'user-payment-cycle-modal-'.$results->data[$i]['user_id'];?>" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
														<div class="modal-dialog modal-md">
															<div class="modal-content">
																<div class="modal-header">
																	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
																	<h5 class="modal-title">Payment Cycle <i class="zmdi zmdi-info mr-20 text-primary" style="font-size: 16px;" data-toggle="tooltip" data-placement="left" data-original-title="1 Day = Daily,  7 Days = Weekly,  15 Days = Bi-Weekly,  30 Days = Monthly"></i></h5>
																</div>
																<div class="modal-body">
																
																	<div class="text-center">
																		<img id="<?php echo 'user-payment-cycle-loading-'.$results->data[$i]['user_id'];?>" src="dist/img/circle_loading.gif" style="display:none;">
																		<div class="clearfix"></div>
																	</div>
																	<p><strong><?php echo 'User ID: '.$results->data[$i]['user_id'];?></strong></p>
																	<p><strong><?php echo 'User Name: '.$results->data[$i]['user_firstname'].' '.$results->data[$i]['user_lastname'];?></strong></p>
																	
																	<div class="input-group mt-15 mb-15">
																		<span class="input-group-addon"><i class="fa fa-percent"></i></span>
																		<input type="text" id="<?php echo 'user-payment-cycle-'.$results->data[$i]['user_id'];?>" class="form-control" value="<?php echo $results->data[$i]['user_pay_cycle'];?>" disabled="disbaled">
																		
																		<div class="input-group-btn">
																			<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> <span class="caret"></span></button>
																			<ul class="dropdown-menu dropdown-menu-right">
																				<li><a href="javascript:void(0)" class="update-user-payment-cycle" data-user-id="<?php echo $results->data[$i]['user_id'];?>" data-payment-cycle="7">Set Weekly (7 Days)</a></li>
																				<li><a href="javascript:void(0)" class="update-user-payment-cycle" data-user-id="<?php echo $results->data[$i]['user_id'];?>" data-payment-cycle="15">Set Bi-Weekly (15 Days)</a></li>
																				<li><a href="javascript:void(0)" class="update-user-payment-cycle" data-user-id="<?php echo $results->data[$i]['user_id'];?>" data-payment-cycle="30">Set Monthly (30 Days)</a></li>
																			</ul>
																		</div>
																	</div>
																
																</div>
															</div>
															<!-- /.modal-content -->
														</div>
														<!-- /.modal-dialog -->
													</div>
													<!-- /.payment-cycle-modal -->
													<span class="btn pl-5 pr-5" data-toggle="modal" data-target="<?php echo '#user-payment-cycle-modal-'.$results->data[$i]['user_id'];?>"> <i data-toggle="tooltip" data-original-title="Payment Cycle" class="fa fa-usd text-success"></i> </span>
												
												
													
													<!-- Rev modal content -->
													<div id="<?php echo 'user-status-modal-'.$results->data[$i]['user_id'];?>" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
														<div class="modal-dialog modal-sm">
															<div class="modal-content">
																<div class="modal-header">
																	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
																	<h5 class="modal-title">Status <?php echo 'USER ID = '.$results->data[$i]['user_id'];?></h5>
																</div>
																<div class="modal-body">
																
																	<div class="text-center">
																		<img id="<?php echo 'user-status-loading-'.$results->data[$i]['user_id'];?>" src="dist/img/circle_loading.gif" style="display:none;">
																		<div class="clearfix"></div>
																	</div>
																	<div class="input-group mb-15">
																		<?php
																			if($results->data[$i]['user_status']=='pending'){
																				$this_status_color = ' text-warning';
																			}
																			if($results->data[$i]['user_status']=='active'){
																				$this_status_color = ' text-success';
																			}
																			if($results->data[$i]['user_status']=='deactivated'){
																				$this_status_color = ' text-info';
																			}
																		?>
																		<input type="text" id="<?php echo 'user-status-'.$results->data[$i]['user_id'];?>" class="user-status-input form-control<?php echo (isset($this_status_color)?$this_status_color:'');?>" value="<?php echo $results->data[$i]['user_status'];?>" disabled="disbaled">
																		
																		<div class="input-group-btn">
																			<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> <span class="caret"></span></button>
																			<ul class="dropdown-menu dropdown-menu-right">
																				<li><a href="javascript:void(0)" class="set-user-status" data-user-id="<?php echo $results->data[$i]['user_id'];?>" data-user-status="active">Active</a></li>
																				<li><a href="javascript:void(0)" class="set-user-status" data-user-id="<?php echo $results->data[$i]['user_id'];?>" data-user-status="deactivated">Deactivate</a></li>
																			</ul>
																		</div>
																	</div>
																
																</div>
															</div>
															<!-- /.modal-content -->
														</div>
														<!-- /.modal-dialog -->
													</div>
													<!-- /.rev-modal -->													
													
													
													<span class="btn pl-5 pr-5" data-toggle="modal" data-target="<?php echo '#user-status-modal-'.$results->data[$i]['user_id'];?>"> <i data-toggle="tooltip" data-original-title="User Status" class="fa fa-user text-primary"></i> </span> 
													
													<a href="<?php echo ADMIN_URL.'?nav=user-websites&user_id='.$results->data[$i]['user_id'];?>" class="btn pl-5 pr-5" data-toggle="tooltip" data-original-title="User Websites"> <i class="zmdi zmdi-globe-alt text-primary"></i> </a> 
													
													
													<span id="user-meta-btn" data-user-id="<?php echo $results->data[$i]['user_id'];?>" class="btn pl-5 pr-5" data-toggle="modal" data-target="#user-meta-modal"> <i data-toggle="tooltip" data-original-title="Add/Update Notes" class="fa fa-file-text-o text-warning"></i> </span> 
													<div data-toggle="tooltip" data-original-title="Show / Hide Clicks" class="checkbox checkbox-success checkbox-circle inline-block">
														<input class="show-hide-clicks" type="checkbox" value="<?php echo $results->data[$i]['user_id'];?>"<?php echo($results->data[$i]['user_clicks_enable']?' checked=""':'');?>>
														<label for=""> </label>
													</div>
													
													<a href="<?php echo ADMIN_URL.'?nav=user-profile-update&user_id='.$results->data[$i]['user_id'];?>" class="btn pl-5 pr-5" data-toggle="tooltip" data-original-title="Update Profile"> <i class="fa fa-pencil-square text-warning"></i> </a> 
													
													
													
													
													<?php }else{
														echo '<i data-toggle="tooltip" data-original-title="Super User" aria-hidden="true" class="fa fa-user-secret text-warning" style="font-size: 25px;"></i>';
													} ?>
													
												
												</td>
											</tr>
									<?php $inc++;					
										}
									}else{
										echo '<tr><td colspan="5">No Records Found</td></tr>';
									}
									?>
							</tbody>
						  </table>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 text-center">
						<?php
							if($total>0){
							
							echo $Paginator->createLinksAllpost($links, 'pagination pagination-split',$this_filter);
							}
						?>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>