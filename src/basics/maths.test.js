import { describe, expect, it, test } from 'vitest'
import {
  computeAverage,
  computeSphereVolume,
  roundedAverage,
  roundNumberToOneDecimals,
} from './maths.js'

describe('Compute sphere volume :', () => {
  it('Should throw an error when called with a string instead of a number', () => {
    expect(() => computeSphereVolume('bonjour')).toThrowError()
  })

  it('Should throw an error when called with NaN', () => {
    expect(() => computeSphereVolume(Number.NaN)).toThrowError()
  })

  it('Should throw an error when called with a negative diameter', () => {
    expect(() => computeSphereVolume(-5)).toThrowError()
  })

  test('Volume of a sphere with diameter 0 should be 0', () => {
    expect(computeSphereVolume(0)).toBe(0)
  })

  test('Volume of a sphere with diameter 1 should use the formula (4/3) * PI * r^3', () => {
    expect(computeSphereVolume(1)).toBeCloseTo((4 / 3) * Math.PI * 0.5 ** 3, 10)
  })

  test('Compute volumes for various diameters', () => {
    expect(computeSphereVolume(10)).toBeCloseTo(523.5987755982989, 10)
    expect(computeSphereVolume(24)).toBeCloseTo(7238.229473870882, 10)
    expect(computeSphereVolume(67)).toBeCloseTo(157479.13854527115, 8)
  })

  test('Should return a number, not a string', () => {
    expect(typeof computeSphereVolume(10)).toBe('number')
  })
})

describe('Round numbers :', () => {
  it('Should throw an error when called with a string instead of a number', () => {
    expect(() => roundNumberToOneDecimals('bonjour')).toThrowError()
  })

  it('Should throw an error when called with NaN', () => {
    expect(() => roundNumberToOneDecimals(Number.NaN)).toThrowError()
  })

  test('Should round up when the second decimal is >= 5', () => {
    expect(roundNumberToOneDecimals(4.27)).toBe(4.3)
    expect(roundNumberToOneDecimals(4.05)).toBe(4.1)
  })

  test('Should round down when the second decimal is < 5', () => {
    expect(roundNumberToOneDecimals(4.207)).toBe(4.2)
    expect(roundNumberToOneDecimals(4.049)).toBe(4)
    expect(roundNumberToOneDecimals(4.909)).toBe(4.9)
  })

  test('Should return an integer unchanged (no decimals to round)', () => {
    expect(roundNumberToOneDecimals(5)).toBe(5)
  })

  test('Should handle negative numbers correctly', () => {
    expect(roundNumberToOneDecimals(-3.75)).toBe(-3.7)
    expect(roundNumberToOneDecimals(-3.25)).toBe(-3.2)
  })
})

describe('Compute averages with precision:', () => {
  it('Should throw an error when called with a string instead of an array', () => {
    expect(() => computeAverage('bonjour')).toThrowError()
  })

  it('Should throw an error when called with NaN instead of an array', () => {
    expect(() => computeAverage(Number.NaN)).toThrowError()
  })

  it('Should throw an error when the array contains NaN', () => {
    expect(() => computeAverage([4, Number.NaN])).toThrowError()
  })

  it('Should throw an error when the array contains a string', () => {
    expect(() => computeAverage(['', 5])).toThrowError()
  })

  test('Average of a single element should be that element', () => {
    expect(computeAverage([7])).toBe(7)
  })

  test('Average of equal values should be that value', () => {
    expect(computeAverage([4, 4, 4])).toBe(4)
  })

  test('Average with integers', () => {
    expect(computeAverage([3, 4, 5])).toBe(4)
    expect(computeAverage([4, 4, 4, 5])).toBe(4.25)
    expect(computeAverage([3, 2, 5])).toBeCloseTo(3.3333333333333335, 10)
  })

  test('Average with floats', () => {
    expect(computeAverage([3.2, 4, 5.5])).toBeCloseTo(4.233333333333333, 10)
    expect(computeAverage([1.5, 3.3, 5.4, 4.2])).toBeCloseTo(3.6, 10)
  })
})

describe('Compute rounded averages :', () => {
  it('Should throw an error when called with a string instead of an array', () => {
    expect(() => roundedAverage('bonjour')).toThrowError()
  })

  it('Should throw an error when called with NaN instead of an array', () => {
    expect(() => roundedAverage(Number.NaN)).toThrowError()
  })

  it('Should throw an error when the array contains NaN', () => {
    expect(() => roundedAverage([4, Number.NaN])).toThrowError()
  })

  it('Should throw an error when the array contains a string', () => {
    expect(() => roundedAverage(['', 5])).toThrowError()
  })

  test('Rounded average of a single element should be that element', () => {
    expect(roundedAverage([7])).toBe(7)
  })

  test('Rounded average with integers', () => {
    expect(roundedAverage([3, 4, 5])).toBe(4)
    expect(roundedAverage([3, 4, 6])).toBe(4.3)
    expect(roundedAverage([2, 3, 5, 4, 5])).toBe(3.8)
  })

  test('Rounded average with floats', () => {
    expect(roundedAverage([3.2, 4, 5.5])).toBe(4.2)
    expect(roundedAverage([2.3, 4.3, 6])).toBe(4.2)
    expect(roundedAverage([3.5, 4.4, 5.5, 3])).toBe(4.1)
  })
})
