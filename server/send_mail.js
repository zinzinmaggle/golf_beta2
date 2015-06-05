process.env.MAIL_URL="smtp://frederic.quemper%40gmail.com:yyyyyy@smtp.gmail.com:465/";
Meteor.methods({

	SendEmail: function (UserId, email) {

		Email.send({
			from : email,
			to : "frederic.quemper@gmail.com",
			subject : "Un bug à été signalé",
			text : "gros sexe"
		});
	},
});