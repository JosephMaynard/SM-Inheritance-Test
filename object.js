var Object = function(type)
{
	type = type || "Object";

	var OBJECT = {};
	OBJECT.type= type;

	// helper function to get a reference to the object of "type"
	function getRef(type)
	{
		var rv = window;
		var parts = type.split(".");
		var part = "";

		for (var i = 0; i < parts.length; i++) {
			part = parts[i];
			if ("undefined" == typeof rv[part]) return null;
			rv = rv[part];
		}
		return rv;
	}

	// function to extend (inherit from) the object
	OBJECT.extend = function(type)
	{
		var ref = getRef(this.type);
		var res = new ref(type);
		res.parent = new ref(type);

		for (member in res) {
			if ("function" != typeof res[member]) continue;
			if ("function" != typeof res.parent[member]) continue;
			res[member] = res.parent[member];
		}
		res.extend = res.parent.extend;
		return res;
	}

	OBJECT.farewell = function()
	{
		console.log("farewell");
	}

	return OBJECT;
}

// usage example:

// Create a contructor function that extends from Object
var Widget = function(type)
{
	type = type || "Widget";

	var W = Object().extend(type);

	W.hello = function()
	{
		console.log("hello");
	}

	return W;
}

// Create a constructor function that extends from Widget 
var Child = function(type)
{
	type = type || "Child";
	var C = Widget().extend(type);

	C.hello = function()
	{
		C.parent.hello.call(this);
		console.log("from the child");
	}

	C.farewell = function()
	{
		C.parent.farewell.call(this);
		console.log("from the child");
	}

	return C;
}


var childObject = Child();
childObject.hello();
childObject.farewell();

