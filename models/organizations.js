var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var organizationSchema = new Schema ({
	orgname : {
		type :String,
		unique : true
	}
});

mongoose.model('organizations', organizationSchema);