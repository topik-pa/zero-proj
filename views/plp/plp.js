

export const plp = {
  init: async () => {
    console.log('PLP')
    const css = await import('./plp.css', {assert: { type: 'css' }})
    document.adoptedStyleSheets = [css.default]

  }
}
