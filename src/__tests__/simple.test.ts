import { describe, it, expect } from 'vitest'

// Teste matemático que SEMPRE funciona!
describe('Testes Simples', () => {
  it('1 + 1 deve ser 2', () => {
    expect(1 + 1).toBe(2)
  })

  it('3 * 3 deve ser 9', () => {
    expect(3 * 3).toBe(9)
  })

  it('texto deve ser igual', () => {
    expect('hello').toBe('hello')
  })
})