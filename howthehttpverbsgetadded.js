//when (e.g.) app.get is being called, then this function is invoked
//get, post, del, purge, etc. etc. get added here and then it calls lazyrouter
methods.forEach(function(method){
  app[method] = function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();	//note: `this` is in application.js -- so I'd like to view `this` as `app`.

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});


/**
 * lazily adds the base router if it has not yet been added.
 *
 * We cannot add the base router in the defaultConfiguration because
 * it reads app settings which might be set after that has run.
 *
 * @private
 */
app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    this._router = new Router({
      caseSensitive: this.enabled('case sensitive routing'),
      strict: this.enabled('strict routing')
    });

	//calls methods.forEach with path = 'query parser fn'
	//jumps into the if-statement of said function
    this._router.use(query(this.get('query parser fn'))); 
    this._router.use(middleware.init(this)); //`this` is `app` and returns the function below
  }
};

exports.init = function(app){
  return function expressInit(req, res, next){
    if (app.enabled('x-powered-by')) res.setHeader('X-Powered-By', 'Express');
    req.res = res;
    res.req = req;
    req.next = next;

    req.__proto__ = app.request;
    res.__proto__ = app.response;

    res.locals = res.locals || Object.create(null);

    next();
  };
};

// ^^ 
// This is how they solve it. They make sure that the prototype of `res` is exposed to
// `app.response`. So if I want to extend it, I have to do the same.
// So for `next()` they call somekind of stack or pop something from a stack? I guess it's something like that.

//var route = this._router.route(path);
proto.route = function route(path) {
  var route = new Route(path);

  var layer = new Layer(path, {
    sensitive: this.caseSensitive,
    strict: this.strict,
    end: true
  }, route.dispatch.bind(route));

  layer.route = route;

  this.stack.push(layer);
  return route;
};

//this is in routes.js
//route[method].apply(route, slice.call(arguments, 1));
/*
function that is included is e.g. 
(req, res) => {
	res.send('hey\n');
}
this
:
Route
methods
:
Object
get
:
true
__proto__
:
Object
path
:
"/"
stack
:
Array[1]
0
:
Layer
handle
:
(req, res)
arguments
:
(...)
caller
:
(...)
length
:
2
name
:
""
__proto__
:
()
[[FunctionLocation]]
:
app.js:8
[[Scopes]]
:
Scopes[2]
keys
:
Array[0]
method
:
"get"
name
:
"<anonymous>"
params
:
undefined
path
:
undefined
regexp
:
/^\/?$/i
__proto__
:
Object
length
:
1
__proto__
:
Array[0]
__proto__
:
Object
*/
methods.forEach(function(method){
  Route.prototype[method] = function(){
    var handles = flatten(slice.call(arguments));

    for (var i = 0; i < handles.length; i++) {
      var handle = handles[i];

      if (typeof handle !== 'function') {
        var type = toString.call(handle);
        var msg = 'Route.' + method + '() requires callback functions but got a ' + type;
        throw new Error(msg);
      }

      debug('%s %s', method, this.path);

      var layer = Layer('/', {}, handle);
      layer.method = method;

      this.methods[method] = true;
      this.stack.push(layer);
    }

    return this;
  };
});

all methods that are added
methods
:
Array[33]
0
:
"acl"
1
:
"bind"
2
:
"checkout"
3
:
"connect"
4
:
"copy"
5
:
"delete"
6
:
"get"
7
:
"head"
8
:
"link"
9
:
"lock"
10
:
"m-search"
11
:
"merge"
12
:
"mkactivity"
13
:
"mkcalendar"
14
:
"mkcol"
15
:
"move"
16
:
"notify"
17
:
"options"
18
:
"patch"
19
:
"post"
20
:
"propfind"
21
:
"proppatch"
22
:
"purge"
23
:
"put"
24
:
"rebind"
25
:
"report"
26
:
"search"
27
:
"subscribe"
28
:
"trace"
29
:
"unbind"
30
:
"unlink"
31
:
"unlock"
32
:
"unsubscribe"