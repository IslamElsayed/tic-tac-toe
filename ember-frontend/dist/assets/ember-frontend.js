"use strict";



define('ember-frontend/adapters/application', ['exports', 'active-model-adapter'], function (exports, _activeModelAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _activeModelAdapter.default.extend();
});
define('ember-frontend/app', ['exports', 'ember-frontend/resolver', 'ember-load-initializers', 'ember-frontend/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Application = Ember.Application;


  var App = Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('ember-frontend/components/number-to-english', ['exports', 'ember-number-to-words/components/number-to-english'], function (exports, _numberToEnglish) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _numberToEnglish.default;
    }
  });
});
define('ember-frontend/components/number-to-french', ['exports', 'ember-number-to-words/components/number-to-french'], function (exports, _numberToFrench) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _numberToFrench.default;
    }
  });
});
define('ember-frontend/components/number-to-spanish', ['exports', 'ember-number-to-words/components/number-to-spanish'], function (exports, _numberToSpanish) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _numberToSpanish.default;
    }
  });
});
define('ember-frontend/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('ember-frontend/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get,
      set = Ember.set;


  function checkWinning(combo, symbol) {
    for (var i = 0; i < combo.length; i++) {
      var count = 0;
      for (var j = 0; j < symbol.length; j++) {
        if (combo[i].includes(symbol[j])) {
          count++;
        }
      }

      if (count === 3) {
        return true;
      }
    }
    return false;
  }

  function isDraw(xBoxes, oBoxes) {
    return xBoxes.length + oBoxes.length === 9;
  }

  exports.default = Ember.Controller.extend({
    symbol: 'x',
    one: null,
    two: null,
    three: null,
    four: null,
    five: null,
    six: null,
    seven: null,
    eight: null,
    nine: null,

    winCombos: [[1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7]],
    xBoxes: [],
    oBoxes: [],

    actions: {
      markBox: function markBox(symbol, box, number) {
        if (get(this, box)) {
          return;
        }
        var currentPlay = symbol === 'x' ? 'x' : 'o';
        var otherPlay = symbol === 'x' ? 'o' : 'x';
        var currentPlayBoxes = get(this, eval('currentPlay+"Boxes"'));
        var winCombos = get(this, 'winCombos');

        set(this, box, symbol);
        currentPlayBoxes.pushObject(number);
        var won = checkWinning(winCombos, currentPlayBoxes);
        if (won) {
          this.winActions(currentPlay);
        } else if (isDraw(get(this, 'xBoxes'), get(this, 'oBoxes'))) {
          alert('Game is a draw');
          this.reset();
        } else {
          set(this, 'symbol', otherPlay);
        }
      },
      clearScores: function clearScores() {
        var model = this.model;
        model.map(function (record) {
          record.set('score', 0);
          record.save();
        });
      }
    },
    winActions: function winActions(winner) {
      alert(winner + ' won');
      var record = this.get('model').findBy('name', winner);
      record.incrementProperty('score');
      record.save();
      this.reset();
    },
    reset: function reset() {
      set(this, 'xBoxes', Ember.A());
      set(this, 'oBoxes', Ember.A());
      this.setProperties({ one: null, two: null, three: null, four: null, five: null, six: null, seven: null, eight: null, nine: null });
    }
  });
});
define('ember-frontend/helpers/app-version', ['exports', 'ember-frontend/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('ember-frontend/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('ember-frontend/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define("ember-frontend/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelSerializer) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter.default);
      application.register('serializer:-active-model', _activeModelSerializer.default);
    }
  };
});
define('ember-frontend/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-frontend/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('ember-frontend/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-frontend/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ember-frontend/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('ember-frontend/initializers/export-application-global', ['exports', 'ember-frontend/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ember-frontend/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ember-frontend/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('ember-frontend/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("ember-frontend/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('ember-frontend/models/player', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    score: _emberData.default.attr('number')
  });
});
define('ember-frontend/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('ember-frontend/router', ['exports', 'ember-frontend/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var EmberRouter = Ember.Router;


  var Router = EmberRouter.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {});

  exports.default = Router;
});
define('ember-frontend/routes/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    model: function model() {
      return this.store.findAll('Player');
    }
  });
});
define('ember-frontend/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("ember-frontend/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Jl2eRttM", "block": "{\"symbols\":[\"player\"],\"statements\":[[6,\"h1\"],[7],[0,\"Tic Tac Toe\"],[8],[0,\"\\n\\n\"],[6,\"table\"],[7],[0,\"\\n  \"],[6,\"tr\"],[7],[0,\"Score\"],[8],[0,\"\\n  \"],[6,\"tr\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[6,\"td\"],[7],[0,\"Player \"],[1,[19,1,[\"name\"]],false],[0,\": \"],[1,[19,1,[\"score\"]],false],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"clearScores\"]],[7],[0,\"clear score\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"table\"],[9,\"class\",\"table\"],[7],[0,\"\\n  \"],[6,\"tr\"],[7],[0,\"\\n    \"],[6,\"td\"],[3,\"action\",[[19,0,[]],\"markBox\",[20,[\"symbol\"]],\"one\",1]],[7],[1,[18,\"one\"],false],[8],[0,\"\\n    \"],[6,\"td\"],[3,\"action\",[[19,0,[]],\"markBox\",[20,[\"symbol\"]],\"two\",2]],[7],[1,[18,\"two\"],false],[8],[0,\"\\n    \"],[6,\"td\"],[3,\"action\",[[19,0,[]],\"markBox\",[20,[\"symbol\"]],\"three\",3]],[7],[1,[18,\"three\"],false],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tr\"],[7],[0,\"\\n    \"],[6,\"td\"],[3,\"action\",[[19,0,[]],\"markBox\",[20,[\"symbol\"]],\"four\",4]],[7],[1,[18,\"four\"],false],[8],[0,\"\\n    \"],[6,\"td\"],[3,\"action\",[[19,0,[]],\"markBox\",[20,[\"symbol\"]],\"five\",5]],[7],[1,[18,\"five\"],false],[8],[0,\"\\n    \"],[6,\"td\"],[3,\"action\",[[19,0,[]],\"markBox\",[20,[\"symbol\"]],\"six\",6]],[7],[1,[18,\"six\"],false],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tr\"],[7],[0,\"\\n    \"],[6,\"td\"],[3,\"action\",[[19,0,[]],\"markBox\",[20,[\"symbol\"]],\"seven\",7]],[7],[1,[18,\"seven\"],false],[8],[0,\"\\n    \"],[6,\"td\"],[3,\"action\",[[19,0,[]],\"markBox\",[20,[\"symbol\"]],\"eight\",8]],[7],[1,[18,\"eight\"],false],[8],[0,\"\\n    \"],[6,\"td\"],[3,\"action\",[[19,0,[]],\"markBox\",[20,[\"symbol\"]],\"nine\",9]],[7],[1,[18,\"nine\"],false],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-frontend/templates/application.hbs" } });
});


define('ember-frontend/config/environment', [], function() {
  var prefix = 'ember-frontend';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("ember-frontend/app")["default"].create({"name":"ember-frontend","version":"0.0.0+5fbeb8e3"});
}
//# sourceMappingURL=ember-frontend.map
