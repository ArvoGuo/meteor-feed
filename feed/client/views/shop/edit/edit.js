var pageSession = new ReactiveDict();

Template.ShopEdit.rendered = function() {
	
};

Template.ShopEdit.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.ShopEdit.helpers({
	
});

Template.ShopEditEditForm.rendered = function() {
	

	pageSession.set("shopEditEditFormInfoMessage", "");
	pageSession.set("shopEditEditFormErrorMessage", "");

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

Template.ShopEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("shopEditEditFormInfoMessage", "");
		pageSession.set("shopEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("shopEditEditFormInfoMessage", "Saved.");
			}

			Router.go("shop", {});
		}

		function errorAction(msg) {
			pageSession.set("shopEditEditFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Shop.update({ _id: t.data.shop_edit._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("shop", {});
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

Template.ShopEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("shopEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("shopEditEditFormErrorMessage");
	}
	
});
