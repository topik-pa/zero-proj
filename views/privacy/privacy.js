export const privacy = {
  init: async () => {
    console.log('Privacy')
    const css = await import('./privacy.css', {assert: { type: 'css' }})
    document.adoptedStyleSheets = [css.default]
  }
}
