this.AdminUsersEditController = RouteController.extend({
	template: "Admin",

	yieldTemplates: {
		'AdminUsersEdit': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("department"),
			Meteor.subscribe("admin_user", this.params.userId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			department: Department.find({}, {}),
			admin_user: Users.findOne({_id:this.params.userId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});