export class UnableToPassPropsThroughFragmentError extends Error {
  constructor(componentName: string) {
    super(
      [
        '',
        '[Harmonic UI Error]: Unable to pass props to fragment.',
        '',
        [
          `There are a few props that we need to pass-through the <${componentName} /> component.`,
          'However, It is currently rendering as a fragment which means we cannot handle props.',
          '',
          'In order to fix this, you can apply one of the following solutions:',
        ]
          .map(line => `\t ${line}`)
          .join('\n'),
        [
          `Use an \`as = '...'\` prop, to render <${componentName} /> as an element/component instead of a fragment.`,
          'Render a single-root child element/component so that we can forward the props to that element.',
        ]
          .map(line => `\t  - ${line}`)
          .join('\n'),
      ].join('\n'),
    )
    this.name = 'UnableToPassPropsThroughFragmentError'
  }
}
