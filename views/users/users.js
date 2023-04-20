import dTable from '../../components/shared/dTable/dTable.js'

export const users = {
  init: async () => {
    console.log('Users')
    const css = await import('./users.css', {assert: { type: 'css' }})
    document.adoptedStyleSheets = [css.default]
    const dTableStyle = await import('../../components/shared/dTable/dTable.css', {assert: { type: 'css' }})
    document.adoptedStyleSheets = [dTableStyle.default]

    await dTable.init()
  }
}
