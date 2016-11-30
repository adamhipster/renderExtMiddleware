let express = require('express');
let app = express();
let ext = require('./ext');

const person = {name: "John" , age: 21};

//middleware stack is being determined in order like this due to it being processed
//top to bottom and placed on a stack (I think??... I think so...).
app.use( (req, res, next) => {
	console.log('here is the middleware!');
	res.render = ext.response().render;
	res.debug = ext.response().debug;
	next();
});

app.get( '/', (req, res) => {
	res.send('hey\n');
})

app.get( '/test', (req, res) => {
	console.log('rendering\n\n\n');
	res.debug();
	res.render('renderme', person);
	// console.log(app);
	// res.render('renderme', person);
	// console.log('res');
});

app.set('views', './');
app.set('view engine', 'pug');


app.listen(3001, function(){
	console.log("The blog app is listening on port ", 3001);
});