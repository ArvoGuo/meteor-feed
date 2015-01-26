this.DepartmentEditController = RouteController.extend({
	template: "DepartmentEdit",

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
			Meteor.subscribe("department_edit", this.params.departmentId)
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
			department_edit: Department.findOne({_id:this.params.departmentId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});