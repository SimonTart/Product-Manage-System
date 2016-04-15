var mongoose = require("mongoose");
var db = mongoose.connection;
var user = require("./User.js");

mongoose.connect("mongodb://localhost/test");
db.on("error",function(err){
	console.log(err);
});
db.once("open",function() {
	console.log("connectSuccess");
	var User = mongoose.model("User");
});