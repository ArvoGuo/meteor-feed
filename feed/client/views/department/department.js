var pageSession = new ReactiveDict();

Template.Department.rendered = function() {
	
};

Template.Department.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Department.helpers({
	
});

var DepartmentViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("DepartmentViewSearchString");
	var sortBy = pageSession.get("DepartmentViewSortBy");
	var sortAscending = pageSession.get("DepartmentViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name"];
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

var DepartmentViewExport = function(cursor, fileType) {
	var data = DepartmentViewItems(cursor);
	var exportFields = ["name"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.DepartmentView.rendered = function() {
	pageSession.set("DepartmentViewStyle", "table");
	
};

Template.DepartmentView.events({
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
				pageSession.set("DepartmentViewSearchString", searchString);
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
					pageSession.set("DepartmentViewSearchString", searchString);
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
					pageSession.set("DepartmentViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("department.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		DepartmentViewExport(this.department, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		DepartmentViewExport(this.department, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		DepartmentViewExport(this.department, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		DepartmentViewExport(this.department, "json");
	}

	
});

Template.DepartmentView.helpers({
	"isEmpty": function() {
		return !this.department || this.department.count() == 0;
	},
	"isNotEmpty": function() {
		return this.department && this.department.count() > 0;
	},
	"isNotFound": function() {
		return this.department && pageSession.get("DepartmentViewSearchString") && DepartmentViewItems(this.department).length == 0;
	},
	"searchString": function() {
		return pageSession.get("DepartmentViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("DepartmentViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("DepartmentViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("DepartmentViewStyle") == "gallery";
	}

	
});


Template.DepartmentViewTable.rendered = function() {
	
};

Template.DepartmentViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("DepartmentViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("DepartmentViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("DepartmentViewSortAscending") || false;
			pageSession.set("DepartmentViewSortAscending", !sortAscending);
		} else {
			pageSession.set("DepartmentViewSortAscending", true);
		}
	}
});

Template.DepartmentViewTable.helpers({
	"tableItems": function() {
		return DepartmentViewItems(this.department);
	}
});


Template.DepartmentViewTableItems.rendered = function() {
	
};

Template.DepartmentViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("department.details", {departmentId: this._id});
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
						Department.remove({ _id: me._id });
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
		Router.go("department.edit", {departmentId: this._id});
		return false;
	}
});

Template.DepartmentViewTableItems.helpers({

});
