let express = require('express');
let app = express();
let ext = require('./ext').response(app);

const person = {name: "John" , age: 21};

app.get( '/', (req, res) => {
	res.send('hey\n');
})

app.get( '/test', (req, res) => {
	console.log('rendering\n\n\n');
	ext.render('renderme', person);
	// console.log('res');
	res.send('done');
});

app.set('views', './');
app.set('view engine', 'pug');




app.listen(3001, function(){
	console.log("The blog app is listening on port ", 3001);
});