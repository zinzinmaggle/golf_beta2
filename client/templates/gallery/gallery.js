var isError = 0;
Template.gallery.rendered = function() {
       Session.set('currentTab', 'tab1');
       if(Meteor.isClient){
       Dropzone.autoDiscover = false;
       var ImageTab =[];
       var dropzone = new Dropzone("div#test",{url : '/gallery/'});
      
          

       dropzone.on("complete",function(file){
          ImageTab.push(file.name);
          Meteor.call("Insert", ImageTab, Meteor.userId(),'0');
       });  
       




       dropzone.on("error",function(file,errorMessage){
              isError = 1;
       });  

       /*faire un event sur erreur qui disabled le bouton*/

       }
  };
Template.gallery.events({
  'click paper-tab': function (e) {
    console.log($(e.target).attr('page'));
    Session.set('currentTab', $(e.target).attr('page'));
    // $('core-pages#tabContent').attr('selected', function() {
    //  return $(e.target).attr('page')
    // });
  },
  'click .creeralbum':function(e){
    e.preventDefault();
    if($(e.target).find('[name=nalbum]').val() == "" || isError == 1)
    {
      alert('entrer un nom d\'album');
    }
   
    else
    {
      Meteor.call('InsertDefinitive', $(e.target).find('[name=nalbum]').val(),'1',Meteor.userId());
      
    }
  },
  'keyup .nomdelalbum' : function(e){
    e.preventDefault();
    if($(e.target).val().length > 0)
    {
       $('.creeralbum').removeAttr('disabled');
    }
    else
    {
       $('.creeralbum').attr('disabled','disabled');
    }
  }


});
Template.gallery.helpers({

  currentTab: function() {
    return Session.get('currentTab');
  }
});

