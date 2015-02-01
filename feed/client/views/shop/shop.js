var pageSession = new ReactiveDict();

Template.Shop.rendered = function() {
	
};

Template.Shop.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Shop.helpers({
	
});

var ShopViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ShopViewSearchString");
	var sortBy = pageSession.get("ShopViewSortBy");
	var sortAscending = pageSession.get("ShopViewSortAscending");
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

var ShopViewExport = function(cursor, fileType) {
	var data = ShopViewItems(cursor);
	var exportFields = ["name", "phone", "note", "menu"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ShopView.rendered = function() {
	pageSession.set("ShopViewStyle", "table");
	
};

Template.ShopView.events({
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
				pageSession.set("ShopViewSearchString", searchString);
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
					pageSession.set("ShopViewSearchString", searchString);
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
					pageSession.set("ShopViewSearchString", "");
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
		ShopViewExport(this.shop, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ShopViewExport(this.shop, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ShopViewExport(this.shop, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ShopViewExport(this.shop, "json");
	}

	
});

Template.ShopView.helpers({
	"isEmpty": function() {
		return !this.shop || this.shop.count() == 0;
	},
	"isNotEmpty": function() {
		return this.shop && this.shop.count() > 0;
	},
	"isNotFound": function() {
		return this.shop && pageSession.get("ShopViewSearchString") && ShopViewItems(this.shop).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ShopViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ShopViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ShopViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ShopViewStyle") == "gallery";
	}

	
});


Template.ShopViewTable.rendered = function() {
	
};

Template.ShopViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ShopViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ShopViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ShopViewSortAscending") || false;
			pageSession.set("ShopViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ShopViewSortAscending", true);
		}
	}
});

Template.ShopViewTable.helpers({
	"tableItems": function() {
		return ShopViewItems(this.shop);
	}
});


Template.ShopViewTableItems.rendered = function() {
	
};

Template.ShopViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("shop.details", {shopId: this._id});
		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "确认要删除这家店吗？",
			title: "删除",
			animate: false,
			buttons: {
				success: {
					label: "确认",
					className: "btn-success",
					callback: function() {
						Shop.remove({ _id: me._id });
					}
				},
				danger: {
					label: "取消",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("shop.edit", {shopId: this._id});
		return false;
	}
});

Template.ShopViewTableItems.helpers({

});
