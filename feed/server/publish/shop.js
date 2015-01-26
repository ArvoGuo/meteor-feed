Meteor.publish("shop", function() {
	return Shop.find({}, {});
});

Meteor.publish("shop_empty", function() {
	return Shop.find({_id:"null"}, {});
});

Meteor.publish("shop_detail", function(shopId) {
	return Shop.find({_id:shopId}, {});
});

Meteor.publish("shop_edit", function(shopId) {
	return Shop.find({_id:shopId}, {});
});

