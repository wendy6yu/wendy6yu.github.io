$(document).ready(function(){

	$("div").mouseenter(function(){
		 var id = $(this).attr('id');
		 $('a').removeClass('active');
		 $("[href=#"+id+"]").addClass('active');
	});
 
 });

var coll = $(".collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}