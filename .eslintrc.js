
module .exports = {
    root: true,
    env: { //指定代码运行的宿主环境。
        node: true,
        es6: true,
        browser: true
    },
    // 指定 eslint 规范
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended"
    ],
    rules: {
        // 强制使用一致的缩进 第二个参数为tab时，会使用tab
        'brace-style': [2, '1tbs', {
            'allowSingleLine': true
        }],
        //  数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号
        'comma-dangle': [2, 'never'],
        // 控制逗号前的空格
        'comma-spacing': [2, {
            before: false,
            after: true
        }],
        // 控制逗号在行尾出现还是在行首出现 (默认行尾)
        'comma-style': [2, 'last'],
        // 使用 === 替代 == allow-null允许null和undefined==
        "eqeqeq": [2, "allow-null"],
        // 强制在对象字面量的属性中键和值之间使用一致的间距
        'key-spacing': [2, {
            'beforeColon': false,
            'afterColon': true
        }],
        "no-unused-vars": 0,
        "no-console": 'off', // off => 0, warn => 1, error => 2
    },
    plugins: ['vue', 'import'],
    // 设置解析器选项。
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaVersion: 2018
    },
}
