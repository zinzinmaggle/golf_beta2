var instance,jour,mois,annee,heure,minute,nomGolf,ville,adresse,adresse2;
var hasbeenSelected = false;
Template.events.events({
	'click paper-tab': function (e) {
		console.log($(e.target).attr('page'));
		Session.set('currentTabEvent', $(e.target).attr('page'));
		
	},
	
});
Template.createEvent.events({

	'click #submitEvent':function(e){
		e.preventDefault();
		console.log(jour);
		if($('[name=tevent]').val() =="" || $('[name=devent]').val() == "" || typeof(jour) == 'undefined' || typeof(mois) == "undefined" || typeof(annee) == "undefined" || typeof(heure) == "undefined" || typeof(minute) =="undefined" || hasbeenSelected == false )
		{
			alert("Veuillez remplir tout les champs !");
		}
		else
		{
			var particp = [{id : Meteor.userId(),statut : '1'}];

			Events.insert({

				nom : $('[name=tevent]').val(),
				nomGolf : nomGolf,
				ville : ville,
				adressse :adresse,
				adresse2 : adresse2,
				date : jour+'/'+mois+'/'+annee,
				heure : heure+' : '+minute,
				description : $('[dame=tevent]').val(),
				administrateur: Meteor.userId(),
				participants : particp,

			});
			Posts.insert({

				title: Meteor.user().username,
		        subtitle:'− à créer un évènement',
		        content:'Golf :' + nomGolf +'<br> Adresse :' + adresse + '<br><br> <small style="font-style: italic;">'+$('[dame=tevent]').val()+'</small>',
		        author : Meteor.user().username,
		        submit_date: new Date(),
		        type:'event',
		        encrypted_mail : Meteor.user().encryptedMail,
		        id : Meteor.userId(),

			})
		}
	},
	'core-select #jour ' : function(e){
	 e.preventDefault();
		
		jour = $(e.target.selectedItem).text();
	},
	'core-select #moi ' : function(e){
	 e.preventDefault();
		
		mois = $(e.target.selectedItem).text();
	},
	'core-select #annee ' : function(e){
	 e.preventDefault();
		
		annee = $(e.target.selectedItem).text();
	},
	'core-select #heure ' : function(e){
	 e.preventDefault();
		
		heure = $(e.target.selectedItem).text();
	},
	'core-select #minute ' : function(e){
	 e.preventDefault();
		
		minute = $(e.target.selectedItem).text();
	}
});
Template.events.rendered = function() {
    instance = EasySearch.getComponentInstance({
        id: 'golfSearchEvent',
        index: 'Eventgolfs'
    });
};
Template.events.helpers({
	currentTabEvent: function() {
		return Session.get('currentTabEvent');
	},
	golfs: function() {
		return Golf.find();
	}
});
Template.golfCard2.helpers({
	image: function() {
		if (this.photos != undefined && this.photos.length > 0)
			return '/photos/' + this.photos[0];
		return 'http://lorempixel.com/90/90/nature/g' + this.zipCode;
	},
	golfs: function() {
		return Golf.find();
	}
});
Template.golfCard2.events({

	'click .selectThisGolf':function(e){
		e.preventDefault();
		nomGolf = this.name;
		ville = this.city;
		adresse = this.address1;
		adresse2 = this.address2;
		hasbeenSelected = true;
		$(e.target).attr('disabled','disabled')
	}
});