const url = 'https://6442459433997d3ef90c1331.mockapi.io/users' // APIRELATED
const $products = document.getElementById('products')
const $more = document.getElementById('more')

const initConf = {
  limit: 10,
  page: 1
}

$more.addEventListener('click', async (e) => {
  initConf.page++
  await loadRemoteData()
})

const queryString = {
  get () {
    let qs = '?'
    qs += `page=${initConf.page}`
    qs += `&limit=${initConf.limit}`
    return qs
  }
}

function generateHTML(strings, product) {
  return `
      <h2>${product.name} ${product.surname}</h2>
      <p>Email: ${product.email}</p>
      <p>Age: ${product.age}</p>
      <img alt="${product.name} image" src="${product.avatar}" />
  `
}

const printProducts = (products) => {
  for (const p of products) {
    const productInnerHTML = generateHTML`${p}`
    const prodEl = document.createElement('div')
    prodEl.classList.add('product')
    prodEl.innerHTML = productInnerHTML;
    $products.appendChild(prodEl)
  }
}

const loadRemoteData = async () => {
  $products.classList.toggle('loading')
  await fetch(url + queryString.get())
    .then(response => response.json())
    .then((json) => {
      printProducts(json) // APIRELATED
    })
    .catch((error) => {
      $products.classList.add('error')
      console.error(error)
    })
    .finally(() => {
      $products.classList.toggle('loading')
    })
}

export const plp = {
  init: async () => {
    console.log('PLP')
    const css = await import('./plp.css', {assert: { type: 'css' }})
    document.adoptedStyleSheets = [css.default]

    await loadRemoteData()
  }
}
