Template.shortener.helpers({
    'showShort': function(){
    	return Session.get('shortURL');
    }, 

    'showLong' : function(){
    	return Session.get('longURL');
    }
    
});

Template.shortener.events({
    'submit .url': function(event){
	    event.preventDefault();
	    var url_add = event.target.URL.value;
	    if(!validateURL(url_add)){
	    	alert("Error! Not valid url.")
	    	return;
	    }
	    var shortURL_cal = longToShort(url_add);
	    while(urls.find({shortURL : shortURL_cal}).count() > 0){
	  		shortURL_cal = longToShort(url_add);	
        }
        urls.insert({url: url_add, shortURL: shortURL_cal});
	    Session.set('shortURL', shortURL_cal);
    },

    'submit .shortURL': function(event){
	    event.preventDefault();
	    var shortURL_search = event.target.shortURL.value;
	    
	    var foundURL = urls.findOne({shortURL : shortURL_search});
	    Session.set('longURL', foundURL.url);
    },

    'click .redirect':function(event){
    	window.open(Session.get('longURL'), target = "_blank");
    }
});


function validateURL(textval) {
	var urlregex = new RegExp(
	"^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
	return urlregex.test(textval);
}

function longToShort(longURL){
	var randomValue = Math.floor(Math.random() * Math.pow(46, 6));
	var shortURL_cal = turnValueToString(randomValue);
	
	return shortURL_cal;
}

function turnValueToString(randomValue){
	var chars = "bcdghjkmnpqrstvwxyzBCDGHJKMNPQRSTVWXYZ23456789";

	var domain = "http://taostinyurl.meteor.com/";
	var result = "";

	while(randomValue > 0){
		var temp  =  randomValue % 46;
		randomValue = Math.floor(randomValue / 46);
		result = result + chars.charAt(temp);
	}

	while(result.length < 6){
		result += 'z';
	}

	return domain + result;
}

