Template.headerloginForm.helpers({
	title: function(){
		if (Router.current().route.path(this) === '/login')
			return 'Connexion';
		else if(Router.current().route.path(this) === '/register')
			return 'Inscription';
		else if(Router.current().route.path(this) === '/fgtPassword')
			return 'Mot de passe oublié';
		else
			return 'Déconnecté';
	}
});


AccountsTemplates.configure({
    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: true,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,

    // Appearance
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    hideSignInLink:true,
    hideSignUpLink:true,
    
    homeRoutePath: '/',
    redirectTimeout: 4000,
    
    
    
});

