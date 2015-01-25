var pageSession = new ReactiveDict();

Template.OrderDetails.rendered = function() {
	
};

Template.OrderDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.OrderDetails.helpers({
	
});

Template.OrderDetailsDetailsForm.rendered = function() {
	

	pageSession.set("orderDetailsDetailsFormInfoMessage", "");
	pageSession.set("orderDetailsDetailsFormErrorMessage", "");

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

Template.OrderDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("orderDetailsDetailsFormInfoMessage", "");
		pageSession.set("orderDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("orderDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("orderDetailsDetailsFormErrorMessage", "Error. " + msg);
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

		Router.go("order", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("order", {});
	}

	
});

Template.OrderDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("orderDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("orderDetailsDetailsFormErrorMessage");
	}
	
});
