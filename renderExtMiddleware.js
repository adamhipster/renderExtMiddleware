//Rewrote the code with the help of: 
//http://stackoverflow.com/questions/9285880/node-js-express-js-how-to-override-intercept-res-render-function

module.exports = function( req, res, next ) {
    let _render = res.render;
    res.render = function( view, options, fn ) {

    //render like we always do.
    //without `res.renderOld` there is no way I know to expose `this` to the `render` function of express.
	if isBrowser(userAgent)
		_render.call( this, view, options, fn );

	//render however you want, the client is not a browser
	else 
		this.json(locals);
    }
    next();
});