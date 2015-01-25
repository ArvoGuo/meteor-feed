Template.Home.rendered = function() {
	
};

Template.Home.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Home.helpers({
	
});

Template.HomeHomeMeteorFeed.rendered = function() {
	
};

Template.HomeHomeMeteorFeed.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("shop", {});
	}
	
});

Template.HomeHomeMeteorFeed.helpers({
	
});
