import { describe, expect, test } from '@jest/globals';
import { toNumber, normalizePlant } from './normalizePlant.js';

describe('normalizePlant utilities', () => {
  test('toNumber converts strings to numbers and handles commas', () => {
    expect(toNumber('10')).toBe(10);
    expect(toNumber('10,5')).toBe(10.5);
    expect(toNumber('10.5')).toBe(10.5);
    expect(toNumber(null)).toBeNull();
    expect(toNumber(undefined)).toBeNull();
    expect(toNumber('abc')).toBeNull();
  });

  test('normalizePlant resolves caudalDiseno from multiple fields', () => {
    expect(normalizePlant({ caudaDiseño: '1,2' }).caudalDiseno).toBe(1.2);
    expect(normalizePlant({ caudalDiseño: '2' }).caudalDiseno).toBe(2);
    expect(normalizePlant({ caudalDiseno: '3' }).caudalDiseno).toBe(3);
  });
});
