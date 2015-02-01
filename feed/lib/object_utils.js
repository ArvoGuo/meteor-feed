/*
   Returns property value, where property name is given as path.

   Example:

       getPropertyValue("x.y.z", {x: { y: { z: 123}}});
*/

this.getPropertyValue = function(propertyName, obj) {
	return propertyName.split('.').reduce(function(o, i) { return o[i]; }, obj);	
};


/* 
   converts properties in format { "x.y": "z" } to { x: { y: "z" } }
*/

this.deepen = function(o) {
	var oo = {}, t, parts, part;
	for (var k in o) {
		t = oo;
		parts = k.split('.');
		var key = parts.pop();
		while (parts.length) {
			part = parts.shift();
			t = t[part] = t[part] || {};
		}
		t[key] = o[k]
	}
	return oo;
};

/*
	Function converts array of objects to csv, tsv or json string

	exportFields: list of object keys to export (array of strings)
	fileType: can be "json", "csv", "tsv" (string)
*/

this.convertArrayOfObjects = function(data, exportFields, fileType, bTranslate) {
	data = data || [];
	fileType = fileType || "csv";
	exportFields = exportFields || [];

	var str = "";
	// export to JSON
	if(fileType == "json") {

		var tmp = [];
		_.each(data, function(doc) {
			var obj = {};
			_.each(exportFields, function(field) {
				obj[field] = doc[field];
			});
			tmp.push(obj);
		});

		str = JSON.stringify(tmp);
	}
	// export to CSV or TSV
	if(fileType == "csv" || fileType == "tsv") {
		var columnSeparator = "";
		if(fileType == "csv") {
			columnSeparator = ",";
		}
		if(fileType == "tsv") {
			columnSeparator = "\t";
		}

		_.each(exportFields, function(field, i) {
			if(i > 0) {
				str = str + columnSeparator;
			}
			str = str + "\"" + field + "\"";
		});
		str = str + "\r\n";

		_.each(data, function(doc) {
			_.each(exportFields, function(field, i) {
				if(i > 0) {
					str = str + columnSeparator;
				}

				if(typeof(doc[field]) == "undefined"){
					str = str + "\"\"";
        }
				else{
          if(doc[field] && (doc[field].toString().indexOf('GMT+0800 (中国标准时间)') !== -1)){
            doc[field] = Helpers.formatDate(new Date(doc[field].toString()), 'YYYY/MM/DD HH:MM');
          }
					str = str + "\"" + doc[field] + "\"";
        }
			});
			str = str + "\r\n";
		});
	}
  if(!!bTranslate){
    str = str.replace('username', '姓名')
      .replace('name', '餐馆名')
      .replace('phone', '电话')
      .replace('menu', '菜名')
      .replace('department', '部门')
      .replace('email', '邮箱')
      .replace('createdAt', '下单时间')
      .replace('price', '价格');
  }
	return str;
};
