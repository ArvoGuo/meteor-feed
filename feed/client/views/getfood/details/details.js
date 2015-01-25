var pageSession = new ReactiveDict();

Template.GetfoodDetails.rendered = function() {
	
};

Template.GetfoodDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.GetfoodDetails.helpers({
	
});

Template.GetfoodDetailsDetailsForm.rendered = function() {
	

	pageSession.set("getfoodDetailsDetailsFormInfoMessage", "");
	pageSession.set("getfoodDetailsDetailsFormErrorMessage", "");

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

Template.GetfoodDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("getfoodDetailsDetailsFormInfoMessage", "");
		pageSession.set("getfoodDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("getfoodDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("getfoodDetailsDetailsFormErrorMessage", "Error. " + msg);
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

Template.GetfoodDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("getfoodDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("getfoodDetailsDetailsFormErrorMessage");
	}
	
});
