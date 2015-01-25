Shop.allow({
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

Shop.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
});

Shop.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Shop.before.remove(function(userId, doc) {
	
});

Shop.after.insert(function(userId, doc) {
	
});

Shop.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Shop.after.remove(function(userId, doc) {
	
});
