$(document).ready(function(){
	var options = {

	  url: "json/countries.json",

	  getValue: "name",

	  list: {	
	    match: {
	      enabled: true
	    }
	  },

	  theme: "square",

	  template: {
		type: "custom",
		method: function(value, item) {
			return "<span class='dib vam search--icon--" + (item.icon).toLowerCase() + "' ></span>" + value;
		}
	  }
	};

	$(".autocomplete--search--input").easyAutocomplete(options);
});