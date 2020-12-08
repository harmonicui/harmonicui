import generateClassName from '../generateClassName'

test('name can contain leading dot', () => {
  expect(generateClassName('.with-dot'))
    .toEqual('.with-dot')
})

test('prefixes the name with dot if does not have one', () => {
  expect(generateClassName('without-dot'))
    .toEqual('.without-dot')
})

test('should escape the name\'s special characters with tailwindUtils.e()', () => {
  expect(generateClassName('with/special/chars'))
    .toEqual('.with\\/special\\/chars')
})

test('generates name with modifier', () => {
  expect(generateClassName('with/modifier', 'success'))
    .toEqual('.with\\/modifier--success')
})

test('component names must be kebab-case', () => {
  expect(generateClassName('The Class Name/With_Special:characters', 'WithAModifier'))
    .toEqual('.the-class-name\\/with-special\\:characters--with-a-modifier')
})
