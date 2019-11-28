webpackHotUpdate("main",{

/***/ "./src/proxify.ts":
/*!************************!*\
  !*** ./src/proxify.ts ***!
  \************************/
/*! exports provided: proxify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proxify", function() { return proxify; });
/* harmony import */ var _eventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventEmitter */ "./src/eventEmitter.ts");

const allProxies = new WeakSet();
const allProxiesMap = new WeakMap();
const handler = {
    get: (target, prop) => {
        // nobody is listening
        if (_eventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"].listenersGet.length === 0) {
            return Reflect.get(target, prop);
        }
        const type = typeof target;
        if (type === "object" && target !== null) {
            const isArrayMethod = Array.isArray(target) && (typeof prop === "symbol" || isNaN(prop));
            if (isArrayMethod) {
                _eventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"].triggerGet(target);
                return Reflect.get(target, prop);
            }
            _eventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"].triggerGet(target, prop);
            return Reflect.get(target, prop);
        }
        if (type === "string" || type === "number" || type === "boolean") {
            return Reflect.get(target, prop);
        }
    },
    ownKeys: target => {
        if (_eventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"].listenersGet.length === 0) {
            return Reflect.ownKeys(target);
        }
        _eventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"].triggerGet(target);
        return Reflect.ownKeys(target);
    },
    set: (target, prop, value, receiver) => {
        if (typeof value === "object" && value !== null && !allProxies.has(value)) {
            value = proxify(value);
        }
        const previous = Array.isArray(target) ? target.slice() : Object.assign({}, target);
        Reflect.set(target, prop, value);
        const next = Array.isArray(target) ? target.slice() : Object.assign({}, target);
        _eventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"].triggerSet(target, prop, receiver, previous, next);
        return true;
    },
    deleteProperty(target, prop) {
        const previous = Array.isArray(target) ? target.slice() : Object.assign({}, target);
        Reflect.deleteProperty(target, prop);
        const next = Array.isArray(target) ? target.slice() : Object.assign({}, target);
        _eventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"].triggerSet(target, prop, allProxiesMap.get(target), previous, next);
        return true;
    }
};
const proxify = (state) => {
    Object.keys(state).forEach(key => {
        if (allProxies.has(state)) {
            return;
        }
        if (typeof state[key] === "object" && state[key] !== null) {
            state[key] = proxify(state[key]);
        }
    });
    if (allProxies.has(state)) {
        return state;
    }
    const wrapper = new Proxy(state, handler);
    allProxies.add(wrapper);
    allProxiesMap.set(state, wrapper);
    return wrapper;
};


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcHJveGlmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHFEQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixxREFBTztBQUN2QjtBQUNBO0FBQ0EsWUFBWSxxREFBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxxREFBTztBQUNuQjtBQUNBO0FBQ0EsUUFBUSxxREFBTztBQUNmO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0ZBQWtGO0FBQ2xGO0FBQ0EsOEVBQThFO0FBQzlFLFFBQVEscURBQU87QUFDZjtBQUNBLEtBQUs7QUFDTDtBQUNBLGtGQUFrRjtBQUNsRjtBQUNBLDhFQUE4RTtBQUM5RSxRQUFRLHFEQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IjE4Yzk5OTctbWFpbi13cHMtaG1yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vZXZlbnRFbWl0dGVyXCI7XG5jb25zdCBhbGxQcm94aWVzID0gbmV3IFdlYWtTZXQoKTtcbmNvbnN0IGFsbFByb3hpZXNNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgaGFuZGxlciA9IHtcbiAgICBnZXQ6ICh0YXJnZXQsIHByb3ApID0+IHtcbiAgICAgICAgLy8gbm9ib2R5IGlzIGxpc3RlbmluZ1xuICAgICAgICBpZiAoRW1pdHRlci5saXN0ZW5lcnNHZXQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHRhcmdldDtcbiAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIgJiYgdGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBpc0FycmF5TWV0aG9kID0gQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmICh0eXBlb2YgcHJvcCA9PT0gXCJzeW1ib2xcIiB8fCBpc05hTihwcm9wKSk7XG4gICAgICAgICAgICBpZiAoaXNBcnJheU1ldGhvZCkge1xuICAgICAgICAgICAgICAgIEVtaXR0ZXIudHJpZ2dlckdldCh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRW1pdHRlci50cmlnZ2VyR2V0KHRhcmdldCwgcHJvcCk7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcIm51bWJlclwiIHx8IHR5cGUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgb3duS2V5czogdGFyZ2V0ID0+IHtcbiAgICAgICAgaWYgKEVtaXR0ZXIubGlzdGVuZXJzR2V0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3Qub3duS2V5cyh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIEVtaXR0ZXIudHJpZ2dlckdldCh0YXJnZXQpO1xuICAgICAgICByZXR1cm4gUmVmbGVjdC5vd25LZXlzKHRhcmdldCk7XG4gICAgfSxcbiAgICBzZXQ6ICh0YXJnZXQsIHByb3AsIHZhbHVlLCByZWNlaXZlcikgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmICFhbGxQcm94aWVzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gcHJveGlmeSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJldmlvdXMgPSBBcnJheS5pc0FycmF5KHRhcmdldCkgPyB0YXJnZXQuc2xpY2UoKSA6IE9iamVjdC5hc3NpZ24oe30sIHRhcmdldCk7XG4gICAgICAgIFJlZmxlY3Quc2V0KHRhcmdldCwgcHJvcCwgdmFsdWUpO1xuICAgICAgICBjb25zdCBuZXh0ID0gQXJyYXkuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0LnNsaWNlKCkgOiBPYmplY3QuYXNzaWduKHt9LCB0YXJnZXQpO1xuICAgICAgICBFbWl0dGVyLnRyaWdnZXJTZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlciwgcHJldmlvdXMsIG5leHQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcCkge1xuICAgICAgICBjb25zdCBwcmV2aW91cyA9IEFycmF5LmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5zbGljZSgpIDogT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0KTtcbiAgICAgICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3ApO1xuICAgICAgICBjb25zdCBuZXh0ID0gQXJyYXkuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0LnNsaWNlKCkgOiBPYmplY3QuYXNzaWduKHt9LCB0YXJnZXQpO1xuICAgICAgICBFbWl0dGVyLnRyaWdnZXJTZXQodGFyZ2V0LCBwcm9wLCBhbGxQcm94aWVzTWFwLmdldCh0YXJnZXQpLCBwcmV2aW91cywgbmV4dCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgcHJveGlmeSA9IChzdGF0ZSkgPT4ge1xuICAgIE9iamVjdC5rZXlzKHN0YXRlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChhbGxQcm94aWVzLmhhcyhzdGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlW2tleV0gPT09IFwib2JqZWN0XCIgJiYgc3RhdGVba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhdGVba2V5XSA9IHByb3hpZnkoc3RhdGVba2V5XSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoYWxsUHJveGllcy5oYXMoc3RhdGUpKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgY29uc3Qgd3JhcHBlciA9IG5ldyBQcm94eShzdGF0ZSwgaGFuZGxlcik7XG4gICAgYWxsUHJveGllcy5hZGQod3JhcHBlcik7XG4gICAgYWxsUHJveGllc01hcC5zZXQoc3RhdGUsIHdyYXBwZXIpO1xuICAgIHJldHVybiB3cmFwcGVyO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=