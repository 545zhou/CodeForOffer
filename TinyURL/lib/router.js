/*Router.configure({
	layoutTemplate:'layout'
});*/

/*Router.map(function(){
	//Route
	this.route('/',{path:'/',template:'shortener'});

}); */

Router.map(function(){
	//Route
	this.route('/',{path:'/'});

});


Router.route('/:someParameter', {where: 'server'}).get(function() {
  this.response.writeHead(302, {
    'Location': urls.findOne({shortURL : "107.170.160.150/" + this.params.someParameter}).url
  });
  this.response.end();
});

