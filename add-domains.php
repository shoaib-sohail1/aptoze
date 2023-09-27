<?php
$txt_file_path 	= ADMIN_DIR.'inc-admn/list/';
$txt_files 		= glob($txt_file_path."--*.txt",GLOB_BRACE);

$cdn_domains		= array(CDN_DOMAIN);

?>
<style>
	.the-textareaa{
		min-height: 250px; width: 544px; min-width: 100%; max-width: 100%; padding:10px;
	}
	textarea:disabled {
		cursor: not-allowed;
	}
</style>
<!-- Title -->
<div class="row heading-bg">
	<div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
		<h5 class="txt-dark">Domains</h5>
	</div>
	<!-- Breadcrumb -->
	<div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
		<ol class="breadcrumb">
			
			<li class="active">Domains</li>
			<li class="active"><span>Add / Update Domains</span></li>
		</ol>
		
	</div>
	<!-- /Breadcrumb -->
</div>
<!-- /Title -->

<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
	<div class="panel panel-primary card-view">
		<div class="panel-heading">
			<div class="pull-left">
				<h6 class="panel-title txt-light"><i class="fa fa-globe mr-10"></i> Add Update Domains</h6>
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
					
					<?php
					if(!empty($txt_files) && is_array($txt_files)){
						foreach($txt_files as $single_file_index=>$single_file_val){
							if($single_file_index==$single_file_index){
								$this_file_real_name 	= basename($single_file_val);
								$dashed_file_name		= sanitize($this_file_real_name);
								$this_file_show_name 	= ucwords(trim(str_ireplace(array('--','-','.txt'),array('',' ',''),$this_file_real_name)));
								$this_file_content 		= file($single_file_val, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
								
								
									?>
									<div class="col-md-6">
										<div class="row">
											<div class="col-sm-12 col-xs-12">
												<div class="form-wrap">
													<div class="form-group mb-10">
														
														<label class="mb-10"><i class="text-info" style="font-size:30px;"></i> <?php echo $this_file_show_name;?> Domains 
														<span><a href="javascript:void(0);" class="unlock-textarea btn btn-primary btn-outline ml-10 pt-0 pb-0 pl-10 pr-10" data-section="<?php echo $dashed_file_name.'-area';?>"><i class="fa fa-unlock"></i></a></span>
														</label>
														<div class="text-center">
															<div class="text-center" id="<?php echo $dashed_file_name.'-area-alert';?>"></div>
															<textarea class="the-textareaa" id="<?php echo $dashed_file_name.'-area';?>" class="col-md-12 mb-5" disabled="disbaled"><?php
														if(!empty($this_file_content) && is_array($this_file_content)){
															foreach($this_file_content as $single_content){
																echo $single_content."\n";
															}
														}
														?></textarea>													
														</div>
														
														
														<div class="text-center mt-10">
																<button data-section="<?php echo $dashed_file_name.'-area';?>" data-img="<?php echo $dashed_file_name.'_save_loading';?>" data-real-filename="<?php echo $this_file_real_name;?>" class="save-domains btn btn-success btn-lable-wrap left-label"> <span class="btn-label"><i class="fa fa-save"></i> </span><span class="btn-text">Save</span></button>
																<br>
																<img id="<?php echo $dashed_file_name.'_save_loading';?>" src="dist/img/circle_loading.gif" style="display:none;">
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<?php
									
								
							}
						}
					}
					?>
						
						
						
							
							
							
							
							
							<div class="col-md-12 mt-20">
								<div class="row">
									<div class="clearfix"></div>
									<div class="col-md-12 col-sm-12">
										<div><small><strong class="text-danger">Alert:</strong> http:// OR https:// or trailing slash "/" aren't allowed in domain names.</small></div>
										<div><small><strong class="text-light">Examples:</strong> Wrong : <strong class="text-danger">https://example.com/</strong> Correct: <strong class="text-success">example.com</strong></small></div>
										<small><strong class="text-primary">Note:</strong> CDN Domain <span class="text-info"><?php echo CDN_DOMAIN;?></span> is constant but can be changed through code.</small>
									</div>
								</div>
							</div>
							
							
			</div>
		</div>
	</div>
</div>