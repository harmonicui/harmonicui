import generateComponentName from '../generateComponentName'

jest.mock('../tailwindUtils')

test('name can contain leading dot', () => {
  expect(generateComponentName('.with-dot'))
    .toEqual('.with-dot')
})

test('prefixes the name with dot if does not have one', () => {
  expect(generateComponentName('without-dot'))
    .toEqual('.without-dot')
})

test('should escape the name\'s special characters with tailwindUtils.e()', () => {
  expect(generateComponentName('with/special/chars'))
    .toEqual('.with\\/special\\/chars')
})

test('generates name with modifier', () => {
  expect(generateComponentName('with/modifier', 'success'))
    .toEqual('.with\\/modifier--success')
})

test('component names must be kebab-case', () => {
  expect(generateComponentName('The Class Name/With_Special:characters', 'WithAModifier'))
    .toEqual('.the-class-name\\/with-special\\:characters--with-a-modifier')
})
