/*Template.atForm.rendered = function () {

   	var a = document.getElementById("at-forgotPwd");
	a.href = "/fgtPassword";

};*/
Template.slider_connexion.rendered = function () {
    $('.carousel').carousel();
    $('.carousel-inner').swipe( {
						//Generic swipe handler for all directions
						swipeLeft:function(event, direction, distance, duration, fingerCount) {
							$(this).parent().carousel('next'); 
						},
						swipeRight: function() {
							$(this).parent().carousel('prev'); 
						},
						//Default is 75px, set to 0 for demo so any distance triggers swipe
						threshold:0
					});
				
};
