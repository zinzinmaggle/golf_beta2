Template.ProfileForm.events({
	'click #submitProfil': function(e) {
		e.preventDefault();
		if($('[name=fname]').val() =="" || $('[name=lname]').val() == "" || $('[name=phone]').val() =="" || $('[name=adresse]').val() =="" || $('[name=dpt]').val() =="" || $('[name=ville]').val() =="" ||$('[name=hdc]').val() =="")
		{
			alert("Veuillez remplir tout les champs !");
		}
		else
		{
		Meteor.users.update({
			_id:Meteor.user()._id
		}, {
			$set: { 
				// username: $(e.target).find('[name=username]').val(),
				firstName: $('[name=fname]').val(),
				lastName: $('[name=lname]').val(),
				accountType : 'regular',
				gender : $('#gender')[0].selectedItem.label,
				phone : $('[name=phone]').val(),
				adresse : $('[name=adresse]').val(),
				codePostal : $('[name=dpt]').val(),
				ville : $('[name=ville]').val(),
				nationalite : $("#nat").selectedItem.text(),
				handicape : $('[name=hdc]').val(),
			}
		});
		Router.go('postsList');
		}
		
	}
});
Template.userProfil.events({
	'click paper-tab': function (e) {
		console.log($(e.target).attr('page'));
		Session.set('currentTabProfil', $(e.target).attr('page'));
		
	},
});
Deps.autorun(function(){
	Meteor.subscribe('userData');
});

Template.userProfil.helpers({
	users: function() {
		return Meteor.users.find();
	},
	currentTabProfil: function() {
		return Session.get('currentTabProfil');
	}
});

Template.stuff.rendered = function()
{
	$('#numeroBois').css('display','none');
	$('#numeroFer').css('display','none');
	$('#numeroWedge').css('display','none');
	$('#submitAddMaterial').attr('disabled','disabled');
};
var isClubSelected = false, isLabelSelected = false, isNumberSelected = false;
var Club = "", Marque ="", NumeroFer ="", NumeroBois= "",NumeroWedge="";
Template.stuff.events({
	'core-select #mesClubs ' : function(e){
	 e.preventDefault();
		
		Club = $(e.target.selectedItem).text();
		switch(Club)
		{
			case "Bois" : 
			$('#numeroBois').css('display','block');
			$('#numeroFer').css('display','none');
			$('#numeroWedge').css('display','none');
			isClubSelected = true;
			break;
			case "Fer" : 
			$('#numeroBois').css('display','none');
			$('#numeroFer').css('display','block');
			$('#numeroWedge').css('display','none');
			isClubSelected = true;
			break;
			case "Wedge" : 
			$('#numeroBois').css('display','none');
			$('#numeroFer').css('display','none');
			$('#numeroWedge').css('display','block');
			isClubSelected = true;
			break;
			case "Driver" : 
			$('#numeroBois').css('display','none');
			$('#numeroFer').css('display','none');
			$('#numeroWedge').css('display','none');
			isClubSelected = true;
			break;
			case "Putter" : 
		  	$('#numeroBois').css('display','none');
			$('#numeroFer').css('display','none');
			$('#numeroWedge').css('display','none');
			isClubSelected = true;
			break;
			case "Hybride" : 
			$('#numeroBois').css('display','none');
			$('#numeroFer').css('display','none');
			$('#numeroWedge').css('display','none');
			isClubSelected = true;
			break;
			default: 
        	$('#numeroBois').css('display','none');
			$('#numeroFer').css('display','none');
			$('#numeroWedge').css('display','none');
			
		}
		
	},
	'core-select #mesMarques ' : function(e){
	 e.preventDefault();
		
		Marque = $(e.target.selectedItem).text();
		switch(Marque)
		{
			case "Taylor Made" : 	
			isLabelSelected = true;
			break;
			case "Mizuno" : 
			isLabelSelected = true;
			break;
			case "Nike" : 
			isLabelSelected = true;
			break;
			case "Gallaway" : 
		
			isLabelSelected = true;
			break;
			case "Wilson" : 
		  	isLabelSelected = true;
			break;
			case "Cobra" : 
			isLabelSelected = true;
			break;
			case "Titleist" : 
			isLabelSelected = true;
			break;
			case "Ping" : 
			isLabelSelected = true;
			break;
			case "Cleveland" : 
			isLabelSelected = true;
			break;
			case "Autres" : 
			isLabelSelected = true;
			break;
			
		}
	
	},
	'core-select #numeroFer ' : function(e){
	 e.preventDefault();
		
		NumeroFer = $(e.target.selectedItem).text();
		switch(NumeroFer)
		{
			case "Fer 1" : 	
			isNumberSelected = true;
			break;
			case "Fer 2" : 
			isNumberSelected = true;
			break;
			case "Fer 3" : 
			isNumberSelected = true;
			break;
			case "Fer 4" : 
			isNumberSelected = true;
			break;
			case "Fer 5" : 
		  	isNumberSelected = true;
			break;
			case "Fer 6" : 
			isNumberSelected = true;
			break;
			case "Fer 7" : 
			isNumberSelected = true;
			break;
			case "Fer 8" : 
			isNumberSelected = true;
			break;
			case "Fer 9" : 
			isNumberSelected = true;
			break;
			case "Fer 10" : 
			isNumberSelected = true;
			break;
			case "Fer 11" : 
			isNumberSelected = true;
			break;
			
		}
	
	},
	'core-select #numeroBois ' : function(e){
	 e.preventDefault();
		
		NumeroBois = $(e.target.selectedItem).text();
		switch(NumeroBois)
		{
			case "Bois 1" : 	
			isNumberSelected = true;
			break;
			case "Bois 2" : 
			isNumberSelected = true;
			break;
			case "Bois 3" : 
			isNumberSelected = true;
			break;
			case "Bois 4" : 
			isNumberSelected = true;
			break;
			case "Bois 5" : 
		  	isNumberSelected = true;
			break;
			
			
		}
	
	},
	'core-select #numeroWedge ' : function(e){
	 e.preventDefault();
		
		NumeroWedge = $(e.target.selectedItem).text();
		switch(NumeroWedge)
		{
			case "Pitch wedge" : 	
			isNumberSelected = true;
			break;
			case "Gap wedge" : 
			isNumberSelected = true;
			break;
			case "Sand wedge" : 
			isNumberSelected = true;
			break;
			case "Lob wedge" : 
			isNumberSelected = true;
			break;
		}
	
	},
	'click #submitAddMaterial' : function(e){
		 e.preventDefault();
		 var tabNumero = [];
		 tabNumero.push(NumeroBois);
		 tabNumero.push(NumeroFer);
		 
		 tabNumero.push(NumeroWedge);
		
		 if(isLabelSelected == true && isClubSelected == true && isNumberSelected == true)
		 {
		 	Stuff.insert({

		 	club : Club,
		 	marque : Marque ,
		 	numero : tabNumero,
		 	distance : $('[name=distance]').val(),

		 	});
		 }
		 else
		 {
		 	alert("Veuillez remplir tous les champs !");
		 }
	}, 
	'keyup #distance ':function(e){
		e.preventDefault();

		if($(e.target).val().length > 0)
		{
			$('#submitAddMaterial').removeAttr('disabled');
		}
		else
		{
			$('#submitAddMaterial').attr('disabled','disabled');
		}
	}
});
