webpackHotUpdate("main",{

/***/ "./examples/app.tsx":
/*!**************************!*\
  !*** ./examples/app.tsx ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lape */ "./src/index.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state */ "./examples/state.ts");




const action1 = () => {
    _state__WEBPACK_IMPORTED_MODULE_3__["default"].array[0] = { amount: 52234 };
    _state__WEBPACK_IMPORTED_MODULE_3__["default"].deep.nest = !_state__WEBPACK_IMPORTED_MODULE_3__["default"].deep.nest;
};
const One = Object(_lape__WEBPACK_IMPORTED_MODULE_2__["connect"])(() => (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { margin: 20 }, onClick: action1 },
    console.log("1 deep"),
    _state__WEBPACK_IMPORTED_MODULE_3__["default"].array.map((data, i) => (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { key: i },
        data.amount,
        " "))),
    _state__WEBPACK_IMPORTED_MODULE_3__["default"].deep.nest.toString())));
const action2 = () => {
    _state__WEBPACK_IMPORTED_MODULE_3__["default"].count += 1;
};
const Two = Object(_lape__WEBPACK_IMPORTED_MODULE_2__["connect"])(() => (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { margin: 20 }, onClick: action2 },
    console.log("2 count"),
    _state__WEBPACK_IMPORTED_MODULE_3__["default"].count)));
const action3 = () => {
    _state__WEBPACK_IMPORTED_MODULE_3__["default"].array.push({ amount: 123 });
    _state__WEBPACK_IMPORTED_MODULE_3__["default"].array.unshift({ amount: 123 });
};
const Three = Object(_lape__WEBPACK_IMPORTED_MODULE_2__["connect"])(() => (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { margin: 20 }, onClick: action3 },
    console.log("3 ARRAY"),
    _state__WEBPACK_IMPORTED_MODULE_3__["default"].array.map((data, i) => (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { key: i }, data.amount))))));
class App extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](One, null),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Two, null),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Three, null)));
    }
}
const WrappedApp = Object(_lape__WEBPACK_IMPORTED_MODULE_2__["connect"])(App);
react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](WrappedApp, null), document.getElementById("editor"));


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9hcHAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNPO0FBQ047QUFDSjtBQUM1QjtBQUNBLElBQUksOENBQUssYUFBYTtBQUN0QixJQUFJLDhDQUFLLGNBQWMsOENBQUs7QUFDNUI7QUFDQSxZQUFZLHFEQUFPLFFBQVEsbURBQW1CLFNBQVMsU0FBUyxhQUFhLG9CQUFvQjtBQUNqRztBQUNBLElBQUksOENBQUsseUJBQXlCLG1EQUFtQixVQUFVLFNBQVM7QUFDeEU7QUFDQTtBQUNBLElBQUksOENBQUs7QUFDVDtBQUNBLElBQUksOENBQUs7QUFDVDtBQUNBLFlBQVkscURBQU8sUUFBUSxtREFBbUIsU0FBUyxTQUFTLGFBQWEsb0JBQW9CO0FBQ2pHO0FBQ0EsSUFBSSw4Q0FBSztBQUNUO0FBQ0EsSUFBSSw4Q0FBSyxhQUFhLGNBQWM7QUFDcEMsSUFBSSw4Q0FBSyxnQkFBZ0IsY0FBYztBQUN2QztBQUNBLGNBQWMscURBQU8sUUFBUSxtREFBbUIsU0FBUyxTQUFTLGFBQWEsb0JBQW9CO0FBQ25HO0FBQ0EsSUFBSSw4Q0FBSyx5QkFBeUIsbURBQW1CLFNBQVMsU0FBUztBQUN2RSxrQkFBa0IsK0NBQWU7QUFDakM7QUFDQSxnQkFBZ0IsbURBQW1CO0FBQ25DLFlBQVksbURBQW1CO0FBQy9CLFlBQVksbURBQW1CO0FBQy9CLFlBQVksbURBQW1CO0FBQy9CO0FBQ0E7QUFDQSxtQkFBbUIscURBQU87QUFDMUIsZ0RBQWUsQ0FBQyxtREFBbUIiLCJmaWxlIjoiMDcyZWY0Zi1tYWluLXdwcy1obXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0RG9tIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwiQGxhcGVcIjtcbmltcG9ydCBzdGF0ZSBmcm9tIFwiLi9zdGF0ZVwiO1xuY29uc3QgYWN0aW9uMSA9ICgpID0+IHtcbiAgICBzdGF0ZS5hcnJheVswXSA9IHsgYW1vdW50OiA1MjIzNCB9O1xuICAgIHN0YXRlLmRlZXAubmVzdCA9ICFzdGF0ZS5kZWVwLm5lc3Q7XG59O1xuY29uc3QgT25lID0gY29ubmVjdCgoKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IG1hcmdpbjogMjAgfSwgb25DbGljazogYWN0aW9uMSB9LFxuICAgIGNvbnNvbGUubG9nKFwiMSBkZWVwXCIpLFxuICAgIHN0YXRlLmFycmF5Lm1hcCgoZGF0YSwgaSkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsga2V5OiBpIH0sXG4gICAgICAgIGRhdGEuYW1vdW50LFxuICAgICAgICBcIiBcIikpKSxcbiAgICBzdGF0ZS5kZWVwLm5lc3QudG9TdHJpbmcoKSkpKTtcbmNvbnN0IGFjdGlvbjIgPSAoKSA9PiB7XG4gICAgc3RhdGUuY291bnQgKz0gMTtcbn07XG5jb25zdCBUd28gPSBjb25uZWN0KCgpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgbWFyZ2luOiAyMCB9LCBvbkNsaWNrOiBhY3Rpb24yIH0sXG4gICAgY29uc29sZS5sb2coXCIyIGNvdW50XCIpLFxuICAgIHN0YXRlLmNvdW50KSkpO1xuY29uc3QgYWN0aW9uMyA9ICgpID0+IHtcbiAgICBzdGF0ZS5hcnJheS5wdXNoKHsgYW1vdW50OiAxMjMgfSk7XG4gICAgc3RhdGUuYXJyYXkudW5zaGlmdCh7IGFtb3VudDogMTIzIH0pO1xufTtcbmNvbnN0IFRocmVlID0gY29ubmVjdCgoKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IG1hcmdpbjogMjAgfSwgb25DbGljazogYWN0aW9uMyB9LFxuICAgIGNvbnNvbGUubG9nKFwiMyBBUlJBWVwiKSxcbiAgICBzdGF0ZS5hcnJheS5tYXAoKGRhdGEsIGkpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsga2V5OiBpIH0sIGRhdGEuYW1vdW50KSkpKSkpO1xuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChPbmUsIG51bGwpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUd28sIG51bGwpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUaHJlZSwgbnVsbCkpKTtcbiAgICB9XG59XG5jb25zdCBXcmFwcGVkQXBwID0gY29ubmVjdChBcHApO1xuUmVhY3REb20ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoV3JhcHBlZEFwcCwgbnVsbCksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdG9yXCIpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=