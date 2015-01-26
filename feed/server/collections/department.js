Department.allow({
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

Department.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
});

Department.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Department.before.remove(function(userId, doc) {
	
});

Department.after.insert(function(userId, doc) {
	
});

Department.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Department.after.remove(function(userId, doc) {
	
});
