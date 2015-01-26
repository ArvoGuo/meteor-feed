Meteor.publish("order", function() {
	return Order.find({ownerId:this.userId}, {});
});

Meteor.publish("order_manage", function() {
	return Order.find({}, {});
});

Meteor.publish("order_detail", function(orderId) {
	return Order.find({_id:orderId,ownerId:this.userId}, {});
});

