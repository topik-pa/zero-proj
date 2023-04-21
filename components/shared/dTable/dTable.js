const url = 'https://6442459433997d3ef90c1331.mockapi.io/users'
const $table = document.getElementById('dtable')
const $pagination = $table.querySelector('#pagination')
const $navigation = $table.querySelector('ul')
const $tHeader = $table.querySelector('thead')
const $filter = $table.querySelector('#filter input')
let filterTimer
const startFilterRequestTimer = () => {
  // Add a little pause before call the remote server (only on filters)
  filterTimer = setTimeout(async () => {
    await loadRowsData()
  }, initConf.filterReqDelay)
}

const initConf = {
  limit: 10,
  page: 1,
  filterReqDelay: 800
}

const queryString = {
  /* skip: initConf.page * initConf.limit, */
  limit: initConf.limit,
  sortBy: undefined,
  order: undefined,
  filters: [],
  sorts: [],
  get () {
    let qs = '?'
    qs += `page=${pagination.page}`
    qs += `&limit=${this.limit}`
    /* this.sorts.forEach(sort => {
      qs += `&sort=${encodeURIComponent(sort.order + sort.sortBy)}`
    }) */
    const lastClickedSort = this.sorts[this.sorts.length - 1]
    if (lastClickedSort) {
      qs += `&sortby=${encodeURIComponent(lastClickedSort.sortBy)}`
      qs += `&order=${encodeURIComponent(lastClickedSort.order)}`
    }
    /* this.filters.forEach(f => {
      const like = f.filter.charAt(f.filter.length - 1) === ']' ? '' : '%' // TODO: not proud...
      qs += `&${encodeURIComponent(f.col)}=${encodeURIComponent(f.filter)}${like}`
    }) */
    const lastTypedFilter = this.filters[this.filters.length - 1]
    if (lastTypedFilter) {
      qs += `&filter=${encodeURIComponent(lastTypedFilter)}`
    }
    return qs
  }
}

const pagination = {
  total: undefined,
  partial: queryString.limit,
  pages: undefined,
  page: initConf.page
}

const dateFilter = (date = undefined) => {
  return new Date(date).toLocaleString()
}

$navigation.addEventListener('click', async (e) => {
  const nextPage = +e.target.dataset.page
  if (!nextPage) return
  // queryString.skip = nextPage * queryString.limit
  pagination.page = nextPage
  await loadRowsData()
})

$tHeader.addEventListener('click', async (e) => {
  const dataset = e.target.dataset
  if (!dataset) return
  const sortBy = dataset.sortby
  const order = dataset.order
  for (const th of $tHeader.getElementsByTagName('th')) {
    th.removeAttribute('data-order')
  }
  dataset.order = order === 'asc' ? 'desc' : order === 'desc' ? 'asc' : 'asc'
  queryString.sorts.push({ sortBy, order: dataset.order })
  await loadRowsData()
})

$filter.addEventListener('input', async (e) => {
  queryString.filters.push(e.target.value)
  if (!filterTimer) {
    startFilterRequestTimer()
  } else {
    clearTimeout(filterTimer)
    startFilterRequestTimer()
  }
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
      <td>${row.name}</td>
      <td>${row.surname}</td>
      <td>${row.age}</td>
      <td>${row.email}</td>
      <td>${dateFilter(row.createdAt)}</td>
    `
    $tBody.appendChild($tr)
  }
}

const updateDOMPagination = () => {
  $pagination.querySelector('#total').innerText = pagination.total
  $pagination.querySelector('#partial').innerText = pagination.partial
  $pagination.querySelector('#page').innerText = (pagination.page)
  $pagination.querySelector('#pages').innerText = pagination.pages
}

const setNavigation = () => {
  $navigation.innerText = ''
  for (let i = 1; i <= pagination.pages; i++) {
    const $li = document.createElement('li')
    $li.innerHTML = `${(i)}`
    $li.setAttribute('data-page', (i))
    if (i === pagination.page) $li.classList.add('active')
    $navigation.appendChild($li)
  }
}

const loadRowsData = async () => {
  $table.classList.toggle('loading')
  await fetch(url + queryString.get())
    .then(response => response.json())
    .then((json) => {
      buildRows(json)
      pagination.total = 100 // json.total // the current service do not returns a total value
      pagination.pages = Math.ceil(pagination.total / queryString.limit)
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
