Template.headerloginForm.helpers({
	title: function(){
		if (Router.current().route.path(this) === '/login')
			return 'Connexion';
		else if(Router.current().route.path(this) === '/register')
			return 'Inscription';
		else if(Router.current().route.path(this) === '/forgot-password')
			return 'Mot de passe oublié';
		else
			return 'Connexion';
	}
});

Template.pwdFormBtn.inheritsHelpersFrom("atPwdFormBtn");
Template.pwdFormBtn.inheritsEventsFrom("atPwdFormBtn");
Template.pwdFormBtn.inheritsHooksFrom("atPwdFormBtn");
Template.pwdFormBtn.replaces("atPwdFormBtn");
