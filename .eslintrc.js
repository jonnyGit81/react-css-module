// module.exports = {
//   extends: [
//     'eslint:recommended',
//     'plugin:import/errors', // if that file exports something the other file can import it and if it doesn't export it cant be imported somewhere else
//     'plugin:react/recommended', // this fixes a lot of React problems, but you can question these rules
//     'plugin:jsx-a11y/recommended', // this is doing some more abilities to understand accessibility
//     'prettier', // this two prettier rule set must be the last thing
//     'prettier/react',
//   ],
//   rules: {
//     // this is where we can turn on and off specific rules
//     'react/prop-types': 0, // this is a very weak type checking what React can do for you, this is not too useful if you write typescript, so we turn it off
//     'no-console': 1, // console.log() will be a warning if this equals 1
//   },
//   plugins: ['react', 'import', 'jsx-a11y'], // here we include the plugins as well, this is like new abilities for ESLint
//   parserOptions: {
//     ecmaVersion: 2018,
//     sourceType: 'module',
//     ecmaFeatures: {
//       jsx: true,
//     },
//   },
//   env: {
//     es6: true,
//     browser: true,
//     node: true,
//   },
//   settings: {
//     react: {
//       version: 'detect', // you have to tell eslint which version React are using, "detect" will say can you just figure out yourself (from package.json)
//     },
//   },
// };
