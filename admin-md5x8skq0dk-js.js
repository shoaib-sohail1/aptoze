// JavaScript Document
(function ($){
	$(document).ready(function(e) {
	//--------------------------------------------------------
	//========================================================	
				/***********Switches*********/
	//========================================================
	var user_rev_auto_calc			= document.querySelector('#user_rev_auto_calc');
	var auto_calculate_user_rev 	= true;

	
	//--------------------Copy Text---------------------------
	$(document).on('click', '.copy_any_text', function (e){
			
			var this_text = $(this).data('text');
			$("#copy-paste-area").attr("data-clipboard-text",this_text).trigger('change');
			var copy_data = new Clipboard('#copy-paste-area');
			var ee = $.Event("click");
			$("#copy-paste-area").trigger(ee);
				
			swal({position: 'top-right',type: 'success',title: 'Copied',showConfirmButton: false,timer: 800});
			
	});
	
	//========================================================	
				/***********USER PROFILE BY ADMIN*********/
	//========================================================	
	$(document).on('click', '#save_user_profile_by_admin', function (e){
			var user_id 		= $.trim($('input#this-user-id').val());
			var user_first_name = $.trim($('input#user_first_name').val());
			var user_last_name 	= $.trim($('input#user_last_name').val());
			var user_phone 		= $.trim($('input#user_phone').val());
			var user_msngr 		= $('#user_msngr option:selected').val();
			var user_msngr_id 	= $.trim($('input#user_msngr_id').val());
			var user_city 		= $.trim($('input#user_city').val());
			var user_country 	= $('#user_country option:selected').val();
			var user_address 	= $.trim($('input#user_address').val());
			var user_newsletter_status = $('input#user_newsletter_status:checked').length;
			var phone_regx = /^[0-9 ()+-]+$/;			
			if(user_first_name=='' || user_first_name==undefined){
				swal("Error!", "Please User Your First Name.", "error");
				return false;
			}else if(user_last_name=='' || user_last_name==undefined){
				swal("Error!", "Please User Your Last Name.", "error");
				return false;
			}else if((user_phone==undefined) || (user_phone!='' && !phone_regx.test(user_phone))){
				swal("Error!", "Plus (+), Dash (-) and Numeric (0-9) allowed in Phone.", "error");
				return false;
			}else if(user_phone!='' && user_phone.length<10){
				swal("Error!", "Incomplete Phone Number.", "error");
				return false;
			}else if((user_msngr=='' || user_msngr==undefined) || (user_msngr!='skype' && user_msngr!='qq' && user_msngr!='icq' && user_msngr!='other')){
				swal("Error!", "Please Select Your Messenger.", "error");
				return false;
			}else if(user_msngr_id=='' || user_msngr_id==undefined){
				swal("Error!", "Please Enter Your Messenger ID or Nick Name.", "error");
				return false;
			}else if(user_city=='' || user_city==undefined){
				swal("Error!", "Please Enter Your City.", "error");
				return false;
			}else if(user_country=='' || user_country==undefined || !$.isNumeric(user_country)){
				swal("Error!", "Please Select Your Country.", "error");
				return false;
			}else if(user_address=='' || user_address==undefined){
				swal("Error!", "Please Enter Your Address.", "error");
				return false;
			}else if((user_newsletter_status==0 && user_newsletter_status==1) || (user_newsletter_status==undefined)){
				swal("Error!", "Some Thing Went Wrong, Please Try Again Later.", "error");
				return false;
			}else{
				$('#user_info_save_loading').show();
				$.post(site_url+'/admn5x0-process/',{
					action:'update_user_profile_by_admin',
					u_user_id:user_id,
					u_user_first_name:user_first_name,
					u_user_last_name:user_last_name,
					u_user_phone	:user_phone,
					u_user_msngr	:user_msngr,
					u_user_msngr_id	:user_msngr_id,
					u_user_city		:user_city,
					u_user_country	:user_country,
					u_user_address	:user_address,
					u_user_newsletter_status:user_newsletter_status
							
					}, function(response){
						$('#user_info_save_loading').hide();
						if(response==572){
							swal({position: 'top-right',type:'warning',title: 'Your Session Expired.',showConfirmButton: false,timer: 1200});
							location.href=site_url+'/auth/logout.php';
						}else if(response==1){
							swal({position: 'top-right',type:'success',title: 'Saved Successfully.',showConfirmButton: false,timer: 1200});
							$("input#user_first_name").prop('disabled', true);
							$("input#user_last_name").prop('disabled', true);
							$("#user_country").prop('disabled', true);
						}else if(response==2){
							swal({position: 'top-right',type:'warning',title: 'Information Not Saved, Please Try Again Later.',showConfirmButton: false,timer: 1200});
						}else{
							swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
						}
					});
			}
	});
	//========================================================	
				/***********USER PROFILE-(Change PWD)*********/
	//========================================================
		
	$(document).on('click', '#save_user_new_pwd_by_admin', function (e){
			var user_id 		= $.trim($('input#this-user-id').val());
			var new_pwd 		= $('input#user_new_pwd').val();
			var confirm_new_pwd = $('input#user_cnfrm_new_pwd').val();
			
			if(new_pwd=='' || new_pwd==undefined){
				swal("Error!", "Please Enter New Password", "error");
				return false;
			}else if(confirm_new_pwd=='' || confirm_new_pwd==undefined){
				swal("Error!", "Please Confirm New Password.", "error");
				return false;
			}else{
				$('#user_new_pwd_save_loading').show();
				$.post(site_url+'/admn5x0-process/',{
					action:'update_user_pwd_by_admin',
						u_user_id:user_id,
						u_new_pwd:new_pwd,
						u_confirm_new_pwd:confirm_new_pwd
							
					}, function(response){
						$('#user_new_pwd_save_loading').hide();
						if(response==572){
							swal({position: 'top-right',type:'warning',title: 'Your Session Expired.',showConfirmButton: false,timer: 1200});
							location.href=site_url+'/auth/logout.php';
							return false;
						}
						
						if(response.success!=undefined){
							swal({position: 'top-right',type:'success',title: response.success ,showConfirmButton: false,timer: 5000});
							
						}else if(response.error!=undefined){
							swal({position: 'top-right',type:'warning',title: response.error ,showConfirmButton: false,timer: 1200});
						}else{
							swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
						}
					},"json");
			}
	});
	
	//======================Save Payment Method=====================
	$(document).on('click', '#save_payment_method_by_admin', function (e){
		var user_id 		= $.trim($('input#this-user-id').val());
		var pay_gateway_id 	= $.trim($('#user_payment_method_dropdown option:selected').val());
		var pay_gateway_name= $.trim($('#user_payment_method_dropdown option:selected').text());
		var user_pay_email_id= $.trim($('#user_payment_id_input').val());
		
		if(pay_gateway_id=='' || pay_gateway_id==undefined || !$.isNumeric(pay_gateway_id) || pay_gateway_id==0){
			swal("Error!", "Please Select Your Payment Method.", "error");
			return false;
			
		}else if(user_pay_email_id=='' || user_pay_email_id==undefined){
			swal("Error!", "Please Add Your Payment Email OR ID.", "error");
			return false;
			
		}else{
			swal({
				  title: "Are you sure to update payment method as "+pay_gateway_name+"?",
				  text: "is this correct value = "+user_pay_email_id,
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, update it!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {
				  if (isConfirm) {
					  $('#save_payment_method_loading').hide();
					  $.post(site_url+'/admn5x0-process/',{
						action:'update_user_payment_method_by_amdin',
						u_user_id:user_id,
						u_gateway_id:pay_gateway_id,
						u_email_id:user_pay_email_id,
						}, function(response){
							$('#save_payment_method_loading').hide();
							if(response==572){
							swal({position: 'top-right',type:'warning',title: 'Your Session Expired.',showConfirmButton: false,timer: 1200});
							location.href=site_url+'/auth/logout.php';
							}else if(response==1){
								swal("Success", "Payment Method Successfully Updated!", "success");
							}else{
								swal("Unknown Error!", "Please try again later!", "error");
							}

					});
					
				  }
				});	
			
		}		
		
	});
	//========================================================	
				/***********Manage Payments*********/
	//========================================================
	//-------------------Save Min Payout-----------------	
		$(document).on('click', '.btn-save-pay', function (e){
			
			var pay_id 	= $(this).data('pay-id');
			
			
			if(pay_id!='' && pay_id!=undefined && $.isNumeric(pay_id)){
				
				
				var mini_val = $('#pay-input-'+pay_id).val();
				
				if(mini_val!='' && mini_val!=undefined && $.isNumeric(mini_val)){
					
					swal({
					  title: "Do you really want to update?",
					  text: "",
					  type: "warning",
					  showCancelButton: true,
					  confirmButtonClass: "btn-danger",
					  confirmButtonText: "Yes, Update it!",
					  cancelButtonText: "No",
					  closeOnConfirm: false,
					  closeOnCancel: true
					},
					function(isConfirm) {
					  if (isConfirm) {
						  
						  $.post(site_url+'/admn5x0-process/',{
							action:'update_min_payout',
							u_pay_id:pay_id,
							u_mini_val:mini_val
							}, function(response){
								
								if(response==1){
									swal("Success", "Minimum Payout Saved Successfully!", "success");
								}else{
									swal("Unknown Error!", "Please try again later!", "error");
								}

						});
						
					  }
					});
					
					
				}
			}
			
		});
	//-------------------Add New Payment Gateway-----------------	
		$(document).on('click', '.btn-new-gatway', function (e){
			
			var new_gateway_name = $('#new-gateway-input').val();
			
			
			if(new_gateway_name!='' && new_gateway_name!=undefined){
				
				swal({
				  title: "Do you really want to add new gatwaye "+new_gateway_name+"?",
				  text: "",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, Add it!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {
				  if (isConfirm) {
					  $('#add-gatway-loading').show();
					  $.post(site_url+'/admn5x0-process/',{
						action:'add_new_gatwaye',
						u_new_gateway_name:new_gateway_name
						}, function(response){
							$('#add-gatway-loading').hide();
							if(response.success!=undefined && response.success>0){
								$('tbody#pg-body').append('<tr>	<td>'+new_gateway_name+'</td> <td> <div class="input-group"> <input type="text" id="pay-input-'+response.success+'" class="form-control" placeholder="Payout Min. Value" value="50"> <span class="input-group-btn"> <button type="button" data-pay-id="'+response.success+'" class="btn-save-pay btn btn-success btn-anim"><i class="fa fa-save"></i><span class="btn-text">Save</span></button> </span>  </div> </td> <td> <input type="checkbox" checked data-size="small" data-pay-id="'+response.success+'" class="en-dis-payment-gt js-switch js-switch-1" data-color="#469408"/></td> </tr>');
								swal("Success!", 'New Gateway Added Successfully.', "success");
							}else if(response.error!=undefined){
								swal("Unknown Error!", response.error, "error");
							}else{
								swal("Unknown Error!", "Please try again later!", "error");
							}

					},"json"); 
					
				  }
				});
			}
			
		});	
		
	//---------------Update Payment Services Status-----------//
	
	$(document).on("change", ".en-dis-payment-gt", function () {
		var thiss 		= $(this);
		var this_pay_id = $(thiss).data('pay-id');
		if($(thiss).is(":checked")==true){
			$.send_ajax_pay_switch(1,this_pay_id);
		}else{
			$.send_ajax_pay_switch(0,this_pay_id);
		}
	});
	
	$.send_ajax_pay_switch = function(c_status,pay_id){
		$.post(site_url+'/admn5x0-process/',{
			action:'en_dis_payment_service',
			u_pay_id:pay_id,
			u_status:c_status
			}, function(response){
				
				if(response==1){
					swal("Success", "Saved Successfully!", "success");
				}else{
					swal("Unknown Error!", "Please try again later!", "error");
				}

			});
    }
	
	//========================================================	
				/***********OPTIONS*********/
	//========================================================
	//-------------------Save Input Type Text-----------------	
		$(document).on('click', '.btn-save-option', function (e){
			var opt_id 	= $(this).data('opt-id');
			var opt_name= $(this).data('opt-name');
			
			if(opt_id!='' && opt_id!=undefined && $.isNumeric(opt_id) && opt_name!='' && opt_name!=undefined){
				var opt_val = $('#'+opt_name+'-'+opt_id).val();
				if(opt_val!=undefined){
					
				swal({
				  title: "Do you really want to update this option?",
				  text: "",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, Update it!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {
				  if (isConfirm) {
					  
					  $.post(site_url+'/admn5x0-process/',{
						action:'save_option',
						u_opt_id:opt_id,
						u_opt_val:opt_val
						}, function(response){
							
							if(response==1){
								swal("Success", "Option Saved Successfully!", "success");
							}else{
								swal("Unknown Error!", "Please try again later!", "error");
							}

					});
					
				  }
				});
					
					
				}
			}
			
		});
		//-------------------Save Input Type Text------------------//
		$(document).on('click', '.opt-checkbox', function (e){
			var this_ 			= $(this);
			var opt_id 			= $(this_).val();
			var opt_val			= 0;
			
			if($(this_).prop("checked") == true){
                opt_val = 1;
            }
			
			if(opt_id!='' && opt_id!=undefined && $.isNumeric(opt_id)){
				
				
				swal({
				  title: "Do you really want to update this option?",
				  text: "",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, Update it!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {
					
					  if (isConfirm) {
						  
					  $.post(site_url+'/admn5x0-process/',{
						action:'save_option',
						u_opt_id:opt_id,
						u_opt_val:opt_val
						}, function(response){
							
							if(response==1){
								swal("Success", "Option Saved Successfully!", "success");
							}else{
								swal("Unknown Error!", "Please try again later!", "error");
							}

						});
						
					  }else{
							if($(this_).prop("checked") == true){
								$(this_).removeAttr("checked");
							}else{
								$(this_).prop('checked', true);;
							}
					  }
				});				
			}			
		});	
	//========================================================	
				/***********Home Stats*********/
	if($('.show-stats-event')!=undefined){
		setTimeout(function(){ 
			var ee = $.Event("click");
			$(".show-stats-event").trigger(ee);
		}, 1000);
		
	}
		
	//========================================================
	$(document).on('click', '.show-stats-event', function (e){
			
			var date_range = $('#stats-selected-dates').text();
			$('#stats-loading').show();
			$.post(site_url+'/admn5x0-process/',{
			action:'check_admn_stats',
			u_date_range:date_range
					
			}, function(response){
				$('#stats-loading').hide();
				if(response.data.total!=undefined){
					var clicks 	= response.data.clicks;
					var installs 	= response.data.installs;
					var conv 	= (Math.round((parseFloat(response.data.installs)*100)/parseFloat(response.data.clicks) * 100) / 100).toFixed(2);
					$('.admn-total-rev').text(response.data.total);
					$('.admn-paid-rev').text(response.data.paid);
					$('.admn-pending-rev').text(response.data.pending);
					$('.admn-profit-rev').text(response.data.profit);
					$('.admn-clicks-rev').text(clicks);
					$('.admn-installs-rev').text(installs);
					$('.admn-con-rate-rev').text(conv);
					$('.counter-anim').counterUp();
					
					var clicks_vs_installs = document.getElementById("clicks_vs_installs").getContext("2d");
					var clicks_vs_installs_data = {
						 labels: [
						"Clicks",
						"Installs",
						"Conversion Rate",
					],
					datasets: [
						{
							data: [clicks,installs,conv],
							backgroundColor: [
								"#177ec1",
								"#469408",
								"#e69a2a",
							],
							hoverBackgroundColor: [
								"#177ec1",
								"#469408",
								"#e69a2a",
							]
						}]
					};
					
					var pieChart  = new Chart(clicks_vs_installs,{
						type: 'pie',
						data: clicks_vs_installs_data,
						options: {
							animation: {
								duration:	3000
							},
							responsive: true,
							maintainAspectRatio:false,
							legend: {
								display:false
							},
							tooltip: {
								backgroundColor:'rgba(33,33,33,1)',
								cornerRadius:0,
								footerFontFamily:"'Roboto'"
							},
							elements: {
								arc: {
									borderWidth: 0
								}
							}
						}
					});
				}
				//------------CHart-------//
				if(response.chart!=undefined){
					$('#admn_stats_chart').html('');
					var data = response.chart;
					var lineChart = Morris.Area({
					element: 'admn_stats_chart',
					data: data ,
					xkey: 'Period',
					ykeys: ['Profit', 'User Rev', 'Real Amount'],
					labels: ['Profit', 'User Rev', 'Real Amount'],
					pointSize: 3,
				lineWidth: 2,
				pointStrokeColors:['#469408', '#e69a2a', '#177ec1'],
				pointFillColors:['#ffffff'],
				behaveLikeLine: true,
				gridLineColor: 'rgba(33,33,33,0.1)',
				smooth: false,
				hideHover: 'auto',
				lineColors: ['#469408', '#e69a2a', '#177ec1'],
				resize: true,
				gridTextColor:'#878787',
				gridTextFamily:"Roboto",
				parseTime: false,
				fillOpacity:0.2
				});
				}
			},"json"); 
			
	});
	//========================================================
	setInterval(function(){ 
    $.post(site_url+'/admn5x0-process/',{
		action:'check_session'
				
		}, function(response){
			if(response==572){
				swal({position: 'top-right',type:'warning',title: 'Your Session Expired.',showConfirmButton: false,timer: 1200});
				location.href=site_url+'/auth/logout.php';
			}
		},"json");   
	}, 300000);


	
	
	//========================================================	
				/***********USER PROFILE*********/
	//========================================================	
	$(document).on('click', '#save_user_profile', function (e){
			var user_first_name = $.trim($('input#user_first_name').val());
			var user_last_name 	= $.trim($('input#user_last_name').val());
			var user_phone 		= $.trim($('input#user_phone').val());
			var user_msngr 		= $('#user_msngr option:selected').val();
			var user_msngr_id 	= $.trim($('input#user_msngr_id').val());
			var user_city 		= $.trim($('input#user_city').val());
			var user_country 	= $('#user_country option:selected').val();
			var user_address 	= $.trim($('input#user_address').val());
			var user_newsletter_status = $('input#user_newsletter_status:checked').length;
			var phone_regx = /^[0-9 ()+-]+$/;			
			if(user_first_name=='' || user_first_name==undefined){
				swal("Error!", "Please Enter Your First Name.", "error");
				return false;
			}else if(user_last_name=='' || user_last_name==undefined){
				swal("Error!", "Please Enter Your Last Name.", "error");
				return false;
			}else if((user_phone==undefined) || (user_phone!='' && !phone_regx.test(user_phone))){
				swal("Error!", "Plus (+), Dash (-) and Numeric (0-9) allowed in Phone.", "error");
				return false;
			}else if(user_phone!='' && user_phone.length<10){
				swal("Error!", "Incomplete Phone Number.", "error");
				return false;
			}else if((user_msngr=='' || user_msngr==undefined) || (user_msngr!='skype' && user_msngr!='qq' && user_msngr!='icq' && user_msngr!='other')){
				swal("Error!", "Please Select Your Messenger.", "error");
				return false;
			}else if(user_msngr_id=='' || user_msngr_id==undefined){
				swal("Error!", "Please Enter Your Messenger ID or Nick Name.", "error");
				return false;
			}else if(user_city=='' || user_city==undefined){
				swal("Error!", "Please Enter Your City.", "error");
				return false;
			}else if(user_country=='' || user_country==undefined || !$.isNumeric(user_country)){
				swal("Error!", "Please Select Your Country.", "error");
				return false;
			}else if(user_address=='' || user_address==undefined){
				swal("Error!", "Please Enter Your Address.", "error");
				return false;
			}else if((user_newsletter_status==0 && user_newsletter_status==1) || (user_newsletter_status==undefined)){
				swal("Error!", "Some Thing Went Wrong, Please Try Again Later.", "error");
				return false;
			}else{
				$('#user_info_save_loading').show();
				$.post(site_url+'/user-process/',{
					action:'update_user_profile',
					u_user_first_name:user_first_name,
					u_user_last_name:user_last_name,
					u_user_phone	:user_phone,
					u_user_msngr	:user_msngr,
					u_user_msngr_id	:user_msngr_id,
					u_user_city		:user_city,
					u_user_country	:user_country,
					u_user_address	:user_address,
					u_user_newsletter_status:user_newsletter_status
							
					}, function(response){
						$('#user_info_save_loading').hide();
						if(response==572){
							swal({position: 'top-right',type:'warning',title: 'Your Session Expired.',showConfirmButton: false,timer: 1200});
							location.href=site_url+'/auth/logout.php';
						}else if(response==1){
							swal({position: 'top-right',type:'success',title: 'Saved Successfully.',showConfirmButton: false,timer: 1200});
							$("input#user_first_name").prop('disabled', true);
							$("input#user_last_name").prop('disabled', true);
							$("#user_country").prop('disabled', true);
						}else if(response==2){
							swal({position: 'top-right',type:'warning',title: 'Information Not Saved, Please Try Again Later.',showConfirmButton: false,timer: 1200});
						}else{
							swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
						}
					});
			}
	});
	//========================================================	
				/***********USER PROFILE-(Change PWD)*********/
	//========================================================	
	$(document).on('click', '#save_user_new_pwd', function (e){
			var old_pwd 		= $('input#user_old_pwd').val();
			var new_pwd 		= $('input#user_new_pwd').val();
			var confirm_new_pwd = $('input#user_cnfrm_new_pwd').val();
			
			if(old_pwd=='' || old_pwd==undefined){
				swal("Error!", "Please Enter Your Old Password.", "error");
				return false;
			}else if(new_pwd=='' || new_pwd==undefined){
				swal("Error!", "Please Enter New Password", "error");
				return false;
			}else if(confirm_new_pwd=='' || confirm_new_pwd==undefined){
				swal("Error!", "Please Confirm New Password.", "error");
				return false;
			}else{
				$('#user_new_pwd_save_loading').show();
				$.post(site_url+'/user-process/',{
					action:'update_user_pwd',
						u_old_pwd:old_pwd,
						u_new_pwd:new_pwd,
						u_confirm_new_pwd:confirm_new_pwd
							
					}, function(response){
						$('#user_new_pwd_save_loading').hide();
						if(response==572){
							swal({position: 'top-right',type:'warning',title: 'Your Session Expired.',showConfirmButton: false,timer: 1200});
							location.href=site_url+'/auth/logout.php';
							return false;
						}
						
						if(response.success!=undefined){
							swal({position: 'top-right',type:'success',title: response.success ,showConfirmButton: false,timer: 5000});
							location.href=site_url+'/auth/logout.php';
						}else if(response.error!=undefined){
							swal({position: 'top-right',type:'warning',title: response.error ,showConfirmButton: false,timer: 1200});
						}else{
							swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
						}
					},"json");
			}
	});
	//======================Show/Hide PWD=====================
	$(document).on('click', '.show_pwd_field', function (e){
		var this_ = $(this);
		$(this_).prev('input.form-control').attr('type', 'text');
		$(this_).removeClass('show_pwd_field').addClass('hide_pwd_field').html('<i class="fa fa-eye-slash" aria-hidden="true"></i>');
	});
	$(document).on('click', '.hide_pwd_field', function (e){
		var this_ = $(this);
		$(this_).prev('input.form-control').attr('type', 'password');
		$(this_).removeClass('hide_pwd_field').addClass('show_pwd_field').html('<i class="fa fa-eye" aria-hidden="true"></i>');
	});
	//========================================================	
				/***********IP Tables*********/
	//========================================================	
		$(document).on('click', '.del_banned_ip', function (e){
			
		var this_del_id = $(this).data('this-del-id');
		
			if(this_del_id!='' && this_del_id!=undefined){
				
				swal({
				  title: "Do you really want to delete this IP Record?",
				  text: "",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, delete it!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {
				  if (isConfirm) {
					  
					  $.post(site_url+'/admn5x0-process/',{
						action:'del_single_ip',
						u_this_del_id:this_del_id
						}, function(response){
							
							if(response==1){
								swal("Deleted", "Ip Deleted Successfully!", "success");
								$('tr#ip-id-'+this_del_id).remove();
							}else{
								swal("Unknown Error!", "Please debug the code!", "error");
							}

					});
					
				  }
				});				
				
			}
			
		});
	//======================Del All IP Tables==================
		$(document).on('click', '#delete-all-banned-ips', function (e){
			
		
				
				swal({
				  title: "Do you really want to delete all IP's Record?",
				  text: "",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, delete it!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {
				  if (isConfirm) {
					  
					  $.post(site_url+'/admn5x0-process/',{
						action:'del_all_ips'
						}, function(response){
							
							if(response==1){
								swal("Deleted", "All IP's Deleted Successfully!", "success");
								$('tbody').html('');
							}else{
								swal("Unknown Error!", "Please debug the code!", "error");
							}

					});
					
				  }
				});				
				
			
			
		});
	//========================================================	
		/*********** Add - View Users Section*********/
	//========================================================
	
	//--------------Generate Random Password------------------
	$(document).on('click', '#gen_new_pwd', function (e){
		var randomstring = Math.random().toString(36).slice(-10);
		$('input#user_pwd').val(randomstring);
		
	});
	//--------------------Add New User-------------------------
	
	$(document).on('click', '#add_new_user_btn', function (e){
		var user_email 		= $.trim($('input#user_email').val());
		var user_pwd 		= $.trim($('input#user_pwd').val());
		var verify_email 	= $('#send_verify_email option:selected').val();
		
		if(user_email=='' || user_email==undefined || validateEmail(user_email)==false){
			swal("Error!", "Please Enter Valid Email.", "error");
			return false;
		}else if(user_pwd=='' || user_pwd==undefined){
			swal("Error!", "Please Enter New Password", "error");
			return false;
		}else{
			
			$('#new_user_save_loading').show();
			$.post(site_url+'/admn5x0-process/',{
			action:'verify_email_address',
			u_user_email:user_email
					
			}, function(response){
				if(response==1){
					//------------------
					$.post(site_url+'/admn5x0-process/',{
						action:'add_new_user',
						u_user_email:user_email,
						u_user_pwd:user_pwd,
						u_verify_email:verify_email
								
					}, function(resp){
						if(resp==1){
							$('div#success-msg-area').html('<div class="alert alert-success alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> <i class="zmdi zmdi-check pr-15 pull-left"></i><p class="pull-left">Success! User has been added successfully.</p> <div class="clearfix"></div> </div>');
						}else{
							swal("Error!", "Unknown Error, please try again later", "error");
						}
					});
					//------------------
				}else if(response==2){
					swal("Error!", "Invalid Email Detected.", "error");
					
				}else if(response==3){
					swal("Error!", "Email Address is Already Registered.", "error");
				}else{
					swal("Error!", "Unknown Error while validating email, please try again later", "error");
				}
				$('#new_user_save_loading').hide();
			});			
		}
		
	});
	//---------------Lock/Unlock User Revenue------------------//
	
	$(document).on('click', '.unlock-rev', function (e){
		$.check_unlocked();
		var this_ = $(this);
		var this_user_id = $(this_).data('user-id');
		$(this_).removeClass('unlock-rev').addClass('lock-rev');
		$(this_).text('Lock');
		$('#user-rev-'+this_user_id).removeAttr("disabled");
		
	});
	$(document).on('click', '.lock-rev', function (e){
		var this_ = $(this);
		var this_user_id = $(this_).data('user-id');
		$(this_).removeClass('lock-rev').addClass('unlock-rev');
		$(this_).text('Unlock');
		$('#user-rev-'+this_user_id).attr("disabled", true);
		
	});
	//---------------Update User Rev Share------------------//
	
	$(document).on('click', '.update-user-rev', function (e){
		var this_ 			= $(this);
		var this_user_id 	= $(this_).data('user-id');
		var this_input_val 	= $.trim($('#user-rev-'+this_user_id).val());
		
		if(this_input_val!='' && this_input_val!=undefined && $.isNumeric(this_input_val) && $.trim(this_input_val)>0 && $.trim(this_input_val)<101){
			this_input_val 	= Math.round(this_input_val);
			
			swal({
				  title: "Do You Really Want to Update Revenue Share Percentage?",
				  text: "",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, Update it!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {					
					if (isConfirm) {
						$('#user-rev-loading-'+this_user_id).show();
						$.post(site_url+'/admn5x0-process/',{
						action:'update_user_rev',
						u_user_id:this_user_id,
						u_input_val:this_input_val
								
						}, function(response){
							$('#user-rev-loading-'+this_user_id).hide();
							
							if(response==1){
								$('#user-rev-'+this_user_id).val(this_input_val);
								$.check_unlocked();
								swal("Success", "Updated Successfully!", "success");
							}else{
								swal("Error!", "Unknown Error while updating, please try again later", "error");
							}
						},"json");
					}
				});		
			
		}else{
			swal("Error!", "Please Input Numeric Value, Min 1 to Max Value can be 100.", "error");
		}
		
	});
	//---------------Update User Payment Cycle ------------------//
	
	$(document).on('click', '.update-user-payment-cycle', function (e){
		var this_ 			= $(this);
		var this_user_id 	= $(this_).data('user-id');
		var this_payment_cycle= $(this_).data('payment-cycle');
		
		if(this_user_id!='' && this_user_id!=undefined && $.isNumeric(this_user_id) && this_payment_cycle!='' && this_payment_cycle!=undefined && $.isNumeric(this_payment_cycle)){
			
			
			swal({
				  title: "Do You Really Want to Update User ID "+this_user_id+" Payment Cycle to "+this_payment_cycle+" Day(s)?",
				  text: "",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, Update it!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {					
					if (isConfirm) {
						$('#user-payment-cycle-loading-'+this_user_id).show();
						$.post(site_url+'/admn5x0-process/',{
						action:'update_user_payment_cycle',
						u_user_id:this_user_id,
						u_input_val:this_payment_cycle
								
						}, function(response){
							$('#user-payment-cycle-loading-'+this_user_id).hide();
							
							if(response==1){
								$('#user-payment-cycle-'+this_user_id).val(this_payment_cycle);
								$.check_unlocked();
								swal("Success", "Payment Cycle Updated Successfully!", "success");
							}else{
								swal("Error!", "Unknown Error while updating, please try again later", "error");
							}
						},"json");
					}
				});		
			
		}else{
			swal("Error!", "Please Input Numeric Value, Min 1 to Max Value can be 100.", "error");
		}
		
	});
	//---------------Show/hide User Full Details------------------//
	
	$(document).on('click', '.show-user-details', function (e){
		var this_ = $(this);
		var this_user_id = $(this_).data('user-id');
		$(this_).removeClass('show-user-details').addClass('hide-user-details');
		$(this_).text('-Minimize');
		$('#user-details-'+this_user_id).show(500);
		
	});
	$(document).on('click', '.hide-user-details', function (e){
		var this_ = $(this);
		var this_user_id = $(this_).data('user-id');
		$(this_).removeClass('hide-user-details').addClass('show-user-details');
		$(this_).text('+Expand');
		$('#user-details-'+this_user_id).hide(500);
		
	});
	//---------------Update User Status------------------//
	
	$(document).on('click', '.set-user-status', function (e){
		var this_ 				= $(this);
		var this_user_id 		= $(this_).data('user-id');
		var user_new_status		= $(this_).data('user-status');
		var user_current_status	= $.trim($('#user-status-'+this_user_id).val());
		if(user_new_status==user_current_status){
			swal("Confused!", "This user is already "+user_new_status, "error");
			return false;
		}else if(this_user_id!='' && this_user_id!=undefined && $.isNumeric(this_user_id) && user_new_status!='' && user_new_status!=undefined && (user_new_status=='active' || user_new_status=='deactivated') ){
			swal({
				  title: "Do You Really Want to "+user_new_status+" this user?",
				  text: "",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, Update it!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {					
					if (isConfirm) {
						$('#user-status-loading-'+this_user_id).show();
						$.post(site_url+'/admn5x0-process/',{
						action:'update_user_status',
						u_user_id:this_user_id,
						u_user_status:user_new_status
								
						}, function(response){
							$('#user-status-loading-'+this_user_id).hide();
							
							if(response==1){
								
								var new_color = '';
								if(user_new_status=='active'){
									new_color = 'text-success';
								}else{
									new_color = 'text-info';
								}
								
								$('#user-status-'+this_user_id).removeClass('text-success');
								$('#user-status-'+this_user_id).removeClass('text-info');
								$('#user-status-'+this_user_id).removeClass('text-warning').addClass(new_color);
								
								$('#user-status-'+this_user_id).val(user_new_status);
								swal("Success", "User status "+user_new_status+" successfully!", "success");
							}else{
								swal("Error!", "Unknown Error while updating, please try again later", "error");
							}
						},"json");
					}
				});		
			
		}else{
			swal("Error!", "Opps!! Logical Error Ask for Programmer.", "error");
		}
		
	});
	//-------------------Check User Meta Modal------------------//
	$(document).on('click', '#user-meta-btn', function (e){
		var this_user_id 	= $(this).data('user-id');
		var	current_user_id = $('#user-meta-hidden-id').val();
		if(this_user_id!=current_user_id){
			$('#user-meta-hidden-id').val(this_user_id);
			var ee = $.Event("click");
			$(".reload-user-meta").trigger(ee);
		}		
	});
	//-------------------Load User Meta Data------------------//
	$(document).on('click', '.reload-user-meta', function (e){
		var this_user_id 	= $('#user-meta-hidden-id').val();
		if(this_user_id!='' && this_user_id!=undefined){
			$('ul.user-meta-sortable').html('');
			$('#user-meta-loading').show();
				
				$.post(site_url+'/admn5x0-process/',{
				action:'load_user_meta',
				u_user_id:this_user_id
						
				}, function(response){
					$('#user-meta-loading').hide();
					 
					if(response.success!=undefined){
						var meta_counts = response.success.length;
						var meta_html = '';
						for(i=0;i<meta_counts;i++){
							var this_count = i+1;
							meta_html += '<li><div class="drag-selector">'+this_count+'</div><div class="form-group inner-unit"><input type="text" class="user-meta-title form-control" value="'+response.success[i].title+'" placeholder="Title"><input type="text" class="user-meta-text form-control" value="'+response.success[i].text+'" placeholder="Text"></div><div class="close-area"><img class="remove-meta-field-btn" src="dist/img/close.png" width="15"></div></li>';
						}
						
						$('ul.user-meta-sortable').html(meta_html);
					}else if(response.none!=undefined){
						$('ul.user-meta-sortable').html('');
					}else{
						swal("Error!", "Something went wrong while loading data, please try again later!", "error");
					}
				},"json");
		}		
	});
	//-------------------Remove All User Meta by id-------------//
	$(document).on('click', '.del-all-user-meta', function (e){
		
		swal({
		  title: "Do You Really Want to remove all notes for this user?",
		  text: "",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonClass: "btn-danger",
		  confirmButtonText: "Yes, Remove it!",
		  cancelButtonText: "No",
		  closeOnConfirm: false,
		  closeOnCancel: true
		},
		function(isConfirm) {					
			if (isConfirm) {
				$('ul.user-meta-sortable').html('');
				var ee = $.Event("click");
				$(".save-all-user-meta").trigger(ee);	
			}
		});		
			
	});
	//-------------------Add More User meta------------------//
	$(document).on('click', '.add-more-meta', function (e){
			var this_ul = $('form#user-meta-form').children('ul.user-meta-sortable');
			var len 	= $(this_ul).children('li').length+1;
			$(this_ul).append('<li><div class="drag-selector">'+len+'</div><div class="form-group inner-unit"><input type="text" class="user-meta-title form-control" value="" placeholder="Title"><input type="text" class="user-meta-text form-control" value="" placeholder="Text"></div><div class="close-area"><img class="remove-meta-field-btn" src="dist/img/close.png" width="15"></div></li>');	
	});
	//-------------------Remove User Meta Field------------------//
		$(document).on('click', '.remove-meta-field-btn', function (e){
			var thiss 		   = $(this);
			var this_parent_li = $(thiss).parent().parent('li');
			var this_parent_ul = $(this_parent_li).parent('ul');
			$(this_parent_li).remove();
			var inc = 1;
			$(this_parent_ul).find('li').each(function () {
				
				$(this).children('.drag-selector').text(inc);
				inc++;			
			});
		});
	//-------------------Save All User Meta------------------//
		$(document).on('click', '.save-all-user-meta', function (e){
			$('input').removeClass('has-error');
			
			var	user_id 			= $('#user-meta-hidden-id').val();
			var meta_title_status 	= $('input.user-meta-title').val();
			var meta_text_status 	= $('input.user-meta-text').val();
			
			$('form#user-meta-form').find('input.user-meta-title').each(function(){
				var this_input = $(this);
				if($.trim($(this_input).val())=='' || /\s/.test($.trim($(this_input).val()))){
					$(this_input).addClass('has-error');
				}
			});
			
			$('form#user-meta-form').find('input.user-meta-text').each(function(){
				var this_input = $(this);
				if($.trim($(this_input).val())==''){
					$(this_input).addClass('has-error');
				}
			});
			
			var meta_has_errors= $('form#user-meta-form').find('input.has-error').length;
			
			if(user_id=="" || user_id==undefined || $.isNumeric(user_id)==false){
					swal("Error!", "Cant Save, Undetermined user selected!", "error");
				return false;
			}else if(meta_has_errors>0){
				swal("Error!", "No Empty Fields allowed!", "error");
				return false;
			}else{
				var user_meta_obj = [];
				$('form#user-meta-form').find('input.user-meta-text').each(function(){
					var this_meta_text = $(this);
					var this_prev_val = $(this_meta_text).prev('input.user-meta-title').val();
					var this_val	  = $(this_meta_text).val();
					user_meta_obj.push({'title':this_prev_val,'text':this_val});
				});
				
				$('#user-meta-loading').show();
				
				$.post(site_url+'/admn5x0-process/',{
				action:'save_user_meta',
				u_user_id:user_id,
				u_user_meta_obj:user_meta_obj
						
				}, function(response){
					$('#user-meta-loading').hide();
					 
					if(response==1){
						swal("Success!", "Successfully saved!", "success");
					}else{
						swal("Error!", "Something went wrong, please try again later!", "error");
					}
				},"json");
			}	
			
		});	
	
	//-------------------Show Hide CLicks To Users------------------//
		$(document).on('click', '.show-hide-clicks', function (e){
			var this_ 			= $(this);
			var this_user_id 	= $(this_).val();
			var set_val			= 0;
			var display_val		= 'hide';
			
			if($(this_).prop("checked") == true){
                set_val = 1;
				display_val = 'show';
            }
			
			if(this_user_id!='' && this_user_id!=undefined && $.isNumeric(this_user_id)){
				
				
				swal({
				  title: "Do You really want to "+display_val+" clicks for this user?",
				  text: "",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, "+display_val+" it!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {					
					if (isConfirm) {
						console.log('UID= ',this_user_id,'----------SETVAL= ',set_val);	
						$.post(site_url+'/admn5x0-process/',{
							action:'show_hide_clicks',
							u_user_id:this_user_id,
							u_set_val:set_val
									
							}, function(response){
								 
								if(response==1){
									swal({position: 'top-right',type:'success',title: 'Successfully Updated.' ,showConfirmButton: false,timer: 1200});
								}else{
									swal({position: 'top-right',type:'warning',title: 'Wack! DB Cant perform this action right now, for previous state reload the page.' ,showConfirmButton: false,timer: 1200});
								}
							},"json");
					}else{
						if($(this_).prop("checked") == true){
							$(this_).removeAttr("checked");
						}else{
							$(this_).prop('checked', true);;
						}
					}
				});
				
			}
			
		});	
	//========================================================	
		/*********** Landing/Downloading Domains Section*********/
	//========================================================
	//-------------------Lock/Unlock Domains------------------//
	$(document).on('click', '.unlock-textarea', function (e){
		var this_ = $(this);
		var this_section = $(this_).data('section');
		$(this_).removeClass('unlock-textarea').addClass('lock-textarea');
		$(this_).html('<i class="fa fa-lock"></i>');
		$('#'+this_section).removeAttr("disabled");
		
	});
	
	$(document).on('click', '.lock-textarea', function (e){
		var this_ = $(this);
		var this_section = $(this_).data('section');
		$(this_).removeClass('lock-textarea').addClass('unlock-textarea');
		$(this_).html('<i class="fa fa-unlock"></i>');
		$('#'+this_section).attr("disabled", true);
		
	});
	//-------------------Save Domains From Textarea------------------//
	$(document).on('click', '.save-domains', function (e){
		
		var this_ 			= $(this);
		var this_section 	= $(this_).data('section');
		var this_loading 	= $(this_).data('img');
		var this_real_file 	= $(this_).data('real-filename');
		var domains_data 	= $('#'+this_section).val().split("\n");
		var alert_danger	= 'alert-danger';
		var alert_success	= 'alert-success';
		var ico_success		= 'check';
		var ico_danger		= 'block';
		if(domains_data=='' || domains_data==undefined || domains_data.length==0){
			$('#'+this_section+'-alert').html(add_domain_alert(alert_danger,ico_danger,'Stop! Your are about to save without content.'));
			return false;
		}else if(this_section=='' || this_section==undefined){
			$('#'+this_section+'-alert').html(add_domain_alert(alert_danger,ico_danger,'Stop! Undefined Section.'));
			return false;
		}else{
			$('#'+this_section+'-alert').html('');
			$('#'+this_loading).show();
			var lines = domains_data.filter(function(v){return v!==''});
			$.post(site_url+'/admn5x0-process/',{
			action:'save_domains',
			u_domains_data:lines,
			u_real_file:this_real_file
					
			}, function(response){
				$('#'+this_loading).hide();
				 
				if(response==1){
					$('#'+this_section+'-alert').html(add_domain_alert(alert_success,ico_success,'Yay! Domains saved successfully.'));
				}else{
					$('#'+this_section+'-alert').html(add_domain_alert(alert_danger,ico_danger,'Alert! something went wrong while saving, please try again later.'));
				}
			},"json");
		}
		
	});
	
	//---------------------Verify Domains--------------------//
	$(document).on('click', '#check-domains-btn', function (e){
		
		$('html, body').animate({
				scrollTop: $("div.table-wrap").offset().top-66
			}, 1500);
		
		var all_domains = [];
					
		$('td.check-domain').each(function () {
				var this_domain = $.trim($(this).text());
				
				if(this_domain!='' && this_domain!=undefined){
					all_domains.push(this_domain);
				}
							
		});
		
		if(all_domains.length>0){
			//------------------------------
				
				$('#verify-loading').show();
				function iterator(arr) {
					
					// You can use `arr` anywhere inside of `iterator`
					function iterate(i) {
						// You can use `i` anywhere inside of `iterate`
					if (i < arr.length) {						
						
						$.post(site_url+'/admn5x0-process/',{
						action:'verify_domains',
						domain:all_domains[i]
								
						}, function(response){
							 
							if(response.success!=undefined){
								
								if($.trim(response.success.msg)=='SAFE'){
									var this_icon = '<i class="fa fa-shield mr-5 text-success"></i> '+response.success.msg;
								}else if($.trim(response.success.msg)=='MALWARE'){
									var this_icon = '<i class="fa fa-bug mr-5 text-danger"></i> '+response.success.msg;
								}else{
									var this_icon = '<i class="fa fa-exclamation-triangle mr-5 text-warning"></i> '+response.success.msg;
								}
								
								
								$('td[id="'+all_domains[i]+'-status"]').html(this_icon);
								$('td[id="'+all_domains[i]+'-date"]').text(response.success.dates);		
								
							}else if(response.error!=undefined){
								$('td[id="'+all_domains[i]+'-status"]').text(response.error);
							
							}else{
								$('td[id="'+all_domains[i]+'-status"]').text('Unknow Error');
							}
							iterate(++i);
						},"json");		
							
						}else{
							$('#verify-loading').hide();
						}
					}
					iterate(0);
				}
				//-----------------------------
				iterator(all_domains);
		}
		
		
	});
	//-------------------Save Alert for User------------------//
	$(document).on('click', '#save-alert', function (e){
		$('#alert-save-area').html('');
		
		
		var alert_text 		= $.trim($('#alert-text-area').val());
		var alert_danger	= 'alert-danger';
		var alert_success	= 'alert-success';
		var ico_success		= 'check';
		var ico_danger		= 'block';
		if(alert_text==undefined){
			$('#alert-save-area').html(add_domain_alert(alert_danger,ico_danger,'Stop! Undefined Section.'));
			return false;
		}else{
			
			$('#alert_save_loading').show();
			
			$.post(site_url+'/admn5x0-process/',{
			action:'save_alert',
			u_alert_text:alert_text
					
			}, function(response){
				$('#alert_save_loading').hide();
				 
				if(response==1){
					$('#alert-save-area').html(add_domain_alert(alert_success,ico_success,'Yay! Alert Message saved successfully.'));
				}else{
					$('#alert-save-area').html(add_domain_alert(alert_danger,ico_danger,'Alert! something went wrong while saving, please try again later.'));
				}
			},"json");
		}
		
	});
		
	//---------------------Approve User Web Site--------------------
	$(document).on('click', '.approve-site', function (e){
		var this_ 	= $(this);
		var web_id 	= $(this_).data('web-id');
		
		if(web_id!='' && web_id!=undefined && $.isNumeric(web_id)){
			$('#loading-'+web_id).show();
			
			$.post(site_url+'/admn5x0-process/',{
			action:'update_user_web_status',
			u_web_id:web_id
					
			}, function(response){
				$('#loading-'+web_id).hide();
				if(response.success!=undefined){
					$(this_).remove();
					$('#web-status-'+web_id).html('<span class="btn-xs btn-success btn-lable-wrap left-label"> <span class="btn-label"><i class="fa fa-check"></i> </span><span class="btn-text">Active</span></span>');
				}else if(response.error!=undefined){
					swal("Error!", response.error, "error");
					
				}else{
					swal("Error!", "Something Went Wrong, Please Try Again Later.", "error");
					
				}
			},"json");
		}
	});	
	//-------------------Users Websites Section Exe------------------//
	$(document).on('click', '.update-exe-btn', function (e){

		var this_btn 		= $(this);
		var this_web_id 	= $.trim($(this_btn).data('web-id'));
		var this_current_val= $.trim($(this_btn).text());
		
		if(this_web_id!=undefined && $.isNumeric(this_web_id)){
			$('#exe-update-input-field').val('');
			$('#exe-web-id').val(this_web_id);
			if(this_current_val!='' && this_current_val!=undefined && this_current_val!='Add File'){
				$('#exe-update-input-field').val(this_current_val);
			}
			$('#exe-modal-title-area').text(this_web_id);
			
		}
		
	});
	//----------------Save EXE Name From Modal-------------------
	$(document).on('click', '.save-exe-button', function (e){
		
		var this_web_id 	= $.trim($('#exe-web-id').val());
		var this_new_val 	= $.trim($('#exe-update-input-field').val());
		
		
		
		if(this_web_id!=undefined && $.isNumeric(this_web_id) && this_new_val!=undefined){
						
				$('#exe-update-loading').show();
			
				$.post(site_url+'/admn5x0-process/',{
				action:'save_exe_filename',
				u_web_id:this_web_id,
				u_new_val:this_new_val
						
				}, function(response){
					$('#exe-update-loading').hide();
					if(response==1){
						var show_msg = this_new_val+' saved for web id '+this_web_id;
						
						if(this_new_val!=''){
							$('#exe-web-'+this_web_id).removeClass('btn-primary').addClass('btn-success').text(this_new_val);
						}else{
							$('#exe-web-'+this_web_id).removeClass('btn-success').addClass('btn-primary').text('Add File');
						}
						
						swal({position: 'top-right',type:'success',title: show_msg,showConfirmButton: false,timer: 2500});
						
					}else if(response==2){
						swal({position: 'top-right',type:'warning',title: 'Cant update file name.',showConfirmButton: false,timer: 1200});
					}else{
						swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
					}
					
				},"json");
			
			
		}else{
			swal({position: 'top-right',type:'warning',title: 'Wrong Input Detected.',showConfirmButton: false,timer: 1200});
		}
		
	});
	//----------------Update EXE Source File -------------------
	$(document).on('click', '.update-exe-source', function (e){
		
		
		var this_btn 		= $(this);
		var this_web_id 	= $.trim($(this_btn).data('web-id'));
		
		
		if(this_web_id!='' && this_web_id!=undefined){
			var exe_filename = $.trim($('#exe-web-'+this_web_id).text());
			if(exe_filename=='' || exe_filename==undefined || exe_filename=='Add File'){
				$('#exe-source-update-logs-modal').modal('hide');
				swal("Error!", "Add file name first.", "error");
				return false;
			}else{
				 $("#exe-update-progress-loading").show(); 
				 $.ajax({
				  type	: "POST",
				  url	: site_url+'/admn5x0-process/',
				  data	: 'action=source_exe_update&web_id='+this_web_id+'&exe_name='+exe_filename,
				  cache	: false,
				  xhr: function(){ 
						var prevResponse = '';   
						var req = $.ajaxSettings.xhr();
						req.onreadystatechange = function() {
							if (this.readyState == 4){
							  $("#exe-update-logs").val($.trim(this.responseText));
							  $("#exe-update-progress-loading").hide();
								$("tr#web-"+this_web_id).css('background-color', "#ccc");
							}else {
								$("#exe-update-logs").val($.trim(this.responseText));
							}
						}             
						return req;
				  }
				  //other options
				});
			}			
		}
	});
	//-------------------Users Stats Section------------------//
	$(document).on('change', '#all-users-stats-select', function (e){

		$('tbody#user-stats').html('').hide();
		$('#user-meta-display-area').html('');
		$('#multiids').val('');
		var multiids = '';
		
		var user_id = $('#all-users-stats-select option:selected').val();
		
		if(user_id!='' && user_id!=undefined && $.isNumeric(user_id)){
			
			$('#user-sites-loading').show();
			
			$.post(site_url+'/admn5x0-process/',{
			action:'get_user_websites',
			u_user_id:user_id
					
			}, function(response){
				$('#user-sites-loading').hide();
				 
				if(response.success!=undefined){
					var webs_counts = response.success.length;
					var webs_reuslt_html = '<option value="">Choose Website</option>';
					for(i=0;i<webs_counts;i++){
						
						webs_reuslt_html += '<option value="'+response.success[i].web_id+'">WebID='+response.success[i].web_id+' '+response.success[i].web_url+'</option> ';
						multiids += response.success[i].web_id+',';
					}
					if(response.user_meta!=undefined && response.user_meta!='' && response.user_meta.length>0){
						var meta_counts = response.user_meta.length;
						var meta_html = '<div class="alert alert-warning alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> <p class="notes_heading">Admin Notes for this user</p>';
						for(i=0;i<meta_counts;i++){
							var this_count = i+1;
							meta_html += '<strong>'+response.user_meta[i].title+' :</strong>'+response.user_meta[i].text+'<br>';
						}
						meta_html+='</div>';
						$('#user-meta-display-area').html(meta_html);
					}
					if(multiids !=''){
						$('#multiids').val(multiids);
						$('#multiids').trigger("change");
					}
					
					$('#all-users-site-select').html(webs_reuslt_html).show(500);
				}else if(response.error!=undefined){
					$('#all-users-site-select').html('');
					$('#user-sites-container').hide(500);
				}else{
					swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
				}
			},"json");
			
			$('#user-sites-container').show(500);
			
		}else{
			$('.add-stats-date').hide();
			$('#user-sites-container').hide(500);
			$('#multiids').val('');
		}
		
	});
	//-------------------Multi Site Trigger------------------//
	$(document).on('change', '#multiids', function (e){
		
		var this_val = $('#multiids').val();
		if(this_val!=''){
			$('#all-users-site-select').trigger("change");
			//console.log(this_val);
		}
	});
	//-------------------Multi Site Trigger NULL------------------//
	$(document).on('click', '#user-sites-container', function (e){
		$('#multiids').val('');
	});
	//-------------------Stats Reload Button------------------//
	$(document).on('click', '.reload-web-stats', function (e){
		
		
		$('#all-users-site-select').trigger('change');
	});
	
	//-----------------Get Stats by User Website---------------------
	$(document).on('change', '#all-users-site-select', function (e){

		$('tbody#user-stats').hide();
		
		var multiids 	= $.trim($('#multiids').val());
		
		
		
		var site_id 	= $('#all-users-site-select option:selected').val();
		var site_text 	= $('#all-users-site-select option:selected').text();
		var date_range 	= $('#selected-dates').text();
		
		if(multiids!=''){
			site_id = multiids;
		}
		
		
		if(site_id!='' && site_id!=undefined && ($.isNumeric(site_id) || site_id.indexOf(',') != -1)){
			
			$('.add-stats-date').show();
			$('#user-stats-loading').show();
			
			$.post(site_url+'/admn5x0-process/',{
			action:'get_website_stats',
			u_site_id:site_id,
			u_date_range:date_range
					
			}, function(response){
				$('#user-stats-loading').hide();
				 
				if(response.success!=undefined){
					var stats_counts = response.success.length;
					var stats_reuslt_html = '';
					var total_reuslt_html = '';
					
					var total_installs = 0;
					var total_user_rev = 0;
					var total_real_rev = 0;
					var total_clicks   = 0;
					var total_uniq_clicks  = 0;
					var total_downloads  = 0;
					var total_win  		= 0;
					var total_mac  		= 0;
					var total_phone  	= 0;
					var total_other  	= 0;
					
					for(i=0;i<stats_counts;i++){
						var this_installs = '';
						var this_user_rev = '';
						var this_real_rev = '';
						var this_clicks	  = '';
						
						total_installs += parseFloat(response.success[i].installs);
						total_user_rev += parseFloat(response.success[i].user_rev);
						total_real_rev += parseFloat(response.success[i].real_amount);
						total_clicks   += parseFloat(response.success[i].clicks);
						total_uniq_clicks += parseFloat(response.success[i].uniq_clicks);
						total_downloads  += parseFloat(response.success[i].downloads);
						total_win  		+= parseFloat(response.success[i].os['w']);
						total_mac  		+= parseFloat(response.success[i].os['m']);
						total_phone  	+= parseFloat(response.success[i].os['p']);
						total_other  	+= parseFloat(response.success[i].os['o']);
					
						if(response.success[i].installs>0){
							this_installs = 'success';
						}else{
							this_installs = 'info';
						}						
						if(response.success[i].user_rev>0){
							this_user_rev = 'success';
						}else{
							this_user_rev = 'info';
						}
						if(response.success[i].real_amount>0){
							this_real_rev = 'success';
						}else{
							this_real_rev = 'info';
						}
						if(response.success[i].clicks>0){
							this_clicks = 'success';
						}else{
							this_clicks = 'info';
						}
						
						stats_reuslt_html += '<tr> <td>'+site_text+'</td> <td>'+response.success[i].stats_date+'</td> <td><div id="clicks-'+response.success[i].stat_id+'" class="update-stats-btn btn btn-'+this_clicks+' btn-outline pt-0 pb-0 pl-5 pr-5" data-toggle="modal" data-target="#user-stats-update-modal" data-stat-id="'+response.success[i].stat_id+'" data-action="clicks" data-date="'+response.success[i].stats_date+'">'+response.success[i].clicks+'</div></td> <td>'+response.success[i].uniq_clicks+'</td> <td>WIN: '+response.success[i].os['w']+'<br>MAC:'+response.success[i].os['m']+'<br>MOB:'+response.success[i].os['p']+'<br>O:'+response.success[i].os['o']+'</td> <td>'+response.success[i].downloads+'</td> <td><div id="installs-'+response.success[i].stat_id+'" class="update-stats-btn btn btn-'+this_installs+' btn-outline pt-0 pb-0 pl-5 pr-5" data-toggle="modal" data-target="#user-stats-update-modal" data-stat-id="'+response.success[i].stat_id+'" data-action="installs" data-date="'+response.success[i].stats_date+'">'+response.success[i].installs+'</div> </td> <td><div id="user_rev-'+response.success[i].stat_id+'" class="update-stats-btn btn btn-'+this_user_rev+' btn-outline pt-0 pb-0 pl-5 pr-5" data-toggle="modal" data-target="#user-stats-update-modal" data-stat-id="'+response.success[i].stat_id+'" data-action="user_rev" data-date="'+response.success[i].stats_date+'">'+response.success[i].user_rev+'</div></td> <td><div id="real_amount-'+response.success[i].stat_id+'" class="update-stats-btn btn btn-'+this_real_rev+' btn-outline pt-0 pb-0 pl-5 pr-5" data-toggle="modal" data-target="#user-stats-update-modal" data-stat-id="'+response.success[i].stat_id+'" data-action="real_amount" data-date="'+response.success[i].stats_date+'">'+response.success[i].real_amount+'</div></td></tr>';
					}
					
					if(multiids!=''){
						stats_reuslt_html = '';
					}
					
					total_reuslt_html = '<tr class="total-row"> <td class="text-center" colspan="2">TOTAL</td> <td>'+total_clicks+'</td> <td>'+total_uniq_clicks+'</td> <td>WIN: '+total_win+'<br>MAC:'+total_mac+'<br>MOB:'+total_phone+'<br>O:'+total_other+'</td> <td>'+total_downloads+'</td> <td>'+total_installs+'</td> <td>'+(Math.round(total_user_rev * 100) / 100).toFixed(2)+'</td> <td>'+(Math.round(total_real_rev * 100) / 100).toFixed(2)+'</td> </tr>'+ stats_reuslt_html;
					
					$('tbody#user-stats').html(total_reuslt_html).show(500);
				}else if(response.error!=undefined){
					$('tbody#user-stats').html('<tr><td>No Records Found</td>').show(500);
				}else{
					swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
				}
			},"json");
			
		}else{
			var temp_multiids = '';
			$("#all-users-site-select option").each(function(){
				var this_vall = $.trim($(this).val());
				if(this_vall!='' && this_vall!=undefined){
					temp_multiids += this_vall+',';
				}
			});
			
			if(temp_multiids!=''){
				$('#multiids').val(temp_multiids);
			}
			$('.add-stats-date').hide();
			
			
		}
		
	});
	//-------------------Add Stats Date-----------------------
	$(document).on('click', '.add-stats-date', function (e){
		
		var site_id 	= $('#all-users-site-select option:selected').val();
		var site_text 	= $('#all-users-site-select option:selected').text();
		if(site_id!='' && site_id!=undefined && $.isNumeric(site_id) && site_text!='' && site_text!=undefined){
			$('input#date-web-id').val(site_id);
			$('input#date-web-text').val(site_text);
		}else{
			$('input#date-web-id').val('');
			$('input#date-web-text').val('');
		}		
		
	});
	//-------------------Save New Stats Date-----------------------
	$(document).on('click', '.add-stats-date-btn', function (e){
		
		var site_id 	= $('input#date-web-id').val();
		var site_text 	= $('input#date-web-text').val();
		var new_date 	= $('input#new-stats-date').val();
		
		if(new_date=='' || new_date==undefined){
			swal({position: 'top-right',type:'warning',title: 'Please Pick A Date, Then Save.',showConfirmButton: false,timer: 1200});
			return false;
		}else {
			if(site_id!='' && site_id!=undefined && $.isNumeric(site_id) && site_text!='' && site_text!=undefined){
				swal({
				  title: "You are about to add new date "+new_date+" for "+site_text,
				  text: "",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, Add it!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {
				  if (isConfirm) {
					  $('#add-stats-date-loading').show();
					  $.post(site_url+'/admn5x0-process/',{
						action:'add_new_stat_date',
						u_web_id:site_id,
						u_date:new_date
						}, function(response){
							$('#add-stats-date-loading').hide();
							
							if(response.success!=undefined){
								var ee = $.Event("click");
								$(".reload-web-stats").trigger(ee);
								swal({position: 'top-right',type:'success',title: 'Stat Date Added Successfully.',showConfirmButton: false,timer: 2500});
								
							}else if(response.error!=undefined){
								swal({position: 'top-right',type:'warning',title: response.error,showConfirmButton: false,timer: 2000});
							}else{
								swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
							}

					},"json");
					
				  }
				});	
			}		
		}		
		
	});
	
	//--------------------------------------------------------
	/***************Update User Stats Values*****************/
	//--------------------------------------------------------
	//--------------Show Input Field with Val-----------------
	$(document).on('click', '.update-stats-btn', function (e){

		var this_btn 		= $(this);
		var this_action 	= $.trim($(this_btn).data('action'));
		var this_stat_id 	= $.trim($(this_btn).data('stat-id'));
		var this_stat_date 	= $.trim($(this_btn).data('date'));
		var this_current_val= $.trim($(this_btn).text());
		
		if(this_stat_id!=undefined && $.isNumeric(this_stat_id) && this_current_val!=undefined && $.isNumeric(this_current_val) && this_action!=undefined && (this_action=='clicks' || this_action=='installs' || this_action=='user_rev' || this_action=='real_amount')){
			
			$('#stat-id').val(this_stat_id);
			$('#stat-action').val(this_action);
			$('#stat-update-input-field').val(this_current_val);
			$('#stat-modal-title-area').text(this_stat_date+' '+this_action);
			
		}
		
	});
	
	//----------------Save Stats From Modal-------------------
	$(document).on('click', '.save-user-stats', function (e){
		
		$('tr.total-row').remove();
		var user_id 		= $('#all-users-stats-select option:selected').val();
		var this_action 	= $.trim($('#stat-action').val());
		var this_stat_id 	= $.trim($('#stat-id').val());
		var this_new_val 	= $.trim($('#stat-update-input-field').val());
		
		if(user_rev_auto_calc.checked==true){
			auto_calculate_user_rev = false;
		}
		
		
		if(this_stat_id!=undefined && $.isNumeric(this_stat_id) && this_new_val!=undefined && $.isNumeric(this_new_val) && this_action!=undefined && (this_action=='clicks' || this_action=='installs' || this_action=='user_rev' || this_action=='real_amount')){
			var this_current_val = $.trim($('#'+this_action+'-'+this_stat_id).text());
			
				$('#user-stat-update-loading').show();
			
				$.post(site_url+'/admn5x0-process/',{
				action:'save_user_site_stats',
				u_db_field:this_action,
				u_user_id:user_id,
				u_stat_id:this_stat_id,
				u_new_val:this_new_val,
				u_auto_calc:user_rev_auto_calc.checked
						
				}, function(response){
					$('#user-stat-update-loading').hide();
					if(response.success!=undefined){
						var show_msg = response.success.action+' saved '+response.success.input_val;
						
						$('#'+response.success.action+'-'+response.success.stat_id).removeClass('btn-info').addClass('btn-success').text(response.success.input_val);
						
						if(response.success.user_rev!=undefined && $.isNumeric(response.success.user_rev)){
							show_msg += ' and also added user rev = '+response.success.user_rev;
							$('#user_rev-'+response.success.stat_id).removeClass('btn-info').addClass('btn-success').text(response.success.user_rev);
							
						}
						$('#user-stats-update-modal').modal('hide');
						//swal({position: 'top-right',type:'success',title: show_msg,showConfirmButton: false,timer: 2500});
						
					}else if(response.error!=undefined){
						swal({position: 'top-right',type:'warning',title: response.error,showConfirmButton: false,timer: 1200});
					}else{
						swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
					}
					
				},"json");
			
			
		}else{
			swal({position: 'top-right',type:'warning',title: 'Wrong Input Detected.',showConfirmButton: false,timer: 1200});
		}
		
	});
	//*************Payments**********************//
	$(document).on('click', '#request-payment-by-admin', function (e){

		$('#payment-request-form').show(500);
		
	});
	$(document).on('click', '#cancel-payment-request', function (e){

		$('#payment-request-form').hide(500);
		
	});
	$(document).on('change', '#user_select_for_payment', function (e){

		$('#payment-request-form').hide(500);
		$('#current-user-balance').hide(500);
		
	});
	//--------------------------------------------------------
	$(document).on('click', '#submit-payment-request', function (e){
		
		var this_btn = $(this);
		var this_user_id = $(this_btn).data('user-id');
		var user_payment_method = $.trim($('#payment-method').val());
		var selected_payment_id = $.trim($("#payment-method").attr("name"));
		var requested_amount	= $.trim($('#requested-amount').val());
		var current_balance		= $.trim($('span.current_balance').text().replace(',', ''));
		var previous_paid_amount= $.trim($('span.previous-paid-amount').text().replace(',', ''));
		
		
		if(this_user_id=='' || this_user_id==undefined || $.isNumeric(this_user_id)==false){
			swal("Error!", "User ID could not fetched, please refresh the page OR check the code!", "error");
			return false;
		}else if(user_payment_method=='' || user_payment_method==undefined || selected_payment_id=='' || selected_payment_id==undefined){
			swal("Error!", "Please ask user to add payment method in his profile section!", "error");
			return false;
		}else if(requested_amount=='' || requested_amount==undefined || !$.isNumeric(requested_amount)){
			swal("Error!", "Invalid amount requested, please correct this!", "error");
			return false;
		}else if(current_balance=='' || current_balance==undefined || parseFloat(requested_amount)>parseFloat(current_balance)){
			swal("Error!", "Requested amount exceeded with current available balance!", "error");
			return false;
		}else{
						
			
			swal({
				  title: "Do You really want to submit this payment request?",
				  text: "",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Confirm!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {
				  if (isConfirm) {
					 $('#user-payment-request-loading').show();
			
						$.post(site_url+'/admn5x0-process/',{
						action:'user_submit_payment_req',
						u_requested_amount:requested_amount,
						u_user_id:this_user_id
								
						}, function(response){
							$('#user-payment-request-loading').hide();
							 
							if(response.success!=undefined){
								
								var pay_history_html = '<tr> <td>'+response.success.pay_id+'</td>  <td>'+response.success.date+'</td> <td><span class="txt-dark weight-500">'+(Math.round(response.success.amount * 100) / 100).toFixed(2)+'</span></td> <td>'+response.success.method+'</td> <td><span class="label label-warning">Pending</span></td> <td>'+response.success.comments+'</td></tr>';
								$('#requested-amount').val('');
								$('#payment-request-form').hide(500);
								$('tbody#user-payment-history').prepend(pay_history_html);
								
								var now_paid = parseFloat(previous_paid_amount)+parseFloat(requested_amount);
								var now_balance = parseFloat(current_balance)-parseFloat(requested_amount);
								
								$('span.previous-paid-amount').text(now_paid);
								$('span.current_balance').text(now_balance);
								
								swal("Success!", "Payment request successfully submitted.", "success");
								
							}else if(response.error!=undefined){
								swal("Error!", response.error, "error");
							}else{
								swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
							}
						},"json");  
					
				  }
				});
			
		}
		
	});
	//--------------------------------------------
	$(document).on('click', '.user-payment-update-btn', function (e){

		var this_btn 		= $(this);
		var invoice_id 		= $.trim($(this_btn).data('st-id'));
		if(invoice_id!='' && invoice_id!=undefined && $.isNumeric(invoice_id)){
			$('#user-payment-hidden-st-id').val(invoice_id);
			$('#invoice-id-area').text(invoice_id);
			$('#admin-comment').val('');
		}
		
	});
	
	$(document).on('click', '.user-cancel-payment-req', function (e){

		var this_btn 		= $(this);
		var invoice_id 		= $.trim($(this_btn).data('st-id'));
		if(invoice_id!='' && invoice_id!=undefined && $.isNumeric(invoice_id)){
			
			swal({
				  title: "Do you really want to cancel this invoice ID = "+invoice_id,
				  text: "",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, Cancel Invoice!",
				  cancelButtonText: "No",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function(isConfirm) {
				  if (isConfirm) {
					  
					  
					  $.post(site_url+'/admn5x0-process/',{
						action:'cancel_payment_req',
						u_invoice_id:invoice_id
						}, function(response){							
							
							if(response==1){
								$('tr#'+invoice_id).remove();
								swal({position: 'top-right',type:'success',title: 'Invoice Cancelled Successfully, Funds reverted to user account.',showConfirmButton: false,timer: 1200});
								
							}else{
								swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
							}

					},"json");
					
				  }
				});	
		}
		
	});
	
	//*************Payments**********************//
	$(document).on('click', '.update-payment-as-paid', function (e){
		var st_id 	= $('#user-payment-hidden-st-id').val();
		var comment = $('#admin-comment').val();
		
		if(st_id!='' && st_id!=undefined && $.isNumeric(st_id)){
			$('#payment-update-loading').show();
			
			$.post(site_url+'/admn5x0-process/',{
				action:'update_payment_invoice',
				u_st_id:st_id,
				u_comment:comment
						
				}, function(response){
					$('#payment-update-loading').hide();
					
					if(response==1){
						$('#status-'+st_id).text('Paid');
						$('#action-'+st_id).html('');
						swal({position: 'top-right',type:'success',title: 'Invoice Successfully Paid',showConfirmButton: false,timer: 2500});
						
					}else{
						swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
					}
					
				},"json");
		}
		
	});
	
	//*************user Balance Sheet**********************//
	$(document).on('change', '#active_user_select_for_payment_balance', function (e){
		var this_val = $('#active_user_select_for_payment_balance option:selected').val();
		
		if(this_val!='' && this_val!=undefined){
			$('#selected-users-ids-for-balance').tagsinput('add',this_val);
		}
		
		
	});
	
	
	//*************user Balance Sheet**********************//
	$(document).on('click', '#update-selected-ids', function (e){
		var selected_ids 	= $("#selected-users-ids-for-balance").tagsinput('items');
		
		
		
		if(selected_ids.length==0){
			selected_ids=[0];
		}
		
		
		
		$('#update-ids-loading').show();
			
			$.post(site_url+'/admn5x0-process/',{
				action:'update_selected_ids',
				u_selected_ids:selected_ids
						
				}, function(response){
					$('#update-ids-loading').hide();
					
					if(response==1){
						
						swal({position: 'top-right',type:'success',title: 'IDs Updated, please press reload button.',showConfirmButton: false,timer: 2500});
						
					}else{
						swal({position: 'top-right',type:'warning',title: 'Something Went Wrong, Please Try Again Later.',showConfirmButton: false,timer: 1200});
					}
					
				},"json");
		
	});
	
	
	//===============Custom Jquery Functions==================
	$.check_unlocked = function(){
        $( "a.rev-ul-child-btn" ).each(function( i ) {
			if ($(this).hasClass("lock-rev")) {
				$(this).click();
			}
		});
    }
	
	//-----------------------------------------------
	
	//========================================================
	});
})(jQuery);


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function add_domain_alert(alert_type,alert_ico,alert_msg) {
    return '<div class="alert '+alert_type+' alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> <i class="zmdi zmdi-'+alert_ico+' pr-15 pull-left"></i><p class="pull-left">'+alert_msg+'</p> <div class="clearfix"></div> </div>';
}
