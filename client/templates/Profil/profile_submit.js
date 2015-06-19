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
				// nationalite : $("#nat").selectedItem.text(),
				handicape : parseFloat($('[name=hdc]').val()),
			}
		});
		Router.go('postsList');
		}
		
	}
});
Template.userProfil.events({
	'click paper-tab': function (e) {
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
var isClubSelected = false, isLabelSelected = false, isNumberSelectedB = false, isNumberSelectedW = false,isNumberSelectedF = false;
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
			isNumberSelectedF = false;
			isNumberSelectedB = true;
			isNumberSelectedW = false;	
			break;
			case "Fer" : 
			$('#numeroBois').css('display','none');
			$('#numeroFer').css('display','block');
			$('#numeroWedge').css('display','none');
			isClubSelected = true;
			isNumberSelectedF = true;
			isNumberSelectedB = false;
			isNumberSelectedW = false;
			break;
			case "Wedge" : 
			$('#numeroBois').css('display','none');
			$('#numeroFer').css('display','none');
			$('#numeroWedge').css('display','block');
			isClubSelected = true;
			isNumberSelectedF = false;
			isNumberSelectedB = false;
			isNumberSelectedW = true;
			break;
			case "Driver" : 
			$('#numeroBois').css('display','none');
			$('#numeroFer').css('display','none');
			$('#numeroWedge').css('display','none');
			isClubSelected = true;
			isNumberSelectedF = false;
			isNumberSelectedB = false;
			isNumberSelectedW = false;
			break;
			case "Putter" : 
		  	$('#numeroBois').css('display','none');
			$('#numeroFer').css('display','none');
			$('#numeroWedge').css('display','none');
			isNumberSelectedF = false;
			isNumberSelectedB = false;
			isNumberSelectedW = false;
			isClubSelected = true;
			break;
			case "Hybride" : 
			$('#numeroBois').css('display','none');
			$('#numeroFer').css('display','none');
			$('#numeroWedge').css('display','none');
			isClubSelected = true;
			isNumberSelectedF = false;
			isNumberSelectedB = false;
			isNumberSelectedW = false;
			break;
			default: 
        	$('#numeroBois').css('display','none');
			$('#numeroFer').css('display','none');
			$('#numeroWedge').css('display','none');
			
		}
		
	},
	'core-select #numeroBois ' : function(e){
	 e.preventDefault();
		
		NumeroBois = $(e.target.selectedItem).text();
	},
	'core-select #numeroFer ' : function(e){
	 e.preventDefault();
		
		NumeroFer = $(e.target.selectedItem).text();
	},
	'core-select #numeroWedge ' : function(e){
	 e.preventDefault();
		
		NumeroWedge = $(e.target.selectedItem).text();
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
	'click #submitAddMaterial' : function(e){
		 e.preventDefault();
		
		
		 if( isLabelSelected == true && isClubSelected == true)
		 {
		 	console.log('marque ok, club ok');
		 	if(isNumberSelectedB == true && isNumberSelectedF == false && isNumberSelectedW == false)
		 	{
		 	
		 	Stuff.insert({
		 	userId : Meteor.userId(),
		 	club : Club,
		 	marque : Marque ,
		 	numero : NumeroBois,
		 	distance : $('[name=distance]').val(),

		 	});
		 	}
		 	else if(isNumberSelectedF == true && isNumberSelectedB == false && isNumberSelectedW == false)
		 	{
		 
		 	Stuff.insert({
		 	userId : Meteor.userId(),
		 	club : Club,
		 	marque : Marque ,
		 	numero : NumeroFer,
		 	distance : $('[name=distance]').val(),

		 	});
		 	}
		 	else if ( isNumberSelectedW == true && isNumberSelectedB == false && isNumberSelectedF == false)
		 	{
		 		
		 	Stuff.insert({
		 	userId : Meteor.userId(),
		 	club : Club,
		 	marque : Marque ,
		 	numero : NumeroWedge,
		 	distance : $('[name=distance]').val(),

		 	});
		 	}
		 	else
		 	{
		 		
		 		Stuff.insert({
			 	userId : Meteor.userId(),
			 	club : Club,
			 	marque : Marque ,
			 	numero : "",
			 	distance : $('[name=distance]').val(),

		 	});
		 	}
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
if (Meteor.isClient) {
  Template.carousel.rendered = function() {
    $('#carousel').slick({
      dots: true,
      arrows: true
    });
  }
}
Template.carousel.helpers({
	stuff : function () {
		
		return Stuff.find({userId: Meteor.userId()}).fetch();
		
	},
});