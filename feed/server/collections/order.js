Order.allow({
	insert: function (userId, doc) {
		return true;
	},

	update: function (userId, doc, fields, modifier) {
		return true;
	},

	remove: function (userId, doc) {
		return true;
	}
});

Order.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
});

Order.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Order.before.remove(function(userId, doc) {
	
});

Order.after.insert(function(userId, doc) {
	
});

Order.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Order.after.remove(function(userId, doc) {
	
});
