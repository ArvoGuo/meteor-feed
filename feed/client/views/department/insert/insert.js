var pageSession = new ReactiveDict();

Template.DepartmentInsert.rendered = function() {
	
};

Template.DepartmentInsert.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.DepartmentInsert.helpers({
	
});

Template.DepartmentInsertInsertForm.rendered = function() {
	

	pageSession.set("departmentInsertInsertFormInfoMessage", "");
	pageSession.set("departmentInsertInsertFormErrorMessage", "");

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

Template.DepartmentInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("departmentInsertInsertFormInfoMessage", "");
		pageSession.set("departmentInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("departmentInsertInsertFormInfoMessage", "Saved.");
			}

			Router.go("department", {});
		}

		function errorAction(msg) {
			pageSession.set("departmentInsertInsertFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Department.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

Template.DepartmentInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("departmentInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("departmentInsertInsertFormErrorMessage");
	}
	
});
