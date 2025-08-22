import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toNumber, normalizePlant } from './normalizePlant.js';

test('toNumber converts strings to numbers and handles commas', () => {
  assert.equal(toNumber('10'), 10);
  assert.equal(toNumber('10,5'), 10.5);
  assert.equal(toNumber('10.5'), 10.5);
  assert.equal(toNumber(null), null);
  assert.equal(toNumber(undefined), null);
  assert.equal(toNumber('abc'), null);
});

test('normalizePlant resolves caudalDiseno from multiple fields', () => {
  assert.equal(normalizePlant({ caudaDiseño: '1,2' }).caudalDiseno, 1.2);
  assert.equal(normalizePlant({ caudalDiseño: '2' }).caudalDiseno, 2);
  assert.equal(normalizePlant({ caudalDiseno: '3' }).caudalDiseno, 3);
});
