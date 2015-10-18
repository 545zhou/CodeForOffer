Router.configure({
	layoutTemplate:'layout'
});

Router.map(function(){
	//Route
	this.route('/',{path:'/',template:'shortener'});

});


Router.route('/:someParameter', {where: 'server'}).get(function() {
  this.response.writeHead(302, {
    'Location': urls.findOne({shortURL : "http://localhost:3000/" + this.params.someParameter}).url
  });
  this.response.end();
});

