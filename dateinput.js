function dateinput(input, value) {
	var MIN_YEAR = new Date().getFullYear() - 10;
	var MAX_YEAR = new Date().getFullYear() + 10;

	var v = value || new Date();
	var parent = input.parentNode;
	var year = null;
	var month = null;
	var day = null;
	var option = null;
	var i = 0;
	var tmp = null;

	var updateDate = function() {
		if(this.value) {
			if(!year.value) year.value = v.getFullYear();
			if(!month.value) month.value = v.getMonth() + 1;
			if(!day.value) day.value = v.getDate();
		}
		if(!year.value || !month.value || !day.value) {
			input.value = year.value = month.value = day.value = "";
			return;
		}
		var val = new Date();
		val.setFullYear(year.value);
		val.setMonth(month.value);
		val.setDate(day.value);
		val.setHours(0);
		val.setMinutes(0);
		val.setSeconds(0);
		val.setMilliseconds(0);

		month.value = val.getMonth();
		day.value = val.getDate();
		input.value = val.toISOString();

		input.dispatchEvent(new Event("change"));
	};

	var dateSupported = false;
	try {
		input.type = "date";
		dateSupported = (input.type === "date");
	} catch (e) {
		dateSupported = false;
	}
	if(!dateSupported) {
		input.type = "hidden";
		year = document.createElement("select");
		option = document.createElement("option");
		option.value = "";
		option.innerHTML = "&mdash;";
		year.appendChild(option);
		MIN_YEAR = Math.min(MIN_YEAR, MAX_YEAR);
		for(i = MIN_YEAR; i < MAX_YEAR; ++i) {
			option = document.createElement("option");
			option.value = i;
			if(value) option.selected = (value.getFullYear() === i);
			option.innerHTML = i;
			year.appendChild(option);
		}
		year.addEventListener("change", updateDate);
		parent.insertBefore(year, input.nextSibling);

		month = document.createElement("select");
		option = document.createElement("option");
		option.value = "";
		option.innerHTML = "&mdash;";
		month.appendChild(option);
		for(i = 0; i < 12; ++i) {
			option = document.createElement("option");
			option.value = i;
			if(value) option.selected = (value.getMonth() === i);
			tmp = new Date();
			tmp.setDate(1);
			tmp.setMonth(i);
			option.innerHTML = tmp.toLocaleDateString({},
													  {month: "long"});
			month.appendChild(option);
		}
		month.addEventListener("change", updateDate);
		parent.insertBefore(month, year.nextSibling);

		day = document.createElement("select");
		option = document.createElement("option");
		option.value = "";
		option.innerHTML = "&mdash;";
		day.appendChild(option);
		for(i = 1; i <= 31; ++i) {
			option = document.createElement("option");
			option.value = i;
			if(value) option.selected = (value.getDate() === i);
			option.innerHTML = i;
			day.appendChild(option);
		}
		day.addEventListener("change", updateDate);
		parent.insertBefore(day, month.nextSibling);
		updateDate();
	} else {
		input.value = value.toISOString().substring(0, 10);
	}
}

window.addEventListener("load", function () {
	var inputs = document.querySelectorAll("input.dateinput");
	var i = 0;
	for(i = 0; i < inputs.length; ++i) {
		dateinput(inputs.item(i));
	}
});
