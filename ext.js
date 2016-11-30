const express = require('express');
const mixin = require('merge-descriptors');
let res = require(__dirname + '/node_modules/express/lib/response.js');
let isBrowser = require('user-agent-is-browser');

/**
 * Response prototype.
 */

exports.response = (app) => {
	let res = Object.create(express.response);
	if(app) mixin(res, app, false);
	res.render = render;
	// res.render = 'YOLOOO WOLOOO YOLOOO WOLOOO'; //debug
	return res;
}

function render (view, locals, callback) {	
	// const userAgent = express.request.headers[['user-agent']];
	// if(isBrowser(userAgent)){
	// 	express.response.render(view, locals, callback);	
	// }
	// else{
	// 	express.json(locals);
	// }


}



//helpers
Object.create = function (o) {
	var F = function () {};
	F.prototype = o;
	return new F();
};