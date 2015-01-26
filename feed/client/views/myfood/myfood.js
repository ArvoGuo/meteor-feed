var pageSession = new ReactiveDict();

Template.Myfood.rendered = function() {
	
};

Template.Myfood.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Myfood.helpers({
	
});

var MyfoodViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("MyfoodViewSearchString");
	var sortBy = pageSession.get("MyfoodViewSortBy");
	var sortAscending = pageSession.get("MyfoodViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["menu", "shopName", "price"];
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

var MyfoodViewExport = function(cursor, fileType) {
	var data = MyfoodViewItems(cursor);
	var exportFields = ["menu","shopName", "price"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.MyfoodView.rendered = function() {
	pageSession.set("MyfoodViewStyle", "table");
	
};

Template.MyfoodView.events({
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
				pageSession.set("MyfoodViewSearchString", searchString);
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
					pageSession.set("MyfoodViewSearchString", searchString);
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
					pageSession.set("MyfoodViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		MyfoodViewExport(this.order, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		MyfoodViewExport(this.order, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		MyfoodViewExport(this.order, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		MyfoodViewExport(this.order, "json");
	}

	
});

Template.MyfoodView.helpers({
	"isEmpty": function() {
		return !this.order || this.order.count() == 0;
	},
	"isNotEmpty": function() {
		return this.order && this.order.count() > 0;
	},
	"isNotFound": function() {
		return this.order && pageSession.get("MyfoodViewSearchString") && MyfoodViewItems(this.order).length == 0;
	},
	"searchString": function() {
		return pageSession.get("MyfoodViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("MyfoodViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("MyfoodViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("MyfoodViewStyle") == "gallery";
	}

	
});


Template.MyfoodViewTable.rendered = function() {
	
};

Template.MyfoodViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("MyfoodViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("MyfoodViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("MyfoodViewSortAscending") || false;
			pageSession.set("MyfoodViewSortAscending", !sortAscending);
		} else {
			pageSession.set("MyfoodViewSortAscending", true);
		}
	}
});

Template.MyfoodViewTable.helpers({
	"tableItems": function() {
		return MyfoodViewItems(this.order);
	}
});


Template.MyfoodViewTableItems.rendered = function() {
	
};

Template.MyfoodViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		/**/
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

Template.MyfoodViewTableItems.helpers({

});
