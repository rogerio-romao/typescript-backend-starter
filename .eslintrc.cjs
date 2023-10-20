module.exports = {
    env: {
        es2024: true,
        node: true,
    },
    root: true,
    plugins: [
        'unicorn',
        'import',
        'eslint-comments',
        'sonarjs',
        'promise',
        '@typescript-eslint',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true,
        tsconfigRootDir: __dirname,
    },
    rules: {
        // Possible Errors
        'array-callback-return': [
            'error',
            { allowImplicit: true, checkForEach: true },
        ],
        'constructor-super': 'error',
        'for-direction': 'error',
        'getter-return': 'error',
        'no-async-promise-executor': 'error',
        'no-class-assign': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': ['error', 'except-parens'],
        'no-constant-binary-expression': 'error',
        'no-constant-condition': ['error', { checkLoops: false }],
        'no-constructor-return': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-else-if': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': ['error', { includeExports: true }],
        'no-empty-character-class': 'error',
        'no-empty-pattern': 'error',
        'no-ex-assign': 'error',
        'no-fallthrough': ['error', { allowEmptyCase: true }],
        'no-func-assign': 'error',
        'no-import-assign': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': ['error', { skipStrings: false }],
        'no-loss-of-precision': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-obj-calls': 'error',
        'no-promise-executor-return': 'error',
        'no-prototype-builtins': 'warn',
        'no-self-assign': ['error', { props: true }],
        'no-self-compare': 'error',
        'no-setter-return': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-this-before-super': 'error',
        'no-undef': ['error', { typeof: true }],
        'no-unexpected-multiline': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': ['error', { enforceForOrderingRelations: true }],
        'no-unsafe-optional-chaining': [
            'error',
            { disallowArithmeticOperators: true },
        ],
        'no-unused-private-class-members': 'error',
        'no-unused-vars': [
            'warn',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
        'no-use-before-define': 'error',
        'no-useless-backreference': 'error',
        'require-atomic-updates': 'error',
        'use-isnan': 'error',
        'valid-typeof': ['error', { requireStringLiterals: true }],
        // Best Practices
        'accessor-pairs': 'error',
        'arrow-body-style': [
            'error',
            'as-needed',
            { requireReturnForObjectLiteral: true },
        ],
        'block-scoped-var': 'error',
        camelcase: 'error',
        'class-methods-use-this': 'warn',
        complexity: ['warn', { max: 20 }],
        curly: ['warn', 'all'],
        'default-case': 'error',
        'default-case-last': 'error',
        'default-param-last': 'error',
        'dot-notation': 'error',
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'func-names': ['warn', 'as-needed'],
        'func-style': ['warn', 'declaration', { allowArrowFunctions: true }],
        'grouped-accessor-pairs': ['warn', 'getBeforeSet'],
        'guard-for-in': 'error',
        'logical-assignment-operators': [
            'warn',
            'always',
            { enforceForIfStatements: true },
        ],
        'max-depth': ['warn', { max: 4 }],
        'max-nested-callbacks': ['warn', { max: 4 }],
        'new-cap': 'error',
        'no-alert': 'warn',
        'no-array-constructor': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-console': 'warn',
        'no-delete-var': 'error',
        'no-div-regex': 'error',
        'no-else-return': 'error',
        'no-empty': ['error', { allowEmptyCatch: false }],
        'no-empty-function': ['error', { allow: ['methods', 'constructors'] }],
        'no-empty-static-block': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-boolean-cast': ['warn', { enforceForLogicalOperands: true }],
        'no-extra-label': 'error',
        'no-extra-semi': 'error',
        'no-global-assign': 'error',
        'no-implicit-coercion': [
            'warn',
            { boolean: false, number: true, string: true },
        ],
        'no-implicit-globals': ['error', { lexicalBindings: true }],
        'no-implied-eval': 'error',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-mixed-operators': [
            'error',
            {
                allowSamePrecedence: true,
            },
        ],
        'no-multi-assign': 'error',
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-nonoctal-decimal-escape': 'error',
        'no-object-constructor': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'warn',
        'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
        'no-proto': 'error',
        'no-redeclare': 'error',
        'no-regex-spaces': 'error',
        'no-return-assign': ['error', 'always'],
        'no-script-url': 'error',
        'no-sequences': ['error', { allowInParentheses: false }],
        'no-shadow-restricted-names': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': [
            'error',
            { enforceInClassFields: true, enforceInMethodNames: true },
        ],
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'no-unused-expressions': ['error', { enforceForJSX: true }],
        'no-unused-labels': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'warn',
        'no-useless-computed-key': ['error', { enforceForClassMembers: true }],
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-escape': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'warn',
        'no-var': 'error',
        'no-void': 'error',
        'no-warning-comments': [
            'warn',
            { terms: ['todo', 'fixme'], location: 'start' },
        ],
        'no-with': 'error',
        'object-shorthand': ['error', 'methods', { avoidQuotes: true }],
        'one-var': ['error', 'never'],
        'prefer-arrow-callback': ['error', { allowUnboundThis: false }],
        'prefer-const': [
            'error',
            { destructuring: 'all', ignoreReadBeforeAssign: true },
        ],
        'prefer-exponentiation-operator': 'error',
        'prefer-object-has-own': 'error',
        'prefer-object-spread': 'error',
        'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'require-await': 'error',
        'require-unicode-regexp': 'warn',
        'require-yield': 'error',
        'spaced-comment': 'warn',
        'symbol-description': 'error',
        yoda: 'error',
        // Unicorn rules
        'unicorn/better-regex': 'warn',
        'unicorn/catch-error-name': [
            'warn',
            { name: 'error', ignore: [/err/u] },
        ],
        'unicorn/consistent-destructuring': 'warn',
        'unicorn/consistent-function-scoping': 'error',
        'unicorn/custom-error-definition': 'error',
        'unicorn/empty-brace-spaces': 'warn',
        'unicorn/error-message': 'error',
        'unicorn/escape-case': 'warn',
        'unicorn/explicit-length-check': 'warn',
        'unicorn/filename-case': [
            'warn',
            { cases: { kebabCase: true, camelCase: true } },
        ],
        'unicorn/new-for-builtins': 'warn',
        'unicorn/no-abusive-eslint-disable': 'warn',
        'unicorn/no-array-callback-reference': 'warn',
        'unicorn/no-array-for-each': 'warn',
        'unicorn/no-array-method-this-argument': 'warn',
        'unicorn/no-await-expression-member': 'warn',
        'unicorn/no-console-spaces': 'error',
        'unicorn/no-document-cookie': 'error',
        'unicorn/no-empty-file': 'warn',
        'unicorn/no-for-loop': 'warn',
        'unicorn/no-hex-escape': 'warn',
        'unicorn/no-instanceof-array': 'error',
        'unicorn/no-invalid-remove-event-listener': 'error',
        'unicorn/no-lonely-if': 'warn',
        'unicorn/no-new-array': 'error',
        'unicorn/no-new-buffer': 'error',
        'unicorn/no-null': 'warn',
        'unicorn/no-object-as-default-parameter': 'warn',
        'unicorn/no-static-only-class': 'error',
        'unicorn/no-thenable': 'error',
        'unicorn/no-this-assignment': 'warn',
        'unicorn/no-typeof-undefined': 'error',
        'unicorn/no-unnecessary-await': 'error',
        'unicorn/no-unreadable-iife': 'error',
        'unicorn/no-unused-properties': 'warn',
        'unicorn/no-useless-fallback-in-spread': 'error',
        'unicorn/no-useless-length-check': 'warn',
        'unicorn/no-useless-promise-resolve-reject': 'error',
        'unicorn/no-useless-spread': 'error',
        'unicorn/no-useless-switch-case': 'warn',
        'unicorn/no-useless-undefined': 'warn',
        'unicorn/no-zero-fractions': 'warn',
        'unicorn/number-literal-case': 'error',
        'unicorn/numeric-separators-style': [
            'warn',
            { onlyIfContainsSeparator: true },
        ],
        'unicorn/prefer-add-event-listener': 'error',
        'unicorn/prefer-array-find': ['warn', { checkFromLast: true }],
        'unicorn/prefer-array-flat-map': 'warn',
        'unicorn/prefer-array-flat': 'warn',
        'unicorn/prefer-array-index-of': 'warn',
        'unicorn/prefer-array-some': 'warn',
        'unicorn/prefer-at': 'warn',
        'unicorn/prefer-blob-reading-methods': 'warn',
        'unicorn/prefer-code-point': 'error',
        'unicorn/prefer-date-now': 'error',
        'unicorn/prefer-default-parameters': 'error',
        'unicorn/prefer-dom-node-append': 'error',
        'unicorn/prefer-dom-node-dataset': 'warn',
        'unicorn/prefer-dom-node-remove': 'error',
        'unicorn/prefer-dom-node-text-content': 'warn',
        'unicorn/prefer-event-target': 'warn',
        'unicorn/prefer-export-from': 'warn',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-keyboard-event-key': 'error',
        'unicorn/prefer-logical-operator-over-ternary': 'warn',
        'unicorn/prefer-math-trunc': 'warn',
        'unicorn/prefer-modern-dom-apis': 'error',
        'unicorn/prefer-modern-math-apis': 'error',
        'unicorn/prefer-module': 'warn',
        'unicorn/prefer-native-coercion-functions': 'error',
        'unicorn/prefer-negative-index': 'warn',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-number-properties': 'error',
        'unicorn/prefer-object-from-entries': 'error',
        'unicorn/prefer-prototype-methods': 'error',
        'unicorn/prefer-query-selector': 'error',
        'unicorn/prefer-regexp-test': 'error',
        'unicorn/prefer-set-has': 'warn',
        'unicorn/prefer-set-size': 'error',
        'unicorn/prefer-spread': 'error',
        'unicorn/prefer-string-replace-all': 'error',
        'unicorn/prefer-string-slice': 'error',
        'unicorn/prefer-string-starts-ends-with': 'error',
        'unicorn/prefer-string-trim-start-end': 'error',
        'unicorn/prefer-switch': [
            'warn',
            { minimumCases: 4, emptyDefaultCase: 'do-nothing-comment' },
        ],
        'unicorn/prefer-ternary': 'error',
        'unicorn/prefer-top-level-await': 'warn',
        'unicorn/prefer-type-error': 'error',
        'unicorn/require-array-join-separator': 'error',
        'unicorn/require-number-to-fixed-digits-argument': 'error',
        'unicorn/template-indent': 'error',
        'unicorn/text-encoding-identifier-case': 'warn',
        'unicorn/throw-new-error': 'error',
        // Import rules
        'import/default': 'error',
        'import/dynamic-import-chunkname': 'error',
        'import/export': 'error',
        'import/max-dependencies': [
            'warn',
            { max: 10, ignoreTypeImports: true },
        ],
        'import/named': 'error',
        'import/namespace': 'error',
        'import/newline-after-import': 'warn',
        'import/no-absolute-path': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-as-default-member': 'error',
        'import/no-named-as-default': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-unresolved': 'error',
        'import/no-useless-path-segments': [
            'error',
            { noUselessIndex: true, commonjs: true },
        ],
        // ESLint Comments rules
        'eslint-comments/disable-enable-pair': [
            'error',
            { allowWholeFile: true },
        ],
        'eslint-comments/no-aggregating-enable': 'warn',
        'eslint-comments/no-duplicate-disable': 'warn',
        'eslint-comments/no-unlimited-disable': 'warn',
        'eslint-comments/no-unused-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
        // SonarJS rules
        'sonarjs/no-all-duplicated-branches': 'error',
        'sonarjs/elseif-without-else': 'warn',
        'sonarjs/max-switch-cases': ['warn', 16],
        'sonarjs/no-collection-size-mischeck': 'error',
        'sonarjs/no-duplicated-branches': 'error',
        'sonarjs/no-element-overwrite': 'warn',
        'sonarjs/no-empty-collection': 'warn',
        'sonarjs/no-extra-arguments': 'error',
        'sonarjs/no-gratuitous-expressions': 'error',
        'sonarjs/no-identical-expressions': 'error',
        'sonarjs/no-identical-functions': 'error',
        'sonarjs/no-ignored-return': 'error',
        'sonarjs/no-inverted-boolean-check': 'warn',
        'sonarjs/no-nested-switch': 'error',
        'sonarjs/no-nested-template-literals': 'warn',
        'sonarjs/no-redundant-boolean': 'warn',
        'sonarjs/no-small-switch': 'error',
        'sonarjs/no-unused-collection': 'warn',
        'sonarjs/no-use-of-empty-return-value': 'warn',
        'sonarjs/non-existent-operator': 'error',
        // Promise rules
        'promise/always-return': 'error',
        'promise/catch-or-return': 'error',
        'promise/no-callback-in-promise': 'warn',
        'promise/no-multiple-resolved': 'warn',
        'promise/no-nesting': 'error',
        'promise/no-new-statics': 'error',
        'promise/no-promise-in-callback': 'warn',
        'promise/no-return-in-finally': 'warn',
        'promise/no-return-wrap': ['error', { allowReject: true }],
        'promise/param-names': 'error',
        'promise/prefer-await-to-callbacks': 'warn',
        'promise/valid-params': 'error',
        // TypeScript rules
        '@typescript-eslint/adjacent-overload-signatures': 'warn',
        '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/ban-ts-comment': [
            'warn',
            {
                'ts-expect-error': 'allow-with-description',
                'ts-ignore': true,
                'ts-nocheck': true,
                'ts-check': false,
                minimumDescriptionLength: 3,
            },
        ],
        '@typescript-eslint/ban-tslint-comment': 'warn',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/consistent-generic-constructors': [
            'error',
            'type-annotation',
        ],
        '@typescript-eslint/consistent-indexed-object-style': 'error',
        '@typescript-eslint/consistent-type-assertions': [
            'warn',
            { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' },
        ],
        '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-module-boundary-types': [
            'error',
            { allowDirectConstAssertionInArrowFunctions: false },
        ],
        '@typescript-eslint/method-signature-style': 'warn',
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
        '@typescript-eslint/no-confusing-void-expression': [
            'error',
            { ignoreArrowShorthand: true },
        ],
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-duplicate-type-constituents': 'error',
        '@typescript-eslint/no-dynamic-delete': 'warn',
        '@typescript-eslint/no-empty-interface': 'warn',
        '@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: true }],
        '@typescript-eslint/no-extra-non-null-assertion': 'warn',
        '@typescript-eslint/no-extraneous-class': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-mixed-enums': 'error',
        '@typescript-eslint/no-namespace': 'warn',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'error',
        '@typescript-eslint/no-require-imports': 'warn',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
        '@typescript-eslint/no-unnecessary-condition': [
            'warn',
            { allowConstantLoopConditions: true },
        ],
        '@typescript-eslint/no-unnecessary-qualifier': 'warn',
        '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',
        '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-useless-empty-export': 'warn',
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/non-nullable-type-assertion-style': 'warn',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-function-type': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
    },
};
