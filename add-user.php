<?php
	$user_info = get_user_info_by_id($_SESSION['md5ax_userID']);
?>
<style>
	.show_pwd_field,.hide_pwd_field{
		cursor:pointer;
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
			<li class="active"><span>Add New User</span></li>
		</ol>
		
	</div>
	<!-- /Breadcrumb -->
</div>
<!-- /Title -->

<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
	<div class="panel panel-info card-view">
		<div class="panel-heading">
			<div class="pull-left">
				<h6 class="panel-title txt-light"><i class="zmdi zmdi-settings mr-10"></i> Add New User</h6>
			</div>
			<div class="pull-right">
				<a href="#" class="pull-left inline-block full-screen mr-15">
					<i class="zmdi zmdi-fullscreen txt-light"></i>
				</a>
			</div>
			<div class="clearfix"></div>
		</div>
		<div id="user_pwd_change" class="panel-wrapper collapse in">
			<div class="panel-body">
					
					
						
						
							<div class="col-md-6">
								<div class="row">
									<div class="col-sm-12 col-xs-12">
										<div class="form-wrap">
											<div class="form-group mb-10">
												
												<label class="mb-5">User Email<span class="text-danger">*</span></label>
												<div class="input-group mb-15"> <span class="input-group-addon"><i class="zmdi zmdi-email"></i></span>
													<input type="text" class="form-control" value="" id="user_email">
													
												</div>
												
												<label class="mb-5">New Password <span class="text-danger">*</span> <span><a href="javascript:void(0);" id="gen_new_pwd" class="btn btn-primary btn-outline ml-10 pt-0 pb-0"> Generate Pwd</a></span></label>
												<div class="input-group mb-15"> <span class="input-group-addon"><i class="fa fa-key" aria-hidden="true"></i></span>
													<input type="password" class="form-control" value="" id="user_pwd">
													<span class="input-group-addon show_pwd_field"><i class="fa fa-eye" aria-hidden="true"></i></span>
												</div>
												
												<label class="mb-5">Send Verification Email </label>
												<div class="form-group mb-15">
													<select class="form-control" id="send_verify_email">
														<option value="0">No</option>
														<option value="1">Yes</option>
													</select>
												</div>
												<div class="text-center mt-10">
														<button id="add_new_user_btn" class="btn btn-success btn-lable-wrap left-label"> <span class="btn-label"><i class="fa fa-save"></i> </span><span class="btn-text">Save</span></button>
														<br>
														<img id="new_user_save_loading" src="dist/img/circle_loading.gif" style="display:none;">
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							
							
							<div class="col-md-6">
								<div class="row">
									<div class="col-sm-12 col-xs-12">
										<strong class="">Information for Admin</strong>
										<ul class="list-icons mb-30 mt-10">
										  <li class="mb-10"><i class="fa fa-angle-double-right text-info mr-5"></i> Add Email & Generate New Pass</li>
										  <li class="mb-10"><i class="fa fa-angle-double-right text-info mr-5"></i> If You Select <strong>No Email Verification</strong> then User Will be auto approved & active</li>
										  <li><i class="fa fa-angle-double-right text-info mr-5"></i> If You Select <strong>Email Verification as YES</strong> then User status Will be pending and email verfication link will be sent on provided email address. </li>
										  <li><i class="fa fa-angle-double-right text-info mr-5"></i> In both cases user will be notified to update his personal information on first login.</li>	
										</ul>
										<div id="success-msg-area">	</div>
									</div>
								</div>
							</div>
							
			</div>
		</div>
	</div>
</div>