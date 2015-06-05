var ImageTab =[];
Template.gallery.rendered = function() {
       Session.set('currentTab', 'tab1');
       if(Meteor.isClient){
       Dropzone.autoDiscover = false;
       
       var dropzone = new Dropzone(".dropzone",{
        url : '127.0.0.1/upload.php',
      });
      
          

       dropzone.on("complete",function(file){
        
          if (file.type != "image/jpeg" && file.type != "image/png") {
          
          }
    
       });  
       
       dropzone.on("success",function(file,ServerMessage){


         ImageTab.push(file.name);
        
        

       });  



       dropzone.on("error",function(file,errorMessage){
              
       
       });  

       /*faire un event sur erreur qui disabled le bouton*/

       }
  };
Template.gallery.events({
  'click paper-tab': function (e) {
    console.log($(e.target).attr('page'));
    Session.set('currentTab', $(e.target).attr('page'));
    
  },
  'click .creeralbum':function(e){
    e.preventDefault();
    console.log($(e.target).find('[name=nomalbum]').val());
    Meteor.call('InsertDefinitive', ImageTab, $(e.target).find('[name=nomalbum]').val(),'1',Meteor.userId());
      
    
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

