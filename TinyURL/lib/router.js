Router.configure({
	layoutTemplate:'layout'
});

Router.map(function(){
	//Route
	this.route('/',{path:'/',template:'shortener'});
});