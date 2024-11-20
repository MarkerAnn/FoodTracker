import { describe, test, it, expect } from 'vitest'

import { add } from '../src/app'

describe('add', () => {
  it('should add two numbers and return the sum', () => {
    const a = 2
    const b = 3

    const result = 5

    expect(add(a, b)).toBe(result)
  })
})
