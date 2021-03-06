Order.allow({
	insert: function (userId, doc) {
		return true;
	},

	update: function (userId, doc, fields, modifier) {
		return userId && doc.ownerId == userId;
	},

	remove: function (userId, doc) {
    var user = Users.findOne({'_id': userId});
    if(user.roles[0] === 'admin'){
      return true;
    }
		return userId && doc.ownerId == userId;
	}
});

Order.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
	if(!doc.ownerId) doc.ownerId = userId;
if(!doc.totalAmount) doc.totalAmount = 0;
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
