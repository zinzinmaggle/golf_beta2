Template.sublayout.events({
	'click #navicon': function(){
		var drawerPanel = document.getElementById('drawerPanel');
		drawerPanel.togglePanel();
	},
	'click .link_menu' :function(){
		var drawerPanel = document.getElementById('drawerPanel');
		drawerPanel.closeDrawer();
	}
});
