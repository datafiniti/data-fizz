webpackHotUpdate(0,{

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(3);\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Nav = function Nav(_ref) {\n\tvar authenticated = _ref.authenticated;\n\n\tvar renderAuthed = function renderAuthed() {\n\t\treturn _react2.default.createElement(\n\t\t\t'nav',\n\t\t\t{ className: 'nav' },\n\t\t\t_react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'nav-right' },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'nav-item nav-user' },\n\t\t\t\t\t_react2.default.createElement('div', null),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'p',\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t'User Name'\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'nav-item nav-icon' },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'button',\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t'Icon'\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t};\n\n\tvar renderunAthed = function renderunAthed() {\n\t\treturn _react2.default.createElement(\n\t\t\t'nav',\n\t\t\t{ className: 'nav unauthed-nav' },\n\t\t\t_react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'nav-left' },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'p',\n\t\t\t\t\tnull,\n\t\t\t\t\t'Please Login to Continue'\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t};\n\n\tif (authenticated) {\n\t\treturn renderAuthed();\n\t} else {\n\t\treturn renderunAthed();\n\t}\n};\n\nNav.propTypes = {\n\tauthenticated: _react.PropTypes.bool.isRequired\n};\n\nexports.default = Nav;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTYwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL3NoYXJlZC9OYXYuanN4PzNlZTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcblxuXG5jb25zdCBOYXYgPSAoeyBhdXRoZW50aWNhdGVkIH0pID0+IHtcblx0Y29uc3QgcmVuZGVyQXV0aGVkID0gKCkgPT4ge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8bmF2IGNsYXNzTmFtZT0nbmF2Jz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J25hdi1yaWdodCc+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J25hdi1pdGVtIG5hdi11c2VyJz5cblx0XHRcdFx0XHRcdDxkaXYgLz5cblx0XHRcdFx0XHRcdDxwPlVzZXIgTmFtZTwvcD5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSduYXYtaXRlbSBuYXYtaWNvbic+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRJY29uXG5cdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L25hdj5cblx0XHQpO1xuXHR9O1xuXG5cdGNvbnN0IHJlbmRlcnVuQXRoZWQgPSAoKSA9PiB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxuYXYgY2xhc3NOYW1lPSduYXYgdW5hdXRoZWQtbmF2Jz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J25hdi1sZWZ0Jz5cblx0XHRcdFx0XHQ8cD5QbGVhc2UgTG9naW4gdG8gQ29udGludWU8L3A+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9uYXY+XG5cdFx0KTtcblx0fTtcblxuXHRpZiAoYXV0aGVudGljYXRlZCkge1xuXHRcdHJldHVybiByZW5kZXJBdXRoZWQoKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gcmVuZGVydW5BdGhlZCgpO1xuXHR9XG59O1xuXG5OYXYucHJvcFR5cGVzID0ge1xuXHRhdXRoZW50aWNhdGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhcHAvY29tcG9uZW50cy9zaGFyZWQvTmF2LmpzeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBTkE7QUFEQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQURBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ })

})