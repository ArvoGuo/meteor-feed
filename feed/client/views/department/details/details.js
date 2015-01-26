var pageSession = new ReactiveDict();

Template.DepartmentDetails.rendered = function() {
	
};

Template.DepartmentDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.DepartmentDetails.helpers({
	
});

Template.DepartmentDetailsDetailsForm.rendered = function() {
	

	pageSession.set("departmentDetailsDetailsFormInfoMessage", "");
	pageSession.set("departmentDetailsDetailsFormErrorMessage", "");

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

Template.DepartmentDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("departmentDetailsDetailsFormInfoMessage", "");
		pageSession.set("departmentDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("departmentDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("departmentDetailsDetailsFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("department", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("department", {});
	}

	
});

Template.DepartmentDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("departmentDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("departmentDetailsDetailsFormErrorMessage");
	}
	
});
