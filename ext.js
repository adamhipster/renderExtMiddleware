const express = require('express');
const mixin = require('merge-descriptors');
// let res = require(__dirname + '/node_modules/express/lib/response.js');
let isBrowser = require('user-agent-is-browser');

/**
 * Response prototype.
 */

exports.response = (r) => {
	let res = Object.create(r);
	res.render = render;
	res.debug = debug;
	return res;
}

function render (view, locals, callback) {	
	const userAgent = this.req.headers['user-agent'];
	if(isBrowser(userAgent)){
		console.log('view');
		console.log(view);
		this.render = express.response.render;
		this.render(view, locals, callback);	
	}
	else{
		this.json(locals);
	}

	console.log('exiting ext.js render()');
}

function debug (){
	console.log('ext.js debug()');
}

//helpers
Object.create = function (o) {
	var F = function () {};
	F.prototype = o;
	return new F();
};