import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ng = require('../../js/ng/token_detector.cjs');

export const Parser = ng.Parser;
export const StandardDetectors = ng.StandardDetectors;
export const TokenSlice = ng.TokenSlice;

export function parseTokens(input: string) {
  const parser = new Parser(input, StandardDetectors.create());
  parser.start();
  return parser.getResults();
}
