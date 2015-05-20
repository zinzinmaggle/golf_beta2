Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  encrypted_mail: function(){
		var em = CryptoJS.MD5(Meteor.user().emails[0].address).toString();
		return em;
	}
});