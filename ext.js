let express = require('express');
let isBrowser = require('user-agent-is-browser');

module.exports = (r) => {
	return {render: renderExtension};
}

function renderExtension (view, locals, callback) {	
	const userAgent = this.req.headers['user-agent'];
	if(isBrowser(userAgent)){
		this.render = express.response.render;
		this.render(view, locals, callback);	
	}
	else{
		this.json(locals);
	}
}