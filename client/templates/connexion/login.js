
Template.index.rendered = function () {
 //    $('.carousel').carousel();
 //    $('.carousel-inner').swipe( {
	// 	//Generic swipe handler for all directions
	// 	swipeLeft:function(event, direction, distance, duration, fingerCount) {
	// 		$(this).parent().carousel('next'); 
	// 	},
	// 	swipeRight: function() {
	// 		$(this).parent().carousel('prev'); 
	// 	},
	// 	//Default is 75px, set to 0 for demo so any distance triggers swipe
	// 	threshold:0
	// });
	$(document).ready(function(){
		$('.slider').slider({
			full_width: true
		});
	});
	// var $image = $('img.image_slider');
 //    var image_width = $image.width(); 
 //    var image_height = $image.height();     
     
 //    var over = image_width / image_height; 
 //    var under = image_height / image_width; 
     
 //    var body_width = $(window).width(); 
 //    var body_height = $(window).height(); 
     
 //    if (body_width / body_height >= over) { 
 //      $image.css({ 
 //        'width': body_width + 'px', 
 //        'height': Math.ceil(under * body_width) + 'px', 
 //        'left': '0px', 
 //        'top': Math.abs((under * body_width) - body_height) / -2 + 'px' 
 //      }); 
 //    }  
     
 //    else { 
 //      $image.css({ 
 //        'width': Math.ceil(over * body_height) + 'px', 
 //        'height': body_height + 'px', 
 //        'top': '0px', 
 //        'left': Math.abs((over * body_height) - body_width) / -2 + 'px' 
 //      }); 
 //    } 
 //    $(window).resize(function(){ 
 //    	 var $image = $('img.image_slider');
 //    var image_width = $image.width(); 
 //    var image_height = $image.height();     
     
 //    var over = image_width / image_height; 
 //    var under = image_height / image_width; 
     
 //    var body_width = $(window).width(); 
 //    var body_height = $(window).height(); 
     
 //    if (body_width / body_height >= over) { 
 //      $image.css({ 
 //        'width': body_width + 'px', 
 //        'height': Math.ceil(under * body_width) + 'px', 
 //        'left': '0px', 
 //        'top': Math.abs((under * body_width) - body_height) / -2 + 'px' 
 //      }); 
 //    }  
     
 //    else { 
 //      $image.css({ 
 //        'width': Math.ceil(over * body_height) + 'px', 
 //        'height': body_height + 'px', 
 //        'top': '0px', 
 //        'left': Math.abs((over * body_height) - body_width) / -2 + 'px' 
 //      }); 
 //    } 
 //    }); 			
};
