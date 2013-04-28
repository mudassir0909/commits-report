(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("app", Function('exports, require, module', "module.exports = Ember.Application.create();\n\n//@ sourceURL=app.coffee"));
window.require.register("controllers", Function('exports, require, module', "require('controllers/home_controller');\n\n//@ sourceURL=controllers.coffee"));
window.require.register("controllers/home_controller", Function('exports, require, module', "App.HomeController = Ember.Controller.extend({\n  username: null,\n  password: null,\n  loginResponse: null,\n  login: function() {\n    var options, store;\n\n    store = this.get('store');\n    options = {\n      username: this.get('username'),\n      password: this.get('password')\n    };\n    return this.set('loginResponse', store.findQuery(App.GithubLogin, options));\n  }\n});\n\n//@ sourceURL=controllers/home_controller.coffee"));
window.require.register("initialize", Function('exports, require, module', "window.App = require('app');\n\nrequire('templates');\n\nrequire('controllers');\n\nrequire('models');\n\nrequire('routes');\n\nrequire('router');\n\nrequire('store');\n\nrequire('views');\n\nApp.initialize();\n\n//@ sourceURL=initialize.coffee"));
window.require.register("models", Function('exports, require, module', "require('models/models');\n\n//@ sourceURL=models.coffee"));
window.require.register("models/models", Function('exports, require, module', "App.Repository = DS.Model.extend({\n  name: DS.attr('string')\n});\n\nApp.GithubLogin = DS.Model.extend({\n  responseCode: DS.attr('boolean')\n});\n\n//@ sourceURL=models/models.coffee"));
window.require.register("router", Function('exports, require, module', "var App;\n\nApp = require(\"app\");\n\nApp.Router.map(function() {\n  this.route('index', {\n    path: '/'\n  });\n  this.route('home', {\n    path: '/home'\n  });\n  return this.route('dashboard', {\n    path: '/dashboard'\n  });\n});\n\n//@ sourceURL=router.coffee"));
window.require.register("routes", Function('exports, require, module', "require(\"routes/index_route\");\n\n//@ sourceURL=routes.coffee"));
window.require.register("routes/index_route", Function('exports, require, module', "App.IndexRoute = Ember.Route.extend({\n  redirect: function() {\n    return this.transitionTo('home');\n  }\n});\n\n//@ sourceURL=routes/index_route.coffee"));
window.require.register("store", Function('exports, require, module', "var App;\n\nApp = require(\"app\");\n\nDS.RESTAdapter.configure(\"plurals\", {\n  repository: 'repositories'\n});\n\nApp.Store = DS.Store.extend({\n  revision: 11\n});\n\n//@ sourceURL=store.coffee"));
window.require.register("templates", Function('exports, require, module', "require(\"templates/application\");\n\nrequire(\"templates/home\");\n\nrequire(\"templates/dashboard\");\n\n//@ sourceURL=templates.coffee"));
window.require.register("templates/application", Function('exports, require, module', "module.exports = Ember.TEMPLATES[module.id.replace('templates/','')] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [2,'>= 1.0.0-rc.3'];\nhelpers = helpers || Ember.Handlebars.helpers; data = data || {};\n  var stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;\n\nfunction program1(depth0,data) {\n  \n  var buffer = '', hashTypes;\n  data.buffer.push(\"\\n  \");\n  hashTypes = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"outlet\", {hash:{},contexts:[depth0],types:[\"ID\"],hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n\");\n  return buffer;\n  }\n\n  hashTypes = {'includeRow': \"BOOLEAN\"};\n  stack1 = helpers.view.call(depth0, \"Metro.Grid\", {hash:{\n    'includeRow': (true)\n  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"ID\"],hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  else { data.buffer.push(''); }\n  \n});\n//@ sourceURL=templates/application.hbs"));
window.require.register("templates/dashboard", Function('exports, require, module', "module.exports = Ember.TEMPLATES[module.id.replace('templates/','')] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [2,'>= 1.0.0-rc.3'];\nhelpers = helpers || Ember.Handlebars.helpers; data = data || {};\n  var buffer = '', stack1, hashTypes, self=this;\n\nfunction program1(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes;\n  data.buffer.push(\"\\n  \");\n  hashTypes = {};\n  stack1 = helpers.view.call(depth0, \"Metro.PageRegion\", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:[\"ID\"],hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n\");\n  return buffer;\n  }\nfunction program2(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes;\n  data.buffer.push(\"\\n    \");\n  hashTypes = {'snapped': \"BOOLEAN\"};\n  stack1 = helpers.view.call(depth0, \"Metro.Page\", {hash:{\n    'snapped': (true)\n  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:[\"ID\"],hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n    \");\n  hashTypes = {'fill': \"BOOLEAN\"};\n  stack1 = helpers.view.call(depth0, \"Metro.Page\", {hash:{\n    'fill': (true)\n  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:[\"ID\"],hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n  \");\n  return buffer;\n  }\nfunction program3(depth0,data) {\n  \n  \n  data.buffer.push(\"\\n      Account Context &nbsp;\\n      <select>\\n        <option value=\\\"1\\\">mmuddasir</option>\\n        <option value=\\\"2\\\">PrimeRevenue</option>\\n      </select>\\n      <table class='hovered'>\\n        <thead>\\n          <tr><th><b>Repositories</b></th></tr>\\n        </thead>\\n        <tbody>\\n          <tr><td>bootstrap-rails-app</td></tr>\\n          <tr><td>ch3_repo</td></tr>\\n          <tr><td>coffeescript-koans</td></tr>\\n          <tr><td>CoffeeScript_tests</td></tr>\\n          <tr><td>CoffeeScript_Todo_App</td></tr>\\n          <tr><td>commits-report</td></tr>\\n          <tr><td>convoy</td></tr>\\n          <tr><td>CST</td></tr>\\n          <tr><td>demo_app</td></tr>\\n          <tr><td>Ember-Application</td></tr>\\n          <tr><td>ember-brunch-coffee-sass</td></tr>\\n        </tbody>\\n      </table>\\n    \");\n  }\n\nfunction program5(depth0,data) {\n  \n  \n  data.buffer.push(\"\\n    \");\n  }\n\n  hashTypes = {'secondary': \"BOOLEAN\",'span': \"INTEGER\",'hLevel': \"INTEGER\",'title': \"STRING\",'iconClass': \"STRING\"};\n  stack1 = helpers.view.call(depth0, \"Metro.Page\", {hash:{\n    'secondary': (true),\n    'span': (12),\n    'hLevel': (1),\n    'title': (\"Dashboard\"),\n    'iconClass': (\"icon-bars\")\n  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"ID\"],hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n\");\n  return buffer;\n  \n});\n//@ sourceURL=templates/dashboard.hbs"));
window.require.register("templates/home", Function('exports, require, module', "module.exports = Ember.TEMPLATES[module.id.replace('templates/','')] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [2,'>= 1.0.0-rc.3'];\nhelpers = helpers || Ember.Handlebars.helpers; data = data || {};\n  var stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;\n\nfunction program1(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes;\n  data.buffer.push(\"\\n  \");\n  hashTypes = {};\n  stack1 = helpers.view.call(depth0, \"Metro.PageRegion\", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:[\"ID\"],hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n\");\n  return buffer;\n  }\nfunction program2(depth0,data) {\n  \n  var buffer = '', hashTypes;\n  data.buffer.push(\"\\n    \");\n  hashTypes = {'placeholder': \"STRING\",'valueBinding': \"STRING\"};\n  data.buffer.push(escapeExpression(helpers.view.call(depth0, \"Metro.TextField\", {hash:{\n    'placeholder': (\"Username\"),\n    'valueBinding': (\"controller.username\")\n  },contexts:[depth0],types:[\"ID\"],hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n    \");\n  hashTypes = {'placeholder': \"STRING\",'valueBinding': \"STRING\"};\n  data.buffer.push(escapeExpression(helpers.view.call(depth0, \"Metro.PasswordField\", {hash:{\n    'placeholder': (\"Password\"),\n    'valueBinding': (\"controller.password\")\n  },contexts:[depth0],types:[\"ID\"],hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n    \");\n  hashTypes = {'iconClass': \"STRING\",'label': \"STRING\",'place': \"STRING\",'backgroundColor': \"STRING\",'foregroundColor': \"STRING\",'action': \"STRING\",'targetBinding': \"STRING\"};\n  data.buffer.push(escapeExpression(helpers.view.call(depth0, \"Metro.Button\", {hash:{\n    'iconClass': (\"icon-key\"),\n    'label': (\"Sign In\"),\n    'place': (\"right\"),\n    'backgroundColor': (\"darken\"),\n    'foregroundColor': (\"white\"),\n    'action': (\"login\"),\n    'targetBinding': (\"controller\")\n  },contexts:[depth0],types:[\"ID\"],hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n  \");\n  return buffer;\n  }\n\n  hashTypes = {'secondary': \"BOOLEAN\",'span': \"INTEGER\",'hLevel': \"INTEGER\",'title': \"STRING\",'iconClass': \"STRING\"};\n  stack1 = helpers.view.call(depth0, \"Metro.Page\", {hash:{\n    'secondary': (true),\n    'span': (7),\n    'hLevel': (1),\n    'title': (\"Github Login\"),\n    'iconClass': (\"icon-github\")\n  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"ID\"],hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  else { data.buffer.push(''); }\n  \n});\n//@ sourceURL=templates/home.hbs"));
window.require.register("views", Function('exports, require, module', "\n\n//@ sourceURL=views.coffee"));
