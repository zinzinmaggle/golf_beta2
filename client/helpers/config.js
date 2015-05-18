T9n.setLanguage('fr');

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');

AccountsTemplates.addFields([
	{
	    _id: 'username',
	    type: 'text',
	    required: true,
		displayName: "Nom d'utilisateur",
	    func: function(value){
	        if (Meteor.isClient) {
	            console.log("Validating username...");
	            var self = this;
	            Meteor.call("userExists", value, function(err, userExists){
	                if (!userExists)
	                    self.setSuccess();
	                else
	                    self.setError(userExists);
	                self.setValidating(false);
	            });
	            return;
	        }
	        // Server
	        return Meteor.call("userExists", value);
	    },
	},
	{
		_id: 'email',
		type: 'email',
		required: true,
		displayName: "email",
		re: /.+@(.+){2,}\.(.+){2,}/,
		errStr: 'Invalid email',
	},
	pwd
]);

AccountsTemplates.configure({
    // Redirects
    homeRoutePath: '/news'
});
