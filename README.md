Small example of how the following code:


```javascript
const person = {name: "John" , age: 21};
app.get( '/test', (req, res) => {
	res.render('renderme', person);
});
```

gives a normal rendered response when the client is a browser, but gives a response in json when the client is not a browser (e.g. curl).
