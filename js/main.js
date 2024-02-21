(function($) {
    
	"use strict";
	
	$(window).on("load", function() {
		$('.fade-in').css({position:"relative", opacity:0, top:-14});
		
		setTimeout(function() {
			$(".page-loader").fadeOut(400, function() {
				setTimeout(function() {
					$(".fade-in").each(function(index) {
						$(this).delay(400*index).animate({top:0, opacity:1}, 800);
					});
				}, 800);
			});
		}, 400);
	});

	$(document).ready(function() {
		
		//Invoke the Placeholder plugin
		$('input, textarea').placeholder();

		//Validate newsletter form
		$('<div class="success"></div>').hide().appendTo('.form-wrap');
		
		$("#newsletter-form").validate({
			rules:{
				email:{
					required:true, 
					email:true
				}
			},
			messages:{
				email:{
					required:"Email address is required",
					email:"Email address is not valid"
				}
			},
			errorElement:"span",
			errorPlacement:function(error, element) {
				error.appendTo(element.parent());
			},
			submitHandler:function(form) {
				$(form).hide();
				$(".page-loader").addClass("overlay").css({opacity:0}).show().animate({opacity:1});
				
				$.post($(form).attr("action"), $(form).serialize(), function(data) {
					$(".page-loader").animate({opacity:0}, function() {
						$(this).hide();
						$("#newsletter .success").show().html(data).animate({opacity:1});
					});
				});
				
				return false;
			}
		});
	

	});
	
})(jQuery);
