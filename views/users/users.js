import dTable from '../../components/shared/dTable/dTable.js'
// import('./users.css', {assert: { type: 'css' }})

export const users = {
  init: async () => {
    console.log('Users')
    const css = await import('./users.css', {assert: { type: 'css' }})
    document.adoptedStyleSheets = [css.default]
    
    dTable.init()
  }
}
