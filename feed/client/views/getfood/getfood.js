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
		var searchFields = ["username", "shop", "menu", "price", "date", "note"];
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
	var exportFields = ["username", "shop", "menu", "price", "date", "note"];

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
		Router.go("order.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		GetfoodViewExport(this.order, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		GetfoodViewExport(this.order, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		GetfoodViewExport(this.order, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		GetfoodViewExport(this.order, "json");
	}

	
});

Template.GetfoodView.helpers({
	"isEmpty": function() {
		return !this.order || this.order.count() == 0;
	},
	"isNotEmpty": function() {
		return this.order && this.order.count() > 0;
	},
	"isNotFound": function() {
		return this.order && pageSession.get("GetfoodViewSearchString") && GetfoodViewItems(this.order).length == 0;
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
		return GetfoodViewItems(this.order);
	}
});


Template.GetfoodViewTableItems.rendered = function() {
	
};

Template.GetfoodViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("order.details", {orderId: this._id});
		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Order.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		/**/
		return false;
	}
});

Template.GetfoodViewTableItems.helpers({

});
