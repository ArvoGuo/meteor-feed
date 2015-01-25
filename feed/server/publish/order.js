Meteor.publish("order", function() {
	return Order.find({}, {});
});

Meteor.publish("order_empty", function() {
	return Order.find({_id:null}, {});
});

Meteor.publish("order_detail", function(orderId) {
	return Order.find({_id:orderId}, {});
});

