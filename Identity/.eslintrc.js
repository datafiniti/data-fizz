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
		"no-useless-constructor": 0,
		"no-trailing-spaces": 0,
		"no-class-assign": 0,
		"object-shorthand": 0,
		"arrow-body-style": 1,
		"class-methods-use-this": 0,
		"react/no-unused-prop-types": 0,
		"react/jsx-indent-props": 0,
		"react/forbid-prop-types": 0,
		"arrow-parens": 0,
		"import/prefer-default-export": 1,
		"react/require-default-props": 0,
		"react/prop-types": 0,
		"react/no-find-dom-node": 1,
		"react/jsx-boolean-value": 1,
		"no-underscore-dangle": 1,
		"no-confusing-arrow": 0,
		"global-require": 1,
		"react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
		"jsx-a11y/no-static-element-interactions": 0,
		"react/jsx-closing-bracket-location": 0,
		"react/jsx-no-bind": [2, {
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