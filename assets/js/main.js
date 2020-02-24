$(document).ready(function(){

	$("div").mouseenter(function(){
		 var id = $(this).attr('id');
		 $('a').removeClass('active');
		 $("[href=#"+id+"]").addClass('active');
	});
 
 });