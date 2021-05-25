export function getElement(query: string): Element {
  const element = container.querySelector(query)

  if (element === null) {
    throw new Error(`No element Found matching ${query}.`)
  }

  return element
}

export type AssertionsConfigurationOptions = Partial<{
  id: {
    input?: string
    label?: string
    helperText?: string
    errorMessage?: string
  }
  states: Array<'invalid' | 'optional' | 'disabled'>
  ignoreAssertions: Array<'Input' | 'Label' | 'HelperText' | 'ErrorMessage'>
}>

export class TextFieldAssertions {
  private IDs = {
    input: 'HUI-TextFieldInput-',
    label: 'HUI-TextFieldLabel-',
    helperText: 'HUI-TextFieldHelperText-',
    errorMessage: 'HUI-TextFieldErrorMessage-',
  }

  private readonly NUMBER_OF_INPUT_ASSERTIONS = 6
  private readonly NUMBER_OF_LABEL_ASSERTIONS = 6
  private readonly NUMBER_OF_HELPER_TEXT_ASSERTIONS = 2
  private readonly NUMBER_OF_ERROR_MESSAGE_ASSERTIONS = 2

  private assertionsToRun = {
    Input: this.NUMBER_OF_INPUT_ASSERTIONS,
    Label: this.NUMBER_OF_LABEL_ASSERTIONS,
    HelperText: this.NUMBER_OF_HELPER_TEXT_ASSERTIONS,
    ErrorMessage: this.NUMBER_OF_ERROR_MESSAGE_ASSERTIONS,
  }

  private states = {
    invalid: false,
    disabled: false,
    optional: false,
  }

  constructor({
    id,
    states,
    ignoreAssertions,
  }: AssertionsConfigurationOptions) {
    Object.assign(this.IDs, id)

    states?.forEach(state => {
      this.states[state] = true
    })

    ignoreAssertions?.forEach(element => {
      Reflect.deleteProperty(this.assertionsToRun, element)
    })
  }

  private get totalAssertions() {
    return Object.values(this.assertionsToRun).reduce(
      (total, next) => total + next,
    )
  }

  public runAllAssertions(): void {
    this.runInputAssertions()
    this.runLabelAssertions()
    this.runHelperTextAssertions()
    this.runErrorMessageAssertions()

    expect.assertions(this.totalAssertions)
  }

  private runInputAssertions(): void {
    if (this.assertionsToRun.Input) {
      this.assertInputHasProperId()
      this.assertInputHasProperDescription()
      this.assertInputHasProperErrorMessage()
      this.assertInputHasProperRequiredState()
      this.assertInputHasProperDisabledState()
      this.assertInputHasProperAriaInvalidAttribute()
    }
  }

  private runLabelAssertions(): void {
    if (this.assertionsToRun.Label) {
      this.assertLabelHasProperId()
      this.assertLabelHasProperForAttribute()
      this.assertLabelMissedDataIsAttributeWhenNoState()
      this.assertLabelHasProperDataIsAttributeWhenDisabled()
      this.assertLabelHasProperDataIsAttributeWhenOptional()
      this.assertLabelHasProperDataIsAttributeWhenInvalid()
    }
  }

  private runHelperTextAssertions(): void {
    if (this.assertionsToRun.HelperText) {
      this.assertHelperTextHasProperId()
      this.assertHelperTextHasProperVisibility()
    }
  }

  private runErrorMessageAssertions(): void {
    if (this.assertionsToRun.ErrorMessage) {
      this.assertErrorMessageHasProperId()
      this.assertErrorMessageHasProperVisibility()
    }
  }

  private assertInputHasProperId(): void {
    expect(this.getInput()).toHaveAttribute(
      'id',
      expect.stringMatching(new RegExp('^' + this.IDs.input)),
    )
  }

  private assertInputHasProperDescription(): void {
    if (this.assertionsToRun.HelperText && !this.states.invalid) {
      return expect(this.getInput()).toHaveAttribute(
        'aria-describedby',
        this.getHelperText().id,
      )
    }

    expect(this.getInput()).not.toHaveAttribute('aria-describedby')
  }

