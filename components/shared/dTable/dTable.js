const url = 'https://dummyjson.com/users'
const $table = document.getElementById('dtable')
const $pagination = $table.querySelector('#pagination')
const $navigation = $table.querySelector('ul')

const initConf = {
  limit: 7,
  page: 1
}

const queryString = {
  skip: initConf.page * initConf.limit,
  limit: initConf.limit,
  sortBy: undefined,
  order: undefined,
  filters: [],
  sorts: [],
  get () {
    let qs = '?'
    qs += `skip=${this.skip}`
    qs += `&limit=${this.limit}`
    /* this.sorts.forEach(sort => {
      qs += `&sort=${encodeURIComponent(sort.order + sort.sortBy)}`
    })
    this.filters.forEach(f => {
      const like = f.filter.charAt(f.filter.length - 1) === ']' ? '' : '%' // TODO: not proud...
      qs += `&${encodeURIComponent(f.col)}=${encodeURIComponent(f.filter)}${like}`
    }) */
    return qs
  }
}

const pagination = {
  total: undefined,
  partial: queryString.limit,
  pages: undefined,
  page: initConf.page
}

// let $selectedPage = $table.querySelector(`li[data-page=${pagination.page}]`)

$navigation.addEventListener('click', async (e) => {
  const nextPage = --e.target.dataset.page
  queryString.skip = nextPage * queryString.limit
  pagination.page = nextPage
  await loadRowsData()
})

const buildRows = (rows) => {
  const $tBody = $table.getElementsByTagName('tbody')[0]
  // const $tCaption = $table.querySelector('caption')
  $tBody.innerText = ''
  // $tCaption.innerText += ' ' + rows.length
  for (const row of rows) {
    const $tr = document.createElement('tr')
    $tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.firstName}</td>
      <td>${row.lastName}</td>
      <td>${row.age}</td>
      <td>${row.email}</td>
      <td>
        <img alt="${row.firstName}" src="${row.image}" />
      </td>
    `
    $tBody.appendChild($tr)
  }
}

const updateDOMPagination = () => {
  $pagination.querySelector('#total').innerText = pagination.total
  $pagination.querySelector('#partial').innerText = pagination.partial
  $pagination.querySelector('#page').innerText = (pagination.page + 1)
  $pagination.querySelector('#pages').innerText = pagination.pages
}

const setNavigation = () => {
  $navigation.innerText = ''
  for (let i = 0; i < pagination.pages; i++) {
    const $li = document.createElement('li')
    $li.innerHTML = `${(i + 1)}`
    $li.setAttribute('data-page', (i + 1))
    if (i === pagination.page) $li.classList.add('active')
    $navigation.appendChild($li)
  }
}

const loadRowsData = async () => {
  $table.classList.toggle('loading')
  await fetch(url + queryString.get())
    .then(response => response.json())
    .then((json) => {
      buildRows(json.users)
      pagination.total = json.total
      pagination.pages = Math.ceil(json.total / queryString.limit)
      // if (pagination.pages === 0) pagination.pages++ // Do not display "0" for page
      updateDOMPagination()
      setNavigation()
    })
    .catch((error) => {
      $table.classList.add('error')
      console.error(error)
    })
    .finally(() => {
      $table.classList.toggle('loading')
    })
}

const dTable = {
  init: async () => {
    await loadRowsData()
  }
}

export default dTable
