var pageSession = new ReactiveDict();

Template.OrderInsert.rendered = function() {
	
};

Template.OrderInsert.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.OrderInsert.helpers({
	
});

Template.OrderInsertInsertForm.rendered = function() {
	

	pageSession.set("orderInsertInsertFormInfoMessage", "");
	pageSession.set("orderInsertInsertFormErrorMessage", "");

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

Template.OrderInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("orderInsertInsertFormInfoMessage", "");
		pageSession.set("orderInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("orderInsertInsertFormInfoMessage", "Saved.");
			}

			Router.go("order", {});
		}

		function errorAction(msg) {
			pageSession.set("orderInsertInsertFormErrorMessage", "Error. " + msg);
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

Template.OrderInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("orderInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("orderInsertInsertFormErrorMessage");
	}
	
});
