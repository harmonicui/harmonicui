import { Styles, TailwindComponent } from '../types'
import resolveGenerator from './resolveGenerator'

export default function buildComponent (name: string, styles: Styles): TailwindComponent {
  return {
    [name]: buildComponentStyles(styles),
  }
}

function buildComponentStyles (styles: Styles) {
  return Object.entries(styles)
    .reduce((componentStyles, [property, value]) => {
      const generator = resolveGenerator(property)
      return Object.assign(componentStyles, generator(value))
    }, {})
}
