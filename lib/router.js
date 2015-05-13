Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {name: 'postsList'});
Router.route('/userProfil', {name: 'userProfil',
data: function() { return Meteor.user(this.params._id);}
});

var requireLogin = function() {
    if (! Meteor.user()) {
        this.render('accessDenied');
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLogin, {only: 'postsList'});
Router.onBeforeAction(requireLogin, {only: 'userProfil'});