  private assertInputHasProperErrorMessage(): void {
    if (this.assertionsToRun.ErrorMessage && this.states.invalid) {
      return expect(this.getInput()).toHaveAttribute(
        'aria-errormessage',
        this.getErrorMessage().id,
      )
    }

    expect(this.getInput()).not.toHaveAttribute('aria-errormessage')
  }

  private assertInputHasProperRequiredState(): void {
    if (!this.states.optional) {
      return expect(this.getInput()).toBeRequired()
    }

    expect(this.getInput()).not.toBeRequired()
  }

  private assertInputHasProperDisabledState(): void {
    if (this.states.disabled) {
      return expect(this.getInput()).toBeDisabled()
    }

    return expect(this.getInput()).not.toBeDisabled()
  }

  private assertInputHasProperAriaInvalidAttribute(): void {
    if (this.states.invalid) {
      return expect(this.getInput()).toHaveAttribute('aria-invalid')
    }

    expect(this.getInput()).not.toHaveAttribute('aria-invalid')
  }

  private assertLabelHasProperId(): void {
    expect(this.getLabel()).toHaveAttribute(
      'id',
      expect.stringMatching(new RegExp('^' + this.IDs.label)),
    )
  }

  private assertLabelHasProperForAttribute(): void {
    if (this.assertionsToRun.Input) {
      return expect(this.getLabel()).toHaveAttribute('for', this.getInput().id)
    }

    expect(this.getLabel()).not.toHaveAttribute('for')
  }

  private assertLabelMissedDataIsAttributeWhenNoState(): void {
    if (
      !this.states.invalid &&
      !this.states.optional &&
      !this.states.disabled
    ) {
      return expect(this.getLabel()).not.toHaveAttribute('data-is')
    }

    return expect(this.getLabel()).toHaveAttribute('data-is')
  }

  private assertLabelHasProperDataIsAttributeWhenDisabled(): void {
    if (this.states.disabled) {
      return expect(this.getLabel()).toHaveAttribute(
        'data-is',
        expect.stringContaining('disabled'),
      )
    }

    expect(this.getLabel()).not.toHaveAttribute(
      'data-is',
      expect.stringContaining('disabled'),
    )
  }

  private assertLabelHasProperDataIsAttributeWhenOptional(): void {
    if (this.states.optional) {
      return expect(this.getLabel()).toHaveAttribute(
        'data-is',
        expect.stringContaining('optional'),
      )
    }

    expect(this.getLabel()).not.toHaveAttribute(
      'data-is',
      expect.stringContaining('optional'),
    )
  }

  private assertLabelHasProperDataIsAttributeWhenInvalid(): void {
    if (this.states.invalid) {
      return expect(this.getLabel()).toHaveAttribute(
        'data-is',
        expect.stringContaining('invalid'),
      )
    }

    expect(this.getLabel()).not.toHaveAttribute(
      'data-is',
      expect.stringContaining('invalid'),
    )
  }

  private assertHelperTextHasProperId(): void {
    expect(this.getHelperText()).toHaveAttribute(
      'id',
      expect.stringMatching(new RegExp('^' + this.IDs.helperText)),
    )
  }

  private assertHelperTextHasProperVisibility(): void {
    if (this.states.invalid) {
      return expect(this.getHelperText()).not.toBeVisible()
    }

    expect(this.getHelperText()).toBeVisible()
  }

  private assertErrorMessageHasProperId(): void {
    expect(this.getErrorMessage()).toHaveAttribute(
      'id',
      expect.stringMatching(new RegExp('^' + this.IDs.errorMessage)),
    )
  }

  private assertErrorMessageHasProperVisibility(): void {
    if (this.states.invalid) {
      return expect(this.getErrorMessage()).toBeVisible()
    }

    return expect(this.getErrorMessage()).not.toBeVisible()
  }

  private getInput(): Element {
    return getElement(`[id^="${this.IDs.input}"]`)
  }

  private getLabel(): Element {
    return getElement(`[id^="${this.IDs.label}"]`)
  }

  private getHelperText(): Element {
    return getElement(`[id^="${this.IDs.helperText}"]`)
  }

  private getErrorMessage(): Element {
    return getElement(`[id^="${this.IDs.errorMessage}"]`)
  }
}
