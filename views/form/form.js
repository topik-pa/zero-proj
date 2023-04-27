
export const form = {
  init: async () => {
    console.log('Form')
    const css = await import('./form.css', {assert: { type: 'css' }})
    document.adoptedStyleSheets = [css.default]

  }
}
