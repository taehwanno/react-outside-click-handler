import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const CLASS_NAME = 'OutsideClickHandler';
const MODULE_NAME = 'react-outside-click-handler';
const prod = process.env.PRODUCTION;

let plugins = [
  babel({
    exclude: 'node_modules/**',
  }),
  nodeResolve(),
  commonjs({
    include: ['node_modules/**'],
  }),
];

let output;
if (prod) {
  console.log('Creating production ES bundle...');
  output = [{ file: `dist/${CLASS_NAME}.min.js`, format: 'es' }];
  plugins = [...plugins, uglify({}, minify)];
} else {
  console.log('Creating development UMD bundle');
  output = [{ file: `dist/${CLASS_NAME}.js`, format: 'umd' }];
}

export default {
  input: 'lib/OutsideClickHandler.jsx',
  output,
  name: MODULE_NAME,
  plugins,
};
