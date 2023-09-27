<?php
$running_crons_arr =get_all_cron_status();
?>
<!-- Title -->
<div class="row heading-bg">
	<div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
		<h5 class="txt-dark">Cron Status</h5>
	</div>
	<!-- Breadcrumb -->
	<div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
		<ol class="breadcrumb">
			
			<li class="active">Cron Status</li>
		</ol>
	</div>
	<!-- /Breadcrumb -->
</div>
<!-- /Title -->
<div class="row">			
	<!-- Bordered Table -->
	<div class="col-sm-12">
		<div class="panel panel-default card-view">
			
			<div class="panel-wrapper collapse in">
				<div class="panel-body">
						<p class="text-muted">This section provieds you cron status and its last run stats, you can analyze in below table whether the crons are running properly or not. (Note: Timezone is PST)</p>
					<div class="table-wrap mt-10">
						<div class="table-responsive">
						  <table class="table table-hover table-bordered mb-0">
							<thead>
							  <tr>
								<th>Cron/Task</th>
								<th>Date</th>
								<th>Last Run</th>
							  </tr>
							</thead>
							<tbody>
							<?php
								if(isset($running_crons_arr) && !empty($running_crons_arr) && is_array($running_crons_arr)){
									foreach($running_crons_arr as $single_cron_staus){?>
										<tr id="cron-status-row-<?php echo $single_cron_staus['id'];?>">
											<td><?php echo ucwords(str_replace('_',' ',$single_cron_staus['cron_name']));?></td>
											<td><?php echo date("D, d-M-Y",strtotime("+5 hours", strtotime($single_cron_staus['cron_last_update'])));?></td>
											<td><?php echo 'PST - '.date("g:i a",strtotime("+5 hours", strtotime($single_cron_staus['cron_last_update'])));?></td>
										 </tr>
							<?php	}
								}else{
									echo '<tr>
											<td colspan="3">NO RECORDS FOUND</td>
										  </tr>';
								}
							?>
							</tbody>
						  </table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /Bordered Table -->
</div>