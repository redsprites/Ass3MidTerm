const database={
	index:function(documentID,callback){
		api.GET(documentID,function(response){
			callback(response.data);
		});
	},
	detail:function(documentID,index,callback){
		api.GET(documentID,function(response){
			callback(response.data[index]);
		});
	},
	update:function(documentID,index,newData){
		api.GET(documentID,function(response){
			response.data[index]=newData;
			api.PUT(documentID,response.data,function(){
				alert('The Blog has been updated.');
				window.location.href="post.html?index=" + index;
			});
		});
	},
	addComment: function (documentID, index, newComment) {
		api.GET(documentID, function (response) {
			let jsonData = response.data;
			let blogData = jsonData[index];
			let comments = blogData.comments || [];
			let user = newComment.user;
			let comment = newComment.comment;
			comments.push({ user: user, comment: comment }); // add the new comment as an object with the user and comment properties
			blogData.comments = comments;
			api.PUT(documentID, jsonData, function () {
				alert('The comment has been added successfully.');
				window.location.reload();
			
				// location.reload(); // reload the page to see the updated comments
			});
		});
	},	
	delete:function(documentID,index){
		api.GET(documentID,function(response){
			response.data.splice(index,1);
			api.PUT(documentID,response.data,function(){
				alert('The Blog has been deleted.you will be redirected to the home page');
				window.location.href = "index.html";
			});
		});
	},
	create:function(documentID,newData){
		api.GET(documentID,function(response){
			response.data.push(newData);
			api.PUT(documentID,response.data,function(){
				alert('The Blog has been added successfully');
				var newPostIndex = response.data.length - 1;      	
      			window.location.href = "post.html?index=" + newPostIndex;
			});
		});
	},
}