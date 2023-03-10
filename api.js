const api={
	endpoint:'https://jsonblob.com/api/jsonBlob/',
	// ASYNCGET is used to test another way of getting data( using the async function and await keyword)
	// I only used it for test/experiment
	ASYNCGET: async function(documentID, callback){
		try{
		const requested = await axios.get(`${api.endpoint}${documentID}`,{})
		callback(requested);
		}
		catch(error){
			console.log(error);
		}
	},
	GET:function(documentID,callback){
		axios.get(`${api.endpoint}${documentID}`,{}).then(function(response){
			callback(response); 

			})
		.catch(function(error){
			console.log(error);
		});
	},
	PUT:function(documentID,data,callback){
		axios.put(`${api.endpoint}${documentID}`,data).then(function(response){
			callback(response);
		}).catch(function(error){
			console.log(error);
		});
	}
}