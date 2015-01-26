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
	pageSession.set("menuCrudItems", []);


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

			Router.go("shop", {});
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
				

				values.menu = pageSession.get("menuCrudItems"); newId = Shop.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
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
	}, 

	'click .field-menu .crud-table-row .delete-icon': function(e, t) { e.preventDefault(); var self = this; bootbox.dialog({ message: 'Delete? Are you sure?', title: 'Delete', animate: false, buttons: { success: { label: 'Yes', className: 'btn-success', callback: function() { var items = pageSession.get('menuCrudItems'); var index = -1; _.find(items, function(item, i) { if(item._id == self._id) { index = i; return true; }; }); if(index >= 0) items.splice(index, 1); pageSession.set('menuCrudItems', items); } }, danger: { label: 'No', className: 'btn-default' } } }); return false; }
});

Template.GetfoodInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("getfoodInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("getfoodInsertInsertFormErrorMessage");
	}, 
		"menuCrudItems": function() {
		return pageSession.get("menuCrudItems");
	}
});


Template.GetfoodInsertFieldMenuInsertForm.rendered = function() {
	

	pageSession.set("getfoodInsertFieldMenuInsertFormInfoMessage", "");
	pageSession.set("getfoodInsertFieldMenuInsertFormErrorMessage", "");

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

Template.GetfoodInsertFieldMenuInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("getfoodInsertFieldMenuInsertFormInfoMessage", "");
		pageSession.set("getfoodInsertFieldMenuInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("getfoodInsertFieldMenuInsertFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("getfoodInsertFieldMenuInsertFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				var data = pageSession.get("menuCrudItems") || []; values._id = Random.id(); data.push(values); pageSession.set("menuCrudItems", data); $("#field-menu-insert-form").modal("hide"); e.currentTarget.reset();
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		$("#field-menu-insert-form").modal("hide"); t.find("form").reset();

		/*CANCEL_REDIRECT*/
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

Template.GetfoodInsertFieldMenuInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("getfoodInsertFieldMenuInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("getfoodInsertFieldMenuInsertFormErrorMessage");
	}
	
});
