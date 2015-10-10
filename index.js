(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Walkobj"] = factory();
	else
		root["Walkobj"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _walk = __webpack_require__(1);

	var _walk2 = _interopRequireDefault(_walk);

	exports['default'] = _walk2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _has = __webpack_require__(2);

	var _has2 = _interopRequireDefault(_has);

	var _constants = __webpack_require__(3);

	var _toType = __webpack_require__(4);

	var _toType2 = _interopRequireDefault(_toType);

	function getIdifObJectinCaChe(obj, cache) {
		var length = cache.length;

		var i = 0;
		while (i < length) {
			if (cache[i][1] == obj) {
				return i;
			}
			i++;
		}
		return false;
	}

	function addToCache(cache, path, obj) {
		cache.push([path, obj]);
	}

	function walkAny(obj, filter, path, root, cache, parent) {
		var cacheId = getIdifObJectinCaChe(obj, cache);
		var type = (0, _toType2['default'])(obj);
		if (cacheId !== false) {
			return filter(obj, type, path, parent, cache, cacheId, root);
		}
		addToCache(cache, path, obj);
		if (type == _constants.TYPE_ARRAY) {
			obj = walkArray(obj, filter, path, root, cache, parent);
		}
		if (type == _constants.TYPE_OBJECT) {
			obj = walkObject(obj, filter, path, root, cache, parent);
		}
		obj = filter(obj, type, path, parent, cache, cacheId, root);
		return obj;
	}

	function walkArray(arr, filter, path, root, cache, parent) {
		var length = arr.length;
		var i = 0;
		var newArr = new Array(length);
		while (i < length) {
			var _path = path.slice();
			_path.push(i);
			newArr[i] = walkAny(arr[i++], filter, _path, root, cache, arr);
		}
		return newArr;
	}

	function walkObject(obj, filter, path, root, cache) {
		var newObj = {};
		for (var _name in obj) {
			if (!(0, _has2['default'])(obj, _name)) {
				continue;
			}
			var _path = path.slice();
			_path.push(_name);
			newObj[_name] = walkAny(obj[_name], filter, _path, root, cache, obj);
		}
		return newObj;
	}

	function walk(obj, filter, cycle, cache) {
		var path = [];
		var root = obj;
		cache = cache || [];
		return walkAny(obj, filter, path, root, cache, root);
	}

	walk.has = _has2['default'];
	walk.toType = _toType2['default'];
	walk.TYPE_OBJECT = _constants.TYPE_OBJECT;
	walk.TYPE_ARRAY = _constants.TYPE_ARRAY;
	walk.TYPE_DATE = _constants.TYPE_DATE;
	walk.TYPE_REGEXP = _constants.TYPE_REGEXP;
	walk.TYPE_STRING = _constants.TYPE_STRING;
	walk.TYPE_NUMBER = _constants.TYPE_NUMBER;
	walk.TYPE_BOOL = _constants.TYPE_BOOL;
	walk.TYPE_NULL = _constants.TYPE_NULL;
	walk.TYPE_UNDEFINED = _constants.TYPE_UNDEFINED;

	exports['default'] = walk;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = has;

	function has(obj, propName) {
		return Object.prototype.hasOwnProperty.call(obj, propName);
	}

	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var TYPE_OBJECT = 'object';
	exports.TYPE_OBJECT = TYPE_OBJECT;
	var TYPE_ARRAY = 'array';
	exports.TYPE_ARRAY = TYPE_ARRAY;
	var TYPE_DATE = 'date';
	exports.TYPE_DATE = TYPE_DATE;
	var TYPE_REGEXP = 'regexp';
	exports.TYPE_REGEXP = TYPE_REGEXP;
	var TYPE_STRING = 'string';
	exports.TYPE_STRING = TYPE_STRING;
	var TYPE_NUMBER = 'number';
	exports.TYPE_NUMBER = TYPE_NUMBER;
	var TYPE_BOOL = 'boolean';
	exports.TYPE_BOOL = TYPE_BOOL;
	var TYPE_NULL = 'null';
	exports.TYPE_NULL = TYPE_NULL;
	var TYPE_UNDEFINED = 'undefined';
	exports.TYPE_UNDEFINED = TYPE_UNDEFINED;
	var TYPE_FUNCTION = 'function';
	exports.TYPE_FUNCTION = TYPE_FUNCTION;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = toType;

	function toType(obj) {
		return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	}

	module.exports = exports["default"];

/***/ }
/******/ ])
});
;