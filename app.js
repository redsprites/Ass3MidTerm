const blogs={
	documentID:'1082784437963603968',
	index:function(){
		document.getElementById('blogs').innerHTML='Loading Blogs, please wait...';
		database.index(blogs.documentID,function(items){
			document.getElementById('blogs').innerHTML='';
			for(let i=0;i<items.length;i++){
				let blog=items[i];
				let el=document.createElement('div');
				el.innerHTML=`<div class="post-preview">
						<a href="post.html?index=${i}">
							<h2 class="post-title">${blog.title}</h2>
							<h3 class="post-subtitle">${blog.subTitle}</h3>	
						</a>	
						<p class="post-meta">
						Posted by <a href="#!">${blog.author}</a>
						on ${blog.blogDate}
						</p>	
					</div>`;
					console.log(el)
				document.getElementById('post-preview').append(el);
			}
		});
	},
	detail:function(index){
		database.detail(blogs.documentID,index,function(item){
			document.getElementById('loading').style.display='none';
			document.getElementById('blog-author').innerText=item.author;
			document.getElementById('blog-text').innerText=item.blog;
			document.getElementById('btn-edit').setAttribute('href',`edit.html?index=${index}`);
			
			for(let i=0;i< item.comments.length;i++){
				let comment = item.comments[i];
				let el=document.createElement('div');
				el.innerHTML=`<div>
						<blockquote>
							<em>${comment.comment}</em>
						</blockquote>
						${comment.user}
						<hr />
					</div>`;
				document.getElementById('display-comments').append(el);
			}
			let deleteButton=document.getElementById('btn-delete');
			deleteButton.addEventListener('click',function(){
				database.delete(blogs.documentID,index);
			});
		});
	},
	create:function(){
		document.querySelector('form').addEventListener('submit',function(e){
			e.preventDefault();
			let author=document.querySelector('form input[name=author]');
			let title=document.querySelector('form input[name=title]');
			let subTitle = document.querySelector('form textarea[name=subTitle]');
			let blog=document.querySelector('form textarea[name=blog]');
			const date = new Date()
			const todaysDate = date.toLocaleDateString();
			
			let newBlog={
				author:author.value,
				title: title.value,
				subTitle:subTitle.value,
				blog:blog.value,
				blogDate: todaysDate
			}
			database.create(blogs.documentID,newBlog);
		});
	},
	update:function(index){
		database.detail(blogs.documentID,index,function(item){
			document.getElementById('loading').style.display='none';
			document.querySelector('form input[name=author]').value=item.author;
			document.querySelector('form textarea[name=title]').value=item.title;
			document.querySelector('form input[name=subTitle]').value=item.subTitle;
			document.querySelector('form textarea[name=blog]').value=item.blog;
			
			document.querySelector('form').addEventListener('submit',function(e){
				e.preventDefault();
				let author=document.querySelector('form input[name=author]');
				let title=document.querySelector('form input[name=title]');
				let subTitle = document.querySelector('form textarea[name=subTitle]');
				let blog=document.querySelector('form textarea[name=blog]');
				const date = new Date()
				const todaysDate = date.toLocaleDateString();
				let newBlog={
					author:author.value,
					title: title.value,
					subTitle:subTitle.value,
					blog:blog.value,
					blogDate: todaysDate
				}
				database.update(blogs.documentID,index,newBlog);
			});
		});
	},
	// addComment:function (index) {
	// 	document.querySelector('#add-comment-form').addEventListener('submit', function (e) {
	// 	  e.preventDefault();
	// 	  let user = document.querySelector('input[name=user]').value;
	// 	  let comment = document.querySelector('textarea[name=comment]').value;
	// 	  let newComment = {
	// 		user: user,
	// 		comment: comment,
	// 	  };
	// 	  console.log(newComment);
	// 	  database.addComment('quotes', index, newComment); // call the updated addComment function in database.js
	// 	});
	//   } 
}