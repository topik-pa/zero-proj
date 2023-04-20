export const contatti = {
  init: async () => {
    console.log('Contatti')
    const css = await import('./contatti.css', {assert: { type: 'css' }})
    document.adoptedStyleSheets = [css.default]
  }
}
