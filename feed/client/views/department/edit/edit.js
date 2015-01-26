var pageSession = new ReactiveDict();

Template.DepartmentEdit.rendered = function() {
	
};

Template.DepartmentEdit.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.DepartmentEdit.helpers({
	
});

Template.DepartmentEditEditForm.rendered = function() {
	

	pageSession.set("departmentEditEditFormInfoMessage", "");
	pageSession.set("departmentEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();			
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[autofocus]").focus();
};

Template.DepartmentEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("departmentEditEditFormInfoMessage", "");
		pageSession.set("departmentEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("departmentEditEditFormInfoMessage", "Saved.");
			}

			Router.go("department", {});
		}

		function errorAction(msg) {
			pageSession.set("departmentEditEditFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Department.update({ _id: t.data.department_edit._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("department", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.DepartmentEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("departmentEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("departmentEditEditFormErrorMessage");
	}
	
});
