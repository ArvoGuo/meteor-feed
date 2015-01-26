var pageSession = new ReactiveDict();

Template.Getfood.rendered = function() {
	
};

Template.Getfood.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Getfood.helpers({
	
});

var GetfoodViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("GetfoodViewSearchString");
	var sortBy = pageSession.get("GetfoodViewSortBy");
	var sortAscending = pageSession.get("GetfoodViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "phone", "note", "menu"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var GetfoodViewExport = function(cursor, fileType) {
	var data = GetfoodViewItems(cursor);
	var exportFields = ["name", "phone", "note", "menu"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.GetfoodView.rendered = function() {
	pageSession.set("GetfoodViewStyle", "table");
	
};

Template.GetfoodView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("GetfoodViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("GetfoodViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("GetfoodViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("shop.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		GetfoodViewExport(this.shop, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		GetfoodViewExport(this.shop, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		GetfoodViewExport(this.shop, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		GetfoodViewExport(this.shop, "json");
	}

	
});

Template.GetfoodView.helpers({
	"isEmpty": function() {
		return !this.shop || this.shop.count() == 0;
	},
	"isNotEmpty": function() {
		return this.shop && this.shop.count() > 0;
	},
	"isNotFound": function() {
		return this.shop && pageSession.get("GetfoodViewSearchString") && GetfoodViewItems(this.shop).length == 0;
	},
	"searchString": function() {
		return pageSession.get("GetfoodViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("GetfoodViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("GetfoodViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("GetfoodViewStyle") == "gallery";
	}

	
});


Template.GetfoodViewTable.rendered = function() {
	
};

Template.GetfoodViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("GetfoodViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("GetfoodViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("GetfoodViewSortAscending") || false;
			pageSession.set("GetfoodViewSortAscending", !sortAscending);
		} else {
			pageSession.set("GetfoodViewSortAscending", true);
		}
	}
});

Template.GetfoodViewTable.helpers({
	"tableItems": function() {
		return GetfoodViewItems(this.shop);
	}
});


Template.GetfoodViewTableItems.rendered = function() {
    $('#js-price').each(function(){
      var _this = $(this);
      var _price = _this.closest('tr').find('option:selected').attr('data-price');
      _this.text(_price);
      $(this).next().val(_price);
    });
};

Template.GetfoodViewTableItems.events({
  "change select": function(e,t){
    var _price =  $(e.target).find('option:selected').attr('data-price');
    var js_price = $('#js-price').text(_price);
    js_price.next().val(_price);
  },
	"click #js-add-order": function(e, t) {
		pageSession.set("getfoodInsertInsertFormInfoMessage", "");
		pageSession.set("getfoodInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("getfoodInsertInsertFormInfoMessage", "Saved.");
			}

		  Router.go("myfood", {});
		}

		function errorAction(msg) {
			pageSession.set("getfoodInsertInsertFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target).closest('form'),
			function(fieldName, fieldValue) {

			},
			function(msg) {
        bootbox.alert('提交失败，请联系管理员！');
			},
			function(values) {
        console.log(values)
				newId = Order.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
        bootbox.alert('提交成功！');
			}
		);

		return false;
	}
});

Template.GetfoodViewTableItems.helpers({

});
