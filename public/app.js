"format global";
(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.defaults = function (obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);

      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }

    return obj;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedClass = (function () {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];

            if (typeof decorator === "function") {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
            }
          }

          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }

        Object.defineProperty(target, key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedObject = function (descriptors) {
    var target = {};

    for (var i = 0; i < descriptors.length; i++) {
      var descriptor = descriptors[i];
      var decorators = descriptor.decorators;
      var key = descriptor.key;
      delete descriptor.key;
      delete descriptor.decorators;
      descriptor.enumerable = true;
      descriptor.configurable = true;
      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

      if (decorators) {
        for (var f = 0; f < decorators.length; f++) {
          var decorator = decorators[f];

          if (typeof decorator === "function") {
            descriptor = decorator(target, key, descriptor) || descriptor;
          } else {
            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
          }
        }
      }

      if (descriptor.initializer) {
        descriptor.value = descriptor.initializer.call(target);
      }

      Object.defineProperty(target, key, descriptor);
    }

    return target;
  };

  babelHelpers.defineDecoratedPropertyDescriptor = function (target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor) return;
    var descriptor = {};

    for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];

    descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;
    Object.defineProperty(target, key, descriptor);
  };

  babelHelpers.taggedTemplateLiteral = function (strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  };

  babelHelpers.taggedTemplateLiteralLoose = function (strings, raw) {
    strings.raw = raw;
    return strings;
  };

  babelHelpers.toArray = function (arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers.slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  })();

  babelHelpers.slicedToArrayLoose = function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      var _arr = [];

      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        _arr.push(_step.value);

        if (i && _arr.length === i) break;
      }

      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };

  babelHelpers.objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  babelHelpers.hasOwn = Object.prototype.hasOwnProperty;
  babelHelpers.slice = Array.prototype.slice;
  babelHelpers.bind = Function.prototype.bind;

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers.asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        var callNext = step.bind(null, "next");
        var callThrow = step.bind(null, "throw");

        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(callNext, callThrow);
          }
        }

        callNext();
      });
    };
  };

  babelHelpers.interopExportWildcard = function (obj, defaults) {
    var newObj = defaults({}, obj);
    delete newObj["default"];
    return newObj;
  };

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj["default"] = obj;
      return newObj;
    }
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  };

  babelHelpers._typeof = function (obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers._extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  babelHelpers.newArrowCheck = function (innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.objectDestructuringEmpty = function (obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  };

  babelHelpers.temporalUndefined = {};

  babelHelpers.temporalAssertDefined = function (val, name, undef) {
    if (val === undef) {
      throw new ReferenceError(name + " is not defined - temporal dead zone");
    }

    return true;
  };

  babelHelpers.selfGlobal = typeof global === "undefined" ? self : global;

  babelHelpers.defaultProps = function (defaultProps, props) {
    if (defaultProps) {
      for (var propName in defaultProps) {
        if (typeof props[propName] === "undefined") {
          props[propName] = defaultProps[propName];
        }
      }
    }

    return props;
  };

  babelHelpers._instanceof = function (left, right) {
    if (right != null && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  };

  babelHelpers.interopRequire = function (obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
})(typeof global === "undefined" ? self : global);

(function(global) {

  var defined = {};

  // indexOf polyfill for IE8
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  var getOwnPropertyDescriptor = true;
  try {
    Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
  }
  catch(e) {
    getOwnPropertyDescriptor = false;
  }

  var defineProperty;
  (function () {
    try {
      if (!!Object.defineProperty({}, 'a', {}))
        defineProperty = Object.defineProperty;
    }
    catch (e) {
      defineProperty = function(obj, prop, opt) {
        try {
          obj[prop] = opt.value || opt.get.call(obj);
        }
        catch(e) {}
      }
    }
  })();

  function register(name, deps, declare) {
    if (arguments.length === 4)
      return registerDynamic.apply(this, arguments);
    doRegister(name, {
      declarative: true,
      deps: deps,
      declare: declare
    });
  }

  function registerDynamic(name, deps, executingRequire, execute) {
    doRegister(name, {
      declarative: false,
      deps: deps,
      executingRequire: executingRequire,
      execute: execute
    });
  }

  function doRegister(name, entry) {
    entry.name = name;

    // we never overwrite an existing define
    if (!(name in defined))
      defined[name] = entry;

    // we have to normalize dependencies
    // (assume dependencies are normalized for now)
    // entry.normalizedDeps = entry.deps.map(normalize);
    entry.normalizedDeps = entry.deps;
  }


  function buildGroups(entry, groups) {
    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
      return;

    groups[entry.groupIndex].push(entry);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];

      // not in the registry means already linked / ES6
      if (!depEntry || depEntry.evaluated)
        continue;

      // now we know the entry is in our unlinked linkage group
      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

      // the group index of an entry is always the maximum
      if (depEntry.groupIndex === undefined || depEntry.groupIndex < depGroupIndex) {

        // if already in a group, remove from the old group
        if (depEntry.groupIndex !== undefined) {
          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

          // if the old group is empty, then we have a mixed depndency cycle
          if (groups[depEntry.groupIndex].length == 0)
            throw new TypeError("Mixed dependency cycle detected");
        }

        depEntry.groupIndex = depGroupIndex;
      }

      buildGroups(depEntry, groups);
    }
  }

  function link(name) {
    var startEntry = defined[name];

    startEntry.groupIndex = 0;

    var groups = [];

    buildGroups(startEntry, groups);

    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i];
      for (var j = 0; j < group.length; j++) {
        var entry = group[j];

        // link each group
        if (curGroupDeclarative)
          linkDeclarativeModule(entry);
        else
          linkDynamicModule(entry);
      }
      curGroupDeclarative = !curGroupDeclarative; 
    }
  }

  // module binding records
  var moduleRecords = {};
  function getOrCreateModuleRecord(name) {
    return moduleRecords[name] || (moduleRecords[name] = {
      name: name,
      dependencies: [],
      exports: {}, // start from an empty module and extend
      importers: []
    })
  }

  function linkDeclarativeModule(entry) {
    // only link if already not already started linking (stops at circular)
    if (entry.module)
      return;

    var module = entry.module = getOrCreateModuleRecord(entry.name);
    var exports = entry.module.exports;

    var declaration = entry.declare.call(global, function(name, value) {
      module.locked = true;
      exports[name] = value;

      for (var i = 0, l = module.importers.length; i < l; i++) {
        var importerModule = module.importers[i];
        if (!importerModule.locked) {
          for (var j = 0; j < importerModule.dependencies.length; ++j) {
            if (importerModule.dependencies[j] === module) {
              importerModule.setters[j](exports);
            }
          }
        }
      }

      module.locked = false;
      return value;
    });

    module.setters = declaration.setters;
    module.execute = declaration.execute;

    // now link all the module dependencies
    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];
      var depModule = moduleRecords[depName];

      // work out how to set depExports based on scenarios...
      var depExports;

      if (depModule) {
        depExports = depModule.exports;
      }
      else if (depEntry && !depEntry.declarative) {
        depExports = depEntry.esModule;
      }
      // in the module registry
      else if (!depEntry) {
        depExports = load(depName);
      }
      // we have an entry -> link
      else {
        linkDeclarativeModule(depEntry);
        depModule = depEntry.module;
        depExports = depModule.exports;
      }

      // only declarative modules have dynamic bindings
      if (depModule && depModule.importers) {
        depModule.importers.push(module);
        module.dependencies.push(depModule);
      }
      else
        module.dependencies.push(null);

      // run the setter for this dependency
      if (module.setters[i])
        module.setters[i](depExports);
    }
  }

  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
  function getModule(name) {
    var exports;
    var entry = defined[name];

    if (!entry) {
      exports = load(name);
      if (!exports)
        throw new Error("Unable to load dependency " + name + ".");
    }

    else {
      if (entry.declarative)
        ensureEvaluated(name, []);

      else if (!entry.evaluated)
        linkDynamicModule(entry);

      exports = entry.module.exports;
    }

    if ((!entry || entry.declarative) && exports && exports.__useDefault)
      return exports['default'];

    return exports;
  }

  function linkDynamicModule(entry) {
    if (entry.module)
      return;

    var exports = {};

    var module = entry.module = { exports: exports, id: entry.name };

    // AMD requires execute the tree first
    if (!entry.executingRequire) {
      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
        var depName = entry.normalizedDeps[i];
        var depEntry = defined[depName];
        if (depEntry)
          linkDynamicModule(depEntry);
      }
    }

    // now execute
    entry.evaluated = true;
    var output = entry.execute.call(global, function(name) {
      for (var i = 0, l = entry.deps.length; i < l; i++) {
        if (entry.deps[i] != name)
          continue;
        return getModule(entry.normalizedDeps[i]);
      }
      throw new TypeError('Module ' + name + ' not declared as a dependency.');
    }, exports, module);

    if (output)
      module.exports = output;

    // create the esModule object, which allows ES6 named imports of dynamics
    exports = module.exports;
 
    if (exports && exports.__esModule) {
      entry.esModule = exports;
    }
    else {
      entry.esModule = {};
      
      // don't trigger getters/setters in environments that support them
      if (typeof exports == 'object' || typeof exports == 'function') {
        if (getOwnPropertyDescriptor) {
          var d;
          for (var p in exports)
            if (d = Object.getOwnPropertyDescriptor(exports, p))
              defineProperty(entry.esModule, p, d);
        }
        else {
          var hasOwnProperty = exports && exports.hasOwnProperty;
          for (var p in exports) {
            if (!hasOwnProperty || exports.hasOwnProperty(p))
              entry.esModule[p] = exports[p];
          }
         }
       }
      entry.esModule['default'] = exports;
      defineProperty(entry.esModule, '__useDefault', {
        value: true
      });
    }
  }

  /*
   * Given a module, and the list of modules for this current branch,
   *  ensure that each of the dependencies of this module is evaluated
   *  (unless one is a circular dependency already in the list of seen
   *  modules, in which case we execute it)
   *
   * Then we evaluate the module itself depth-first left to right 
   * execution to match ES6 modules
   */
  function ensureEvaluated(moduleName, seen) {
    var entry = defined[moduleName];

    // if already seen, that means it's an already-evaluated non circular dependency
    if (!entry || entry.evaluated || !entry.declarative)
      return;

    // this only applies to declarative modules which late-execute

    seen.push(moduleName);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      if (indexOf.call(seen, depName) == -1) {
        if (!defined[depName])
          load(depName);
        else
          ensureEvaluated(depName, seen);
      }
    }

    if (entry.evaluated)
      return;

    entry.evaluated = true;
    entry.module.execute.call(global);
  }

  // magical execution function
  var modules = {};
  function load(name) {
    if (modules[name])
      return modules[name];

    var entry = defined[name];

    // first we check if this module has already been defined in the registry
    if (!entry)
      throw "Module " + name + " not present.";

    // recursively ensure that the module and all its 
    // dependencies are linked (with dependency group handling)
    link(name);

    // now handle dependency execution in correct order
    ensureEvaluated(name, []);

    // remove from the registry
    defined[name] = undefined;

    // exported modules get __esModule defined for interop
    if (entry.declarative)
      defineProperty(entry.module.exports, '__esModule', { value: true });

    // return the defined module object
    return modules[name] = entry.declarative ? entry.module.exports : entry.esModule;
  };

  return function(mains, depNames, declare) {
    return function(formatDetect) {
      formatDetect(function(deps) {
        var System = {
          _nodeRequire: typeof require != 'undefined' && require.resolve && typeof process != 'undefined' && require,
          register: register,
          registerDynamic: registerDynamic,
          get: load, 
          set: function(name, module) {
            modules[name] = module; 
          },
          newModule: function(module) {
            return module;
          }
        };
        System.set('@empty', {});

        // register external dependencies
        for (var i = 0; i < depNames.length; i++) (function(depName, dep) {
          if (dep && dep.__esModule)
            System.register(depName, [], function(_export) {
              return {
                setters: [],
                execute: function() {
                  for (var p in dep)
                    if (p != '__esModule' && !(typeof p == 'object' && p + '' == 'Module'))
                      _export(p, dep[p]);
                }
              };
            });
          else
            System.registerDynamic(depName, [], false, function() {
              return dep;
            });
        })(depNames[i], arguments[i]);

        // register modules in this bundle
        declare(System);

        // load mains
        var firstLoad = load(mains[0]);
        if (mains.length > 1)
          for (var i = 1; i < mains.length; i++)
            load(mains[i]);

        return firstLoad;
      });
    };
  };

})(typeof self != 'undefined' ? self : global)
/* (['mainModule'], ['external-dep'], function($__System) {
  System.register(...);
})
(function(factory) {
  if (typeof define && define.amd)
    define(['external-dep'], factory);
  // etc UMD / module pattern
})*/

(['0'], [], function($__System) {

(function(__global) {
  var loader = $__System;
  var hasOwnProperty = __global.hasOwnProperty;
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  function readMemberExpression(p, value) {
    var pParts = p.split('.');
    while (pParts.length)
      value = value[pParts.shift()];
    return value;
  }

  // bare minimum ignores for IE8
  var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'external', 'mozAnimationStartTime', 'webkitStorageInfo', 'webkitIndexedDB'];

  var globalSnapshot;

  function forEachGlobal(callback) {
    if (Object.keys)
      Object.keys(__global).forEach(callback);
    else
      for (var g in __global) {
        if (!hasOwnProperty.call(__global, g))
          continue;
        callback(g);
      }
  }

  function forEachGlobalValue(callback) {
    forEachGlobal(function(globalName) {
      if (indexOf.call(ignoredGlobalProps, globalName) != -1)
        return;
      try {
        var value = __global[globalName];
      }
      catch (e) {
        ignoredGlobalProps.push(globalName);
      }
      callback(globalName, value);
    });
  }

  loader.set('@@global-helpers', loader.newModule({
    prepareGlobal: function(moduleName, exportName, globals) {
      // disable module detection
      var curDefine = __global.define;
       
      __global.define = undefined;
      __global.exports = undefined;
      if (__global.module && __global.module.exports)
        __global.module = undefined;

      // set globals
      var oldGlobals;
      if (globals) {
        oldGlobals = {};
        for (var g in globals) {
          oldGlobals[g] = globals[g];
          __global[g] = globals[g];
        }
      }

      // store a complete copy of the global object in order to detect changes
      if (!exportName) {
        globalSnapshot = {};

        forEachGlobalValue(function(name, value) {
          globalSnapshot[name] = value;
        });
      }

      // return function to retrieve global
      return function() {
        var globalValue;

        if (exportName) {
          globalValue = readMemberExpression(exportName, __global);
        }
        else {
          var singleGlobal;
          var multipleExports;
          var exports = {};

          forEachGlobalValue(function(name, value) {
            if (globalSnapshot[name] === value)
              return;
            if (typeof value == 'undefined')
              return;
            exports[name] = value;

            if (typeof singleGlobal != 'undefined') {
              if (!multipleExports && singleGlobal !== value)
                multipleExports = true;
            }
            else {
              singleGlobal = value;
            }
          });
          globalValue = multipleExports ? exports : singleGlobal;
        }

        // revert globals
        if (oldGlobals) {
          for (var g in oldGlobals)
            __global[g] = oldGlobals[g];
        }
        __global.define = curDefine;

        return globalValue;
      };
    }
  }));

})(typeof self != 'undefined' ? self : global);

(function(__global) {
  var loader = $__System;
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
  var cjsRequirePre = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])";
  var cjsRequirePost = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)";
  var fnBracketRegEx = /\(([^\)]*)\)/;
  var wsRegEx = /^\s+|\s+$/g;
  
  var requireRegExs = {};

  function getCJSDeps(source, requireIndex) {

    // remove comments
    source = source.replace(commentRegEx, '');

    // determine the require alias
    var params = source.match(fnBracketRegEx);
    var requireAlias = (params[1].split(',')[requireIndex] || 'require').replace(wsRegEx, '');

    // find or generate the regex for this requireAlias
    var requireRegEx = requireRegExs[requireAlias] || (requireRegExs[requireAlias] = new RegExp(cjsRequirePre + requireAlias + cjsRequirePost, 'g'));

    requireRegEx.lastIndex = 0;

    var deps = [];

    var match;
    while (match = requireRegEx.exec(source))
      deps.push(match[2] || match[3]);

    return deps;
  }

  /*
    AMD-compatible require
    To copy RequireJS, set window.require = window.requirejs = loader.amdRequire
  */
  function require(names, callback, errback, referer) {
    // in amd, first arg can be a config object... we just ignore
    if (typeof names == 'object' && !(names instanceof Array))
      return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

    // amd require
    if (typeof names == 'string' && typeof callback == 'function')
      names = [names];
    if (names instanceof Array) {
      var dynamicRequires = [];
      for (var i = 0; i < names.length; i++)
        dynamicRequires.push(loader['import'](names[i], referer));
      Promise.all(dynamicRequires).then(function(modules) {
        if (callback)
          callback.apply(null, modules);
      }, errback);
    }

    // commonjs require
    else if (typeof names == 'string') {
      var module = loader.get(names);
      return module.__useDefault ? module['default'] : module;
    }

    else
      throw new TypeError('Invalid require');
  }

  function define(name, deps, factory) {
    if (typeof name != 'string') {
      factory = deps;
      deps = name;
      name = null;
    }
    if (!(deps instanceof Array)) {
      factory = deps;
      deps = ['require', 'exports', 'module'].splice(0, factory.length);
    }

    if (typeof factory != 'function')
      factory = (function(factory) {
        return function() { return factory; }
      })(factory);

    // in IE8, a trailing comma becomes a trailing undefined entry
    if (deps[deps.length - 1] === undefined)
      deps.pop();

    // remove system dependencies
    var requireIndex, exportsIndex, moduleIndex;
    
    if ((requireIndex = indexOf.call(deps, 'require')) != -1) {
      
      deps.splice(requireIndex, 1);

      // only trace cjs requires for non-named
      // named defines assume the trace has already been done
      if (!name)
        deps = deps.concat(getCJSDeps(factory.toString(), requireIndex));
    }

    if ((exportsIndex = indexOf.call(deps, 'exports')) != -1)
      deps.splice(exportsIndex, 1);
    
    if ((moduleIndex = indexOf.call(deps, 'module')) != -1)
      deps.splice(moduleIndex, 1);

    var define = {
      name: name,
      deps: deps,
      execute: function(req, exports, module) {

        var depValues = [];
        for (var i = 0; i < deps.length; i++)
          depValues.push(req(deps[i]));

        module.uri = module.id;

        module.config = function() {};

        // add back in system dependencies
        if (moduleIndex != -1)
          depValues.splice(moduleIndex, 0, module);
        
        if (exportsIndex != -1)
          depValues.splice(exportsIndex, 0, exports);
        
        if (requireIndex != -1) 
          depValues.splice(requireIndex, 0, function(names, callback, errback) {
            if (typeof names == 'string' && typeof callback != 'function')
              return req(names);
            return require.call(loader, names, callback, errback, module.id);
          });

        // set global require to AMD require
        var curRequire = __global.require;
        __global.require = require;

        var output = factory.apply(exportsIndex == -1 ? __global : exports, depValues);

        __global.require = curRequire;

        if (typeof output == 'undefined' && module)
          output = module.exports;

        if (typeof output != 'undefined')
          return output;
      }
    };

    // anonymous define
    if (!name) {
      // already defined anonymously -> throw
      if (lastModule.anonDefine)
        throw new TypeError('Multiple defines for anonymous module');
      lastModule.anonDefine = define;
    }
    // named define
    else {
      // if we don't have any other defines,
      // then let this be an anonymous define
      // this is just to support single modules of the form:
      // define('jquery')
      // still loading anonymously
      // because it is done widely enough to be useful
      if (!lastModule.anonDefine && !lastModule.isBundle) {
        lastModule.anonDefine = define;
      }
      // otherwise its a bundle only
      else {
        // if there is an anonDefine already (we thought it could have had a single named define)
        // then we define it now
        // this is to avoid defining named defines when they are actually anonymous
        if (lastModule.anonDefine && lastModule.anonDefine.name)
          loader.registerDynamic(lastModule.anonDefine.name, lastModule.anonDefine.deps, false, lastModule.anonDefine.execute);

        lastModule.anonDefine = null;
      }

      // note this is now a bundle
      lastModule.isBundle = true;

      // define the module through the register registry
      loader.registerDynamic(name, define.deps, false, define.execute);
    }
  }
  define.amd = {};

  // adds define as a global (potentially just temporarily)
  function createDefine(loader) {
    lastModule.anonDefine = null;
    lastModule.isBundle = false;

    // ensure no NodeJS environment detection
    var oldModule = __global.module;
    var oldExports = __global.exports;
    var oldDefine = __global.define;

    __global.module = undefined;
    __global.exports = undefined;
    __global.define = define;

    return function() {
      __global.define = oldDefine;
      __global.module = oldModule;
      __global.exports = oldExports;
    };
  }

  var lastModule = {
    isBundle: false,
    anonDefine: null
  };

  loader.set('@@amd-helpers', loader.newModule({
    createDefine: createDefine,
    require: require,
    define: define,
    lastModule: lastModule
  }));
  loader.amdDefine = define;
  loader.amdRequire = require;
})(typeof self != 'undefined' ? self : global);
"bundle";
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
!function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("1", [], e) : t.Ractive = e();
}(this, function() {
  "use strict";
  function t(t) {
    var e;
    if (t && "boolean" != typeof t)
      return "undefined" != typeof window && document && t ? t.nodeType ? t : "string" == typeof t && (e = document.getElementById(t), !e && document.querySelector && (e = document.querySelector(t)), e && e.nodeType) ? e : t[0] && t[0].nodeType ? t[0] : null : null;
  }
  function e(t) {
    return t && "unknown" != typeof t.parentNode && t.parentNode && t.parentNode.removeChild(t), t;
  }
  function n(t) {
    return null != t && t.toString ? t : "";
  }
  function i(t) {
    for (var e = arguments.length,
        n = Array(e > 1 ? e - 1 : 0),
        i = 1; e > i; i++)
      n[i - 1] = arguments[i];
    for (var r,
        s; s = n.shift(); )
      for (r in s)
        Oa.call(s, r) && (t[r] = s[r]);
    return t;
  }
  function r(t) {
    for (var e = arguments.length,
        n = Array(e > 1 ? e - 1 : 0),
        i = 1; e > i; i++)
      n[i - 1] = arguments[i];
    return n.forEach(function(e) {
      for (var n in e)
        !e.hasOwnProperty(n) || n in t || (t[n] = e[n]);
    }), t;
  }
  function s(t) {
    return "[object Array]" === Pa.call(t);
  }
  function o(t) {
    return Ta.test(Pa.call(t));
  }
  function a(t, e) {
    return null === t && null === e ? !0 : "object" == typeof t || "object" == typeof e ? !1 : t === e;
  }
  function u(t) {
    return !isNaN(parseFloat(t)) && isFinite(t);
  }
  function h(t) {
    return t && "[object Object]" === Pa.call(t);
  }
  function c(t, e) {
    return t.replace(/%s/g, function() {
      return e.shift();
    });
  }
  function l(t) {
    for (var e = arguments.length,
        n = Array(e > 1 ? e - 1 : 0),
        i = 1; e > i; i++)
      n[i - 1] = arguments[i];
    throw t = c(t, n), new Error(t);
  }
  function f() {
    Qb.DEBUG && Aa.apply(null, arguments);
  }
  function d(t) {
    for (var e = arguments.length,
        n = Array(e > 1 ? e - 1 : 0),
        i = 1; e > i; i++)
      n[i - 1] = arguments[i];
    t = c(t, n), Sa(t, n);
  }
  function p(t) {
    for (var e = arguments.length,
        n = Array(e > 1 ? e - 1 : 0),
        i = 1; e > i; i++)
      n[i - 1] = arguments[i];
    t = c(t, n), Ra[t] || (Ra[t] = !0, Sa(t, n));
  }
  function m() {
    Qb.DEBUG && d.apply(null, arguments);
  }
  function v() {
    Qb.DEBUG && p.apply(null, arguments);
  }
  function g(t, e, n) {
    var i = y(t, e, n);
    return i ? i[t][n] : null;
  }
  function y(t, e, n) {
    for (; e; ) {
      if (n in e[t])
        return e;
      if (e.isolated)
        return null;
      e = e.parent;
    }
  }
  function b(t) {
    return function() {
      return t;
    };
  }
  function w(t) {
    var e,
        n,
        i,
        r,
        s,
        o;
    for (e = t.split("."), (n = Wa[e.length]) || (n = x(e.length)), s = [], i = function(t, n) {
      return t ? "*" : e[n];
    }, r = n.length; r--; )
      o = n[r].map(i).join("."), s.hasOwnProperty(o) || (s.push(o), s[o] = !0);
    return s;
  }
  function x(t) {
    var e,
        n,
        i,
        r,
        s,
        o,
        a,
        u,
        h = "";
    if (!Wa[t]) {
      for (i = []; h.length < t; )
        h += 1;
      for (e = parseInt(h, 2), r = function(t) {
        return "1" === t;
      }, s = 0; e >= s; s += 1) {
        for (n = s.toString(2); n.length < t; )
          n = "0" + n;
        for (u = [], a = n.length, o = 0; a > o; o++)
          u.push(r(n[o]));
        i[s] = u;
      }
      Wa[t] = i;
    }
    return Wa[t];
  }
  function k(t, e, n, i) {
    var r = t[e];
    if (!r || !r.equalsOrStartsWith(i) && r.equalsOrStartsWith(n))
      return t[e] = r ? r.replace(n, i) : i, !0;
  }
  function E(t) {
    var e = t.slice(2);
    return "i" === t[1] && u(e) ? +e : e;
  }
  function _(t) {
    return null == t ? t : (qa.hasOwnProperty(t) || (qa[t] = new $a(t)), qa[t]);
  }
  function A(t, e) {
    function n(e, n) {
      var i,
          r,
          o;
      return n.isRoot ? o = [].concat(Object.keys(t.viewmodel.data), Object.keys(t.viewmodel.mappings), Object.keys(t.viewmodel.computations)) : (i = t.viewmodel.wrapped[n.str], r = i ? i.get() : t.viewmodel.get(n), o = r ? Object.keys(r) : null), o && o.forEach(function(t) {
        "_ractive" === t && s(r) || e.push(n.join(t));
      }), e;
    }
    var i,
        r,
        o;
    for (i = e.str.split("."), o = [Za]; r = i.shift(); )
      "*" === r ? o = o.reduce(n, []) : o[0] === Za ? o[0] = _(r) : o = o.map(S(r));
    return o;
  }
  function S(t) {
    return function(e) {
      return e.join(t);
    };
  }
  function C(t) {
    return t ? t.replace(za, ".$1") : "";
  }
  function O(t, e, n) {
    if ("string" != typeof e || !u(n))
      throw new Error("Bad arguments");
    var i = void 0,
        r = void 0;
    if (/\*/.test(e))
      return r = {}, A(t, _(C(e))).forEach(function(e) {
        var i = t.viewmodel.get(e);
        if (!u(i))
          throw new Error(Ka);
        r[e.str] = i + n;
      }), t.set(r);
    if (i = t.get(e), !u(i))
      throw new Error(Ka);
    return t.set(e, +i + n);
  }
  function P(t, e) {
    return Ha(this, t, void 0 === e ? 1 : +e);
  }
  function T(t) {
    this.event = t, this.method = "on" + t, this.deprecate = tu[t];
  }
  function F(t, e) {
    var n = t.indexOf(e);
    -1 === n && t.push(e);
  }
  function R(t, e) {
    for (var n = 0,
        i = t.length; i > n; n++)
      if (t[n] == e)
        return !0;
    return !1;
  }
  function j(t, e) {
    var n;
    if (!s(t) || !s(e))
      return !1;
    if (t.length !== e.length)
      return !1;
    for (n = t.length; n--; )
      if (t[n] !== e[n])
        return !1;
    return !0;
  }
  function N(t) {
    return "string" == typeof t ? [t] : void 0 === t ? [] : t;
  }
  function D(t) {
    return t[t.length - 1];
  }
  function I(t, e) {
    var n = t.indexOf(e);
    -1 !== n && t.splice(n, 1);
  }
  function L(t) {
    for (var e = [],
        n = t.length; n--; )
      e[n] = t[n];
    return e;
  }
  function V(t) {
    setTimeout(t, 0);
  }
  function M(t, e) {
    return function() {
      for (var n; n = t.shift(); )
        n(e);
    };
  }
  function U(t, e, n, i) {
    var r;
    if (e === t)
      throw new TypeError("A promise's fulfillment handler cannot return the same promise");
    if (e instanceof eu)
      e.then(n, i);
    else if (!e || "object" != typeof e && "function" != typeof e)
      n(e);
    else {
      try {
        r = e.then;
      } catch (s) {
        return void i(s);
      }
      if ("function" == typeof r) {
        var o,
            a,
            u;
        a = function(e) {
          o || (o = !0, U(t, e, n, i));
        }, u = function(t) {
          o || (o = !0, i(t));
        };
        try {
          r.call(e, a, u);
        } catch (s) {
          if (!o)
            return i(s), void(o = !0);
        }
      } else
        n(e);
    }
  }
  function W(t, e, n) {
    var i;
    return e = C(e), "~/" === e.substr(0, 2) ? (i = _(e.substring(2)), q(t, i.firstKey, n)) : "." === e[0] ? (i = z(au(n), e), i && q(t, i.firstKey, n)) : i = B(t, _(e), n), i;
  }
  function z(t, e) {
    var n;
    if (void 0 != t && "string" != typeof t && (t = t.str), "." === e)
      return _(t);
    if (n = t ? t.split(".") : [], "../" === e.substr(0, 3)) {
      for (; "../" === e.substr(0, 3); ) {
        if (!n.length)
          throw new Error('Could not resolve reference - too many "../" prefixes');
        n.pop(), e = e.substring(3);
      }
      return n.push(e), _(n.join("."));
    }
    return _(t ? t + e.replace(/^\.\//, ".") : e.replace(/^\.\/?/, ""));
  }
  function B(t, e, n, i) {
    var r,
        s,
        o,
        a,
        u;
    if (e.isRoot)
      return e;
    for (s = e.firstKey; n; )
      if (r = n.context, n = n.parent, r && (a = !0, o = t.viewmodel.get(r), o && ("object" == typeof o || "function" == typeof o) && s in o))
        return r.join(e.str);
    return $(t.viewmodel, s) ? e : t.parent && !t.isolated && (a = !0, n = t.component.parentFragment, s = _(s), u = B(t.parent, s, n, !0)) ? (t.viewmodel.map(s, {
      origin: t.parent.viewmodel,
      keypath: u
    }), e) : i || a ? void 0 : (t.viewmodel.set(e, void 0), e);
  }
  function q(t, e) {
    var n;
    !t.parent || t.isolated || $(t.viewmodel, e) || (e = _(e), (n = B(t.parent, e, t.component.parentFragment, !0)) && t.viewmodel.map(e, {
      origin: t.parent.viewmodel,
      keypath: n
    }));
  }
  function $(t, e) {
    return "" === e || e in t.data || e in t.computations || e in t.mappings;
  }
  function Q(t) {
    t.teardown();
  }
  function Z(t) {
    t.unbind();
  }
  function H(t) {
    t.unrender();
  }
  function K(t) {
    t.cancel();
  }
  function G(t) {
    t.detach();
  }
  function Y(t) {
    t.detachNodes();
  }
  function J(t) {
    !t.ready || t.outros.length || t.outroChildren || (t.outrosComplete || (t.parent ? t.parent.decrementOutros(t) : t.detachNodes(), t.outrosComplete = !0), t.intros.length || t.totalChildren || ("function" == typeof t.callback && t.callback(), t.parent && t.parent.decrementTotal()));
  }
  function X() {
    for (var t,
        e,
        n; cu.ractives.length; )
      e = cu.ractives.pop(), n = e.viewmodel.applyChanges(), n && pu.fire(e, n);
    for (tt(), t = 0; t < cu.views.length; t += 1)
      cu.views[t].update();
    for (cu.views.length = 0, t = 0; t < cu.tasks.length; t += 1)
      cu.tasks[t]();
    return cu.tasks.length = 0, cu.ractives.length ? X() : void 0;
  }
  function tt() {
    var t,
        e,
        n,
        i;
    for (t = du.length; t--; )
      e = du[t], e.keypath ? du.splice(t, 1) : (n = uu(e.root, e.ref, e.parentFragment)) && ((i || (i = [])).push({
        item: e,
        keypath: n
      }), du.splice(t, 1));
    i && i.forEach(et);
  }
  function et(t) {
    t.item.resolve(t.keypath);
  }
  function nt(t, e, n) {
    var i,
        r,
        s,
        o,
        a,
        u,
        h,
        c,
        l,
        f,
        d,
        p,
        m,
        v;
    if (i = new ou(function(t) {
      return r = t;
    }), "object" == typeof t) {
      n = e || {}, u = n.easing, h = n.duration, a = [], c = n.step, l = n.complete, (c || l) && (d = {}, n.step = null, n.complete = null, f = function(t) {
        return function(e, n) {
          d[t] = n;
        };
      });
      for (s in t)
        t.hasOwnProperty(s) && ((c || l) && (p = f(s), n = {
          easing: u,
          duration: h
        }, c && (n.step = p)), n.complete = l ? p : Fa, a.push(it(this, s, t[s], n)));
      return v = {
        easing: u,
        duration: h
      }, c && (v.step = function(t) {
        return c(t, d);
      }), l && i.then(function(t) {
        return l(t, d);
      }), v.complete = r, m = it(this, null, null, v), a.push(m), i.stop = function() {
        for (var t; t = a.pop(); )
          t.stop();
        m && m.stop();
      }, i;
    }
    return n = n || {}, n.complete && i.then(n.complete), n.complete = r, o = it(this, t, e, n), i.stop = function() {
      return o.stop();
    }, i;
  }
  function it(t, e, n, i) {
    var r,
        s,
        o,
        u;
    return e && (e = _(C(e))), null !== e && (u = t.viewmodel.get(e)), yu.abort(e, t), a(u, n) ? (i.complete && i.complete(i.to), ku) : (i.easing && (r = "function" == typeof i.easing ? i.easing : t.easing[i.easing], "function" != typeof r && (r = null)), s = void 0 === i.duration ? 400 : i.duration, o = new wu({
      keypath: e,
      from: u,
      to: n,
      root: t,
      duration: s,
      easing: r,
      interpolator: i.interpolator,
      step: i.step,
      complete: i.complete
    }), yu.add(o), t._animations.push(o), o);
  }
  function rt() {
    return this.detached ? this.detached : (this.el && I(this.el.__ractive_instances__, this), this.detached = this.fragment.detach(), _u.fire(this), this.detached);
  }
  function st(t) {
    return this.el ? this.fragment.find(t) : null;
  }
  function ot(t, e) {
    var n;
    return n = this._isComponentQuery ? !this.selector || t.name === this.selector : t.node ? fa(t.node, this.selector) : null, n ? (this.push(t.node || t.instance), e || this._makeDirty(), !0) : void 0;
  }
  function at(t) {
    var e;
    return (e = t.parentFragment) ? e.owner : t.component && (e = t.component.parentFragment) ? e.owner : void 0;
  }
  function ut(t) {
    var e,
        n;
    for (e = [t], n = at(t); n; )
      e.push(n), n = at(n);
    return e;
  }
  function ht(t, e, n, i) {
    var r = [];
    return ka(r, {
      selector: {value: e},
      live: {value: n},
      _isComponentQuery: {value: i},
      _test: {value: Su}
    }), n ? (ka(r, {
      cancel: {value: Cu},
      _root: {value: t},
      _sort: {value: Tu},
      _makeDirty: {value: Fu},
      _remove: {value: Ru},
      _dirty: {
        value: !1,
        writable: !0
      }
    }), r) : r;
  }
  function ct(t, e) {
    var n,
        i;
    return this.el ? (e = e || {}, n = this._liveQueries, (i = n[t]) ? e && e.live ? i : i.slice() : (i = ju(this, t, !!e.live, !1), i.live && (n.push(t), n["_" + t] = i), this.fragment.findAll(t, i), i)) : [];
  }
  function lt(t, e) {
    var n,
        i;
    return e = e || {}, n = this._liveComponentQueries, (i = n[t]) ? e && e.live ? i : i.slice() : (i = ju(this, t, !!e.live, !0), i.live && (n.push(t), n["_" + t] = i), this.fragment.findAllComponents(t, i), i);
  }
  function ft(t) {
    return this.fragment.findComponent(t);
  }
  function dt(t) {
    return this.container ? this.container.component && this.container.component.name === t ? this.container : this.container.findContainer(t) : null;
  }
  function pt(t) {
    return this.parent ? this.parent.component && this.parent.component.name === t ? this.parent : this.parent.findParent(t) : null;
  }
  function mt(t, e) {
    var n = void 0 === arguments[2] ? {} : arguments[2];
    if (e) {
      n.event ? n.event.name = e : n.event = {
        name: e,
        _noArg: !0
      };
      var i = _(e).wildcardMatches();
      vt(t, i, n.event, n.args, !0);
    }
  }
  function vt(t, e, n, i) {
    var r,
        s,
        o = void 0 === arguments[4] ? !1 : arguments[4],
        a = !0;
    for (Uu.enqueue(t, n), s = e.length; s >= 0; s--)
      r = t._subs[e[s]], r && (a = gt(t, r, n, i) && a);
    if (Uu.dequeue(t), t.parent && a) {
      if (o && t.component) {
        var u = t.component.name + "." + e[e.length - 1];
        e = _(u).wildcardMatches(), n && (n.component = t);
      }
      vt(t.parent, e, n, i);
    }
  }
  function gt(t, e, n, i) {
    var r = null,
        s = !1;
    n && !n._noArg && (i = [n].concat(i)), e = e.slice();
    for (var o = 0,
        a = e.length; a > o; o += 1)
      e[o].apply(t, i) === !1 && (s = !0);
    return n && !n._noArg && s && (r = n.original) && (r.preventDefault && r.preventDefault(), r.stopPropagation && r.stopPropagation()), !s;
  }
  function yt(t) {
    var e = {args: Array.prototype.slice.call(arguments, 1)};
    Wu(this, t, e);
  }
  function bt(t) {
    var e;
    return t = _(C(t)), e = this.viewmodel.get(t, qu), void 0 === e && this.parent && !this.isolated && uu(this, t.str, this.component.parentFragment) && (e = this.viewmodel.get(t)), e;
  }
  function wt(e, n) {
    if (!this.fragment.rendered)
      throw new Error("The API has changed - you must call `ractive.render(target[, anchor])` to render your Ractive instance. Once rendered you can use `ractive.insert()`.");
    if (e = t(e), n = t(n) || null, !e)
      throw new Error("You must specify a valid target to insert into");
    e.insertBefore(this.detach(), n), this.el = e, (e.__ractive_instances__ || (e.__ractive_instances__ = [])).push(this), this.detached = null, xt(this);
  }
  function xt(t) {
    Qu.fire(t), t.findAllComponents("*").forEach(function(t) {
      xt(t.instance);
    });
  }
  function kt(t, e, n) {
    var i,
        r;
    return t = _(C(t)), i = this.viewmodel.get(t), s(i) && s(e) ? (r = mu.start(this, !0), this.viewmodel.merge(t, i, e, n), mu.end(), r) : this.set(t, e, n && n.complete);
  }
  function Et(t, e) {
    var n,
        i;
    return n = A(t, e), i = {}, n.forEach(function(e) {
      i[e.str] = t.get(e.str);
    }), i;
  }
  function _t(t, e, n, i) {
    var r,
        s,
        o;
    e = _(C(e)), i = i || ah, e.isPattern ? (r = new sh(t, e, n, i), t.viewmodel.patternObservers.push(r), s = !0) : r = new Gu(t, e, n, i), r.init(i.init), t.viewmodel.register(e, r, s ? "patternObservers" : "observers"), r.ready = !0;
    var a = {cancel: function() {
        var n;
        o || (s ? (n = t.viewmodel.patternObservers.indexOf(r), t.viewmodel.patternObservers.splice(n, 1), t.viewmodel.unregister(e, r, "patternObservers")) : t.viewmodel.unregister(e, r, "observers"), o = !0);
      }};
    return t._observers.push(a), a;
  }
  function At(t, e, n) {
    var i,
        r,
        s,
        o;
    if (h(t)) {
      n = e, r = t, i = [];
      for (t in r)
        r.hasOwnProperty(t) && (e = r[t], i.push(this.observe(t, e, n)));
      return {cancel: function() {
          for (; i.length; )
            i.pop().cancel();
        }};
    }
    if ("function" == typeof t)
      return n = e, e = t, t = "", oh(this, t, e, n);
    if (s = t.split(" "), 1 === s.length)
      return oh(this, t, e, n);
    for (i = [], o = s.length; o--; )
      t = s[o], t && i.push(oh(this, t, e, n));
    return {cancel: function() {
        for (; i.length; )
          i.pop().cancel();
      }};
  }
  function St(t, e, n) {
    var i = this.observe(t, function() {
      e.apply(this, arguments), i.cancel();
    }, {
      init: !1,
      defer: n && n.defer
    });
    return i;
  }
  function Ct(t, e) {
    var n,
        i = this;
    if (t)
      n = t.split(" ").map(ch).filter(lh), n.forEach(function(t) {
        var n,
            r;
        (n = i._subs[t]) && (e ? (r = n.indexOf(e), -1 !== r && n.splice(r, 1)) : i._subs[t] = []);
      });
    else
      for (t in this._subs)
        delete this._subs[t];
    return this;
  }
  function Ot(t, e) {
    var n,
        i,
        r,
        s = this;
    if ("object" == typeof t) {
      n = [];
      for (i in t)
        t.hasOwnProperty(i) && n.push(this.on(i, t[i]));
      return {cancel: function() {
          for (var t; t = n.pop(); )
            t.cancel();
        }};
    }
    return r = t.split(" ").map(ch).filter(lh), r.forEach(function(t) {
      (s._subs[t] || (s._subs[t] = [])).push(e);
    }), {cancel: function() {
        return s.off(t, e);
      }};
  }
  function Pt(t, e) {
    var n = this.on(t, function() {
      e.apply(this, arguments), n.cancel();
    });
    return n;
  }
  function Tt(t, e, n) {
    var i,
        r,
        s,
        o,
        a,
        u,
        h = [];
    if (i = Ft(t, e, n), !i)
      return null;
    for (r = t.length, a = i.length - 2 - i[1], s = Math.min(r, i[0]), o = s + i[1], u = 0; s > u; u += 1)
      h.push(u);
    for (; o > u; u += 1)
      h.push(-1);
    for (; r > u; u += 1)
      h.push(u + a);
    return h.touchedFrom = 0 !== a ? i[0] : t.length, h;
  }
  function Ft(t, e, n) {
    switch (e) {
      case "splice":
        for (void 0 !== n[0] && n[0] < 0 && (n[0] = t.length + Math.max(n[0], -t.length)); n.length < 2; )
          n.push(0);
        return n[1] = Math.min(n[1], t.length - n[0]), n;
      case "sort":
      case "reverse":
        return null;
      case "pop":
        return t.length ? [t.length - 1, 1] : [0, 0];
      case "push":
        return [t.length, 0].concat(n);
      case "shift":
        return [0, t.length ? 1 : 0];
      case "unshift":
        return [0, 0].concat(n);
    }
  }
  function Rt(e, n) {
    var i,
        r,
        s,
        o = this;
    if (s = this.transitionsEnabled, this.noIntro && (this.transitionsEnabled = !1), i = mu.start(this, !0), mu.scheduleTask(function() {
      return Ch.fire(o);
    }, !0), this.fragment.rendered)
      throw new Error("You cannot call ractive.render() on an already rendered instance! Call ractive.unrender() first");
    if (e = t(e) || this.el, n = t(n) || this.anchor, this.el = e, this.anchor = n, !this.append && e) {
      var a = e.__ractive_instances__;
      a && a.length && jt(a), e.innerHTML = "";
    }
    return this.cssId && Ah.apply(), e && ((r = e.__ractive_instances__) ? r.push(this) : e.__ractive_instances__ = [this], n ? e.insertBefore(this.fragment.render(), n) : e.appendChild(this.fragment.render())), mu.end(), this.transitionsEnabled = s, i.then(function() {
      return Oh.fire(o);
    });
  }
  function jt(t) {
    t.splice(0, t.length).forEach(Q);
  }
  function Nt(t, e) {
    for (var n = t.slice(),
        i = e.length; i--; )
      ~n.indexOf(e[i]) || n.push(e[i]);
    return n;
  }
  function Dt(t, e) {
    var n,
        i,
        r;
    return i = '[data-ractive-css~="{' + e + '}"]', r = function(t) {
      var e,
          n,
          r,
          s,
          o,
          a,
          u,
          h = [];
      for (e = []; n = Nh.exec(t); )
        e.push({
          str: n[0],
          base: n[1],
          modifiers: n[2]
        });
      for (s = e.map(Lt), u = e.length; u--; )
        a = s.slice(), r = e[u], a[u] = r.base + i + r.modifiers || "", o = s.slice(), o[u] = i + " " + o[u], h.push(a.join(" "), o.join(" "));
      return h.join(", ");
    }, n = Ih.test(t) ? t.replace(Ih, i) : t.replace(jh, "").replace(Rh, function(t, e) {
      var n,
          i;
      return Dh.test(e) ? t : (n = e.split(",").map(It), i = n.map(r).join(", ") + " ", t.replace(e, i));
    });
  }
  function It(t) {
    return t.trim ? t.trim() : t.replace(/^\s+/, "").replace(/\s+$/, "");
  }
  function Lt(t) {
    return t.str;
  }
  function Vt(t) {
    t && t.constructor !== Object && ("function" == typeof t || ("object" != typeof t ? l("data option must be an object or a function, `" + t + "` is not valid") : m("If supplied, options.data should be a plain JavaScript object - using a non-POJO as the root object may work, but is discouraged")));
  }
  function Mt(t, e) {
    Vt(e);
    var n = "function" == typeof t,
        i = "function" == typeof e;
    return e || n || (e = {}), n || i ? function() {
      var r = i ? Ut(e, this) : e,
          s = n ? Ut(t, this) : t;
      return Wt(r, s);
    } : Wt(e, t);
  }
  function Ut(t, e) {
    var n = t.call(e);
    if (n)
      return "object" != typeof n && l("Data function must return an object"), n.constructor !== Object && v("Data function returned something other than a plain JavaScript object. This might work, but is strongly discouraged"), n;
  }
  function Wt(t, e) {
    if (t && e) {
      for (var n in e)
        n in t || (t[n] = e[n]);
      return t;
    }
    return t || e;
  }
  function zt(t) {
    var e,
        n,
        i;
    return t.matchString("=") ? (e = t.pos, t.allowWhitespace(), (n = t.matchPattern(jc)) ? t.matchPattern(Nc) ? (i = t.matchPattern(jc)) ? (t.allowWhitespace(), t.matchString("=") ? [n, i] : (t.pos = e, null)) : (t.pos = e, null) : null : (t.pos = e, null)) : null;
  }
  function Bt(t) {
    var e;
    return (e = t.matchPattern(Ic)) ? {
      t: pc,
      v: e
    } : null;
  }
  function qt(t) {
    var e,
        n;
    if (t.interpolate[t.inside] === !1)
      return null;
    for (n = 0; n < t.tags.length; n += 1)
      if (e = $t(t, t.tags[n]))
        return e;
  }
  function $t(t, e) {
    var n,
        i,
        r,
        s;
    if (n = t.pos, t.matchString("\\" + e.open)) {
      if (0 === n || "\\" !== t.str[n - 1])
        return e.open;
    } else if (!t.matchString(e.open))
      return null;
    if (i = Rc(t))
      return t.matchString(e.close) ? (e.open = i[0], e.close = i[1], t.sortMustacheTags(), Vc) : null;
    if (t.allowWhitespace(), t.matchString("/")) {
      t.pos -= 1;
      var o = t.pos;
      Dc(t) ? t.pos = o : (t.pos = o - e.close.length, t.error("Attempted to close a section that wasn't open"));
    }
    for (s = 0; s < e.readers.length; s += 1)
      if (r = e.readers[s], i = r(t, e))
        return e.isStatic && (i.s = !0), t.includeLinePositions && (i.p = t.getLinePos(n)), i;
    return t.pos = n, null;
  }
  function Qt(t) {
    var e;
    return (e = t.matchPattern(zc)) ? {
      t: hc,
      v: e
    } : null;
  }
  function Zt(t) {
    var e = t.remaining();
    return "true" === e.substr(0, 4) ? (t.pos += 4, {
      t: dc,
      v: "true"
    }) : "false" === e.substr(0, 5) ? (t.pos += 5, {
      t: dc,
      v: "false"
    }) : null;
  }
  function Ht(t) {
    var e;
    return (e = Kc(t)) ? Jc.test(e.v) ? e.v : '"' + e.v.replace(/"/g, '\\"') + '"' : (e = Wc(t)) ? e.v : (e = t.matchPattern(Gc)) ? e : void 0;
  }
  function Kt(t) {
    var e,
        n,
        i;
    return e = t.pos, t.allowWhitespace(), n = Yc(t), null === n ? (t.pos = e, null) : (t.allowWhitespace(), t.matchString(":") ? (t.allowWhitespace(), i = Ol(t), null === i ? (t.pos = e, null) : {
      t: vc,
      k: n,
      v: i
    }) : (t.pos = e, null));
  }
  function Gt(t) {
    var e,
        n,
        i,
        r;
    return e = t.pos, i = Xc(t), null === i ? null : (n = [i], t.matchString(",") ? (r = Gt(t), r ? n.concat(r) : (t.pos = e, null)) : n);
  }
  function Yt(t) {
    function e(t) {
      i.push(t);
    }
    var n,
        i,
        r,
        s;
    return n = t.pos, t.allowWhitespace(), r = Ol(t), null === r ? null : (i = [r], t.allowWhitespace(), t.matchString(",") && (s = Yt(t), null === s && t.error(Mc), s.forEach(e)), i);
  }
  function Jt(t) {
    return Wc(t) || Bc(t) || Kc(t) || el(t) || il(t) || Dc(t);
  }
  function Xt(t) {
    var e,
        n,
        i,
        r,
        s,
        o;
    return e = t.pos, i = t.matchPattern(/^@(?:keypath|index|key)/), i || (n = t.matchPattern(ol) || "", i = !n && t.relaxedNames && t.matchPattern(cl) || t.matchPattern(hl), i || "." !== n || (n = "", i = ".")), i ? n || t.relaxedNames || !$c.test(i) ? !n && qc.test(i) ? (r = qc.exec(i)[0], t.pos = e + r.length, {
      t: mc,
      v: r
    }) : (s = (n || "") + C(i), t.matchString("(") && (o = s.lastIndexOf("."), -1 !== o ? (s = s.substr(0, o), t.pos = e + s.length) : t.pos -= 1), {
      t: gc,
      n: s.replace(/^this\./, "./").replace(/^this$/, ".")
    }) : (t.pos = e, null) : null;
  }
  function te(t) {
    var e,
        n;
    return e = t.pos, t.matchString("(") ? (t.allowWhitespace(), n = Ol(t), n || t.error(Mc), t.allowWhitespace(), t.matchString(")") || t.error(Uc), {
      t: xc,
      x: n
    }) : null;
  }
  function ee(t) {
    var e,
        n,
        i;
    if (e = t.pos, t.allowWhitespace(), t.matchString(".")) {
      if (t.allowWhitespace(), n = t.matchPattern(Gc))
        return {
          t: yc,
          n: n
        };
      t.error("Expected a property name");
    }
    return t.matchString("[") ? (t.allowWhitespace(), i = Ol(t), i || t.error(Mc), t.allowWhitespace(), t.matchString("]") || t.error("Expected ']'"), {
      t: yc,
      x: i
    }) : null;
  }
  function ne(t) {
    var e,
        n,
        i,
        r;
    return (n = Sl(t)) ? (e = t.pos, t.allowWhitespace(), t.matchString("?") ? (t.allowWhitespace(), i = Ol(t), i || t.error(Mc), t.allowWhitespace(), t.matchString(":") || t.error('Expected ":"'), t.allowWhitespace(), r = Ol(t), r || t.error(Mc), {
      t: kc,
      o: [n, i, r]
    }) : (t.pos = e, n)) : null;
  }
  function ie(t) {
    return Cl(t);
  }
  function re(t) {
    function e(t) {
      switch (t.t) {
        case dc:
        case mc:
        case hc:
        case pc:
          return t.v;
        case cc:
          return JSON.stringify(String(t.v));
        case lc:
          return "[" + (t.m ? t.m.map(e).join(",") : "") + "]";
        case fc:
          return "{" + (t.m ? t.m.map(e).join(",") : "") + "}";
        case vc:
          return t.k + ":" + e(t.v);
        case wc:
          return ("typeof" === t.s ? "typeof " : t.s) + e(t.o);
        case Ec:
          return e(t.o[0]) + ("in" === t.s.substr(0, 2) ? " " + t.s + " " : t.s) + e(t.o[1]);
        case _c:
          return e(t.x) + "(" + (t.o ? t.o.map(e).join(",") : "") + ")";
        case xc:
          return "(" + e(t.x) + ")";
        case bc:
          return e(t.x) + e(t.r);
        case yc:
          return t.n ? "." + t.n : "[" + e(t.x) + "]";
        case kc:
          return e(t.o[0]) + "?" + e(t.o[1]) + ":" + e(t.o[2]);
        case gc:
          return "_" + n.indexOf(t.n);
        default:
          throw new Error("Expected legal JavaScript");
      }
    }
    var n;
    return se(t, n = []), {
      r: n,
      s: e(t)
    };
  }
  function se(t, e) {
    var n,
        i;
    if (t.t === gc && -1 === e.indexOf(t.n) && e.unshift(t.n), i = t.o || t.m)
      if (h(i))
        se(i, e);
      else
        for (n = i.length; n--; )
          se(i[n], e);
    t.x && se(t.x, e), t.r && se(t.r, e), t.v && se(t.v, e);
  }
  function oe(t, e) {
    var n;
    if (t) {
      for (; t.t === xc && t.x; )
        t = t.x;
      return t.t === gc ? e.r = t.n : t.t === hc && Fl.test(t.v) ? e.r = t.v : (n = ae(t)) ? e.rx = n : e.x = Pl(t), e;
    }
  }
  function ae(t) {
    for (var e,
        n = []; t.t === bc && t.r.t === yc; )
      e = t.r, n.unshift(e.x ? e.x.t === gc ? e.x : Pl(e.x) : e.n), t = t.x;
    return t.t !== gc ? null : {
      r: t.n,
      m: n
    };
  }
  function ue(t, e) {
    var n,
        i = Ol(t);
    return i ? (t.matchString(e.close) || t.error("Expected closing delimiter '" + e.close + "'"), n = {t: Kh}, Tl(i, n), n) : null;
  }
  function he(t, e) {
    var n,
        i;
    return t.matchString("&") ? (t.allowWhitespace(), (n = Ol(t)) ? (t.matchString(e.close) || t.error("Expected closing delimiter '" + e.close + "'"), i = {t: Kh}, Tl(n, i), i) : null) : null;
  }
  function ce(t, e) {
    var n,
        i,
        r,
        s,
        o;
    return n = t.pos, t.matchString(">") ? (t.allowWhitespace(), i = t.pos, t.relaxedNames = !0, r = Ol(t), t.relaxedNames = !1, t.allowWhitespace(), s = Ol(t), t.allowWhitespace(), r ? (o = {t: tc}, Tl(r, o), t.allowWhitespace(), s && (o = {
      t: Gh,
      n: Oc,
      f: [o]
    }, Tl(s, o)), t.matchString(e.close) || t.error("Expected closing delimiter '" + e.close + "'"), o) : null) : null;
  }
  function le(t, e) {
    var n;
    return t.matchString("!") ? (n = t.remaining().indexOf(e.close), -1 !== n ? (t.pos += n + e.close.length, {t: ec}) : void 0) : null;
  }
  function fe(t, e) {
    var n,
        i,
        r;
    if (n = t.pos, i = Ol(t), !i)
      return null;
    for (r = 0; r < e.length; r += 1)
      if (t.remaining().substr(0, e[r].length) === e[r])
        return i;
    return t.pos = n, sl(t);
  }
  function de(t, e) {
    var n,
        i,
        r,
        s;
    n = t.pos;
    try {
      i = Il(t, [e.close]);
    } catch (o) {
      s = o;
    }
    if (!i) {
      if ("!" === t.str.charAt(n))
        return t.pos = n, null;
      if (s)
        throw s;
    }
    if (!t.matchString(e.close) && (t.error("Expected closing delimiter '" + e.close + "' after reference"), !i)) {
      if ("!" === t.nextChar())
        return null;
      t.error("Expected expression or legal reference");
    }
    return r = {t: Hh}, Tl(i, r), r;
  }
  function pe(t, e) {
    var n,
        i,
        r;
    return t.matchPattern(Ml) ? (n = t.pos, i = t.matchPattern(/^[a-zA-Z_$][a-zA-Z_$0-9\-]*/), t.allowWhitespace(), t.matchString(e.close) || t.error("expected legal partial name"), r = {t: oc}, i && (r.n = i), r) : null;
  }
  function me(t, e) {
    var n,
        i,
        r,
        s;
    return n = t.pos, t.matchString(e.open) ? (t.allowWhitespace(), t.matchString("/") ? (t.allowWhitespace(), i = t.remaining(), r = i.indexOf(e.close), -1 !== r ? (s = {
      t: Jh,
      r: i.substr(0, r).split(" ")[0]
    }, t.pos += r, t.matchString(e.close) || t.error("Expected closing delimiter '" + e.close + "'"), s) : (t.pos = n, null)) : (t.pos = n, null)) : null;
  }
  function ve(t, e) {
    var n = t.pos;
    return t.matchString(e.open) ? t.matchPattern(zl) ? (t.matchString(e.close) || t.error("Expected closing delimiter '" + e.close + "'"), {t: Tc}) : (t.pos = n, null) : null;
  }
  function ge(t, e) {
    var n,
        i = t.pos;
    return t.matchString(e.open) ? t.matchPattern(ql) ? (n = Ol(t), t.matchString(e.close) || t.error("Expected closing delimiter '" + e.close + "'"), {
      t: Fc,
      x: n
    }) : (t.pos = i, null) : null;
  }
  function ye(t, e) {
    var n,
        i,
        r,
        s,
        o,
        a,
        u,
        h,
        c,
        l,
        f,
        d;
    if (n = t.pos, t.matchString("^"))
      r = {
        t: Gh,
        f: [],
        n: Sc
      };
    else {
      if (!t.matchString("#"))
        return null;
      r = {
        t: Gh,
        f: []
      }, t.matchString("partial") && (t.pos = n - t.standardDelimiters[0].length, t.error("Partial definitions can only be at the top level of the template, or immediately inside components")), (u = t.matchPattern(Kl)) && (d = u, r.n = $l[u]);
    }
    if (t.allowWhitespace(), i = Ol(t), i || t.error("Expected expression"), f = t.matchPattern(Zl)) {
      var p = void 0;
      r.i = (p = t.matchPattern(Hl)) ? f + "," + p : f;
    }
    t.allowWhitespace(), t.matchString(e.close) || t.error("Expected closing delimiter '" + e.close + "'"), t.sectionDepth += 1, o = r.f, c = [];
    do
      if (s = Ul(t, e))
        d && s.r !== d && t.error("Expected " + e.open + "/" + d + e.close), t.sectionDepth -= 1, l = !0;
      else if (s = Bl(t, e))
        r.n === Sc && t.error("{{else}} not allowed in {{#unless}}"), a && t.error("illegal {{elseif...}} after {{else}}"), h || (h = be(i, r.n)), h.f.push({
          t: Gh,
          n: Ac,
          x: Pl(xe(c.concat(s.x))),
          f: o = []
        }), c.push(we(s.x));
      else if (s = Wl(t, e))
        r.n === Sc && t.error("{{else}} not allowed in {{#unless}}"), a && t.error("there can only be one {{else}} block, at the end of a section"), a = !0, h ? h.f.push({
          t: Gh,
          n: Ac,
          x: Pl(xe(c)),
          f: o = []
        }) : (h = be(i, r.n), o = h.f);
      else {
        if (s = t.read(td), !s)
          break;
        o.push(s);
      }
 while (!l);
    return h && (r.n === Oc && (r.n = Pc), r.l = h), Tl(i, r), r.f.length || delete r.f, r;
  }
  function be(t, e) {
    var n;
    return e === Oc ? (n = {
      t: Gh,
      n: Ac,
      f: []
    }, Tl(we(t), n)) : (n = {
      t: Gh,
      n: Sc,
      f: []
    }, Tl(t, n)), n;
  }
  function we(t) {
    return t.t === wc && "!" === t.s ? t.o : {
      t: wc,
      s: "!",
      o: ke(t)
    };
  }
  function xe(t) {
    return 1 === t.length ? t[0] : {
      t: Ec,
      s: "&&",
      o: [ke(t[0]), ke(xe(t.slice(1)))]
    };
  }
  function ke(t) {
    return {
      t: xc,
      x: t
    };
  }
  function Ee(t) {
    var e,
        n,
        i,
        r,
        s;
    return e = t.pos, t.matchString(Yl) ? (i = t.remaining(), r = i.indexOf(Jl), -1 === r && t.error("Illegal HTML - expected closing comment sequence ('-->')"), n = i.substr(0, r), t.pos += r + 3, s = {
      t: ec,
      c: n
    }, t.includeLinePositions && (s.p = t.getLinePos(e)), s) : null;
  }
  function _e(t) {
    return t.replace(kl, function(t, e) {
      var n;
      return n = "#" !== e[0] ? wl[e] : "x" === e[1] ? parseInt(e.substring(2), 16) : parseInt(e.substring(1), 10), n ? String.fromCharCode(Ae(n)) : t;
    });
  }
  function Ae(t) {
    return t ? 10 === t ? 32 : 128 > t ? t : 159 >= t ? xl[t - 128] : 55296 > t ? t : 57343 >= t ? 65533 : 65535 >= t ? t : 65533 : 65533;
  }
  function Se(t) {
    return t.replace(Al, "&amp;").replace(El, "&lt;").replace(_l, "&gt;");
  }
  function Ce(t) {
    return "string" == typeof t;
  }
  function Oe(t) {
    return t.t === ec || t.t === nc;
  }
  function Pe(t) {
    return (t.t === Gh || t.t === Yh) && t.f;
  }
  function Te(t, e, n, i, r) {
    var o,
        a,
        u,
        h,
        c,
        l,
        f,
        d;
    for (hf(t), o = t.length; o--; )
      a = t[o], a.exclude ? t.splice(o, 1) : e && a.t === ec && t.splice(o, 1);
    for (cf(t, i ? pf : null, r ? mf : null), o = t.length; o--; ) {
      if (a = t[o], a.f) {
        var p = a.t === Xh && df.test(a.e);
        c = n || p, !n && p && cf(a.f, vf, gf), c || (u = t[o - 1], h = t[o + 1], (!u || "string" == typeof u && mf.test(u)) && (l = !0), (!h || "string" == typeof h && pf.test(h)) && (f = !0)), Te(a.f, e, c, l, f);
      }
      if (a.l && (Te(a.l.f, e, n, l, f), t.splice(o + 1, 0, a.l), delete a.l), a.a)
        for (d in a.a)
          a.a.hasOwnProperty(d) && "string" != typeof a.a[d] && Te(a.a[d], e, n, l, f);
      if (a.m && Te(a.m, e, n, l, f), a.v)
        for (d in a.v)
          a.v.hasOwnProperty(d) && (s(a.v[d].n) && Te(a.v[d].n, e, n, l, f), s(a.v[d].d) && Te(a.v[d].d, e, n, l, f));
    }
    for (o = t.length; o--; )
      "string" == typeof t[o] && ("string" == typeof t[o + 1] && (t[o] = t[o] + t[o + 1], t.splice(o + 1, 1)), n || (t[o] = t[o].replace(ff, " ")), "" === t[o] && t.splice(o, 1));
  }
  function Fe(t) {
    var e,
        n;
    return e = t.pos, t.matchString("</") ? (n = t.matchPattern(bf)) ? t.inside && n !== t.inside ? (t.pos = e, null) : {
      t: rc,
      e: n
    } : (t.pos -= 2, void t.error("Illegal closing tag")) : null;
  }
  function Re(t) {
    var e,
        n,
        i;
    return t.allowWhitespace(), (n = t.matchPattern(kf)) ? (e = {name: n}, i = je(t), null != i && (e.value = i), e) : null;
  }
  function je(t) {
    var e,
        n,
        i,
        r;
    return e = t.pos, /[=\/>\s]/.test(t.nextChar()) || t.error("Expected `=`, `/`, `>` or whitespace"), t.allowWhitespace(), t.matchString("=") ? (t.allowWhitespace(), n = t.pos, i = t.sectionDepth, r = Ie(t, "'") || Ie(t, '"') || De(t), null === r && t.error("Expected valid attribute value"), t.sectionDepth !== i && (t.pos = n, t.error("An attribute value must contain as many opening section tags as closing section tags")), r.length ? 1 === r.length && "string" == typeof r[0] ? _e(r[0]) : r : "") : (t.pos = e, null);
  }
  function Ne(t) {
    var e,
        n,
        i,
        r,
        s;
    return e = t.pos, (n = t.matchPattern(Ef)) ? (i = n, r = t.tags.map(function(t) {
      return t.open;
    }), -1 !== (s = wf(i, r)) && (n = n.substr(0, s), t.pos = e + n.length), n) : null;
  }
  function De(t) {
    var e,
        n;
    for (t.inAttribute = !0, e = [], n = Lc(t) || Ne(t); null !== n; )
      e.push(n), n = Lc(t) || Ne(t);
    return e.length ? (t.inAttribute = !1, e) : null;
  }
  function Ie(t, e) {
    var n,
        i,
        r;
    if (n = t.pos, !t.matchString(e))
      return null;
    for (t.inAttribute = e, i = [], r = Lc(t) || Le(t, e); null !== r; )
      i.push(r), r = Lc(t) || Le(t, e);
    return t.matchString(e) ? (t.inAttribute = !1, i) : (t.pos = n, null);
  }
  function Le(t, e) {
    var n,
        i,
        r,
        s;
    return n = t.pos, r = t.remaining(), s = t.tags.map(function(t) {
      return t.open;
    }), s.push(e), i = wf(r, s), -1 === i && t.error("Quoted attribute value must have a closing quote"), i ? (t.pos += i, r.substr(0, i)) : null;
  }
  function Ve(t) {
    var e,
        n,
        i;
    return t.allowWhitespace(), (e = Yc(t)) ? (i = {key: e}, t.allowWhitespace(), t.matchString(":") ? (t.allowWhitespace(), (n = t.read()) ? (i.value = n.v, i) : null) : null) : null;
  }
  function Me(t, e) {
    var n,
        i,
        r,
        s,
        o,
        a,
        u,
        h,
        c;
    if ("string" == typeof t) {
      if (i = Cf.exec(t)) {
        var l = t.lastIndexOf(")");
        return Of.test(t) || e.error("Invalid input after method call expression '" + t.slice(l + 1) + "'"), n = {m: i[1]}, s = "[" + t.slice(n.m.length + 1, l) + "]", r = new _f(s), n.a = Pl(r.result[0]), n;
      }
      if (-1 === t.indexOf(":"))
        return t.trim();
      t = [t];
    }
    if (n = {}, u = [], h = [], t) {
      for (; t.length; )
        if (o = t.shift(), "string" == typeof o) {
          if (a = o.indexOf(":"), -1 !== a) {
            a && u.push(o.substr(0, a)), o.length > a + 1 && (h[0] = o.substring(a + 1));
            break;
          }
          u.push(o);
        } else
          u.push(o);
      h = h.concat(t);
    }
    return u.length ? h.length || "string" != typeof u ? (n = {n: 1 === u.length && "string" == typeof u[0] ? u[0] : u}, 1 === h.length && "string" == typeof h[0] ? (c = Af("[" + h[0] + "]"), n.a = c ? c.value : h[0].trim()) : n.d = h) : n = u : n = "", n;
  }
  function Ue(t) {
    var e,
        n,
        i,
        r,
        s,
        o,
        a,
        u,
        h,
        c,
        l,
        f,
        d,
        p,
        m,
        v;
    if (e = t.pos, t.inside || t.inAttribute)
      return null;
    if (!t.matchString("<"))
      return null;
    if ("/" === t.nextChar())
      return null;
    if (n = {}, t.includeLinePositions && (n.p = t.getLinePos(e)), t.matchString("!"))
      return n.t = uc, t.matchPattern(/^doctype/i) || t.error("Expected DOCTYPE declaration"), n.a = t.matchPattern(/^(.+?)>/), n;
    if (n.t = Xh, n.e = t.matchPattern(Tf), !n.e)
      return null;
    for (Ff.test(t.nextChar()) || t.error("Illegal tag name"), s = function(e, i) {
      var r = i.n || i;
      Nf.test(r) && (t.pos -= r.length, t.error("Cannot use reserved event names (change, reset, teardown, update, construct, config, init, render, unrender, detach, insert)")), n.v[e] = i;
    }, t.allowWhitespace(); o = Lc(t) || xf(t); )
      o.name ? (i = Df[o.name]) ? n[i] = Sf(o.value, t) : (r = jf.exec(o.name)) ? (n.v || (n.v = {}), a = Sf(o.value, t), s(r[1], a)) : t.sanitizeEventAttributes && Rf.test(o.name) || (n.a || (n.a = {}), n.a[o.name] = o.value || ("" === o.value ? "" : 0)) : (n.m || (n.m = []), n.m.push(o)), t.allowWhitespace();
    if (t.allowWhitespace(), t.matchString("/") && (u = !0), !t.matchString(">"))
      return null;
    var g = n.e.toLowerCase(),
        y = t.preserveWhitespace;
    if (!u && !bl.test(n.e)) {
      t.elementStack.push(g), ("script" === g || "style" === g) && (t.inside = g), h = [], c = wa(null);
      do
        if (p = t.pos, m = t.remaining(), We(g, m))
          if (v = yf(t)) {
            d = !0;
            var b = v.e.toLowerCase();
            if (b !== g && (t.pos = p, !~t.elementStack.indexOf(b))) {
              var w = "Unexpected closing tag";
              bl.test(b) && (w += " (<" + b + "> is a void element - it cannot contain children)"), t.error(w);
            }
          } else
            (f = Ul(t, {
              open: t.standardDelimiters[0],
              close: t.standardDelimiters[1]
            })) ? (d = !0, t.pos = p) : (f = t.read(ed)) ? (c[f.n] && (t.pos = p, t.error("Duplicate partial definition")), lf(f.f, t.stripComments, y, !y, !y), c[f.n] = f.f, l = !0) : (f = t.read(td)) ? h.push(f) : d = !0;
        else
          d = !0;
 while (!d);
      h.length && (n.f = h), l && (n.p = c), t.elementStack.pop();
    }
    return t.inside = null, t.sanitizeElements && -1 !== t.sanitizeElements.indexOf(g) ? If : n;
  }
  function We(t, e) {
    var n,
        i;
    return n = /^<([a-zA-Z][a-zA-Z0-9]*)/.exec(e), i = Pf[t], n && i ? !~i.indexOf(n[1].toLowerCase()) : !0;
  }
  function ze(t) {
    var e,
        n,
        i,
        r;
    return n = t.remaining(), r = t.inside ? "</" + t.inside : "<", t.inside && !t.interpolate[t.inside] ? e = n.indexOf(r) : (i = t.tags.map(function(t) {
      return t.open;
    }), i = i.concat(t.tags.map(function(t) {
      return "\\" + t.open;
    })), t.inAttribute === !0 ? i.push('"', "'", "=", "<", ">", "`") : i.push(t.inAttribute ? t.inAttribute : r), e = wf(n, i)), e ? (-1 === e && (e = n.length), t.pos += e, t.inside ? n.substr(0, e) : _e(n.substr(0, e))) : null;
  }
  function Be(t) {
    return t.replace(Wf, "\\$&");
  }
  function qe(t) {
    var e = t.pos,
        n = t.standardDelimiters[0],
        i = t.standardDelimiters[1],
        r = void 0,
        s = void 0;
    if (!t.matchPattern(Bf) || !t.matchString(n))
      return t.pos = e, null;
    var o = t.matchPattern(qf);
    if (v("Inline partial comments are deprecated.\nUse this...\n  {{#partial " + o + "}} ... {{/partial}}\n\n...instead of this:\n  <!-- {{>" + o + "}} --> ... <!-- {{/" + o + "}} -->'"), !t.matchString(i) || !t.matchPattern($f))
      return t.pos = e, null;
    r = [];
    var a = new RegExp("^<!--\\s*" + Uf(n) + "\\s*\\/\\s*" + o + "\\s*" + Uf(i) + "\\s*-->");
    do
      t.matchPattern(a) ? s = !0 : (Lf = t.read(td), Lf || t.error("expected closing comment ('<!-- " + n + "/" + o + i + " -->')"), r.push(Lf));
 while (!s);
    return {
      t: ac,
      f: r,
      n: o
    };
  }
  function $e(t) {
    var e,
        n,
        i,
        r,
        s;
    e = t.pos;
    var o = t.standardDelimiters;
    if (!t.matchString(o[0]))
      return null;
    if (!t.matchPattern(Zf))
      return t.pos = e, null;
    n = t.matchPattern(/^[a-zA-Z_$][a-zA-Z_$0-9\-]*/), n || t.error("expected legal partial name"), t.matchString(o[1]) || t.error("Expected closing delimiter '" + o[1] + "'"), i = [];
    do
      (r = Ul(t, {
        open: t.standardDelimiters[0],
        close: t.standardDelimiters[1]
      })) ? ("partial" === !r.r && t.error("Expected " + o[0] + "/partial" + o[1]), s = !0) : (r = t.read(td), r || t.error("Expected " + o[0] + "/partial" + o[1]), i.push(r));
 while (!s);
    return {
      t: ac,
      n: n,
      f: i
    };
  }
  function Qe(t) {
    for (var e = [],
        n = wa(null),
        i = !1,
        r = t.preserveWhitespace; t.pos < t.str.length; ) {
      var s = t.pos,
          o = void 0,
          a = void 0;
      (a = t.read(ed)) ? (n[a.n] && (t.pos = s, t.error("Duplicated partial definition")), lf(a.f, t.stripComments, r, !r, !r), n[a.n] = a.f, i = !0) : (o = t.read(td)) ? e.push(o) : t.error("Unexpected template content");
    }
    var u = {
      v: oa,
      t: e
    };
    return i && (u.p = n), u;
  }
  function Ze(t, e) {
    return new Xf(t, e || {}).result;
  }
  function He(t) {
    var e = wa(od);
    return e.parse = function(e, n) {
      return Ke(e, n || t);
    }, e;
  }
  function Ke(t, e) {
    if (!Kf)
      throw new Error("Missing Ractive.parse - cannot parse template. Either preparse or use the version that includes the parser");
    return Kf(t, e || this.options);
  }
  function Ge(t, e) {
    var n;
    if (!Xo) {
      if (e && e.noThrow)
        return;
      throw new Error("Cannot retrieve template #" + t + " as Ractive is not running in a browser.");
    }
    if (Ye(t) && (t = t.substring(1)), !(n = document.getElementById(t))) {
      if (e && e.noThrow)
        return;
      throw new Error("Could not find template element with id #" + t);
    }
    if ("SCRIPT" !== n.tagName.toUpperCase()) {
      if (e && e.noThrow)
        return;
      throw new Error("Template element with id #" + t + ", must be a <script> element");
    }
    return "textContent" in n ? n.textContent : n.innerHTML;
  }
  function Ye(t) {
    return t && "#" === t[0];
  }
  function Je(t) {
    return !("string" == typeof t);
  }
  function Xe(t) {
    return t.defaults && (t = t.defaults), sd.reduce(function(e, n) {
      return e[n] = t[n], e;
    }, {});
  }
  function tn(t) {
    var e,
        n = t._config.template;
    if (n && n.fn)
      return e = en(t, n.fn), e !== n.result ? (n.result = e, e = rn(e, t)) : void 0;
  }
  function en(t, e) {
    var n = nn(ad.getParseOptions(t));
    return e.call(t, n);
  }
  function nn(t) {
    var e = wa(ad);
    return e.parse = function(e, n) {
      return ad.parse(e, n || t);
    }, e;
  }
  function rn(t, e) {
    if ("string" == typeof t)
      "#" === t[0] && (t = ad.fromId(t)), t = Kf(t, ad.getParseOptions(e));
    else {
      if (void 0 == t)
        throw new Error("The template cannot be " + t + ".");
      if ("number" != typeof t.v)
        throw new Error("The template parser was passed a non-string template, but the template doesn't have a version.  Make sure you're passing in the template you think you are.");
      if (t.v !== oa)
        throw new Error("Mismatched template version (expected " + oa + ", got " + t.v + ") Please ensure you are using the latest version of Ractive.js in your build process as well as in your app");
    }
    return t;
  }
  function sn(t, e, n) {
    if (e)
      for (var i in e)
        (n || !t.hasOwnProperty(i)) && (t[i] = e[i]);
  }
  function on(t, e, n) {
    if (!/_super/.test(n))
      return n;
    var i = function() {
      var t,
          r = an(i._parent, e),
          s = "_super" in this,
          o = this._super;
      return this._super = r, t = n.apply(this, arguments), s ? this._super = o : delete this._super, t;
    };
    return i._parent = t, i._method = n, i;
  }
  function an(t, e) {
    var n,
        i;
    return e in t ? (n = t[e], i = "function" == typeof n ? n : function() {
      return n;
    }) : i = Fa, i;
  }
  function un(t, e, n) {
    return "options." + t + " has been deprecated in favour of options." + e + "." + (n ? " You cannot specify both options, please use options." + e + "." : "");
  }
  function hn(t, e, n) {
    if (e in t) {
      if (n in t)
        throw new Error(un(e, n, !0));
      m(un(e, n)), t[n] = t[e];
    }
  }
  function cn(t) {
    hn(t, "beforeInit", "onconstruct"), hn(t, "init", "onrender"), hn(t, "complete", "oncomplete"), hn(t, "eventDefinitions", "events"), s(t.adaptors) && hn(t, "adaptors", "adapt");
  }
  function ln(t, e, n, i) {
    yd(i);
    for (var r in i)
      if (md.hasOwnProperty(r)) {
        var s = i[r];
        "el" !== r && "function" == typeof s ? m("" + r + " is a Ractive option that does not expect a function and will be ignored", "init" === t ? n : null) : n[r] = s;
      }
    vd.forEach(function(r) {
      r[t](e, n, i);
    }), Th[t](e, n, i), hd[t](e, n, i), Mh[t](e, n, i), fn(e.prototype, n, i);
  }
  function fn(t, e, n) {
    for (var i in n)
      if (!pd[i] && n.hasOwnProperty(i)) {
        var r = n[i];
        "function" == typeof r && (r = gd(t, i, r)), e[i] = r;
      }
  }
  function dn(t) {
    var e = {};
    return t.forEach(function(t) {
      return e[t] = !0;
    }), e;
  }
  function pn() {
    this.dirtyValue = this.dirtyArgs = !0, this.bound && "function" == typeof this.owner.bubble && this.owner.bubble();
  }
  function mn() {
    var t;
    return 1 === this.items.length ? this.items[0].detach() : (t = document.createDocumentFragment(), this.items.forEach(function(e) {
      var n = e.detach();
      n && t.appendChild(n);
    }), t);
  }
  function vn(t) {
    var e,
        n,
        i,
        r;
    if (this.items) {
      for (n = this.items.length, e = 0; n > e; e += 1)
        if (i = this.items[e], i.find && (r = i.find(t)))
          return r;
      return null;
    }
  }
  function gn(t, e) {
    var n,
        i,
        r;
    if (this.items)
      for (i = this.items.length, n = 0; i > n; n += 1)
        r = this.items[n], r.findAll && r.findAll(t, e);
    return e;
  }
  function yn(t, e) {
    var n,
        i,
        r;
    if (this.items)
      for (i = this.items.length, n = 0; i > n; n += 1)
        r = this.items[n], r.findAllComponents && r.findAllComponents(t, e);
    return e;
  }
  function bn(t) {
    var e,
        n,
        i,
        r;
    if (this.items) {
      for (e = this.items.length, n = 0; e > n; n += 1)
        if (i = this.items[n], i.findComponent && (r = i.findComponent(t)))
          return r;
      return null;
    }
  }
  function wn(t) {
    var e,
        n = t.index;
    return e = this.items[n + 1] ? this.items[n + 1].firstNode() : this.owner === this.root ? this.owner.component ? this.owner.component.findNextNode() : null : this.owner.findNextNode(this);
  }
  function xn() {
    return this.items && this.items[0] ? this.items[0].firstNode() : null;
  }
  function kn(t, e, n, i) {
    return i = i || 0, t.map(function(t) {
      var r,
          s,
          o;
      return t.text ? t.text : t.fragments ? t.fragments.map(function(t) {
        return kn(t.items, e, n, i);
      }).join("") : (r = n + "-" + i++, o = t.keypath && (s = t.root.viewmodel.wrapped[t.keypath.str]) ? s.value : t.getValue(), e[r] = o, "${" + r + "}");
    }).join("");
  }
  function En() {
    var t,
        e,
        n,
        i;
    return this.dirtyArgs && (e = Od(this.items, t = {}, this.root._guid), n = Af("[" + e + "]", t), i = n ? n.value : [this.toString()], this.argsList = i, this.dirtyArgs = !1), this.argsList;
  }
  function _n() {
    var t = this;
    do
      if (t.pElement)
        return t.pElement.node;
 while (t = t.parent);
    return this.root.detached || this.root.el;
  }
  function An() {
    var t,
        e,
        n,
        i;
    return this.dirtyValue && (e = Od(this.items, t = {}, this.root._guid), n = Af(e, t), i = n ? n.value : this.toString(), this.value = i, this.dirtyValue = !1), this.value;
  }
  function Sn() {
    this.registered && this.root.viewmodel.unregister(this.keypath, this), this.resolver && this.resolver.unbind();
  }
  function Cn() {
    return this.value;
  }
  function On(t, e) {
    for (var n,
        i = 0; i < e.prop.length; i++)
      if (void 0 !== (n = t[e.prop[i]]))
        return n;
  }
  function Pn(t, e) {
    var n,
        i,
        r,
        s,
        o,
        a = {},
        u = !1;
    for (e || (a.refs = n = {}); t; ) {
      if ((o = t.owner) && (i = o.indexRefs)) {
        if (e && (r = o.getIndexRef(e)))
          return a.ref = {
            fragment: t,
            ref: r
          }, a;
        if (!e)
          for (s in i)
            r = i[s], n[r.n] || (u = !0, n[r.n] = {
              fragment: t,
              ref: r
            });
      }
      !t.parent && t.owner && t.owner.component && t.owner.component.parentFragment && !t.owner.component.instance.isolated ? (a.componentBoundary = !0, t = t.owner.component.parentFragment) : t = t.parent;
    }
    return u ? a : void 0;
  }
  function Tn(t, e, n) {
    var i;
    return "@" === e.charAt(0) ? new Wd(t, e, n) : (i = qd(t.parentFragment, e)) ? new Bd(t, i, n) : new Vd(t, e, n);
  }
  function Fn(t, e) {
    var n,
        i;
    if (Hd[t])
      return Hd[t];
    for (i = []; e--; )
      i[e] = "_" + e;
    return n = new Function(i.join(","), "return(" + t + ")"), Hd[t] = n, n;
  }
  function Rn(t) {
    return t.call();
  }
  function jn(t, e) {
    return t.replace(/_([0-9]+)/g, function(t, n) {
      var i,
          r;
      return +n >= e.length ? "_" + n : (i = e[n], void 0 === i ? "undefined" : i.isSpecial ? (r = i.value, "number" == typeof r ? r : '"' + r + '"') : i.str);
    });
  }
  function Nn(t) {
    return _("${" + t.replace(/[\.\[\]]/g, "-").replace(/\*/, "#MUL#") + "}");
  }
  function Dn(t) {
    return void 0 !== t && "@" !== t[0];
  }
  function In(t, e) {
    var n,
        i,
        r;
    if (t.__ractive_nowrap)
      return t;
    if (i = "__ractive_" + e._guid, n = t[i])
      return n;
    if (/this/.test(t.toString())) {
      xa(t, i, {
        value: Kd.call(t, e),
        configurable: !0
      });
      for (r in t)
        t.hasOwnProperty(r) && (t[i][r] = t[r]);
      return e._boundFunctions.push({
        fn: t,
        prop: i
      }), t[i];
    }
    return xa(t, "__ractive_nowrap", {value: t}), t.__ractive_nowrap;
  }
  function Ln(t) {
    return t.value;
  }
  function Vn(t) {
    return void 0 != t;
  }
  function Mn(t) {
    t.forceResolution();
  }
  function Un(t, e) {
    function n(e) {
      t.resolve(e);
    }
    function i(e) {
      var n = t.keypath;
      e != n && (t.resolve(e), void 0 !== n && t.fragments && t.fragments.forEach(function(t) {
        t.rebind(n, e);
      }));
    }
    var r,
        s,
        o;
    s = e.parentFragment, o = e.template, t.root = s.root, t.parentFragment = s, t.pElement = s.pElement, t.template = e.template, t.index = e.index || 0, t.isStatic = e.template.s, t.type = e.template.t, t.registered = !1, (r = o.r) && (t.resolver = Qd(t, r, n)), e.template.x && (t.resolver = new Gd(t, s, e.template.x, i)), e.template.rx && (t.resolver = new tp(t, e.template.rx, i)), t.template.n !== Sc || t.hasOwnProperty("value") || t.setValue(void 0);
  }
  function Wn(t) {
    var e,
        n,
        i;
    return t && t.isSpecial ? (this.keypath = t, void this.setValue(t.value)) : (this.registered && (this.root.viewmodel.unregister(this.keypath, this), this.registered = !1, e = !0), this.keypath = t, void 0 != t && (n = this.root.viewmodel.get(t), this.root.viewmodel.register(t, this), this.registered = !0), this.setValue(n), void(e && (i = this.twowayBinding) && i.rebound()));
  }
  function zn(t, e) {
    this.fragments && this.fragments.forEach(function(n) {
      return n.rebind(t, e);
    }), this.resolver && this.resolver.rebind(t, e);
  }
  function Bn() {
    this.parentFragment.bubble();
  }
  function qn() {
    var t;
    return 1 === this.fragments.length ? this.fragments[0].detach() : (t = document.createDocumentFragment(), this.fragments.forEach(function(e) {
      t.appendChild(e.detach());
    }), t);
  }
  function $n(t) {
    var e,
        n,
        i;
    for (n = this.fragments.length, e = 0; n > e; e += 1)
      if (i = this.fragments[e].find(t))
        return i;
    return null;
  }
  function Qn(t, e) {
    var n,
        i;
    for (i = this.fragments.length, n = 0; i > n; n += 1)
      this.fragments[n].findAll(t, e);
  }
  function Zn(t, e) {
    var n,
        i;
    for (i = this.fragments.length, n = 0; i > n; n += 1)
      this.fragments[n].findAllComponents(t, e);
  }
  function Hn(t) {
    var e,
        n,
        i;
    for (n = this.fragments.length, e = 0; n > e; e += 1)
      if (i = this.fragments[e].findComponent(t))
        return i;
    return null;
  }
  function Kn(t) {
    return this.fragments[t.index + 1] ? this.fragments[t.index + 1].firstNode() : this.parentFragment.findNextNode(this);
  }
  function Gn() {
    var t,
        e,
        n;
    if (t = this.fragments.length)
      for (e = 0; t > e; e += 1)
        if (n = this.fragments[e].firstNode())
          return n;
    return this.parentFragment.findNextNode(this);
  }
  function Yn(t) {
    var e,
        n,
        i,
        r,
        s,
        o,
        a,
        u = this;
    if (!this.shuffling && !this.unbound && this.currentSubtype === Cc) {
      if (this.shuffling = !0, mu.scheduleTask(function() {
        return u.shuffling = !1;
      }), e = this.parentFragment, s = [], t.forEach(function(t, e) {
        var i,
            r,
            o,
            a,
            h;
        return t === e ? void(s[t] = u.fragments[e]) : (i = u.fragments[e], void 0 === n && (n = e), -1 === t ? (u.fragmentsToUnrender.push(i), void i.unbind()) : (r = t - e, o = u.keypath.join(e), a = u.keypath.join(t), i.index = t, (h = i.registeredIndexRefs) && h.forEach(Jn), i.rebind(o, a), void(s[t] = i)));
      }), r = this.root.viewmodel.get(this.keypath).length, void 0 === n) {
        if (this.length === r)
          return;
        n = this.length;
      }
      for (this.length = this.fragments.length = r, this.rendered && mu.addView(this), o = {
        template: this.template.f,
        root: this.root,
        owner: this
      }, i = n; r > i; i += 1)
        a = s[i], a || this.fragmentsToCreate.push(i), this.fragments[i] = a;
    }
  }
  function Jn(t) {
    t.rebind("", "");
  }
  function Xn() {
    var t = this;
    return this.docFrag = document.createDocumentFragment(), this.fragments.forEach(function(e) {
      return t.docFrag.appendChild(e.render());
    }), this.renderedFragments = this.fragments.slice(), this.fragmentsToRender = [], this.rendered = !0, this.docFrag;
  }
  function ti(t) {
    var e,
        n,
        i = this;
    this.updating || (this.updating = !0, this.keypath && (e = this.root.viewmodel.wrapped[this.keypath.str]) && (t = e.get()), this.fragmentsToCreate.length ? (n = {
      template: this.template.f || [],
      root: this.root,
      pElement: this.pElement,
      owner: this
    }, this.fragmentsToCreate.forEach(function(t) {
      var e;
      n.context = i.keypath.join(t), n.index = t, e = new yb(n), i.fragmentsToRender.push(i.fragments[t] = e);
    }), this.fragmentsToCreate.length = 0) : ni(this, t) && (this.bubble(), this.rendered && mu.addView(this)), this.value = t, this.updating = !1);
  }
  function ei(t, e, n) {
    if (e === Cc && t.indexRefs && t.indexRefs[0]) {
      var i = t.indexRefs[0];
      (n && "i" === i.t || !n && "k" === i.t) && (n || (t.length = 0, t.fragmentsToUnrender = t.fragments.slice(0), t.fragmentsToUnrender.forEach(function(t) {
        return t.unbind();
      }))), i.t = n ? "k" : "i";
    }
    t.currentSubtype = e;
  }
  function ni(t, e) {
    var n = {
      template: t.template.f || [],
      root: t.root,
      pElement: t.parentFragment.pElement,
      owner: t
    };
    if (t.hasContext = !0, t.subtype)
      switch (t.subtype) {
        case Ac:
          return t.hasContext = !1, ai(t, e, !1, n);
        case Sc:
          return t.hasContext = !1, ai(t, e, !0, n);
        case Oc:
          return oi(t, n);
        case Pc:
          return si(t, e, n);
        case Cc:
          if (h(e))
            return ei(t, t.subtype, !0), ri(t, e, n);
      }
    return t.ordered = !!o(e), t.ordered ? (ei(t, Cc, !1), ii(t, e, n)) : h(e) || "function" == typeof e ? t.template.i ? (ei(t, Cc, !0), ri(t, e, n)) : (ei(t, Oc, !1), oi(t, n)) : (ei(t, Ac, !1), t.hasContext = !1, ai(t, e, !1, n));
  }
  function ii(t, e, n) {
    var i,
        r,
        s;
    if (r = e.length, r === t.length)
      return !1;
    if (r < t.length)
      t.fragmentsToUnrender = t.fragments.splice(r, t.length - r), t.fragmentsToUnrender.forEach(Z);
    else if (r > t.length)
      for (i = t.length; r > i; i += 1)
        n.context = t.keypath.join(i), n.index = i, s = new yb(n), t.fragmentsToRender.push(t.fragments[i] = s);
    return t.length = r, !0;
  }
  function ri(t, e, n) {
    var i,
        r,
        s,
        o,
        a,
        u;
    for (s = t.hasKey || (t.hasKey = {}), r = t.fragments.length; r--; )
      o = t.fragments[r], o.key in e || (a = !0, o.unbind(), t.fragmentsToUnrender.push(o), t.fragments.splice(r, 1), s[o.key] = !1);
    for (r = t.fragments.length; r--; )
      o = t.fragments[r], o.index !== r && (o.index = r, (u = o.registeredIndexRefs) && u.forEach(ci));
    r = t.fragments.length;
    for (i in e)
      s[i] || (a = !0, n.context = t.keypath.join(i), n.key = i, n.index = r++, o = new yb(n), t.fragmentsToRender.push(o), t.fragments.push(o), s[i] = !0);
    return t.length = t.fragments.length, a;
  }
  function si(t, e, n) {
    return e ? oi(t, n) : ui(t);
  }
  function oi(t, e) {
    var n;
    return t.length ? void 0 : (e.context = t.keypath, e.index = 0, n = new yb(e), t.fragmentsToRender.push(t.fragments[0] = n), t.length = 1, !0);
  }
  function ai(t, e, n, i) {
    var r,
        s,
        a,
        u,
        c;
    if (s = o(e) && 0 === e.length, a = !1, !o(e) && h(e)) {
      a = !0;
      for (c in e) {
        a = !1;
        break;
      }
    }
    return r = n ? s || a || !e : e && !s && !a, r ? t.length ? t.length > 1 ? (t.fragmentsToUnrender = t.fragments.splice(1), t.fragmentsToUnrender.forEach(Z), !0) : void 0 : (i.index = 0, u = new yb(i), t.fragmentsToRender.push(t.fragments[0] = u), t.length = 1, !0) : ui(t);
  }
  function ui(t) {
    return t.length ? (t.fragmentsToUnrender = t.fragments.splice(0, t.fragments.length).filter(hi), t.fragmentsToUnrender.forEach(Z), t.length = t.fragmentsToRender.length = 0, !0) : void 0;
  }
  function hi(t) {
    return t.rendered;
  }
  function ci(t) {
    t.rebind("", "");
  }
  function li(t) {
    var e,
        n,
        i;
    for (e = "", n = 0, i = this.length, n = 0; i > n; n += 1)
      e += this.fragments[n].toString(t);
    return e;
  }
  function fi() {
    var t = this;
    this.fragments.forEach(Z), this.fragmentsToRender.forEach(function(e) {
      return I(t.fragments, e);
    }), this.fragmentsToRender = [], Dd.call(this), this.length = 0, this.unbound = !0;
  }
  function di(t) {
    this.fragments.forEach(t ? pi : mi), this.renderedFragments = [], this.rendered = !1;
  }
  function pi(t) {
    t.unrender(!0);
  }
  function mi(t) {
    t.unrender(!1);
  }
  function vi() {
    var t,
        e,
        n,
        i,
        r,
        s,
        o;
    for (n = this.renderedFragments; t = this.fragmentsToUnrender.pop(); )
      t.unrender(!0), n.splice(n.indexOf(t), 1);
    for (; t = this.fragmentsToRender.shift(); )
      t.render();
    for (this.rendered && (r = this.parentFragment.getNode()), o = this.fragments.length, s = 0; o > s; s += 1)
      t = this.fragments[s], e = n.indexOf(t, s), e !== s ? (this.docFrag.appendChild(t.detach()), -1 !== e && n.splice(e, 1), n.splice(s, 0, t)) : this.docFrag.childNodes.length && (i = t.firstNode(), r.insertBefore(this.docFrag, i));
    this.rendered && this.docFrag.childNodes.length && (i = this.parentFragment.findNextNode(this), r.insertBefore(this.docFrag, i)), this.renderedFragments = this.fragments.slice();
  }
  function gi() {
    var t,
        e;
    if (this.docFrag) {
      for (t = this.nodes.length, e = 0; t > e; e += 1)
        this.docFrag.appendChild(this.nodes[e]);
      return this.docFrag;
    }
  }
  function yi(t) {
    var e,
        n,
        i,
        r;
    for (n = this.nodes.length, e = 0; n > e; e += 1)
      if (i = this.nodes[e], 1 === i.nodeType) {
        if (fa(i, t))
          return i;
        if (r = i.querySelector(t))
          return r;
      }
    return null;
  }
  function bi(t, e) {
    var n,
        i,
        r,
        s,
        o,
        a;
    for (i = this.nodes.length, n = 0; i > n; n += 1)
      if (r = this.nodes[n], 1 === r.nodeType && (fa(r, t) && e.push(r), s = r.querySelectorAll(t)))
        for (o = s.length, a = 0; o > a; a += 1)
          e.push(s[a]);
  }
  function wi() {
    return this.rendered && this.nodes[0] ? this.nodes[0] : this.parentFragment.findNextNode(this);
  }
  function xi(t) {
    return Fp[t] || (Fp[t] = la(t));
  }
  function ki(t) {
    var e,
        n,
        i;
    t && "select" === t.name && t.binding && (e = L(t.node.options).filter(Ei), t.getAttribute("multiple") ? i = e.map(function(t) {
      return t.value;
    }) : (n = e[0]) && (i = n.value), void 0 !== i && t.binding.setValue(i), t.bubble());
  }
  function Ei(t) {
    return t.selected;
  }
  function _i() {
    if (this.rendered)
      throw new Error("Attempted to render an item that was already rendered");
    return this.docFrag = document.createDocumentFragment(), this.nodes = Rp(this.value, this.parentFragment.getNode(), this.docFrag), jp(this.pElement), this.rendered = !0, this.docFrag;
  }
  function Ai(t) {
    var e;
    (e = this.root.viewmodel.wrapped[this.keypath.str]) && (t = e.get()), t !== this.value && (this.value = t, this.parentFragment.bubble(), this.rendered && mu.addView(this));
  }
  function Si() {
    return void 0 != this.value ? _e("" + this.value) : "";
  }
  function Ci(t) {
    this.rendered && t && (this.nodes.forEach(e), this.rendered = !1);
  }
  function Oi() {
    var t,
        e;
    if (this.rendered) {
      for (; this.nodes && this.nodes.length; )
        t = this.nodes.pop(), t.parentNode.removeChild(t);
      e = this.parentFragment.getNode(), this.nodes = Rp(this.value, e, this.docFrag), e.insertBefore(this.docFrag, this.parentFragment.findNextNode(this)), jp(this.pElement);
    }
  }
  function Pi() {
    var t,
        e = this.node;
    return e ? ((t = e.parentNode) && t.removeChild(e), e) : void 0;
  }
  function Ti() {
    return null;
  }
  function Fi() {
    return this.node;
  }
  function Ri(t) {
    return this.attributes && this.attributes[t] ? this.attributes[t].value : void 0;
  }
  function ji() {
    var t = this.useProperty || !this.rendered ? this.fragment.getValue() : this.fragment.toString();
    a(t, this.value) || ("id" === this.name && this.value && delete this.root.nodes[this.value], this.value = t, "value" === this.name && this.node && (this.node._ractive.value = t), this.rendered && mu.addView(this));
  }
  function Ni(t) {
    var e = t.fragment.items;
    if (1 === e.length)
      return e[0].type === Hh ? e[0] : void 0;
  }
  function Di(t) {
    return this.type = ic, this.element = t.element, this.root = t.root, sm(this, t.name), this.isBoolean = yl.test(this.name), t.value && "string" != typeof t.value ? (this.parentFragment = this.element.parentFragment, this.fragment = new yb({
      template: t.value,
      root: this.root,
      owner: this
    }), this.value = this.fragment.getValue(), this.interpolator = om(this), this.isBindable = !!this.interpolator && !this.interpolator.isStatic, void(this.ready = !0)) : void(this.value = this.isBoolean ? !0 : t.value || "");
  }
  function Ii(t, e) {
    this.fragment && this.fragment.rebind(t, e);
  }
  function Li(t) {
    var e;
    this.node = t, t.namespaceURI && t.namespaceURI !== ia.html || (e = cm[this.name] || this.name, void 0 !== t[e] && (this.propertyName = e), (this.isBoolean || this.isTwoway) && (this.useProperty = !0), "value" === e && (t._ractive.value = this.value)), this.rendered = !0, this.update();
  }
  function Vi() {
    var t = this,
        e = t.name,
        n = t.namespacePrefix,
        i = t.value,
        r = t.interpolator,
        s = t.fragment;
    if (("value" !== e || "select" !== this.element.name && "textarea" !== this.element.name) && ("value" !== e || void 0 === this.element.getAttribute("contenteditable"))) {
      if ("name" === e && "input" === this.element.name && r)
        return "name={{" + (r.keypath.str || r.ref) + "}}";
      if (this.isBoolean)
        return i ? e : "";
      if (s) {
        if (1 === s.items.length && null == s.items[0].value)
          return "";
        i = s.toString();
      }
      return n && (e = n + ":" + e), i ? e + '="' + Mi(i) + '"' : e;
    }
  }
  function Mi(t) {
    return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function Ui() {
    this.fragment && this.fragment.unbind(), "id" === this.name && delete this.root.nodes[this.value];
  }
  function Wi() {
    var t,
        e,
        n,
        i,
        r = this.value;
    if (!this.locked)
      for (this.node._ractive.value = r, t = this.node.options, i = t.length; i--; )
        if (e = t[i], n = e._ractive ? e._ractive.value : e.value, n == r) {
          e.selected = !0;
          break;
        }
  }
  function zi() {
    var t,
        e,
        n,
        i,
        r = this.value;
    for (s(r) || (r = [r]), t = this.node.options, e = t.length; e--; )
      n = t[e], i = n._ractive ? n._ractive.value : n.value, n.selected = R(r, i);
  }
  function Bi() {
    var t = this,
        e = t.node,
        n = t.value;
    e.checked = n == e._ractive.value;
  }
  function qi() {
    var t,
        e,
        n,
        i,
        r = this.node;
    if (t = r.checked, r.value = this.element.getAttribute("value"), r.checked = this.element.getAttribute("value") === this.element.getAttribute("name"), t && !r.checked && this.element.binding && (n = this.element.binding.siblings, i = n.length)) {
      for (; i--; ) {
        if (e = n[i], !e.element.node)
          return;
        if (e.element.node.checked)
          return mu.addRactive(e.root), e.handleChange();
      }
      this.root.viewmodel.set(e.keypath, void 0);
    }
  }
  function $i() {
    var t,
        e,
        n = this,
        i = n.element,
        r = n.node,
        o = n.value,
        a = i.binding;
    if (t = i.getAttribute("value"), s(o)) {
      for (e = o.length; e--; )
        if (t == o[e])
          return void(a.isChecked = r.checked = !0);
      a.isChecked = r.checked = !1;
    } else
      a.isChecked = r.checked = o == t;
  }
  function Qi() {
    this.node.className = n(this.value);
  }
  function Zi() {
    var t = this,
        e = t.node,
        n = t.value;
    this.root.nodes[n] = e, e.id = n;
  }
  function Hi() {
    var t,
        e;
    t = this.node, e = this.value, void 0 === e && (e = ""), t.style.setAttribute("cssText", e);
  }
  function Ki() {
    var t = this.value;
    void 0 === t && (t = ""), this.locked || (this.node.innerHTML = t);
  }
  function Gi() {
    var t = this,
        e = t.node,
        n = t.value;
    e._ractive.value = n, this.locked || (e.value = void 0 == n ? "" : n);
  }
  function Yi() {
    this.locked || (this.node[this.propertyName] = this.value);
  }
  function Ji() {
    var t = this,
        e = t.node,
        n = t.namespace,
        i = t.name,
        r = t.value,
        s = t.fragment;
    n ? e.setAttributeNS(n, i, (s || r).toString()) : this.isBoolean ? r ? e.setAttribute(i, "") : e.removeAttribute(i) : null == r ? e.removeAttribute(i) : e.setAttribute(i, (s || r).toString());
  }
  function Xi() {
    var t,
        e,
        n = this,
        i = n.name,
        r = n.element,
        s = n.node;
    "id" === i ? e = bm : "value" === i ? "select" === r.name && "value" === i ? e = r.getAttribute("multiple") ? pm : dm : "textarea" === r.name ? e = km : null != r.getAttribute("contenteditable") ? e = xm : "input" === r.name && (t = r.getAttribute("type"), e = "file" === t ? Fa : "radio" === t && r.binding && "name" === r.binding.name ? vm : km) : this.isTwoway && "name" === i ? "radio" === s.type ? e = mm : "checkbox" === s.type && (e = gm) : "style" === i && s.style.setAttribute ? e = wm : "class" !== i || s.namespaceURI && s.namespaceURI !== ia.html ? this.useProperty && (e = Em) : e = ym, e || (e = _m), this.update = e, this.update();
  }
  function tr(t, e) {
    var n = e ? "svg" : "div";
    return Cm.innerHTML = "<" + n + " " + t + "></" + n + ">", L(Cm.childNodes[0].attributes);
  }
  function er(t, e) {
    for (var n = t.length; n--; )
      if (t[n].name === e.name)
        return !1;
    return !0;
  }
  function nr(t) {
    for (; t = t.parent; )
      if ("form" === t.name)
        return t;
  }
  function ir() {
    this._ractive.binding.handleChange();
  }
  function rr() {
    var t;
    Im.call(this), t = this._ractive.root.viewmodel.get(this._ractive.binding.keypath), this.value = void 0 == t ? "" : t;
  }
  function sr() {
    var t = this._ractive.binding,
        e = this;
    t._timeout && clearTimeout(t._timeout), t._timeout = setTimeout(function() {
      t.rendered && Im.call(e), t._timeout = void 0;
    }, t.element.lazy);
  }
  function or(t, e, n) {
    var i = t + e + n;
    return Wm[i] || (Wm[i] = []);
  }
  function ar(t) {
    return t.isChecked;
  }
  function ur(t) {
    return t.element.getAttribute("value");
  }
  function hr(t) {
    var e,
        n,
        i,
        r,
        s,
        o = t.attributes;
    return t.binding && (t.binding.teardown(), t.binding = null), (t.getAttribute("contenteditable") || o.contenteditable && cr(o.contenteditable)) && cr(o.value) ? n = Mm : "input" === t.name ? (e = t.getAttribute("type"), "radio" === e || "checkbox" === e ? (i = cr(o.name), r = cr(o.checked), i && r && m("A radio input can have two-way binding on its name attribute, or its checked attribute - not both", {ractive: t.root}), i ? n = "radio" === e ? $m : Zm : r && (n = "radio" === e ? Bm : Km)) : "file" === e && cr(o.value) ? n = ev : cr(o.value) && (n = "number" === e || "range" === e ? nv : Lm)) : "select" === t.name && cr(o.value) ? n = t.getAttribute("multiple") ? Xm : Ym : "textarea" === t.name && cr(o.value) && (n = Lm), n && (s = new n(t)) && s.keypath ? s : void 0;
  }
  function cr(t) {
    return t && t.isBindable;
  }
  function lr() {
    var t = this.getAction();
    t && !this.hasListener ? this.listen() : !t && this.hasListener && this.unrender();
  }
  function fr(t) {
    Wu(this.root, this.getAction(), {event: t});
  }
  function dr() {
    return this.action.toString().trim();
  }
  function pr(t, e, n) {
    var i,
        r,
        s,
        o = this;
    this.element = t, this.root = t.root, this.parentFragment = t.parentFragment, this.name = e, -1 !== e.indexOf("*") && (l('Only component proxy-events may contain "*" wildcards, <%s on-%s="..."/> is not valid', t.name, e), this.invalid = !0), n.m ? (r = n.a.r, this.method = n.m, this.keypaths = [], this.fn = Zd(n.a.s, r.length), this.parentFragment = t.parentFragment, s = this.root, this.refResolvers = [], r.forEach(function(t, e) {
      var n = void 0;
      (n = uv.exec(t)) ? o.keypaths[e] = {
        eventObject: !0,
        refinements: n[1] ? n[1].split(".") : []
      } : o.refResolvers.push(Qd(o, t, function(t) {
        return o.resolve(e, t);
      }));
    }), this.fire = mr) : (i = n.n || n, "string" != typeof i && (i = new yb({
      template: i,
      root: this.root,
      owner: this
    })), this.action = i, n.d ? (this.dynamicParams = new yb({
      template: n.d,
      root: this.root,
      owner: this.element
    }), this.fire = gr) : n.a && (this.params = n.a, this.fire = vr));
  }
  function mr(t) {
    var e,
        n,
        i;
    if (e = this.root, "function" != typeof e[this.method])
      throw new Error('Attempted to call a non-existent method ("' + this.method + '")');
    n = this.keypaths.map(function(n) {
      var i,
          r,
          s;
      if (void 0 === n)
        return void 0;
      if (n.eventObject) {
        if (i = t, r = n.refinements.length)
          for (s = 0; r > s; s += 1)
            i = i[n.refinements[s]];
      } else
        i = e.viewmodel.get(n);
      return i;
    }), Uu.enqueue(e, t), i = this.fn.apply(null, n), e[this.method].apply(e, i), Uu.dequeue(e);
  }
  function vr(t) {
    Wu(this.root, this.getAction(), {
      event: t,
      args: this.params
    });
  }
  function gr(t) {
    var e = this.dynamicParams.getArgsList();
    "string" == typeof e && (e = e.substr(1, e.length - 2)), Wu(this.root, this.getAction(), {
      event: t,
      args: e
    });
  }
  function yr(t) {
    var e,
        n,
        i,
        r = {};
    e = this._ractive, n = e.events[t.type], (i = qd(n.element.parentFragment)) && (r = qd.resolve(i)), n.fire({
      node: this,
      original: t,
      index: r,
      keypath: e.keypath.str,
      context: e.root.viewmodel.get(e.keypath)
    });
  }
  function br() {
    var t,
        e = this.name;
    if (!this.invalid) {
      if (t = g("events", this.root, e))
        this.custom = t(this.node, wr(e));
      else {
        if (!("on" + e in this.node || window && "on" + e in window || ta))
          return void(fv[e] || v(Da(e, "event"), {node: this.node}));
        this.node.addEventListener(e, hv, !1);
      }
      this.hasListener = !0;
    }
  }
  function wr(t) {
    return lv[t] || (lv[t] = function(e) {
      var n = e.node._ractive;
      e.index = n.index, e.keypath = n.keypath.str, e.context = n.root.viewmodel.get(n.keypath), n.events[t].fire(e);
    }), lv[t];
  }
  function xr(t, e) {
    function n(n) {
      n && n.rebind(t, e);
    }
    var i;
    return this.method ? (i = this.element.parentFragment, void this.refResolvers.forEach(n)) : ("string" != typeof this.action && n(this.action), void(this.dynamicParams && n(this.dynamicParams)));
  }
  function kr() {
    this.node = this.element.node, this.node._ractive.events[this.name] = this, (this.method || this.getAction()) && this.listen();
  }
  function Er(t, e) {
    this.keypaths[t] = e;
  }
  function _r() {
    return this.method ? void this.refResolvers.forEach(Z) : ("string" != typeof this.action && this.action.unbind(), void(this.dynamicParams && this.dynamicParams.unbind()));
  }
  function Ar() {
    this.custom ? this.custom.teardown() : this.node.removeEventListener(this.name, hv, !1), this.hasListener = !1;
  }
  function Sr() {
    var t = this;
    this.dirty || (this.dirty = !0, mu.scheduleTask(function() {
      Cr(t), t.dirty = !1;
    })), this.parentFragment.bubble();
  }
  function Cr(t) {
    var e,
        n,
        i,
        r,
        s;
    e = t.node, e && (r = L(e.options), n = t.getAttribute("value"), i = t.getAttribute("multiple"), void 0 !== n ? (r.forEach(function(t) {
      var e,
          r;
      e = t._ractive ? t._ractive.value : t.value, r = i ? Or(n, e) : n == e, r && (s = !0), t.selected = r;
    }), s || (r[0] && (r[0].selected = !0), t.binding && t.binding.forceUpdate())) : t.binding && t.binding.forceUpdate());
  }
  function Or(t, e) {
    for (var n = t.length; n--; )
      if (t[n] == e)
        return !0;
  }
  function Pr(t, e) {
    t.select = Fr(t.parent), t.select && (t.select.options.push(t), e.a || (e.a = {}), void 0 !== e.a.value || e.a.hasOwnProperty("disabled") || (e.a.value = e.f), "selected" in e.a && void 0 !== t.select.getAttribute("value") && delete e.a.selected);
  }
  function Tr(t) {
    t.select && I(t.select.options, t);
  }
  function Fr(t) {
    if (t)
      do
        if ("select" === t.name)
          return t;
 while (t = t.parent);
  }
  function Rr(t) {
    var e,
        n,
        i,
        r,
        s,
        o,
        a;
    this.type = Xh, e = this.parentFragment = t.parentFragment, n = this.template = t.template, this.parent = t.pElement || e.pElement, this.root = i = e.root, this.index = t.index, this.key = t.key, this.name = rm(n.e), "option" === this.name && Pr(this, n), "select" === this.name && (this.options = [], this.bubble = Sr), "form" === this.name && (this.formBindings = []), a = nm(this, n), this.attributes = Pm(this, n.a), this.conditionalAttributes = Rm(this, n.m), n.f && (this.fragment = new yb({
      template: n.f,
      root: i,
      owner: this,
      pElement: this,
      cssIds: null
    })), o = i.twoway, a.twoway === !1 ? o = !1 : a.twoway === !0 && (o = !0), this.twoway = o, this.lazy = a.lazy, o && (r = iv(this, n.a)) && (this.binding = r, s = this.root._twowayBindings[r.keypath.str] || (this.root._twowayBindings[r.keypath.str] = []), s.push(r)), n.v && (this.eventHandlers = wv(this, n.v)), n.o && (this.decorator = new Av(this, n.o)), this.intro = n.t0 || n.t1, this.outro = n.t0 || n.t2;
  }
  function jr(t, e) {
    function n(n) {
      n.rebind(t, e);
    }
    var i,
        r,
        s,
        o;
    if (this.attributes && this.attributes.forEach(n), this.conditionalAttributes && this.conditionalAttributes.forEach(n), this.eventHandlers && this.eventHandlers.forEach(n), this.decorator && n(this.decorator), this.fragment && n(this.fragment), s = this.liveQueries)
      for (o = this.root, i = s.length; i--; )
        s[i]._makeDirty();
    this.node && (r = this.node._ractive) && k(r, "keypath", t, e);
  }
  function Nr(t) {
    var e;
    (t.attributes.width || t.attributes.height) && t.node.addEventListener("load", e = function() {
      var n = t.getAttribute("width"),
          i = t.getAttribute("height");
      void 0 !== n && t.node.setAttribute("width", n), void 0 !== i && t.node.setAttribute("height", i), t.node.removeEventListener("load", e, !1);
    }, !1);
  }
  function Dr(t) {
    t.node.addEventListener("reset", Lr, !1);
  }
  function Ir(t) {
    t.node.removeEventListener("reset", Lr, !1);
  }
  function Lr() {
    var t = this._ractive.proxy;
    mu.start(), t.formBindings.forEach(Vr), mu.end();
  }
  function Vr(t) {
    t.root.viewmodel.set(t.keypath, t.resetValue);
  }
  function Mr(t, e, n) {
    var i,
        r,
        s;
    this.element = t, this.root = i = t.root, this.isIntro = n, r = e.n || e, ("string" == typeof r || (s = new yb({
      template: r,
      root: i,
      owner: t
    }), r = s.toString(), s.unbind(), "" !== r)) && (this.name = r, e.a ? this.params = e.a : e.d && (s = new yb({
      template: e.d,
      root: i,
      owner: t
    }), this.params = s.getArgsList(), s.unbind()), this._fn = g("transitions", i, r), this._fn || v(Da(r, "transition"), {ractive: this.root}));
  }
  function Ur(t) {
    return t;
  }
  function Wr() {
    eg.hidden = document[Yv];
  }
  function zr() {
    eg.hidden = !0;
  }
  function Br() {
    eg.hidden = !1;
  }
  function qr() {
    var t,
        e,
        n,
        i = this;
    return t = this.node = this.element.node, e = t.getAttribute("style"), this.complete = function(r) {
      n || (!r && i.isIntro && $r(t, e), t._ractive.transition = null, i._manager.remove(i), n = !0);
    }, this._fn ? void this._fn.apply(this.root, [this].concat(this.params)) : void this.complete();
  }
  function $r(t, e) {
    e ? t.setAttribute("style", e) : (t.getAttribute("style"), t.removeAttribute("style"));
  }
  function Qr() {
    var t,
        e,
        n,
        i = this,
        r = this.root;
    return t = Zr(this), e = this.node = la(this.name, t), this.parentFragment.cssIds && this.node.setAttribute("data-ractive-css", this.parentFragment.cssIds.map(function(t) {
      return "{" + t + "}";
    }).join(" ")), xa(this.node, "_ractive", {value: {
        proxy: this,
        keypath: au(this.parentFragment),
        events: wa(null),
        root: r
      }}), this.attributes.forEach(function(t) {
      return t.render(e);
    }), this.conditionalAttributes.forEach(function(t) {
      return t.render(e);
    }), this.fragment && ("script" === this.name ? (this.bubble = fg, this.node.text = this.fragment.toString(!1), this.fragment.unrender = Fa) : "style" === this.name ? (this.bubble = lg, this.bubble(), this.fragment.unrender = Fa) : this.binding && this.getAttribute("contenteditable") ? this.fragment.unrender = Fa : this.node.appendChild(this.fragment.render())), this.binding && (this.binding.render(), this.node._ractive.binding = this.binding), this.eventHandlers && this.eventHandlers.forEach(function(t) {
      return t.render();
    }), "option" === this.name && Hr(this), "img" === this.name ? Nr(this) : "form" === this.name ? Dr(this) : "input" === this.name || "textarea" === this.name ? this.node.defaultValue = this.node.value : "option" === this.name && (this.node.defaultSelected = this.node.selected), this.decorator && this.decorator.fn && mu.scheduleTask(function() {
      i.decorator.torndown || i.decorator.init();
    }, !0), r.transitionsEnabled && this.intro && (n = new dg(this, this.intro, !0), mu.registerTransition(n), mu.scheduleTask(function() {
      return n.start();
    }, !0), this.transition = n), this.node.autofocus && mu.scheduleTask(function() {
      return i.node.focus();
    }, !0), Kr(this), this.node;
  }
  function Zr(t) {
    var e,
        n,
        i;
    return e = (n = t.getAttribute("xmlns")) ? n : "svg" === t.name ? ia.svg : (i = t.parent) ? "foreignObject" === i.name ? ia.html : i.node.namespaceURI : t.root.el.namespaceURI;
  }
  function Hr(t) {
    var e,
        n,
        i;
    if (t.select && (n = t.select.getAttribute("value"), void 0 !== n))
      if (e = t.getAttribute("value"), t.select.node.multiple && s(n)) {
        for (i = n.length; i--; )
          if (e == n[i]) {
            t.node.selected = !0;
            break;
          }
      } else
        t.node.selected = e == n;
  }
  function Kr(t) {
    var e,
        n,
        i,
        r,
        s;
    e = t.root;
    do
      for (n = e._liveQueries, i = n.length; i--; )
        r = n[i], s = n["_" + r], s._test(t) && (t.liveQueries || (t.liveQueries = [])).push(s);
 while (e = e.parent);
  }
  function Gr(t) {
    var e,
        n,
        i;
    if (e = t.getAttribute("value"), void 0 === e || !t.select)
      return !1;
    if (n = t.select.getAttribute("value"), n == e)
      return !0;
    if (t.select.getAttribute("multiple") && s(n))
      for (i = n.length; i--; )
        if (n[i] == e)
          return !0;
  }
  function Yr(t) {
    var e,
        n,
        i,
        r;
    return e = t.attributes, n = e.type, i = e.value, r = e.name, n && "radio" === n.value && i && r.interpolator && i.value === r.interpolator.value ? !0 : void 0;
  }
  function Jr(t) {
    var e = t.toString();
    return e ? " " + e : "";
  }
  function Xr() {
    this.fragment && this.fragment.unbind(), this.binding && this.binding.unbind(), this.eventHandlers && this.eventHandlers.forEach(Z), "option" === this.name && Tr(this), this.attributes.forEach(Z), this.conditionalAttributes.forEach(Z);
  }
  function ts(t) {
    var e,
        n,
        i;
    (i = this.transition) && i.complete(), "option" === this.name ? this.detach() : t && mu.detachWhenReady(this), this.fragment && this.fragment.unrender(!1), (e = this.binding) && (this.binding.unrender(), this.node._ractive.binding = null, n = this.root._twowayBindings[e.keypath.str], n.splice(n.indexOf(e), 1)), this.eventHandlers && this.eventHandlers.forEach(H), this.decorator && mu.registerDecorator(this.decorator), this.root.transitionsEnabled && this.outro && (i = new dg(this, this.outro, !1), mu.registerTransition(i), mu.scheduleTask(function() {
      return i.start();
    })), this.liveQueries && es(this), "form" === this.name && Ir(this);
  }
  function es(t) {
    var e,
        n,
        i;
    for (i = t.liveQueries.length; i--; )
      e = t.liveQueries[i], n = e.selector, e._remove(t.node);
  }
  function ns(t, e) {
    var n = xg.exec(e)[0];
    return null === t || n.length < t.length ? n : t;
  }
  function is(t, e, n) {
    var i;
    if (i = rs(t, e, n || {}))
      return i;
    if (i = ad.fromId(e, {noThrow: !0})) {
      i = kg(i);
      var r = ad.parse(i, ad.getParseOptions(t));
      return t.partials[e] = r.t;
    }
  }
  function rs(t, e, n) {
    var i = void 0,
        r = as(e, n.owner);
    if (r)
      return r;
    var s = y("partials", t, e);
    if (s) {
      if (r = s.partials[e], "function" == typeof r && (i = r.bind(s), i.isOwner = s.partials.hasOwnProperty(e), r = i.call(t, ad)), !r && "" !== r)
        return void m(Na, e, "partial", "partial", {ractive: t});
      if (!ad.isParsed(r)) {
        var o = ad.parse(r, ad.getParseOptions(s));
        o.p && m("Partials ({{>%s}}) cannot contain nested inline partials", e, {ractive: t});
        var a = i ? s : ss(s, e);
        a.partials[e] = r = o.t;
      }
      return i && (r._fn = i), r.v ? r.t : r;
    }
  }
  function ss(t, e) {
    return t.partials.hasOwnProperty(e) ? t : os(t.constructor, e);
  }
  function os(t, e) {
    return t ? t.partials.hasOwnProperty(e) ? t : os(t._Parent, e) : void 0;
  }
  function as(t, e) {
    if (e) {
      if (e.template && e.template.p && e.template.p[t])
        return e.template.p[t];
      if (e.parentFragment && e.parentFragment.owner)
        return as(t, e.parentFragment.owner);
    }
  }
  function us(t, e) {
    var n,
        i = y("components", t, e);
    if (i && (n = i.components[e], !n._Parent)) {
      var r = n.bind(i);
      if (r.isOwner = i.components.hasOwnProperty(e), n = r(), !n)
        return void m(Na, e, "component", "component", {ractive: t});
      "string" == typeof n && (n = us(t, n)), n._fn = r, i.components[e] = n;
    }
    return n;
  }
  function hs() {
    var t = this.instance.fragment.detach();
    return jg.fire(this.instance), t;
  }
  function cs(t) {
    return this.instance.fragment.find(t);
  }
  function ls(t, e) {
    return this.instance.fragment.findAll(t, e);
  }
  function fs(t, e) {
    e._test(this, !0), this.instance.fragment && this.instance.fragment.findAllComponents(t, e);
  }
  function ds(t) {
    return t && t !== this.name ? this.instance.fragment ? this.instance.fragment.findComponent(t) : null : this.instance;
  }
  function ps() {
    return this.parentFragment.findNextNode(this);
  }
  function ms() {
    return this.rendered ? this.instance.fragment.firstNode() : null;
  }
  function vs(t, e, n) {
    function i(t) {
      var n,
          i;
      t.value = e, t.updating || (i = t.ractive, n = t.keypath, t.updating = !0, mu.start(i), i.viewmodel.mark(n), mu.end(), t.updating = !1);
    }
    var r,
        s,
        o,
        a,
        u,
        h;
    if (r = t.obj, s = t.prop, n && !n.configurable) {
      if ("length" === s)
        return;
      throw new Error('Cannot use magic mode with property "' + s + '" - object is not configurable');
    }
    n && (o = n.get, a = n.set), u = o || function() {
      return e;
    }, h = function(t) {
      a && a(t), e = o ? o() : t, h._ractiveWrappers.forEach(i);
    }, h._ractiveWrappers = [t], Object.defineProperty(r, s, {
      get: u,
      set: h,
      enumerable: !0,
      configurable: !0
    });
  }
  function gs(t, e) {
    var n,
        i,
        r,
        s;
    if (this.adaptors)
      for (n = this.adaptors.length, i = 0; n > i; i += 1)
        if (r = this.adaptors[i], r.filter(e, t, this.ractive))
          return s = this.wrapped[t] = r.wrap(this.ractive, e, t, bs(t)), void(s.value = e);
  }
  function ys(t, e) {
    var n,
        i = {};
    if (!e)
      return t;
    e += ".";
    for (n in t)
      t.hasOwnProperty(n) && (i[e + n] = t[n]);
    return i;
  }
  function bs(t) {
    var e;
    return iy[t] || (e = t ? t + "." : "", iy[t] = function(n, i) {
      var r;
      return "string" == typeof n ? (r = {}, r[e + n] = i, r) : "object" == typeof n ? e ? ys(n, t) : n : void 0;
    }), iy[t];
  }
  function ws(t) {
    var e,
        n,
        i = [Za];
    for (e = t.length; e--; )
      for (n = t[e].parent; n && !n.isRoot; )
        -1 === t.indexOf(n) && F(i, n), n = n.parent;
    return i;
  }
  function xs(t, e, n) {
    var i;
    Es(t, e), n || (i = e.wildcardMatches(), i.forEach(function(n) {
      ks(t, n, e);
    }));
  }
  function ks(t, e, n) {
    var i,
        r,
        s;
    e = e.str || e, i = t.depsMap.patternObservers, r = i && i[e], r && r.forEach(function(e) {
      s = n.join(e.lastKey), Es(t, s), ks(t, e, s);
    });
  }
  function Es(t, e) {
    t.patternObservers.forEach(function(t) {
      t.regex.test(e.str) && t.update(e);
    });
  }
  function _s() {
    function t(t) {
      var i = t.key;
      t.viewmodel === o ? (o.clearCache(i.str), t.invalidate(), n.push(i), e(i)) : t.viewmodel.mark(i);
    }
    function e(n) {
      var i,
          r;
      o.noCascade.hasOwnProperty(n.str) || ((r = o.deps.computed[n.str]) && r.forEach(t), (i = o.depsMap.computed[n.str]) && i.forEach(e));
    }
    var n,
        i,
        r,
        s = this,
        o = this,
        a = {};
    return n = this.changes, n.length ? (n.slice().forEach(e), i = ry(n), i.forEach(function(e) {
      var i;
      -1 === n.indexOf(e) && (i = o.deps.computed[e.str]) && i.forEach(t);
    }), this.changes = [], this.patternObservers.length && (i.forEach(function(t) {
      return sy(s, t, !0);
    }), n.forEach(function(t) {
      return sy(s, t);
    })), this.deps.observers && (i.forEach(function(t) {
      return As(s, null, t, "observers");
    }), Cs(this, n, "observers")), this.deps["default"] && (r = [], i.forEach(function(t) {
      return As(s, r, t, "default");
    }), r.length && Ss(this, r, n), Cs(this, n, "default")), n.forEach(function(t) {
      a[t.str] = s.get(t);
    }), this.implicitChanges = {}, this.noCascade = {}, a) : void 0;
  }
  function As(t, e, n, i) {
    var r,
        s;
    (r = Os(t, n, i)) && (s = t.get(n), r.forEach(function(t) {
      e && t.refineValue ? e.push(t) : t.setValue(s);
    }));
  }
  function Ss(t, e, n) {
    e.forEach(function(e) {
      for (var i = !1,
          r = 0,
          s = n.length,
          o = []; s > r; ) {
        var a = n[r];
        if (a === e.keypath) {
          i = !0;
          break;
        }
        a.slice(0, e.keypath.length) === e.keypath && o.push(a), r++;
      }
      i && e.setValue(t.get(e.keypath)), o.length && e.refineValue(o);
    });
  }
  function Cs(t, e, n) {
    function i(t) {
      t.forEach(r), t.forEach(s);
    }
    function r(e) {
      var i = Os(t, e, n);
      i && a.push({
        keypath: e,
        deps: i
      });
    }
    function s(e) {
      var r;
      (r = t.depsMap[n][e.str]) && i(r);
    }
    function o(e) {
      var n = t.get(e.keypath);
      e.deps.forEach(function(t) {
        return t.setValue(n);
      });
    }
    var a = [];
    i(e), a.forEach(o);
  }
  function Os(t, e, n) {
    var i = t.deps[n];
    return i ? i[e.str] : null;
  }
  function Ps() {
    this.captureGroups.push([]);
  }
  function Ts(t, e) {
    var n,
        i;
    if (e || (i = this.wrapped[t]) && i.teardown() !== !1 && (this.wrapped[t] = null), this.cache[t] = void 0, n = this.cacheMap[t])
      for (; n.length; )
        this.clearCache(n.pop());
  }
  function Fs(t, e) {
    var n = e.firstKey;
    return !(n in t.data || n in t.computations || n in t.mappings);
  }
  function Rs(t, e) {
    var n = new fy(t, e);
    return this.ready && n.init(this), this.computations[t.str] = n;
  }
  function js(t, e) {
    var n,
        i,
        r,
        s,
        o,
        a = this.cache,
        u = t.str;
    if (e = e || vy, e.capture && (s = D(this.captureGroups)) && (~s.indexOf(t) || s.push(t)), Oa.call(this.mappings, t.firstKey))
      return this.mappings[t.firstKey].get(t, e);
    if (t.isSpecial)
      return t.value;
    if (void 0 === a[u] ? ((i = this.computations[u]) && !i.bypass ? (n = i.get(), this.adapt(u, n)) : (r = this.wrapped[u]) ? n = r.value : t.isRoot ? (this.adapt("", this.data), n = this.data) : n = Ns(this, t), a[u] = n) : n = a[u], !e.noUnwrap && (r = this.wrapped[u]) && (n = r.get()), t.isRoot && e.fullRootGet)
      for (o in this.mappings)
        n[o] = this.mappings[o].getValue();
    return n === py ? void 0 : n;
  }
  function Ns(t, e) {
    var n,
        i,
        r,
        s;
    return n = t.get(e.parent), (s = t.wrapped[e.parent.str]) && (n = s.get()), null !== n && void 0 !== n ? ((i = t.cacheMap[e.parent.str]) ? -1 === i.indexOf(e.str) && i.push(e.str) : t.cacheMap[e.parent.str] = [e.str], "object" != typeof n || e.lastKey in n ? (r = n[e.lastKey], t.adapt(e.str, r, !1), t.cache[e.str] = r, r) : t.cache[e.str] = py) : void 0;
  }
  function Ds() {
    var t;
    for (t in this.computations)
      this.computations[t].init(this);
  }
  function Is(t, e) {
    var n = this.mappings[t.str] = new by(t, e);
    return n.initViewmodel(this), n;
  }
  function Ls(t, e) {
    var n,
        i = t.str;
    e && (e.implicit && (this.implicitChanges[i] = !0), e.noCascade && (this.noCascade[i] = !0)), (n = this.computations[i]) && n.invalidate(), -1 === this.changes.indexOf(t) && this.changes.push(t);
    var r = e ? e.keepExistingWrapper : !1;
    this.clearCache(i, r), this.ready && this.onchange();
  }
  function Vs(t, e, n, i) {
    var r,
        s,
        o,
        a;
    if (this.mark(t), i && i.compare) {
      o = Us(i.compare);
      try {
        r = e.map(o), s = n.map(o);
      } catch (u) {
        m('merge(): "%s" comparison failed. Falling back to identity checking', t), r = e, s = n;
      }
    } else
      r = e, s = n;
    a = xy(r, s), this.smartUpdate(t, n, a, e.length !== n.length);
  }
  function Ms(t) {
    return JSON.stringify(t);
  }
  function Us(t) {
    if (t === !0)
      return Ms;
    if ("string" == typeof t)
      return Ey[t] || (Ey[t] = function(e) {
        return e[t];
      }), Ey[t];
    if ("function" == typeof t)
      return t;
    throw new Error("The `compare` option must be a function, or a string representing an identifying field (or `true` to use JSON.stringify)");
  }
  function Ws(t, e) {
    var n,
        i,
        r,
        s = void 0 === arguments[2] ? "default" : arguments[2];
    e.isStatic || ((n = this.mappings[t.firstKey]) ? n.register(t, e, s) : (i = this.deps[s] || (this.deps[s] = {}), r = i[t.str] || (i[t.str] = []), r.push(e), this.depsMap[s] || (this.depsMap[s] = {}), t.isRoot || zs(this, t, s)));
  }
  function zs(t, e, n) {
    for (var i,
        r,
        s; !e.isRoot; )
      i = t.depsMap[n], r = i[e.parent.str] || (i[e.parent.str] = []), s = e.str, void 0 === r["_" + s] && (r["_" + s] = 0, r.push(e)), r["_" + s] += 1, e = e.parent;
  }
  function Bs() {
    return this.captureGroups.pop();
  }
  function qs(t) {
    this.data = t, this.clearCache("");
  }
  function $s(t, e) {
    var n,
        i,
        r,
        s,
        o = void 0 === arguments[2] ? {} : arguments[2];
    if (!o.noMapping && (n = this.mappings[t.firstKey]))
      return n.set(t, e);
    if (i = this.computations[t.str]) {
      if (i.setting)
        return;
      i.set(e), e = i.get();
    }
    a(this.cache[t.str], e) || (r = this.wrapped[t.str], r && r.reset && (s = r.reset(e) !== !1, s && (e = r.get())), i || s || Qs(this, t, e), o.silent ? this.clearCache(t.str) : this.mark(t));
  }
  function Qs(t, e, n) {
    var i,
        r,
        s,
        o;
    s = function() {
      i.set ? i.set(e.lastKey, n) : (r = i.get(), o());
    }, o = function() {
      r || (r = Yg(e.lastKey), t.set(e.parent, r, {silent: !0})), r[e.lastKey] = n;
    }, i = t.wrapped[e.parent.str], i ? s() : (r = t.get(e.parent), (i = t.wrapped[e.parent.str]) ? s() : o());
  }
  function Zs(t, e, n) {
    var i,
        r,
        s,
        o = this;
    if (r = n.length, n.forEach(function(e, n) {
      -1 === e && o.mark(t.join(n), Ty);
    }), this.set(t, e, {silent: !0}), (i = this.deps["default"][t.str]) && i.filter(Hs).forEach(function(t) {
      return t.shuffle(n, e);
    }), r !== e.length) {
      for (this.mark(t.join("length"), Py), s = n.touchedFrom; s < e.length; s += 1)
        this.mark(t.join(s));
      for (s = e.length; r > s; s += 1)
        this.mark(t.join(s), Ty);
    }
  }
  function Hs(t) {
    return "function" == typeof t.shuffle;
  }
  function Ks() {
    var t,
        e = this;
    for (Object.keys(this.cache).forEach(function(t) {
      return e.clearCache(t);
    }); t = this.unresolvedImplicitDependencies.pop(); )
      t.teardown();
  }
  function Gs(t, e) {
    var n,
        i,
        r,
        s = void 0 === arguments[2] ? "default" : arguments[2];
    if (!e.isStatic) {
      if (n = this.mappings[t.firstKey])
        return n.unregister(t, e, s);
      if (i = this.deps[s][t.str], r = i.indexOf(e), -1 === r)
        throw new Error("Attempted to remove a dependant that was no longer registered! This should not happen. If you are seeing this bug in development please raise an issue at https://github.com/RactiveJS/Ractive/issues - thanks");
      i.splice(r, 1), t.isRoot || Ys(this, t, s);
    }
  }
  function Ys(t, e, n) {
    for (var i,
        r; !e.isRoot; )
      i = t.depsMap[n], r = i[e.parent.str], r["_" + e.str] -= 1, r["_" + e.str] || (I(r, e), r["_" + e.str] = void 0), e = e.parent;
  }
  function Js(t) {
    this.hook = new nu(t), this.inProcess = {}, this.queue = {};
  }
  function Xs(t, e) {
    return t[e._guid] || (t[e._guid] = []);
  }
  function to(t, e) {
    var n = Xs(t.queue, e);
    for (t.hook.fire(e); n.length; )
      to(t, n.shift());
    delete t.queue[e._guid];
  }
  function eo(t, e) {
    var n,
        i = {};
    for (n in e)
      i[n] = no(t, n, e[n]);
    return i;
  }
  function no(t, e, n) {
    var i,
        r;
    return "function" == typeof n && (i = ro(n, t)), "string" == typeof n && (i = io(t, n)), "object" == typeof n && ("string" == typeof n.get ? i = io(t, n.get) : "function" == typeof n.get ? i = ro(n.get, t) : l("`%s` computation must have a `get()` method", e), "function" == typeof n.set && (r = ro(n.set, t))), {
      getter: i,
      setter: r
    };
  }
  function io(t, e) {
    var n,
        i,
        r;
    return n = "return (" + e.replace(Ly, function(t, e) {
      return i = !0, '__ractive.get("' + e + '")';
    }) + ");", i && (n = "var __ractive = this; " + n), r = new Function(n), i ? r.bind(t) : r;
  }
  function ro(t, e) {
    return /this/.test(t.toString()) ? t.bind(e) : t;
  }
  function so(e) {
    var n,
        r,
        s = void 0 === arguments[1] ? {} : arguments[1],
        o = void 0 === arguments[2] ? {} : arguments[2];
    if (Qb.DEBUG && Ca(), uo(e, o), xa(e, "data", {get: ho}), Vy.fire(e, s), zy.forEach(function(t) {
      e[t] = i(wa(e.constructor[t] || null), s[t]);
    }), r = new Ny({
      adapt: oo(e, e.adapt, s),
      data: Wh.init(e.constructor, e, s),
      computed: Iy(e, i(wa(e.constructor.prototype.computed), s.computed)),
      mappings: o.mappings,
      ractive: e,
      onchange: function() {
        return mu.addRactive(e);
      }
    }), e.viewmodel = r, r.init(), bd.init(e.constructor, e, s), My.fire(e), Uy.begin(e), e.template) {
      var a = void 0;
      (o.cssIds || e.cssId) && (a = o.cssIds ? o.cssIds.slice() : [], e.cssId && a.push(e.cssId)), e.fragment = new yb({
        template: e.template,
        root: e,
        owner: e,
        cssIds: a
      });
    }
    if (Uy.end(e), n = t(e.el)) {
      var u = e.render(n, e.append);
      Qb.DEBUG_PROMISES && u["catch"](function(t) {
        throw v("Promise debugging is enabled, to help solve errors that happen asynchronously. Some browsers will log unhandled promise rejections, in which case you can safely disable promise debugging:\n  Ractive.DEBUG_PROMISES = false;"), m("An error happened during rendering", {ractive: e}), t.stack && f(t.stack), t;
      });
    }
  }
  function oo(t, e, n) {
    function i(e) {
      return "string" == typeof e && (e = g("adaptors", t, e), e || l(Da(e, "adaptor"))), e;
    }
    var r,
        s,
        o;
    if (e = e.map(i), r = N(n.adapt).map(i), r = ao(e, r), s = "magic" in n ? n.magic : t.magic, o = "modifyArrays" in n ? n.modifyArrays : t.modifyArrays, s) {
      if (!na)
        throw new Error("Getters and setters (magic mode) are not supported in this browser");
      o && r.push(ey), r.push(ty);
    }
    return o && r.push(Kg), r;
  }
  function ao(t, e) {
    for (var n = t.slice(),
        i = e.length; i--; )
      ~n.indexOf(e[i]) || n.push(e[i]);
    return n;
  }
  function uo(t, e) {
    t._guid = "r-" + Wy++, t._subs = wa(null), t._config = {}, t._twowayBindings = wa(null), t._animations = [], t.nodes = {}, t._liveQueries = [], t._liveComponentQueries = [], t._boundFunctions = [], t._observers = [], e.component ? (t.parent = e.parent, t.container = e.container || null, t.root = t.parent.root, t.component = e.component, e.component.instance = t, t._inlinePartials = e.inlinePartials) : (t.root = t, t.parent = t.container = null);
  }
  function ho() {
    throw new Error("Using `ractive.data` is no longer supported - you must use the `ractive.get()` API instead");
  }
  function co(t, e, n) {
    this.parentFragment = t.parentFragment, this.callback = n, this.fragment = new yb({
      template: e,
      root: t.root,
      owner: this
    }), this.update();
  }
  function lo(t, e, n) {
    var i;
    return e.r ? i = Qd(t, e.r, n) : e.x ? i = new Gd(t, t.parentFragment, e.x, n) : e.rx && (i = new tp(t, e.rx, n)), i;
  }
  function fo(t) {
    return 1 === t.length && t[0].t === Hh;
  }
  function po(t, e) {
    var n;
    for (n in e)
      e.hasOwnProperty(n) && mo(t.instance, t.root, n, e[n]);
  }
  function mo(t, e, n, i) {
    "string" != typeof i && l("Components currently only support simple events - you cannot include arguments. Sorry!"), t.on(n, function() {
      var t,
          n;
      return arguments.length && arguments[0] && arguments[0].node && (t = Array.prototype.shift.call(arguments)), n = Array.prototype.slice.call(arguments), Wu(e, i, {
        event: t,
        args: n
      }), !1;
    });
  }
  function vo(t, e) {
    var n,
        i;
    if (!e)
      throw new Error('Component "' + this.name + '" not found');
    n = this.parentFragment = t.parentFragment, i = n.root, this.root = i, this.type = sc, this.name = t.template.e, this.index = t.index, this.indexRefBindings = {}, this.yielders = {}, this.resolvers = [], $y(this, e, t.template.a, t.template.f, t.template.p), Qy(this, t.template.v), (t.template.t0 || t.template.t1 || t.template.t2 || t.template.o) && m('The "intro", "outro" and "decorator" directives have no effect on components', {ractive: this.instance}), Zy(this);
  }
  function go(t, e) {
    function n(n) {
      n.rebind(t, e);
    }
    var i;
    this.resolvers.forEach(n);
    for (var r in this.yielders)
      this.yielders[r][0] && n(this.yielders[r][0]);
    (i = this.root._liveComponentQueries["_" + this.name]) && i._makeDirty();
  }
  function yo() {
    var t = this.instance;
    return t.render(this.parentFragment.getNode()), this.rendered = !0, t.fragment.detach();
  }
  function bo() {
    return this.instance.fragment.toString();
  }
  function wo() {
    var t = this.instance;
    this.resolvers.forEach(Z), xo(this), t._observers.forEach(K), t.fragment.unbind(), t.viewmodel.teardown(), t.fragment.rendered && t.el.__ractive_instances__ && I(t.el.__ractive_instances__, t), Xy.fire(t);
  }
  function xo(t) {
    var e,
        n;
    e = t.root;
    do
      (n = e._liveComponentQueries["_" + t.name]) && n._remove(t);
 while (e = e.parent);
  }
  function ko(t) {
    this.shouldDestroy = t, this.instance.unrender();
  }
  function Eo(t) {
    var e = this;
    this.owner = t.owner, this.parent = this.owner.parentFragment, this.root = t.root, this.pElement = t.pElement, this.context = t.context, this.index = t.index, this.key = t.key, this.registeredIndexRefs = [], this.cssIds = "cssIds" in t ? t.cssIds : this.parent ? this.parent.cssIds : null, this.items = t.template.map(function(n, i) {
      return _o({
        parentFragment: e,
        pElement: t.pElement,
        template: n,
        index: i
      });
    }), this.value = this.argsList = null, this.dirtyArgs = this.dirtyValue = !0, this.bound = !0;
  }
  function _o(t) {
    if ("string" == typeof t.template)
      return new Nd(t);
    switch (t.template.t) {
      case oc:
        return new ob(t);
      case Hh:
        return new op(t);
      case Gh:
        return new Sp(t);
      case Kh:
        return new qp(t);
      case Xh:
        var e = void 0;
        return (e = Fg(t.parentFragment.root, t.template.e)) ? new nb(t, e) : new bg(t);
      case tc:
        return new Tg(t);
      case ec:
        return new rb(t);
      case uc:
        return new ub(t);
      default:
        throw new Error("Something very strange happened. Please file an issue at https://github.com/ractivejs/ractive/issues. Thanks!");
    }
  }
  function Ao(t, e) {
    (!this.owner || this.owner.hasContext) && k(this, "context", t, e), this.items.forEach(function(n) {
      n.rebind && n.rebind(t, e);
    });
  }
  function So() {
    var t;
    return 1 === this.items.length ? t = this.items[0].render() : (t = document.createDocumentFragment(), this.items.forEach(function(e) {
      t.appendChild(e.render());
    })), this.rendered = !0, t;
  }
  function Co(t) {
    return this.items ? this.items.map(t ? Po : Oo).join("") : "";
  }
  function Oo(t) {
    return t.toString();
  }
  function Po(t) {
    return t.toString(!0);
  }
  function To() {
    this.bound && (this.items.forEach(Fo), this.bound = !1);
  }
  function Fo(t) {
    t.unbind && t.unbind();
  }
  function Ro(t) {
    if (!this.rendered)
      throw new Error("Attempted to unrender a fragment that was not rendered");
    this.items.forEach(function(e) {
      return e.unrender(t);
    }), this.rendered = !1;
  }
  function jo(t) {
    var e,
        n,
        i,
        r,
        s;
    if (t = t || {}, "object" != typeof t)
      throw new Error("The reset method takes either no arguments, or an object containing new data");
    for ((n = this.viewmodel.wrapped[""]) && n.reset ? n.reset(t) === !1 && this.viewmodel.reset(t) : this.viewmodel.reset(t), i = bd.reset(this), r = i.length; r--; )
      if (wb.indexOf(i[r]) > -1) {
        s = !0;
        break;
      }
    if (s) {
      var o = void 0;
      this.viewmodel.mark(Za), (o = this.component) && (o.shouldDestroy = !0), this.unrender(), o && (o.shouldDestroy = !1), this.fragment.template !== this.template && (this.fragment.unbind(), this.fragment = new yb({
        template: this.template,
        root: this,
        owner: this
      })), e = this.render(this.el, this.anchor);
    } else
      e = mu.start(this, !0), this.viewmodel.mark(Za), mu.end();
    return xb.fire(this, t), e;
  }
  function No(t) {
    var e,
        n;
    hd.init(null, this, {template: t}), e = this.transitionsEnabled, this.transitionsEnabled = !1, (n = this.component) && (n.shouldDestroy = !0), this.unrender(), n && (n.shouldDestroy = !1), this.fragment.unbind(), this.fragment = new yb({
      template: this.template,
      root: this,
      owner: this
    }), this.render(this.el, this.anchor), this.transitionsEnabled = e;
  }
  function Do(t, e) {
    var n,
        i;
    if (i = mu.start(this, !0), h(t)) {
      n = t;
      for (t in n)
        n.hasOwnProperty(t) && (e = n[t], Io(this, t, e));
    } else
      Io(this, t, e);
    return mu.end(), i;
  }
  function Io(t, e, n) {
    e = _(C(e)), e.isPattern ? A(t, e).forEach(function(e) {
      t.viewmodel.set(e, n);
    }) : t.viewmodel.set(e, n);
  }
  function Lo(t, e) {
    return Ha(this, t, void 0 === e ? -1 : -e);
  }
  function Vo() {
    var t;
    return this.fragment.unbind(), this.viewmodel.teardown(), this._observers.forEach(K), this.fragment.rendered && this.el.__ractive_instances__ && I(this.el.__ractive_instances__, this), this.shouldDestroy = !0, t = this.fragment.rendered ? this.unrender() : ou.resolve(), Fb.fire(this), this._boundFunctions.forEach(Mo), t;
  }
  function Mo(t) {
    delete t.fn[t.prop];
  }
  function Uo(t) {
    var e = this;
    if ("string" != typeof t)
      throw new TypeError(ja);
    var n = void 0;
    return /\*/.test(t) ? (n = {}, A(this, _(C(t))).forEach(function(t) {
      n[t.str] = !e.viewmodel.get(t);
    }), this.set(n)) : this.set(t, !this.get(t));
  }
  function Wo() {
    return this.fragment.toString(!0);
  }
  function zo() {
    var t,
        e;
    if (!this.fragment.rendered)
      return m("ractive.unrender() was called on a Ractive instance that was not rendered"), ou.resolve();
    for (t = mu.start(this, !0), e = !this.component || this.component.shouldDestroy || this.shouldDestroy; this._animations[0]; )
      this._animations[0].stop();
    return this.fragment.unrender(e), I(this.el.__ractive_instances__, this), Db.fire(this), mu.end(), t;
  }
  function Bo(t) {
    var e;
    return t = _(t) || Za, e = mu.start(this, !0), this.viewmodel.mark(t), mu.end(), Vb.fire(this, t), e;
  }
  function qo(t, e) {
    var n,
        i,
        r;
    if ("string" != typeof t || e) {
      r = [];
      for (i in this._twowayBindings)
        (!t || _(i).equalsOrStartsWith(t)) && r.push.apply(r, this._twowayBindings[i]);
    } else
      r = this._twowayBindings[t];
    return n = $o(this, r), this.set(n);
  }
  function $o(t, e) {
    var n = {},
        i = [];
    return e.forEach(function(t) {
      var e,
          r;
      if (!t.radioName || t.element.node.checked) {
        if (t.checkboxName)
          return void(i[t.keypath.str] || t.changed() || (i.push(t.keypath), i[t.keypath.str] = t));
        e = t.attribute.value, r = t.getValue(), j(e, r) || a(e, r) || (n[t.keypath.str] = r);
      }
    }), i.length && i.forEach(function(t) {
      var e,
          r,
          s;
      e = i[t.str], r = e.attribute.value, s = e.getValue(), j(r, s) || (n[t.str] = s);
    }), n;
  }
  function Qo(t, e) {
    return "function" == typeof e && /_super/.test(t);
  }
  function Zo(t) {
    for (var e = {}; t; )
      Ho(t, e), Go(t, e), t = t._Parent !== Qb ? t._Parent : !1;
    return e;
  }
  function Ho(t, e) {
    vd.forEach(function(n) {
      Ko(n.useDefaults ? t.prototype : t, e, n.name);
    });
  }
  function Ko(t, e, n) {
    var i,
        r = Object.keys(t[n]);
    r.length && ((i = e[n]) || (i = e[n] = {}), r.filter(function(t) {
      return !(t in i);
    }).forEach(function(e) {
      return i[e] = t[n][e];
    }));
  }
  function Go(t, e) {
    Object.keys(t.prototype).forEach(function(n) {
      if ("computed" !== n) {
        var i = t.prototype[n];
        if (n in e) {
          if ("function" == typeof e[n] && "function" == typeof i && e[n]._method) {
            var r = void 0,
                s = i._method;
            s && (i = i._method), r = Wb(e[n]._method, i), s && (r._method = r), e[n] = r;
          }
        } else
          e[n] = i._method ? i._method : i;
      }
    });
  }
  function Yo() {
    for (var t = arguments.length,
        e = Array(t),
        n = 0; t > n; n++)
      e[n] = arguments[n];
    return e.length ? e.reduce(Jo, this) : Jo(this);
  }
  function Jo(t) {
    var e,
        n,
        r = void 0 === arguments[1] ? {} : arguments[1];
    return r.prototype instanceof Qb && (r = zb(r)), e = function(t) {
      return this instanceof e ? void By(this, t) : new e(t);
    }, n = wa(t.prototype), n.constructor = e, ka(e, {
      defaults: {value: n},
      extend: {
        value: Yo,
        writable: !0,
        configurable: !0
      },
      _Parent: {value: t}
    }), bd.extend(t, n, r), Wh.extend(t, n, r), r.computed && (n.computed = i(wa(t.prototype.computed), r.computed)), e.prototype = n, e;
  }
  var Xo,
      ta,
      ea,
      na,
      ia,
      ra,
      sa,
      oa = 3,
      aa = {
        el: void 0,
        append: !1,
        template: {
          v: oa,
          t: []
        },
        preserveWhitespace: !1,
        sanitize: !1,
        stripComments: !0,
        delimiters: ["{{", "}}"],
        tripleDelimiters: ["{{{", "}}}"],
        interpolate: !1,
        data: {},
        computed: {},
        magic: !1,
        modifyArrays: !0,
        adapt: [],
        isolated: !1,
        twoway: !0,
        lazy: !1,
        noIntro: !1,
        transitionsEnabled: !0,
        complete: void 0,
        css: null,
        noCssTransform: !1
      },
      ua = aa,
      ha = {
        linear: function(t) {
          return t;
        },
        easeIn: function(t) {
          return Math.pow(t, 3);
        },
        easeOut: function(t) {
          return Math.pow(t - 1, 3) + 1;
        },
        easeInOut: function(t) {
          return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2);
        }
      };
  Xo = "object" == typeof document, ta = "undefined" != typeof navigator && /jsDom/.test(navigator.appName), ea = "undefined" != typeof console && "function" == typeof console.warn && "function" == typeof console.warn.apply;
  try {
    Object.defineProperty({}, "test", {value: 0}), na = !0;
  } catch (ca) {
    na = !1;
  }
  ia = {
    html: "http://www.w3.org/1999/xhtml",
    mathml: "http://www.w3.org/1998/Math/MathML",
    svg: "http://www.w3.org/2000/svg",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  }, ra = "undefined" == typeof document ? !1 : document && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"), sa = ["o", "ms", "moz", "webkit"];
  var la,
      fa,
      da,
      pa,
      ma,
      va,
      ga,
      ya,
      ba;
  if (la = ra ? function(t, e) {
    return e && e !== ia.html ? document.createElementNS(e, t) : document.createElement(t);
  } : function(t, e) {
    if (e && e !== ia.html)
      throw "This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you're trying to render SVG in an older browser. See http://docs.ractivejs.org/latest/svg-and-older-browsers for more information";
    return document.createElement(t);
  }, Xo) {
    for (da = la("div"), pa = ["matches", "matchesSelector"], ba = function(t) {
      return function(e, n) {
        return e[t](n);
      };
    }, ga = pa.length; ga-- && !fa; )
      if (ma = pa[ga], da[ma])
        fa = ba(ma);
      else
        for (ya = sa.length; ya--; )
          if (va = sa[ga] + ma.substr(0, 1).toUpperCase() + ma.substring(1), da[va]) {
            fa = ba(va);
            break;
          }
    fa || (fa = function(t, e) {
      var n,
          i,
          r;
      for (i = t.parentNode, i || (da.innerHTML = "", i = da, t = t.cloneNode(), da.appendChild(t)), n = i.querySelectorAll(e), r = n.length; r--; )
        if (n[r] === t)
          return !0;
      return !1;
    });
  } else
    fa = null;
  var wa,
      xa,
      ka,
      Ea = null;
  try {
    Object.defineProperty({}, "test", {value: 0}), Xo && Object.defineProperty(document.createElement("div"), "test", {value: 0}), xa = Object.defineProperty;
  } catch (_a) {
    xa = function(t, e, n) {
      t[e] = n.value;
    };
  }
  try {
    try {
      Object.defineProperties({}, {test: {value: 0}});
    } catch (_a) {
      throw _a;
    }
    Xo && Object.defineProperties(la("div"), {test: {value: 0}}), ka = Object.defineProperties;
  } catch (_a) {
    ka = function(t, e) {
      var n;
      for (n in e)
        e.hasOwnProperty(n) && xa(t, n, e[n]);
    };
  }
  try {
    Object.create(null), wa = Object.create;
  } catch (_a) {
    wa = function() {
      var t = function() {};
      return function(e, n) {
        var i;
        return null === e ? {} : (t.prototype = e, i = new t, n && Object.defineProperties(i, n), i);
      };
    }();
  }
  var Aa,
      Sa,
      Ca,
      Oa = Object.prototype.hasOwnProperty,
      Pa = Object.prototype.toString,
      Ta = /^\[object (?:Array|FileList)\]$/,
      Fa = function() {},
      Ra = {};
  ea ? !function() {
    var t = ["%cRactive.js %c0.7.3 %cin debug mode, %cmore...", "color: rgb(114, 157, 52); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;"],
        e = "You're running Ractive 0.7.3 in debug mode - messages will be printed to the console to help you fix problems and optimise your application.\n\nTo disable debug mode, add this line at the start of your app:\n  Ractive.DEBUG = false;\n\nTo disable debug mode when your app is minified, add this snippet:\n  Ractive.DEBUG = /unminified/.test(function(){/*unminified*/});\n\nGet help and support:\n  http://docs.ractivejs.org\n  http://stackoverflow.com/questions/tagged/ractivejs\n  http://groups.google.com/forum/#!forum/ractive-js\n  http://twitter.com/ractivejs\n\nFound a bug? Raise an issue:\n  https://github.com/ractivejs/ractive/issues\n\n";
    Ca = function() {
      var n = !!console.groupCollapsed;
      console[n ? "groupCollapsed" : "log"].apply(console, t), console.log(e), n && console.groupEnd(t), Ca = Fa;
    }, Sa = function(t, e) {
      if (Ca(), "object" == typeof e[e.length - 1]) {
        var n = e.pop(),
            i = n ? n.ractive : null;
        if (i) {
          var r = void 0;
          i.component && (r = i.component.name) && (t = "<" + r + "> " + t);
          var s = void 0;
          (s = n.node || i.fragment && i.fragment.rendered && i.find("*")) && e.push(s);
        }
      }
      console.warn.apply(console, ["%cRactive.js: %c" + t, "color: rgb(114, 157, 52);", "color: rgb(85, 85, 85);"].concat(e));
    }, Aa = function() {
      console.log.apply(console, arguments);
    };
  }() : Sa = Aa = Ca = Fa;
  var ja = "Bad arguments",
      Na = 'A function was specified for "%s" %s, but no %s was returned',
      Da = function(t, e) {
        return 'Missing "' + t + '" ' + e + " plugin. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#" + e + "s";
      },
      Ia = function(t, e, n, i) {
        if (t === e)
          return b(e);
        if (i) {
          var r = g("interpolators", n, i);
          if (r)
            return r(t, e) || b(e);
          l(Da(i, "interpolator"));
        }
        return Ma.number(t, e) || Ma.array(t, e) || Ma.object(t, e) || b(e);
      },
      La = Ia,
      Va = {
        number: function(t, e) {
          var n;
          return u(t) && u(e) ? (t = +t, e = +e, n = e - t, n ? function(e) {
            return t + e * n;
          } : function() {
            return t;
          }) : null;
        },
        array: function(t, e) {
          var n,
              i,
              r,
              o;
          if (!s(t) || !s(e))
            return null;
          for (n = [], i = [], o = r = Math.min(t.length, e.length); o--; )
            i[o] = La(t[o], e[o]);
          for (o = r; o < t.length; o += 1)
            n[o] = t[o];
          for (o = r; o < e.length; o += 1)
            n[o] = e[o];
          return function(t) {
            for (var e = r; e--; )
              n[e] = i[e](t);
            return n;
          };
        },
        object: function(t, e) {
          var n,
              i,
              r,
              s,
              o;
          if (!h(t) || !h(e))
            return null;
          n = [], s = {}, r = {};
          for (o in t)
            Oa.call(t, o) && (Oa.call(e, o) ? (n.push(o), r[o] = La(t[o], e[o])) : s[o] = t[o]);
          for (o in e)
            Oa.call(e, o) && !Oa.call(t, o) && (s[o] = e[o]);
          return i = n.length, function(t) {
            for (var e,
                o = i; o--; )
              e = n[o], s[e] = r[e](t);
            return s;
          };
        }
      },
      Ma = Va,
      Ua = w,
      Wa = {},
      za = /\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g,
      Ba = /\*/,
      qa = {},
      $a = function(t) {
        var e = t.split(".");
        this.str = t, "@" === t[0] && (this.isSpecial = !0, this.value = E(t)), this.firstKey = e[0], this.lastKey = e.pop(), this.isPattern = Ba.test(t), this.parent = "" === t ? null : _(e.join(".")), this.isRoot = !t;
      };
  $a.prototype = {
    equalsOrStartsWith: function(t) {
      return t === this || this.startsWith(t);
    },
    join: function(t) {
      return _(this.isRoot ? String(t) : this.str + "." + t);
    },
    replace: function(t, e) {
      return this === t ? e : this.startsWith(t) ? null === e ? e : _(this.str.replace(t.str + ".", e.str + ".")) : void 0;
    },
    startsWith: function(t) {
      return t ? t && this.str.substr(0, t.str.length + 1) === t.str + "." : !1;
    },
    toString: function() {
      throw new Error("Bad coercion");
    },
    valueOf: function() {
      throw new Error("Bad coercion");
    },
    wildcardMatches: function() {
      return this._wildcardMatches || (this._wildcardMatches = Ua(this.str));
    }
  };
  var Qa,
      Za = _(""),
      Ha = O,
      Ka = "Cannot add to a non-numeric value",
      Ga = P;
  "undefined" == typeof window ? Qa = null : (!function(t, e, n) {
    var i,
        r;
    if (!n.requestAnimationFrame) {
      for (i = 0; i < t.length && !n.requestAnimationFrame; ++i)
        n.requestAnimationFrame = n[t[i] + "RequestAnimationFrame"];
      n.requestAnimationFrame || (r = n.setTimeout, n.requestAnimationFrame = function(t) {
        var n,
            i,
            s;
        return n = Date.now(), i = Math.max(0, 16 - (n - e)), s = r(function() {
          t(n + i);
        }, i), e = n + i, s;
      });
    }
  }(sa, 0, window), Qa = window.requestAnimationFrame);
  var Ya,
      Ja = Qa;
  Ya = "undefined" != typeof window && window.performance && "function" == typeof window.performance.now ? function() {
    return window.performance.now();
  } : function() {
    return Date.now();
  };
  var Xa = Ya,
      tu = {
        construct: {
          deprecated: "beforeInit",
          replacement: "onconstruct"
        },
        render: {
          deprecated: "init",
          message: 'The "init" method has been deprecated and will likely be removed in a future release. You can either use the "oninit" method which will fire only once prior to, and regardless of, any eventual ractive instance being rendered, or if you need to access the rendered DOM, use "onrender" instead. See http://docs.ractivejs.org/latest/migrating for more information.'
        },
        complete: {
          deprecated: "complete",
          replacement: "oncomplete"
        }
      };
  T.prototype.fire = function(t, e) {
    function n(n) {
      return t[n] ? (e ? t[n](e) : t[n](), !0) : void 0;
    }
    n(this.method), !t[this.method] && this.deprecate && n(this.deprecate.deprecated) && (this.deprecate.message ? m(this.deprecate.message) : m('The method "%s" has been deprecated in favor of "%s" and will likely be removed in a future release. See http://docs.ractivejs.org/latest/migrating for more information.', this.deprecate.deprecated, this.deprecate.replacement)), e ? t.fire(this.event, e) : t.fire(this.event);
  };
  var eu,
      nu = T,
      iu = {},
      ru = {},
      su = {};
  "function" == typeof Promise ? eu = Promise : (eu = function(t) {
    var e,
        n,
        i,
        r,
        s,
        o,
        a = [],
        u = [],
        h = iu;
    i = function(t) {
      return function(i) {
        h === iu && (e = i, h = t, n = M(h === ru ? a : u, e), V(n));
      };
    }, r = i(ru), s = i(su);
    try {
      t(r, s);
    } catch (c) {
      s(c);
    }
    return o = {then: function(t, e) {
        var i = new eu(function(r, s) {
          var o = function(t, e, n) {
            e.push("function" == typeof t ? function(e) {
              var n;
              try {
                n = t(e), U(i, n, r, s);
              } catch (o) {
                s(o);
              }
            } : n);
          };
          o(t, a, r), o(e, u, s), h !== iu && V(n);
        });
        return i;
      }}, o["catch"] = function(t) {
      return this.then(null, t);
    }, o;
  }, eu.all = function(t) {
    return new eu(function(e, n) {
      var i,
          r,
          s,
          o = [];
      if (!t.length)
        return void e(o);
      for (s = function(t, r) {
        t && "function" == typeof t.then ? t.then(function(t) {
          o[r] = t, --i || e(o);
        }, n) : (o[r] = t, --i || e(o));
      }, i = r = t.length; r--; )
        s(t[r], r);
    });
  }, eu.resolve = function(t) {
    return new eu(function(e) {
      e(t);
    });
  }, eu.reject = function(t) {
    return new eu(function(e, n) {
      n(t);
    });
  });
  var ou = eu,
      au = function(t) {
        do
          if (void 0 !== t.context)
            return t.context;
 while (t = t.parent);
        return Za;
      },
      uu = W,
      hu = function(t, e) {
        this.callback = t, this.parent = e, this.intros = [], this.outros = [], this.children = [], this.totalChildren = this.outroChildren = 0, this.detachQueue = [], this.decoratorQueue = [], this.outrosComplete = !1, e && e.addChild(this);
      };
  hu.prototype = {
    addChild: function(t) {
      this.children.push(t), this.totalChildren += 1, this.outroChildren += 1;
    },
    decrementOutros: function() {
      this.outroChildren -= 1, J(this);
    },
    decrementTotal: function() {
      this.totalChildren -= 1, J(this);
    },
    add: function(t) {
      var e = t.isIntro ? this.intros : this.outros;
      e.push(t);
    },
    addDecorator: function(t) {
      this.decoratorQueue.push(t);
    },
    remove: function(t) {
      var e = t.isIntro ? this.intros : this.outros;
      I(e, t), J(this);
    },
    init: function() {
      this.ready = !0, J(this);
    },
    detachNodes: function() {
      this.decoratorQueue.forEach(Q), this.detachQueue.forEach(G), this.children.forEach(Y);
    }
  };
  var cu,
      lu,
      fu = hu,
      du = [],
      pu = new nu("change");
  lu = {
    start: function(t, e) {
      var n,
          i;
      return e && (n = new ou(function(t) {
        return i = t;
      })), cu = {
        previousBatch: cu,
        transitionManager: new fu(i, cu && cu.transitionManager),
        views: [],
        tasks: [],
        ractives: [],
        instance: t
      }, t && cu.ractives.push(t), n;
    },
    end: function() {
      X(), cu.transitionManager.init(), !cu.previousBatch && cu.instance && (cu.instance.viewmodel.changes = []), cu = cu.previousBatch;
    },
    addRactive: function(t) {
      cu && F(cu.ractives, t);
    },
    registerTransition: function(t) {
      t._manager = cu.transitionManager, cu.transitionManager.add(t);
    },
    registerDecorator: function(t) {
      cu.transitionManager.addDecorator(t);
    },
    addView: function(t) {
      cu.views.push(t);
    },
    addUnresolved: function(t) {
      du.push(t);
    },
    removeUnresolved: function(t) {
      I(du, t);
    },
    detachWhenReady: function(t) {
      cu.transitionManager.detachQueue.push(t);
    },
    scheduleTask: function(t, e) {
      var n;
      if (cu) {
        for (n = cu; e && n.previousBatch; )
          n = n.previousBatch;
        n.tasks.push(t);
      } else
        t();
    }
  };
  var mu = lu,
      vu = [],
      gu = {
        tick: function() {
          var t,
              e,
              n;
          for (n = Xa(), mu.start(), t = 0; t < vu.length; t += 1)
            e = vu[t], e.tick(n) || vu.splice(t--, 1);
          mu.end(), vu.length ? Ja(gu.tick) : gu.running = !1;
        },
        add: function(t) {
          vu.push(t), gu.running || (gu.running = !0, Ja(gu.tick));
        },
        abort: function(t, e) {
          for (var n,
              i = vu.length; i--; )
            n = vu[i], n.root === e && n.keypath === t && n.stop();
        }
      },
      yu = gu,
      bu = function(t) {
        var e;
        this.startTime = Date.now();
        for (e in t)
          t.hasOwnProperty(e) && (this[e] = t[e]);
        this.interpolator = La(this.from, this.to, this.root, this.interpolator), this.running = !0, this.tick();
      };
  bu.prototype = {
    tick: function() {
      var t,
          e,
          n,
          i,
          r,
          s;
      return s = this.keypath, this.running ? (i = Date.now(), t = i - this.startTime, t >= this.duration ? (null !== s && (mu.start(this.root), this.root.viewmodel.set(s, this.to), mu.end()), this.step && this.step(1, this.to), this.complete(this.to), r = this.root._animations.indexOf(this), -1 === r && m("Animation was not found"), this.root._animations.splice(r, 1), this.running = !1, !1) : (e = this.easing ? this.easing(t / this.duration) : t / this.duration, null !== s && (n = this.interpolator(e), mu.start(this.root), this.root.viewmodel.set(s, n), mu.end()), this.step && this.step(e, n), !0)) : !1;
    },
    stop: function() {
      var t;
      this.running = !1, t = this.root._animations.indexOf(this), -1 === t && m("Animation was not found"), this.root._animations.splice(t, 1);
    }
  };
  var wu = bu,
      xu = nt,
      ku = {stop: Fa},
      Eu = rt,
      _u = new nu("detach"),
      Au = st,
      Su = ot,
      Cu = function() {
        var t,
            e,
            n;
        t = this._root[this._isComponentQuery ? "liveComponentQueries" : "liveQueries"], e = this.selector, n = t.indexOf(e), -1 !== n && (t.splice(n, 1), t[e] = null);
      },
      Ou = function(t, e) {
        var n,
            i,
            r,
            s,
            o,
            a,
            u,
            h,
            c,
            l;
        for (n = ut(t.component || t._ractive.proxy), i = ut(e.component || e._ractive.proxy), r = D(n), s = D(i); r && r === s; )
          n.pop(), i.pop(), o = r, r = D(n), s = D(i);
        if (r = r.component || r, s = s.component || s, c = r.parentFragment, l = s.parentFragment, c === l)
          return a = c.items.indexOf(r), u = l.items.indexOf(s), a - u || n.length - i.length;
        if (h = o.fragments)
          return a = h.indexOf(c), u = h.indexOf(l), a - u || n.length - i.length;
        throw new Error("An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/RactiveJS/Ractive/issues - thanks!");
      },
      Pu = function(t, e) {
        var n;
        return t.compareDocumentPosition ? (n = t.compareDocumentPosition(e), 2 & n ? 1 : -1) : Ou(t, e);
      },
      Tu = function() {
        this.sort(this._isComponentQuery ? Ou : Pu), this._dirty = !1;
      },
      Fu = function() {
        var t = this;
        this._dirty || (this._dirty = !0, mu.scheduleTask(function() {
          t._sort();
        }));
      },
      Ru = function(t) {
        var e = this.indexOf(this._isComponentQuery ? t.instance : t);
        -1 !== e && this.splice(e, 1);
      },
      ju = ht,
      Nu = ct,
      Du = lt,
      Iu = ft,
      Lu = dt,
      Vu = pt,
      Mu = {
        enqueue: function(t, e) {
          t.event && (t._eventQueue = t._eventQueue || [], t._eventQueue.push(t.event)), t.event = e;
        },
        dequeue: function(t) {
          t._eventQueue && t._eventQueue.length ? t.event = t._eventQueue.pop() : delete t.event;
        }
      },
      Uu = Mu,
      Wu = mt,
      zu = yt,
      Bu = bt,
      qu = {
        capture: !0,
        noUnwrap: !0,
        fullRootGet: !0
      },
      $u = wt,
      Qu = new nu("insert"),
      Zu = kt,
      Hu = function(t, e, n, i) {
        this.root = t, this.keypath = e, this.callback = n, this.defer = i.defer, this.context = i && i.context ? i.context : t;
      };
  Hu.prototype = {
    init: function(t) {
      this.value = this.root.get(this.keypath.str), t !== !1 ? this.update() : this.oldValue = this.value;
    },
    setValue: function(t) {
      var e = this;
      a(t, this.value) || (this.value = t, this.defer && this.ready ? mu.scheduleTask(function() {
        return e.update();
      }) : this.update());
    },
    update: function() {
      this.updating || (this.updating = !0, this.callback.call(this.context, this.value, this.oldValue, this.keypath.str), this.oldValue = this.value, this.updating = !1);
    }
  };
  var Ku,
      Gu = Hu,
      Yu = Et,
      Ju = Array.prototype.slice;
  Ku = function(t, e, n, i) {
    this.root = t, this.callback = n, this.defer = i.defer, this.keypath = e, this.regex = new RegExp("^" + e.str.replace(/\./g, "\\.").replace(/\*/g, "([^\\.]+)") + "$"), this.values = {}, this.defer && (this.proxies = []), this.context = i && i.context ? i.context : t;
  }, Ku.prototype = {
    init: function(t) {
      var e,
          n;
      if (e = Yu(this.root, this.keypath), t !== !1)
        for (n in e)
          e.hasOwnProperty(n) && this.update(_(n));
      else
        this.values = e;
    },
    update: function(t) {
      var e,
          n = this;
      if (t.isPattern) {
        e = Yu(this.root, t);
        for (t in e)
          e.hasOwnProperty(t) && this.update(_(t));
      } else if (!this.root.viewmodel.implicitChanges[t.str])
        return this.defer && this.ready ? void mu.scheduleTask(function() {
          return n.getProxy(t).update();
        }) : void this.reallyUpdate(t);
    },
    reallyUpdate: function(t) {
      var e,
          n,
          i,
          r;
      return e = t.str, n = this.root.viewmodel.get(t), this.updating ? void(this.values[e] = n) : (this.updating = !0, a(n, this.values[e]) && this.ready || (i = Ju.call(this.regex.exec(e), 1), r = [n, this.values[e], e].concat(i), this.values[e] = n, this.callback.apply(this.context, r)), void(this.updating = !1));
    },
    getProxy: function(t) {
      var e = this;
      return this.proxies[t.str] || (this.proxies[t.str] = {update: function() {
          return e.reallyUpdate(t);
        }}), this.proxies[t.str];
    }
  };
  var Xu,
      th,
      eh,
      nh,
      ih,
      rh,
      sh = Ku,
      oh = _t,
      ah = {},
      uh = At,
      hh = St,
      ch = function(t) {
        return t.trim();
      },
      lh = function(t) {
        return "" !== t;
      },
      fh = Ct,
      dh = Ot,
      ph = Pt,
      mh = Tt,
      vh = Array.prototype,
      gh = function(t) {
        return function(e) {
          for (var n = arguments.length,
              i = Array(n > 1 ? n - 1 : 0),
              r = 1; n > r; r++)
            i[r - 1] = arguments[r];
          var o,
              a,
              u,
              h,
              c = [];
          if (e = _(C(e)), o = this.viewmodel.get(e), a = o.length, !s(o))
            throw new Error("Called ractive." + t + "('" + e.str + "'), but '" + e.str + "' does not refer to an array");
          return c = mh(o, t, i), h = vh[t].apply(o, i), u = mu.start(this, !0).then(function() {
            return h;
          }), c ? this.viewmodel.smartUpdate(e, o, c) : this.viewmodel.mark(e), mu.end(), u;
        };
      },
      yh = gh("pop"),
      bh = gh("push"),
      wh = "/* Ractive.js component styles */\n",
      xh = [],
      kh = !1;
  Xo ? (eh = document.createElement("style"), eh.type = "text/css", nh = document.getElementsByTagName("head")[0], rh = !1, ih = eh.styleSheet, th = function() {
    var t = wh + xh.map(function(t) {
      return "\n/* {" + t.id + "} */\n" + t.styles;
    }).join("\n");
    ih ? ih.cssText = t : eh.innerHTML = t, rh || (nh.appendChild(eh), rh = !0);
  }, Xu = {
    add: function(t) {
      xh.push(t), kh = !0;
    },
    apply: function() {
      kh && (th(), kh = !1);
    }
  }) : Xu = {
    add: Fa,
    apply: Fa
  };
  var Eh,
      _h,
      Ah = Xu,
      Sh = Rt,
      Ch = new nu("render"),
      Oh = new nu("complete"),
      Ph = {
        extend: function(t, e, n) {
          e.adapt = Nt(e.adapt, N(n.adapt));
        },
        init: function() {}
      },
      Th = Ph,
      Fh = Dt,
      Rh = /(?:^|\})?\s*([^\{\}]+)\s*\{/g,
      jh = /\/\*.*?\*\//g,
      Nh = /((?:(?:\[[^\]+]\])|(?:[^\s\+\>\~:]))+)((?::[^\s\+\>\~\(]+(?:\([^\)]+\))?)?\s*[\s\+\>\~]?)\s*/g,
      Dh = /^@media/,
      Ih = /\[data-ractive-css~="\{[a-z0-9-]+\}"]/g,
      Lh = 1,
      Vh = {
        name: "css",
        extend: function(t, e, n) {
          if (n.css) {
            var i = Lh++,
                r = n.noCssTransform ? n.css : Fh(n.css, i);
            e.cssId = i, Ah.add({
              id: i,
              styles: r
            });
          }
        },
        init: function() {}
      },
      Mh = Vh,
      Uh = {
        name: "data",
        extend: function(t, e, n) {
          var i = void 0,
              r = void 0;
          if (n.data && h(n.data))
            for (i in n.data)
              r = n.data[i], r && "object" == typeof r && (h(r) || s(r)) && m("Passing a `data` option with object and array properties to Ractive.extend() is discouraged, as mutating them is likely to cause bugs. Consider using a data function instead:\n\n  // this...\n  data: function () {\n    return {\n      myObject: {}\n    };\n  })\n\n  // instead of this:\n  data: {\n    myObject: {}\n  }");
          e.data = Mt(e.data, n.data);
        },
        init: function(t, e, n) {
          var i = Mt(t.prototype.data, n.data);
          return "function" == typeof i && (i = i.call(e)), i || {};
        },
        reset: function(t) {
          var e = this.init(t.constructor, t, t.viewmodel);
          return t.viewmodel.reset(e), !0;
        }
      },
      Wh = Uh,
      zh = /^\s+/;
  _h = function(t) {
    this.name = "ParseError", this.message = t;
    try {
      throw new Error(t);
    } catch (e) {
      this.stack = e.stack;
    }
  }, _h.prototype = Error.prototype, Eh = function(t, e) {
    var n,
        i,
        r = 0;
    for (this.str = t, this.options = e || {}, this.pos = 0, this.lines = this.str.split("\n"), this.lineEnds = this.lines.map(function(t) {
      var e = r + t.length + 1;
      return r = e, e;
    }, 0), this.init && this.init(t, e), n = []; this.pos < this.str.length && (i = this.read()); )
      n.push(i);
    this.leftover = this.remaining(), this.result = this.postProcess ? this.postProcess(n, e) : n;
  }, Eh.prototype = {
    read: function(t) {
      var e,
          n,
          i,
          r;
      for (t || (t = this.converters), e = this.pos, i = t.length, n = 0; i > n; n += 1)
        if (this.pos = e, r = t[n](this))
          return r;
      return null;
    },
    getLinePos: function(t) {
      for (var e,
          n = 0,
          i = 0; t >= this.lineEnds[n]; )
        i = this.lineEnds[n], n += 1;
      return e = t - i, [n + 1, e + 1, t];
    },
    error: function(t) {
      var e = this.getLinePos(this.pos),
          n = e[0],
          i = e[1],
          r = this.lines[e[0] - 1],
          s = 0,
          o = r.replace(/\t/g, function(t, n) {
            return n < e[1] && (s += 1), "  ";
          }) + "\n" + new Array(e[1] + s).join(" ") + "^----",
          a = new _h("" + t + " at line " + n + " character " + i + ":\n" + o);
      throw a.line = e[0], a.character = e[1], a.shortMessage = t, a;
    },
    matchString: function(t) {
      return this.str.substr(this.pos, t.length) === t ? (this.pos += t.length, t) : void 0;
    },
    matchPattern: function(t) {
      var e;
      return (e = t.exec(this.remaining())) ? (this.pos += e[0].length, e[1] || e[0]) : void 0;
    },
    allowWhitespace: function() {
      this.matchPattern(zh);
    },
    remaining: function() {
      return this.str.substring(this.pos);
    },
    nextChar: function() {
      return this.str.charAt(this.pos);
    }
  }, Eh.extend = function(t) {
    var e,
        n,
        i = this;
    e = function(t, e) {
      Eh.call(this, t, e);
    }, e.prototype = wa(i.prototype);
    for (n in t)
      Oa.call(t, n) && (e.prototype[n] = t[n]);
    return e.extend = Eh.extend, e;
  };
  var Bh,
      qh,
      $h,
      Qh = Eh,
      Zh = 1,
      Hh = 2,
      Kh = 3,
      Gh = 4,
      Yh = 5,
      Jh = 6,
      Xh = 7,
      tc = 8,
      ec = 9,
      nc = 10,
      ic = 13,
      rc = 14,
      sc = 15,
      oc = 16,
      ac = 17,
      uc = 18,
      hc = 20,
      cc = 21,
      lc = 22,
      fc = 23,
      dc = 24,
      pc = 25,
      mc = 26,
      vc = 27,
      gc = 30,
      yc = 31,
      bc = 32,
      wc = 33,
      xc = 34,
      kc = 35,
      Ec = 36,
      _c = 40,
      Ac = 50,
      Sc = 51,
      Cc = 52,
      Oc = 53,
      Pc = 54,
      Tc = 60,
      Fc = 61,
      Rc = zt,
      jc = /^[^\s=]+/,
      Nc = /^\s+/,
      Dc = Bt,
      Ic = /^(\/(?:[^\n\r\u2028\u2029\/\\[]|\\.|\[(?:[^\n\r\u2028\u2029\]\\]|\\.)*])+\/(?:([gimuy])(?![a-z]*\2))*(?![a-zA-Z_$0-9]))/,
      Lc = qt,
      Vc = {
        t: nc,
        exclude: !0
      },
      Mc = "Expected a JavaScript expression",
      Uc = "Expected closing paren",
      Wc = Qt,
      zc = /^(?:[+-]?)0*(?:(?:(?:[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/,
      Bc = Zt;
  Bh = /^(?=.)[^"'\\]+?(?:(?!.)|(?=["'\\]))/, qh = /^\\(?:['"\\bfnrt]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/, $h = /^\\(?:\r\n|[\u000A\u000D\u2028\u2029])/;
  var qc,
      $c,
      Qc = function(t) {
        return function(e) {
          var n,
              i,
              r,
              s;
          for (n = e.pos, i = '"', r = !1; !r; )
            s = e.matchPattern(Bh) || e.matchPattern(qh) || e.matchString(t), s ? i += '"' === s ? '\\"' : "\\'" === s ? "'" : s : (s = e.matchPattern($h), s ? i += "\\u" + ("000" + s.charCodeAt(1).toString(16)).slice(-4) : r = !0);
          return i += '"', JSON.parse(i);
        };
      },
      Zc = Qc('"'),
      Hc = Qc("'"),
      Kc = function(t) {
        var e,
            n;
        return e = t.pos, t.matchString('"') ? (n = Hc(t), t.matchString('"') ? {
          t: cc,
          v: n
        } : (t.pos = e, null)) : t.matchString("'") ? (n = Zc(t), t.matchString("'") ? {
          t: cc,
          v: n
        } : (t.pos = e, null)) : null;
      },
      Gc = /^[a-zA-Z_$][a-zA-Z_$0-9]*/,
      Yc = Ht,
      Jc = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/,
      Xc = Kt,
      tl = Gt,
      el = function(t) {
        var e,
            n;
        return e = t.pos, t.allowWhitespace(), t.matchString("{") ? (n = tl(t), t.allowWhitespace(), t.matchString("}") ? {
          t: fc,
          m: n
        } : (t.pos = e, null)) : (t.pos = e, null);
      },
      nl = Yt,
      il = function(t) {
        var e,
            n;
        return e = t.pos, t.allowWhitespace(), t.matchString("[") ? (n = nl(t), t.matchString("]") ? {
          t: lc,
          m: n
        } : (t.pos = e, null)) : (t.pos = e, null);
      },
      rl = Jt,
      sl = Xt,
      ol = /^(?:~\/|(?:\.\.\/)+|\.\/(?:\.\.\/)*|\.)/;
  qc = /^(?:Array|console|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null)\b/, $c = /^(?:break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|var|void|while|with)$/;
  var al,
      ul,
      hl = /^[a-zA-Z$_0-9]+(?:(?:\.[a-zA-Z$_0-9]+)|(?:\[[0-9]+\]))*/,
      cl = /^[a-zA-Z_$][-a-zA-Z_$0-9]*/,
      ll = te,
      fl = function(t) {
        return rl(t) || sl(t) || ll(t);
      },
      dl = ee,
      pl = function(t) {
        var e,
            n,
            i,
            r;
        if (n = fl(t), !n)
          return null;
        for (; n; )
          if (e = t.pos, i = dl(t))
            n = {
              t: bc,
              x: n,
              r: i
            };
          else {
            if (!t.matchString("("))
              break;
            t.allowWhitespace(), r = nl(t), t.allowWhitespace(), t.matchString(")") || t.error(Uc), n = {
              t: _c,
              x: n
            }, r && (n.o = r);
          }
        return n;
      };
  ul = function(t, e) {
    return function(n) {
      var i;
      return (i = e(n)) ? i : n.matchString(t) ? (n.allowWhitespace(), i = Ol(n), i || n.error(Mc), {
        s: t,
        o: i,
        t: wc
      }) : null;
    };
  }, function() {
    var t,
        e,
        n,
        i,
        r;
    for (i = "! ~ + - typeof".split(" "), r = pl, t = 0, e = i.length; e > t; t += 1)
      n = ul(i[t], r), r = n;
    al = r;
  }();
  var ml,
      vl,
      gl = al;
  vl = function(t, e) {
    return function(n) {
      var i,
          r,
          s;
      if (r = e(n), !r)
        return null;
      for (; ; ) {
        if (i = n.pos, n.allowWhitespace(), !n.matchString(t))
          return n.pos = i, r;
        if ("in" === t && /[a-zA-Z_$0-9]/.test(n.remaining().charAt(0)))
          return n.pos = i, r;
        if (n.allowWhitespace(), s = e(n), !s)
          return n.pos = i, r;
        r = {
          t: Ec,
          s: t,
          o: [r, s]
        };
      }
    };
  }, function() {
    var t,
        e,
        n,
        i,
        r;
    for (i = "* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||".split(" "), r = gl, t = 0, e = i.length; e > t; t += 1)
      n = vl(i[t], r), r = n;
    ml = r;
  }();
  var yl,
      bl,
      wl,
      xl,
      kl,
      El,
      _l,
      Al,
      Sl = ml,
      Cl = ne,
      Ol = ie,
      Pl = re,
      Tl = oe,
      Fl = /^[0-9][1-9]*$/,
      Rl = ue,
      jl = he,
      Nl = ce,
      Dl = le,
      Il = fe,
      Ll = de,
      Vl = pe,
      Ml = /^yield\s*/,
      Ul = me,
      Wl = ve,
      zl = /^\s*else\s*/,
      Bl = ge,
      ql = /^\s*elseif\s+/,
      $l = {
        each: Cc,
        "if": Ac,
        "if-with": Pc,
        "with": Oc,
        unless: Sc
      },
      Ql = ye,
      Zl = /^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/,
      Hl = /^\s*,\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/,
      Kl = new RegExp("^(" + Object.keys($l).join("|") + ")\\b"),
      Gl = Ee,
      Yl = "<!--",
      Jl = "-->";
  yl = /^(allowFullscreen|async|autofocus|autoplay|checked|compact|controls|declare|default|defaultChecked|defaultMuted|defaultSelected|defer|disabled|enabled|formNoValidate|hidden|indeterminate|inert|isMap|itemScope|loop|multiple|muted|noHref|noResize|noShade|noValidate|noWrap|open|pauseOnExit|readOnly|required|reversed|scoped|seamless|selected|sortable|translate|trueSpeed|typeMustMatch|visible)$/i, bl = /^(?:area|base|br|col|command|doctype|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i, wl = {
    quot: 34,
    amp: 38,
    apos: 39,
    lt: 60,
    gt: 62,
    nbsp: 160,
    iexcl: 161,
    cent: 162,
    pound: 163,
    curren: 164,
    yen: 165,
    brvbar: 166,
    sect: 167,
    uml: 168,
    copy: 169,
    ordf: 170,
    laquo: 171,
    not: 172,
    shy: 173,
    reg: 174,
    macr: 175,
    deg: 176,
    plusmn: 177,
    sup2: 178,
    sup3: 179,
    acute: 180,
    micro: 181,
    para: 182,
    middot: 183,
    cedil: 184,
    sup1: 185,
    ordm: 186,
    raquo: 187,
    frac14: 188,
    frac12: 189,
    frac34: 190,
    iquest: 191,
    Agrave: 192,
    Aacute: 193,
    Acirc: 194,
    Atilde: 195,
    Auml: 196,
    Aring: 197,
    AElig: 198,
    Ccedil: 199,
    Egrave: 200,
    Eacute: 201,
    Ecirc: 202,
    Euml: 203,
    Igrave: 204,
    Iacute: 205,
    Icirc: 206,
    Iuml: 207,
    ETH: 208,
    Ntilde: 209,
    Ograve: 210,
    Oacute: 211,
    Ocirc: 212,
    Otilde: 213,
    Ouml: 214,
    times: 215,
    Oslash: 216,
    Ugrave: 217,
    Uacute: 218,
    Ucirc: 219,
    Uuml: 220,
    Yacute: 221,
    THORN: 222,
    szlig: 223,
    agrave: 224,
    aacute: 225,
    acirc: 226,
    atilde: 227,
    auml: 228,
    aring: 229,
    aelig: 230,
    ccedil: 231,
    egrave: 232,
    eacute: 233,
    ecirc: 234,
    euml: 235,
    igrave: 236,
    iacute: 237,
    icirc: 238,
    iuml: 239,
    eth: 240,
    ntilde: 241,
    ograve: 242,
    oacute: 243,
    ocirc: 244,
    otilde: 245,
    ouml: 246,
    divide: 247,
    oslash: 248,
    ugrave: 249,
    uacute: 250,
    ucirc: 251,
    uuml: 252,
    yacute: 253,
    thorn: 254,
    yuml: 255,
    OElig: 338,
    oelig: 339,
    Scaron: 352,
    scaron: 353,
    Yuml: 376,
    fnof: 402,
    circ: 710,
    tilde: 732,
    Alpha: 913,
    Beta: 914,
    Gamma: 915,
    Delta: 916,
    Epsilon: 917,
    Zeta: 918,
    Eta: 919,
    Theta: 920,
    Iota: 921,
    Kappa: 922,
    Lambda: 923,
    Mu: 924,
    Nu: 925,
    Xi: 926,
    Omicron: 927,
    Pi: 928,
    Rho: 929,
    Sigma: 931,
    Tau: 932,
    Upsilon: 933,
    Phi: 934,
    Chi: 935,
    Psi: 936,
    Omega: 937,
    alpha: 945,
    beta: 946,
    gamma: 947,
    delta: 948,
    epsilon: 949,
    zeta: 950,
    eta: 951,
    theta: 952,
    iota: 953,
    kappa: 954,
    lambda: 955,
    mu: 956,
    nu: 957,
    xi: 958,
    omicron: 959,
    pi: 960,
    rho: 961,
    sigmaf: 962,
    sigma: 963,
    tau: 964,
    upsilon: 965,
    phi: 966,
    chi: 967,
    psi: 968,
    omega: 969,
    thetasym: 977,
    upsih: 978,
    piv: 982,
    ensp: 8194,
    emsp: 8195,
    thinsp: 8201,
    zwnj: 8204,
    zwj: 8205,
    lrm: 8206,
    rlm: 8207,
    ndash: 8211,
    mdash: 8212,
    lsquo: 8216,
    rsquo: 8217,
    sbquo: 8218,
    ldquo: 8220,
    rdquo: 8221,
    bdquo: 8222,
    dagger: 8224,
    Dagger: 8225,
    bull: 8226,
    hellip: 8230,
    permil: 8240,
    prime: 8242,
    Prime: 8243,
    lsaquo: 8249,
    rsaquo: 8250,
    oline: 8254,
    frasl: 8260,
    euro: 8364,
    image: 8465,
    weierp: 8472,
    real: 8476,
    trade: 8482,
    alefsym: 8501,
    larr: 8592,
    uarr: 8593,
    rarr: 8594,
    darr: 8595,
    harr: 8596,
    crarr: 8629,
    lArr: 8656,
    uArr: 8657,
    rArr: 8658,
    dArr: 8659,
    hArr: 8660,
    forall: 8704,
    part: 8706,
    exist: 8707,
    empty: 8709,
    nabla: 8711,
    isin: 8712,
    notin: 8713,
    ni: 8715,
    prod: 8719,
    sum: 8721,
    minus: 8722,
    lowast: 8727,
    radic: 8730,
    prop: 8733,
    infin: 8734,
    ang: 8736,
    and: 8743,
    or: 8744,
    cap: 8745,
    cup: 8746,
    "int": 8747,
    there4: 8756,
    sim: 8764,
    cong: 8773,
    asymp: 8776,
    ne: 8800,
    equiv: 8801,
    le: 8804,
    ge: 8805,
    sub: 8834,
    sup: 8835,
    nsub: 8836,
    sube: 8838,
    supe: 8839,
    oplus: 8853,
    otimes: 8855,
    perp: 8869,
    sdot: 8901,
    lceil: 8968,
    rceil: 8969,
    lfloor: 8970,
    rfloor: 8971,
    lang: 9001,
    rang: 9002,
    loz: 9674,
    spades: 9824,
    clubs: 9827,
    hearts: 9829,
    diams: 9830
  }, xl = [8364, 129, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, 141, 381, 143, 144, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, 157, 382, 376], kl = new RegExp("&(#?(?:x[\\w\\d]+|\\d+|" + Object.keys(wl).join("|") + "));?", "g"), El = /</g, _l = />/g, Al = /&/g;
  var Xl,
      tf,
      ef,
      nf,
      rf,
      sf,
      of,
      af = /^\s*\r?\n/,
      uf = /\r?\n\s*$/,
      hf = function(t) {
        var e,
            n,
            i,
            r,
            s;
        for (e = 1; e < t.length; e += 1)
          n = t[e], i = t[e - 1], r = t[e - 2], Ce(n) && Oe(i) && Ce(r) && uf.test(r) && af.test(n) && (t[e - 2] = r.replace(uf, "\n"), t[e] = n.replace(af, "")), Pe(n) && Ce(i) && uf.test(i) && Ce(n.f[0]) && af.test(n.f[0]) && (t[e - 1] = i.replace(uf, "\n"), n.f[0] = n.f[0].replace(af, "")), Ce(n) && Pe(i) && (s = D(i.f), Ce(s) && uf.test(s) && af.test(n) && (i.f[i.f.length - 1] = s.replace(uf, "\n"), t[e] = n.replace(af, "")));
        return t;
      },
      cf = function(t, e, n) {
        var i;
        e && (i = t[0], "string" == typeof i && (i = i.replace(e, ""), i ? t[0] = i : t.shift())), n && (i = D(t), "string" == typeof i && (i = i.replace(n, ""), i ? t[t.length - 1] = i : t.pop()));
      },
      lf = Te,
      ff = /[ \t\f\r\n]+/g,
      df = /^(?:pre|script|style|textarea)$/i,
      pf = /^[ \t\f\r\n]+/,
      mf = /[ \t\f\r\n]+$/,
      vf = /^(?:\r\n|\r|\n)/,
      gf = /(?:\r\n|\r|\n)$/,
      yf = Fe,
      bf = /^([a-zA-Z]{1,}:?[a-zA-Z0-9\-]*)\s*\>/,
      wf = function(t, e) {
        var n,
            i,
            r;
        for (n = e.length; n--; ) {
          if (i = t.indexOf(e[n]), !i)
            return 0;
          -1 !== i && (!r || r > i) && (r = i);
        }
        return r || -1;
      },
      xf = Re,
      kf = /^[^\s"'>\/=]+/,
      Ef = /^[^\s"'=<>`]+/;
  tf = {
    "true": !0,
    "false": !1,
    undefined: void 0,
    "null": null
  }, ef = new RegExp("^(?:" + Object.keys(tf).join("|") + ")"), nf = /^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/, rf = /\$\{([^\}]+)\}/g, sf = /^\$\{([^\}]+)\}/, of = /^\s*$/, Xl = Qh.extend({
    init: function(t, e) {
      this.values = e.values, this.allowWhitespace();
    },
    postProcess: function(t) {
      return 1 === t.length && of.test(this.leftover) ? {value: t[0].v} : null;
    },
    converters: [function(t) {
      var e;
      return t.values ? (e = t.matchPattern(sf), e && t.values.hasOwnProperty(e) ? {v: t.values[e]} : void 0) : null;
    }, function(t) {
      var e;
      return (e = t.matchPattern(ef)) ? {v: tf[e]} : void 0;
    }, function(t) {
      var e;
      return (e = t.matchPattern(nf)) ? {v: +e} : void 0;
    }, function(t) {
      var e,
          n = Kc(t);
      return n && (e = t.values) ? {v: n.v.replace(rf, function(t, n) {
          return n in e ? e[n] : n;
        })} : n;
    }, function(t) {
      var e,
          n;
      if (!t.matchString("{"))
        return null;
      if (e = {}, t.allowWhitespace(), t.matchString("}"))
        return {v: e};
      for (; n = Ve(t); ) {
        if (e[n.key] = n.value, t.allowWhitespace(), t.matchString("}"))
          return {v: e};
        if (!t.matchString(","))
          return null;
      }
      return null;
    }, function(t) {
      var e,
          n;
      if (!t.matchString("["))
        return null;
      if (e = [], t.allowWhitespace(), t.matchString("]"))
        return {v: e};
      for (; n = t.read(); ) {
        if (e.push(n.v), t.allowWhitespace(), t.matchString("]"))
          return {v: e};
        if (!t.matchString(","))
          return null;
        t.allowWhitespace();
      }
      return null;
    }]
  });
  var _f,
      Af = function(t, e) {
        var n = new Xl(t, {values: e});
        return n.result;
      },
      Sf = Me,
      Cf = /^([a-zA-Z_$][a-zA-Z_$0-9]*)\(/,
      Of = /\)\s*$/;
  _f = Qh.extend({converters: [Ol]});
  var Pf,
      Tf = /^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/,
      Ff = /^[\s\n\/>]/,
      Rf = /^on/,
      jf = /^on-([a-zA-Z\\*\\.$_][a-zA-Z\\*\\.$_0-9\-]+)$/,
      Nf = /^(?:change|reset|teardown|update|construct|config|init|render|unrender|detach|insert)$/,
      Df = {
        "intro-outro": "t0",
        intro: "t1",
        outro: "t2",
        decorator: "o"
      },
      If = {exclude: !0};
  Pf = {
    li: ["li"],
    dt: ["dt", "dd"],
    dd: ["dt", "dd"],
    p: "address article aside blockquote div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol p pre section table ul".split(" "),
    rt: ["rt", "rp"],
    rp: ["rt", "rp"],
    optgroup: ["optgroup"],
    option: ["option", "optgroup"],
    thead: ["tbody", "tfoot"],
    tbody: ["tbody", "tfoot"],
    tfoot: ["tbody"],
    tr: ["tr", "tbody"],
    td: ["td", "th", "tr"],
    th: ["td", "th", "tr"]
  };
  var Lf,
      Vf = Ue,
      Mf = ze,
      Uf = Be,
      Wf = /[-\/\\^$*+?.()|[\]{}]/g,
      zf = qe,
      Bf = /^<!--\s*/,
      qf = /s*>\s*([a-zA-Z_$][-a-zA-Z_$0-9]*)\s*/,
      $f = /\s*-->/,
      Qf = $e,
      Zf = /^#\s*partial\s+/,
      Hf = Qe,
      Kf = Ze,
      Gf = [Nl, jl, Ql, Vl, Ll, Dl],
      Yf = [Rl],
      Jf = [jl, Ql, Ll],
      Xf = void 0,
      td = [Lc, Gl, Vf, Mf],
      ed = [zf, Qf];
  Xf = Qh.extend({
    init: function(t, e) {
      var n = e.tripleDelimiters || ["{{{", "}}}"],
          i = e.staticDelimiters || ["[[", "]]"],
          r = e.staticTripleDelimiters || ["[[[", "]]]"];
      this.standardDelimiters = e.delimiters || ["{{", "}}"], this.tags = [{
        isStatic: !1,
        isTriple: !1,
        open: this.standardDelimiters[0],
        close: this.standardDelimiters[1],
        readers: Gf
      }, {
        isStatic: !1,
        isTriple: !0,
        open: n[0],
        close: n[1],
        readers: Yf
      }, {
        isStatic: !0,
        isTriple: !1,
        open: i[0],
        close: i[1],
        readers: Jf
      }, {
        isStatic: !0,
        isTriple: !0,
        open: r[0],
        close: r[1],
        readers: Yf
      }], this.sortMustacheTags(), this.sectionDepth = 0, this.elementStack = [], this.interpolate = {
        script: !e.interpolate || e.interpolate.script !== !1,
        style: !e.interpolate || e.interpolate.style !== !1
      }, e.sanitize === !0 && (e.sanitize = {
        elements: "applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title".split(" "),
        eventAttributes: !0
      }), this.stripComments = e.stripComments !== !1, this.preserveWhitespace = e.preserveWhitespace, this.sanitizeElements = e.sanitize && e.sanitize.elements, this.sanitizeEventAttributes = e.sanitize && e.sanitize.eventAttributes, this.includeLinePositions = e.includeLinePositions;
    },
    postProcess: function(t) {
      return t.length ? (this.sectionDepth > 0 && this.error("A section was left open"), lf(t[0].t, this.stripComments, this.preserveWhitespace, !this.preserveWhitespace, !this.preserveWhitespace), t[0]) : {
        t: [],
        v: oa
      };
    },
    converters: [Hf],
    sortMustacheTags: function() {
      this.tags.sort(function(t, e) {
        return e.open.length - t.open.length;
      });
    }
  });
  var nd,
      id,
      rd,
      sd = ["preserveWhitespace", "sanitize", "stripComments", "delimiters", "tripleDelimiters", "interpolate"],
      od = {
        fromId: Ge,
        isHashedId: Ye,
        isParsed: Je,
        getParseOptions: Xe,
        createHelper: He,
        parse: Ke
      },
      ad = od,
      ud = {
        name: "template",
        extend: function(t, e, n) {
          var i;
          "template" in n && (i = n.template, e.template = "function" == typeof i ? i : rn(i, e));
        },
        init: function(t, e, n) {
          var i,
              r;
          i = "template" in n ? n.template : t.prototype.template, "function" == typeof i && (r = i, i = en(e, r), e._config.template = {
            fn: r,
            result: i
          }), i = rn(i, e), e.template = i.t, i.p && sn(e.partials, i.p);
        },
        reset: function(t) {
          var e,
              n = tn(t);
          return n ? (e = rn(n, t), t.template = e.t, sn(t.partials, e.p, !0), !0) : void 0;
        }
      },
      hd = ud;
  nd = ["adaptors", "components", "computed", "decorators", "easing", "events", "interpolators", "partials", "transitions"], id = function(t, e) {
    this.name = t, this.useDefaults = e;
  }, id.prototype = {
    constructor: id,
    extend: function(t, e, n) {
      this.configure(this.useDefaults ? t.defaults : t, this.useDefaults ? e : e.constructor, n);
    },
    init: function() {},
    configure: function(t, e, n) {
      var i,
          r = this.name,
          s = n[r];
      i = wa(t[r]);
      for (var o in s)
        i[o] = s[o];
      e[r] = i;
    },
    reset: function(t) {
      var e = t[this.name],
          n = !1;
      return Object.keys(e).forEach(function(t) {
        var i = e[t];
        i._fn && (i._fn.isOwner ? e[t] = i._fn : delete e[t], n = !0);
      }), n;
    }
  }, rd = nd.map(function(t) {
    return new id(t, "computed" === t);
  });
  var cd,
      ld,
      fd,
      dd,
      pd,
      md,
      vd = rd,
      gd = on,
      yd = cn;
  dd = {
    adapt: Th,
    css: Mh,
    data: Wh,
    template: hd
  }, fd = Object.keys(ua), md = dn(fd.filter(function(t) {
    return !dd[t];
  })), pd = dn(fd.concat(vd.map(function(t) {
    return t.name;
  }))), ld = [].concat(fd.filter(function(t) {
    return !vd[t] && !dd[t];
  }), vd, dd.data, dd.template, dd.css), cd = {
    extend: function(t, e, n) {
      return ln("extend", t, e, n);
    },
    init: function(t, e, n) {
      return ln("init", t, e, n);
    },
    reset: function(t) {
      return ld.filter(function(e) {
        return e.reset && e.reset(t);
      }).map(function(t) {
        return t.name;
      });
    },
    order: ld
  };
  var bd = cd,
      wd = pn,
      xd = mn,
      kd = vn,
      Ed = gn,
      _d = yn,
      Ad = bn,
      Sd = wn,
      Cd = xn,
      Od = kn,
      Pd = En,
      Td = _n,
      Fd = An,
      Rd = function() {
        return e(this.node);
      },
      jd = function(t) {
        this.type = Zh, this.text = t.template;
      };
  jd.prototype = {
    detach: Rd,
    firstNode: function() {
      return this.node;
    },
    render: function() {
      return this.node || (this.node = document.createTextNode(this.text)), this.node;
    },
    toString: function(t) {
      return t ? Se(this.text) : this.text;
    },
    unrender: function(t) {
      return t ? this.detach() : void 0;
    }
  };
  var Nd = jd,
      Dd = Sn,
      Id = Cn,
      Ld = function(t, e, n) {
        var i;
        this.ref = e, this.resolved = !1, this.root = t.root, this.parentFragment = t.parentFragment, this.callback = n, i = uu(t.root, e, t.parentFragment), void 0 != i ? this.resolve(i) : mu.addUnresolved(this);
      };
  Ld.prototype = {
    resolve: function(t) {
      this.keypath && !t && mu.addUnresolved(this), this.resolved = !0, this.keypath = t, this.callback(t);
    },
    forceResolution: function() {
      this.resolve(_(this.ref));
    },
    rebind: function(t, e) {
      var n;
      void 0 != this.keypath && (n = this.keypath.replace(t, e), void 0 !== n && this.resolve(n));
    },
    unbind: function() {
      this.resolved || mu.removeUnresolved(this);
    }
  };
  var Vd = Ld,
      Md = function(t, e, n) {
        this.parentFragment = t.parentFragment, this.ref = e, this.callback = n, this.rebind();
      },
      Ud = {
        "@keypath": {
          prefix: "c",
          prop: ["context"]
        },
        "@index": {
          prefix: "i",
          prop: ["index"]
        },
        "@key": {
          prefix: "k",
          prop: ["key", "index"]
        }
      };
  Md.prototype = {
    rebind: function() {
      var t,
          e = this.ref,
          n = this.parentFragment,
          i = Ud[e];
      if (!i)
        throw new Error('Unknown special reference "' + e + '" - valid references are @index, @key and @keypath');
      if (this.cached)
        return this.callback(_("@" + i.prefix + On(this.cached, i)));
      if (-1 !== i.prop.indexOf("index") || -1 !== i.prop.indexOf("key"))
        for (; n; ) {
          if (n.owner.currentSubtype === Cc && void 0 !== (t = On(n, i)))
            return this.cached = n, n.registerIndexRef(this), this.callback(_("@" + i.prefix + t));
          n = !n.parent && n.owner && n.owner.component && n.owner.component.parentFragment && !n.owner.component.instance.isolated ? n.owner.component.parentFragment : n.parent;
        }
      else
        for (; n; ) {
          if (void 0 !== (t = On(n, i)))
            return this.callback(_("@" + i.prefix + t.str));
          n = n.parent;
        }
    },
    unbind: function() {
      this.cached && this.cached.unregisterIndexRef(this);
    }
  };
  var Wd = Md,
      zd = function(t, e, n) {
        this.parentFragment = t.parentFragment, this.ref = e, this.callback = n, e.ref.fragment.registerIndexRef(this), this.rebind();
      };
  zd.prototype = {
    rebind: function() {
      var t,
          e = this.ref.ref;
      t = "k" === e.ref.t ? "k" + e.fragment.key : "i" + e.fragment.index, void 0 !== t && this.callback(_("@" + t));
    },
    unbind: function() {
      this.ref.ref.fragment.unregisterIndexRef(this);
    }
  };
  var Bd = zd,
      qd = Pn;
  Pn.resolve = function(t) {
    var e,
        n,
        i = {};
    for (e in t.refs)
      n = t.refs[e], i[n.ref.n] = "k" === n.ref.t ? n.fragment.key : n.fragment.index;
    return i;
  };
  var $d,
      Qd = Tn,
      Zd = Fn,
      Hd = {},
      Kd = Function.prototype.bind;
  $d = function(t, e, n, i) {
    var r,
        s = this;
    r = t.root, this.root = r, this.parentFragment = e, this.callback = i, this.owner = t, this.str = n.s, this.keypaths = [], this.pending = n.r.length, this.refResolvers = n.r.map(function(t, e) {
      return Qd(s, t, function(t) {
        s.resolve(e, t);
      });
    }), this.ready = !0, this.bubble();
  }, $d.prototype = {
    bubble: function() {
      this.ready && (this.uniqueString = jn(this.str, this.keypaths), this.keypath = Nn(this.uniqueString), this.createEvaluator(), this.callback(this.keypath));
    },
    unbind: function() {
      for (var t; t = this.refResolvers.pop(); )
        t.unbind();
    },
    resolve: function(t, e) {
      this.keypaths[t] = e, this.bubble();
    },
    createEvaluator: function() {
      var t,
          e,
          n,
          i,
          r,
          s = this;
      i = this.keypath, t = this.root.viewmodel.computations[i.str], t ? this.root.viewmodel.mark(i) : (r = Zd(this.str, this.refResolvers.length), e = this.keypaths.map(function(t) {
        var e;
        return "undefined" === t ? function() {
          return void 0;
        } : t.isSpecial ? (e = t.value, function() {
          return e;
        }) : function() {
          var e = s.root.viewmodel.get(t, {
            noUnwrap: !0,
            fullRootGet: !0
          });
          return "function" == typeof e && (e = In(e, s.root)), e;
        };
      }), n = {
        deps: this.keypaths.filter(Dn),
        getter: function() {
          var t = e.map(Rn);
          return r.apply(null, t);
        }
      }, t = this.root.viewmodel.compute(i, n));
    },
    rebind: function(t, e) {
      this.refResolvers.forEach(function(n) {
        return n.rebind(t, e);
      });
    }
  };
  var Gd = $d,
      Yd = function(t, e, n) {
        var i = this;
        this.resolver = e, this.root = e.root, this.parentFragment = n, this.viewmodel = e.root.viewmodel, "string" == typeof t ? this.value = t : t.t === gc ? this.refResolver = Qd(this, t.n, function(t) {
          i.resolve(t);
        }) : new Gd(e, n, t, function(t) {
          i.resolve(t);
        });
      };
  Yd.prototype = {
    resolve: function(t) {
      this.keypath && this.viewmodel.unregister(this.keypath, this), this.keypath = t, this.value = this.viewmodel.get(t), this.bind(), this.resolver.bubble();
    },
    bind: function() {
      this.viewmodel.register(this.keypath, this);
    },
    rebind: function(t, e) {
      this.refResolver && this.refResolver.rebind(t, e);
    },
    setValue: function(t) {
      this.value = t, this.resolver.bubble();
    },
    unbind: function() {
      this.keypath && this.viewmodel.unregister(this.keypath, this), this.refResolver && this.refResolver.unbind();
    },
    forceResolution: function() {
      this.refResolver && this.refResolver.forceResolution();
    }
  };
  var Jd = Yd,
      Xd = function(t, e, n) {
        var i,
            r,
            s,
            o,
            a = this;
        this.parentFragment = o = t.parentFragment, this.root = i = t.root, this.mustache = t, this.ref = r = e.r, this.callback = n, this.unresolved = [], (s = uu(i, r, o)) ? this.base = s : this.baseResolver = new Vd(this, r, function(t) {
          a.base = t, a.baseResolver = null, a.bubble();
        }), this.members = e.m.map(function(t) {
          return new Jd(t, a, o);
        }), this.ready = !0, this.bubble();
      };
  Xd.prototype = {
    getKeypath: function() {
      var t = this.members.map(Ln);
      return !t.every(Vn) || this.baseResolver ? null : this.base.join(t.join("."));
    },
    bubble: function() {
      this.ready && !this.baseResolver && this.callback(this.getKeypath());
    },
    unbind: function() {
      this.members.forEach(Z);
    },
    rebind: function(t, e) {
      var n;
      if (this.base) {
        var i = this.base.replace(t, e);
        i && i !== this.base && (this.base = i, n = !0);
      }
      this.members.forEach(function(i) {
        i.rebind(t, e) && (n = !0);
      }), n && this.bubble();
    },
    forceResolution: function() {
      this.baseResolver && (this.base = _(this.ref), this.baseResolver.unbind(), this.baseResolver = null), this.members.forEach(Mn), this.bubble();
    }
  };
  var tp = Xd,
      ep = Un,
      np = Wn,
      ip = zn,
      rp = {
        getValue: Id,
        init: ep,
        resolve: np,
        rebind: ip
      },
      sp = function(t) {
        this.type = Hh, rp.init(this, t);
      };
  sp.prototype = {
    update: function() {
      this.node.data = void 0 == this.value ? "" : this.value;
    },
    resolve: rp.resolve,
    rebind: rp.rebind,
    detach: Rd,
    unbind: Dd,
    render: function() {
      return this.node || (this.node = document.createTextNode(n(this.value))), this.node;
    },
    unrender: function(t) {
      t && e(this.node);
    },
    getValue: rp.getValue,
    setValue: function(t) {
      var e;
      this.keypath && (e = this.root.viewmodel.wrapped[this.keypath.str]) && (t = e.get()), a(t, this.value) || (this.value = t, this.parentFragment.bubble(), this.node && mu.addView(this));
    },
    firstNode: function() {
      return this.node;
    },
    toString: function(t) {
      var e = "" + n(this.value);
      return t ? Se(e) : e;
    }
  };
  var op = sp,
      ap = Bn,
      up = qn,
      hp = $n,
      cp = Qn,
      lp = Zn,
      fp = Hn,
      dp = Kn,
      pp = Gn,
      mp = Yn,
      vp = function(t, e) {
        rp.rebind.call(this, t, e);
      },
      gp = Xn,
      yp = ti,
      bp = li,
      wp = fi,
      xp = di,
      kp = vi,
      Ep = function(t) {
        this.type = Gh, this.subtype = this.currentSubtype = t.template.n, this.inverted = this.subtype === Sc, this.pElement = t.pElement, this.fragments = [], this.fragmentsToCreate = [], this.fragmentsToRender = [], this.fragmentsToUnrender = [], t.template.i && (this.indexRefs = t.template.i.split(",").map(function(t, e) {
          return {
            n: t,
            t: 0 === e ? "k" : "i"
          };
        })), this.renderedFragments = [], this.length = 0, rp.init(this, t);
      };
  Ep.prototype = {
    bubble: ap,
    detach: up,
    find: hp,
    findAll: cp,
    findAllComponents: lp,
    findComponent: fp,
    findNextNode: dp,
    firstNode: pp,
    getIndexRef: function(t) {
      if (this.indexRefs)
        for (var e = this.indexRefs.length; e--; ) {
          var n = this.indexRefs[e];
          if (n.n === t)
            return n;
        }
    },
    getValue: rp.getValue,
    shuffle: mp,
    rebind: vp,
    render: gp,
    resolve: rp.resolve,
    setValue: yp,
    toString: bp,
    unbind: wp,
    unrender: xp,
    update: kp
  };
  var _p,
      Ap,
      Sp = Ep,
      Cp = gi,
      Op = yi,
      Pp = bi,
      Tp = wi,
      Fp = {};
  try {
    la("table").innerHTML = "foo";
  } catch (_a) {
    _p = !0, Ap = {
      TABLE: ['<table class="x">', "</table>"],
      THEAD: ['<table><thead class="x">', "</thead></table>"],
      TBODY: ['<table><tbody class="x">', "</tbody></table>"],
      TR: ['<table><tr class="x">', "</tr></table>"],
      SELECT: ['<select class="x">', "</select>"]
    };
  }
  var Rp = function(t, e, n) {
    var i,
        r,
        s,
        o,
        a,
        u = [];
    if (null != t && "" !== t) {
      for (_p && (r = Ap[e.tagName]) ? (i = xi("DIV"), i.innerHTML = r[0] + t + r[1], i = i.querySelector(".x"), "SELECT" === i.tagName && (s = i.options[i.selectedIndex])) : e.namespaceURI === ia.svg ? (i = xi("DIV"), i.innerHTML = '<svg class="x">' + t + "</svg>", i = i.querySelector(".x")) : (i = xi(e.tagName), i.innerHTML = t, "SELECT" === i.tagName && (s = i.options[i.selectedIndex])); o = i.firstChild; )
        u.push(o), n.appendChild(o);
      if ("SELECT" === e.tagName)
        for (a = u.length; a--; )
          u[a] !== s && (u[a].selected = !1);
    }
    return u;
  },
      jp = ki,
      Np = _i,
      Dp = Ai,
      Ip = Si,
      Lp = Ci,
      Vp = Oi,
      Mp = function(t) {
        this.type = Kh, rp.init(this, t);
      };
  Mp.prototype = {
    detach: Cp,
    find: Op,
    findAll: Pp,
    firstNode: Tp,
    getValue: rp.getValue,
    rebind: rp.rebind,
    render: Np,
    resolve: rp.resolve,
    setValue: Dp,
    toString: Ip,
    unbind: Dd,
    unrender: Lp,
    update: Vp
  };
  var Up,
      Wp,
      zp,
      Bp,
      qp = Mp,
      $p = function() {
        this.parentFragment.bubble();
      },
      Qp = Pi,
      Zp = function(t) {
        return this.node ? fa(this.node, t) ? this.node : this.fragment && this.fragment.find ? this.fragment.find(t) : void 0 : null;
      },
      Hp = function(t, e) {
        e._test(this, !0) && e.live && (this.liveQueries || (this.liveQueries = [])).push(e), this.fragment && this.fragment.findAll(t, e);
      },
      Kp = function(t, e) {
        this.fragment && this.fragment.findAllComponents(t, e);
      },
      Gp = function(t) {
        return this.fragment ? this.fragment.findComponent(t) : void 0;
      },
      Yp = Ti,
      Jp = Fi,
      Xp = Ri,
      tm = /^true|on|yes|1$/i,
      em = /^[0-9]+$/,
      nm = function(t, e) {
        var n,
            i,
            r;
        return r = e.a || {}, i = {}, n = r.twoway, void 0 !== n && (i.twoway = 0 === n || tm.test(n)), n = r.lazy, void 0 !== n && (i.lazy = 0 !== n && em.test(n) ? parseInt(n) : 0 === n || tm.test(n)), i;
      },
      im = ji;
  Up = "altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath vkern".split(" "), Wp = "attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" "), zp = function(t) {
    for (var e = {},
        n = t.length; n--; )
      e[t[n].toLowerCase()] = t[n];
    return e;
  }, Bp = zp(Up.concat(Wp));
  var rm = function(t) {
    var e = t.toLowerCase();
    return Bp[e] || e;
  },
      sm = function(t, e) {
        var n,
            i;
        if (n = e.indexOf(":"), -1 === n || (i = e.substr(0, n), "xmlns" === i))
          t.name = t.element.namespace !== ia.html ? rm(e) : e;
        else if (e = e.substring(n + 1), t.name = rm(e), t.namespace = ia[i.toLowerCase()], t.namespacePrefix = i, !t.namespace)
          throw 'Unknown namespace ("' + i + '")';
      },
      om = Ni,
      am = Di,
      um = Ii,
      hm = Li,
      cm = {
        "accept-charset": "acceptCharset",
        accesskey: "accessKey",
        bgcolor: "bgColor",
        "class": "className",
        codebase: "codeBase",
        colspan: "colSpan",
        contenteditable: "contentEditable",
        datetime: "dateTime",
        dirname: "dirName",
        "for": "htmlFor",
        "http-equiv": "httpEquiv",
        ismap: "isMap",
        maxlength: "maxLength",
        novalidate: "noValidate",
        pubdate: "pubDate",
        readonly: "readOnly",
        rowspan: "rowSpan",
        tabindex: "tabIndex",
        usemap: "useMap"
      },
      lm = Vi,
      fm = Ui,
      dm = Wi,
      pm = zi,
      mm = Bi,
      vm = qi,
      gm = $i,
      ym = Qi,
      bm = Zi,
      wm = Hi,
      xm = Ki,
      km = Gi,
      Em = Yi,
      _m = Ji,
      Am = Xi,
      Sm = function(t) {
        this.init(t);
      };
  Sm.prototype = {
    bubble: im,
    init: am,
    rebind: um,
    render: hm,
    toString: lm,
    unbind: fm,
    update: Am
  };
  var Cm,
      Om = Sm,
      Pm = function(t, e) {
        var n,
            i,
            r = [];
        for (n in e)
          "twoway" !== n && "lazy" !== n && e.hasOwnProperty(n) && (i = new Om({
            element: t,
            name: n,
            value: e[n],
            root: t.root
          }), r[n] = i, "value" !== n && r.push(i));
        return (i = r.value) && r.push(i), r;
      };
  "undefined" != typeof document && (Cm = la("div"));
  var Tm = function(t, e) {
    this.element = t, this.root = t.root, this.parentFragment = t.parentFragment, this.attributes = [], this.fragment = new yb({
      root: t.root,
      owner: this,
      template: [e]
    });
  };
  Tm.prototype = {
    bubble: function() {
      this.node && this.update(), this.element.bubble();
    },
    rebind: function(t, e) {
      this.fragment.rebind(t, e);
    },
    render: function(t) {
      this.node = t, this.isSvg = t.namespaceURI === ia.svg, this.update();
    },
    unbind: function() {
      this.fragment.unbind();
    },
    update: function() {
      var t,
          e,
          n = this;
      t = this.fragment.toString(), e = tr(t, this.isSvg), this.attributes.filter(function(t) {
        return er(e, t);
      }).forEach(function(t) {
        n.node.removeAttribute(t.name);
      }), e.forEach(function(t) {
        n.node.setAttribute(t.name, t.value);
      }), this.attributes = e;
    },
    toString: function() {
      return this.fragment.toString();
    }
  };
  var Fm = Tm,
      Rm = function(t, e) {
        return e ? e.map(function(e) {
          return new Fm(t, e);
        }) : [];
      },
      jm = function(t) {
        var e,
            n,
            i,
            r;
        if (this.element = t, this.root = t.root, this.attribute = t.attributes[this.name || "value"], e = this.attribute.interpolator, e.twowayBinding = this, n = e.keypath) {
          if ("}" === n.str.slice(-1))
            return v("Two-way binding does not work with expressions (`%s` on <%s>)", e.resolver.uniqueString, t.name, {ractive: this.root}), !1;
          if (n.isSpecial)
            return v("Two-way binding does not work with %s", e.resolver.ref, {ractive: this.root}), !1;
        } else {
          var s = e.template.r ? "'" + e.template.r + "' reference" : "expression";
          m("The %s being used for two-way binding is ambiguous, and may cause unexpected results. Consider initialising your data to eliminate the ambiguity", s, {ractive: this.root}), e.resolver.forceResolution(), n = e.keypath;
        }
        this.attribute.isTwoway = !0, this.keypath = n, i = this.root.viewmodel.get(n), void 0 === i && this.getInitialValue && (i = this.getInitialValue(), void 0 !== i && this.root.viewmodel.set(n, i)), (r = nr(t)) && (this.resetValue = i, r.formBindings.push(this));
      };
  jm.prototype = {
    handleChange: function() {
      var t = this;
      mu.start(this.root), this.attribute.locked = !0, this.root.viewmodel.set(this.keypath, this.getValue()), mu.scheduleTask(function() {
        return t.attribute.locked = !1;
      }), mu.end();
    },
    rebound: function() {
      var t,
          e,
          n;
      e = this.keypath, n = this.attribute.interpolator.keypath, e !== n && (I(this.root._twowayBindings[e.str], this), this.keypath = n, t = this.root._twowayBindings[n.str] || (this.root._twowayBindings[n.str] = []), t.push(this));
    },
    unbind: function() {}
  }, jm.extend = function(t) {
    var e,
        n = this;
    return e = function(t) {
      jm.call(this, t), this.init && this.init();
    }, e.prototype = wa(n.prototype), i(e.prototype, t), e.extend = jm.extend, e;
  };
  var Nm,
      Dm = jm,
      Im = ir;
  Nm = Dm.extend({
    getInitialValue: function() {
      return "";
    },
    getValue: function() {
      return this.element.node.value;
    },
    render: function() {
      var t,
          e = this.element.node,
          n = !1;
      this.rendered = !0, t = this.root.lazy, this.element.lazy === !0 ? t = !0 : this.element.lazy === !1 ? t = !1 : u(this.element.lazy) ? (t = !1, n = +this.element.lazy) : u(t || "") && (n = +t, t = !1, this.element.lazy = n), this.handler = n ? sr : Im, e.addEventListener("change", Im, !1), t || (e.addEventListener("input", this.handler, !1), e.attachEvent && e.addEventListener("keyup", this.handler, !1)), e.addEventListener("blur", rr, !1);
    },
    unrender: function() {
      var t = this.element.node;
      this.rendered = !1, t.removeEventListener("change", Im, !1), t.removeEventListener("input", this.handler, !1), t.removeEventListener("keyup", this.handler, !1), t.removeEventListener("blur", rr, !1);
    }
  });
  var Lm = Nm,
      Vm = Lm.extend({
        getInitialValue: function() {
          return this.element.fragment ? this.element.fragment.toString() : "";
        },
        getValue: function() {
          return this.element.node.innerHTML;
        }
      }),
      Mm = Vm,
      Um = or,
      Wm = {},
      zm = Dm.extend({
        name: "checked",
        init: function() {
          this.siblings = Um(this.root._guid, "radio", this.element.getAttribute("name")), this.siblings.push(this);
        },
        render: function() {
          var t = this.element.node;
          t.addEventListener("change", Im, !1), t.attachEvent && t.addEventListener("click", Im, !1);
        },
        unrender: function() {
          var t = this.element.node;
          t.removeEventListener("change", Im, !1), t.removeEventListener("click", Im, !1);
        },
        handleChange: function() {
          mu.start(this.root), this.siblings.forEach(function(t) {
            t.root.viewmodel.set(t.keypath, t.getValue());
          }), mu.end();
        },
        getValue: function() {
          return this.element.node.checked;
        },
        unbind: function() {
          I(this.siblings, this);
        }
      }),
      Bm = zm,
      qm = Dm.extend({
        name: "name",
        init: function() {
          this.siblings = Um(this.root._guid, "radioname", this.keypath.str), this.siblings.push(this), this.radioName = !0;
        },
        getInitialValue: function() {
          return this.element.getAttribute("checked") ? this.element.getAttribute("value") : void 0;
        },
        render: function() {
          var t = this.element.node;
          t.name = "{{" + this.keypath.str + "}}", t.checked = this.root.viewmodel.get(this.keypath) == this.element.getAttribute("value"), t.addEventListener("change", Im, !1), t.attachEvent && t.addEventListener("click", Im, !1);
        },
        unrender: function() {
          var t = this.element.node;
          t.removeEventListener("change", Im, !1), t.removeEventListener("click", Im, !1);
        },
        getValue: function() {
          var t = this.element.node;
          return t._ractive ? t._ractive.value : t.value;
        },
        handleChange: function() {
          this.element.node.checked && Dm.prototype.handleChange.call(this);
        },
        rebound: function(t, e) {
          var n;
          Dm.prototype.rebound.call(this, t, e), (n = this.element.node) && (n.name = "{{" + this.keypath.str + "}}");
        },
        unbind: function() {
          I(this.siblings, this);
        }
      }),
      $m = qm,
      Qm = Dm.extend({
        name: "name",
        getInitialValue: function() {
          return this.noInitialValue = !0, [];
        },
        init: function() {
          var t,
              e;
          this.checkboxName = !0, this.siblings = Um(this.root._guid, "checkboxes", this.keypath.str), this.siblings.push(this), this.noInitialValue && (this.siblings.noInitialValue = !0), this.siblings.noInitialValue && this.element.getAttribute("checked") && (t = this.root.viewmodel.get(this.keypath), e = this.element.getAttribute("value"), t.push(e));
        },
        unbind: function() {
          I(this.siblings, this);
        },
        render: function() {
          var t,
              e,
              n = this.element.node;
          t = this.root.viewmodel.get(this.keypath), e = this.element.getAttribute("value"), this.isChecked = s(t) ? R(t, e) : t == e, n.name = "{{" + this.keypath.str + "}}", n.checked = this.isChecked, n.addEventListener("change", Im, !1), n.attachEvent && n.addEventListener("click", Im, !1);
        },
        unrender: function() {
          var t = this.element.node;
          t.removeEventListener("change", Im, !1), t.removeEventListener("click", Im, !1);
        },
        changed: function() {
          var t = !!this.isChecked;
          return this.isChecked = this.element.node.checked, this.isChecked === t;
        },
        handleChange: function() {
          this.isChecked = this.element.node.checked, Dm.prototype.handleChange.call(this);
        },
        getValue: function() {
          return this.siblings.filter(ar).map(ur);
        }
      }),
      Zm = Qm,
      Hm = Dm.extend({
        name: "checked",
        render: function() {
          var t = this.element.node;
          t.addEventListener("change", Im, !1), t.attachEvent && t.addEventListener("click", Im, !1);
        },
        unrender: function() {
          var t = this.element.node;
          t.removeEventListener("change", Im, !1), t.removeEventListener("click", Im, !1);
        },
        getValue: function() {
          return this.element.node.checked;
        }
      }),
      Km = Hm,
      Gm = Dm.extend({
        getInitialValue: function() {
          var t,
              e,
              n,
              i,
              r = this.element.options;
          if (void 0 === this.element.getAttribute("value") && (e = t = r.length, t)) {
            for (; e--; )
              if (r[e].getAttribute("selected")) {
                n = r[e].getAttribute("value"), i = !0;
                break;
              }
            if (!i)
              for (; ++e < t; )
                if (!r[e].getAttribute("disabled")) {
                  n = r[e].getAttribute("value");
                  break;
                }
            return void 0 !== n && (this.element.attributes.value.value = n), n;
          }
        },
        render: function() {
          this.element.node.addEventListener("change", Im, !1);
        },
        unrender: function() {
          this.element.node.removeEventListener("change", Im, !1);
        },
        setValue: function(t) {
          this.root.viewmodel.set(this.keypath, t);
        },
        getValue: function() {
          var t,
              e,
              n,
              i,
              r;
          for (t = this.element.node.options, n = t.length, e = 0; n > e; e += 1)
            if (i = t[e], t[e].selected)
              return r = i._ractive ? i._ractive.value : i.value;
        },
        forceUpdate: function() {
          var t = this,
              e = this.getValue();
          void 0 !== e && (this.attribute.locked = !0, mu.scheduleTask(function() {
            return t.attribute.locked = !1;
          }), this.root.viewmodel.set(this.keypath, e));
        }
      }),
      Ym = Gm,
      Jm = Ym.extend({
        getInitialValue: function() {
          return this.element.options.filter(function(t) {
            return t.getAttribute("selected");
          }).map(function(t) {
            return t.getAttribute("value");
          });
        },
        render: function() {
          var t;
          this.element.node.addEventListener("change", Im, !1), t = this.root.viewmodel.get(this.keypath), void 0 === t && this.handleChange();
        },
        unrender: function() {
          this.element.node.removeEventListener("change", Im, !1);
        },
        setValue: function() {
          throw new Error("TODO not implemented yet");
        },
        getValue: function() {
          var t,
              e,
              n,
              i,
              r,
              s;
          for (t = [], e = this.element.node.options, i = e.length, n = 0; i > n; n += 1)
            r = e[n], r.selected && (s = r._ractive ? r._ractive.value : r.value, t.push(s));
          return t;
        },
        handleChange: function() {
          var t,
              e,
              n;
          return t = this.attribute, e = t.value, n = this.getValue(), void 0 !== e && j(n, e) || Ym.prototype.handleChange.call(this), this;
        },
        forceUpdate: function() {
          var t = this,
              e = this.getValue();
          void 0 !== e && (this.attribute.locked = !0, mu.scheduleTask(function() {
            return t.attribute.locked = !1;
          }), this.root.viewmodel.set(this.keypath, e));
        },
        updateModel: function() {
          void 0 !== this.attribute.value && this.attribute.value.length || this.root.viewmodel.set(this.keypath, this.initialValue);
        }
      }),
      Xm = Jm,
      tv = Dm.extend({
        render: function() {
          this.element.node.addEventListener("change", Im, !1);
        },
        unrender: function() {
          this.element.node.removeEventListener("change", Im, !1);
        },
        getValue: function() {
          return this.element.node.files;
        }
      }),
      ev = tv,
      nv = Lm.extend({
        getInitialValue: function() {
          return void 0;
        },
        getValue: function() {
          var t = parseFloat(this.element.node.value);
          return isNaN(t) ? void 0 : t;
        }
      }),
      iv = hr,
      rv = lr,
      sv = fr,
      ov = dr,
      av = pr,
      uv = /^event(?:\.(.+))?/,
      hv = yr,
      cv = br,
      lv = {},
      fv = {
        touchstart: !0,
        touchmove: !0,
        touchend: !0,
        touchcancel: !0,
        touchleave: !0
      },
      dv = xr,
      pv = kr,
      mv = Er,
      vv = _r,
      gv = Ar,
      yv = function(t, e, n) {
        this.init(t, e, n);
      };
  yv.prototype = {
    bubble: rv,
    fire: sv,
    getAction: ov,
    init: av,
    listen: cv,
    rebind: dv,
    render: pv,
    resolve: mv,
    unbind: vv,
    unrender: gv
  };
  var bv = yv,
      wv = function(t, e) {
        var n,
            i,
            r,
            s,
            o = [];
        for (i in e)
          if (e.hasOwnProperty(i))
            for (r = i.split("-"), n = r.length; n--; )
              s = new bv(t, r[n], e[i]), o.push(s);
        return o;
      },
      xv = function(t, e) {
        var n,
            i,
            r,
            s = this;
        this.element = t, this.root = n = t.root, i = e.n || e, ("string" == typeof i || (r = new yb({
          template: i,
          root: n,
          owner: t
        }), i = r.toString(), r.unbind(), "" !== i)) && (e.a ? this.params = e.a : e.d && (this.fragment = new yb({
          template: e.d,
          root: n,
          owner: t
        }), this.params = this.fragment.getArgsList(), this.fragment.bubble = function() {
          this.dirtyArgs = this.dirtyValue = !0, s.params = this.getArgsList(), s.ready && s.update();
        }), this.fn = g("decorators", n, i), this.fn || l(Da(i, "decorator")));
      };
  xv.prototype = {
    init: function() {
      var t,
          e,
          n;
      if (t = this.element.node, this.params ? (n = [t].concat(this.params), e = this.fn.apply(this.root, n)) : e = this.fn.call(this.root, t), !e || !e.teardown)
        throw new Error("Decorator definition must return an object with a teardown method");
      this.actual = e, this.ready = !0;
    },
    update: function() {
      this.actual.update ? this.actual.update.apply(this.root, this.params) : (this.actual.teardown(!0), this.init());
    },
    rebind: function(t, e) {
      this.fragment && this.fragment.rebind(t, e);
    },
    teardown: function(t) {
      this.torndown = !0, this.ready && this.actual.teardown(), !t && this.fragment && this.fragment.unbind();
    }
  };
  var kv,
      Ev,
      _v,
      Av = xv,
      Sv = Rr,
      Cv = jr,
      Ov = Mr,
      Pv = function(t) {
        return t.replace(/-([a-zA-Z])/g, function(t, e) {
          return e.toUpperCase();
        });
      };
  Xo ? (Ev = {}, _v = la("div").style, kv = function(t) {
    var e,
        n,
        i;
    if (t = Pv(t), !Ev[t])
      if (void 0 !== _v[t])
        Ev[t] = t;
      else
        for (i = t.charAt(0).toUpperCase() + t.substring(1), e = sa.length; e--; )
          if (n = sa[e], void 0 !== _v[n + i]) {
            Ev[t] = n + i;
            break;
          }
    return Ev[t];
  }) : kv = null;
  var Tv,
      Fv,
      Rv = kv;
  Xo ? (Fv = window.getComputedStyle || Ea.getComputedStyle, Tv = function(t) {
    var e,
        n,
        i,
        r,
        o;
    if (e = Fv(this.node), "string" == typeof t)
      return o = e[Rv(t)], "0px" === o && (o = 0), o;
    if (!s(t))
      throw new Error("Transition$getStyle must be passed a string, or an array of strings representing CSS properties");
    for (n = {}, i = t.length; i--; )
      r = t[i], o = e[Rv(r)], "0px" === o && (o = 0), n[r] = o;
    return n;
  }) : Tv = null;
  var jv = Tv,
      Nv = function(t, e) {
        var n;
        if ("string" == typeof t)
          this.node.style[Rv(t)] = e;
        else
          for (n in t)
            t.hasOwnProperty(n) && (this.node.style[Rv(n)] = t[n]);
        return this;
      },
      Dv = function(t) {
        var e;
        this.duration = t.duration, this.step = t.step, this.complete = t.complete, "string" == typeof t.easing ? (e = t.root.easing[t.easing], e || (v(Da(t.easing, "easing")), e = Ur)) : e = "function" == typeof t.easing ? t.easing : Ur, this.easing = e, this.start = Xa(), this.end = this.start + this.duration, this.running = !0, yu.add(this);
      };
  Dv.prototype = {
    tick: function(t) {
      var e,
          n;
      return this.running ? t > this.end ? (this.step && this.step(1), this.complete && this.complete(1), !1) : (e = t - this.start, n = this.easing(e / this.duration), this.step && this.step(n), !0) : !1;
    },
    stop: function() {
      this.abort && this.abort(), this.running = !1;
    }
  };
  var Iv,
      Lv,
      Vv,
      Mv,
      Uv,
      Wv,
      zv,
      Bv,
      qv = Dv,
      $v = new RegExp("^-(?:" + sa.join("|") + ")-"),
      Qv = function(t) {
        return t.replace($v, "");
      },
      Zv = new RegExp("^(?:" + sa.join("|") + ")([A-Z])"),
      Hv = function(t) {
        var e;
        return t ? (Zv.test(t) && (t = "-" + t), e = t.replace(/[A-Z]/g, function(t) {
          return "-" + t.toLowerCase();
        })) : "";
      },
      Kv = {},
      Gv = {};
  Xo ? (Lv = la("div").style, function() {
    void 0 !== Lv.transition ? (Vv = "transition", Mv = "transitionend", Uv = !0) : void 0 !== Lv.webkitTransition ? (Vv = "webkitTransition", Mv = "webkitTransitionEnd", Uv = !0) : Uv = !1;
  }(), Vv && (Wv = Vv + "Duration", zv = Vv + "Property", Bv = Vv + "TimingFunction"), Iv = function(t, e, n, i, r) {
    setTimeout(function() {
      var s,
          o,
          a,
          u,
          h;
      u = function() {
        o && a && (t.root.fire(t.name + ":end", t.node, t.isIntro), r());
      }, s = (t.node.namespaceURI || "") + t.node.tagName, t.node.style[zv] = i.map(Rv).map(Hv).join(","), t.node.style[Bv] = Hv(n.easing || "linear"), t.node.style[Wv] = n.duration / 1e3 + "s", h = function(e) {
        var n;
        n = i.indexOf(Pv(Qv(e.propertyName))), -1 !== n && i.splice(n, 1), i.length || (t.node.removeEventListener(Mv, h, !1), a = !0, u());
      }, t.node.addEventListener(Mv, h, !1), setTimeout(function() {
        for (var r,
            c,
            l,
            f,
            d,
            p = i.length,
            v = []; p--; )
          f = i[p], r = s + f, Uv && !Gv[r] && (t.node.style[Rv(f)] = e[f], Kv[r] || (c = t.getStyle(f), Kv[r] = t.getStyle(f) != e[f], Gv[r] = !Kv[r], Gv[r] && (t.node.style[Rv(f)] = c))), (!Uv || Gv[r]) && (void 0 === c && (c = t.getStyle(f)), l = i.indexOf(f), -1 === l ? m("Something very strange happened with transitions. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!", {node: t.node}) : i.splice(l, 1), d = /[^\d]*$/.exec(e[f])[0], v.push({
            name: Rv(f),
            interpolator: La(parseFloat(c), parseFloat(e[f])),
            suffix: d
          }));
        v.length ? new qv({
          root: t.root,
          duration: n.duration,
          easing: Pv(n.easing || ""),
          step: function(e) {
            var n,
                i;
            for (i = v.length; i--; )
              n = v[i], t.node.style[n.name] = n.interpolator(e) + n.suffix;
          },
          complete: function() {
            o = !0, u();
          }
        }) : o = !0, i.length || (t.node.removeEventListener(Mv, h, !1), a = !0, u());
      }, 0);
    }, n.delay || 0);
  }) : Iv = null;
  var Yv,
      Jv,
      Xv,
      tg,
      eg,
      ng = Iv;
  if ("undefined" != typeof document) {
    if (Yv = "hidden", eg = {}, Yv in document)
      Xv = "";
    else
      for (tg = sa.length; tg--; )
        Jv = sa[tg], Yv = Jv + "Hidden", Yv in document && (Xv = Jv);
    void 0 !== Xv ? (document.addEventListener(Xv + "visibilitychange", Wr), Wr()) : ("onfocusout" in document ? (document.addEventListener("focusout", zr), document.addEventListener("focusin", Br)) : (window.addEventListener("pagehide", zr), window.addEventListener("blur", zr), window.addEventListener("pageshow", Br), window.addEventListener("focus", Br)), eg.hidden = !1);
  }
  var ig,
      rg,
      sg,
      og = eg;
  Xo ? (rg = window.getComputedStyle || Ea.getComputedStyle, ig = function(t, e, n) {
    var i,
        r = this;
    if (4 === arguments.length)
      throw new Error("t.animateStyle() returns a promise - use .then() instead of passing a callback");
    if (og.hidden)
      return this.setStyle(t, e), sg || (sg = ou.resolve());
    "string" == typeof t ? (i = {}, i[t] = e) : (i = t, n = e), n || (v('The "%s" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340', this.name), n = this);
    var s = new ou(function(t) {
      var e,
          s,
          o,
          a,
          u,
          h,
          c;
      if (!n.duration)
        return r.setStyle(i), void t();
      for (e = Object.keys(i), s = [], o = rg(r.node), u = {}, h = e.length; h--; )
        c = e[h], a = o[Rv(c)], "0px" === a && (a = 0), a != i[c] && (s.push(c), r.node.style[Rv(c)] = a);
      return s.length ? void ng(r, i, n, s, t) : void t();
    });
    return s;
  }) : ig = null;
  var ag = ig,
      ug = function(t, e) {
        return "number" == typeof t ? t = {duration: t} : "string" == typeof t ? t = "slow" === t ? {duration: 600} : "fast" === t ? {duration: 200} : {duration: 400} : t || (t = {}), r({}, t, e);
      },
      hg = qr,
      cg = function(t, e, n) {
        this.init(t, e, n);
      };
  cg.prototype = {
    init: Ov,
    start: hg,
    getStyle: jv,
    setStyle: Nv,
    animateStyle: ag,
    processParams: ug
  };
  var lg,
      fg,
      dg = cg,
      pg = Qr;
  lg = function() {
    var t = this.node,
        e = this.fragment.toString(!1);
    if (window && window.appearsToBeIELessEqual8 && (t.type = "text/css"), t.styleSheet)
      t.styleSheet.cssText = e;
    else {
      for (; t.hasChildNodes(); )
        t.removeChild(t.firstChild);
      t.appendChild(document.createTextNode(e));
    }
  }, fg = function() {
    this.node.type && "text/javascript" !== this.node.type || m("Script tag was updated. This does not cause the code to be re-evaluated!", {ractive: this.root}), this.node.text = this.fragment.toString(!1);
  };
  var mg = function() {
    var t,
        e;
    return this.template.y ? "<!DOCTYPE" + this.template.dd + ">" : (t = "<" + this.template.e, t += this.attributes.map(Jr).join("") + this.conditionalAttributes.map(Jr).join(""), "option" === this.name && Gr(this) && (t += " selected"), "input" === this.name && Yr(this) && (t += " checked"), t += ">", "textarea" === this.name && void 0 !== this.getAttribute("value") ? t += Se(this.getAttribute("value")) : void 0 !== this.getAttribute("contenteditable") && (t += this.getAttribute("value") || ""), this.fragment && (e = "script" !== this.name && "style" !== this.name, t += this.fragment.toString(e)), bl.test(this.template.e) || (t += "</" + this.template.e + ">"), t);
  },
      vg = Xr,
      gg = ts,
      yg = function(t) {
        this.init(t);
      };
  yg.prototype = {
    bubble: $p,
    detach: Qp,
    find: Zp,
    findAll: Hp,
    findAllComponents: Kp,
    findComponent: Gp,
    findNextNode: Yp,
    firstNode: Jp,
    getAttribute: Xp,
    init: Sv,
    rebind: Cv,
    render: pg,
    toString: mg,
    unbind: vg,
    unrender: gg
  };
  var bg = yg,
      wg = /^\s*$/,
      xg = /^\s*/,
      kg = function(t) {
        var e,
            n,
            i,
            r;
        return e = t.split("\n"), n = e[0], void 0 !== n && wg.test(n) && e.shift(), i = D(e), void 0 !== i && wg.test(i) && e.pop(), r = e.reduce(ns, null), r && (t = e.map(function(t) {
          return t.replace(r, "");
        }).join("\n")), t;
      },
      Eg = is,
      _g = function(t, e) {
        var n;
        return e ? n = t.split("\n").map(function(t, n) {
          return n ? e + t : t;
        }).join("\n") : t;
      },
      Ag = 'Could not find template for partial "%s"',
      Sg = function(t) {
        var e,
            n;
        e = this.parentFragment = t.parentFragment, this.root = e.root, this.type = tc, this.index = t.index, this.name = t.template.r, this.rendered = !1, this.fragment = this.fragmentToRender = this.fragmentToUnrender = null, rp.init(this, t), this.keypath || ((n = Eg(this.root, this.name, e)) ? (Dd.call(this), this.isNamed = !0, this.setTemplate(n)) : v(Ag, this.name));
      };
  Sg.prototype = {
    bubble: function() {
      this.parentFragment.bubble();
    },
    detach: function() {
      return this.fragment.detach();
    },
    find: function(t) {
      return this.fragment.find(t);
    },
    findAll: function(t, e) {
      return this.fragment.findAll(t, e);
    },
    findComponent: function(t) {
      return this.fragment.findComponent(t);
    },
    findAllComponents: function(t, e) {
      return this.fragment.findAllComponents(t, e);
    },
    firstNode: function() {
      return this.fragment.firstNode();
    },
    findNextNode: function() {
      return this.parentFragment.findNextNode(this);
    },
    getPartialName: function() {
      return this.isNamed && this.name ? this.name : void 0 === this.value ? this.name : this.value;
    },
    getValue: function() {
      return this.fragment.getValue();
    },
    rebind: function(t, e) {
      this.isNamed || ip.call(this, t, e), this.fragment && this.fragment.rebind(t, e);
    },
    render: function() {
      return this.docFrag = document.createDocumentFragment(), this.update(), this.rendered = !0, this.docFrag;
    },
    resolve: rp.resolve,
    setValue: function(t) {
      var e;
      (void 0 === t || t !== this.value) && (void 0 !== t && (e = Eg(this.root, "" + t, this.parentFragment)), !e && this.name && (e = Eg(this.root, this.name, this.parentFragment)) && (Dd.call(this), this.isNamed = !0), e || v(Ag, this.name, {ractive: this.root}), this.value = t, this.setTemplate(e || []), this.bubble(), this.rendered && mu.addView(this));
    },
    setTemplate: function(t) {
      this.fragment && (this.fragment.unbind(), this.rendered && (this.fragmentToUnrender = this.fragment)), this.fragment = new yb({
        template: t,
        root: this.root,
        owner: this,
        pElement: this.parentFragment.pElement
      }), this.fragmentToRender = this.fragment;
    },
    toString: function(t) {
      var e,
          n,
          i,
          r;
      return e = this.fragment.toString(t), n = this.parentFragment.items[this.index - 1], n && n.type === Zh ? (i = n.text.split("\n").pop(), (r = /^\s+$/.exec(i)) ? _g(e, r[0]) : e) : e;
    },
    unbind: function() {
      this.isNamed || Dd.call(this), this.fragment && this.fragment.unbind();
    },
    unrender: function(t) {
      this.rendered && (this.fragment && this.fragment.unrender(t), this.rendered = !1);
    },
    update: function() {
      var t,
          e;
      this.fragmentToUnrender && (this.fragmentToUnrender.unrender(!0), this.fragmentToUnrender = null), this.fragmentToRender && (this.docFrag.appendChild(this.fragmentToRender.render()), this.fragmentToRender = null), this.rendered && (t = this.parentFragment.getNode(), e = this.parentFragment.findNextNode(this), t.insertBefore(this.docFrag, e));
    }
  };
  var Cg,
      Og,
      Pg,
      Tg = Sg,
      Fg = us,
      Rg = hs,
      jg = new nu("detach"),
      Ng = cs,
      Dg = ls,
      Ig = fs,
      Lg = ds,
      Vg = ps,
      Mg = ms,
      Ug = function(t, e, n, i) {
        var r = t.root,
            s = t.keypath;
        i ? r.viewmodel.smartUpdate(s, e, i) : r.viewmodel.mark(s);
      },
      Wg = [],
      zg = ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"];
  zg.forEach(function(t) {
    var e = function() {
      for (var e = arguments.length,
          n = Array(e),
          i = 0; e > i; i++)
        n[i] = arguments[i];
      var r,
          s,
          o,
          a;
      for (r = mh(this, t, n), s = Array.prototype[t].apply(this, arguments), mu.start(), this._ractive.setting = !0, a = this._ractive.wrappers.length; a--; )
        o = this._ractive.wrappers[a], mu.addRactive(o.root), Ug(o, this, t, r);
      return mu.end(), this._ractive.setting = !1, s;
    };
    xa(Wg, t, {value: e});
  }), Cg = {}, Cg.__proto__ ? (Og = function(t) {
    t.__proto__ = Wg;
  }, Pg = function(t) {
    t.__proto__ = Array.prototype;
  }) : (Og = function(t) {
    var e,
        n;
    for (e = zg.length; e--; )
      n = zg[e], xa(t, n, {
        value: Wg[n],
        configurable: !0
      });
  }, Pg = function(t) {
    var e;
    for (e = zg.length; e--; )
      delete t[zg[e]];
  }), Og.unpatch = Pg;
  var Bg,
      qg,
      $g,
      Qg = Og;
  Bg = {
    filter: function(t) {
      return s(t) && (!t._ractive || !t._ractive.setting);
    },
    wrap: function(t, e, n) {
      return new qg(t, e, n);
    }
  }, qg = function(t, e, n) {
    this.root = t, this.value = e, this.keypath = _(n), e._ractive || (xa(e, "_ractive", {
      value: {
        wrappers: [],
        instances: [],
        setting: !1
      },
      configurable: !0
    }), Qg(e)), e._ractive.instances[t._guid] || (e._ractive.instances[t._guid] = 0, e._ractive.instances.push(t)), e._ractive.instances[t._guid] += 1, e._ractive.wrappers.push(this);
  }, qg.prototype = {
    get: function() {
      return this.value;
    },
    teardown: function() {
      var t,
          e,
          n,
          i,
          r;
      if (t = this.value, e = t._ractive, n = e.wrappers, i = e.instances, e.setting)
        return !1;
      if (r = n.indexOf(this), -1 === r)
        throw new Error($g);
      if (n.splice(r, 1), n.length) {
        if (i[this.root._guid] -= 1, !i[this.root._guid]) {
          if (r = i.indexOf(this.root), -1 === r)
            throw new Error($g);
          i.splice(r, 1);
        }
      } else
        delete t._ractive, Qg.unpatch(this.value);
    }
  }, $g = "Something went wrong in a rather interesting way";
  var Zg,
      Hg,
      Kg = Bg,
      Gg = /^\s*[0-9]+\s*$/,
      Yg = function(t) {
        return Gg.test(t) ? [] : {};
      };
  try {
    Object.defineProperty({}, "test", {value: 0}), Zg = {
      filter: function(t, e, n) {
        var i,
            r;
        return e ? (e = _(e), (i = n.viewmodel.wrapped[e.parent.str]) && !i.magic ? !1 : (r = n.viewmodel.get(e.parent), s(r) && /^[0-9]+$/.test(e.lastKey) ? !1 : r && ("object" == typeof r || "function" == typeof r))) : !1;
      },
      wrap: function(t, e, n) {
        return new Hg(t, e, n);
      }
    }, Hg = function(t, e, n) {
      var i,
          r,
          s;
      return n = _(n), this.magic = !0, this.ractive = t, this.keypath = n, this.value = e, this.prop = n.lastKey, i = n.parent, this.obj = i.isRoot ? t.viewmodel.data : t.viewmodel.get(i), r = this.originalDescriptor = Object.getOwnPropertyDescriptor(this.obj, this.prop), r && r.set && (s = r.set._ractiveWrappers) ? void(-1 === s.indexOf(this) && s.push(this)) : void vs(this, e, r);
    }, Hg.prototype = {
      get: function() {
        return this.value;
      },
      reset: function(t) {
        return this.updating ? void 0 : (this.updating = !0, this.obj[this.prop] = t, mu.addRactive(this.ractive), this.ractive.viewmodel.mark(this.keypath, {keepExistingWrapper: !0}), this.updating = !1, !0);
      },
      set: function(t, e) {
        this.updating || (this.obj[this.prop] || (this.updating = !0, this.obj[this.prop] = Yg(t), this.updating = !1), this.obj[this.prop][t] = e);
      },
      teardown: function() {
        var t,
            e,
            n,
            i,
            r;
        return this.updating ? !1 : (t = Object.getOwnPropertyDescriptor(this.obj, this.prop), e = t && t.set, void(e && (i = e._ractiveWrappers, r = i.indexOf(this), -1 !== r && i.splice(r, 1), i.length || (n = this.obj[this.prop], Object.defineProperty(this.obj, this.prop, this.originalDescriptor || {
          writable: !0,
          enumerable: !0,
          configurable: !0
        }), this.obj[this.prop] = n))));
      }
    };
  } catch (_a) {
    Zg = !1;
  }
  var Jg,
      Xg,
      ty = Zg;
  ty && (Jg = {
    filter: function(t, e, n) {
      return ty.filter(t, e, n) && Kg.filter(t);
    },
    wrap: function(t, e, n) {
      return new Xg(t, e, n);
    }
  }, Xg = function(t, e, n) {
    this.value = e, this.magic = !0, this.magicWrapper = ty.wrap(t, e, n), this.arrayWrapper = Kg.wrap(t, e, n);
  }, Xg.prototype = {
    get: function() {
      return this.value;
    },
    teardown: function() {
      this.arrayWrapper.teardown(), this.magicWrapper.teardown();
    },
    reset: function(t) {
      return this.magicWrapper.reset(t);
    }
  });
  var ey = Jg,
      ny = gs,
      iy = {},
      ry = ws,
      sy = xs,
      oy = _s,
      ay = Ps,
      uy = Ts,
      hy = function(t, e) {
        this.computation = t, this.viewmodel = t.viewmodel, this.ref = e, this.root = this.viewmodel.ractive, this.parentFragment = this.root.component && this.root.component.parentFragment;
      };
  hy.prototype = {resolve: function(t) {
      this.computation.softDeps.push(t), this.computation.unresolvedDeps[t.str] = null, this.viewmodel.register(t, this.computation, "computed");
    }};
  var cy = hy,
      ly = function(t, e) {
        this.key = t, this.getter = e.getter, this.setter = e.setter, this.hardDeps = e.deps || [], this.softDeps = [], this.unresolvedDeps = {}, this.depValues = {}, this._dirty = this._firstRun = !0;
      };
  ly.prototype = {
    constructor: ly,
    init: function(t) {
      var e,
          n = this;
      this.viewmodel = t, this.bypass = !0, e = t.get(this.key), t.clearCache(this.key.str), this.bypass = !1, this.setter && void 0 !== e && this.set(e), this.hardDeps && this.hardDeps.forEach(function(e) {
        return t.register(e, n, "computed");
      });
    },
    invalidate: function() {
      this._dirty = !0;
    },
    get: function() {
      var t,
          e,
          n = this,
          i = !1;
      if (this.getting) {
        var r = "The " + this.key.str + " computation indirectly called itself. This probably indicates a bug in the computation. It is commonly caused by `array.sort(...)` - if that's the case, clone the array first with `array.slice().sort(...)`";
        return p(r), this.value;
      }
      if (this.getting = !0, this._dirty) {
        if (this._firstRun || !this.hardDeps.length && !this.softDeps.length ? i = !0 : [this.hardDeps, this.softDeps].forEach(function(t) {
          var e,
              r,
              s;
          if (!i)
            for (s = t.length; s--; )
              if (e = t[s], r = n.viewmodel.get(e), !a(r, n.depValues[e.str]))
                return n.depValues[e.str] = r, void(i = !0);
        }), i) {
          this.viewmodel.capture();
          try {
            this.value = this.getter();
          } catch (s) {
            m('Failed to compute "%s"', this.key.str), f(s.stack || s), this.value = void 0;
          }
          t = this.viewmodel.release(), e = this.updateDependencies(t), e && [this.hardDeps, this.softDeps].forEach(function(t) {
            t.forEach(function(t) {
              n.depValues[t.str] = n.viewmodel.get(t);
            });
          });
        }
        this._dirty = !1;
      }
      return this.getting = this._firstRun = !1, this.value;
    },
    set: function(t) {
      if (this.setting)
        return void(this.value = t);
      if (!this.setter)
        throw new Error("Computed properties without setters are read-only. (This may change in a future version of Ractive!)");
      this.setter(t);
    },
    updateDependencies: function(t) {
      var e,
          n,
          i,
          r,
          s;
      for (n = this.softDeps, e = n.length; e--; )
        i = n[e], -1 === t.indexOf(i) && (r = !0, this.viewmodel.unregister(i, this, "computed"));
      for (e = t.length; e--; )
        i = t[e], -1 !== n.indexOf(i) || this.hardDeps && -1 !== this.hardDeps.indexOf(i) || (r = !0, Fs(this.viewmodel, i) && !this.unresolvedDeps[i.str] ? (s = new cy(this, i.str), t.splice(e, 1), this.unresolvedDeps[i.str] = s, mu.addUnresolved(s)) : this.viewmodel.register(i, this, "computed"));
      return r && (this.softDeps = t.slice()), r;
    }
  };
  var fy = ly,
      dy = Rs,
      py = {FAILED_LOOKUP: !0},
      my = js,
      vy = {},
      gy = Ds,
      yy = Is,
      by = function(t, e) {
        this.localKey = t, this.keypath = e.keypath, this.origin = e.origin, this.deps = [], this.unresolved = [], this.resolved = !1;
      };
  by.prototype = {
    forceResolution: function() {
      this.keypath = this.localKey, this.setup();
    },
    get: function(t, e) {
      return this.resolved ? this.origin.get(this.map(t), e) : void 0;
    },
    getValue: function() {
      return this.keypath ? this.origin.get(this.keypath) : void 0;
    },
    initViewmodel: function(t) {
      this.local = t, this.setup();
    },
    map: function(t) {
      return void 0 === typeof this.keypath ? this.localKey : t.replace(this.localKey, this.keypath);
    },
    register: function(t, e, n) {
      this.deps.push({
        keypath: t,
        dep: e,
        group: n
      }), this.resolved && this.origin.register(this.map(t), e, n);
    },
    resolve: function(t) {
      void 0 !== this.keypath && this.unbind(!0), this.keypath = t, this.setup();
    },
    set: function(t, e) {
      this.resolved || this.forceResolution(), this.origin.set(this.map(t), e);
    },
    setup: function() {
      var t = this;
      void 0 !== this.keypath && (this.resolved = !0, this.deps.length && (this.deps.forEach(function(e) {
        var n = t.map(e.keypath);
        if (t.origin.register(n, e.dep, e.group), e.dep.setValue)
          e.dep.setValue(t.origin.get(n));
        else {
          if (!e.dep.invalidate)
            throw new Error("An unexpected error occurred. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!");
          e.dep.invalidate();
        }
      }), this.origin.mark(this.keypath)));
    },
    setValue: function(t) {
      if (!this.keypath)
        throw new Error("Mapping does not have keypath, cannot set value. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!");
      this.origin.set(this.keypath, t);
    },
    unbind: function(t) {
      var e = this;
      t || delete this.local.mappings[this.localKey], this.resolved && (this.deps.forEach(function(t) {
        e.origin.unregister(e.map(t.keypath), t.dep, t.group);
      }), this.tracker && this.origin.unregister(this.keypath, this.tracker));
    },
    unregister: function(t, e, n) {
      var i,
          r;
      if (this.resolved) {
        for (i = this.deps, r = i.length; r--; )
          if (i[r].dep === e) {
            i.splice(r, 1);
            break;
          }
        this.origin.unregister(this.map(t), e, n);
      }
    }
  };
  var wy = Ls,
      xy = function(t, e) {
        var n,
            i,
            r,
            s;
        return n = {}, i = 0, r = t.map(function(t, r) {
          var o,
              a,
              u;
          a = i, u = e.length;
          do {
            if (o = e.indexOf(t, a), -1 === o)
              return s = !0, -1;
            a = o + 1;
          } while (n[o] && u > a);
          return o === i && (i += 1), o !== r && (s = !0), n[o] = !0, o;
        });
      },
      ky = Vs,
      Ey = {},
      _y = Ws,
      Ay = Bs,
      Sy = qs,
      Cy = $s,
      Oy = Zs,
      Py = {implicit: !0},
      Ty = {noCascade: !0},
      Fy = Ks,
      Ry = Gs,
      jy = function(t) {
        var e,
            n,
            i = t.adapt,
            r = t.data,
            s = t.ractive,
            o = t.computed,
            a = t.mappings;
        this.ractive = s, this.adaptors = i, this.onchange = t.onchange, this.cache = {}, this.cacheMap = wa(null), this.deps = {
          computed: wa(null),
          "default": wa(null)
        }, this.depsMap = {
          computed: wa(null),
          "default": wa(null)
        }, this.patternObservers = [], this.specials = wa(null), this.wrapped = wa(null), this.computations = wa(null), this.captureGroups = [], this.unresolvedImplicitDependencies = [], this.changes = [], this.implicitChanges = {}, this.noCascade = {}, this.data = r, this.mappings = wa(null);
        for (e in a)
          this.map(_(e), a[e]);
        if (r)
          for (e in r)
            (n = this.mappings[e]) && void 0 === n.getValue() && n.setValue(r[e]);
        for (e in o)
          a && e in a && l("Cannot map to a computed property ('%s')", e), this.compute(_(e), o[e]);
        this.ready = !0;
      };
  jy.prototype = {
    adapt: ny,
    applyChanges: oy,
    capture: ay,
    clearCache: uy,
    compute: dy,
    get: my,
    init: gy,
    map: yy,
    mark: wy,
    merge: ky,
    register: _y,
    release: Ay,
    reset: Sy,
    set: Cy,
    smartUpdate: Oy,
    teardown: Fy,
    unregister: Ry
  };
  var Ny = jy;
  Js.prototype = {
    constructor: Js,
    begin: function(t) {
      this.inProcess[t._guid] = !0;
    },
    end: function(t) {
      var e = t.parent;
      e && this.inProcess[e._guid] ? Xs(this.queue, e).push(t) : to(this, t), delete this.inProcess[t._guid];
    }
  };
  var Dy = Js,
      Iy = eo,
      Ly = /\$\{([^\}]+)\}/g,
      Vy = new nu("construct"),
      My = new nu("config"),
      Uy = new Dy("init"),
      Wy = 0,
      zy = ["adaptors", "components", "decorators", "easing", "events", "interpolators", "partials", "transitions"],
      By = so,
      qy = co;
  co.prototype = {
    bubble: function() {
      this.dirty || (this.dirty = !0, mu.addView(this));
    },
    update: function() {
      this.callback(this.fragment.getValue()), this.dirty = !1;
    },
    rebind: function(t, e) {
      this.fragment.rebind(t, e);
    },
    unbind: function() {
      this.fragment.unbind();
    }
  };
  var $y = function(t, e, n, r, o) {
    var a,
        u,
        h,
        c,
        l,
        f,
        d = {},
        p = {},
        v = {},
        g = [];
    for (u = t.parentFragment, h = t.root, o = o || {}, i(d, o), o.content = r || [], d[""] = o.content, e.defaults.el && m("The <%s/> component has a default `el` property; it has been disregarded", t.name), c = u; c; ) {
      if (c.owner.type === oc) {
        l = c.owner.container;
        break;
      }
      c = c.parent;
    }
    return n && Object.keys(n).forEach(function(e) {
      var i,
          r,
          o = n[e];
      if ("string" == typeof o)
        i = Af(o), p[e] = i ? i.value : o;
      else if (0 === o)
        p[e] = !0;
      else {
        if (!s(o))
          throw new Error("erm wut");
        fo(o) ? (v[e] = {
          origin: t.root.viewmodel,
          keypath: void 0
        }, r = lo(t, o[0], function(t) {
          t.isSpecial ? f ? a.set(e, t.value) : (p[e] = t.value, delete v[e]) : f ? a.viewmodel.mappings[e].resolve(t) : v[e].keypath = t;
        })) : r = new qy(t, o, function(t) {
          f ? a.set(e, t) : p[e] = t;
        }), g.push(r);
      }
    }), a = wa(e.prototype), By(a, {
      el: null,
      append: !0,
      data: p,
      partials: o,
      magic: h.magic || e.defaults.magic,
      modifyArrays: h.modifyArrays,
      adapt: h.adapt
    }, {
      parent: h,
      component: t,
      container: l,
      mappings: v,
      inlinePartials: d,
      cssIds: u.cssIds
    }), f = !0, t.resolvers = g, a;
  },
      Qy = po,
      Zy = function(t) {
        var e,
            n;
        for (e = t.root; e; )
          (n = e._liveComponentQueries["_" + t.name]) && n.push(t.instance), e = e.parent;
      },
      Hy = vo,
      Ky = go,
      Gy = yo,
      Yy = bo,
      Jy = wo,
      Xy = new nu("teardown"),
      tb = ko,
      eb = function(t, e) {
        this.init(t, e);
      };
  eb.prototype = {
    detach: Rg,
    find: Ng,
    findAll: Dg,
    findAllComponents: Ig,
    findComponent: Lg,
    findNextNode: Vg,
    firstNode: Mg,
    init: Hy,
    rebind: Ky,
    render: Gy,
    toString: Yy,
    unbind: Jy,
    unrender: tb
  };
  var nb = eb,
      ib = function(t) {
        this.type = ec, this.value = t.template.c;
      };
  ib.prototype = {
    detach: Rd,
    firstNode: function() {
      return this.node;
    },
    render: function() {
      return this.node || (this.node = document.createComment(this.value)), this.node;
    },
    toString: function() {
      return "<!--" + this.value + "-->";
    },
    unrender: function(t) {
      t && this.node.parentNode.removeChild(this.node);
    }
  };
  var rb = ib,
      sb = function(t) {
        var e,
            n;
        this.type = oc, this.container = e = t.parentFragment.root, this.component = n = e.component, this.container = e, this.containerFragment = t.parentFragment, this.parentFragment = n.parentFragment;
        var i = this.name = t.template.n || "",
            r = e._inlinePartials[i];
        r || (m('Could not find template for partial "' + i + '"', {ractive: t.root}), r = []), this.fragment = new yb({
          owner: this,
          root: e.parent,
          template: r,
          pElement: this.containerFragment.pElement
        }), s(n.yielders[i]) ? n.yielders[i].push(this) : n.yielders[i] = [this], mu.scheduleTask(function() {
          if (n.yielders[i].length > 1)
            throw new Error("A component template can only have one {{yield" + (i ? " " + i : "") + "}} declaration at a time");
        });
      };
  sb.prototype = {
    detach: function() {
      return this.fragment.detach();
    },
    find: function(t) {
      return this.fragment.find(t);
    },
    findAll: function(t, e) {
      return this.fragment.findAll(t, e);
    },
    findComponent: function(t) {
      return this.fragment.findComponent(t);
    },
    findAllComponents: function(t, e) {
      return this.fragment.findAllComponents(t, e);
    },
    findNextNode: function() {
      return this.containerFragment.findNextNode(this);
    },
    firstNode: function() {
      return this.fragment.firstNode();
    },
    getValue: function(t) {
      return this.fragment.getValue(t);
    },
    render: function() {
      return this.fragment.render();
    },
    unbind: function() {
      this.fragment.unbind();
    },
    unrender: function(t) {
      this.fragment.unrender(t), I(this.component.yielders[this.name], this);
    },
    rebind: function(t, e) {
      this.fragment.rebind(t, e);
    },
    toString: function() {
      return this.fragment.toString();
    }
  };
  var ob = sb,
      ab = function(t) {
        this.declaration = t.template.a;
      };
  ab.prototype = {
    init: Fa,
    render: Fa,
    unrender: Fa,
    teardown: Fa,
    toString: function() {
      return "<!DOCTYPE" + this.declaration + ">";
    }
  };
  var ub = ab,
      hb = Eo,
      cb = Ao,
      lb = So,
      fb = Co,
      db = To,
      pb = Ro,
      mb = function(t) {
        this.init(t);
      };
  mb.prototype = {
    bubble: wd,
    detach: xd,
    find: kd,
    findAll: Ed,
    findAllComponents: _d,
    findComponent: Ad,
    findNextNode: Sd,
    firstNode: Cd,
    getArgsList: Pd,
    getNode: Td,
    getValue: Fd,
    init: hb,
    rebind: cb,
    registerIndexRef: function(t) {
      var e = this.registeredIndexRefs;
      -1 === e.indexOf(t) && e.push(t);
    },
    render: lb,
    toString: fb,
    unbind: db,
    unregisterIndexRef: function(t) {
      var e = this.registeredIndexRefs;
      e.splice(e.indexOf(t), 1);
    },
    unrender: pb
  };
  var vb,
      gb,
      yb = mb,
      bb = jo,
      wb = ["template", "partials", "components", "decorators", "events"],
      xb = new nu("reset"),
      kb = function(t, e) {
        function n(e, i, r) {
          r && r.partials[t] || e.forEach(function(e) {
            e.type === tc && e.getPartialName() === t && i.push(e), e.fragment && n(e.fragment.items, i, r), s(e.fragments) ? n(e.fragments, i, r) : s(e.items) ? n(e.items, i, r) : e.type === sc && e.instance && n(e.instance.fragment.items, i, e.instance), e.type === Xh && (s(e.attributes) && n(e.attributes, i, r), s(e.conditionalAttributes) && n(e.conditionalAttributes, i, r));
          });
        }
        var i,
            r = [];
        return n(this.fragment.items, r), this.partials[t] = e, i = mu.start(this, !0), r.forEach(function(e) {
          e.value = void 0, e.setValue(t);
        }), mu.end(), i;
      },
      Eb = No,
      _b = gh("reverse"),
      Ab = Do,
      Sb = gh("shift"),
      Cb = gh("sort"),
      Ob = gh("splice"),
      Pb = Lo,
      Tb = Vo,
      Fb = new nu("teardown"),
      Rb = Uo,
      jb = Wo,
      Nb = zo,
      Db = new nu("unrender"),
      Ib = gh("unshift"),
      Lb = Bo,
      Vb = new nu("update"),
      Mb = qo,
      Ub = {
        add: Ga,
        animate: xu,
        detach: Eu,
        find: Au,
        findAll: Nu,
        findAllComponents: Du,
        findComponent: Iu,
        findContainer: Lu,
        findParent: Vu,
        fire: zu,
        get: Bu,
        insert: $u,
        merge: Zu,
        observe: uh,
        observeOnce: hh,
        off: fh,
        on: dh,
        once: ph,
        pop: yh,
        push: bh,
        render: Sh,
        reset: bb,
        resetPartial: kb,
        resetTemplate: Eb,
        reverse: _b,
        set: Ab,
        shift: Sb,
        sort: Cb,
        splice: Ob,
        subtract: Pb,
        teardown: Tb,
        toggle: Rb,
        toHTML: jb,
        toHtml: jb,
        unrender: Nb,
        unshift: Ib,
        update: Lb,
        updateModel: Mb
      },
      Wb = function(t, e, n) {
        return n || Qo(t, e) ? function() {
          var n,
              i = "_super" in this,
              r = this._super;
          return this._super = e, n = t.apply(this, arguments), i && (this._super = r), n;
        } : t;
      },
      zb = Zo,
      Bb = Yo,
      qb = function(t) {
        var e,
            n,
            i = {};
        return t && (e = t._ractive) ? (i.ractive = e.root, i.keypath = e.keypath.str, i.index = {}, (n = qd(e.proxy.parentFragment)) && (i.index = qd.resolve(n)), i) : i;
      };
  vb = function(t) {
    return this instanceof vb ? void By(this, t) : new vb(t);
  }, gb = {
    DEBUG: {
      writable: !0,
      value: !0
    },
    DEBUG_PROMISES: {
      writable: !0,
      value: !0
    },
    extend: {value: Bb},
    getNodeInfo: {value: qb},
    parse: {value: Kf},
    Promise: {value: ou},
    svg: {value: ra},
    magic: {value: na},
    VERSION: {value: "0.7.3"},
    adaptors: {
      writable: !0,
      value: {}
    },
    components: {
      writable: !0,
      value: {}
    },
    decorators: {
      writable: !0,
      value: {}
    },
    easing: {
      writable: !0,
      value: ha
    },
    events: {
      writable: !0,
      value: {}
    },
    interpolators: {
      writable: !0,
      value: Ma
    },
    partials: {
      writable: !0,
      value: {}
    },
    transitions: {
      writable: !0,
      value: {}
    }
  }, ka(vb, gb), vb.prototype = i(Ub, ua), vb.prototype.constructor = vb, vb.defaults = vb.prototype;
  var $b = "function";
  if (typeof Date.now !== $b || typeof String.prototype.trim !== $b || typeof Object.keys !== $b || typeof Array.prototype.indexOf !== $b || typeof Array.prototype.forEach !== $b || typeof Array.prototype.map !== $b || typeof Array.prototype.filter !== $b || "undefined" != typeof window && typeof window.addEventListener !== $b)
    throw new Error("It looks like you're attempting to use Ractive.js in an older browser. You'll need to use one of the 'legacy builds' in order to continue - see http://docs.ractivejs.org/latest/legacy-builds for more information.");
  var Qb = vb;
  return Qb;
});

_removeDefine();
})();
$__System.registerDynamic("9", [], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var numbers = '0123456789',
      letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      specials = '!$%^&*()_+|~-=`{}[]:;<>?,./';
  function _defaults(opts) {
    opts || (opts = {});
    return {
      length: opts.length || 8,
      numeric: typeof opts.numeric === 'boolean' ? opts.numeric : true,
      letters: typeof opts.letters === 'boolean' ? opts.letters : true,
      special: typeof opts.special === 'boolean' ? opts.special : false
    };
  }
  function _buildChars(opts) {
    var chars = '';
    if (opts.numeric) {
      chars += numbers;
    }
    if (opts.letters) {
      chars += letters;
    }
    if (opts.special) {
      chars += specials;
    }
    return chars;
  }
  module.exports = function randomString(opts) {
    opts = _defaults(opts);
    var i,
        rn,
        rnd = '',
        len = opts.length,
        randomChars = _buildChars(opts);
    for (i = 1; i <= len; i++) {
      rnd += randomChars.substring(rn = Math.floor(Math.random() * randomChars.length), rn + 1);
    }
    return rnd;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("7", [], false, function(__require, __exports, __module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal(__module.id, null, null);
  (function() {
    var sjcl = this["sjcl"];
    var s = this["s"];
    "use strict";
    var sjcl = {
      cipher: {},
      hash: {},
      mode: {},
      misc: {},
      codec: {},
      exception: {
        corrupt: function(a) {
          this.toString = function() {
            return "CORRUPT: " + this.message;
          };
          this.message = a;
        },
        invalid: function(a) {
          this.toString = function() {
            return "INVALID: " + this.message;
          };
          this.message = a;
        },
        bug: function(a) {
          this.toString = function() {
            return "BUG: " + this.message;
          };
          this.message = a;
        },
        notReady: function(a) {
          this.toString = function() {
            return "NOT READY: " + this.message;
          };
          this.message = a;
        }
      }
    };
    sjcl.cipher.aes = function(a) {
      this.h[0][0][0] || this.z();
      var b,
          c,
          d,
          e,
          f = this.h[0][4],
          g = this.h[1];
      b = a.length;
      var h = 1;
      if (b !== 4 && b !== 6 && b !== 8)
        throw new sjcl.exception.invalid("invalid aes key size");
      this.a = [d = a.slice(0), e = []];
      for (a = b; a < 4 * b + 28; a++) {
        c = d[a - 1];
        if (a % b === 0 || b === 8 && a % b === 4) {
          c = f[c >>> 24] << 24 ^ f[c >> 16 & 255] << 16 ^ f[c >> 8 & 255] << 8 ^ f[c & 255];
          if (a % b === 0) {
            c = c << 8 ^ c >>> 24 ^ h << 24;
            h = h << 1 ^ (h >> 7) * 283;
          }
        }
        d[a] = d[a - b] ^ c;
      }
      for (b = 0; a; b++, a--) {
        c = d[b & 3 ? a : a - 4];
        e[b] = a <= 4 || b < 4 ? c : g[0][f[c >>> 24]] ^ g[1][f[c >> 16 & 255]] ^ g[2][f[c >> 8 & 255]] ^ g[3][f[c & 255]];
      }
    };
    sjcl.cipher.aes.prototype = {
      encrypt: function(a) {
        return this.I(a, 0);
      },
      decrypt: function(a) {
        return this.I(a, 1);
      },
      h: [[[], [], [], [], []], [[], [], [], [], []]],
      z: function() {
        var a = this.h[0],
            b = this.h[1],
            c = a[4],
            d = b[4],
            e,
            f,
            g,
            h = [],
            i = [],
            k,
            j,
            l,
            m;
        for (e = 0; e < 0x100; e++)
          i[(h[e] = e << 1 ^ (e >> 7) * 283) ^ e] = e;
        for (f = g = 0; !c[f]; f ^= k || 1, g = i[g] || 1) {
          l = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4;
          l = l >> 8 ^ l & 255 ^ 99;
          c[f] = l;
          d[l] = f;
          j = h[e = h[k = h[f]]];
          m = j * 0x1010101 ^ e * 0x10001 ^ k * 0x101 ^ f * 0x1010100;
          j = h[l] * 0x101 ^ l * 0x1010100;
          for (e = 0; e < 4; e++) {
            a[e][f] = j = j << 24 ^ j >>> 8;
            b[e][l] = m = m << 24 ^ m >>> 8;
          }
        }
        for (e = 0; e < 5; e++) {
          a[e] = a[e].slice(0);
          b[e] = b[e].slice(0);
        }
      },
      I: function(a, b) {
        if (a.length !== 4)
          throw new sjcl.exception.invalid("invalid aes block size");
        var c = this.a[b],
            d = a[0] ^ c[0],
            e = a[b ? 3 : 1] ^ c[1],
            f = a[2] ^ c[2];
        a = a[b ? 1 : 3] ^ c[3];
        var g,
            h,
            i,
            k = c.length / 4 - 2,
            j,
            l = 4,
            m = [0, 0, 0, 0];
        g = this.h[b];
        var n = g[0],
            o = g[1],
            p = g[2],
            q = g[3],
            r = g[4];
        for (j = 0; j < k; j++) {
          g = n[d >>> 24] ^ o[e >> 16 & 255] ^ p[f >> 8 & 255] ^ q[a & 255] ^ c[l];
          h = n[e >>> 24] ^ o[f >> 16 & 255] ^ p[a >> 8 & 255] ^ q[d & 255] ^ c[l + 1];
          i = n[f >>> 24] ^ o[a >> 16 & 255] ^ p[d >> 8 & 255] ^ q[e & 255] ^ c[l + 2];
          a = n[a >>> 24] ^ o[d >> 16 & 255] ^ p[e >> 8 & 255] ^ q[f & 255] ^ c[l + 3];
          l += 4;
          d = g;
          e = h;
          f = i;
        }
        for (j = 0; j < 4; j++) {
          m[b ? 3 & -j : j] = r[d >>> 24] << 24 ^ r[e >> 16 & 255] << 16 ^ r[f >> 8 & 255] << 8 ^ r[a & 255] ^ c[l++];
          g = d;
          d = e;
          e = f;
          f = a;
          a = g;
        }
        return m;
      }
    };
    sjcl.bitArray = {
      bitSlice: function(a, b, c) {
        a = sjcl.bitArray.P(a.slice(b / 32), 32 - (b & 31)).slice(1);
        return c === undefined ? a : sjcl.bitArray.clamp(a, c - b);
      },
      concat: function(a, b) {
        if (a.length === 0 || b.length === 0)
          return a.concat(b);
        var c = a[a.length - 1],
            d = sjcl.bitArray.getPartial(c);
        return d === 32 ? a.concat(b) : sjcl.bitArray.P(b, d, c | 0, a.slice(0, a.length - 1));
      },
      bitLength: function(a) {
        var b = a.length;
        if (b === 0)
          return 0;
        return (b - 1) * 32 + sjcl.bitArray.getPartial(a[b - 1]);
      },
      clamp: function(a, b) {
        if (a.length * 32 < b)
          return a;
        a = a.slice(0, Math.ceil(b / 32));
        var c = a.length;
        b &= 31;
        if (c > 0 && b)
          a[c - 1] = sjcl.bitArray.partial(b, a[c - 1] & 2147483648 >> b - 1, 1);
        return a;
      },
      partial: function(a, b, c) {
        if (a === 32)
          return b;
        return (c ? b | 0 : b << 32 - a) + a * 0x10000000000;
      },
      getPartial: function(a) {
        return Math.round(a / 0x10000000000) || 32;
      },
      equal: function(a, b) {
        if (sjcl.bitArray.bitLength(a) !== sjcl.bitArray.bitLength(b))
          return false;
        var c = 0,
            d;
        for (d = 0; d < a.length; d++)
          c |= a[d] ^ b[d];
        return c === 0;
      },
      P: function(a, b, c, d) {
        var e;
        e = 0;
        if (d === undefined)
          d = [];
        for (; b >= 32; b -= 32) {
          d.push(c);
          c = 0;
        }
        if (b === 0)
          return d.concat(a);
        for (e = 0; e < a.length; e++) {
          d.push(c | a[e] >>> b);
          c = a[e] << 32 - b;
        }
        e = a.length ? a[a.length - 1] : 0;
        a = sjcl.bitArray.getPartial(e);
        d.push(sjcl.bitArray.partial(b + a & 31, b + a > 32 ? c : d.pop(), 1));
        return d;
      },
      k: function(a, b) {
        return [a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]];
      }
    };
    sjcl.codec.utf8String = {
      fromBits: function(a) {
        var b = "",
            c = sjcl.bitArray.bitLength(a),
            d,
            e;
        for (d = 0; d < c / 8; d++) {
          if ((d & 3) === 0)
            e = a[d / 4];
          b += String.fromCharCode(e >>> 24);
          e <<= 8;
        }
        return decodeURIComponent(escape(b));
      },
      toBits: function(a) {
        a = unescape(encodeURIComponent(a));
        var b = [],
            c,
            d = 0;
        for (c = 0; c < a.length; c++) {
          d = d << 8 | a.charCodeAt(c);
          if ((c & 3) === 3) {
            b.push(d);
            d = 0;
          }
        }
        c & 3 && b.push(sjcl.bitArray.partial(8 * (c & 3), d));
        return b;
      }
    };
    sjcl.codec.hex = {
      fromBits: function(a) {
        var b = "",
            c;
        for (c = 0; c < a.length; c++)
          b += ((a[c] | 0) + 0xf00000000000).toString(16).substr(4);
        return b.substr(0, sjcl.bitArray.bitLength(a) / 4);
      },
      toBits: function(a) {
        var b,
            c = [],
            d;
        a = a.replace(/\s|0x/g, "");
        d = a.length;
        a += "00000000";
        for (b = 0; b < a.length; b += 8)
          c.push(parseInt(a.substr(b, 8), 16) ^ 0);
        return sjcl.bitArray.clamp(c, d * 4);
      }
    };
    sjcl.codec.base64 = {
      F: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      fromBits: function(a, b) {
        var c = "",
            d,
            e = 0,
            f = sjcl.codec.base64.F,
            g = 0,
            h = sjcl.bitArray.bitLength(a);
        for (d = 0; c.length * 6 < h; ) {
          c += f.charAt((g ^ a[d] >>> e) >>> 26);
          if (e < 6) {
            g = a[d] << 6 - e;
            e += 26;
            d++;
          } else {
            g <<= 6;
            e -= 6;
          }
        }
        for (; c.length & 3 && !b; )
          c += "=";
        return c;
      },
      toBits: function(a) {
        a = a.replace(/\s|=/g, "");
        var b = [],
            c,
            d = 0,
            e = sjcl.codec.base64.F,
            f = 0,
            g;
        for (c = 0; c < a.length; c++) {
          g = e.indexOf(a.charAt(c));
          if (g < 0)
            throw new sjcl.exception.invalid("this isn't base64!");
          if (d > 26) {
            d -= 26;
            b.push(f ^ g >>> d);
            f = g << 32 - d;
          } else {
            d += 6;
            f ^= g << 32 - d;
          }
        }
        d & 56 && b.push(sjcl.bitArray.partial(d & 56, f, 1));
        return b;
      }
    };
    sjcl.hash.sha256 = function(a) {
      this.a[0] || this.z();
      if (a) {
        this.n = a.n.slice(0);
        this.i = a.i.slice(0);
        this.e = a.e;
      } else
        this.reset();
    };
    sjcl.hash.sha256.hash = function(a) {
      return (new sjcl.hash.sha256).update(a).finalize();
    };
    sjcl.hash.sha256.prototype = {
      blockSize: 512,
      reset: function() {
        this.n = this.N.slice(0);
        this.i = [];
        this.e = 0;
        return this;
      },
      update: function(a) {
        if (typeof a === "string")
          a = sjcl.codec.utf8String.toBits(a);
        var b,
            c = this.i = sjcl.bitArray.concat(this.i, a);
        b = this.e;
        a = this.e = b + sjcl.bitArray.bitLength(a);
        for (b = 512 + b & -512; b <= a; b += 512)
          this.D(c.splice(0, 16));
        return this;
      },
      finalize: function() {
        var a,
            b = this.i,
            c = this.n;
        b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1, 1)]);
        for (a = b.length + 2; a & 15; a++)
          b.push(0);
        b.push(Math.floor(this.e / 4294967296));
        for (b.push(this.e | 0); b.length; )
          this.D(b.splice(0, 16));
        this.reset();
        return c;
      },
      N: [],
      a: [],
      z: function() {
        function a(e) {
          return (e - Math.floor(e)) * 0x100000000 | 0;
        }
        var b = 0,
            c = 2,
            d;
        a: for (; b < 64; c++) {
          for (d = 2; d * d <= c; d++)
            if (c % d === 0)
              continue a;
          if (b < 8)
            this.N[b] = a(Math.pow(c, 0.5));
          this.a[b] = a(Math.pow(c, 1 / 3));
          b++;
        }
      },
      D: function(a) {
        var b,
            c,
            d = a.slice(0),
            e = this.n,
            f = this.a,
            g = e[0],
            h = e[1],
            i = e[2],
            k = e[3],
            j = e[4],
            l = e[5],
            m = e[6],
            n = e[7];
        for (a = 0; a < 64; a++) {
          if (a < 16)
            b = d[a];
          else {
            b = d[a + 1 & 15];
            c = d[a + 14 & 15];
            b = d[a & 15] = (b >>> 7 ^ b >>> 18 ^ b >>> 3 ^ b << 25 ^ b << 14) + (c >>> 17 ^ c >>> 19 ^ c >>> 10 ^ c << 15 ^ c << 13) + d[a & 15] + d[a + 9 & 15] | 0;
          }
          b = b + n + (j >>> 6 ^ j >>> 11 ^ j >>> 25 ^ j << 26 ^ j << 21 ^ j << 7) + (m ^ j & (l ^ m)) + f[a];
          n = m;
          m = l;
          l = j;
          j = k + b | 0;
          k = i;
          i = h;
          h = g;
          g = b + (h & i ^ k & (h ^ i)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0;
        }
        e[0] = e[0] + g | 0;
        e[1] = e[1] + h | 0;
        e[2] = e[2] + i | 0;
        e[3] = e[3] + k | 0;
        e[4] = e[4] + j | 0;
        e[5] = e[5] + l | 0;
        e[6] = e[6] + m | 0;
        e[7] = e[7] + n | 0;
      }
    };
    sjcl.mode.ccm = {
      name: "ccm",
      encrypt: function(a, b, c, d, e) {
        var f,
            g = b.slice(0),
            h = sjcl.bitArray,
            i = h.bitLength(c) / 8,
            k = h.bitLength(g) / 8;
        e = e || 64;
        d = d || [];
        if (i < 7)
          throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");
        for (f = 2; f < 4 && k >>> 8 * f; f++)
          ;
        if (f < 15 - i)
          f = 15 - i;
        c = h.clamp(c, 8 * (15 - f));
        b = sjcl.mode.ccm.H(a, b, c, d, e, f);
        g = sjcl.mode.ccm.J(a, g, c, b, e, f);
        return h.concat(g.data, g.tag);
      },
      decrypt: function(a, b, c, d, e) {
        e = e || 64;
        d = d || [];
        var f = sjcl.bitArray,
            g = f.bitLength(c) / 8,
            h = f.bitLength(b),
            i = f.clamp(b, h - e),
            k = f.bitSlice(b, h - e);
        h = (h - e) / 8;
        if (g < 7)
          throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");
        for (b = 2; b < 4 && h >>> 8 * b; b++)
          ;
        if (b < 15 - g)
          b = 15 - g;
        c = f.clamp(c, 8 * (15 - b));
        i = sjcl.mode.ccm.J(a, i, c, k, e, b);
        a = sjcl.mode.ccm.H(a, i.data, c, d, e, b);
        if (!f.equal(i.tag, a))
          throw new sjcl.exception.corrupt("ccm: tag doesn't match");
        return i.data;
      },
      H: function(a, b, c, d, e, f) {
        var g = [],
            h = sjcl.bitArray,
            i = h.k;
        e /= 8;
        if (e % 2 || e < 4 || e > 16)
          throw new sjcl.exception.invalid("ccm: invalid tag length");
        if (d.length > 0xffffffff || b.length > 0xffffffff)
          throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");
        f = [h.partial(8, (d.length ? 64 : 0) | e - 2 << 2 | f - 1)];
        f = h.concat(f, c);
        f[3] |= h.bitLength(b) / 8;
        f = a.encrypt(f);
        if (d.length) {
          c = h.bitLength(d) / 8;
          if (c <= 65279)
            g = [h.partial(16, c)];
          else if (c <= 0xffffffff)
            g = h.concat([h.partial(16, 65534)], [c]);
          g = h.concat(g, d);
          for (d = 0; d < g.length; d += 4)
            f = a.encrypt(i(f, g.slice(d, d + 4).concat([0, 0, 0])));
        }
        for (d = 0; d < b.length; d += 4)
          f = a.encrypt(i(f, b.slice(d, d + 4).concat([0, 0, 0])));
        return h.clamp(f, e * 8);
      },
      J: function(a, b, c, d, e, f) {
        var g,
            h = sjcl.bitArray;
        g = h.k;
        var i = b.length,
            k = h.bitLength(b);
        c = h.concat([h.partial(8, f - 1)], c).concat([0, 0, 0]).slice(0, 4);
        d = h.bitSlice(g(d, a.encrypt(c)), 0, e);
        if (!i)
          return {
            tag: d,
            data: []
          };
        for (g = 0; g < i; g += 4) {
          c[3]++;
          e = a.encrypt(c);
          b[g] ^= e[0];
          b[g + 1] ^= e[1];
          b[g + 2] ^= e[2];
          b[g + 3] ^= e[3];
        }
        return {
          tag: d,
          data: h.clamp(b, k)
        };
      }
    };
    sjcl.mode.ocb2 = {
      name: "ocb2",
      encrypt: function(a, b, c, d, e, f) {
        if (sjcl.bitArray.bitLength(c) !== 128)
          throw new sjcl.exception.invalid("ocb iv must be 128 bits");
        var g,
            h = sjcl.mode.ocb2.B,
            i = sjcl.bitArray,
            k = i.k,
            j = [0, 0, 0, 0];
        c = h(a.encrypt(c));
        var l,
            m = [];
        d = d || [];
        e = e || 64;
        for (g = 0; g + 4 < b.length; g += 4) {
          l = b.slice(g, g + 4);
          j = k(j, l);
          m = m.concat(k(c, a.encrypt(k(c, l))));
          c = h(c);
        }
        l = b.slice(g);
        b = i.bitLength(l);
        g = a.encrypt(k(c, [0, 0, 0, b]));
        l = i.clamp(k(l.concat([0, 0, 0]), g), b);
        j = k(j, k(l.concat([0, 0, 0]), g));
        j = a.encrypt(k(j, k(c, h(c))));
        if (d.length)
          j = k(j, f ? d : sjcl.mode.ocb2.pmac(a, d));
        return m.concat(i.concat(l, i.clamp(j, e)));
      },
      decrypt: function(a, b, c, d, e, f) {
        if (sjcl.bitArray.bitLength(c) !== 128)
          throw new sjcl.exception.invalid("ocb iv must be 128 bits");
        e = e || 64;
        var g = sjcl.mode.ocb2.B,
            h = sjcl.bitArray,
            i = h.k,
            k = [0, 0, 0, 0],
            j = g(a.encrypt(c)),
            l,
            m,
            n = sjcl.bitArray.bitLength(b) - e,
            o = [];
        d = d || [];
        for (c = 0; c + 4 < n / 32; c += 4) {
          l = i(j, a.decrypt(i(j, b.slice(c, c + 4))));
          k = i(k, l);
          o = o.concat(l);
          j = g(j);
        }
        m = n - c * 32;
        l = a.encrypt(i(j, [0, 0, 0, m]));
        l = i(l, h.clamp(b.slice(c), m).concat([0, 0, 0]));
        k = i(k, l);
        k = a.encrypt(i(k, i(j, g(j))));
        if (d.length)
          k = i(k, f ? d : sjcl.mode.ocb2.pmac(a, d));
        if (!h.equal(h.clamp(k, e), h.bitSlice(b, n)))
          throw new sjcl.exception.corrupt("ocb: tag doesn't match");
        return o.concat(h.clamp(l, m));
      },
      pmac: function(a, b) {
        var c,
            d = sjcl.mode.ocb2.B,
            e = sjcl.bitArray,
            f = e.k,
            g = [0, 0, 0, 0],
            h = a.encrypt([0, 0, 0, 0]);
        h = f(h, d(d(h)));
        for (c = 0; c + 4 < b.length; c += 4) {
          h = d(h);
          g = f(g, a.encrypt(f(h, b.slice(c, c + 4))));
        }
        b = b.slice(c);
        if (e.bitLength(b) < 128) {
          h = f(h, d(h));
          b = e.concat(b, [2147483648 | 0, 0, 0, 0]);
        }
        g = f(g, b);
        return a.encrypt(f(d(f(h, d(h))), g));
      },
      B: function(a) {
        return [a[0] << 1 ^ a[1] >>> 31, a[1] << 1 ^ a[2] >>> 31, a[2] << 1 ^ a[3] >>> 31, a[3] << 1 ^ (a[0] >>> 31) * 135];
      }
    };
    sjcl.misc.hmac = function(a, b) {
      this.M = b = b || sjcl.hash.sha256;
      var c = [[], []],
          d = b.prototype.blockSize / 32;
      this.l = [new b, new b];
      if (a.length > d)
        a = b.hash(a);
      for (b = 0; b < d; b++) {
        c[0][b] = a[b] ^ 909522486;
        c[1][b] = a[b] ^ 1549556828;
      }
      this.l[0].update(c[0]);
      this.l[1].update(c[1]);
    };
    sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function(a) {
      a = (new this.M(this.l[0])).update(a).finalize();
      return (new this.M(this.l[1])).update(a).finalize();
    };
    sjcl.misc.pbkdf2 = function(a, b, c, d, e) {
      c = c || 1E3;
      if (d < 0 || c < 0)
        throw sjcl.exception.invalid("invalid params to pbkdf2");
      if (typeof a === "string")
        a = sjcl.codec.utf8String.toBits(a);
      e = e || sjcl.misc.hmac;
      a = new e(a);
      var f,
          g,
          h,
          i,
          k = [],
          j = sjcl.bitArray;
      for (i = 1; 32 * k.length < (d || 1); i++) {
        e = f = a.encrypt(j.concat(b, [i]));
        for (g = 1; g < c; g++) {
          f = a.encrypt(f);
          for (h = 0; h < f.length; h++)
            e[h] ^= f[h];
        }
        k = k.concat(e);
      }
      if (d)
        k = j.clamp(k, d);
      return k;
    };
    sjcl.random = {
      randomWords: function(a, b) {
        var c = [];
        b = this.isReady(b);
        var d;
        if (b === 0)
          throw new sjcl.exception.notReady("generator isn't seeded");
        else
          b & 2 && this.U(!(b & 1));
        for (b = 0; b < a; b += 4) {
          (b + 1) % 0x10000 === 0 && this.L();
          d = this.w();
          c.push(d[0], d[1], d[2], d[3]);
        }
        this.L();
        return c.slice(0, a);
      },
      setDefaultParanoia: function(a) {
        this.t = a;
      },
      addEntropy: function(a, b, c) {
        c = c || "user";
        var d,
            e,
            f = (new Date).valueOf(),
            g = this.q[c],
            h = this.isReady(),
            i = 0;
        d = this.G[c];
        if (d === undefined)
          d = this.G[c] = this.R++;
        if (g === undefined)
          g = this.q[c] = 0;
        this.q[c] = (this.q[c] + 1) % this.b.length;
        switch (typeof a) {
          case "number":
            if (b === undefined)
              b = 1;
            this.b[g].update([d, this.u++, 1, b, f, 1, a | 0]);
            break;
          case "object":
            c = Object.prototype.toString.call(a);
            if (c === "[object Uint32Array]") {
              e = [];
              for (c = 0; c < a.length; c++)
                e.push(a[c]);
              a = e;
            } else {
              if (c !== "[object Array]")
                i = 1;
              for (c = 0; c < a.length && !i; c++)
                if (typeof a[c] != "number")
                  i = 1;
            }
            if (!i) {
              if (b === undefined)
                for (c = b = 0; c < a.length; c++)
                  for (e = a[c]; e > 0; ) {
                    b++;
                    e >>>= 1;
                  }
              this.b[g].update([d, this.u++, 2, b, f, a.length].concat(a));
            }
            break;
          case "string":
            if (b === undefined)
              b = a.length;
            this.b[g].update([d, this.u++, 3, b, f, a.length]);
            this.b[g].update(a);
            break;
          default:
            i = 1;
        }
        if (i)
          throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");
        this.j[g] += b;
        this.f += b;
        if (h === 0) {
          this.isReady() !== 0 && this.K("seeded", Math.max(this.g, this.f));
          this.K("progress", this.getProgress());
        }
      },
      isReady: function(a) {
        a = this.C[a !== undefined ? a : this.t];
        return this.g && this.g >= a ? this.j[0] > 80 && (new Date).valueOf() > this.O ? 3 : 1 : this.f >= a ? 2 : 0;
      },
      getProgress: function(a) {
        a = this.C[a ? a : this.t];
        return this.g >= a ? 1 : this.f > a ? 1 : this.f / a;
      },
      startCollectors: function() {
        if (!this.m) {
          if (window.addEventListener) {
            window.addEventListener("load", this.o, false);
            window.addEventListener("mousemove", this.p, false);
          } else if (document.attachEvent) {
            document.attachEvent("onload", this.o);
            document.attachEvent("onmousemove", this.p);
          } else
            throw new sjcl.exception.bug("can't attach event");
          this.m = true;
        }
      },
      stopCollectors: function() {
        if (this.m) {
          if (window.removeEventListener) {
            window.removeEventListener("load", this.o, false);
            window.removeEventListener("mousemove", this.p, false);
          } else if (window.detachEvent) {
            window.detachEvent("onload", this.o);
            window.detachEvent("onmousemove", this.p);
          }
          this.m = false;
        }
      },
      addEventListener: function(a, b) {
        this.r[a][this.Q++] = b;
      },
      removeEventListener: function(a, b) {
        var c;
        a = this.r[a];
        var d = [];
        for (c in a)
          a.hasOwnProperty(c) && a[c] === b && d.push(c);
        for (b = 0; b < d.length; b++) {
          c = d[b];
          delete a[c];
        }
      },
      b: [new sjcl.hash.sha256],
      j: [0],
      A: 0,
      q: {},
      u: 0,
      G: {},
      R: 0,
      g: 0,
      f: 0,
      O: 0,
      a: [0, 0, 0, 0, 0, 0, 0, 0],
      d: [0, 0, 0, 0],
      s: undefined,
      t: 6,
      m: false,
      r: {
        progress: {},
        seeded: {}
      },
      Q: 0,
      C: [0, 48, 64, 96, 128, 192, 0x100, 384, 512, 768, 1024],
      w: function() {
        for (var a = 0; a < 4; a++) {
          this.d[a] = this.d[a] + 1 | 0;
          if (this.d[a])
            break;
        }
        return this.s.encrypt(this.d);
      },
      L: function() {
        this.a = this.w().concat(this.w());
        this.s = new sjcl.cipher.aes(this.a);
      },
      T: function(a) {
        this.a = sjcl.hash.sha256.hash(this.a.concat(a));
        this.s = new sjcl.cipher.aes(this.a);
        for (a = 0; a < 4; a++) {
          this.d[a] = this.d[a] + 1 | 0;
          if (this.d[a])
            break;
        }
      },
      U: function(a) {
        var b = [],
            c = 0,
            d;
        this.O = b[0] = (new Date).valueOf() + 3E4;
        for (d = 0; d < 16; d++)
          b.push(Math.random() * 0x100000000 | 0);
        for (d = 0; d < this.b.length; d++) {
          b = b.concat(this.b[d].finalize());
          c += this.j[d];
          this.j[d] = 0;
          if (!a && this.A & 1 << d)
            break;
        }
        if (this.A >= 1 << this.b.length) {
          this.b.push(new sjcl.hash.sha256);
          this.j.push(0);
        }
        this.f -= c;
        if (c > this.g)
          this.g = c;
        this.A++;
        this.T(b);
      },
      p: function(a) {
        sjcl.random.addEntropy([a.x || a.clientX || a.offsetX || 0, a.y || a.clientY || a.offsetY || 0], 2, "mouse");
      },
      o: function() {
        sjcl.random.addEntropy((new Date).valueOf(), 2, "loadtime");
      },
      K: function(a, b) {
        var c;
        a = sjcl.random.r[a];
        var d = [];
        for (c in a)
          a.hasOwnProperty(c) && d.push(a[c]);
        for (c = 0; c < d.length; c++)
          d[c](b);
      }
    };
    try {
      var s = new Uint32Array(32);
      crypto.getRandomValues(s);
      sjcl.random.addEntropy(s, 1024, "crypto['getRandomValues']");
    } catch (t) {}
    sjcl.json = {
      defaults: {
        v: 1,
        iter: 1E3,
        ks: 128,
        ts: 64,
        mode: "ccm",
        adata: "",
        cipher: "aes"
      },
      encrypt: function(a, b, c, d) {
        c = c || {};
        d = d || {};
        var e = sjcl.json,
            f = e.c({iv: sjcl.random.randomWords(4, 0)}, e.defaults),
            g;
        e.c(f, c);
        c = f.adata;
        if (typeof f.salt === "string")
          f.salt = sjcl.codec.base64.toBits(f.salt);
        if (typeof f.iv === "string")
          f.iv = sjcl.codec.base64.toBits(f.iv);
        if (!sjcl.mode[f.mode] || !sjcl.cipher[f.cipher] || typeof a === "string" && f.iter <= 100 || f.ts !== 64 && f.ts !== 96 && f.ts !== 128 || f.ks !== 128 && f.ks !== 192 && f.ks !== 0x100 || f.iv.length < 2 || f.iv.length > 4)
          throw new sjcl.exception.invalid("json encrypt: invalid parameters");
        if (typeof a === "string") {
          g = sjcl.misc.cachedPbkdf2(a, f);
          a = g.key.slice(0, f.ks / 32);
          f.salt = g.salt;
        }
        if (typeof b === "string")
          b = sjcl.codec.utf8String.toBits(b);
        if (typeof c === "string")
          c = sjcl.codec.utf8String.toBits(c);
        g = new sjcl.cipher[f.cipher](a);
        e.c(d, f);
        d.key = a;
        f.ct = sjcl.mode[f.mode].encrypt(g, b, f.iv, c, f.ts);
        return e.encode(f);
      },
      decrypt: function(a, b, c, d) {
        c = c || {};
        d = d || {};
        var e = sjcl.json;
        b = e.c(e.c(e.c({}, e.defaults), e.decode(b)), c, true);
        var f;
        c = b.adata;
        if (typeof b.salt === "string")
          b.salt = sjcl.codec.base64.toBits(b.salt);
        if (typeof b.iv === "string")
          b.iv = sjcl.codec.base64.toBits(b.iv);
        if (!sjcl.mode[b.mode] || !sjcl.cipher[b.cipher] || typeof a === "string" && b.iter <= 100 || b.ts !== 64 && b.ts !== 96 && b.ts !== 128 || b.ks !== 128 && b.ks !== 192 && b.ks !== 0x100 || !b.iv || b.iv.length < 2 || b.iv.length > 4)
          throw new sjcl.exception.invalid("json decrypt: invalid parameters");
        if (typeof a === "string") {
          f = sjcl.misc.cachedPbkdf2(a, b);
          a = f.key.slice(0, b.ks / 32);
          b.salt = f.salt;
        }
        if (typeof c === "string")
          c = sjcl.codec.utf8String.toBits(c);
        f = new sjcl.cipher[b.cipher](a);
        c = sjcl.mode[b.mode].decrypt(f, b.ct, b.iv, c, b.ts);
        e.c(d, b);
        d.key = a;
        return sjcl.codec.utf8String.fromBits(c);
      },
      encode: function(a) {
        var b,
            c = "{",
            d = "";
        for (b in a)
          if (a.hasOwnProperty(b)) {
            if (!b.match(/^[a-z0-9]+$/i))
              throw new sjcl.exception.invalid("json encode: invalid property name");
            c += d + '"' + b + '":';
            d = ",";
            switch (typeof a[b]) {
              case "number":
              case "boolean":
                c += a[b];
                break;
              case "string":
                c += '"' + escape(a[b]) + '"';
                break;
              case "object":
                c += '"' + sjcl.codec.base64.fromBits(a[b], 1) + '"';
                break;
              default:
                throw new sjcl.exception.bug("json encode: unsupported type");
            }
          }
        return c + "}";
      },
      decode: function(a) {
        a = a.replace(/\s/g, "");
        if (!a.match(/^\{.*\}$/))
          throw new sjcl.exception.invalid("json decode: this isn't json!");
        a = a.replace(/^\{|\}$/g, "").split(/,/);
        var b = {},
            c,
            d;
        for (c = 0; c < a.length; c++) {
          if (!(d = a[c].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i)))
            throw new sjcl.exception.invalid("json decode: this isn't json!");
          b[d[2]] = d[3] ? parseInt(d[3], 10) : d[2].match(/^(ct|salt|iv)$/) ? sjcl.codec.base64.toBits(d[4]) : unescape(d[4]);
        }
        return b;
      },
      c: function(a, b, c) {
        if (a === undefined)
          a = {};
        if (b === undefined)
          return a;
        var d;
        for (d in b)
          if (b.hasOwnProperty(d)) {
            if (c && a[d] !== undefined && a[d] !== b[d])
              throw new sjcl.exception.invalid("required parameter overridden");
            a[d] = b[d];
          }
        return a;
      },
      V: function(a, b) {
        var c = {},
            d;
        for (d = 0; d < b.length; d++)
          if (a[b[d]] !== undefined)
            c[b[d]] = a[b[d]];
        return c;
      }
    };
    sjcl.encrypt = sjcl.json.encrypt;
    sjcl.decrypt = sjcl.json.decrypt;
    sjcl.misc.S = {};
    sjcl.misc.cachedPbkdf2 = function(a, b) {
      var c = sjcl.misc.S,
          d;
      b = b || {};
      d = b.iter || 1E3;
      c = c[a] = c[a] || {};
      d = c[d] = c[d] || {firstSalt: b.salt && b.salt.length ? b.salt.slice(0) : sjcl.random.randomWords(2, 0)};
      c = b.salt === undefined ? d.firstSalt : b.salt;
      d[c] = d[c] || sjcl.misc.pbkdf2(a, c, b.iter);
      return {
        key: d[c].slice(0),
        salt: c.slice(0)
      };
    };
    this["sjcl"] = sjcl;
    this["s"] = s;
  })();
  return _retrieveGlobal();
});

(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
!function(e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd)
    define("8", [], e);
  else {
    var f;
    "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.io = e();
  }
}(function() {
  var define,
      module,
      exports;
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a)
            return a(o, !0);
          if (i)
            return i(o, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        var f = n[o] = {exports: {}};
        t[o][0].call(f.exports, function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, f, f.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
      s(r[o]);
    return s;
  })({
    1: [function(_dereq_, module, exports) {
      module.exports = _dereq_('./lib/');
    }, {"./lib/": 2}],
    2: [function(_dereq_, module, exports) {
      var url = _dereq_('./url');
      var parser = _dereq_('socket.io-parser');
      var Manager = _dereq_('./manager');
      var debug = _dereq_('debug')('socket.io-client');
      module.exports = exports = lookup;
      var cache = exports.managers = {};
      function lookup(uri, opts) {
        if (typeof uri == 'object') {
          opts = uri;
          uri = undefined;
        }
        opts = opts || {};
        var parsed = url(uri);
        var source = parsed.source;
        var id = parsed.id;
        var io;
        if (opts.forceNew || opts['force new connection'] || false === opts.multiplex) {
          debug('ignoring socket cache for %s', source);
          io = Manager(source, opts);
        } else {
          if (!cache[id]) {
            debug('new io instance for %s', source);
            cache[id] = Manager(source, opts);
          }
          io = cache[id];
        }
        return io.socket(parsed.path);
      }
      exports.protocol = parser.protocol;
      exports.connect = lookup;
      exports.Manager = _dereq_('./manager');
      exports.Socket = _dereq_('./socket');
    }, {
      "./manager": 3,
      "./socket": 5,
      "./url": 6,
      "debug": 10,
      "socket.io-parser": 46
    }],
    3: [function(_dereq_, module, exports) {
      var url = _dereq_('./url');
      var eio = _dereq_('engine.io-client');
      var Socket = _dereq_('./socket');
      var Emitter = _dereq_('component-emitter');
      var parser = _dereq_('socket.io-parser');
      var on = _dereq_('./on');
      var bind = _dereq_('component-bind');
      var object = _dereq_('object-component');
      var debug = _dereq_('debug')('socket.io-client:manager');
      var indexOf = _dereq_('indexof');
      var Backoff = _dereq_('backo2');
      module.exports = Manager;
      function Manager(uri, opts) {
        if (!(this instanceof Manager))
          return new Manager(uri, opts);
        if (uri && ('object' == typeof uri)) {
          opts = uri;
          uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || '/socket.io';
        this.nsps = {};
        this.subs = [];
        this.opts = opts;
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor(opts.randomizationFactor || 0.5);
        this.backoff = new Backoff({
          min: this.reconnectionDelay(),
          max: this.reconnectionDelayMax(),
          jitter: this.randomizationFactor()
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this.readyState = 'closed';
        this.uri = uri;
        this.connected = [];
        this.encoding = false;
        this.packetBuffer = [];
        this.encoder = new parser.Encoder();
        this.decoder = new parser.Decoder();
        this.autoConnect = opts.autoConnect !== false;
        if (this.autoConnect)
          this.open();
      }
      Manager.prototype.emitAll = function() {
        this.emit.apply(this, arguments);
        for (var nsp in this.nsps) {
          this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
        }
      };
      Manager.prototype.updateSocketIds = function() {
        for (var nsp in this.nsps) {
          this.nsps[nsp].id = this.engine.id;
        }
      };
      Emitter(Manager.prototype);
      Manager.prototype.reconnection = function(v) {
        if (!arguments.length)
          return this._reconnection;
        this._reconnection = !!v;
        return this;
      };
      Manager.prototype.reconnectionAttempts = function(v) {
        if (!arguments.length)
          return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
      };
      Manager.prototype.reconnectionDelay = function(v) {
        if (!arguments.length)
          return this._reconnectionDelay;
        this._reconnectionDelay = v;
        this.backoff && this.backoff.setMin(v);
        return this;
      };
      Manager.prototype.randomizationFactor = function(v) {
        if (!arguments.length)
          return this._randomizationFactor;
        this._randomizationFactor = v;
        this.backoff && this.backoff.setJitter(v);
        return this;
      };
      Manager.prototype.reconnectionDelayMax = function(v) {
        if (!arguments.length)
          return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        this.backoff && this.backoff.setMax(v);
        return this;
      };
      Manager.prototype.timeout = function(v) {
        if (!arguments.length)
          return this._timeout;
        this._timeout = v;
        return this;
      };
      Manager.prototype.maybeReconnectOnOpen = function() {
        if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
          this.reconnect();
        }
      };
      Manager.prototype.open = Manager.prototype.connect = function(fn) {
        debug('readyState %s', this.readyState);
        if (~this.readyState.indexOf('open'))
          return this;
        debug('opening %s', this.uri);
        this.engine = eio(this.uri, this.opts);
        var socket = this.engine;
        var self = this;
        this.readyState = 'opening';
        this.skipReconnect = false;
        var openSub = on(socket, 'open', function() {
          self.onopen();
          fn && fn();
        });
        var errorSub = on(socket, 'error', function(data) {
          debug('connect_error');
          self.cleanup();
          self.readyState = 'closed';
          self.emitAll('connect_error', data);
          if (fn) {
            var err = new Error('Connection error');
            err.data = data;
            fn(err);
          } else {
            self.maybeReconnectOnOpen();
          }
        });
        if (false !== this._timeout) {
          var timeout = this._timeout;
          debug('connect attempt will timeout after %d', timeout);
          var timer = setTimeout(function() {
            debug('connect attempt timed out after %d', timeout);
            openSub.destroy();
            socket.close();
            socket.emit('error', 'timeout');
            self.emitAll('connect_timeout', timeout);
          }, timeout);
          this.subs.push({destroy: function() {
              clearTimeout(timer);
            }});
        }
        this.subs.push(openSub);
        this.subs.push(errorSub);
        return this;
      };
      Manager.prototype.onopen = function() {
        debug('open');
        this.cleanup();
        this.readyState = 'open';
        this.emit('open');
        var socket = this.engine;
        this.subs.push(on(socket, 'data', bind(this, 'ondata')));
        this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
        this.subs.push(on(socket, 'error', bind(this, 'onerror')));
        this.subs.push(on(socket, 'close', bind(this, 'onclose')));
      };
      Manager.prototype.ondata = function(data) {
        this.decoder.add(data);
      };
      Manager.prototype.ondecoded = function(packet) {
        this.emit('packet', packet);
      };
      Manager.prototype.onerror = function(err) {
        debug('error', err);
        this.emitAll('error', err);
      };
      Manager.prototype.socket = function(nsp) {
        var socket = this.nsps[nsp];
        if (!socket) {
          socket = new Socket(this, nsp);
          this.nsps[nsp] = socket;
          var self = this;
          socket.on('connect', function() {
            socket.id = self.engine.id;
            if (!~indexOf(self.connected, socket)) {
              self.connected.push(socket);
            }
          });
        }
        return socket;
      };
      Manager.prototype.destroy = function(socket) {
        var index = indexOf(this.connected, socket);
        if (~index)
          this.connected.splice(index, 1);
        if (this.connected.length)
          return;
        this.close();
      };
      Manager.prototype.packet = function(packet) {
        debug('writing packet %j', packet);
        var self = this;
        if (!self.encoding) {
          self.encoding = true;
          this.encoder.encode(packet, function(encodedPackets) {
            for (var i = 0; i < encodedPackets.length; i++) {
              self.engine.write(encodedPackets[i]);
            }
            self.encoding = false;
            self.processPacketQueue();
          });
        } else {
          self.packetBuffer.push(packet);
        }
      };
      Manager.prototype.processPacketQueue = function() {
        if (this.packetBuffer.length > 0 && !this.encoding) {
          var pack = this.packetBuffer.shift();
          this.packet(pack);
        }
      };
      Manager.prototype.cleanup = function() {
        var sub;
        while (sub = this.subs.shift())
          sub.destroy();
        this.packetBuffer = [];
        this.encoding = false;
        this.decoder.destroy();
      };
      Manager.prototype.close = Manager.prototype.disconnect = function() {
        this.skipReconnect = true;
        this.backoff.reset();
        this.readyState = 'closed';
        this.engine && this.engine.close();
      };
      Manager.prototype.onclose = function(reason) {
        debug('close');
        this.cleanup();
        this.backoff.reset();
        this.readyState = 'closed';
        this.emit('close', reason);
        if (this._reconnection && !this.skipReconnect) {
          this.reconnect();
        }
      };
      Manager.prototype.reconnect = function() {
        if (this.reconnecting || this.skipReconnect)
          return this;
        var self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
          debug('reconnect failed');
          this.backoff.reset();
          this.emitAll('reconnect_failed');
          this.reconnecting = false;
        } else {
          var delay = this.backoff.duration();
          debug('will wait %dms before reconnect attempt', delay);
          this.reconnecting = true;
          var timer = setTimeout(function() {
            if (self.skipReconnect)
              return;
            debug('attempting reconnect');
            self.emitAll('reconnect_attempt', self.backoff.attempts);
            self.emitAll('reconnecting', self.backoff.attempts);
            if (self.skipReconnect)
              return;
            self.open(function(err) {
              if (err) {
                debug('reconnect attempt error');
                self.reconnecting = false;
                self.reconnect();
                self.emitAll('reconnect_error', err.data);
              } else {
                debug('reconnect success');
                self.onreconnect();
              }
            });
          }, delay);
          this.subs.push({destroy: function() {
              clearTimeout(timer);
            }});
        }
      };
      Manager.prototype.onreconnect = function() {
        var attempt = this.backoff.attempts;
        this.reconnecting = false;
        this.backoff.reset();
        this.updateSocketIds();
        this.emitAll('reconnect', attempt);
      };
    }, {
      "./on": 4,
      "./socket": 5,
      "./url": 6,
      "backo2": 7,
      "component-bind": 8,
      "component-emitter": 9,
      "debug": 10,
      "engine.io-client": 11,
      "indexof": 42,
      "object-component": 43,
      "socket.io-parser": 46
    }],
    4: [function(_dereq_, module, exports) {
      module.exports = on;
      function on(obj, ev, fn) {
        obj.on(ev, fn);
        return {destroy: function() {
            obj.removeListener(ev, fn);
          }};
      }
    }, {}],
    5: [function(_dereq_, module, exports) {
      var parser = _dereq_('socket.io-parser');
      var Emitter = _dereq_('component-emitter');
      var toArray = _dereq_('to-array');
      var on = _dereq_('./on');
      var bind = _dereq_('component-bind');
      var debug = _dereq_('debug')('socket.io-client:socket');
      var hasBin = _dereq_('has-binary');
      module.exports = exports = Socket;
      var events = {
        connect: 1,
        connect_error: 1,
        connect_timeout: 1,
        disconnect: 1,
        error: 1,
        reconnect: 1,
        reconnect_attempt: 1,
        reconnect_failed: 1,
        reconnect_error: 1,
        reconnecting: 1
      };
      var emit = Emitter.prototype.emit;
      function Socket(io, nsp) {
        this.io = io;
        this.nsp = nsp;
        this.json = this;
        this.ids = 0;
        this.acks = {};
        if (this.io.autoConnect)
          this.open();
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.connected = false;
        this.disconnected = true;
      }
      Emitter(Socket.prototype);
      Socket.prototype.subEvents = function() {
        if (this.subs)
          return;
        var io = this.io;
        this.subs = [on(io, 'open', bind(this, 'onopen')), on(io, 'packet', bind(this, 'onpacket')), on(io, 'close', bind(this, 'onclose'))];
      };
      Socket.prototype.open = Socket.prototype.connect = function() {
        if (this.connected)
          return this;
        this.subEvents();
        this.io.open();
        if ('open' == this.io.readyState)
          this.onopen();
        return this;
      };
      Socket.prototype.send = function() {
        var args = toArray(arguments);
        args.unshift('message');
        this.emit.apply(this, args);
        return this;
      };
      Socket.prototype.emit = function(ev) {
        if (events.hasOwnProperty(ev)) {
          emit.apply(this, arguments);
          return this;
        }
        var args = toArray(arguments);
        var parserType = parser.EVENT;
        if (hasBin(args)) {
          parserType = parser.BINARY_EVENT;
        }
        var packet = {
          type: parserType,
          data: args
        };
        if ('function' == typeof args[args.length - 1]) {
          debug('emitting packet with ack id %d', this.ids);
          this.acks[this.ids] = args.pop();
          packet.id = this.ids++;
        }
        if (this.connected) {
          this.packet(packet);
        } else {
          this.sendBuffer.push(packet);
        }
        return this;
      };
      Socket.prototype.packet = function(packet) {
        packet.nsp = this.nsp;
        this.io.packet(packet);
      };
      Socket.prototype.onopen = function() {
        debug('transport is open - connecting');
        if ('/' != this.nsp) {
          this.packet({type: parser.CONNECT});
        }
      };
      Socket.prototype.onclose = function(reason) {
        debug('close (%s)', reason);
        this.connected = false;
        this.disconnected = true;
        delete this.id;
        this.emit('disconnect', reason);
      };
      Socket.prototype.onpacket = function(packet) {
        if (packet.nsp != this.nsp)
          return;
        switch (packet.type) {
          case parser.CONNECT:
            this.onconnect();
            break;
          case parser.EVENT:
            this.onevent(packet);
            break;
          case parser.BINARY_EVENT:
            this.onevent(packet);
            break;
          case parser.ACK:
            this.onack(packet);
            break;
          case parser.BINARY_ACK:
            this.onack(packet);
            break;
          case parser.DISCONNECT:
            this.ondisconnect();
            break;
          case parser.ERROR:
            this.emit('error', packet.data);
            break;
        }
      };
      Socket.prototype.onevent = function(packet) {
        var args = packet.data || [];
        debug('emitting event %j', args);
        if (null != packet.id) {
          debug('attaching ack callback to event');
          args.push(this.ack(packet.id));
        }
        if (this.connected) {
          emit.apply(this, args);
        } else {
          this.receiveBuffer.push(args);
        }
      };
      Socket.prototype.ack = function(id) {
        var self = this;
        var sent = false;
        return function() {
          if (sent)
            return;
          sent = true;
          var args = toArray(arguments);
          debug('sending ack %j', args);
          var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
          self.packet({
            type: type,
            id: id,
            data: args
          });
        };
      };
      Socket.prototype.onack = function(packet) {
        debug('calling ack %s with %j', packet.id, packet.data);
        var fn = this.acks[packet.id];
        fn.apply(this, packet.data);
        delete this.acks[packet.id];
      };
      Socket.prototype.onconnect = function() {
        this.connected = true;
        this.disconnected = false;
        this.emit('connect');
        this.emitBuffered();
      };
      Socket.prototype.emitBuffered = function() {
        var i;
        for (i = 0; i < this.receiveBuffer.length; i++) {
          emit.apply(this, this.receiveBuffer[i]);
        }
        this.receiveBuffer = [];
        for (i = 0; i < this.sendBuffer.length; i++) {
          this.packet(this.sendBuffer[i]);
        }
        this.sendBuffer = [];
      };
      Socket.prototype.ondisconnect = function() {
        debug('server disconnect (%s)', this.nsp);
        this.destroy();
        this.onclose('io server disconnect');
      };
      Socket.prototype.destroy = function() {
        if (this.subs) {
          for (var i = 0; i < this.subs.length; i++) {
            this.subs[i].destroy();
          }
          this.subs = null;
        }
        this.io.destroy(this);
      };
      Socket.prototype.close = Socket.prototype.disconnect = function() {
        if (this.connected) {
          debug('performing disconnect (%s)', this.nsp);
          this.packet({type: parser.DISCONNECT});
        }
        this.destroy();
        if (this.connected) {
          this.onclose('io client disconnect');
        }
        return this;
      };
    }, {
      "./on": 4,
      "component-bind": 8,
      "component-emitter": 9,
      "debug": 10,
      "has-binary": 38,
      "socket.io-parser": 46,
      "to-array": 50
    }],
    6: [function(_dereq_, module, exports) {
      (function(global) {
        var parseuri = _dereq_('parseuri');
        var debug = _dereq_('debug')('socket.io-client:url');
        module.exports = url;
        function url(uri, loc) {
          var obj = uri;
          var loc = loc || global.location;
          if (null == uri)
            uri = loc.protocol + '//' + loc.host;
          if ('string' == typeof uri) {
            if ('/' == uri.charAt(0)) {
              if ('/' == uri.charAt(1)) {
                uri = loc.protocol + uri;
              } else {
                uri = loc.hostname + uri;
              }
            }
            if (!/^(https?|wss?):\/\//.test(uri)) {
              debug('protocol-less url %s', uri);
              if ('undefined' != typeof loc) {
                uri = loc.protocol + '//' + uri;
              } else {
                uri = 'https://' + uri;
              }
            }
            debug('parse %s', uri);
            obj = parseuri(uri);
          }
          if (!obj.port) {
            if (/^(http|ws)$/.test(obj.protocol)) {
              obj.port = '80';
            } else if (/^(http|ws)s$/.test(obj.protocol)) {
              obj.port = '443';
            }
          }
          obj.path = obj.path || '/';
          obj.id = obj.protocol + '://' + obj.host + ':' + obj.port;
          obj.href = obj.protocol + '://' + obj.host + (loc && loc.port == obj.port ? '' : (':' + obj.port));
          return obj;
        }
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "debug": 10,
      "parseuri": 44
    }],
    7: [function(_dereq_, module, exports) {
      module.exports = Backoff;
      function Backoff(opts) {
        opts = opts || {};
        this.ms = opts.min || 100;
        this.max = opts.max || 10000;
        this.factor = opts.factor || 2;
        this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
        this.attempts = 0;
      }
      Backoff.prototype.duration = function() {
        var ms = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var rand = Math.random();
          var deviation = Math.floor(rand * this.jitter * ms);
          ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
        }
        return Math.min(ms, this.max) | 0;
      };
      Backoff.prototype.reset = function() {
        this.attempts = 0;
      };
      Backoff.prototype.setMin = function(min) {
        this.ms = min;
      };
      Backoff.prototype.setMax = function(max) {
        this.max = max;
      };
      Backoff.prototype.setJitter = function(jitter) {
        this.jitter = jitter;
      };
    }, {}],
    8: [function(_dereq_, module, exports) {
      var slice = [].slice;
      module.exports = function(obj, fn) {
        if ('string' == typeof fn)
          fn = obj[fn];
        if ('function' != typeof fn)
          throw new Error('bind() requires a function');
        var args = slice.call(arguments, 2);
        return function() {
          return fn.apply(obj, args.concat(slice.call(arguments)));
        };
      };
    }, {}],
    9: [function(_dereq_, module, exports) {
      module.exports = Emitter;
      function Emitter(obj) {
        if (obj)
          return mixin(obj);
      }
      ;
      function mixin(obj) {
        for (var key in Emitter.prototype) {
          obj[key] = Emitter.prototype[key];
        }
        return obj;
      }
      Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks[event] = this._callbacks[event] || []).push(fn);
        return this;
      };
      Emitter.prototype.once = function(event, fn) {
        var self = this;
        this._callbacks = this._callbacks || {};
        function on() {
          self.off(event, on);
          fn.apply(this, arguments);
        }
        on.fn = fn;
        this.on(event, on);
        return this;
      };
      Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        if (0 == arguments.length) {
          this._callbacks = {};
          return this;
        }
        var callbacks = this._callbacks[event];
        if (!callbacks)
          return this;
        if (1 == arguments.length) {
          delete this._callbacks[event];
          return this;
        }
        var cb;
        for (var i = 0; i < callbacks.length; i++) {
          cb = callbacks[i];
          if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
          }
        }
        return this;
      };
      Emitter.prototype.emit = function(event) {
        this._callbacks = this._callbacks || {};
        var args = [].slice.call(arguments, 1),
            callbacks = this._callbacks[event];
        if (callbacks) {
          callbacks = callbacks.slice(0);
          for (var i = 0,
              len = callbacks.length; i < len; ++i) {
            callbacks[i].apply(this, args);
          }
        }
        return this;
      };
      Emitter.prototype.listeners = function(event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks[event] || [];
      };
      Emitter.prototype.hasListeners = function(event) {
        return !!this.listeners(event).length;
      };
    }, {}],
    10: [function(_dereq_, module, exports) {
      module.exports = debug;
      function debug(name) {
        if (!debug.enabled(name))
          return function() {};
        return function(fmt) {
          fmt = coerce(fmt);
          var curr = new Date;
          var ms = curr - (debug[name] || curr);
          debug[name] = curr;
          fmt = name + ' ' + fmt + ' +' + debug.humanize(ms);
          window.console && console.log && Function.prototype.apply.call(console.log, console, arguments);
        };
      }
      debug.names = [];
      debug.skips = [];
      debug.enable = function(name) {
        try {
          localStorage.debug = name;
        } catch (e) {}
        var split = (name || '').split(/[\s,]+/),
            len = split.length;
        for (var i = 0; i < len; i++) {
          name = split[i].replace('*', '.*?');
          if (name[0] === '-') {
            debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
          } else {
            debug.names.push(new RegExp('^' + name + '$'));
          }
        }
      };
      debug.disable = function() {
        debug.enable('');
      };
      debug.humanize = function(ms) {
        var sec = 1000,
            min = 60 * 1000,
            hour = 60 * min;
        if (ms >= hour)
          return (ms / hour).toFixed(1) + 'h';
        if (ms >= min)
          return (ms / min).toFixed(1) + 'm';
        if (ms >= sec)
          return (ms / sec | 0) + 's';
        return ms + 'ms';
      };
      debug.enabled = function(name) {
        for (var i = 0,
            len = debug.skips.length; i < len; i++) {
          if (debug.skips[i].test(name)) {
            return false;
          }
        }
        for (var i = 0,
            len = debug.names.length; i < len; i++) {
          if (debug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      };
      function coerce(val) {
        if (val instanceof Error)
          return val.stack || val.message;
        return val;
      }
      try {
        if (window.localStorage)
          debug.enable(localStorage.debug);
      } catch (e) {}
    }, {}],
    11: [function(_dereq_, module, exports) {
      module.exports = _dereq_('./lib/');
    }, {"./lib/": 12}],
    12: [function(_dereq_, module, exports) {
      module.exports = _dereq_('./socket');
      module.exports.parser = _dereq_('engine.io-parser');
    }, {
      "./socket": 13,
      "engine.io-parser": 25
    }],
    13: [function(_dereq_, module, exports) {
      (function(global) {
        var transports = _dereq_('./transports');
        var Emitter = _dereq_('component-emitter');
        var debug = _dereq_('debug')('engine.io-client:socket');
        var index = _dereq_('indexof');
        var parser = _dereq_('engine.io-parser');
        var parseuri = _dereq_('parseuri');
        var parsejson = _dereq_('parsejson');
        var parseqs = _dereq_('parseqs');
        module.exports = Socket;
        function noop() {}
        function Socket(uri, opts) {
          if (!(this instanceof Socket))
            return new Socket(uri, opts);
          opts = opts || {};
          if (uri && 'object' == typeof uri) {
            opts = uri;
            uri = null;
          }
          if (uri) {
            uri = parseuri(uri);
            opts.host = uri.host;
            opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';
            opts.port = uri.port;
            if (uri.query)
              opts.query = uri.query;
          }
          this.secure = null != opts.secure ? opts.secure : (global.location && 'https:' == location.protocol);
          if (opts.host) {
            var pieces = opts.host.split(':');
            opts.hostname = pieces.shift();
            if (pieces.length) {
              opts.port = pieces.pop();
            } else if (!opts.port) {
              opts.port = this.secure ? '443' : '80';
            }
          }
          this.agent = opts.agent || false;
          this.hostname = opts.hostname || (global.location ? location.hostname : 'localhost');
          this.port = opts.port || (global.location && location.port ? location.port : (this.secure ? 443 : 80));
          this.query = opts.query || {};
          if ('string' == typeof this.query)
            this.query = parseqs.decode(this.query);
          this.upgrade = false !== opts.upgrade;
          this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
          this.forceJSONP = !!opts.forceJSONP;
          this.jsonp = false !== opts.jsonp;
          this.forceBase64 = !!opts.forceBase64;
          this.enablesXDR = !!opts.enablesXDR;
          this.timestampParam = opts.timestampParam || 't';
          this.timestampRequests = opts.timestampRequests;
          this.transports = opts.transports || ['polling', 'websocket'];
          this.readyState = '';
          this.writeBuffer = [];
          this.callbackBuffer = [];
          this.policyPort = opts.policyPort || 843;
          this.rememberUpgrade = opts.rememberUpgrade || false;
          this.binaryType = null;
          this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
          this.pfx = opts.pfx || null;
          this.key = opts.key || null;
          this.passphrase = opts.passphrase || null;
          this.cert = opts.cert || null;
          this.ca = opts.ca || null;
          this.ciphers = opts.ciphers || null;
          this.rejectUnauthorized = opts.rejectUnauthorized || null;
          this.open();
        }
        Socket.priorWebsocketSuccess = false;
        Emitter(Socket.prototype);
        Socket.protocol = parser.protocol;
        Socket.Socket = Socket;
        Socket.Transport = _dereq_('./transport');
        Socket.transports = _dereq_('./transports');
        Socket.parser = _dereq_('engine.io-parser');
        Socket.prototype.createTransport = function(name) {
          debug('creating transport "%s"', name);
          var query = clone(this.query);
          query.EIO = parser.protocol;
          query.transport = name;
          if (this.id)
            query.sid = this.id;
          var transport = new transports[name]({
            agent: this.agent,
            hostname: this.hostname,
            port: this.port,
            secure: this.secure,
            path: this.path,
            query: query,
            forceJSONP: this.forceJSONP,
            jsonp: this.jsonp,
            forceBase64: this.forceBase64,
            enablesXDR: this.enablesXDR,
            timestampRequests: this.timestampRequests,
            timestampParam: this.timestampParam,
            policyPort: this.policyPort,
            socket: this,
            pfx: this.pfx,
            key: this.key,
            passphrase: this.passphrase,
            cert: this.cert,
            ca: this.ca,
            ciphers: this.ciphers,
            rejectUnauthorized: this.rejectUnauthorized
          });
          return transport;
        };
        function clone(obj) {
          var o = {};
          for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
              o[i] = obj[i];
            }
          }
          return o;
        }
        Socket.prototype.open = function() {
          var transport;
          if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) {
            transport = 'websocket';
          } else if (0 == this.transports.length) {
            var self = this;
            setTimeout(function() {
              self.emit('error', 'No transports available');
            }, 0);
            return;
          } else {
            transport = this.transports[0];
          }
          this.readyState = 'opening';
          var transport;
          try {
            transport = this.createTransport(transport);
          } catch (e) {
            this.transports.shift();
            this.open();
            return;
          }
          transport.open();
          this.setTransport(transport);
        };
        Socket.prototype.setTransport = function(transport) {
          debug('setting transport %s', transport.name);
          var self = this;
          if (this.transport) {
            debug('clearing existing transport %s', this.transport.name);
            this.transport.removeAllListeners();
          }
          this.transport = transport;
          transport.on('drain', function() {
            self.onDrain();
          }).on('packet', function(packet) {
            self.onPacket(packet);
          }).on('error', function(e) {
            self.onError(e);
          }).on('close', function() {
            self.onClose('transport close');
          });
        };
        Socket.prototype.probe = function(name) {
          debug('probing transport "%s"', name);
          var transport = this.createTransport(name, {probe: 1}),
              failed = false,
              self = this;
          Socket.priorWebsocketSuccess = false;
          function onTransportOpen() {
            if (self.onlyBinaryUpgrades) {
              var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
              failed = failed || upgradeLosesBinary;
            }
            if (failed)
              return;
            debug('probe transport "%s" opened', name);
            transport.send([{
              type: 'ping',
              data: 'probe'
            }]);
            transport.once('packet', function(msg) {
              if (failed)
                return;
              if ('pong' == msg.type && 'probe' == msg.data) {
                debug('probe transport "%s" pong', name);
                self.upgrading = true;
                self.emit('upgrading', transport);
                if (!transport)
                  return;
                Socket.priorWebsocketSuccess = 'websocket' == transport.name;
                debug('pausing current transport "%s"', self.transport.name);
                self.transport.pause(function() {
                  if (failed)
                    return;
                  if ('closed' == self.readyState)
                    return;
                  debug('changing transport and sending upgrade packet');
                  cleanup();
                  self.setTransport(transport);
                  transport.send([{type: 'upgrade'}]);
                  self.emit('upgrade', transport);
                  transport = null;
                  self.upgrading = false;
                  self.flush();
                });
              } else {
                debug('probe transport "%s" failed', name);
                var err = new Error('probe error');
                err.transport = transport.name;
                self.emit('upgradeError', err);
              }
            });
          }
          function freezeTransport() {
            if (failed)
              return;
            failed = true;
            cleanup();
            transport.close();
            transport = null;
          }
          function onerror(err) {
            var error = new Error('probe error: ' + err);
            error.transport = transport.name;
            freezeTransport();
            debug('probe transport "%s" failed because of error: %s', name, err);
            self.emit('upgradeError', error);
          }
          function onTransportClose() {
            onerror("transport closed");
          }
          function onclose() {
            onerror("socket closed");
          }
          function onupgrade(to) {
            if (transport && to.name != transport.name) {
              debug('"%s" works - aborting "%s"', to.name, transport.name);
              freezeTransport();
            }
          }
          function cleanup() {
            transport.removeListener('open', onTransportOpen);
            transport.removeListener('error', onerror);
            transport.removeListener('close', onTransportClose);
            self.removeListener('close', onclose);
            self.removeListener('upgrading', onupgrade);
          }
          transport.once('open', onTransportOpen);
          transport.once('error', onerror);
          transport.once('close', onTransportClose);
          this.once('close', onclose);
          this.once('upgrading', onupgrade);
          transport.open();
        };
        Socket.prototype.onOpen = function() {
          debug('socket open');
          this.readyState = 'open';
          Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;
          this.emit('open');
          this.flush();
          if ('open' == this.readyState && this.upgrade && this.transport.pause) {
            debug('starting upgrade probes');
            for (var i = 0,
                l = this.upgrades.length; i < l; i++) {
              this.probe(this.upgrades[i]);
            }
          }
        };
        Socket.prototype.onPacket = function(packet) {
          if ('opening' == this.readyState || 'open' == this.readyState) {
            debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
            this.emit('packet', packet);
            this.emit('heartbeat');
            switch (packet.type) {
              case 'open':
                this.onHandshake(parsejson(packet.data));
                break;
              case 'pong':
                this.setPing();
                break;
              case 'error':
                var err = new Error('server error');
                err.code = packet.data;
                this.emit('error', err);
                break;
              case 'message':
                this.emit('data', packet.data);
                this.emit('message', packet.data);
                break;
            }
          } else {
            debug('packet received with socket readyState "%s"', this.readyState);
          }
        };
        Socket.prototype.onHandshake = function(data) {
          this.emit('handshake', data);
          this.id = data.sid;
          this.transport.query.sid = data.sid;
          this.upgrades = this.filterUpgrades(data.upgrades);
          this.pingInterval = data.pingInterval;
          this.pingTimeout = data.pingTimeout;
          this.onOpen();
          if ('closed' == this.readyState)
            return;
          this.setPing();
          this.removeListener('heartbeat', this.onHeartbeat);
          this.on('heartbeat', this.onHeartbeat);
        };
        Socket.prototype.onHeartbeat = function(timeout) {
          clearTimeout(this.pingTimeoutTimer);
          var self = this;
          self.pingTimeoutTimer = setTimeout(function() {
            if ('closed' == self.readyState)
              return;
            self.onClose('ping timeout');
          }, timeout || (self.pingInterval + self.pingTimeout));
        };
        Socket.prototype.setPing = function() {
          var self = this;
          clearTimeout(self.pingIntervalTimer);
          self.pingIntervalTimer = setTimeout(function() {
            debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
            self.ping();
            self.onHeartbeat(self.pingTimeout);
          }, self.pingInterval);
        };
        Socket.prototype.ping = function() {
          this.sendPacket('ping');
        };
        Socket.prototype.onDrain = function() {
          for (var i = 0; i < this.prevBufferLen; i++) {
            if (this.callbackBuffer[i]) {
              this.callbackBuffer[i]();
            }
          }
          this.writeBuffer.splice(0, this.prevBufferLen);
          this.callbackBuffer.splice(0, this.prevBufferLen);
          this.prevBufferLen = 0;
          if (this.writeBuffer.length == 0) {
            this.emit('drain');
          } else {
            this.flush();
          }
        };
        Socket.prototype.flush = function() {
          if ('closed' != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
            debug('flushing %d packets in socket', this.writeBuffer.length);
            this.transport.send(this.writeBuffer);
            this.prevBufferLen = this.writeBuffer.length;
            this.emit('flush');
          }
        };
        Socket.prototype.write = Socket.prototype.send = function(msg, fn) {
          this.sendPacket('message', msg, fn);
          return this;
        };
        Socket.prototype.sendPacket = function(type, data, fn) {
          if ('closing' == this.readyState || 'closed' == this.readyState) {
            return;
          }
          var packet = {
            type: type,
            data: data
          };
          this.emit('packetCreate', packet);
          this.writeBuffer.push(packet);
          this.callbackBuffer.push(fn);
          this.flush();
        };
        Socket.prototype.close = function() {
          if ('opening' == this.readyState || 'open' == this.readyState) {
            this.readyState = 'closing';
            var self = this;
            function close() {
              self.onClose('forced close');
              debug('socket closing - telling transport to close');
              self.transport.close();
            }
            function cleanupAndClose() {
              self.removeListener('upgrade', cleanupAndClose);
              self.removeListener('upgradeError', cleanupAndClose);
              close();
            }
            function waitForUpgrade() {
              self.once('upgrade', cleanupAndClose);
              self.once('upgradeError', cleanupAndClose);
            }
            if (this.writeBuffer.length) {
              this.once('drain', function() {
                if (this.upgrading) {
                  waitForUpgrade();
                } else {
                  close();
                }
              });
            } else if (this.upgrading) {
              waitForUpgrade();
            } else {
              close();
            }
          }
          return this;
        };
        Socket.prototype.onError = function(err) {
          debug('socket error %j', err);
          Socket.priorWebsocketSuccess = false;
          this.emit('error', err);
          this.onClose('transport error', err);
        };
        Socket.prototype.onClose = function(reason, desc) {
          if ('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState) {
            debug('socket close with reason: "%s"', reason);
            var self = this;
            clearTimeout(this.pingIntervalTimer);
            clearTimeout(this.pingTimeoutTimer);
            setTimeout(function() {
              self.writeBuffer = [];
              self.callbackBuffer = [];
              self.prevBufferLen = 0;
            }, 0);
            this.transport.removeAllListeners('close');
            this.transport.close();
            this.transport.removeAllListeners();
            this.readyState = 'closed';
            this.id = null;
            this.emit('close', reason, desc);
          }
        };
        Socket.prototype.filterUpgrades = function(upgrades) {
          var filteredUpgrades = [];
          for (var i = 0,
              j = upgrades.length; i < j; i++) {
            if (~index(this.transports, upgrades[i]))
              filteredUpgrades.push(upgrades[i]);
          }
          return filteredUpgrades;
        };
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./transport": 14,
      "./transports": 15,
      "component-emitter": 9,
      "debug": 22,
      "engine.io-parser": 25,
      "indexof": 42,
      "parsejson": 34,
      "parseqs": 35,
      "parseuri": 36
    }],
    14: [function(_dereq_, module, exports) {
      var parser = _dereq_('engine.io-parser');
      var Emitter = _dereq_('component-emitter');
      module.exports = Transport;
      function Transport(opts) {
        this.path = opts.path;
        this.hostname = opts.hostname;
        this.port = opts.port;
        this.secure = opts.secure;
        this.query = opts.query;
        this.timestampParam = opts.timestampParam;
        this.timestampRequests = opts.timestampRequests;
        this.readyState = '';
        this.agent = opts.agent || false;
        this.socket = opts.socket;
        this.enablesXDR = opts.enablesXDR;
        this.pfx = opts.pfx;
        this.key = opts.key;
        this.passphrase = opts.passphrase;
        this.cert = opts.cert;
        this.ca = opts.ca;
        this.ciphers = opts.ciphers;
        this.rejectUnauthorized = opts.rejectUnauthorized;
      }
      Emitter(Transport.prototype);
      Transport.timestamps = 0;
      Transport.prototype.onError = function(msg, desc) {
        var err = new Error(msg);
        err.type = 'TransportError';
        err.description = desc;
        this.emit('error', err);
        return this;
      };
      Transport.prototype.open = function() {
        if ('closed' == this.readyState || '' == this.readyState) {
          this.readyState = 'opening';
          this.doOpen();
        }
        return this;
      };
      Transport.prototype.close = function() {
        if ('opening' == this.readyState || 'open' == this.readyState) {
          this.doClose();
          this.onClose();
        }
        return this;
      };
      Transport.prototype.send = function(packets) {
        if ('open' == this.readyState) {
          this.write(packets);
        } else {
          throw new Error('Transport not open');
        }
      };
      Transport.prototype.onOpen = function() {
        this.readyState = 'open';
        this.writable = true;
        this.emit('open');
      };
      Transport.prototype.onData = function(data) {
        var packet = parser.decodePacket(data, this.socket.binaryType);
        this.onPacket(packet);
      };
      Transport.prototype.onPacket = function(packet) {
        this.emit('packet', packet);
      };
      Transport.prototype.onClose = function() {
        this.readyState = 'closed';
        this.emit('close');
      };
    }, {
      "component-emitter": 9,
      "engine.io-parser": 25
    }],
    15: [function(_dereq_, module, exports) {
      (function(global) {
        var XMLHttpRequest = _dereq_('xmlhttprequest');
        var XHR = _dereq_('./polling-xhr');
        var JSONP = _dereq_('./polling-jsonp');
        var websocket = _dereq_('./websocket');
        exports.polling = polling;
        exports.websocket = websocket;
        function polling(opts) {
          var xhr;
          var xd = false;
          var xs = false;
          var jsonp = false !== opts.jsonp;
          if (global.location) {
            var isSSL = 'https:' == location.protocol;
            var port = location.port;
            if (!port) {
              port = isSSL ? 443 : 80;
            }
            xd = opts.hostname != location.hostname || port != opts.port;
            xs = opts.secure != isSSL;
          }
          opts.xdomain = xd;
          opts.xscheme = xs;
          xhr = new XMLHttpRequest(opts);
          if ('open' in xhr && !opts.forceJSONP) {
            return new XHR(opts);
          } else {
            if (!jsonp)
              throw new Error('JSONP disabled');
            return new JSONP(opts);
          }
        }
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./polling-jsonp": 16,
      "./polling-xhr": 17,
      "./websocket": 19,
      "xmlhttprequest": 20
    }],
    16: [function(_dereq_, module, exports) {
      (function(global) {
        var Polling = _dereq_('./polling');
        var inherit = _dereq_('component-inherit');
        module.exports = JSONPPolling;
        var rNewline = /\n/g;
        var rEscapedNewline = /\\n/g;
        var callbacks;
        var index = 0;
        function empty() {}
        function JSONPPolling(opts) {
          Polling.call(this, opts);
          this.query = this.query || {};
          if (!callbacks) {
            if (!global.___eio)
              global.___eio = [];
            callbacks = global.___eio;
          }
          this.index = callbacks.length;
          var self = this;
          callbacks.push(function(msg) {
            self.onData(msg);
          });
          this.query.j = this.index;
          if (global.document && global.addEventListener) {
            global.addEventListener('beforeunload', function() {
              if (self.script)
                self.script.onerror = empty;
            }, false);
          }
        }
        inherit(JSONPPolling, Polling);
        JSONPPolling.prototype.supportsBinary = false;
        JSONPPolling.prototype.doClose = function() {
          if (this.script) {
            this.script.parentNode.removeChild(this.script);
            this.script = null;
          }
          if (this.form) {
            this.form.parentNode.removeChild(this.form);
            this.form = null;
            this.iframe = null;
          }
          Polling.prototype.doClose.call(this);
        };
        JSONPPolling.prototype.doPoll = function() {
          var self = this;
          var script = document.createElement('script');
          if (this.script) {
            this.script.parentNode.removeChild(this.script);
            this.script = null;
          }
          script.async = true;
          script.src = this.uri();
          script.onerror = function(e) {
            self.onError('jsonp poll error', e);
          };
          var insertAt = document.getElementsByTagName('script')[0];
          insertAt.parentNode.insertBefore(script, insertAt);
          this.script = script;
          var isUAgecko = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);
          if (isUAgecko) {
            setTimeout(function() {
              var iframe = document.createElement('iframe');
              document.body.appendChild(iframe);
              document.body.removeChild(iframe);
            }, 100);
          }
        };
        JSONPPolling.prototype.doWrite = function(data, fn) {
          var self = this;
          if (!this.form) {
            var form = document.createElement('form');
            var area = document.createElement('textarea');
            var id = this.iframeId = 'eio_iframe_' + this.index;
            var iframe;
            form.className = 'socketio';
            form.style.position = 'absolute';
            form.style.top = '-1000px';
            form.style.left = '-1000px';
            form.target = id;
            form.method = 'POST';
            form.setAttribute('accept-charset', 'utf-8');
            area.name = 'd';
            form.appendChild(area);
            document.body.appendChild(form);
            this.form = form;
            this.area = area;
          }
          this.form.action = this.uri();
          function complete() {
            initIframe();
            fn();
          }
          function initIframe() {
            if (self.iframe) {
              try {
                self.form.removeChild(self.iframe);
              } catch (e) {
                self.onError('jsonp polling iframe removal error', e);
              }
            }
            try {
              var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
              iframe = document.createElement(html);
            } catch (e) {
              iframe = document.createElement('iframe');
              iframe.name = self.iframeId;
              iframe.src = 'javascript:0';
            }
            iframe.id = self.iframeId;
            self.form.appendChild(iframe);
            self.iframe = iframe;
          }
          initIframe();
          data = data.replace(rEscapedNewline, '\\\n');
          this.area.value = data.replace(rNewline, '\\n');
          try {
            this.form.submit();
          } catch (e) {}
          if (this.iframe.attachEvent) {
            this.iframe.onreadystatechange = function() {
              if (self.iframe.readyState == 'complete') {
                complete();
              }
            };
          } else {
            this.iframe.onload = complete;
          }
        };
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./polling": 18,
      "component-inherit": 21
    }],
    17: [function(_dereq_, module, exports) {
      (function(global) {
        var XMLHttpRequest = _dereq_('xmlhttprequest');
        var Polling = _dereq_('./polling');
        var Emitter = _dereq_('component-emitter');
        var inherit = _dereq_('component-inherit');
        var debug = _dereq_('debug')('engine.io-client:polling-xhr');
        module.exports = XHR;
        module.exports.Request = Request;
        function empty() {}
        function XHR(opts) {
          Polling.call(this, opts);
          if (global.location) {
            var isSSL = 'https:' == location.protocol;
            var port = location.port;
            if (!port) {
              port = isSSL ? 443 : 80;
            }
            this.xd = opts.hostname != global.location.hostname || port != opts.port;
            this.xs = opts.secure != isSSL;
          }
        }
        inherit(XHR, Polling);
        XHR.prototype.supportsBinary = true;
        XHR.prototype.request = function(opts) {
          opts = opts || {};
          opts.uri = this.uri();
          opts.xd = this.xd;
          opts.xs = this.xs;
          opts.agent = this.agent || false;
          opts.supportsBinary = this.supportsBinary;
          opts.enablesXDR = this.enablesXDR;
          opts.pfx = this.pfx;
          opts.key = this.key;
          opts.passphrase = this.passphrase;
          opts.cert = this.cert;
          opts.ca = this.ca;
          opts.ciphers = this.ciphers;
          opts.rejectUnauthorized = this.rejectUnauthorized;
          return new Request(opts);
        };
        XHR.prototype.doWrite = function(data, fn) {
          var isBinary = typeof data !== 'string' && data !== undefined;
          var req = this.request({
            method: 'POST',
            data: data,
            isBinary: isBinary
          });
          var self = this;
          req.on('success', fn);
          req.on('error', function(err) {
            self.onError('xhr post error', err);
          });
          this.sendXhr = req;
        };
        XHR.prototype.doPoll = function() {
          debug('xhr poll');
          var req = this.request();
          var self = this;
          req.on('data', function(data) {
            self.onData(data);
          });
          req.on('error', function(err) {
            self.onError('xhr poll error', err);
          });
          this.pollXhr = req;
        };
        function Request(opts) {
          this.method = opts.method || 'GET';
          this.uri = opts.uri;
          this.xd = !!opts.xd;
          this.xs = !!opts.xs;
          this.async = false !== opts.async;
          this.data = undefined != opts.data ? opts.data : null;
          this.agent = opts.agent;
          this.isBinary = opts.isBinary;
          this.supportsBinary = opts.supportsBinary;
          this.enablesXDR = opts.enablesXDR;
          this.pfx = opts.pfx;
          this.key = opts.key;
          this.passphrase = opts.passphrase;
          this.cert = opts.cert;
          this.ca = opts.ca;
          this.ciphers = opts.ciphers;
          this.rejectUnauthorized = opts.rejectUnauthorized;
          this.create();
        }
        Emitter(Request.prototype);
        Request.prototype.create = function() {
          var opts = {
            agent: this.agent,
            xdomain: this.xd,
            xscheme: this.xs,
            enablesXDR: this.enablesXDR
          };
          opts.pfx = this.pfx;
          opts.key = this.key;
          opts.passphrase = this.passphrase;
          opts.cert = this.cert;
          opts.ca = this.ca;
          opts.ciphers = this.ciphers;
          opts.rejectUnauthorized = this.rejectUnauthorized;
          var xhr = this.xhr = new XMLHttpRequest(opts);
          var self = this;
          try {
            debug('xhr open %s: %s', this.method, this.uri);
            xhr.open(this.method, this.uri, this.async);
            if (this.supportsBinary) {
              xhr.responseType = 'arraybuffer';
            }
            if ('POST' == this.method) {
              try {
                if (this.isBinary) {
                  xhr.setRequestHeader('Content-type', 'application/octet-stream');
                } else {
                  xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
                }
              } catch (e) {}
            }
            if ('withCredentials' in xhr) {
              xhr.withCredentials = true;
            }
            if (this.hasXDR()) {
              xhr.onload = function() {
                self.onLoad();
              };
              xhr.onerror = function() {
                self.onError(xhr.responseText);
              };
            } else {
              xhr.onreadystatechange = function() {
                if (4 != xhr.readyState)
                  return;
                if (200 == xhr.status || 1223 == xhr.status) {
                  self.onLoad();
                } else {
                  setTimeout(function() {
                    self.onError(xhr.status);
                  }, 0);
                }
              };
            }
            debug('xhr data %s', this.data);
            xhr.send(this.data);
          } catch (e) {
            setTimeout(function() {
              self.onError(e);
            }, 0);
            return;
          }
          if (global.document) {
            this.index = Request.requestsCount++;
            Request.requests[this.index] = this;
          }
        };
        Request.prototype.onSuccess = function() {
          this.emit('success');
          this.cleanup();
        };
        Request.prototype.onData = function(data) {
          this.emit('data', data);
          this.onSuccess();
        };
        Request.prototype.onError = function(err) {
          this.emit('error', err);
          this.cleanup(true);
        };
        Request.prototype.cleanup = function(fromError) {
          if ('undefined' == typeof this.xhr || null === this.xhr) {
            return;
          }
          if (this.hasXDR()) {
            this.xhr.onload = this.xhr.onerror = empty;
          } else {
            this.xhr.onreadystatechange = empty;
          }
          if (fromError) {
            try {
              this.xhr.abort();
            } catch (e) {}
          }
          if (global.document) {
            delete Request.requests[this.index];
          }
          this.xhr = null;
        };
        Request.prototype.onLoad = function() {
          var data;
          try {
            var contentType;
            try {
              contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
            } catch (e) {}
            if (contentType === 'application/octet-stream') {
              data = this.xhr.response;
            } else {
              if (!this.supportsBinary) {
                data = this.xhr.responseText;
              } else {
                data = 'ok';
              }
            }
          } catch (e) {
            this.onError(e);
          }
          if (null != data) {
            this.onData(data);
          }
        };
        Request.prototype.hasXDR = function() {
          return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
        };
        Request.prototype.abort = function() {
          this.cleanup();
        };
        if (global.document) {
          Request.requestsCount = 0;
          Request.requests = {};
          if (global.attachEvent) {
            global.attachEvent('onunload', unloadHandler);
          } else if (global.addEventListener) {
            global.addEventListener('beforeunload', unloadHandler, false);
          }
        }
        function unloadHandler() {
          for (var i in Request.requests) {
            if (Request.requests.hasOwnProperty(i)) {
              Request.requests[i].abort();
            }
          }
        }
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./polling": 18,
      "component-emitter": 9,
      "component-inherit": 21,
      "debug": 22,
      "xmlhttprequest": 20
    }],
    18: [function(_dereq_, module, exports) {
      var Transport = _dereq_('../transport');
      var parseqs = _dereq_('parseqs');
      var parser = _dereq_('engine.io-parser');
      var inherit = _dereq_('component-inherit');
      var debug = _dereq_('debug')('engine.io-client:polling');
      module.exports = Polling;
      var hasXHR2 = (function() {
        var XMLHttpRequest = _dereq_('xmlhttprequest');
        var xhr = new XMLHttpRequest({xdomain: false});
        return null != xhr.responseType;
      })();
      function Polling(opts) {
        var forceBase64 = (opts && opts.forceBase64);
        if (!hasXHR2 || forceBase64) {
          this.supportsBinary = false;
        }
        Transport.call(this, opts);
      }
      inherit(Polling, Transport);
      Polling.prototype.name = 'polling';
      Polling.prototype.doOpen = function() {
        this.poll();
      };
      Polling.prototype.pause = function(onPause) {
        var pending = 0;
        var self = this;
        this.readyState = 'pausing';
        function pause() {
          debug('paused');
          self.readyState = 'paused';
          onPause();
        }
        if (this.polling || !this.writable) {
          var total = 0;
          if (this.polling) {
            debug('we are currently polling - waiting to pause');
            total++;
            this.once('pollComplete', function() {
              debug('pre-pause polling complete');
              --total || pause();
            });
          }
          if (!this.writable) {
            debug('we are currently writing - waiting to pause');
            total++;
            this.once('drain', function() {
              debug('pre-pause writing complete');
              --total || pause();
            });
          }
        } else {
          pause();
        }
      };
      Polling.prototype.poll = function() {
        debug('polling');
        this.polling = true;
        this.doPoll();
        this.emit('poll');
      };
      Polling.prototype.onData = function(data) {
        var self = this;
        debug('polling got data %s', data);
        var callback = function(packet, index, total) {
          if ('opening' == self.readyState) {
            self.onOpen();
          }
          if ('close' == packet.type) {
            self.onClose();
            return false;
          }
          self.onPacket(packet);
        };
        parser.decodePayload(data, this.socket.binaryType, callback);
        if ('closed' != this.readyState) {
          this.polling = false;
          this.emit('pollComplete');
          if ('open' == this.readyState) {
            this.poll();
          } else {
            debug('ignoring poll - transport state "%s"', this.readyState);
          }
        }
      };
      Polling.prototype.doClose = function() {
        var self = this;
        function close() {
          debug('writing close packet');
          self.write([{type: 'close'}]);
        }
        if ('open' == this.readyState) {
          debug('transport open - closing');
          close();
        } else {
          debug('transport not open - deferring close');
          this.once('open', close);
        }
      };
      Polling.prototype.write = function(packets) {
        var self = this;
        this.writable = false;
        var callbackfn = function() {
          self.writable = true;
          self.emit('drain');
        };
        var self = this;
        parser.encodePayload(packets, this.supportsBinary, function(data) {
          self.doWrite(data, callbackfn);
        });
      };
      Polling.prototype.uri = function() {
        var query = this.query || {};
        var schema = this.secure ? 'https' : 'http';
        var port = '';
        if (false !== this.timestampRequests) {
          query[this.timestampParam] = +new Date + '-' + Transport.timestamps++;
        }
        if (!this.supportsBinary && !query.sid) {
          query.b64 = 1;
        }
        query = parseqs.encode(query);
        if (this.port && (('https' == schema && this.port != 443) || ('http' == schema && this.port != 80))) {
          port = ':' + this.port;
        }
        if (query.length) {
          query = '?' + query;
        }
        return schema + '://' + this.hostname + port + this.path + query;
      };
    }, {
      "../transport": 14,
      "component-inherit": 21,
      "debug": 22,
      "engine.io-parser": 25,
      "parseqs": 35,
      "xmlhttprequest": 20
    }],
    19: [function(_dereq_, module, exports) {
      var Transport = _dereq_('../transport');
      var parser = _dereq_('engine.io-parser');
      var parseqs = _dereq_('parseqs');
      var inherit = _dereq_('component-inherit');
      var debug = _dereq_('debug')('engine.io-client:websocket');
      var WebSocket = _dereq_('ws');
      module.exports = WS;
      function WS(opts) {
        var forceBase64 = (opts && opts.forceBase64);
        if (forceBase64) {
          this.supportsBinary = false;
        }
        Transport.call(this, opts);
      }
      inherit(WS, Transport);
      WS.prototype.name = 'websocket';
      WS.prototype.supportsBinary = true;
      WS.prototype.doOpen = function() {
        if (!this.check()) {
          return;
        }
        var self = this;
        var uri = this.uri();
        var protocols = void(0);
        var opts = {agent: this.agent};
        opts.pfx = this.pfx;
        opts.key = this.key;
        opts.passphrase = this.passphrase;
        opts.cert = this.cert;
        opts.ca = this.ca;
        opts.ciphers = this.ciphers;
        opts.rejectUnauthorized = this.rejectUnauthorized;
        this.ws = new WebSocket(uri, protocols, opts);
        if (this.ws.binaryType === undefined) {
          this.supportsBinary = false;
        }
        this.ws.binaryType = 'arraybuffer';
        this.addEventListeners();
      };
      WS.prototype.addEventListeners = function() {
        var self = this;
        this.ws.onopen = function() {
          self.onOpen();
        };
        this.ws.onclose = function() {
          self.onClose();
        };
        this.ws.onmessage = function(ev) {
          self.onData(ev.data);
        };
        this.ws.onerror = function(e) {
          self.onError('websocket error', e);
        };
      };
      if ('undefined' != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
        WS.prototype.onData = function(data) {
          var self = this;
          setTimeout(function() {
            Transport.prototype.onData.call(self, data);
          }, 0);
        };
      }
      WS.prototype.write = function(packets) {
        var self = this;
        this.writable = false;
        for (var i = 0,
            l = packets.length; i < l; i++) {
          parser.encodePacket(packets[i], this.supportsBinary, function(data) {
            try {
              self.ws.send(data);
            } catch (e) {
              debug('websocket closed before onclose event');
            }
          });
        }
        function ondrain() {
          self.writable = true;
          self.emit('drain');
        }
        setTimeout(ondrain, 0);
      };
      WS.prototype.onClose = function() {
        Transport.prototype.onClose.call(this);
      };
      WS.prototype.doClose = function() {
        if (typeof this.ws !== 'undefined') {
          this.ws.close();
        }
      };
      WS.prototype.uri = function() {
        var query = this.query || {};
        var schema = this.secure ? 'wss' : 'ws';
        var port = '';
        if (this.port && (('wss' == schema && this.port != 443) || ('ws' == schema && this.port != 80))) {
          port = ':' + this.port;
        }
        if (this.timestampRequests) {
          query[this.timestampParam] = +new Date;
        }
        if (!this.supportsBinary) {
          query.b64 = 1;
        }
        query = parseqs.encode(query);
        if (query.length) {
          query = '?' + query;
        }
        return schema + '://' + this.hostname + port + this.path + query;
      };
      WS.prototype.check = function() {
        return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
      };
    }, {
      "../transport": 14,
      "component-inherit": 21,
      "debug": 22,
      "engine.io-parser": 25,
      "parseqs": 35,
      "ws": 37
    }],
    20: [function(_dereq_, module, exports) {
      var hasCORS = _dereq_('has-cors');
      module.exports = function(opts) {
        var xdomain = opts.xdomain;
        var xscheme = opts.xscheme;
        var enablesXDR = opts.enablesXDR;
        try {
          if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
            return new XMLHttpRequest();
          }
        } catch (e) {}
        try {
          if ('undefined' != typeof XDomainRequest && !xscheme && enablesXDR) {
            return new XDomainRequest();
          }
        } catch (e) {}
        if (!xdomain) {
          try {
            return new ActiveXObject('Microsoft.XMLHTTP');
          } catch (e) {}
        }
      };
    }, {"has-cors": 40}],
    21: [function(_dereq_, module, exports) {
      module.exports = function(a, b) {
        var fn = function() {};
        fn.prototype = b.prototype;
        a.prototype = new fn;
        a.prototype.constructor = a;
      };
    }, {}],
    22: [function(_dereq_, module, exports) {
      exports = module.exports = _dereq_('./debug');
      exports.log = log;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];
      function useColors() {
        return ('WebkitAppearance' in document.documentElement.style) || (window.console && (console.firebug || (console.exception && console.table))) || (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
      }
      exports.formatters.j = function(v) {
        return JSON.stringify(v);
      };
      function formatArgs() {
        var args = arguments;
        var useColors = this.useColors;
        args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
        if (!useColors)
          return args;
        var c = 'color: ' + this.color;
        args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
        var index = 0;
        var lastC = 0;
        args[0].replace(/%[a-z%]/g, function(match) {
          if ('%' === match)
            return;
          index++;
          if ('%c' === match) {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
        return args;
      }
      function log() {
        return 'object' == typeof console && 'function' == typeof console.log && Function.prototype.apply.call(console.log, console, arguments);
      }
      function save(namespaces) {
        try {
          if (null == namespaces) {
            localStorage.removeItem('debug');
          } else {
            localStorage.debug = namespaces;
          }
        } catch (e) {}
      }
      function load() {
        var r;
        try {
          r = localStorage.debug;
        } catch (e) {}
        return r;
      }
      exports.enable(load());
    }, {"./debug": 23}],
    23: [function(_dereq_, module, exports) {
      exports = module.exports = debug;
      exports.coerce = coerce;
      exports.disable = disable;
      exports.enable = enable;
      exports.enabled = enabled;
      exports.humanize = _dereq_('ms');
      exports.names = [];
      exports.skips = [];
      exports.formatters = {};
      var prevColor = 0;
      var prevTime;
      function selectColor() {
        return exports.colors[prevColor++ % exports.colors.length];
      }
      function debug(namespace) {
        function disabled() {}
        disabled.enabled = false;
        function enabled() {
          var self = enabled;
          var curr = +new Date();
          var ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          if (null == self.useColors)
            self.useColors = exports.useColors();
          if (null == self.color && self.useColors)
            self.color = selectColor();
          var args = Array.prototype.slice.call(arguments);
          args[0] = exports.coerce(args[0]);
          if ('string' !== typeof args[0]) {
            args = ['%o'].concat(args);
          }
          var index = 0;
          args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
            if (match === '%')
              return match;
            index++;
            var formatter = exports.formatters[format];
            if ('function' === typeof formatter) {
              var val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          if ('function' === typeof exports.formatArgs) {
            args = exports.formatArgs.apply(self, args);
          }
          var logFn = enabled.log || exports.log || console.log.bind(console);
          logFn.apply(self, args);
        }
        enabled.enabled = true;
        var fn = exports.enabled(namespace) ? enabled : disabled;
        fn.namespace = namespace;
        return fn;
      }
      function enable(namespaces) {
        exports.save(namespaces);
        var split = (namespaces || '').split(/[\s,]+/);
        var len = split.length;
        for (var i = 0; i < len; i++) {
          if (!split[i])
            continue;
          namespaces = split[i].replace(/\*/g, '.*?');
          if (namespaces[0] === '-') {
            exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
          } else {
            exports.names.push(new RegExp('^' + namespaces + '$'));
          }
        }
      }
      function disable() {
        exports.enable('');
      }
      function enabled(name) {
        var i,
            len;
        for (i = 0, len = exports.skips.length; i < len; i++) {
          if (exports.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = exports.names.length; i < len; i++) {
          if (exports.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error)
          return val.stack || val.message;
        return val;
      }
    }, {"ms": 24}],
    24: [function(_dereq_, module, exports) {
      var s = 1000;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        if ('string' == typeof val)
          return parse(val);
        return options.long ? long(val) : short(val);
      };
      function parse(str) {
        var match = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);
        if (!match)
          return;
        var n = parseFloat(match[1]);
        var type = (match[2] || 'ms').toLowerCase();
        switch (type) {
          case 'years':
          case 'year':
          case 'y':
            return n * y;
          case 'days':
          case 'day':
          case 'd':
            return n * d;
          case 'hours':
          case 'hour':
          case 'h':
            return n * h;
          case 'minutes':
          case 'minute':
          case 'm':
            return n * m;
          case 'seconds':
          case 'second':
          case 's':
            return n * s;
          case 'ms':
            return n;
        }
      }
      function short(ms) {
        if (ms >= d)
          return Math.round(ms / d) + 'd';
        if (ms >= h)
          return Math.round(ms / h) + 'h';
        if (ms >= m)
          return Math.round(ms / m) + 'm';
        if (ms >= s)
          return Math.round(ms / s) + 's';
        return ms + 'ms';
      }
      function long(ms) {
        return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
      }
      function plural(ms, n, name) {
        if (ms < n)
          return;
        if (ms < n * 1.5)
          return Math.floor(ms / n) + ' ' + name;
        return Math.ceil(ms / n) + ' ' + name + 's';
      }
    }, {}],
    25: [function(_dereq_, module, exports) {
      (function(global) {
        var keys = _dereq_('./keys');
        var hasBinary = _dereq_('has-binary');
        var sliceBuffer = _dereq_('arraybuffer.slice');
        var base64encoder = _dereq_('base64-arraybuffer');
        var after = _dereq_('after');
        var utf8 = _dereq_('utf8');
        var isAndroid = navigator.userAgent.match(/Android/i);
        var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);
        var dontSendBlobs = isAndroid || isPhantomJS;
        exports.protocol = 3;
        var packets = exports.packets = {
          open: 0,
          close: 1,
          ping: 2,
          pong: 3,
          message: 4,
          upgrade: 5,
          noop: 6
        };
        var packetslist = keys(packets);
        var err = {
          type: 'error',
          data: 'parser error'
        };
        var Blob = _dereq_('blob');
        exports.encodePacket = function(packet, supportsBinary, utf8encode, callback) {
          if ('function' == typeof supportsBinary) {
            callback = supportsBinary;
            supportsBinary = false;
          }
          if ('function' == typeof utf8encode) {
            callback = utf8encode;
            utf8encode = null;
          }
          var data = (packet.data === undefined) ? undefined : packet.data.buffer || packet.data;
          if (global.ArrayBuffer && data instanceof ArrayBuffer) {
            return encodeArrayBuffer(packet, supportsBinary, callback);
          } else if (Blob && data instanceof global.Blob) {
            return encodeBlob(packet, supportsBinary, callback);
          }
          if (data && data.base64) {
            return encodeBase64Object(packet, callback);
          }
          var encoded = packets[packet.type];
          if (undefined !== packet.data) {
            encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
          }
          return callback('' + encoded);
        };
        function encodeBase64Object(packet, callback) {
          var message = 'b' + exports.packets[packet.type] + packet.data.data;
          return callback(message);
        }
        function encodeArrayBuffer(packet, supportsBinary, callback) {
          if (!supportsBinary) {
            return exports.encodeBase64Packet(packet, callback);
          }
          var data = packet.data;
          var contentArray = new Uint8Array(data);
          var resultBuffer = new Uint8Array(1 + data.byteLength);
          resultBuffer[0] = packets[packet.type];
          for (var i = 0; i < contentArray.length; i++) {
            resultBuffer[i + 1] = contentArray[i];
          }
          return callback(resultBuffer.buffer);
        }
        function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
          if (!supportsBinary) {
            return exports.encodeBase64Packet(packet, callback);
          }
          var fr = new FileReader();
          fr.onload = function() {
            packet.data = fr.result;
            exports.encodePacket(packet, supportsBinary, true, callback);
          };
          return fr.readAsArrayBuffer(packet.data);
        }
        function encodeBlob(packet, supportsBinary, callback) {
          if (!supportsBinary) {
            return exports.encodeBase64Packet(packet, callback);
          }
          if (dontSendBlobs) {
            return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
          }
          var length = new Uint8Array(1);
          length[0] = packets[packet.type];
          var blob = new Blob([length.buffer, packet.data]);
          return callback(blob);
        }
        exports.encodeBase64Packet = function(packet, callback) {
          var message = 'b' + exports.packets[packet.type];
          if (Blob && packet.data instanceof Blob) {
            var fr = new FileReader();
            fr.onload = function() {
              var b64 = fr.result.split(',')[1];
              callback(message + b64);
            };
            return fr.readAsDataURL(packet.data);
          }
          var b64data;
          try {
            b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
          } catch (e) {
            var typed = new Uint8Array(packet.data);
            var basic = new Array(typed.length);
            for (var i = 0; i < typed.length; i++) {
              basic[i] = typed[i];
            }
            b64data = String.fromCharCode.apply(null, basic);
          }
          message += global.btoa(b64data);
          return callback(message);
        };
        exports.decodePacket = function(data, binaryType, utf8decode) {
          if (typeof data == 'string' || data === undefined) {
            if (data.charAt(0) == 'b') {
              return exports.decodeBase64Packet(data.substr(1), binaryType);
            }
            if (utf8decode) {
              try {
                data = utf8.decode(data);
              } catch (e) {
                return err;
              }
            }
            var type = data.charAt(0);
            if (Number(type) != type || !packetslist[type]) {
              return err;
            }
            if (data.length > 1) {
              return {
                type: packetslist[type],
                data: data.substring(1)
              };
            } else {
              return {type: packetslist[type]};
            }
          }
          var asArray = new Uint8Array(data);
          var type = asArray[0];
          var rest = sliceBuffer(data, 1);
          if (Blob && binaryType === 'blob') {
            rest = new Blob([rest]);
          }
          return {
            type: packetslist[type],
            data: rest
          };
        };
        exports.decodeBase64Packet = function(msg, binaryType) {
          var type = packetslist[msg.charAt(0)];
          if (!global.ArrayBuffer) {
            return {
              type: type,
              data: {
                base64: true,
                data: msg.substr(1)
              }
            };
          }
          var data = base64encoder.decode(msg.substr(1));
          if (binaryType === 'blob' && Blob) {
            data = new Blob([data]);
          }
          return {
            type: type,
            data: data
          };
        };
        exports.encodePayload = function(packets, supportsBinary, callback) {
          if (typeof supportsBinary == 'function') {
            callback = supportsBinary;
            supportsBinary = null;
          }
          var isBinary = hasBinary(packets);
          if (supportsBinary && isBinary) {
            if (Blob && !dontSendBlobs) {
              return exports.encodePayloadAsBlob(packets, callback);
            }
            return exports.encodePayloadAsArrayBuffer(packets, callback);
          }
          if (!packets.length) {
            return callback('0:');
          }
          function setLengthHeader(message) {
            return message.length + ':' + message;
          }
          function encodeOne(packet, doneCallback) {
            exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
              doneCallback(null, setLengthHeader(message));
            });
          }
          map(packets, encodeOne, function(err, results) {
            return callback(results.join(''));
          });
        };
        function map(ary, each, done) {
          var result = new Array(ary.length);
          var next = after(ary.length, done);
          var eachWithIndex = function(i, el, cb) {
            each(el, function(error, msg) {
              result[i] = msg;
              cb(error, result);
            });
          };
          for (var i = 0; i < ary.length; i++) {
            eachWithIndex(i, ary[i], next);
          }
        }
        exports.decodePayload = function(data, binaryType, callback) {
          if (typeof data != 'string') {
            return exports.decodePayloadAsBinary(data, binaryType, callback);
          }
          if (typeof binaryType === 'function') {
            callback = binaryType;
            binaryType = null;
          }
          var packet;
          if (data == '') {
            return callback(err, 0, 1);
          }
          var length = '',
              n,
              msg;
          for (var i = 0,
              l = data.length; i < l; i++) {
            var chr = data.charAt(i);
            if (':' != chr) {
              length += chr;
            } else {
              if ('' == length || (length != (n = Number(length)))) {
                return callback(err, 0, 1);
              }
              msg = data.substr(i + 1, n);
              if (length != msg.length) {
                return callback(err, 0, 1);
              }
              if (msg.length) {
                packet = exports.decodePacket(msg, binaryType, true);
                if (err.type == packet.type && err.data == packet.data) {
                  return callback(err, 0, 1);
                }
                var ret = callback(packet, i + n, l);
                if (false === ret)
                  return;
              }
              i += n;
              length = '';
            }
          }
          if (length != '') {
            return callback(err, 0, 1);
          }
        };
        exports.encodePayloadAsArrayBuffer = function(packets, callback) {
          if (!packets.length) {
            return callback(new ArrayBuffer(0));
          }
          function encodeOne(packet, doneCallback) {
            exports.encodePacket(packet, true, true, function(data) {
              return doneCallback(null, data);
            });
          }
          map(packets, encodeOne, function(err, encodedPackets) {
            var totalLength = encodedPackets.reduce(function(acc, p) {
              var len;
              if (typeof p === 'string') {
                len = p.length;
              } else {
                len = p.byteLength;
              }
              return acc + len.toString().length + len + 2;
            }, 0);
            var resultArray = new Uint8Array(totalLength);
            var bufferIndex = 0;
            encodedPackets.forEach(function(p) {
              var isString = typeof p === 'string';
              var ab = p;
              if (isString) {
                var view = new Uint8Array(p.length);
                for (var i = 0; i < p.length; i++) {
                  view[i] = p.charCodeAt(i);
                }
                ab = view.buffer;
              }
              if (isString) {
                resultArray[bufferIndex++] = 0;
              } else {
                resultArray[bufferIndex++] = 1;
              }
              var lenStr = ab.byteLength.toString();
              for (var i = 0; i < lenStr.length; i++) {
                resultArray[bufferIndex++] = parseInt(lenStr[i]);
              }
              resultArray[bufferIndex++] = 255;
              var view = new Uint8Array(ab);
              for (var i = 0; i < view.length; i++) {
                resultArray[bufferIndex++] = view[i];
              }
            });
            return callback(resultArray.buffer);
          });
        };
        exports.encodePayloadAsBlob = function(packets, callback) {
          function encodeOne(packet, doneCallback) {
            exports.encodePacket(packet, true, true, function(encoded) {
              var binaryIdentifier = new Uint8Array(1);
              binaryIdentifier[0] = 1;
              if (typeof encoded === 'string') {
                var view = new Uint8Array(encoded.length);
                for (var i = 0; i < encoded.length; i++) {
                  view[i] = encoded.charCodeAt(i);
                }
                encoded = view.buffer;
                binaryIdentifier[0] = 0;
              }
              var len = (encoded instanceof ArrayBuffer) ? encoded.byteLength : encoded.size;
              var lenStr = len.toString();
              var lengthAry = new Uint8Array(lenStr.length + 1);
              for (var i = 0; i < lenStr.length; i++) {
                lengthAry[i] = parseInt(lenStr[i]);
              }
              lengthAry[lenStr.length] = 255;
              if (Blob) {
                var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
                doneCallback(null, blob);
              }
            });
          }
          map(packets, encodeOne, function(err, results) {
            return callback(new Blob(results));
          });
        };
        exports.decodePayloadAsBinary = function(data, binaryType, callback) {
          if (typeof binaryType === 'function') {
            callback = binaryType;
            binaryType = null;
          }
          var bufferTail = data;
          var buffers = [];
          var numberTooLong = false;
          while (bufferTail.byteLength > 0) {
            var tailArray = new Uint8Array(bufferTail);
            var isString = tailArray[0] === 0;
            var msgLength = '';
            for (var i = 1; ; i++) {
              if (tailArray[i] == 255)
                break;
              if (msgLength.length > 310) {
                numberTooLong = true;
                break;
              }
              msgLength += tailArray[i];
            }
            if (numberTooLong)
              return callback(err, 0, 1);
            bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
            msgLength = parseInt(msgLength);
            var msg = sliceBuffer(bufferTail, 0, msgLength);
            if (isString) {
              try {
                msg = String.fromCharCode.apply(null, new Uint8Array(msg));
              } catch (e) {
                var typed = new Uint8Array(msg);
                msg = '';
                for (var i = 0; i < typed.length; i++) {
                  msg += String.fromCharCode(typed[i]);
                }
              }
            }
            buffers.push(msg);
            bufferTail = sliceBuffer(bufferTail, msgLength);
          }
          var total = buffers.length;
          buffers.forEach(function(buffer, i) {
            callback(exports.decodePacket(buffer, binaryType, true), i, total);
          });
        };
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./keys": 26,
      "after": 27,
      "arraybuffer.slice": 28,
      "base64-arraybuffer": 29,
      "blob": 30,
      "has-binary": 31,
      "utf8": 33
    }],
    26: [function(_dereq_, module, exports) {
      module.exports = Object.keys || function keys(obj) {
        var arr = [];
        var has = Object.prototype.hasOwnProperty;
        for (var i in obj) {
          if (has.call(obj, i)) {
            arr.push(i);
          }
        }
        return arr;
      };
    }, {}],
    27: [function(_dereq_, module, exports) {
      module.exports = after;
      function after(count, callback, err_cb) {
        var bail = false;
        err_cb = err_cb || noop;
        proxy.count = count;
        return (count === 0) ? callback() : proxy;
        function proxy(err, result) {
          if (proxy.count <= 0) {
            throw new Error('after called too many times');
          }
          --proxy.count;
          if (err) {
            bail = true;
            callback(err);
            callback = err_cb;
          } else if (proxy.count === 0 && !bail) {
            callback(null, result);
          }
        }
      }
      function noop() {}
    }, {}],
    28: [function(_dereq_, module, exports) {
      module.exports = function(arraybuffer, start, end) {
        var bytes = arraybuffer.byteLength;
        start = start || 0;
        end = end || bytes;
        if (arraybuffer.slice) {
          return arraybuffer.slice(start, end);
        }
        if (start < 0) {
          start += bytes;
        }
        if (end < 0) {
          end += bytes;
        }
        if (end > bytes) {
          end = bytes;
        }
        if (start >= bytes || start >= end || bytes === 0) {
          return new ArrayBuffer(0);
        }
        var abv = new Uint8Array(arraybuffer);
        var result = new Uint8Array(end - start);
        for (var i = start,
            ii = 0; i < end; i++, ii++) {
          result[ii] = abv[i];
        }
        return result.buffer;
      };
    }, {}],
    29: [function(_dereq_, module, exports) {
      (function(chars) {
        "use strict";
        exports.encode = function(arraybuffer) {
          var bytes = new Uint8Array(arraybuffer),
              i,
              len = bytes.length,
              base64 = "";
          for (i = 0; i < len; i += 3) {
            base64 += chars[bytes[i] >> 2];
            base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
            base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
            base64 += chars[bytes[i + 2] & 63];
          }
          if ((len % 3) === 2) {
            base64 = base64.substring(0, base64.length - 1) + "=";
          } else if (len % 3 === 1) {
            base64 = base64.substring(0, base64.length - 2) + "==";
          }
          return base64;
        };
        exports.decode = function(base64) {
          var bufferLength = base64.length * 0.75,
              len = base64.length,
              i,
              p = 0,
              encoded1,
              encoded2,
              encoded3,
              encoded4;
          if (base64[base64.length - 1] === "=") {
            bufferLength--;
            if (base64[base64.length - 2] === "=") {
              bufferLength--;
            }
          }
          var arraybuffer = new ArrayBuffer(bufferLength),
              bytes = new Uint8Array(arraybuffer);
          for (i = 0; i < len; i += 4) {
            encoded1 = chars.indexOf(base64[i]);
            encoded2 = chars.indexOf(base64[i + 1]);
            encoded3 = chars.indexOf(base64[i + 2]);
            encoded4 = chars.indexOf(base64[i + 3]);
            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
          }
          return arraybuffer;
        };
      })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
    }, {}],
    30: [function(_dereq_, module, exports) {
      (function(global) {
        var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;
        var blobSupported = (function() {
          try {
            var b = new Blob(['hi']);
            return b.size == 2;
          } catch (e) {
            return false;
          }
        })();
        var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;
        function BlobBuilderConstructor(ary, options) {
          options = options || {};
          var bb = new BlobBuilder();
          for (var i = 0; i < ary.length; i++) {
            bb.append(ary[i]);
          }
          return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
        }
        ;
        module.exports = (function() {
          if (blobSupported) {
            return global.Blob;
          } else if (blobBuilderSupported) {
            return BlobBuilderConstructor;
          } else {
            return undefined;
          }
        })();
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    31: [function(_dereq_, module, exports) {
      (function(global) {
        var isArray = _dereq_('isarray');
        module.exports = hasBinary;
        function hasBinary(data) {
          function _hasBinary(obj) {
            if (!obj)
              return false;
            if ((global.Buffer && global.Buffer.isBuffer(obj)) || (global.ArrayBuffer && obj instanceof ArrayBuffer) || (global.Blob && obj instanceof Blob) || (global.File && obj instanceof File)) {
              return true;
            }
            if (isArray(obj)) {
              for (var i = 0; i < obj.length; i++) {
                if (_hasBinary(obj[i])) {
                  return true;
                }
              }
            } else if (obj && 'object' == typeof obj) {
              if (obj.toJSON) {
                obj = obj.toJSON();
              }
              for (var key in obj) {
                if (obj.hasOwnProperty(key) && _hasBinary(obj[key])) {
                  return true;
                }
              }
            }
            return false;
          }
          return _hasBinary(data);
        }
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {"isarray": 32}],
    32: [function(_dereq_, module, exports) {
      module.exports = Array.isArray || function(arr) {
        return Object.prototype.toString.call(arr) == '[object Array]';
      };
    }, {}],
    33: [function(_dereq_, module, exports) {
      (function(global) {
        ;
        (function(root) {
          var freeExports = typeof exports == 'object' && exports;
          var freeModule = typeof module == 'object' && module && module.exports == freeExports && module;
          var freeGlobal = typeof global == 'object' && global;
          if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
            root = freeGlobal;
          }
          var stringFromCharCode = String.fromCharCode;
          function ucs2decode(string) {
            var output = [];
            var counter = 0;
            var length = string.length;
            var value;
            var extra;
            while (counter < length) {
              value = string.charCodeAt(counter++);
              if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                extra = string.charCodeAt(counter++);
                if ((extra & 0xFC00) == 0xDC00) {
                  output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                } else {
                  output.push(value);
                  counter--;
                }
              } else {
                output.push(value);
              }
            }
            return output;
          }
          function ucs2encode(array) {
            var length = array.length;
            var index = -1;
            var value;
            var output = '';
            while (++index < length) {
              value = array[index];
              if (value > 0xFFFF) {
                value -= 0x10000;
                output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                value = 0xDC00 | value & 0x3FF;
              }
              output += stringFromCharCode(value);
            }
            return output;
          }
          function createByte(codePoint, shift) {
            return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
          }
          function encodeCodePoint(codePoint) {
            if ((codePoint & 0xFFFFFF80) == 0) {
              return stringFromCharCode(codePoint);
            }
            var symbol = '';
            if ((codePoint & 0xFFFFF800) == 0) {
              symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
            } else if ((codePoint & 0xFFFF0000) == 0) {
              symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
              symbol += createByte(codePoint, 6);
            } else if ((codePoint & 0xFFE00000) == 0) {
              symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
              symbol += createByte(codePoint, 12);
              symbol += createByte(codePoint, 6);
            }
            symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
            return symbol;
          }
          function utf8encode(string) {
            var codePoints = ucs2decode(string);
            var length = codePoints.length;
            var index = -1;
            var codePoint;
            var byteString = '';
            while (++index < length) {
              codePoint = codePoints[index];
              byteString += encodeCodePoint(codePoint);
            }
            return byteString;
          }
          function readContinuationByte() {
            if (byteIndex >= byteCount) {
              throw Error('Invalid byte index');
            }
            var continuationByte = byteArray[byteIndex] & 0xFF;
            byteIndex++;
            if ((continuationByte & 0xC0) == 0x80) {
              return continuationByte & 0x3F;
            }
            throw Error('Invalid continuation byte');
          }
          function decodeSymbol() {
            var byte1;
            var byte2;
            var byte3;
            var byte4;
            var codePoint;
            if (byteIndex > byteCount) {
              throw Error('Invalid byte index');
            }
            if (byteIndex == byteCount) {
              return false;
            }
            byte1 = byteArray[byteIndex] & 0xFF;
            byteIndex++;
            if ((byte1 & 0x80) == 0) {
              return byte1;
            }
            if ((byte1 & 0xE0) == 0xC0) {
              var byte2 = readContinuationByte();
              codePoint = ((byte1 & 0x1F) << 6) | byte2;
              if (codePoint >= 0x80) {
                return codePoint;
              } else {
                throw Error('Invalid continuation byte');
              }
            }
            if ((byte1 & 0xF0) == 0xE0) {
              byte2 = readContinuationByte();
              byte3 = readContinuationByte();
              codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
              if (codePoint >= 0x0800) {
                return codePoint;
              } else {
                throw Error('Invalid continuation byte');
              }
            }
            if ((byte1 & 0xF8) == 0xF0) {
              byte2 = readContinuationByte();
              byte3 = readContinuationByte();
              byte4 = readContinuationByte();
              codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) | (byte3 << 0x06) | byte4;
              if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
                return codePoint;
              }
            }
            throw Error('Invalid UTF-8 detected');
          }
          var byteArray;
          var byteCount;
          var byteIndex;
          function utf8decode(byteString) {
            byteArray = ucs2decode(byteString);
            byteCount = byteArray.length;
            byteIndex = 0;
            var codePoints = [];
            var tmp;
            while ((tmp = decodeSymbol()) !== false) {
              codePoints.push(tmp);
            }
            return ucs2encode(codePoints);
          }
          var utf8 = {
            'version': '2.0.0',
            'encode': utf8encode,
            'decode': utf8decode
          };
          if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
            define(function() {
              return utf8;
            });
          } else if (freeExports && !freeExports.nodeType) {
            if (freeModule) {
              freeModule.exports = utf8;
            } else {
              var object = {};
              var hasOwnProperty = object.hasOwnProperty;
              for (var key in utf8) {
                hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
              }
            }
          } else {
            root.utf8 = utf8;
          }
        }(this));
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    34: [function(_dereq_, module, exports) {
      (function(global) {
        var rvalidchars = /^[\],:{}\s]*$/;
        var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
        var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
        var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
        var rtrimLeft = /^\s+/;
        var rtrimRight = /\s+$/;
        module.exports = function parsejson(data) {
          if ('string' != typeof data || !data) {
            return null;
          }
          data = data.replace(rtrimLeft, '').replace(rtrimRight, '');
          if (global.JSON && JSON.parse) {
            return JSON.parse(data);
          }
          if (rvalidchars.test(data.replace(rvalidescape, '@').replace(rvalidtokens, ']').replace(rvalidbraces, ''))) {
            return (new Function('return ' + data))();
          }
        };
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    35: [function(_dereq_, module, exports) {
      exports.encode = function(obj) {
        var str = '';
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            if (str.length)
              str += '&';
            str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
          }
        }
        return str;
      };
      exports.decode = function(qs) {
        var qry = {};
        var pairs = qs.split('&');
        for (var i = 0,
            l = pairs.length; i < l; i++) {
          var pair = pairs[i].split('=');
          qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return qry;
      };
    }, {}],
    36: [function(_dereq_, module, exports) {
      var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
      var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
      module.exports = function parseuri(str) {
        var src = str,
            b = str.indexOf('['),
            e = str.indexOf(']');
        if (b != -1 && e != -1) {
          str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
        }
        var m = re.exec(str || ''),
            uri = {},
            i = 14;
        while (i--) {
          uri[parts[i]] = m[i] || '';
        }
        if (b != -1 && e != -1) {
          uri.source = src;
          uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
          uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
          uri.ipv6uri = true;
        }
        return uri;
      };
    }, {}],
    37: [function(_dereq_, module, exports) {
      var global = (function() {
        return this;
      })();
      var WebSocket = global.WebSocket || global.MozWebSocket;
      module.exports = WebSocket ? ws : null;
      function ws(uri, protocols, opts) {
        var instance;
        if (protocols) {
          instance = new WebSocket(uri, protocols);
        } else {
          instance = new WebSocket(uri);
        }
        return instance;
      }
      if (WebSocket)
        ws.prototype = WebSocket.prototype;
    }, {}],
    38: [function(_dereq_, module, exports) {
      (function(global) {
        var isArray = _dereq_('isarray');
        module.exports = hasBinary;
        function hasBinary(data) {
          function _hasBinary(obj) {
            if (!obj)
              return false;
            if ((global.Buffer && global.Buffer.isBuffer(obj)) || (global.ArrayBuffer && obj instanceof ArrayBuffer) || (global.Blob && obj instanceof Blob) || (global.File && obj instanceof File)) {
              return true;
            }
            if (isArray(obj)) {
              for (var i = 0; i < obj.length; i++) {
                if (_hasBinary(obj[i])) {
                  return true;
                }
              }
            } else if (obj && 'object' == typeof obj) {
              if (obj.toJSON) {
                obj = obj.toJSON();
              }
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
                  return true;
                }
              }
            }
            return false;
          }
          return _hasBinary(data);
        }
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {"isarray": 39}],
    39: [function(_dereq_, module, exports) {
      module.exports = _dereq_(32);
    }, {}],
    40: [function(_dereq_, module, exports) {
      var global = _dereq_('global');
      try {
        module.exports = 'XMLHttpRequest' in global && 'withCredentials' in new global.XMLHttpRequest();
      } catch (err) {
        module.exports = false;
      }
    }, {"global": 41}],
    41: [function(_dereq_, module, exports) {
      module.exports = (function() {
        return this;
      })();
    }, {}],
    42: [function(_dereq_, module, exports) {
      var indexOf = [].indexOf;
      module.exports = function(arr, obj) {
        if (indexOf)
          return arr.indexOf(obj);
        for (var i = 0; i < arr.length; ++i) {
          if (arr[i] === obj)
            return i;
        }
        return -1;
      };
    }, {}],
    43: [function(_dereq_, module, exports) {
      var has = Object.prototype.hasOwnProperty;
      exports.keys = Object.keys || function(obj) {
        var keys = [];
        for (var key in obj) {
          if (has.call(obj, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      exports.values = function(obj) {
        var vals = [];
        for (var key in obj) {
          if (has.call(obj, key)) {
            vals.push(obj[key]);
          }
        }
        return vals;
      };
      exports.merge = function(a, b) {
        for (var key in b) {
          if (has.call(b, key)) {
            a[key] = b[key];
          }
        }
        return a;
      };
      exports.length = function(obj) {
        return exports.keys(obj).length;
      };
      exports.isEmpty = function(obj) {
        return 0 == exports.length(obj);
      };
    }, {}],
    44: [function(_dereq_, module, exports) {
      var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
      var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
      module.exports = function parseuri(str) {
        var m = re.exec(str || ''),
            uri = {},
            i = 14;
        while (i--) {
          uri[parts[i]] = m[i] || '';
        }
        return uri;
      };
    }, {}],
    45: [function(_dereq_, module, exports) {
      (function(global) {
        var isArray = _dereq_('isarray');
        var isBuf = _dereq_('./is-buffer');
        exports.deconstructPacket = function(packet) {
          var buffers = [];
          var packetData = packet.data;
          function _deconstructPacket(data) {
            if (!data)
              return data;
            if (isBuf(data)) {
              var placeholder = {
                _placeholder: true,
                num: buffers.length
              };
              buffers.push(data);
              return placeholder;
            } else if (isArray(data)) {
              var newData = new Array(data.length);
              for (var i = 0; i < data.length; i++) {
                newData[i] = _deconstructPacket(data[i]);
              }
              return newData;
            } else if ('object' == typeof data && !(data instanceof Date)) {
              var newData = {};
              for (var key in data) {
                newData[key] = _deconstructPacket(data[key]);
              }
              return newData;
            }
            return data;
          }
          var pack = packet;
          pack.data = _deconstructPacket(packetData);
          pack.attachments = buffers.length;
          return {
            packet: pack,
            buffers: buffers
          };
        };
        exports.reconstructPacket = function(packet, buffers) {
          var curPlaceHolder = 0;
          function _reconstructPacket(data) {
            if (data && data._placeholder) {
              var buf = buffers[data.num];
              return buf;
            } else if (isArray(data)) {
              for (var i = 0; i < data.length; i++) {
                data[i] = _reconstructPacket(data[i]);
              }
              return data;
            } else if (data && 'object' == typeof data) {
              for (var key in data) {
                data[key] = _reconstructPacket(data[key]);
              }
              return data;
            }
            return data;
          }
          packet.data = _reconstructPacket(packet.data);
          packet.attachments = undefined;
          return packet;
        };
        exports.removeBlobs = function(data, callback) {
          function _removeBlobs(obj, curKey, containingObject) {
            if (!obj)
              return obj;
            if ((global.Blob && obj instanceof Blob) || (global.File && obj instanceof File)) {
              pendingBlobs++;
              var fileReader = new FileReader();
              fileReader.onload = function() {
                if (containingObject) {
                  containingObject[curKey] = this.result;
                } else {
                  bloblessData = this.result;
                }
                if (!--pendingBlobs) {
                  callback(bloblessData);
                }
              };
              fileReader.readAsArrayBuffer(obj);
            } else if (isArray(obj)) {
              for (var i = 0; i < obj.length; i++) {
                _removeBlobs(obj[i], i, obj);
              }
            } else if (obj && 'object' == typeof obj && !isBuf(obj)) {
              for (var key in obj) {
                _removeBlobs(obj[key], key, obj);
              }
            }
          }
          var pendingBlobs = 0;
          var bloblessData = data;
          _removeBlobs(bloblessData);
          if (!pendingBlobs) {
            callback(bloblessData);
          }
        };
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./is-buffer": 47,
      "isarray": 48
    }],
    46: [function(_dereq_, module, exports) {
      var debug = _dereq_('debug')('socket.io-parser');
      var json = _dereq_('json3');
      var isArray = _dereq_('isarray');
      var Emitter = _dereq_('component-emitter');
      var binary = _dereq_('./binary');
      var isBuf = _dereq_('./is-buffer');
      exports.protocol = 4;
      exports.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'BINARY_EVENT', 'ACK', 'BINARY_ACK', 'ERROR'];
      exports.CONNECT = 0;
      exports.DISCONNECT = 1;
      exports.EVENT = 2;
      exports.ACK = 3;
      exports.ERROR = 4;
      exports.BINARY_EVENT = 5;
      exports.BINARY_ACK = 6;
      exports.Encoder = Encoder;
      exports.Decoder = Decoder;
      function Encoder() {}
      Encoder.prototype.encode = function(obj, callback) {
        debug('encoding packet %j', obj);
        if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
          encodeAsBinary(obj, callback);
        } else {
          var encoding = encodeAsString(obj);
          callback([encoding]);
        }
      };
      function encodeAsString(obj) {
        var str = '';
        var nsp = false;
        str += obj.type;
        if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
          str += obj.attachments;
          str += '-';
        }
        if (obj.nsp && '/' != obj.nsp) {
          nsp = true;
          str += obj.nsp;
        }
        if (null != obj.id) {
          if (nsp) {
            str += ',';
            nsp = false;
          }
          str += obj.id;
        }
        if (null != obj.data) {
          if (nsp)
            str += ',';
          str += json.stringify(obj.data);
        }
        debug('encoded %j as %s', obj, str);
        return str;
      }
      function encodeAsBinary(obj, callback) {
        function writeEncoding(bloblessData) {
          var deconstruction = binary.deconstructPacket(bloblessData);
          var pack = encodeAsString(deconstruction.packet);
          var buffers = deconstruction.buffers;
          buffers.unshift(pack);
          callback(buffers);
        }
        binary.removeBlobs(obj, writeEncoding);
      }
      function Decoder() {
        this.reconstructor = null;
      }
      Emitter(Decoder.prototype);
      Decoder.prototype.add = function(obj) {
        var packet;
        if ('string' == typeof obj) {
          packet = decodeString(obj);
          if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) {
            this.reconstructor = new BinaryReconstructor(packet);
            if (this.reconstructor.reconPack.attachments === 0) {
              this.emit('decoded', packet);
            }
          } else {
            this.emit('decoded', packet);
          }
        } else if (isBuf(obj) || obj.base64) {
          if (!this.reconstructor) {
            throw new Error('got binary data when not reconstructing a packet');
          } else {
            packet = this.reconstructor.takeBinaryData(obj);
            if (packet) {
              this.reconstructor = null;
              this.emit('decoded', packet);
            }
          }
        } else {
          throw new Error('Unknown type: ' + obj);
        }
      };
      function decodeString(str) {
        var p = {};
        var i = 0;
        p.type = Number(str.charAt(0));
        if (null == exports.types[p.type])
          return error();
        if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
          var buf = '';
          while (str.charAt(++i) != '-') {
            buf += str.charAt(i);
            if (i == str.length)
              break;
          }
          if (buf != Number(buf) || str.charAt(i) != '-') {
            throw new Error('Illegal attachments');
          }
          p.attachments = Number(buf);
        }
        if ('/' == str.charAt(i + 1)) {
          p.nsp = '';
          while (++i) {
            var c = str.charAt(i);
            if (',' == c)
              break;
            p.nsp += c;
            if (i == str.length)
              break;
          }
        } else {
          p.nsp = '/';
        }
        var next = str.charAt(i + 1);
        if ('' !== next && Number(next) == next) {
          p.id = '';
          while (++i) {
            var c = str.charAt(i);
            if (null == c || Number(c) != c) {
              --i;
              break;
            }
            p.id += str.charAt(i);
            if (i == str.length)
              break;
          }
          p.id = Number(p.id);
        }
        if (str.charAt(++i)) {
          try {
            p.data = json.parse(str.substr(i));
          } catch (e) {
            return error();
          }
        }
        debug('decoded %s as %j', str, p);
        return p;
      }
      Decoder.prototype.destroy = function() {
        if (this.reconstructor) {
          this.reconstructor.finishedReconstruction();
        }
      };
      function BinaryReconstructor(packet) {
        this.reconPack = packet;
        this.buffers = [];
      }
      BinaryReconstructor.prototype.takeBinaryData = function(binData) {
        this.buffers.push(binData);
        if (this.buffers.length == this.reconPack.attachments) {
          var packet = binary.reconstructPacket(this.reconPack, this.buffers);
          this.finishedReconstruction();
          return packet;
        }
        return null;
      };
      BinaryReconstructor.prototype.finishedReconstruction = function() {
        this.reconPack = null;
        this.buffers = [];
      };
      function error(data) {
        return {
          type: exports.ERROR,
          data: 'parser error'
        };
      }
    }, {
      "./binary": 45,
      "./is-buffer": 47,
      "component-emitter": 9,
      "debug": 10,
      "isarray": 48,
      "json3": 49
    }],
    47: [function(_dereq_, module, exports) {
      (function(global) {
        module.exports = isBuf;
        function isBuf(obj) {
          return (global.Buffer && global.Buffer.isBuffer(obj)) || (global.ArrayBuffer && obj instanceof ArrayBuffer);
        }
      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    48: [function(_dereq_, module, exports) {
      module.exports = _dereq_(32);
    }, {}],
    49: [function(_dereq_, module, exports) {
      ;
      (function(window) {
        var getClass = {}.toString,
            isProperty,
            forEach,
            undef;
        var isLoader = typeof define === "function" && define.amd;
        var nativeJSON = typeof JSON == "object" && JSON;
        var JSON3 = typeof exports == "object" && exports && !exports.nodeType && exports;
        if (JSON3 && nativeJSON) {
          JSON3.stringify = nativeJSON.stringify;
          JSON3.parse = nativeJSON.parse;
        } else {
          JSON3 = window.JSON = nativeJSON || {};
        }
        var isExtended = new Date(-3509827334573292);
        try {
          isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
        } catch (exception) {}
        function has(name) {
          if (has[name] !== undef) {
            return has[name];
          }
          var isSupported;
          if (name == "bug-string-char-index") {
            isSupported = "a"[0] != "a";
          } else if (name == "json") {
            isSupported = has("json-stringify") && has("json-parse");
          } else {
            var value,
                serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
            if (name == "json-stringify") {
              var stringify = JSON3.stringify,
                  stringifySupported = typeof stringify == "function" && isExtended;
              if (stringifySupported) {
                (value = function() {
                  return 1;
                }).toJSON = value;
                try {
                  stringifySupported = stringify(0) === "0" && stringify(new Number()) === "0" && stringify(new String()) == '""' && stringify(getClass) === undef && stringify(undef) === undef && stringify() === undef && stringify(value) === "1" && stringify([value]) == "[1]" && stringify([undef]) == "[null]" && stringify(null) == "null" && stringify([undef, getClass, null]) == "[null,null,null]" && stringify({"a": [value, true, false, null, "\x00\b\n\f\r\t"]}) == serialized && stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" && stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' && stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' && stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
                } catch (exception) {
                  stringifySupported = false;
                }
              }
              isSupported = stringifySupported;
            }
            if (name == "json-parse") {
              var parse = JSON3.parse;
              if (typeof parse == "function") {
                try {
                  if (parse("0") === 0 && !parse(false)) {
                    value = parse(serialized);
                    var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                    if (parseSupported) {
                      try {
                        parseSupported = !parse('"\t"');
                      } catch (exception) {}
                      if (parseSupported) {
                        try {
                          parseSupported = parse("01") !== 1;
                        } catch (exception) {}
                      }
                      if (parseSupported) {
                        try {
                          parseSupported = parse("1.") !== 1;
                        } catch (exception) {}
                      }
                    }
                  }
                } catch (exception) {
                  parseSupported = false;
                }
              }
              isSupported = parseSupported;
            }
          }
          return has[name] = !!isSupported;
        }
        if (!has("json")) {
          var functionClass = "[object Function]";
          var dateClass = "[object Date]";
          var numberClass = "[object Number]";
          var stringClass = "[object String]";
          var arrayClass = "[object Array]";
          var booleanClass = "[object Boolean]";
          var charIndexBuggy = has("bug-string-char-index");
          if (!isExtended) {
            var floor = Math.floor;
            var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            var getDay = function(year, month) {
              return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
            };
          }
          if (!(isProperty = {}.hasOwnProperty)) {
            isProperty = function(property) {
              var members = {},
                  constructor;
              if ((members.__proto__ = null, members.__proto__ = {"toString": 1}, members).toString != getClass) {
                isProperty = function(property) {
                  var original = this.__proto__,
                      result = property in (this.__proto__ = null, this);
                  this.__proto__ = original;
                  return result;
                };
              } else {
                constructor = members.constructor;
                isProperty = function(property) {
                  var parent = (this.constructor || constructor).prototype;
                  return property in this && !(property in parent && this[property] === parent[property]);
                };
              }
              members = null;
              return isProperty.call(this, property);
            };
          }
          var PrimitiveTypes = {
            'boolean': 1,
            'number': 1,
            'string': 1,
            'undefined': 1
          };
          var isHostType = function(object, property) {
            var type = typeof object[property];
            return type == 'object' ? !!object[property] : !PrimitiveTypes[type];
          };
          forEach = function(object, callback) {
            var size = 0,
                Properties,
                members,
                property;
            (Properties = function() {
              this.valueOf = 0;
            }).prototype.valueOf = 0;
            members = new Properties();
            for (property in members) {
              if (isProperty.call(members, property)) {
                size++;
              }
            }
            Properties = members = null;
            if (!size) {
              members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
              forEach = function(object, callback) {
                var isFunction = getClass.call(object) == functionClass,
                    property,
                    length;
                var hasProperty = !isFunction && typeof object.constructor != 'function' && isHostType(object, 'hasOwnProperty') ? object.hasOwnProperty : isProperty;
                for (property in object) {
                  if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                    callback(property);
                  }
                }
                for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property))
                  ;
              };
            } else if (size == 2) {
              forEach = function(object, callback) {
                var members = {},
                    isFunction = getClass.call(object) == functionClass,
                    property;
                for (property in object) {
                  if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                    callback(property);
                  }
                }
              };
            } else {
              forEach = function(object, callback) {
                var isFunction = getClass.call(object) == functionClass,
                    property,
                    isConstructor;
                for (property in object) {
                  if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                    callback(property);
                  }
                }
                if (isConstructor || isProperty.call(object, (property = "constructor"))) {
                  callback(property);
                }
              };
            }
            return forEach(object, callback);
          };
          if (!has("json-stringify")) {
            var Escapes = {
              92: "\\\\",
              34: '\\"',
              8: "\\b",
              12: "\\f",
              10: "\\n",
              13: "\\r",
              9: "\\t"
            };
            var leadingZeroes = "000000";
            var toPaddedString = function(width, value) {
              return (leadingZeroes + (value || 0)).slice(-width);
            };
            var unicodePrefix = "\\u00";
            var quote = function(value) {
              var result = '"',
                  index = 0,
                  length = value.length,
                  isLarge = length > 10 && charIndexBuggy,
                  symbols;
              if (isLarge) {
                symbols = value.split("");
              }
              for (; index < length; index++) {
                var charCode = value.charCodeAt(index);
                switch (charCode) {
                  case 8:
                  case 9:
                  case 10:
                  case 12:
                  case 13:
                  case 34:
                  case 92:
                    result += Escapes[charCode];
                    break;
                  default:
                    if (charCode < 32) {
                      result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                      break;
                    }
                    result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index];
                }
              }
              return result + '"';
            };
            var serialize = function(property, object, callback, properties, whitespace, indentation, stack) {
              var value,
                  className,
                  year,
                  month,
                  date,
                  time,
                  hours,
                  minutes,
                  seconds,
                  milliseconds,
                  results,
                  element,
                  index,
                  length,
                  prefix,
                  result;
              try {
                value = object[property];
              } catch (exception) {}
              if (typeof value == "object" && value) {
                className = getClass.call(value);
                if (className == dateClass && !isProperty.call(value, "toJSON")) {
                  if (value > -1 / 0 && value < 1 / 0) {
                    if (getDay) {
                      date = floor(value / 864e5);
                      for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++)
                        ;
                      for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++)
                        ;
                      date = 1 + date - getDay(year, month);
                      time = (value % 864e5 + 864e5) % 864e5;
                      hours = floor(time / 36e5) % 24;
                      minutes = floor(time / 6e4) % 60;
                      seconds = floor(time / 1e3) % 60;
                      milliseconds = time % 1e3;
                    } else {
                      year = value.getUTCFullYear();
                      month = value.getUTCMonth();
                      date = value.getUTCDate();
                      hours = value.getUTCHours();
                      minutes = value.getUTCMinutes();
                      seconds = value.getUTCSeconds();
                      milliseconds = value.getUTCMilliseconds();
                    }
                    value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + "." + toPaddedString(3, milliseconds) + "Z";
                  } else {
                    value = null;
                  }
                } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
                  value = value.toJSON(property);
                }
              }
              if (callback) {
                value = callback.call(object, property, value);
              }
              if (value === null) {
                return "null";
              }
              className = getClass.call(value);
              if (className == booleanClass) {
                return "" + value;
              } else if (className == numberClass) {
                return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
              } else if (className == stringClass) {
                return quote("" + value);
              }
              if (typeof value == "object") {
                for (length = stack.length; length--; ) {
                  if (stack[length] === value) {
                    throw TypeError();
                  }
                }
                stack.push(value);
                results = [];
                prefix = indentation;
                indentation += whitespace;
                if (className == arrayClass) {
                  for (index = 0, length = value.length; index < length; index++) {
                    element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                    results.push(element === undef ? "null" : element);
                  }
                  result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
                } else {
                  forEach(properties || value, function(property) {
                    var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                    if (element !== undef) {
                      results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                    }
                  });
                  result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
                }
                stack.pop();
                return result;
              }
            };
            JSON3.stringify = function(source, filter, width) {
              var whitespace,
                  callback,
                  properties,
                  className;
              if (typeof filter == "function" || typeof filter == "object" && filter) {
                if ((className = getClass.call(filter)) == functionClass) {
                  callback = filter;
                } else if (className == arrayClass) {
                  properties = {};
                  for (var index = 0,
                      length = filter.length,
                      value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1))
                    ;
                }
              }
              if (width) {
                if ((className = getClass.call(width)) == numberClass) {
                  if ((width -= width % 1) > 0) {
                    for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ")
                      ;
                  }
                } else if (className == stringClass) {
                  whitespace = width.length <= 10 ? width : width.slice(0, 10);
                }
              }
              return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
            };
          }
          if (!has("json-parse")) {
            var fromCharCode = String.fromCharCode;
            var Unescapes = {
              92: "\\",
              34: '"',
              47: "/",
              98: "\b",
              116: "\t",
              110: "\n",
              102: "\f",
              114: "\r"
            };
            var Index,
                Source;
            var abort = function() {
              Index = Source = null;
              throw SyntaxError();
            };
            var lex = function() {
              var source = Source,
                  length = source.length,
                  value,
                  begin,
                  position,
                  isSigned,
                  charCode;
              while (Index < length) {
                charCode = source.charCodeAt(Index);
                switch (charCode) {
                  case 9:
                  case 10:
                  case 13:
                  case 32:
                    Index++;
                    break;
                  case 123:
                  case 125:
                  case 91:
                  case 93:
                  case 58:
                  case 44:
                    value = charIndexBuggy ? source.charAt(Index) : source[Index];
                    Index++;
                    return value;
                  case 34:
                    for (value = "@", Index++; Index < length; ) {
                      charCode = source.charCodeAt(Index);
                      if (charCode < 32) {
                        abort();
                      } else if (charCode == 92) {
                        charCode = source.charCodeAt(++Index);
                        switch (charCode) {
                          case 92:
                          case 34:
                          case 47:
                          case 98:
                          case 116:
                          case 110:
                          case 102:
                          case 114:
                            value += Unescapes[charCode];
                            Index++;
                            break;
                          case 117:
                            begin = ++Index;
                            for (position = Index + 4; Index < position; Index++) {
                              charCode = source.charCodeAt(Index);
                              if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                                abort();
                              }
                            }
                            value += fromCharCode("0x" + source.slice(begin, Index));
                            break;
                          default:
                            abort();
                        }
                      } else {
                        if (charCode == 34) {
                          break;
                        }
                        charCode = source.charCodeAt(Index);
                        begin = Index;
                        while (charCode >= 32 && charCode != 92 && charCode != 34) {
                          charCode = source.charCodeAt(++Index);
                        }
                        value += source.slice(begin, Index);
                      }
                    }
                    if (source.charCodeAt(Index) == 34) {
                      Index++;
                      return value;
                    }
                    abort();
                  default:
                    begin = Index;
                    if (charCode == 45) {
                      isSigned = true;
                      charCode = source.charCodeAt(++Index);
                    }
                    if (charCode >= 48 && charCode <= 57) {
                      if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                        abort();
                      }
                      isSigned = false;
                      for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++)
                        ;
                      if (source.charCodeAt(Index) == 46) {
                        position = ++Index;
                        for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++)
                          ;
                        if (position == Index) {
                          abort();
                        }
                        Index = position;
                      }
                      charCode = source.charCodeAt(Index);
                      if (charCode == 101 || charCode == 69) {
                        charCode = source.charCodeAt(++Index);
                        if (charCode == 43 || charCode == 45) {
                          Index++;
                        }
                        for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++)
                          ;
                        if (position == Index) {
                          abort();
                        }
                        Index = position;
                      }
                      return +source.slice(begin, Index);
                    }
                    if (isSigned) {
                      abort();
                    }
                    if (source.slice(Index, Index + 4) == "true") {
                      Index += 4;
                      return true;
                    } else if (source.slice(Index, Index + 5) == "false") {
                      Index += 5;
                      return false;
                    } else if (source.slice(Index, Index + 4) == "null") {
                      Index += 4;
                      return null;
                    }
                    abort();
                }
              }
              return "$";
            };
            var get = function(value) {
              var results,
                  hasMembers;
              if (value == "$") {
                abort();
              }
              if (typeof value == "string") {
                if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                  return value.slice(1);
                }
                if (value == "[") {
                  results = [];
                  for (; ; hasMembers || (hasMembers = true)) {
                    value = lex();
                    if (value == "]") {
                      break;
                    }
                    if (hasMembers) {
                      if (value == ",") {
                        value = lex();
                        if (value == "]") {
                          abort();
                        }
                      } else {
                        abort();
                      }
                    }
                    if (value == ",") {
                      abort();
                    }
                    results.push(get(value));
                  }
                  return results;
                } else if (value == "{") {
                  results = {};
                  for (; ; hasMembers || (hasMembers = true)) {
                    value = lex();
                    if (value == "}") {
                      break;
                    }
                    if (hasMembers) {
                      if (value == ",") {
                        value = lex();
                        if (value == "}") {
                          abort();
                        }
                      } else {
                        abort();
                      }
                    }
                    if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                      abort();
                    }
                    results[value.slice(1)] = get(lex());
                  }
                  return results;
                }
                abort();
              }
              return value;
            };
            var update = function(source, property, callback) {
              var element = walk(source, property, callback);
              if (element === undef) {
                delete source[property];
              } else {
                source[property] = element;
              }
            };
            var walk = function(source, property, callback) {
              var value = source[property],
                  length;
              if (typeof value == "object" && value) {
                if (getClass.call(value) == arrayClass) {
                  for (length = value.length; length--; ) {
                    update(value, length, callback);
                  }
                } else {
                  forEach(value, function(property) {
                    update(value, property, callback);
                  });
                }
              }
              return callback.call(source, property, value);
            };
            JSON3.parse = function(source, callback) {
              var result,
                  value;
              Index = 0;
              Source = "" + source;
              result = get(lex());
              if (lex() != "$") {
                abort();
              }
              Index = Source = null;
              return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
            };
          }
        }
        if (isLoader) {
          define(function() {
            return JSON3;
          });
        }
      }(this));
    }, {}],
    50: [function(_dereq_, module, exports) {
      module.exports = toArray;
      function toArray(list, index) {
        var array = [];
        index = index || 0;
        for (var i = index || 0; i < list.length; i++) {
          array[i - index] = list[i];
        }
        return array;
      }
    }, {}]
  }, {}, [1])(1);
});

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
!function(a, b) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
    if (!a.document)
      throw new Error("jQuery requires a window with a document");
    return b(a);
  } : b(a);
}("undefined" != typeof window ? window : this, function(a, b) {
  var c = [],
      d = c.slice,
      e = c.concat,
      f = c.push,
      g = c.indexOf,
      h = {},
      i = h.toString,
      j = h.hasOwnProperty,
      k = {},
      l = a.document,
      m = "2.1.4",
      n = function(a, b) {
        return new n.fn.init(a, b);
      },
      o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      p = /^-ms-/,
      q = /-([\da-z])/gi,
      r = function(a, b) {
        return b.toUpperCase();
      };
  n.fn = n.prototype = {
    jquery: m,
    constructor: n,
    selector: "",
    length: 0,
    toArray: function() {
      return d.call(this);
    },
    get: function(a) {
      return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this);
    },
    pushStack: function(a) {
      var b = n.merge(this.constructor(), a);
      return b.prevObject = this, b.context = this.context, b;
    },
    each: function(a, b) {
      return n.each(this, a, b);
    },
    map: function(a) {
      return this.pushStack(n.map(this, function(b, c) {
        return a.call(b, c, b);
      }));
    },
    slice: function() {
      return this.pushStack(d.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(a) {
      var b = this.length,
          c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor(null);
    },
    push: f,
    sort: c.sort,
    splice: c.splice
  }, n.extend = n.fn.extend = function() {
    var a,
        b,
        c,
        d,
        e,
        f,
        g = arguments[0] || {},
        h = 1,
        i = arguments.length,
        j = !1;
    for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
      if (null != (a = arguments[h]))
        for (b in a)
          c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));
    return g;
  }, n.extend({
    expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function(a) {
      throw new Error(a);
    },
    noop: function() {},
    isFunction: function(a) {
      return "function" === n.type(a);
    },
    isArray: Array.isArray,
    isWindow: function(a) {
      return null != a && a === a.window;
    },
    isNumeric: function(a) {
      return !n.isArray(a) && a - parseFloat(a) + 1 >= 0;
    },
    isPlainObject: function(a) {
      return "object" !== n.type(a) || a.nodeType || n.isWindow(a) ? !1 : a.constructor && !j.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0;
    },
    isEmptyObject: function(a) {
      var b;
      for (b in a)
        return !1;
      return !0;
    },
    type: function(a) {
      return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a;
    },
    globalEval: function(a) {
      var b,
          c = eval;
      a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = l.createElement("script"), b.text = a, l.head.appendChild(b).parentNode.removeChild(b)) : c(a));
    },
    camelCase: function(a) {
      return a.replace(p, "ms-").replace(q, r);
    },
    nodeName: function(a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
    },
    each: function(a, b, c) {
      var d,
          e = 0,
          f = a.length,
          g = s(a);
      if (c) {
        if (g) {
          for (; f > e; e++)
            if (d = b.apply(a[e], c), d === !1)
              break;
        } else
          for (e in a)
            if (d = b.apply(a[e], c), d === !1)
              break;
      } else if (g) {
        for (; f > e; e++)
          if (d = b.call(a[e], e, a[e]), d === !1)
            break;
      } else
        for (e in a)
          if (d = b.call(a[e], e, a[e]), d === !1)
            break;
      return a;
    },
    trim: function(a) {
      return null == a ? "" : (a + "").replace(o, "");
    },
    makeArray: function(a, b) {
      var c = b || [];
      return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c;
    },
    inArray: function(a, b, c) {
      return null == b ? -1 : g.call(b, a, c);
    },
    merge: function(a, b) {
      for (var c = +b.length,
          d = 0,
          e = a.length; c > d; d++)
        a[e++] = b[d];
      return a.length = e, a;
    },
    grep: function(a, b, c) {
      for (var d,
          e = [],
          f = 0,
          g = a.length,
          h = !c; g > f; f++)
        d = !b(a[f], f), d !== h && e.push(a[f]);
      return e;
    },
    map: function(a, b, c) {
      var d,
          f = 0,
          g = a.length,
          h = s(a),
          i = [];
      if (h)
        for (; g > f; f++)
          d = b(a[f], f, c), null != d && i.push(d);
      else
        for (f in a)
          d = b(a[f], f, c), null != d && i.push(d);
      return e.apply([], i);
    },
    guid: 1,
    proxy: function(a, b) {
      var c,
          e,
          f;
      return "string" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (e = d.call(arguments, 2), f = function() {
        return a.apply(b || this, e.concat(d.call(arguments)));
      }, f.guid = a.guid = a.guid || n.guid++, f) : void 0;
    },
    now: Date.now,
    support: k
  }), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
    h["[object " + b + "]"] = b.toLowerCase();
  });
  function s(a) {
    var b = "length" in a && a.length,
        c = n.type(a);
    return "function" === c || n.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
  }
  var t = function(a) {
    var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u = "sizzle" + 1 * new Date,
        v = a.document,
        w = 0,
        x = 0,
        y = ha(),
        z = ha(),
        A = ha(),
        B = function(a, b) {
          return a === b && (l = !0), 0;
        },
        C = 1 << 31,
        D = {}.hasOwnProperty,
        E = [],
        F = E.pop,
        G = E.push,
        H = E.push,
        I = E.slice,
        J = function(a, b) {
          for (var c = 0,
              d = a.length; d > c; c++)
            if (a[c] === b)
              return c;
          return -1;
        },
        K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        L = "[\\x20\\t\\r\\n\\f]",
        M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        N = M.replace("w", "w#"),
        O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
        P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)",
        Q = new RegExp(L + "+", "g"),
        R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
        S = new RegExp("^" + L + "*," + L + "*"),
        T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
        U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
        V = new RegExp(P),
        W = new RegExp("^" + N + "$"),
        X = {
          ID: new RegExp("^#(" + M + ")"),
          CLASS: new RegExp("^\\.(" + M + ")"),
          TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
          ATTR: new RegExp("^" + O),
          PSEUDO: new RegExp("^" + P),
          CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
          bool: new RegExp("^(?:" + K + ")$", "i"),
          needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
        },
        Y = /^(?:input|select|textarea|button)$/i,
        Z = /^h\d$/i,
        $ = /^[^{]+\{\s*\[native \w/,
        _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        aa = /[+~]/,
        ba = /'|\\/g,
        ca = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
        da = function(a, b, c) {
          var d = "0x" + b - 65536;
          return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
        },
        ea = function() {
          m();
        };
    try {
      H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType;
    } catch (fa) {
      H = {apply: E.length ? function(a, b) {
          G.apply(a, I.call(b));
        } : function(a, b) {
          var c = a.length,
              d = 0;
          while (a[c++] = b[d++])
            ;
          a.length = c - 1;
        }};
    }
    function ga(a, b, d, e) {
      var f,
          h,
          j,
          k,
          l,
          o,
          r,
          s,
          w,
          x;
      if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k)
        return d;
      if (!e && p) {
        if (11 !== k && (f = _.exec(a)))
          if (j = f[1]) {
            if (9 === k) {
              if (h = b.getElementById(j), !h || !h.parentNode)
                return d;
              if (h.id === j)
                return d.push(h), d;
            } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j)
              return d.push(h), d;
          } else {
            if (f[2])
              return H.apply(d, b.getElementsByTagName(a)), d;
            if ((j = f[3]) && c.getElementsByClassName)
              return H.apply(d, b.getElementsByClassName(j)), d;
          }
        if (c.qsa && (!q || !q.test(a))) {
          if (s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
            o = g(a), (r = b.getAttribute("id")) ? s = r.replace(ba, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
            while (l--)
              o[l] = s + ra(o[l]);
            w = aa.test(a) && pa(b.parentNode) || b, x = o.join(",");
          }
          if (x)
            try {
              return H.apply(d, w.querySelectorAll(x)), d;
            } catch (y) {} finally {
              r || b.removeAttribute("id");
            }
        }
      }
      return i(a.replace(R, "$1"), b, d, e);
    }
    function ha() {
      var a = [];
      function b(c, e) {
        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
      }
      return b;
    }
    function ia(a) {
      return a[u] = !0, a;
    }
    function ja(a) {
      var b = n.createElement("div");
      try {
        return !!a(b);
      } catch (c) {
        return !1;
      } finally {
        b.parentNode && b.parentNode.removeChild(b), b = null;
      }
    }
    function ka(a, b) {
      var c = a.split("|"),
          e = a.length;
      while (e--)
        d.attrHandle[c[e]] = b;
    }
    function la(a, b) {
      var c = b && a,
          d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
      if (d)
        return d;
      if (c)
        while (c = c.nextSibling)
          if (c === b)
            return -1;
      return a ? 1 : -1;
    }
    function ma(a) {
      return function(b) {
        var c = b.nodeName.toLowerCase();
        return "input" === c && b.type === a;
      };
    }
    function na(a) {
      return function(b) {
        var c = b.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && b.type === a;
      };
    }
    function oa(a) {
      return ia(function(b) {
        return b = +b, ia(function(c, d) {
          var e,
              f = a([], c.length, b),
              g = f.length;
          while (g--)
            c[e = f[g]] && (c[e] = !(d[e] = c[e]));
        });
      });
    }
    function pa(a) {
      return a && "undefined" != typeof a.getElementsByTagName && a;
    }
    c = ga.support = {}, f = ga.isXML = function(a) {
      var b = a && (a.ownerDocument || a).documentElement;
      return b ? "HTML" !== b.nodeName : !1;
    }, m = ga.setDocument = function(a) {
      var b,
          e,
          g = a ? a.ownerDocument || a : v;
      return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", ea, !1) : e.attachEvent && e.attachEvent("onunload", ea)), p = !f(g), c.attributes = ja(function(a) {
        return a.className = "i", !a.getAttribute("className");
      }), c.getElementsByTagName = ja(function(a) {
        return a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length;
      }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = ja(function(a) {
        return o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length;
      }), c.getById ? (d.find.ID = function(a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c = b.getElementById(a);
          return c && c.parentNode ? [c] : [];
        }
      }, d.filter.ID = function(a) {
        var b = a.replace(ca, da);
        return function(a) {
          return a.getAttribute("id") === b;
        };
      }) : (delete d.find.ID, d.filter.ID = function(a) {
        var b = a.replace(ca, da);
        return function(a) {
          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
          return c && c.value === b;
        };
      }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
      } : function(a, b) {
        var c,
            d = [],
            e = 0,
            f = b.getElementsByTagName(a);
        if ("*" === a) {
          while (c = f[e++])
            1 === c.nodeType && d.push(c);
          return d;
        }
        return f;
      }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
        return p ? b.getElementsByClassName(a) : void 0;
      }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (ja(function(a) {
        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
      }), ja(function(a) {
        var b = g.createElement("input");
        b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:");
      })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function(a) {
        c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", P);
      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function(a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a,
            d = b && b.parentNode;
        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
      } : function(a, b) {
        if (b)
          while (b = b.parentNode)
            if (b === a)
              return !0;
        return !1;
      }, B = b ? function(a, b) {
        if (a === b)
          return l = !0, 0;
        var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
        return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1);
      } : function(a, b) {
        if (a === b)
          return l = !0, 0;
        var c,
            d = 0,
            e = a.parentNode,
            f = b.parentNode,
            h = [a],
            i = [b];
        if (!e || !f)
          return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
        if (e === f)
          return la(a, b);
        c = a;
        while (c = c.parentNode)
          h.unshift(c);
        c = b;
        while (c = c.parentNode)
          i.unshift(c);
        while (h[d] === i[d])
          d++;
        return d ? la(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0;
      }, g) : n;
    }, ga.matches = function(a, b) {
      return ga(a, null, null, b);
    }, ga.matchesSelector = function(a, b) {
      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b)))
        try {
          var d = s.call(a, b);
          if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType)
            return d;
        } catch (e) {}
      return ga(b, n, null, [a]).length > 0;
    }, ga.contains = function(a, b) {
      return (a.ownerDocument || a) !== n && m(a), t(a, b);
    }, ga.attr = function(a, b) {
      (a.ownerDocument || a) !== n && m(a);
      var e = d.attrHandle[b.toLowerCase()],
          f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
      return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
    }, ga.error = function(a) {
      throw new Error("Syntax error, unrecognized expression: " + a);
    }, ga.uniqueSort = function(a) {
      var b,
          d = [],
          e = 0,
          f = 0;
      if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
        while (b = a[f++])
          b === a[f] && (e = d.push(f));
        while (e--)
          a.splice(d[e], 1);
      }
      return k = null, a;
    }, e = ga.getText = function(a) {
      var b,
          c = "",
          d = 0,
          f = a.nodeType;
      if (f) {
        if (1 === f || 9 === f || 11 === f) {
          if ("string" == typeof a.textContent)
            return a.textContent;
          for (a = a.firstChild; a; a = a.nextSibling)
            c += e(a);
        } else if (3 === f || 4 === f)
          return a.nodeValue;
      } else
        while (b = a[d++])
          c += e(b);
      return c;
    }, d = ga.selectors = {
      cacheLength: 50,
      createPseudo: ia,
      match: X,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {dir: "parentNode"},
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        ATTR: function(a) {
          return a[1] = a[1].replace(ca, da), a[3] = (a[3] || a[4] || a[5] || "").replace(ca, da), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
        },
        CHILD: function(a) {
          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a;
        },
        PSEUDO: function(a) {
          var b,
              c = !a[6] && a[2];
          return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
        }
      },
      filter: {
        TAG: function(a) {
          var b = a.replace(ca, da).toLowerCase();
          return "*" === a ? function() {
            return !0;
          } : function(a) {
            return a.nodeName && a.nodeName.toLowerCase() === b;
          };
        },
        CLASS: function(a) {
          var b = y[a + " "];
          return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function(a) {
            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
          });
        },
        ATTR: function(a, b, c) {
          return function(d) {
            var e = ga.attr(d, a);
            return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0;
          };
        },
        CHILD: function(a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
              g = "last" !== a.slice(-4),
              h = "of-type" === b;
          return 1 === d && 0 === e ? function(a) {
            return !!a.parentNode;
          } : function(b, c, i) {
            var j,
                k,
                l,
                m,
                n,
                o,
                p = f !== g ? "nextSibling" : "previousSibling",
                q = b.parentNode,
                r = h && b.nodeName.toLowerCase(),
                s = !i && !h;
            if (q) {
              if (f) {
                while (p) {
                  l = b;
                  while (l = l[p])
                    if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)
                      return !1;
                  o = p = "only" === a && !o && "nextSibling";
                }
                return !0;
              }
              if (o = [g ? q.firstChild : q.lastChild], g && s) {
                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                  if (1 === l.nodeType && ++m && l === b) {
                    k[a] = [w, n, m];
                    break;
                  }
              } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w)
                m = j[1];
              else
                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                  if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b))
                    break;
              return m -= e, m === d || m % d === 0 && m / d >= 0;
            }
          };
        },
        PSEUDO: function(a, b) {
          var c,
              e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);
          return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function(a, c) {
            var d,
                f = e(a, b),
                g = f.length;
            while (g--)
              d = J(a, f[g]), a[d] = !(c[d] = f[g]);
          }) : function(a) {
            return e(a, 0, c);
          }) : e;
        }
      },
      pseudos: {
        not: ia(function(a) {
          var b = [],
              c = [],
              d = h(a.replace(R, "$1"));
          return d[u] ? ia(function(a, b, c, e) {
            var f,
                g = d(a, null, e, []),
                h = a.length;
            while (h--)
              (f = g[h]) && (a[h] = !(b[h] = f));
          }) : function(a, e, f) {
            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
          };
        }),
        has: ia(function(a) {
          return function(b) {
            return ga(a, b).length > 0;
          };
        }),
        contains: ia(function(a) {
          return a = a.replace(ca, da), function(b) {
            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
          };
        }),
        lang: ia(function(a) {
          return W.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(ca, da).toLowerCase(), function(b) {
            var c;
            do
              if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
 while ((b = b.parentNode) && 1 === b.nodeType);
            return !1;
          };
        }),
        target: function(b) {
          var c = a.location && a.location.hash;
          return c && c.slice(1) === b.id;
        },
        root: function(a) {
          return a === o;
        },
        focus: function(a) {
          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
        },
        enabled: function(a) {
          return a.disabled === !1;
        },
        disabled: function(a) {
          return a.disabled === !0;
        },
        checked: function(a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && !!a.checked || "option" === b && !!a.selected;
        },
        selected: function(a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
        },
        empty: function(a) {
          for (a = a.firstChild; a; a = a.nextSibling)
            if (a.nodeType < 6)
              return !1;
          return !0;
        },
        parent: function(a) {
          return !d.pseudos.empty(a);
        },
        header: function(a) {
          return Z.test(a.nodeName);
        },
        input: function(a) {
          return Y.test(a.nodeName);
        },
        button: function(a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && "button" === a.type || "button" === b;
        },
        text: function(a) {
          var b;
          return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
        },
        first: oa(function() {
          return [0];
        }),
        last: oa(function(a, b) {
          return [b - 1];
        }),
        eq: oa(function(a, b, c) {
          return [0 > c ? c + b : c];
        }),
        even: oa(function(a, b) {
          for (var c = 0; b > c; c += 2)
            a.push(c);
          return a;
        }),
        odd: oa(function(a, b) {
          for (var c = 1; b > c; c += 2)
            a.push(c);
          return a;
        }),
        lt: oa(function(a, b, c) {
          for (var d = 0 > c ? c + b : c; --d >= 0; )
            a.push(d);
          return a;
        }),
        gt: oa(function(a, b, c) {
          for (var d = 0 > c ? c + b : c; ++d < b; )
            a.push(d);
          return a;
        })
      }
    }, d.pseudos.nth = d.pseudos.eq;
    for (b in {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    })
      d.pseudos[b] = ma(b);
    for (b in {
      submit: !0,
      reset: !0
    })
      d.pseudos[b] = na(b);
    function qa() {}
    qa.prototype = d.filters = d.pseudos, d.setFilters = new qa, g = ga.tokenize = function(a, b) {
      var c,
          e,
          f,
          g,
          h,
          i,
          j,
          k = z[a + " "];
      if (k)
        return b ? 0 : k.slice(0);
      h = a, i = [], j = d.preFilter;
      while (h) {
        (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({
          value: c,
          type: e[0].replace(R, " ")
        }), h = h.slice(c.length));
        for (g in d.filter)
          !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
            value: c,
            type: g,
            matches: e
          }), h = h.slice(c.length));
        if (!c)
          break;
      }
      return b ? h.length : h ? ga.error(a) : z(a, i).slice(0);
    };
    function ra(a) {
      for (var b = 0,
          c = a.length,
          d = ""; c > b; b++)
        d += a[b].value;
      return d;
    }
    function sa(a, b, c) {
      var d = b.dir,
          e = c && "parentNode" === d,
          f = x++;
      return b.first ? function(b, c, f) {
        while (b = b[d])
          if (1 === b.nodeType || e)
            return a(b, c, f);
      } : function(b, c, g) {
        var h,
            i,
            j = [w, f];
        if (g) {
          while (b = b[d])
            if ((1 === b.nodeType || e) && a(b, c, g))
              return !0;
        } else
          while (b = b[d])
            if (1 === b.nodeType || e) {
              if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f)
                return j[2] = h[2];
              if (i[d] = j, j[2] = a(b, c, g))
                return !0;
            }
      };
    }
    function ta(a) {
      return a.length > 1 ? function(b, c, d) {
        var e = a.length;
        while (e--)
          if (!a[e](b, c, d))
            return !1;
        return !0;
      } : a[0];
    }
    function ua(a, b, c) {
      for (var d = 0,
          e = b.length; e > d; d++)
        ga(a, b[d], c);
      return c;
    }
    function va(a, b, c, d, e) {
      for (var f,
          g = [],
          h = 0,
          i = a.length,
          j = null != b; i > h; h++)
        (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
      return g;
    }
    function wa(a, b, c, d, e, f) {
      return d && !d[u] && (d = wa(d)), e && !e[u] && (e = wa(e, f)), ia(function(f, g, h, i) {
        var j,
            k,
            l,
            m = [],
            n = [],
            o = g.length,
            p = f || ua(b || "*", h.nodeType ? [h] : h, []),
            q = !a || !f && b ? p : va(p, m, a, h, i),
            r = c ? e || (f ? a : o || d) ? [] : g : q;
        if (c && c(q, r, h, i), d) {
          j = va(r, n), d(j, [], h, i), k = j.length;
          while (k--)
            (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
        }
        if (f) {
          if (e || a) {
            if (e) {
              j = [], k = r.length;
              while (k--)
                (l = r[k]) && j.push(q[k] = l);
              e(null, r = [], j, i);
            }
            k = r.length;
            while (k--)
              (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
          }
        } else
          r = va(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r);
      });
    }
    function xa(a) {
      for (var b,
          c,
          e,
          f = a.length,
          g = d.relative[a[0].type],
          h = g || d.relative[" "],
          i = g ? 1 : 0,
          k = sa(function(a) {
            return a === b;
          }, h, !0),
          l = sa(function(a) {
            return J(b, a) > -1;
          }, h, !0),
          m = [function(a, c, d) {
            var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
            return b = null, e;
          }]; f > i; i++)
        if (c = d.relative[a[i].type])
          m = [sa(ta(m), c)];
        else {
          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
            for (e = ++i; f > e; e++)
              if (d.relative[a[e].type])
                break;
            return wa(i > 1 && ta(m), i > 1 && ra(a.slice(0, i - 1).concat({value: " " === a[i - 2].type ? "*" : ""})).replace(R, "$1"), c, e > i && xa(a.slice(i, e)), f > e && xa(a = a.slice(e)), f > e && ra(a));
          }
          m.push(c);
        }
      return ta(m);
    }
    function ya(a, b) {
      var c = b.length > 0,
          e = a.length > 0,
          f = function(f, g, h, i, k) {
            var l,
                m,
                o,
                p = 0,
                q = "0",
                r = f && [],
                s = [],
                t = j,
                u = f || e && d.find.TAG("*", k),
                v = w += null == t ? 1 : Math.random() || .1,
                x = u.length;
            for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
              if (e && l) {
                m = 0;
                while (o = a[m++])
                  if (o(l, g, h)) {
                    i.push(l);
                    break;
                  }
                k && (w = v);
              }
              c && ((l = !o && l) && p--, f && r.push(l));
            }
            if (p += q, c && q !== p) {
              m = 0;
              while (o = b[m++])
                o(r, s, g, h);
              if (f) {
                if (p > 0)
                  while (q--)
                    r[q] || s[q] || (s[q] = F.call(i));
                s = va(s);
              }
              H.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && ga.uniqueSort(i);
            }
            return k && (w = v, j = t), r;
          };
      return c ? ia(f) : f;
    }
    return h = ga.compile = function(a, b) {
      var c,
          d = [],
          e = [],
          f = A[a + " "];
      if (!f) {
        b || (b = g(a)), c = b.length;
        while (c--)
          f = xa(b[c]), f[u] ? d.push(f) : e.push(f);
        f = A(a, ya(e, d)), f.selector = a;
      }
      return f;
    }, i = ga.select = function(a, b, e, f) {
      var i,
          j,
          k,
          l,
          m,
          n = "function" == typeof a && a,
          o = !f && g(a = n.selector || a);
      if (e = e || [], 1 === o.length) {
        if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
          if (b = (d.find.ID(k.matches[0].replace(ca, da), b) || [])[0], !b)
            return e;
          n && (b = b.parentNode), a = a.slice(j.shift().value.length);
        }
        i = X.needsContext.test(a) ? 0 : j.length;
        while (i--) {
          if (k = j[i], d.relative[l = k.type])
            break;
          if ((m = d.find[l]) && (f = m(k.matches[0].replace(ca, da), aa.test(j[0].type) && pa(b.parentNode) || b))) {
            if (j.splice(i, 1), a = f.length && ra(j), !a)
              return H.apply(e, f), e;
            break;
          }
        }
      }
      return (n || h(a, o))(f, b, !p, e, aa.test(a) && pa(b.parentNode) || b), e;
    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function(a) {
      return 1 & a.compareDocumentPosition(n.createElement("div"));
    }), ja(function(a) {
      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
    }) || ka("type|href|height|width", function(a, b, c) {
      return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
    }), c.attributes && ja(function(a) {
      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
    }) || ka("value", function(a, b, c) {
      return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
    }), ja(function(a) {
      return null == a.getAttribute("disabled");
    }) || ka(K, function(a, b, c) {
      var d;
      return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
    }), ga;
  }(a);
  n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
  var u = n.expr.match.needsContext,
      v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      w = /^.[^:#\[\.,]*$/;
  function x(a, b, c) {
    if (n.isFunction(b))
      return n.grep(a, function(a, d) {
        return !!b.call(a, d, a) !== c;
      });
    if (b.nodeType)
      return n.grep(a, function(a) {
        return a === b !== c;
      });
    if ("string" == typeof b) {
      if (w.test(b))
        return n.filter(b, a, c);
      b = n.filter(b, a);
    }
    return n.grep(a, function(a) {
      return g.call(b, a) >= 0 !== c;
    });
  }
  n.filter = function(a, b, c) {
    var d = b[0];
    return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function(a) {
      return 1 === a.nodeType;
    }));
  }, n.fn.extend({
    find: function(a) {
      var b,
          c = this.length,
          d = [],
          e = this;
      if ("string" != typeof a)
        return this.pushStack(n(a).filter(function() {
          for (b = 0; c > b; b++)
            if (n.contains(e[b], this))
              return !0;
        }));
      for (b = 0; c > b; b++)
        n.find(a, e[b], d);
      return d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d;
    },
    filter: function(a) {
      return this.pushStack(x(this, a || [], !1));
    },
    not: function(a) {
      return this.pushStack(x(this, a || [], !0));
    },
    is: function(a) {
      return !!x(this, "string" == typeof a && u.test(a) ? n(a) : a || [], !1).length;
    }
  });
  var y,
      z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      A = n.fn.init = function(a, b) {
        var c,
            d;
        if (!a)
          return this;
        if ("string" == typeof a) {
          if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b)
            return !b || b.jquery ? (b || y).find(a) : this.constructor(b).find(a);
          if (c[1]) {
            if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : l, !0)), v.test(c[1]) && n.isPlainObject(b))
              for (c in b)
                n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
            return this;
          }
          return d = l.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = l, this.selector = a, this;
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof y.ready ? y.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this));
      };
  A.prototype = n.fn, y = n(l);
  var B = /^(?:parents|prev(?:Until|All))/,
      C = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
      };
  n.extend({
    dir: function(a, b, c) {
      var d = [],
          e = void 0 !== c;
      while ((a = a[b]) && 9 !== a.nodeType)
        if (1 === a.nodeType) {
          if (e && n(a).is(c))
            break;
          d.push(a);
        }
      return d;
    },
    sibling: function(a, b) {
      for (var c = []; a; a = a.nextSibling)
        1 === a.nodeType && a !== b && c.push(a);
      return c;
    }
  }), n.fn.extend({
    has: function(a) {
      var b = n(a, this),
          c = b.length;
      return this.filter(function() {
        for (var a = 0; c > a; a++)
          if (n.contains(this, b[a]))
            return !0;
      });
    },
    closest: function(a, b) {
      for (var c,
          d = 0,
          e = this.length,
          f = [],
          g = u.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++)
        for (c = this[d]; c && c !== b; c = c.parentNode)
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
            f.push(c);
            break;
          }
      return this.pushStack(f.length > 1 ? n.unique(f) : f);
    },
    index: function(a) {
      return a ? "string" == typeof a ? g.call(n(a), this[0]) : g.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function(a, b) {
      return this.pushStack(n.unique(n.merge(this.get(), n(a, b))));
    },
    addBack: function(a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    }
  });
  function D(a, b) {
    while ((a = a[b]) && 1 !== a.nodeType)
      ;
    return a;
  }
  n.each({
    parent: function(a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null;
    },
    parents: function(a) {
      return n.dir(a, "parentNode");
    },
    parentsUntil: function(a, b, c) {
      return n.dir(a, "parentNode", c);
    },
    next: function(a) {
      return D(a, "nextSibling");
    },
    prev: function(a) {
      return D(a, "previousSibling");
    },
    nextAll: function(a) {
      return n.dir(a, "nextSibling");
    },
    prevAll: function(a) {
      return n.dir(a, "previousSibling");
    },
    nextUntil: function(a, b, c) {
      return n.dir(a, "nextSibling", c);
    },
    prevUntil: function(a, b, c) {
      return n.dir(a, "previousSibling", c);
    },
    siblings: function(a) {
      return n.sibling((a.parentNode || {}).firstChild, a);
    },
    children: function(a) {
      return n.sibling(a.firstChild);
    },
    contents: function(a) {
      return a.contentDocument || n.merge([], a.childNodes);
    }
  }, function(a, b) {
    n.fn[a] = function(c, d) {
      var e = n.map(this, b, c);
      return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (C[a] || n.unique(e), B.test(a) && e.reverse()), this.pushStack(e);
    };
  });
  var E = /\S+/g,
      F = {};
  function G(a) {
    var b = F[a] = {};
    return n.each(a.match(E) || [], function(a, c) {
      b[c] = !0;
    }), b;
  }
  n.Callbacks = function(a) {
    a = "string" == typeof a ? F[a] || G(a) : n.extend({}, a);
    var b,
        c,
        d,
        e,
        f,
        g,
        h = [],
        i = !a.once && [],
        j = function(l) {
          for (b = a.memory && l, c = !0, g = e || 0, e = 0, f = h.length, d = !0; h && f > g; g++)
            if (h[g].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
              b = !1;
              break;
            }
          d = !1, h && (i ? i.length && j(i.shift()) : b ? h = [] : k.disable());
        },
        k = {
          add: function() {
            if (h) {
              var c = h.length;
              !function g(b) {
                n.each(b, function(b, c) {
                  var d = n.type(c);
                  "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && g(c);
                });
              }(arguments), d ? f = h.length : b && (e = c, j(b));
            }
            return this;
          },
          remove: function() {
            return h && n.each(arguments, function(a, b) {
              var c;
              while ((c = n.inArray(b, h, c)) > -1)
                h.splice(c, 1), d && (f >= c && f--, g >= c && g--);
            }), this;
          },
          has: function(a) {
            return a ? n.inArray(a, h) > -1 : !(!h || !h.length);
          },
          empty: function() {
            return h = [], f = 0, this;
          },
          disable: function() {
            return h = i = b = void 0, this;
          },
          disabled: function() {
            return !h;
          },
          lock: function() {
            return i = void 0, b || k.disable(), this;
          },
          locked: function() {
            return !i;
          },
          fireWith: function(a, b) {
            return !h || c && !i || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? i.push(b) : j(b)), this;
          },
          fire: function() {
            return k.fireWith(this, arguments), this;
          },
          fired: function() {
            return !!c;
          }
        };
    return k;
  }, n.extend({
    Deferred: function(a) {
      var b = [["resolve", "done", n.Callbacks("once memory"), "resolved"], ["reject", "fail", n.Callbacks("once memory"), "rejected"], ["notify", "progress", n.Callbacks("memory")]],
          c = "pending",
          d = {
            state: function() {
              return c;
            },
            always: function() {
              return e.done(arguments).fail(arguments), this;
            },
            then: function() {
              var a = arguments;
              return n.Deferred(function(c) {
                n.each(b, function(b, f) {
                  var g = n.isFunction(a[b]) && a[b];
                  e[f[1]](function() {
                    var a = g && g.apply(this, arguments);
                    a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments);
                  });
                }), a = null;
              }).promise();
            },
            promise: function(a) {
              return null != a ? n.extend(a, d) : d;
            }
          },
          e = {};
      return d.pipe = d.then, n.each(b, function(a, f) {
        var g = f[2],
            h = f[3];
        d[f[1]] = g.add, h && g.add(function() {
          c = h;
        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
          return e[f[0] + "With"](this === e ? d : this, arguments), this;
        }, e[f[0] + "With"] = g.fireWith;
      }), d.promise(e), a && a.call(e, e), e;
    },
    when: function(a) {
      var b = 0,
          c = d.call(arguments),
          e = c.length,
          f = 1 !== e || a && n.isFunction(a.promise) ? e : 0,
          g = 1 === f ? a : n.Deferred(),
          h = function(a, b, c) {
            return function(e) {
              b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
            };
          },
          i,
          j,
          k;
      if (e > 1)
        for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++)
          c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
      return f || g.resolveWith(k, c), g.promise();
    }
  });
  var H;
  n.fn.ready = function(a) {
    return n.ready.promise().done(a), this;
  }, n.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function(a) {
      a ? n.readyWait++ : n.ready(!0);
    },
    ready: function(a) {
      (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (H.resolveWith(l, [n]), n.fn.triggerHandler && (n(l).triggerHandler("ready"), n(l).off("ready"))));
    }
  });
  function I() {
    l.removeEventListener("DOMContentLoaded", I, !1), a.removeEventListener("load", I, !1), n.ready();
  }
  n.ready.promise = function(b) {
    return H || (H = n.Deferred(), "complete" === l.readyState ? setTimeout(n.ready) : (l.addEventListener("DOMContentLoaded", I, !1), a.addEventListener("load", I, !1))), H.promise(b);
  }, n.ready.promise();
  var J = n.access = function(a, b, c, d, e, f, g) {
    var h = 0,
        i = a.length,
        j = null == c;
    if ("object" === n.type(c)) {
      e = !0;
      for (h in c)
        n.access(a, b, h, c[h], !0, f, g);
    } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
      return j.call(n(a), c);
    })), b))
      for (; i > h; h++)
        b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
    return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
  };
  n.acceptData = function(a) {
    return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
  };
  function K() {
    Object.defineProperty(this.cache = {}, 0, {get: function() {
        return {};
      }}), this.expando = n.expando + K.uid++;
  }
  K.uid = 1, K.accepts = n.acceptData, K.prototype = {
    key: function(a) {
      if (!K.accepts(a))
        return 0;
      var b = {},
          c = a[this.expando];
      if (!c) {
        c = K.uid++;
        try {
          b[this.expando] = {value: c}, Object.defineProperties(a, b);
        } catch (d) {
          b[this.expando] = c, n.extend(a, b);
        }
      }
      return this.cache[c] || (this.cache[c] = {}), c;
    },
    set: function(a, b, c) {
      var d,
          e = this.key(a),
          f = this.cache[e];
      if ("string" == typeof b)
        f[b] = c;
      else if (n.isEmptyObject(f))
        n.extend(this.cache[e], b);
      else
        for (d in b)
          f[d] = b[d];
      return f;
    },
    get: function(a, b) {
      var c = this.cache[this.key(a)];
      return void 0 === b ? c : c[b];
    },
    access: function(a, b, c) {
      var d;
      return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b);
    },
    remove: function(a, b) {
      var c,
          d,
          e,
          f = this.key(a),
          g = this.cache[f];
      if (void 0 === b)
        this.cache[f] = {};
      else {
        n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(E) || [])), c = d.length;
        while (c--)
          delete g[d[c]];
      }
    },
    hasData: function(a) {
      return !n.isEmptyObject(this.cache[a[this.expando]] || {});
    },
    discard: function(a) {
      a[this.expando] && delete this.cache[a[this.expando]];
    }
  };
  var L = new K,
      M = new K,
      N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      O = /([A-Z])/g;
  function P(a, b, c) {
    var d;
    if (void 0 === c && 1 === a.nodeType)
      if (d = "data-" + b.replace(O, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
        try {
          c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c;
        } catch (e) {}
        M.set(a, b, c);
      } else
        c = void 0;
    return c;
  }
  n.extend({
    hasData: function(a) {
      return M.hasData(a) || L.hasData(a);
    },
    data: function(a, b, c) {
      return M.access(a, b, c);
    },
    removeData: function(a, b) {
      M.remove(a, b);
    },
    _data: function(a, b, c) {
      return L.access(a, b, c);
    },
    _removeData: function(a, b) {
      L.remove(a, b);
    }
  }), n.fn.extend({
    data: function(a, b) {
      var c,
          d,
          e,
          f = this[0],
          g = f && f.attributes;
      if (void 0 === a) {
        if (this.length && (e = M.get(f), 1 === f.nodeType && !L.get(f, "hasDataAttrs"))) {
          c = g.length;
          while (c--)
            g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), P(f, d, e[d])));
          L.set(f, "hasDataAttrs", !0);
        }
        return e;
      }
      return "object" == typeof a ? this.each(function() {
        M.set(this, a);
      }) : J(this, function(b) {
        var c,
            d = n.camelCase(a);
        if (f && void 0 === b) {
          if (c = M.get(f, a), void 0 !== c)
            return c;
          if (c = M.get(f, d), void 0 !== c)
            return c;
          if (c = P(f, d, void 0), void 0 !== c)
            return c;
        } else
          this.each(function() {
            var c = M.get(this, d);
            M.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && M.set(this, a, b);
          });
      }, null, b, arguments.length > 1, null, !0);
    },
    removeData: function(a) {
      return this.each(function() {
        M.remove(this, a);
      });
    }
  }), n.extend({
    queue: function(a, b, c) {
      var d;
      return a ? (b = (b || "fx") + "queue", d = L.get(a, b), c && (!d || n.isArray(c) ? d = L.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0;
    },
    dequeue: function(a, b) {
      b = b || "fx";
      var c = n.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = n._queueHooks(a, b),
          g = function() {
            n.dequeue(a, b);
          };
      "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
    },
    _queueHooks: function(a, b) {
      var c = b + "queueHooks";
      return L.get(a, c) || L.access(a, c, {empty: n.Callbacks("once memory").add(function() {
          L.remove(a, [b + "queue", c]);
        })});
    }
  }), n.fn.extend({
    queue: function(a, b) {
      var c = 2;
      return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function() {
        var c = n.queue(this, a, b);
        n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a);
      });
    },
    dequeue: function(a) {
      return this.each(function() {
        n.dequeue(this, a);
      });
    },
    clearQueue: function(a) {
      return this.queue(a || "fx", []);
    },
    promise: function(a, b) {
      var c,
          d = 1,
          e = n.Deferred(),
          f = this,
          g = this.length,
          h = function() {
            --d || e.resolveWith(f, [f]);
          };
      "string" != typeof a && (b = a, a = void 0), a = a || "fx";
      while (g--)
        c = L.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
      return h(), e.promise(b);
    }
  });
  var Q = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      R = ["Top", "Right", "Bottom", "Left"],
      S = function(a, b) {
        return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a);
      },
      T = /^(?:checkbox|radio)$/i;
  !function() {
    var a = l.createDocumentFragment(),
        b = a.appendChild(l.createElement("div")),
        c = l.createElement("input");
    c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
  }();
  var U = "undefined";
  k.focusinBubbles = "onfocusin" in a;
  var V = /^key/,
      W = /^(?:mouse|pointer|contextmenu)|click/,
      X = /^(?:focusinfocus|focusoutblur)$/,
      Y = /^([^.]*)(?:\.(.+)|)$/;
  function Z() {
    return !0;
  }
  function $() {
    return !1;
  }
  function _() {
    try {
      return l.activeElement;
    } catch (a) {}
  }
  n.event = {
    global: {},
    add: function(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          o,
          p,
          q,
          r = L.get(a);
      if (r) {
        c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function(b) {
          return typeof n !== U && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0;
        }), b = (b || "").match(E) || [""], j = b.length;
        while (j--)
          h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({
            type: o,
            origType: q,
            data: d,
            handler: c,
            guid: c.guid,
            selector: e,
            needsContext: e && n.expr.match.needsContext.test(e),
            namespace: p.join(".")
          }, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0);
      }
    },
    remove: function(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          o,
          p,
          q,
          r = L.hasData(a) && L.get(a);
      if (r && (i = r.events)) {
        b = (b || "").match(E) || [""], j = b.length;
        while (j--)
          if (h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
            l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;
            while (f--)
              k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
            g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o]);
          } else
            for (o in i)
              n.event.remove(a, o + b[j], c, d, !0);
        n.isEmptyObject(i) && (delete r.handle, L.remove(a, "events"));
      }
    },
    trigger: function(b, c, d, e) {
      var f,
          g,
          h,
          i,
          k,
          m,
          o,
          p = [d || l],
          q = j.call(b, "type") ? b.type : b,
          r = j.call(b, "namespace") ? b.namespace.split(".") : [];
      if (g = h = d = d || l, 3 !== d.nodeType && 8 !== d.nodeType && !X.test(q + n.event.triggered) && (q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort()), k = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = r.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, e || !o.trigger || o.trigger.apply(d, c) !== !1)) {
        if (!e && !o.noBubble && !n.isWindow(d)) {
          for (i = o.delegateType || q, X.test(i + q) || (g = g.parentNode); g; g = g.parentNode)
            p.push(g), h = g;
          h === (d.ownerDocument || l) && p.push(h.defaultView || h.parentWindow || a);
        }
        f = 0;
        while ((g = p[f++]) && !b.isPropagationStopped())
          b.type = f > 1 ? i : o.bindType || q, m = (L.get(g, "events") || {})[b.type] && L.get(g, "handle"), m && m.apply(g, c), m = k && g[k], m && m.apply && n.acceptData(g) && (b.result = m.apply(g, c), b.result === !1 && b.preventDefault());
        return b.type = q, e || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !n.acceptData(d) || k && n.isFunction(d[q]) && !n.isWindow(d) && (h = d[k], h && (d[k] = null), n.event.triggered = q, d[q](), n.event.triggered = void 0, h && (d[k] = h)), b.result;
      }
    },
    dispatch: function(a) {
      a = n.event.fix(a);
      var b,
          c,
          e,
          f,
          g,
          h = [],
          i = d.call(arguments),
          j = (L.get(this, "events") || {})[a.type] || [],
          k = n.event.special[a.type] || {};
      if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
        h = n.event.handlers.call(this, a, j), b = 0;
        while ((f = h[b++]) && !a.isPropagationStopped()) {
          a.currentTarget = f.elem, c = 0;
          while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped())
            (!a.namespace_re || a.namespace_re.test(g.namespace)) && (a.handleObj = g, a.data = g.data, e = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (a.result = e) === !1 && (a.preventDefault(), a.stopPropagation()));
        }
        return k.postDispatch && k.postDispatch.call(this, a), a.result;
      }
    },
    handlers: function(a, b) {
      var c,
          d,
          e,
          f,
          g = [],
          h = b.delegateCount,
          i = a.target;
      if (h && i.nodeType && (!a.button || "click" !== a.type))
        for (; i !== this; i = i.parentNode || this)
          if (i.disabled !== !0 || "click" !== a.type) {
            for (d = [], c = 0; h > c; c++)
              f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) >= 0 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
            d.length && g.push({
              elem: i,
              handlers: d
            });
          }
      return h < b.length && g.push({
        elem: this,
        handlers: b.slice(h)
      }), g;
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a;
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(a, b) {
        var c,
            d,
            e,
            f = b.button;
        return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || l, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a;
      }
    },
    fix: function(a) {
      if (a[n.expando])
        return a;
      var b,
          c,
          d,
          e = a.type,
          f = a,
          g = this.fixHooks[e];
      g || (this.fixHooks[e] = g = W.test(e) ? this.mouseHooks : V.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new n.Event(f), b = d.length;
      while (b--)
        c = d[b], a[c] = f[c];
      return a.target || (a.target = l), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a;
    },
    special: {
      load: {noBubble: !0},
      focus: {
        trigger: function() {
          return this !== _() && this.focus ? (this.focus(), !1) : void 0;
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          return this === _() && this.blur ? (this.blur(), !1) : void 0;
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0;
        },
        _default: function(a) {
          return n.nodeName(a.target, "a");
        }
      },
      beforeunload: {postDispatch: function(a) {
          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
        }}
    },
    simulate: function(a, b, c, d) {
      var e = n.extend(new n.Event, c, {
        type: a,
        isSimulated: !0,
        originalEvent: {}
      });
      d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
    }
  }, n.removeEvent = function(a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1);
  }, n.Event = function(a, b) {
    return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? Z : $) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void(this[n.expando] = !0)) : new n.Event(a, b);
  }, n.Event.prototype = {
    isDefaultPrevented: $,
    isPropagationStopped: $,
    isImmediatePropagationStopped: $,
    preventDefault: function() {
      var a = this.originalEvent;
      this.isDefaultPrevented = Z, a && a.preventDefault && a.preventDefault();
    },
    stopPropagation: function() {
      var a = this.originalEvent;
      this.isPropagationStopped = Z, a && a.stopPropagation && a.stopPropagation();
    },
    stopImmediatePropagation: function() {
      var a = this.originalEvent;
      this.isImmediatePropagationStopped = Z, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation();
    }
  }, n.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(a, b) {
    n.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function(a) {
        var c,
            d = this,
            e = a.relatedTarget,
            f = a.handleObj;
        return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
      }
    };
  }), k.focusinBubbles || n.each({
    focus: "focusin",
    blur: "focusout"
  }, function(a, b) {
    var c = function(a) {
      n.event.simulate(b, a.target, n.event.fix(a), !0);
    };
    n.event.special[b] = {
      setup: function() {
        var d = this.ownerDocument || this,
            e = L.access(d, b);
        e || d.addEventListener(a, c, !0), L.access(d, b, (e || 0) + 1);
      },
      teardown: function() {
        var d = this.ownerDocument || this,
            e = L.access(d, b) - 1;
        e ? L.access(d, b, e) : (d.removeEventListener(a, c, !0), L.remove(d, b));
      }
    };
  }), n.fn.extend({
    on: function(a, b, c, d, e) {
      var f,
          g;
      if ("object" == typeof a) {
        "string" != typeof b && (c = c || b, b = void 0);
        for (g in a)
          this.on(g, b, c, a[g], e);
        return this;
      }
      if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)
        d = $;
      else if (!d)
        return this;
      return 1 === e && (f = d, d = function(a) {
        return n().off(a), f.apply(this, arguments);
      }, d.guid = f.guid || (f.guid = n.guid++)), this.each(function() {
        n.event.add(this, a, d, c, b);
      });
    },
    one: function(a, b, c, d) {
      return this.on(a, b, c, d, 1);
    },
    off: function(a, b, c) {
      var d,
          e;
      if (a && a.preventDefault && a.handleObj)
        return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
      if ("object" == typeof a) {
        for (e in a)
          this.off(e, b, a[e]);
        return this;
      }
      return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = $), this.each(function() {
        n.event.remove(this, a, c, b);
      });
    },
    trigger: function(a, b) {
      return this.each(function() {
        n.event.trigger(a, b, this);
      });
    },
    triggerHandler: function(a, b) {
      var c = this[0];
      return c ? n.event.trigger(a, b, c, !0) : void 0;
    }
  });
  var aa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      ba = /<([\w:]+)/,
      ca = /<|&#?\w+;/,
      da = /<(?:script|style|link)/i,
      ea = /checked\s*(?:[^=]|=\s*.checked.)/i,
      fa = /^$|\/(?:java|ecma)script/i,
      ga = /^true\/(.*)/,
      ha = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      ia = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
  ia.optgroup = ia.option, ia.tbody = ia.tfoot = ia.colgroup = ia.caption = ia.thead, ia.th = ia.td;
  function ja(a, b) {
    return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
  }
  function ka(a) {
    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
  }
  function la(a) {
    var b = ga.exec(a.type);
    return b ? a.type = b[1] : a.removeAttribute("type"), a;
  }
  function ma(a, b) {
    for (var c = 0,
        d = a.length; d > c; c++)
      L.set(a[c], "globalEval", !b || L.get(b[c], "globalEval"));
  }
  function na(a, b) {
    var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j;
    if (1 === b.nodeType) {
      if (L.hasData(a) && (f = L.access(a), g = L.set(b, f), j = f.events)) {
        delete g.handle, g.events = {};
        for (e in j)
          for (c = 0, d = j[e].length; d > c; c++)
            n.event.add(b, e, j[e][c]);
      }
      M.hasData(a) && (h = M.access(a), i = n.extend({}, h), M.set(b, i));
    }
  }
  function oa(a, b) {
    var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
    return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c;
  }
  function pa(a, b) {
    var c = b.nodeName.toLowerCase();
    "input" === c && T.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
  }
  n.extend({
    clone: function(a, b, c) {
      var d,
          e,
          f,
          g,
          h = a.cloneNode(!0),
          i = n.contains(a.ownerDocument, a);
      if (!(k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a)))
        for (g = oa(h), f = oa(a), d = 0, e = f.length; e > d; d++)
          pa(f[d], g[d]);
      if (b)
        if (c)
          for (f = f || oa(a), g = g || oa(h), d = 0, e = f.length; e > d; d++)
            na(f[d], g[d]);
        else
          na(a, h);
      return g = oa(h, "script"), g.length > 0 && ma(g, !i && oa(a, "script")), h;
    },
    buildFragment: function(a, b, c, d) {
      for (var e,
          f,
          g,
          h,
          i,
          j,
          k = b.createDocumentFragment(),
          l = [],
          m = 0,
          o = a.length; o > m; m++)
        if (e = a[m], e || 0 === e)
          if ("object" === n.type(e))
            n.merge(l, e.nodeType ? [e] : e);
          else if (ca.test(e)) {
            f = f || k.appendChild(b.createElement("div")), g = (ba.exec(e) || ["", ""])[1].toLowerCase(), h = ia[g] || ia._default, f.innerHTML = h[1] + e.replace(aa, "<$1></$2>") + h[2], j = h[0];
            while (j--)
              f = f.lastChild;
            n.merge(l, f.childNodes), f = k.firstChild, f.textContent = "";
          } else
            l.push(b.createTextNode(e));
      k.textContent = "", m = 0;
      while (e = l[m++])
        if ((!d || -1 === n.inArray(e, d)) && (i = n.contains(e.ownerDocument, e), f = oa(k.appendChild(e), "script"), i && ma(f), c)) {
          j = 0;
          while (e = f[j++])
            fa.test(e.type || "") && c.push(e);
        }
      return k;
    },
    cleanData: function(a) {
      for (var b,
          c,
          d,
          e,
          f = n.event.special,
          g = 0; void 0 !== (c = a[g]); g++) {
        if (n.acceptData(c) && (e = c[L.expando], e && (b = L.cache[e]))) {
          if (b.events)
            for (d in b.events)
              f[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);
          L.cache[e] && delete L.cache[e];
        }
        delete M.cache[c[M.expando]];
      }
    }
  }), n.fn.extend({
    text: function(a) {
      return J(this, function(a) {
        return void 0 === a ? n.text(this) : this.empty().each(function() {
          (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a);
        });
      }, null, a, arguments.length);
    },
    append: function() {
      return this.domManip(arguments, function(a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = ja(this, a);
          b.appendChild(a);
        }
      });
    },
    prepend: function() {
      return this.domManip(arguments, function(a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = ja(this, a);
          b.insertBefore(a, b.firstChild);
        }
      });
    },
    before: function() {
      return this.domManip(arguments, function(a) {
        this.parentNode && this.parentNode.insertBefore(a, this);
      });
    },
    after: function() {
      return this.domManip(arguments, function(a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
      });
    },
    remove: function(a, b) {
      for (var c,
          d = a ? n.filter(a, this) : this,
          e = 0; null != (c = d[e]); e++)
        b || 1 !== c.nodeType || n.cleanData(oa(c)), c.parentNode && (b && n.contains(c.ownerDocument, c) && ma(oa(c, "script")), c.parentNode.removeChild(c));
      return this;
    },
    empty: function() {
      for (var a,
          b = 0; null != (a = this[b]); b++)
        1 === a.nodeType && (n.cleanData(oa(a, !1)), a.textContent = "");
      return this;
    },
    clone: function(a, b) {
      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
        return n.clone(this, a, b);
      });
    },
    html: function(a) {
      return J(this, function(a) {
        var b = this[0] || {},
            c = 0,
            d = this.length;
        if (void 0 === a && 1 === b.nodeType)
          return b.innerHTML;
        if ("string" == typeof a && !da.test(a) && !ia[(ba.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = a.replace(aa, "<$1></$2>");
          try {
            for (; d > c; c++)
              b = this[c] || {}, 1 === b.nodeType && (n.cleanData(oa(b, !1)), b.innerHTML = a);
            b = 0;
          } catch (e) {}
        }
        b && this.empty().append(a);
      }, null, a, arguments.length);
    },
    replaceWith: function() {
      var a = arguments[0];
      return this.domManip(arguments, function(b) {
        a = this.parentNode, n.cleanData(oa(this)), a && a.replaceChild(b, this);
      }), a && (a.length || a.nodeType) ? this : this.remove();
    },
    detach: function(a) {
      return this.remove(a, !0);
    },
    domManip: function(a, b) {
      a = e.apply([], a);
      var c,
          d,
          f,
          g,
          h,
          i,
          j = 0,
          l = this.length,
          m = this,
          o = l - 1,
          p = a[0],
          q = n.isFunction(p);
      if (q || l > 1 && "string" == typeof p && !k.checkClone && ea.test(p))
        return this.each(function(c) {
          var d = m.eq(c);
          q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b);
        });
      if (l && (c = n.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
        for (f = n.map(oa(c, "script"), ka), g = f.length; l > j; j++)
          h = c, j !== o && (h = n.clone(h, !0, !0), g && n.merge(f, oa(h, "script"))), b.call(this[j], h, j);
        if (g)
          for (i = f[f.length - 1].ownerDocument, n.map(f, la), j = 0; g > j; j++)
            h = f[j], fa.test(h.type || "") && !L.access(h, "globalEval") && n.contains(i, h) && (h.src ? n._evalUrl && n._evalUrl(h.src) : n.globalEval(h.textContent.replace(ha, "")));
      }
      return this;
    }
  }), n.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(a, b) {
    n.fn[a] = function(a) {
      for (var c,
          d = [],
          e = n(a),
          g = e.length - 1,
          h = 0; g >= h; h++)
        c = h === g ? this : this.clone(!0), n(e[h])[b](c), f.apply(d, c.get());
      return this.pushStack(d);
    };
  });
  var qa,
      ra = {};
  function sa(b, c) {
    var d,
        e = n(c.createElement(b)).appendTo(c.body),
        f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : n.css(e[0], "display");
    return e.detach(), f;
  }
  function ta(a) {
    var b = l,
        c = ra[a];
    return c || (c = sa(a, b), "none" !== c && c || (qa = (qa || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = qa[0].contentDocument, b.write(), b.close(), c = sa(a, b), qa.detach()), ra[a] = c), c;
  }
  var ua = /^margin/,
      va = new RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"),
      wa = function(b) {
        return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null);
      };
  function xa(a, b, c) {
    var d,
        e,
        f,
        g,
        h = a.style;
    return c = c || wa(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), va.test(g) && ua.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g;
  }
  function ya(a, b) {
    return {get: function() {
        return a() ? void delete this.get : (this.get = b).apply(this, arguments);
      }};
  }
  !function() {
    var b,
        c,
        d = l.documentElement,
        e = l.createElement("div"),
        f = l.createElement("div");
    if (f.style) {
      f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === f.style.backgroundClip, e.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", e.appendChild(f);
      function g() {
        f.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f.innerHTML = "", d.appendChild(e);
        var g = a.getComputedStyle(f, null);
        b = "1%" !== g.top, c = "4px" === g.width, d.removeChild(e);
      }
      a.getComputedStyle && n.extend(k, {
        pixelPosition: function() {
          return g(), b;
        },
        boxSizingReliable: function() {
          return null == c && g(), c;
        },
        reliableMarginRight: function() {
          var b,
              c = f.appendChild(l.createElement("div"));
          return c.style.cssText = f.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", f.style.width = "1px", d.appendChild(e), b = !parseFloat(a.getComputedStyle(c, null).marginRight), d.removeChild(e), f.removeChild(c), b;
        }
      });
    }
  }(), n.swap = function(a, b, c, d) {
    var e,
        f,
        g = {};
    for (f in b)
      g[f] = a.style[f], a.style[f] = b[f];
    e = c.apply(a, d || []);
    for (f in b)
      a.style[f] = g[f];
    return e;
  };
  var za = /^(none|table(?!-c[ea]).+)/,
      Aa = new RegExp("^(" + Q + ")(.*)$", "i"),
      Ba = new RegExp("^([+-])=(" + Q + ")", "i"),
      Ca = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      Da = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      Ea = ["Webkit", "O", "Moz", "ms"];
  function Fa(a, b) {
    if (b in a)
      return b;
    var c = b[0].toUpperCase() + b.slice(1),
        d = b,
        e = Ea.length;
    while (e--)
      if (b = Ea[e] + c, b in a)
        return b;
    return d;
  }
  function Ga(a, b, c) {
    var d = Aa.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
  }
  function Ha(a, b, c, d, e) {
    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0,
        g = 0; 4 > f; f += 2)
      "margin" === c && (g += n.css(a, c + R[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + R[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + R[f] + "Width", !0, e))) : (g += n.css(a, "padding" + R[f], !0, e), "padding" !== c && (g += n.css(a, "border" + R[f] + "Width", !0, e)));
    return g;
  }
  function Ia(a, b, c) {
    var d = !0,
        e = "width" === b ? a.offsetWidth : a.offsetHeight,
        f = wa(a),
        g = "border-box" === n.css(a, "boxSizing", !1, f);
    if (0 >= e || null == e) {
      if (e = xa(a, b, f), (0 > e || null == e) && (e = a.style[b]), va.test(e))
        return e;
      d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
    }
    return e + Ha(a, b, c || (g ? "border" : "content"), d, f) + "px";
  }
  function Ja(a, b) {
    for (var c,
        d,
        e,
        f = [],
        g = 0,
        h = a.length; h > g; g++)
      d = a[g], d.style && (f[g] = L.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && S(d) && (f[g] = L.access(d, "olddisplay", ta(d.nodeName)))) : (e = S(d), "none" === c && e || L.set(d, "olddisplay", e ? c : n.css(d, "display"))));
    for (g = 0; h > g; g++)
      d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
    return a;
  }
  n.extend({
    cssHooks: {opacity: {get: function(a, b) {
          if (b) {
            var c = xa(a, "opacity");
            return "" === c ? "1" : c;
          }
        }}},
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {"float": "cssFloat"},
    style: function(a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e,
            f,
            g,
            h = n.camelCase(b),
            i = a.style;
        return b = n.cssProps[h] || (n.cssProps[h] = Fa(i, h)), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Ba.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || n.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0);
      }
    },
    css: function(a, b, c, d) {
      var e,
          f,
          g,
          h = n.camelCase(b);
      return b = n.cssProps[h] || (n.cssProps[h] = Fa(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = xa(a, b, d)), "normal" === e && b in Da && (e = Da[b]), "" === c || c ? (f = parseFloat(e), c === !0 || n.isNumeric(f) ? f || 0 : e) : e;
    }
  }), n.each(["height", "width"], function(a, b) {
    n.cssHooks[b] = {
      get: function(a, c, d) {
        return c ? za.test(n.css(a, "display")) && 0 === a.offsetWidth ? n.swap(a, Ca, function() {
          return Ia(a, b, d);
        }) : Ia(a, b, d) : void 0;
      },
      set: function(a, c, d) {
        var e = d && wa(a);
        return Ga(a, c, d ? Ha(a, b, d, "border-box" === n.css(a, "boxSizing", !1, e), e) : 0);
      }
    };
  }), n.cssHooks.marginRight = ya(k.reliableMarginRight, function(a, b) {
    return b ? n.swap(a, {display: "inline-block"}, xa, [a, "marginRight"]) : void 0;
  }), n.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(a, b) {
    n.cssHooks[a + b] = {expand: function(c) {
        for (var d = 0,
            e = {},
            f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)
          e[a + R[d] + b] = f[d] || f[d - 2] || f[0];
        return e;
      }}, ua.test(a) || (n.cssHooks[a + b].set = Ga);
  }), n.fn.extend({
    css: function(a, b) {
      return J(this, function(a, b, c) {
        var d,
            e,
            f = {},
            g = 0;
        if (n.isArray(b)) {
          for (d = wa(a), e = b.length; e > g; g++)
            f[b[g]] = n.css(a, b[g], !1, d);
          return f;
        }
        return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
      }, a, b, arguments.length > 1);
    },
    show: function() {
      return Ja(this, !0);
    },
    hide: function() {
      return Ja(this);
    },
    toggle: function(a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
        S(this) ? n(this).show() : n(this).hide();
      });
    }
  });
  function Ka(a, b, c, d, e) {
    return new Ka.prototype.init(a, b, c, d, e);
  }
  n.Tween = Ka, Ka.prototype = {
    constructor: Ka,
    init: function(a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px");
    },
    cur: function() {
      var a = Ka.propHooks[this.prop];
      return a && a.get ? a.get(this) : Ka.propHooks._default.get(this);
    },
    run: function(a) {
      var b,
          c = Ka.propHooks[this.prop];
      return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Ka.propHooks._default.set(this), this;
    }
  }, Ka.prototype.init.prototype = Ka.prototype, Ka.propHooks = {_default: {
      get: function(a) {
        var b;
        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop];
      },
      set: function(a) {
        n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
      }
    }}, Ka.propHooks.scrollTop = Ka.propHooks.scrollLeft = {set: function(a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
    }}, n.easing = {
    linear: function(a) {
      return a;
    },
    swing: function(a) {
      return .5 - Math.cos(a * Math.PI) / 2;
    }
  }, n.fx = Ka.prototype.init, n.fx.step = {};
  var La,
      Ma,
      Na = /^(?:toggle|show|hide)$/,
      Oa = new RegExp("^(?:([+-])=|)(" + Q + ")([a-z%]*)$", "i"),
      Pa = /queueHooks$/,
      Qa = [Va],
      Ra = {"*": [function(a, b) {
          var c = this.createTween(a, b),
              d = c.cur(),
              e = Oa.exec(b),
              f = e && e[3] || (n.cssNumber[a] ? "" : "px"),
              g = (n.cssNumber[a] || "px" !== f && +d) && Oa.exec(n.css(c.elem, a)),
              h = 1,
              i = 20;
          if (g && g[3] !== f) {
            f = f || g[3], e = e || [], g = +d || 1;
            do
              h = h || ".5", g /= h, n.style(c.elem, a, g + f);
 while (h !== (h = c.cur() / d) && 1 !== h && --i);
          }
          return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c;
        }]};
  function Sa() {
    return setTimeout(function() {
      La = void 0;
    }), La = n.now();
  }
  function Ta(a, b) {
    var c,
        d = 0,
        e = {height: a};
    for (b = b ? 1 : 0; 4 > d; d += 2 - b)
      c = R[d], e["margin" + c] = e["padding" + c] = a;
    return b && (e.opacity = e.width = a), e;
  }
  function Ua(a, b, c) {
    for (var d,
        e = (Ra[b] || []).concat(Ra["*"]),
        f = 0,
        g = e.length; g > f; f++)
      if (d = e[f].call(c, b, a))
        return d;
  }
  function Va(a, b, c) {
    var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = this,
        m = {},
        o = a.style,
        p = a.nodeType && S(a),
        q = L.get(a, "fxshow");
    c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
      h.unqueued || i();
    }), h.unqueued++, l.always(function() {
      l.always(function() {
        h.unqueued--, n.queue(a, "fx").length || h.empty.fire();
      });
    })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, "display"), k = "none" === j ? L.get(a, "olddisplay") || ta(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (o.display = "inline-block")), c.overflow && (o.overflow = "hidden", l.always(function() {
      o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2];
    }));
    for (d in b)
      if (e = b[d], Na.exec(e)) {
        if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
          if ("show" !== e || !q || void 0 === q[d])
            continue;
          p = !0;
        }
        m[d] = q && q[d] || n.style(a, d);
      } else
        j = void 0;
    if (n.isEmptyObject(m))
      "inline" === ("none" === j ? ta(a.nodeName) : j) && (o.display = j);
    else {
      q ? "hidden" in q && (p = q.hidden) : q = L.access(a, "fxshow", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function() {
        n(a).hide();
      }), l.done(function() {
        var b;
        L.remove(a, "fxshow");
        for (b in m)
          n.style(a, b, m[b]);
      });
      for (d in m)
        g = Ua(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0));
    }
  }
  function Wa(a, b) {
    var c,
        d,
        e,
        f,
        g;
    for (c in a)
      if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
        f = g.expand(f), delete a[d];
        for (c in f)
          c in a || (a[c] = f[c], b[c] = e);
      } else
        b[d] = e;
  }
  function Xa(a, b, c) {
    var d,
        e,
        f = 0,
        g = Qa.length,
        h = n.Deferred().always(function() {
          delete i.elem;
        }),
        i = function() {
          if (e)
            return !1;
          for (var b = La || Sa(),
              c = Math.max(0, j.startTime + j.duration - b),
              d = c / j.duration || 0,
              f = 1 - d,
              g = 0,
              i = j.tweens.length; i > g; g++)
            j.tweens[g].run(f);
          return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1);
        },
        j = h.promise({
          elem: a,
          props: n.extend({}, b),
          opts: n.extend(!0, {specialEasing: {}}, c),
          originalProperties: b,
          originalOptions: c,
          startTime: La || Sa(),
          duration: c.duration,
          tweens: [],
          createTween: function(b, c) {
            var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
            return j.tweens.push(d), d;
          },
          stop: function(b) {
            var c = 0,
                d = b ? j.tweens.length : 0;
            if (e)
              return this;
            for (e = !0; d > c; c++)
              j.tweens[c].run(1);
            return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this;
          }
        }),
        k = j.props;
    for (Wa(k, j.opts.specialEasing); g > f; f++)
      if (d = Qa[f].call(j, a, k, j.opts))
        return d;
    return n.map(k, Ua, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
      elem: a,
      anim: j,
      queue: j.opts.queue
    })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
  }
  n.Animation = n.extend(Xa, {
    tweener: function(a, b) {
      n.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
      for (var c,
          d = 0,
          e = a.length; e > d; d++)
        c = a[d], Ra[c] = Ra[c] || [], Ra[c].unshift(b);
    },
    prefilter: function(a, b) {
      b ? Qa.unshift(a) : Qa.push(a);
    }
  }), n.speed = function(a, b, c) {
    var d = a && "object" == typeof a ? n.extend({}, a) : {
      complete: c || !c && b || n.isFunction(a) && a,
      duration: a,
      easing: c && b || b && !n.isFunction(b) && b
    };
    return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
      n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue);
    }, d;
  }, n.fn.extend({
    fadeTo: function(a, b, c, d) {
      return this.filter(S).css("opacity", 0).show().end().animate({opacity: b}, a, c, d);
    },
    animate: function(a, b, c, d) {
      var e = n.isEmptyObject(a),
          f = n.speed(b, c, d),
          g = function() {
            var b = Xa(this, n.extend({}, a), f);
            (e || L.get(this, "finish")) && b.stop(!0);
          };
      return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
    },
    stop: function(a, b, c) {
      var d = function(a) {
        var b = a.stop;
        delete a.stop, b(c);
      };
      return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
        var b = !0,
            e = null != a && a + "queueHooks",
            f = n.timers,
            g = L.get(this);
        if (e)
          g[e] && g[e].stop && d(g[e]);
        else
          for (e in g)
            g[e] && g[e].stop && Pa.test(e) && d(g[e]);
        for (e = f.length; e--; )
          f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
        (b || !c) && n.dequeue(this, a);
      });
    },
    finish: function(a) {
      return a !== !1 && (a = a || "fx"), this.each(function() {
        var b,
            c = L.get(this),
            d = c[a + "queue"],
            e = c[a + "queueHooks"],
            f = n.timers,
            g = d ? d.length : 0;
        for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--; )
          f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
        for (b = 0; g > b; b++)
          d[b] && d[b].finish && d[b].finish.call(this);
        delete c.finish;
      });
    }
  }), n.each(["toggle", "show", "hide"], function(a, b) {
    var c = n.fn[b];
    n.fn[b] = function(a, d, e) {
      return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Ta(b, !0), a, d, e);
    };
  }), n.each({
    slideDown: Ta("show"),
    slideUp: Ta("hide"),
    slideToggle: Ta("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function(a, b) {
    n.fn[a] = function(a, c, d) {
      return this.animate(b, a, c, d);
    };
  }), n.timers = [], n.fx.tick = function() {
    var a,
        b = 0,
        c = n.timers;
    for (La = n.now(); b < c.length; b++)
      a = c[b], a() || c[b] !== a || c.splice(b--, 1);
    c.length || n.fx.stop(), La = void 0;
  }, n.fx.timer = function(a) {
    n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
  }, n.fx.interval = 13, n.fx.start = function() {
    Ma || (Ma = setInterval(n.fx.tick, n.fx.interval));
  }, n.fx.stop = function() {
    clearInterval(Ma), Ma = null;
  }, n.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, n.fn.delay = function(a, b) {
    return a = n.fx ? n.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
      var d = setTimeout(b, a);
      c.stop = function() {
        clearTimeout(d);
      };
    });
  }, function() {
    var a = l.createElement("input"),
        b = l.createElement("select"),
        c = b.appendChild(l.createElement("option"));
    a.type = "checkbox", k.checkOn = "" !== a.value, k.optSelected = c.selected, b.disabled = !0, k.optDisabled = !c.disabled, a = l.createElement("input"), a.value = "t", a.type = "radio", k.radioValue = "t" === a.value;
  }();
  var Ya,
      Za,
      $a = n.expr.attrHandle;
  n.fn.extend({
    attr: function(a, b) {
      return J(this, n.attr, a, b, arguments.length > 1);
    },
    removeAttr: function(a) {
      return this.each(function() {
        n.removeAttr(this, a);
      });
    }
  }), n.extend({
    attr: function(a, b, c) {
      var d,
          e,
          f = a.nodeType;
      if (a && 3 !== f && 8 !== f && 2 !== f)
        return typeof a.getAttribute === U ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? Za : Ya)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = n.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void n.removeAttr(a, b));
    },
    removeAttr: function(a, b) {
      var c,
          d,
          e = 0,
          f = b && b.match(E);
      if (f && 1 === a.nodeType)
        while (c = f[e++])
          d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c);
    },
    attrHooks: {type: {set: function(a, b) {
          if (!k.radioValue && "radio" === b && n.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b;
          }
        }}}
  }), Za = {set: function(a, b, c) {
      return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c;
    }}, n.each(n.expr.match.bool.source.match(/\w+/g), function(a, b) {
    var c = $a[b] || n.find.attr;
    $a[b] = function(a, b, d) {
      var e,
          f;
      return d || (f = $a[b], $a[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, $a[b] = f), e;
    };
  });
  var _a = /^(?:input|select|textarea|button)$/i;
  n.fn.extend({
    prop: function(a, b) {
      return J(this, n.prop, a, b, arguments.length > 1);
    },
    removeProp: function(a) {
      return this.each(function() {
        delete this[n.propFix[a] || a];
      });
    }
  }), n.extend({
    propFix: {
      "for": "htmlFor",
      "class": "className"
    },
    prop: function(a, b, c) {
      var d,
          e,
          f,
          g = a.nodeType;
      if (a && 3 !== g && 8 !== g && 2 !== g)
        return f = 1 !== g || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
    },
    propHooks: {tabIndex: {get: function(a) {
          return a.hasAttribute("tabindex") || _a.test(a.nodeName) || a.href ? a.tabIndex : -1;
        }}}
  }), k.optSelected || (n.propHooks.selected = {get: function(a) {
      var b = a.parentNode;
      return b && b.parentNode && b.parentNode.selectedIndex, null;
    }}), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    n.propFix[this.toLowerCase()] = this;
  });
  var ab = /[\t\r\n\f]/g;
  n.fn.extend({
    addClass: function(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h = "string" == typeof a && a,
          i = 0,
          j = this.length;
      if (n.isFunction(a))
        return this.each(function(b) {
          n(this).addClass(a.call(this, b, this.className));
        });
      if (h)
        for (b = (a || "").match(E) || []; j > i; i++)
          if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ab, " ") : " ")) {
            f = 0;
            while (e = b[f++])
              d.indexOf(" " + e + " ") < 0 && (d += e + " ");
            g = n.trim(d), c.className !== g && (c.className = g);
          }
      return this;
    },
    removeClass: function(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h = 0 === arguments.length || "string" == typeof a && a,
          i = 0,
          j = this.length;
      if (n.isFunction(a))
        return this.each(function(b) {
          n(this).removeClass(a.call(this, b, this.className));
        });
      if (h)
        for (b = (a || "").match(E) || []; j > i; i++)
          if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ab, " ") : "")) {
            f = 0;
            while (e = b[f++])
              while (d.indexOf(" " + e + " ") >= 0)
                d = d.replace(" " + e + " ", " ");
            g = a ? n.trim(d) : "", c.className !== g && (c.className = g);
          }
      return this;
    },
    toggleClass: function(a, b) {
      var c = typeof a;
      return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(n.isFunction(a) ? function(c) {
        n(this).toggleClass(a.call(this, c, this.className, b), b);
      } : function() {
        if ("string" === c) {
          var b,
              d = 0,
              e = n(this),
              f = a.match(E) || [];
          while (b = f[d++])
            e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
        } else
          (c === U || "boolean" === c) && (this.className && L.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : L.get(this, "__className__") || "");
      });
    },
    hasClass: function(a) {
      for (var b = " " + a + " ",
          c = 0,
          d = this.length; d > c; c++)
        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ab, " ").indexOf(b) >= 0)
          return !0;
      return !1;
    }
  });
  var bb = /\r/g;
  n.fn.extend({val: function(a) {
      var b,
          c,
          d,
          e = this[0];
      {
        if (arguments.length)
          return d = n.isFunction(a), this.each(function(c) {
            var e;
            1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function(a) {
              return null == a ? "" : a + "";
            })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
          });
        if (e)
          return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(bb, "") : null == c ? "" : c);
      }
    }}), n.extend({valHooks: {
      option: {get: function(a) {
          var b = n.find.attr(a, "value");
          return null != b ? b : n.trim(n.text(a));
        }},
      select: {
        get: function(a) {
          for (var b,
              c,
              d = a.options,
              e = a.selectedIndex,
              f = "select-one" === a.type || 0 > e,
              g = f ? null : [],
              h = f ? e + 1 : d.length,
              i = 0 > e ? h : f ? e : 0; h > i; i++)
            if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && n.nodeName(c.parentNode, "optgroup"))) {
              if (b = n(c).val(), f)
                return b;
              g.push(b);
            }
          return g;
        },
        set: function(a, b) {
          var c,
              d,
              e = a.options,
              f = n.makeArray(b),
              g = e.length;
          while (g--)
            d = e[g], (d.selected = n.inArray(d.value, f) >= 0) && (c = !0);
          return c || (a.selectedIndex = -1), f;
        }
      }
    }}), n.each(["radio", "checkbox"], function() {
    n.valHooks[this] = {set: function(a, b) {
        return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) >= 0 : void 0;
      }}, k.checkOn || (n.valHooks[this].get = function(a) {
      return null === a.getAttribute("value") ? "on" : a.value;
    });
  }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
    n.fn[b] = function(a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
    };
  }), n.fn.extend({
    hover: function(a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    },
    bind: function(a, b, c) {
      return this.on(a, null, b, c);
    },
    unbind: function(a, b) {
      return this.off(a, null, b);
    },
    delegate: function(a, b, c, d) {
      return this.on(b, a, c, d);
    },
    undelegate: function(a, b, c) {
      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
    }
  });
  var cb = n.now(),
      db = /\?/;
  n.parseJSON = function(a) {
    return JSON.parse(a + "");
  }, n.parseXML = function(a) {
    var b,
        c;
    if (!a || "string" != typeof a)
      return null;
    try {
      c = new DOMParser, b = c.parseFromString(a, "text/xml");
    } catch (d) {
      b = void 0;
    }
    return (!b || b.getElementsByTagName("parsererror").length) && n.error("Invalid XML: " + a), b;
  };
  var eb = /#.*$/,
      fb = /([?&])_=[^&]*/,
      gb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      hb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      ib = /^(?:GET|HEAD)$/,
      jb = /^\/\//,
      kb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      lb = {},
      mb = {},
      nb = "*/".concat("*"),
      ob = a.location.href,
      pb = kb.exec(ob.toLowerCase()) || [];
  function qb(a) {
    return function(b, c) {
      "string" != typeof b && (c = b, b = "*");
      var d,
          e = 0,
          f = b.toLowerCase().match(E) || [];
      if (n.isFunction(c))
        while (d = f[e++])
          "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
    };
  }
  function rb(a, b, c, d) {
    var e = {},
        f = a === mb;
    function g(h) {
      var i;
      return e[h] = !0, n.each(a[h] || [], function(a, h) {
        var j = h(b, c, d);
        return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
      }), i;
    }
    return g(b.dataTypes[0]) || !e["*"] && g("*");
  }
  function sb(a, b) {
    var c,
        d,
        e = n.ajaxSettings.flatOptions || {};
    for (c in b)
      void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
    return d && n.extend(!0, a, d), a;
  }
  function tb(a, b, c) {
    var d,
        e,
        f,
        g,
        h = a.contents,
        i = a.dataTypes;
    while ("*" === i[0])
      i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
    if (d)
      for (e in h)
        if (h[e] && h[e].test(d)) {
          i.unshift(e);
          break;
        }
    if (i[0] in c)
      f = i[0];
    else {
      for (e in c) {
        if (!i[0] || a.converters[e + " " + i[0]]) {
          f = e;
          break;
        }
        g || (g = e);
      }
      f = f || g;
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
  }
  function ub(a, b, c, d) {
    var e,
        f,
        g,
        h,
        i,
        j = {},
        k = a.dataTypes.slice();
    if (k[1])
      for (g in a.converters)
        j[g.toLowerCase()] = a.converters[g];
    f = k.shift();
    while (f)
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
        if ("*" === f)
          f = i;
        else if ("*" !== i && i !== f) {
          if (g = j[i + " " + f] || j["* " + f], !g)
            for (e in j)
              if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break;
              }
          if (g !== !0)
            if (g && a["throws"])
              b = g(b);
            else
              try {
                b = g(b);
              } catch (l) {
                return {
                  state: "parsererror",
                  error: g ? l : "No conversion from " + i + " to " + f
                };
              }
        }
    return {
      state: "success",
      data: b
    };
  }
  n.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ob,
      type: "GET",
      isLocal: hb.test(pb[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": nb,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": n.parseJSON,
        "text xml": n.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function(a, b) {
      return b ? sb(sb(a, n.ajaxSettings), b) : sb(n.ajaxSettings, a);
    },
    ajaxPrefilter: qb(lb),
    ajaxTransport: qb(mb),
    ajax: function(a, b) {
      "object" == typeof a && (b = a, a = void 0), b = b || {};
      var c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = n.ajaxSetup({}, b),
          l = k.context || k,
          m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event,
          o = n.Deferred(),
          p = n.Callbacks("once memory"),
          q = k.statusCode || {},
          r = {},
          s = {},
          t = 0,
          u = "canceled",
          v = {
            readyState: 0,
            getResponseHeader: function(a) {
              var b;
              if (2 === t) {
                if (!f) {
                  f = {};
                  while (b = gb.exec(e))
                    f[b[1].toLowerCase()] = b[2];
                }
                b = f[a.toLowerCase()];
              }
              return null == b ? null : b;
            },
            getAllResponseHeaders: function() {
              return 2 === t ? e : null;
            },
            setRequestHeader: function(a, b) {
              var c = a.toLowerCase();
              return t || (a = s[c] = s[c] || a, r[a] = b), this;
            },
            overrideMimeType: function(a) {
              return t || (k.mimeType = a), this;
            },
            statusCode: function(a) {
              var b;
              if (a)
                if (2 > t)
                  for (b in a)
                    q[b] = [q[b], a[b]];
                else
                  v.always(a[v.status]);
              return this;
            },
            abort: function(a) {
              var b = a || u;
              return c && c.abort(b), x(0, b), this;
            }
          };
      if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || ob) + "").replace(eb, "").replace(jb, pb[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = n.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (h = kb.exec(k.url.toLowerCase()), k.crossDomain = !(!h || h[1] === pb[1] && h[2] === pb[2] && (h[3] || ("http:" === h[1] ? "80" : "443")) === (pb[3] || ("http:" === pb[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = n.param(k.data, k.traditional)), rb(lb, k, b, v), 2 === t)
        return v;
      i = n.event && k.global, i && 0 === n.active++ && n.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !ib.test(k.type), d = k.url, k.hasContent || (k.data && (d = k.url += (db.test(d) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = fb.test(d) ? d.replace(fb, "$1_=" + cb++) : d + (db.test(d) ? "&" : "?") + "_=" + cb++)), k.ifModified && (n.lastModified[d] && v.setRequestHeader("If-Modified-Since", n.lastModified[d]), n.etag[d] && v.setRequestHeader("If-None-Match", n.etag[d])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + nb + "; q=0.01" : "") : k.accepts["*"]);
      for (j in k.headers)
        v.setRequestHeader(j, k.headers[j]);
      if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t))
        return v.abort();
      u = "abort";
      for (j in {
        success: 1,
        error: 1,
        complete: 1
      })
        v[j](k[j]);
      if (c = rb(mb, k, b, v)) {
        v.readyState = 1, i && m.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
          v.abort("timeout");
        }, k.timeout));
        try {
          t = 1, c.send(r, x);
        } catch (w) {
          if (!(2 > t))
            throw w;
          x(-1, w);
        }
      } else
        x(-1, "No Transport");
      function x(a, b, f, h) {
        var j,
            r,
            s,
            u,
            w,
            x = b;
        2 !== t && (t = 2, g && clearTimeout(g), c = void 0, e = h || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, f && (u = tb(k, v, f)), u = ub(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (n.lastModified[d] = w), w = v.getResponseHeader("etag"), w && (n.etag[d] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, i && m.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), i && (m.trigger("ajaxComplete", [v, k]), --n.active || n.event.trigger("ajaxStop")));
      }
      return v;
    },
    getJSON: function(a, b, c) {
      return n.get(a, b, c, "json");
    },
    getScript: function(a, b) {
      return n.get(a, void 0, b, "script");
    }
  }), n.each(["get", "post"], function(a, b) {
    n[b] = function(a, c, d, e) {
      return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax({
        url: a,
        type: b,
        dataType: e,
        data: c,
        success: d
      });
    };
  }), n._evalUrl = function(a) {
    return n.ajax({
      url: a,
      type: "GET",
      dataType: "script",
      async: !1,
      global: !1,
      "throws": !0
    });
  }, n.fn.extend({
    wrapAll: function(a) {
      var b;
      return n.isFunction(a) ? this.each(function(b) {
        n(this).wrapAll(a.call(this, b));
      }) : (this[0] && (b = n(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
        var a = this;
        while (a.firstElementChild)
          a = a.firstElementChild;
        return a;
      }).append(this)), this);
    },
    wrapInner: function(a) {
      return this.each(n.isFunction(a) ? function(b) {
        n(this).wrapInner(a.call(this, b));
      } : function() {
        var b = n(this),
            c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a);
      });
    },
    wrap: function(a) {
      var b = n.isFunction(a);
      return this.each(function(c) {
        n(this).wrapAll(b ? a.call(this, c) : a);
      });
    },
    unwrap: function() {
      return this.parent().each(function() {
        n.nodeName(this, "body") || n(this).replaceWith(this.childNodes);
      }).end();
    }
  }), n.expr.filters.hidden = function(a) {
    return a.offsetWidth <= 0 && a.offsetHeight <= 0;
  }, n.expr.filters.visible = function(a) {
    return !n.expr.filters.hidden(a);
  };
  var vb = /%20/g,
      wb = /\[\]$/,
      xb = /\r?\n/g,
      yb = /^(?:submit|button|image|reset|file)$/i,
      zb = /^(?:input|select|textarea|keygen)/i;
  function Ab(a, b, c, d) {
    var e;
    if (n.isArray(b))
      n.each(b, function(b, e) {
        c || wb.test(a) ? d(a, e) : Ab(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
      });
    else if (c || "object" !== n.type(b))
      d(a, b);
    else
      for (e in b)
        Ab(a + "[" + e + "]", b[e], c, d);
  }
  n.param = function(a, b) {
    var c,
        d = [],
        e = function(a, b) {
          b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
        };
    if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a))
      n.each(a, function() {
        e(this.name, this.value);
      });
    else
      for (c in a)
        Ab(c, a[c], b, e);
    return d.join("&").replace(vb, "+");
  }, n.fn.extend({
    serialize: function() {
      return n.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var a = n.prop(this, "elements");
        return a ? n.makeArray(a) : this;
      }).filter(function() {
        var a = this.type;
        return this.name && !n(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(a) && (this.checked || !T.test(a));
      }).map(function(a, b) {
        var c = n(this).val();
        return null == c ? null : n.isArray(c) ? n.map(c, function(a) {
          return {
            name: b.name,
            value: a.replace(xb, "\r\n")
          };
        }) : {
          name: b.name,
          value: c.replace(xb, "\r\n")
        };
      }).get();
    }
  }), n.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest;
    } catch (a) {}
  };
  var Bb = 0,
      Cb = {},
      Db = {
        0: 200,
        1223: 204
      },
      Eb = n.ajaxSettings.xhr();
  a.attachEvent && a.attachEvent("onunload", function() {
    for (var a in Cb)
      Cb[a]();
  }), k.cors = !!Eb && "withCredentials" in Eb, k.ajax = Eb = !!Eb, n.ajaxTransport(function(a) {
    var b;
    return k.cors || Eb && !a.crossDomain ? {
      send: function(c, d) {
        var e,
            f = a.xhr(),
            g = ++Bb;
        if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
          for (e in a.xhrFields)
            f[e] = a.xhrFields[e];
        a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
        for (e in c)
          f.setRequestHeader(e, c[e]);
        b = function(a) {
          return function() {
            b && (delete Cb[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Db[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {text: f.responseText} : void 0, f.getAllResponseHeaders()));
          };
        }, f.onload = b(), f.onerror = b("error"), b = Cb[g] = b("abort");
        try {
          f.send(a.hasContent && a.data || null);
        } catch (h) {
          if (b)
            throw h;
        }
      },
      abort: function() {
        b && b();
      }
    } : void 0;
  }), n.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
    contents: {script: /(?:java|ecma)script/},
    converters: {"text script": function(a) {
        return n.globalEval(a), a;
      }}
  }), n.ajaxPrefilter("script", function(a) {
    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
  }), n.ajaxTransport("script", function(a) {
    if (a.crossDomain) {
      var b,
          c;
      return {
        send: function(d, e) {
          b = n("<script>").prop({
            async: !0,
            charset: a.scriptCharset,
            src: a.url
          }).on("load error", c = function(a) {
            b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type);
          }), l.head.appendChild(b[0]);
        },
        abort: function() {
          c && c();
        }
      };
    }
  });
  var Fb = [],
      Gb = /(=)\?(?=&|$)|\?\?/;
  n.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var a = Fb.pop() || n.expando + "_" + cb++;
      return this[a] = !0, a;
    }
  }), n.ajaxPrefilter("json jsonp", function(b, c, d) {
    var e,
        f,
        g,
        h = b.jsonp !== !1 && (Gb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Gb.test(b.data) && "data");
    return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Gb, "$1" + e) : b.jsonp !== !1 && (b.url += (db.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
      return g || n.error(e + " was not called"), g[0];
    }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
      g = arguments;
    }, d.always(function() {
      a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Fb.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0;
    }), "script") : void 0;
  }), n.parseHTML = function(a, b, c) {
    if (!a || "string" != typeof a)
      return null;
    "boolean" == typeof b && (c = b, b = !1), b = b || l;
    var d = v.exec(a),
        e = !c && [];
    return d ? [b.createElement(d[1])] : (d = n.buildFragment([a], b, e), e && e.length && n(e).remove(), n.merge([], d.childNodes));
  };
  var Hb = n.fn.load;
  n.fn.load = function(a, b, c) {
    if ("string" != typeof a && Hb)
      return Hb.apply(this, arguments);
    var d,
        e,
        f,
        g = this,
        h = a.indexOf(" ");
    return h >= 0 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({
      url: a,
      type: e,
      dataType: "html",
      data: b
    }).done(function(a) {
      f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a);
    }).complete(c && function(a, b) {
      g.each(c, f || [a.responseText, b, a]);
    }), this;
  }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
    n.fn[b] = function(a) {
      return this.on(b, a);
    };
  }), n.expr.filters.animated = function(a) {
    return n.grep(n.timers, function(b) {
      return a === b.elem;
    }).length;
  };
  var Ib = a.document.documentElement;
  function Jb(a) {
    return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;
  }
  n.offset = {setOffset: function(a, b, c) {
      var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = n.css(a, "position"),
          l = n(a),
          m = {};
      "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
    }}, n.fn.extend({
    offset: function(a) {
      if (arguments.length)
        return void 0 === a ? this : this.each(function(b) {
          n.offset.setOffset(this, a, b);
        });
      var b,
          c,
          d = this[0],
          e = {
            top: 0,
            left: 0
          },
          f = d && d.ownerDocument;
      if (f)
        return b = f.documentElement, n.contains(b, d) ? (typeof d.getBoundingClientRect !== U && (e = d.getBoundingClientRect()), c = Jb(f), {
          top: e.top + c.pageYOffset - b.clientTop,
          left: e.left + c.pageXOffset - b.clientLeft
        }) : e;
    },
    position: function() {
      if (this[0]) {
        var a,
            b,
            c = this[0],
            d = {
              top: 0,
              left: 0
            };
        return "fixed" === n.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (d = a.offset()), d.top += n.css(a[0], "borderTopWidth", !0), d.left += n.css(a[0], "borderLeftWidth", !0)), {
          top: b.top - d.top - n.css(c, "marginTop", !0),
          left: b.left - d.left - n.css(c, "marginLeft", !0)
        };
      }
    },
    offsetParent: function() {
      return this.map(function() {
        var a = this.offsetParent || Ib;
        while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position"))
          a = a.offsetParent;
        return a || Ib;
      });
    }
  }), n.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(b, c) {
    var d = "pageYOffset" === c;
    n.fn[b] = function(e) {
      return J(this, function(b, e, f) {
        var g = Jb(b);
        return void 0 === f ? g ? g[c] : b[e] : void(g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f);
      }, b, e, arguments.length, null);
    };
  }), n.each(["top", "left"], function(a, b) {
    n.cssHooks[b] = ya(k.pixelPosition, function(a, c) {
      return c ? (c = xa(a, b), va.test(c) ? n(a).position()[b] + "px" : c) : void 0;
    });
  }), n.each({
    Height: "height",
    Width: "width"
  }, function(a, b) {
    n.each({
      padding: "inner" + a,
      content: b,
      "": "outer" + a
    }, function(c, d) {
      n.fn[d] = function(d, e) {
        var f = arguments.length && (c || "boolean" != typeof d),
            g = c || (d === !0 || e === !0 ? "margin" : "border");
        return J(this, function(b, c, d) {
          var e;
          return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g);
        }, b, f ? d : void 0, f, null);
      };
    });
  }), n.fn.size = function() {
    return this.length;
  }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("a", [], function() {
    return n;
  });
  var Kb = a.jQuery,
      Lb = a.$;
  return n.noConflict = function(b) {
    return a.$ === n && (a.$ = Lb), b && a.jQuery === n && (a.jQuery = Kb), n;
  }, typeof b === U && (a.jQuery = a.$ = n), n;
});

_removeDefine();
})();
$__System.register('0', ['1', '2', '3', '4', '5', '6'], function (_export) {
    'use strict';

    var Ractive, User, Cryptography, Conversation, LoginView, MessagesView;
    return {
        setters: [function (_) {
            Ractive = _['default'];
        }, function (_2) {
            User = _2['default'];
        }, function (_3) {
            Cryptography = _3['default'];
        }, function (_4) {
            Conversation = _4['default'];
        }, function (_5) {
            LoginView = _5['default'];
        }, function (_6) {
            MessagesView = _6['default'];
        }],
        execute: function () {

            Ractive.DEBUG = false;

            window.user = new User();
            window.cryptography = new Cryptography();
            window.conversation = new Conversation();

            window.views = {};

            window.views['default'] = new Ractive({
                el: 'div.template',
                template: '#main',
                data: {
                    connected: window.conversation.connected()
                }
            });

            window.views.login = LoginView(function () {
                window.conversation.login();
                window.views.messages = MessagesView();
            });
        }
    };
});
$__System.register('2', [], function (_export) {
    'use strict';

    var _default;

    return {
        setters: [],
        execute: function () {
            _default = (function () {
                function _default() {
                    babelHelpers.classCallCheck(this, _default);

                    this._user = {
                        passphrase: window.location.href.split('#')[1] || false,
                        name: ''
                    };
                }

                babelHelpers.createClass(_default, [{
                    key: 'get',
                    value: function get() {
                        return this._user;
                    }
                }, {
                    key: 'set',
                    value: function set(user) {
                        this._user = user;
                        window.location.hash = this._user.passphrase;
                    }
                }]);
                return _default;
            })();

            _export('default', _default);
        }
    };
});
$__System.register('3', ['7'], function (_export) {
    'use strict';

    var SJCL, _default;

    return {
        setters: [function (_) {
            SJCL = _['default'];
        }],
        execute: function () {
            _default = (function () {
                function _default() {
                    babelHelpers.classCallCheck(this, _default);
                }

                babelHelpers.createClass(_default, [{
                    key: 'encrypt',

                    //
                    value: function encrypt(string) {
                        var user = window.user.get();
                        return sjcl.encrypt(user.passphrase, string);
                    }
                }, {
                    key: 'decrypt',
                    value: function decrypt(string) {
                        var user = window.user.get();
                        return sjcl.decrypt(user.passphrase, string);
                    }
                }]);
                return _default;
            })();

            _export('default', _default);
        }
    };
});
$__System.register('4', ['8'], function (_export) {
    'use strict';

    var SocketIO, _default;

    return {
        setters: [function (_) {
            SocketIO = _['default'];
        }],
        execute: function () {
            _default = (function () {
                function _default() {
                    var _this2 = this;

                    babelHelpers.classCallCheck(this, _default);

                    this._messages = [];
                    this._connection = SocketIO('https://chatting.im:2428');
                    this._connected = false;

                    var setConnection = function setConnection() {
                        _this2._connected = _this2._connection.connected;
                        window.views['default'].set('connected', _this2._connected);
                    };

                    this._connection.on('connect', setConnection);
                    this._connection.on('disconnect', setConnection);

                    this.watch();
                }

                babelHelpers.createClass(_default, [{
                    key: 'connected',
                    value: function connected() {
                        return this._connected;
                    }
                }, {
                    key: 'get',
                    value: function get() {
                        return {
                            users: [],
                            messages: this._messages
                        };
                    }
                }, {
                    key: 'watch',
                    value: function watch() {

                        var _this = this,
                            user = window.user.get();

                        this._connection.on('users', function (users) {
                            var decryptedUsers = [];
                            JSON.parse(users).forEach(function (user) {
                                try {
                                    decryptedUsers.push({
                                        name: window.cryptography.decrypt(user.name)
                                    });
                                } catch (e) {}
                            });
                            window.views.messages.set('conversation.users', decryptedUsers);
                        });

                        this._connection.on('message', function (message) {
                            try {
                                message = JSON.parse(message);
                                message.from = window.cryptography.decrypt(message.from);
                                message.text = window.cryptography.decrypt(message.text);
                                message.currentUser = message.from === user.name;
                                _this._messages.push(message);
                            } catch (e) {}
                        });
                    }
                }, {
                    key: 'login',
                    value: function login() {

                        var user = window.user.get();

                        this._connection.emit('login', {
                            name: window.cryptography.encrypt(user.name)
                        });
                    }
                }, {
                    key: 'send',
                    value: function send(message) {

                        this._connection.emit('message', {
                            text: window.cryptography.encrypt(message)
                        });
                    }
                }]);
                return _default;
            })();

            _export('default', _default);
        }
    };
});
$__System.register('5', ['1', '9'], function (_export) {
    'use strict';

    var Ractive, RandomString;
    return {
        setters: [function (_) {
            Ractive = _['default'];
        }, function (_2) {
            RandomString = _2['default'];
        }],
        execute: function () {
            _export('default', function () {
                var callback = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

                var loginView = new Ractive({
                    el: 'div.container',
                    template: '#login-main',
                    data: {
                        user: window.user.get()
                    }
                });

                loginView.on('submit', function (event) {
                    event.original.preventDefault();
                    if (!this.get('user.passphrase')) this.set('user.passphrase', RandomString({
                        length: 32
                    }));
                    window.user.set(this.get('user'));
                    this.teardown();
                    if (callback) callback();
                });

                return loginView;
            });

            ;
        }
    };
});
$__System.register('6', ['1', 'a'], function (_export) {
    'use strict';

    var Ractive, $;
    return {
        setters: [function (_) {
            Ractive = _['default'];
        }, function (_a) {
            $ = _a['default'];
        }],
        execute: function () {
            _export('default', function () {

                var messagesView = new Ractive({
                    el: 'div.container',
                    template: '#messages-main',
                    data: {
                        user: window.user.get(),
                        conversation: window.conversation.get()
                    }
                });

                messagesView.observe('conversation.messages', function () {
                    $('body').scrollTop($('body')[0].scrollHeight);
                }, {
                    defer: true
                });

                messagesView.on('submit', function (event) {
                    event.original.preventDefault();
                    if (this.get('newMessage') === '') return;
                    window.conversation.send(this.get('newMessage'));
                    this.set('newMessage', '');
                });

                return messagesView;
            });

            ;
        }
    };
});
})
(function(factory) {
  factory();
});