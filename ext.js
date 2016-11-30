const express = require('express');
let isBrowser = require('user-agent-is-browser');

exports.response = (r) => {
	let res = Object.create(r);
	res.render = render;
	return res;
}

function render (view, locals, callback) {	
	const userAgent = this.req.headers['user-agent'];
	if(isBrowser(userAgent)){
		//check to see if this code can be shorter
		this.render = express.response.render;
		this.render(view, locals, callback);	
	}
	else{
		this.json(locals);
	}
}

//helpers -- check if you can make this shorter
Object.create = function (o) {
	var F = function () {};
	F.prototype = o;
	return new F();
};