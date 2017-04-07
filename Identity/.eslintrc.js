module.exports = {
	"extends": "eslint-config-airbnb",
	"parser": "babel-eslint",
	"env": {
		"browser": true,
		"node": true
	},

	"settings": {
		"import/resolver": {
			"webpack": {
				"config": "webpack.config.js"
			}
		}
	},

	"rules": {
		"func-names": 0,
		"eol-last": 0,
		"react/no-unused-prop-types": 0,
		"react/jsx-filenmae-extensions": [1, {"extensions": [".js", ".jsx"]}],
		"react-jsx-no-bind": [2, {
			"ignoreRefs": false,
			"allowArrowFunctions": true,
			"allowBind": true
		}],

		"jsx-quotes": 0,
		"react/jsx-indent": 0,
		"react/prefer-stateless-function": 0,
		"no-tabs": 0,
		"indent": 0		
	},

	"plugins": [
		"import",
		"react",
		"jsx-a11y"
	]
}