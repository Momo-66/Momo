module.exports = {
	"env": {
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		// 들여쓰기에 대한 규칙: 2 space 로 사용
		// 규칙에 어긋나면 ERROR
		"indent": [
			"error",
			2
		],

		// 개행을 체크하는 옵션 off
		// Window: \r\n, Unix: \n
		"linebreak-style": "off",

		// 따옴표 규칙: "" 로 통일
		// 규칙에 어긋나면 ERROR
		"quotes": [
			"error",
			"double"
		],

		// 세미콜론: 항상 붙이기
		// 규칙에 어긋나면 ERROR
		"semi": [
			"error",
			"always"
		],

		"no-unused-vars": "off", // 미사용 변수 경고 처리 off 
		"react/prop-types": "off", // PropType 타입 검사 off (TypeScript 를 사용하지 않기 때문에 필요 없음)
		"no-undef": "off", // 선언하지 않은 변수의 사용을 금지 off
		"react/react-in-jsx-scope": "off", // 항상 React 를 import 해야 하는 옵션 off
		"prettier/prettier": 0, // prettier 사용하지 않음
	}
};
