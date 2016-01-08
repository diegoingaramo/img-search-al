var mongo = require('mongodb').MongoClient;
var maxSearchNumber = 10;
var collectionName = 'latest_search';

function connectToDB(callback){
	console.log(process.env.MONGOLAB_URI);
	mongo.connect(process.env.MONGOLAB_URI, function(err, db) {

		if(err) throw err;

	  	// db gives access to the database
	  	var docColl = db.collection(collectionName);

	  	callback(db, docColl);

  	});
     
}

module.exports = {

	latest_queries: function(callback) {
		connectToDB(function(db, docColl) {
            var latest_queries = null;


			db.close();
			callback(latest_queries);
		});
	},

	insert_query: function(queryObject, callback){

		connectToDB(function(db, docColl) {

			db.close();
			callback();
		});

	}

};