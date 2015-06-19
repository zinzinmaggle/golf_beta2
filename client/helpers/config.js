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

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

UI.registerHelper('formatMinutes', function(minutes) {
	var str = '';
	if (minutes > 60) {
		var hours = Math.floor(minutes / 60);
		str = '' + pad(hours, 2) + ':' + pad(minutes - (hours*60), 2);
	} else {
		str = '' + minutes;
	}

	return str;
});
UI.registerHelper('formatNumber', function(number) {
	if (parseInt(number) !== NaN)
	{
		if (parseInt(number) >= 1000)
		{
			return numberWithCommas(parseInt(number));
		}
	}
	return number;
});
