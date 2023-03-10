const database = {
	index: function (documentID, callback) {
		api.GET(documentID, function (response) {
			callback(response.data);
		});
	},
	detail: function (documentID, index, callback) {
		api.GET(documentID, function (response) {
			callback(response.data[index]);
		});
	},
	update: function (documentID, index, newData) {
		api.GET(documentID, function (response) {
			response.data[index] = newData;
			api.PUT(documentID, response.data, function () {
				alert('The Blog has been updated.');
				window.location.href = "post.html?index=" + index;
			});
		});
	},
	addComment: function (documentID, index, newComment,) {
		console.log(documentID)
		api.GET(documentID, function (response) {
			let jsonData = response.data;
			let blogData = jsonData[index];
			console.log(index)
			if (!blogData) {
				throw new Error('Blog data not found');
			}

			let comments = blogData.comments || [];
			let firstName = newComment.firstName;
			let lastName = newComment.lastName;
			let commentID = new Date().getTime(); // create a unique ID for the comment
			let comment = newComment.comment;
			const date = new Date();
			const todaysDate = date.toLocaleDateString();
			let updatedComment = {
				firstName: firstName,
				lastName: lastName,
				commentID: commentID,
				comment: comment,
				datePosted: todaysDate,
				likes: 0 // add the "likes" property with an initial value of 0
			};
			comments.push(updatedComment); // add the new comment as an object with the updated properties
			blogData.comments = comments;
			api.PUT(documentID, jsonData, function () {
				alert('The comment has been added successfully.');
				window.location.reload();
			});
		});
	},
	delete: function (documentID, index) {
		api.GET(documentID, function (response) {
			response.data.splice(index, 1);
			api.PUT(documentID, response.data, function () {
				alert('The Blog has been deleted. You will be redirected to the home page');
				window.location.href = "index.html";
			});
		});
	},
	create: function (documentID, newData) {
		api.GET(documentID, function (response) {
			response.data.push(newData);
			api.PUT(documentID, response.data, function () {
				alert('The Blog has been added successfully');
				var newPostIndex = response.data.length - 1;
				window.location.href = "post.html?index=" + newPostIndex;
			});
		});
	},
	updateComment: function (documentID, index, commentID, updatedComment) {
		api.GET(documentID, function (response) {
			let jsonData = response.data;
			let blogData = jsonData[index];
			if (!blogData) {
				throw new Error('Blog data not found');
			}
			let comments = blogData.comments || [];
			let commentIndex = comments.findIndex(comment => comment.commentID === commentID);
			if (commentIndex === -1) {
				throw new Error('Comment not found');
			}
			comments[commentIndex] = updatedComment;
			blogData.comments = comments;
			api.PUT(documentID, jsonData, function () {
			});
		});
	},
	deleteComment: function (documentID, index, commentID) {
		api.GET(documentID, function (response) {
			let jsonData = response.data;
			let blogData = jsonData[index];
			if (!blogData) {
				throw new Error('Blog data not found');
			}
			let commentIndex = blogData.comments.findIndex(comment => comment.commentID === commentID);
			if (commentIndex < 0) {
				throw new Error('Comment not found');
			}
			blogData.comments.splice(commentIndex, 1);
			api.PUT(documentID, jsonData, function () {
				alert('The comment has been deleted.');
				window.location.reload();
			});
		});
	}	
}