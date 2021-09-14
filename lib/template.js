module.exports = {
	HTML:function(title, list, body, control, authStatusUI=`<a href="/auth/login">login</a> | <a href="/auth/register">register</a>`){
		return `
		<!doctype html>
<html>
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<!-- Bootstrap CSS -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

		<title>WEB - ${title}</title>
	</head>
	<body>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="/">Home</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="/topic/board">Bulletin Board</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/about">About</a>
						</li>
					</ul>
					<form class="d-flex">
						<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
						<button class="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
		<div class="jumbotron" style="margin-left:1%;">
			${authStatusUI}
			<h1 class="display-4">Dongqoo</h1>
			<p class="lead">Wassup son?</p>
			<p><a href="/author/table">author</a></p>
            <br>
			${list}
			<hr class="my-4">
			${control}
			${body}
		</div>

		<!-- Optional JavaScript; choose one of the two! -->

		<!-- Option 1: Bootstrap Bundle with Popper -->
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>

		<!-- Option 2: Separate Popper and Bootstrap JS -->
		<!--
			<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js" integrity="sha384-eMNCOe7tC1doHpGoWe/6oMVemdAVTMs2xqW4mwXrXsW0L84Iytr2wi5v2QjrP/xp" crossorigin="anonymous"></script>
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js" integrity="sha384-cn7l7gDp0eyniUwwAZgrzD06kc/tftFf19TOAs2zVinnD/C7E91j9yyk5//jjpt/" crossorigin="anonymous"></script>
			-->
	</body>
</html>
	`;
    }, list:function(topics){
		var i = 0;
        var list = '<ul class=list-group>';
        while(i < topics.length){
            list += `<li><a href="/topic/${topics[i].id}">${topics[i].title}</a></li>`;
            i++;
        }
        list += '</ul>';
        return list;
	}, authorSelect:function(authors, author_id){
		var tag = '';
		var i = 0 ;
		while(i < authors.length){
			var selected = '';
			if(authors[i].id === author_id){
				selected = ' selected';
			}
			tag += `<option value="${sanitizeHtml(authors[i].id)}"${selected}>${sanitizeHtml(authors[i].name)}</option>`;
			i++;
		}
		return `
		<select name="author">
			${tag}
		</select>
		`
	}, authorTable:function(authors){
		var tag = '<table>';
		var i = 0;
		while(i < authors.length){
			tag += `
				<tr>
					<td>${authors[i].name}</td>
					<td>${authors[i].profile}</td>
					<td><a href="/author/update/${authors[i].id}">edit</a></td>
					<td>
						<form action="/author/delete_process" method="post">
							<input type="hidden" name="id" value="${authors[i].id}">
							<input type="submit" value="delete">
						</form>
					</td>
				</tr>
			`;
			i++;
		}
		tag += '</table>';
		return tag;
	}
}

