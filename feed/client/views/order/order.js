var pageSession = new ReactiveDict();
Template.Order.rendered = function() {
	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "yyyy/mm/dd";
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

var setCollectionByDate = function(){
  var startTime = new Date(new Date($('[name=start-date]').val() || '2014/1/1').toISOString());
  var endTime = new Date(new Date($('[name=end-date]').val() || '2099/1/1').toISOString());
  var serarchCollection = Order.find({'createdAt':{'$gt': startTime ,'$lt': endTime }}, {'sort': {'createdAt': -1}});
  return {
    order_manage: serarchCollection,
    startTime: startTime,
    endTime: endTime
  };
};

var OrderViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}
	var searchString = pageSession.get("OrderViewSearchString");
  if(searchString && searchString.indexOf('searchByTimeInterval') !== -1){
    searchString = '';
  }
	var sortBy = pageSession.get("OrderViewSortBy");
	var sortAscending = pageSession.get("OrderViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();
  raw = _.map(raw, function(item){
    var user = Users.findOne({'_id': item.ownerId });
    var email = user.profile.email,
        username = user.profile.name,
        department = user.profile.department;
    item.email = email;
    item.username= username;
    item.department = department;
    return item;
  });
	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["shopName", "menu", "phone", "price", "totalAmount"];
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
	var data = OrderViewItems(cursor, true);
	var exportFields = ["username", "email", "department", "name", "menu", "phone", "price", "createdAt"];

	var str = convertArrayOfObjects(data, exportFields, fileType, true);

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
  'click #js-sort-by-time': function(e, t){
    var setter = setCollectionByDate();
    this.order_manage = setter.order_manage;
		pageSession.set("OrderViewSearchString", "searchByTimeInterval" + setter.startTime + setter.endTime);
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
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
    setCollectionByDate();
    var setter = setCollectionByDate();
    this.order_manage = setter.order_manage;
		OrderViewExport(this.order_manage, "csv");
	}
});

Template.OrderView.helpers({
	"isEmpty": function() {
		return !this.order_manage || this.order_manage.count() == 0;
	},
	"isNotEmpty": function() {
		return this.order_manage && this.order_manage.count() > 0;
	},
	"isNotFound": function() {
		return this.order_manage && pageSession.get("OrderViewSearchString") && OrderViewItems(this.order_manage).length == 0;
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
		return OrderViewItems(this.order_manage);
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
			message: "你确认要删除"+me.username+"的这条订单吗？",
			title: "删除",
			animate: false,
			buttons: {
				success: {
					label: "确认",
					className: "btn-success",
					callback: function() {
						Order.remove({ _id: me._id });
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
		/**/
		return false;
	}
});

Template.OrderViewTableItems.helpers({

});
