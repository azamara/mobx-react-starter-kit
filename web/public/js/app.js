(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
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
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReactDevtools = require('mobx-react-devtools');

var _mobxReactDevtools2 = _interopRequireDefault(_mobxReactDevtools);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactRouter.Router, { history: _reactRouter.browserHistory, routes: this.props.routes }),
        _react2.default.createElement(_mobxReactDevtools2.default, null)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
});

;require.register("components/MyComponent.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MyComponent(_ref) {
  var store = _ref.store;

  var clickButton = store.clickButton.bind(store);
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'button',
      { type: 'button', onClick: clickButton },
      'Click me!'
    ),
    _react2.default.createElement(
      'h4',
      null,
      'You\'ve clicked the button ',
      store.numClicks,
      ' times.'
    ),
    _react2.default.createElement(
      'h5',
      null,
      'You\'ve clicked button an ',
      store.oddOrEven,
      ' number of times.'
    )
  );
}

MyComponent.propTypes = {
  store: _react2.default.PropTypes.object
};

exports.default = (0, _mobxReact.observer)(MyComponent);
});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('components/App');

var _App2 = _interopRequireDefault(_App);

var _mobxReact = require('mobx-react');

var _reactApollo = require('react-apollo');

var _click = require('stores/click');

var _click2 = _interopRequireDefault(_click);

var _routes = require('libs/routes');

var _routes2 = _interopRequireDefault(_routes);

var _apollo = require('libs/apollo');

var _apollo2 = _interopRequireDefault(_apollo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = new _click2.default();
var routes = (0, _routes2.default)(store);
var client = (0, _apollo2.default)('http://localhost:8000/graphql');

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(
    _reactApollo.ApolloProvider,
    { client: client },
    _react2.default.createElement(
      _mobxReact.Provider,
      { store: store },
      _react2.default.createElement(_App2.default, { routes: routes })
    )
  ), document.querySelector('#app'));
});
});

require.register("libs/apollo.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloClient = require('apollo-client');

var _apolloClient2 = _interopRequireDefault(_apolloClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var GRAPHQL_URI = arguments.length <= 0 || arguments[0] === undefined ? 'http://localhost:8080/graphql' : arguments[0];

  var networkInterface = (0, _apolloClient.createNetworkInterface)(GRAPHQL_URI, {
    credentials: 'cross-origin'
  });

  networkInterface.use([{
    applyMiddleware: function applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }

      var user = JSON.parse(sessionStorage.getItem('user') || '{}');
      if (user.token) {
        req.options.headers.authorization = 'Bearer ' + user.token;
      }
      next();
    }
  }]);

  return new _apolloClient2.default({
    networkInterface: networkInterface,
    queryTransformer: _apolloClient.addTypename,
    dataIdFromObject: function dataIdFromObject(result) {
      if (result.id && result.__typename) {
        // eslint-disable-line no-underscore-dangle
        return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
      }
      return null;
    },
    shouldBatch: true
  });
};
});

require.register("libs/routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Layout = require('views/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _Home = require('views/Home');

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (store) {
  function authenticate(nextState, replaceState) {
    // TODO
  }

  return _react2.default.createElement(
    _reactRouter.Route,
    { component: _Layout2.default, path: '/' },
    _react2.default.createElement(_reactRouter.IndexRoute, { onEnter: authenticate, component: _Home2.default }),
    _react2.default.createElement(_reactRouter.Redirect, { from: '*', to: '/404' })
  );
};
});

require.register("stores/click.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor;

var _mobx = require('mobx');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var ClickStore = (_class = function () {
  function ClickStore() {
    _classCallCheck(this, ClickStore);

    this.name = 'mobx react';
    this.description = 'mobx is the best!';

    _initDefineProp(this, 'numClicks', _descriptor, this);
  }

  _createClass(ClickStore, [{
    key: 'clickButton',
    value: function clickButton() {
      this.numClicks++;
    }
  }, {
    key: 'oddOrEven',
    get: function get() {
      return this.numClicks % 2 === 0 ? 'even' : 'odd';
    }
  }]);

  return ClickStore;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'numClicks', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'oddOrEven', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'oddOrEven'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clickButton', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'clickButton'), _class.prototype)), _class);
exports.default = ClickStore;
});

require.register("views/Home.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

var _templateObject = _taggedTemplateLiteral(['\n  query {\n    testString\n  }\n'], ['\n  query {\n    testString\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _MyComponent = require('components/MyComponent');

var _MyComponent2 = _interopRequireDefault(_MyComponent);

var _reactApollo = require('react-apollo');

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Home = (_dec = (0, _mobxReact.observer)(['store']), _dec2 = (0, _reactApollo.graphql)((0, _graphqlTag2.default)(_templateObject)), _dec(_class = _dec2(_class = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      var _props$store = this.props.store;
      var name = _props$store.name;
      var description = _props$store.description;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Welcome to the ',
          name,
          ' project.'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'This project is ',
          description,
          '.'
        ),
        _react2.default.createElement(
          'h4',
          null,
          this.props.data.testString
        ),
        _react2.default.createElement(_MyComponent2.default, { store: this.props.store })
      );
    }
  }]);

  return Home;
}(_react2.default.Component)) || _class) || _class);
exports.default = Home;
});

;require.register("views/Layout.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layout = function (_React$Component) {
  _inherits(Layout, _React$Component);

  function Layout() {
    _classCallCheck(this, Layout);

    return _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).apply(this, arguments));
  }

  _createClass(Layout, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "nav",
          { className: "navbar navbar-inverse navbar-fixed-top" },
          _react2.default.createElement(
            "div",
            { className: "container" },
            _react2.default.createElement(
              "div",
              { className: "navbar-header" },
              _react2.default.createElement(
                "button",
                { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar", "aria-expanded": "false", "aria-controls": "navbar" },
                _react2.default.createElement(
                  "span",
                  { className: "sr-only" },
                  "Toggle navigation"
                ),
                _react2.default.createElement("span", { className: "icon-bar" }),
                _react2.default.createElement("span", { className: "icon-bar" }),
                _react2.default.createElement("span", { className: "icon-bar" })
              ),
              _react2.default.createElement(
                "a",
                { className: "navbar-brand", href: "#" },
                _react2.default.createElement("i", { className: "fa fa-paw fa-2x", "aria-hidden": "true" })
              )
            ),
            _react2.default.createElement(
              "div",
              { id: "navbar", className: "collapse navbar-collapse" },
              _react2.default.createElement(
                "ul",
                { className: "nav navbar-nav" },
                _react2.default.createElement(
                  "li",
                  { className: "active" },
                  _react2.default.createElement(
                    "a",
                    { href: "#" },
                    "Home"
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: "#about" },
                    "About"
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: "#contact" },
                    "Contact"
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "container" },
          this.props.children
        )
      );
    }
  }]);

  return Layout;
}(_react2.default.Component);

exports.default = Layout;
});

;require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window["$"] = require("jquery");
window.jQuery = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=app.js.map