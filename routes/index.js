var fs = require('fs');

//The index page
exports.index = function(req, res){
  res.render('index.html');
};

//The partials that need no authentication for display
exports.partials = function (req, res) {
	var partialName = req.params.name;
	res.render('partials/' + partialName);
};

