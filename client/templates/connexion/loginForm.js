Template.headerloginForm.helpers({
	title: function(){
		if (Router.current().route.path(this) === '/login')
			return 'Connexion';
		else
			return 'Inscription';
	}
});
