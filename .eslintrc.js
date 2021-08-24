module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config
  // file (it usually happens into a monorepos)
  root: true,

  parser: 'babel-eslint',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  env: {
    browser: true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    // "extends:airbnb"
  ],

  plugins: [
    'react',
  ],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
    chrome: true,
  },

  // add your custom rules here
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-unescaped-entities': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'no-console': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    // 'linebreak-style': ['error', 'windows'],
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect',
      flowVersion: '0.53', // Flow version
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes,
      // e.g. `forbidExtraProps`. If this isn't set,
      // any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      { name: 'Link', linkAttribute: 'to' },
    ],
  },
};
