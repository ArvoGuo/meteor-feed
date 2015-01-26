Meteor.publish("department_display", function() {
	return Department.find({}, {});
});

Meteor.publish("department", function() {
	return Department.find({}, {});
});

Meteor.publish("department_empty", function() {
	return Department.find({_id:null}, {});
});

Meteor.publish("department_detail", function(departmentId) {
	return Department.find({_id:departmentId}, {});
});

Meteor.publish("department_edit", function(departmentId) {
	return Department.find({_id:departmentId}, {});
});

