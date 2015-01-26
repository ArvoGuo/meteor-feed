this.GetfoodDetailsController = RouteController.extend({
	template: "GetfoodDetails",

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
			Meteor.subscribe("shop_detail", this.params.shopId)
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
			shop_detail: Shop.findOne({_id:this.params.shopId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});