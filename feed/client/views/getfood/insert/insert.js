var pageSession = new ReactiveDict();

Template.GetfoodInsert.rendered = function() {
	
};

Template.GetfoodInsert.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.GetfoodInsert.helpers({
	
});

Template.GetfoodInsertInsertForm.rendered = function() {
	

	pageSession.set("getfoodInsertInsertFormInfoMessage", "");
	pageSession.set("getfoodInsertInsertFormErrorMessage", "");

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

Template.GetfoodInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("getfoodInsertInsertFormInfoMessage", "");
		pageSession.set("getfoodInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("getfoodInsertInsertFormInfoMessage", "Saved.");
			}

			Router.go("order", {});
		}

		function errorAction(msg) {
			pageSession.set("getfoodInsertInsertFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Order.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("order", {});
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

Template.GetfoodInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("getfoodInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("getfoodInsertInsertFormErrorMessage");
	}
	
});
