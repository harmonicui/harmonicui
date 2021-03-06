import './matchers'

Object.defineProperty(global, 'container', {
  get: () => {
    const container = document.body.firstElementChild

    if (!container) {
      throw new Error('No rendered container found.')
    }

    return container
  },
})

beforeEach(() => {
  document.body.innerHTML = ''
})
