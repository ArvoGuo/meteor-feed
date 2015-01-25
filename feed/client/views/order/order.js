var pageSession = new ReactiveDict();

Template.Order.rendered = function() {
	
};

Template.Order.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Order.helpers({
	
});

var OrderViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("OrderViewSearchString");
	var sortBy = pageSession.get("OrderViewSortBy");
	var sortAscending = pageSession.get("OrderViewSortAscending");
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

var OrderViewExport = function(cursor, fileType) {
	var data = OrderViewItems(cursor);
	var exportFields = ["username", "shop", "menu", "price", "date", "note"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.OrderView.rendered = function() {
	pageSession.set("OrderViewStyle", "table");
	
};

Template.OrderView.events({
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
				pageSession.set("OrderViewSearchString", searchString);
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
					pageSession.set("OrderViewSearchString", searchString);
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
					pageSession.set("OrderViewSearchString", "");
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
		OrderViewExport(this.order, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		OrderViewExport(this.order, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		OrderViewExport(this.order, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		OrderViewExport(this.order, "json");
	}

	
});

Template.OrderView.helpers({
	"isEmpty": function() {
		return !this.order || this.order.count() == 0;
	},
	"isNotEmpty": function() {
		return this.order && this.order.count() > 0;
	},
	"isNotFound": function() {
		return this.order && pageSession.get("OrderViewSearchString") && OrderViewItems(this.order).length == 0;
	},
	"searchString": function() {
		return pageSession.get("OrderViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("OrderViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("OrderViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("OrderViewStyle") == "gallery";
	}

	
});


Template.OrderViewTable.rendered = function() {
	
};

Template.OrderViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("OrderViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("OrderViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("OrderViewSortAscending") || false;
			pageSession.set("OrderViewSortAscending", !sortAscending);
		} else {
			pageSession.set("OrderViewSortAscending", true);
		}
	}
});

Template.OrderViewTable.helpers({
	"tableItems": function() {
		return OrderViewItems(this.order);
	}
});


Template.OrderViewTableItems.rendered = function() {
	
};

Template.OrderViewTableItems.events({
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

Template.OrderViewTableItems.helpers({

});
