var pageSession = new ReactiveDict();

Template.ShopDetails.rendered = function() {
	
};

Template.ShopDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.ShopDetails.helpers({
	
});

Template.ShopDetailsDetailsForm.rendered = function() {
	pageSession.set("menuCrudItems", this.data.shop_detail.menu || []);


	pageSession.set("shopDetailsDetailsFormInfoMessage", "");
	pageSession.set("shopDetailsDetailsFormErrorMessage", "");

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

Template.ShopDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("shopDetailsDetailsFormInfoMessage", "");
		pageSession.set("shopDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("shopDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("shopDetailsDetailsFormErrorMessage", "Error. " + msg);
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

		Router.go("shop", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("shop", {});
	}

	
});

Template.ShopDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("shopDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("shopDetailsDetailsFormErrorMessage");
	}, 
		"menuCrudItems": function() {
		return pageSession.get("menuCrudItems");
	}
});
