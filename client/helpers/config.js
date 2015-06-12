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

Template.registerHelper('$mapped', function(arr) {
	return _.map(arr, function(item, index) {
		/* jshint -W053 */
		// In this case we explicitly want String to be used as a constructor, so that we can add properties to it.
		var strObj = new String(item + '');
		/* jshint +W053 */
		strObj.$first = index === 0;
		strObj.$index = index;
		strObj.$last = index === arr.length - 1;
		return strObj;
	});
});
