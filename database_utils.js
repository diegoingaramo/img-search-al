var mongo = require('mongodb').MongoClient;
var maxSearchNumber = 11;
var collectionName = 'latest_search';

function connectToDB(callback){
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
            docColl.find({}, {'_id':false,'term': true,'when':true}).toArray(function(err, items) {
            //docColl.find({}).sort({_id: 1}).limit(1).toArray(function(err, items) {

            	if (err) {
          			console.log(err);
        		}

				db.close();
				callback(items);
			});
		});
	},

	insert_query: function(queryObject, callback){

		connectToDB(function(db, docColl) {

            	docColl.insert(queryObject,function(err, data){

					if (err) {
	          			console.log(err);
	        		}

	        		docColl.count({},function(error, numOfDocs){

						if (err) {
		          			console.log(err);
		        		}

            			if (numOfDocs >= maxSearchNumber){ //delete one record
            				docColl.find({}).sort({_id: 1}).limit(1).toArray(function(err, items) {

            					if (err) {
          							console.log(err);
        						}
        						docColl.deleteOne({ "_id": items[0]["_id"] },function(err, results) {
        							if (err) {
          								console.log(err);
        							}
         							db.close();
									callback();
   							   });

        					});

            			}else{

	    					db.close();
							callback();

            			}

            		});

				});

            });	
		}

};