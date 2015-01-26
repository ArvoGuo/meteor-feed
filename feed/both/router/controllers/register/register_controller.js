this.RegisterController = RouteController.extend({
	template: "Register",

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("department_display")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
	
    console.log(Department.find({},{}).fetch())
		return {
			params: this.params || {},
			department_display: Department.find({}, {}).fetch()
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
