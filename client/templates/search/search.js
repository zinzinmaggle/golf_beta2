Template.loadMoreButton.inheritsHelpersFrom("esLoadMoreButton");
Template.loadMoreButton.inheritsEventsFrom("esLoadMoreButton");

Template.searchInput.inheritsHelpersFrom("esInput");
Template.searchInput.inheritsEventsFrom("esInput");
Template.searchInput.replaces("esInput");

Template.loadMoreButton.events({
	'click paper-button' : function(e) {
		$(e.target).parent().prev().trigger('click');
	}
});
