import { getElement } from '../../test-utils'

export type AssertionsConfigurationOptions = Partial<{
  id: {
    toggle?: string
    label?: string
    helperText?: string
  }
  states: Array<'disabled'>
  ignoreAssertions: Array<'Toggle' | 'Thumb' | 'Label' | 'HelperText'>
}>

export class SwitchAssertions {
  private IDs = {
    toggle: 'HUI-SwitchToggle-',
    label: 'HUI-SwitchLabel-',
    helperText: 'HUI-SwitchHelperText-',
  }

  private readonly NUMBER_OF_TOGGLE_ASSERTIONS = 5
  private readonly NUMBER_OF_THUMB_ASSERTIONS = 2
  private readonly NUMBER_OF_LABEL_ASSERTIONS = 3
  private readonly NUMBER_OF_HELPER_TEXT_ASSERTIONS = 2

  private assertionsToRun = {
    Toggle: this.NUMBER_OF_TOGGLE_ASSERTIONS,
    Thumb: this.NUMBER_OF_THUMB_ASSERTIONS,
    Label: this.NUMBER_OF_LABEL_ASSERTIONS,
    HelperText: this.NUMBER_OF_HELPER_TEXT_ASSERTIONS,
  }

  private states = {
    disabled: false,
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
    this.runToggleAssertions()
    this.runThumbAssertions()
    this.runLabelAssertions()
    this.runHelperTextAssertions()

    expect.assertions(this.totalAssertions)
  }

  private runToggleAssertions(): void {
    if (this.assertionsToRun.Toggle) {
      this.assertToggleHasProperId()
      this.assertToggleHasProperDescription()
      this.assertToggleHasProperAriaLabelledbyAttribute()
      this.assertToggleHasProperDisabledState()
      this.assertToggleBeFocusable()
    }
  }

  private runThumbAssertions(): void {
    if (this.assertionsToRun.Thumb) {
      this.assertThumbNotBeFocusable()
      this.assertThumbHasProperDisabledState()
    }
  }

  private runLabelAssertions(): void {
    if (this.assertionsToRun.Label) {
      this.assertLabelHasProperId()
      this.assertLabelMissedDataIsAttributeWhenNoState()
      this.assertLabelHasProperDataIsAttributeWhenDisabled()
    }
  }

  private runHelperTextAssertions(): void {
    if (this.assertionsToRun.HelperText) {
      this.assertHelperTextHasProperId()
      this.assertHelperTextHasProperVisibility()
    }
  }

  private assertToggleHasProperId(): void {
    expect(this.getToggle()).toHaveAttribute(
      'id',
      expect.stringMatching(new RegExp('^' + this.IDs.toggle)),
    )
  }

  private assertToggleHasProperDescription(): void {
    if (this.assertionsToRun.HelperText) {
      return expect(this.getToggle()).toHaveAttribute(
        'aria-describedby',
        this.getHelperText().id,
      )
    }

    expect(this.getToggle()).not.toHaveAttribute('aria-describedby')
  }

  private assertToggleHasProperAriaLabelledbyAttribute(): void {
    if (this.assertionsToRun.Label) {
      return expect(this.getToggle()).toHaveAttribute(
        'aria-labelledby',
        this.getLabel().id,
      )
    }
  }

  private assertToggleHasProperDisabledState(): void {
    if (this.states.disabled) {
      return expect(this.getToggle()).toBeDisabled()
    }

    return expect(this.getToggle()).not.toBeDisabled()
  }

  private assertToggleBeFocusable(): void {
    expect(this.getToggle()).toHaveAttribute('tabindex', '0')
  }

  private assertThumbNotBeFocusable(): void {
    expect(this.getThumb()).toHaveAttribute('tabindex', '-1')
  }

  private assertThumbHasProperDisabledState(): void {
    if (this.states.disabled) {
      return expect(this.getThumb()).toHaveAttribute('data-is', 'disabled')
    }
    return expect(this.getThumb()).not.toHaveAttribute('data-is', 'disabled')
  }

  private assertLabelHasProperId(): void {
    expect(this.getLabel()).toHaveAttribute(
      'id',
      expect.stringMatching(new RegExp('^' + this.IDs.label)),
    )
  }

  private assertLabelMissedDataIsAttributeWhenNoState(): void {
    if (!this.states.disabled) {
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

  private assertHelperTextHasProperId(): void {
    expect(this.getHelperText()).toHaveAttribute(
      'id',
      expect.stringMatching(new RegExp('^' + this.IDs.helperText)),
    )
  }

  private assertHelperTextHasProperVisibility(): void {
    expect(this.getHelperText()).toBeVisible()
  }

  private getToggle(): Element {
    return getElement(`[id^="${this.IDs.toggle}"]`)
  }

  private getThumb(): Element {
    return getElement('span')
  }

  private getLabel(): Element {
    return getElement(`[id^="${this.IDs.label}"]`)
  }

  private getHelperText(): Element {
    return getElement(`[id^="${this.IDs.helperText}"]`)
  }
}
