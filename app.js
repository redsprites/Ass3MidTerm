const blogs={
	documentID:'1082784437963603968',
	index: function () {
		$('#blogs').html('Loading Blogs, please wait...');
		database.index(blogs.documentID, function (items) {
		  $('#blogs').empty();
		  for (let i = 0; i < items.length; i++) {
			let blog = items[i];
			let el = $('<div>').html(`
						<div class="post-preview">
							<a href="post.html?index=${i}">
								<h2 class="post-title">${blog.title}</h2>
								<h3 class="post-subtitle">${blog.subTitle}</h3>	
							</a>	
							<p class="post-meta">
							Posted by <a href="#!">${blog.author}</a>
							on ${blog.blogDate}
							</p>	
						</div>
					`);
			$('#post-preview').append(el);
		  }
		});
	  },
	  detail: function (index) {
		database.detail(blogs.documentID, index, function (item) {
		  let deleteButton = $('#btn-delete');
		  deleteButton.on('click', function () {
			database.delete(blogs.documentID, index);
		  });
		  $('#loading').hide();
		  $('#post-title').text(item.title);
		  $('#post-sub-title').text(item.subTitle);
		  $('#blog-author').text(item.author);
		  $('#blog-text').text(item.blog);
		  $('#blog-date').text(item.blogDate);
		  $('#btn-edit').attr('href', `edit.html?index=${index}`);
		  if (item.hasOwnProperty('comments')) {
			for (let i = 0; i < item.comments.length; i++) {
			  let comment = item.comments[i];
			  let el = $('<div>').html(`
			  <div>
					  <em>${comment.comment}</em>
				  <blockquote>
				  ${comment.firstName} ${comment.lastName} on ${comment.datePosted}
				  </blockquote>
				  <div class="comment-actions">
					  <button class="btn btn-outline-primary" class="like-button" id="${comment.commentID}-like-button">Like</button>
					  <span class="likes-count" id="${comment.commentID}-likes-count">${comment.likes}</span>
				  </div>
				  <hr />
			  </div>
		  `);
		  $('#display-comments').append(el);
		       // Add like button functionality
			   let likeButton = $(`#${comment.commentID}-like-button`);
			   let likesCount = $(`#${comment.commentID}-likes-count`);

			   likeButton.click(function() {
				   comment.likes++;
				   database.updateComment(blogs.documentID, index, comment.commentID, comment);
				   likesCount.text(comment.likes);
			   });
			}
		  }
		});
	  },
	  create: function () {
		$('form').on('submit', function (e) {
		  e.preventDefault();
		  let author = $('form input[name=author]');
		  let title = $('form input[name=title]');
		  let subTitle = $('form input[name=subTitle]');
		  let blog = $('form textarea[name=blog]');
		  const date = new Date();
		  const todaysDate = date.toLocaleDateString();
	
		  let newBlog = {
			author: author.val(),
			title: title.val(),
			subTitle: subTitle.val(),
			blog: blog.val(),
			blogDate: todaysDate,
		  };
		  database.create(blogs.documentID, newBlog);
		});
	  },
	  update:function(index){
		database.detail(blogs.documentID,index,function(item){
			$('#loading').hide();
			$('input[name=author]').val(item.author);
			$('input[name=title]').val(item.title);
			$('input[name=subTitle]').val(item.subTitle);
			$('textarea[name=blog]').val(item.blog);

			$('form').submit(function(e){
				e.preventDefault();
				let author=$('input[name=author]').val();
				let title=$('input[name=title]').val();
				let subTitle = $('input[name=subTitle]').val();
				let blog=$('textarea[name=blog]').val();
				const date = new Date()
				const todaysDate = date.toLocaleDateString();
				let newBlog={
					author:author,
					title: title,
					subTitle:subTitle,
					blog:blog,
					blogDate: todaysDate
				};
				database.update(blogs.documentID,index,newBlog);
			});
		});
	},
	addComment: function (index) {
		$('#add-comment-form').submit(function(e) {
			e.preventDefault();
			let firstName = $('input[name=firstName]').val();
			let lastName = $('input[name=lastName]').val();
			let comment = $('textarea[name=comment]').val();
			const date = new Date()
			const todaysDate = date.toLocaleDateString();
			let newComment = {
				firstName: firstName,
				lastName: lastName,
				comment: comment,
				datePosted: todaysDate,
				likes: 0
			};

			database.addComment(blogs.documentID, index, newComment, function (commentID) {

				// Add like button functionality
				let likeButton = $(`#${commentID}-like-button`);
				let likesCount = $(`#${commentID}-likes-count`);

				likeButton.click(function() {
					newComment.likes++;
					database.updateComment(documentID, index, commentID, newComment);
					likesCount.text(newComment.likes);
				});
			});
		});
	}

}