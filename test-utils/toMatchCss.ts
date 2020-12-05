expect.extend({
  toMatchCss (received: string, expected: string) {
    function stripped (str: string) {
      return str.replace(/\s/g, '').replace(/;/g, '')
    }

    if (stripped(received) === stripped(expected)) {
      return { pass: true, message: () => `expected ${received} not to match CSS ${expected}` }
    }

    return { pass: false, message: () => `expected ${received} to match CSS ${expected}` }
  },
})
