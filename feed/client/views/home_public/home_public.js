Template.HomePublic.rendered = function() {
	
};

Template.HomePublic.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.HomePublic.helpers({
	
});

Template.HomePublicHomeMeteorFeed.rendered = function() {
	
};

Template.HomePublicHomeMeteorFeed.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("shop", {});
	}
	
});

Template.HomePublicHomeMeteorFeed.helpers({
	
});
