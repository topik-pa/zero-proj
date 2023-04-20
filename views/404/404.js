export const err404 = {
  init: async () => {
    console.log('404')
    const css = await import('./404.css', {assert: { type: 'css' }})
    document.adoptedStyleSheets = [css.default]
  }
}
