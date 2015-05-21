Template.loadMoreButton.inheritsHelpersFrom("esLoadMoreButton");
Template.loadMoreButton.inheritsEventsFrom("esLoadMoreButton");

Template.loadMoreButton.events({
	'click paper-button' : function(e) {
		$(e.target).parent().prev().trigger('click');
	}
});
