const url = 'http://localhost:8080/matches' // APIRELATED
const $table = document.getElementById('dtable')
const $pagination = $table.querySelector('#pagination')
const $navigation = $table.querySelector('ul')
const $tHeader = $table.querySelector('thead')
const $filters = $tHeader.querySelectorAll('input')
let filterTimer
const startFilterRequestTimer = () => {
  // Add a little pause before call the remote server (only on filters)
  filterTimer = setTimeout(async () => {
    await loadRowsData()
  }, tConfig.filterReqDelay)
}

const tConfig = {
  limit: 25,
  page: 0,
  total: undefined,
  pages: undefined,
  start: undefined,
  end: undefined,
  filterReqDelay: 800
}

const queryString = {
  filters: [],
  sorts: [],
  get () {
    let qs = '?'
    qs += `page=${tConfig.page}`
    qs += `&limit=${tConfig.limit}`
    this.sorts.forEach(sort => {
      qs += `&sortby=${encodeURIComponent(sort.sortBy)}`
      qs += `&order=${sort.order}`
    })
    this.filters.forEach(f => {
      qs += `&filterby=${encodeURIComponent(f.filterBy)}`
      qs += `&filter=${encodeURIComponent(f.filter)}`
    })
    return qs
  }
}

const dateFilter = (date = undefined) => {
  return new Date(date).toLocaleString()
}

$navigation.addEventListener('click', async (e) => {
  const nextPage = +e.target.dataset.page
  if (nextPage === undefined || tConfig.page === nextPage) return
  tConfig.page = nextPage
  await loadRowsData()
})

$tHeader.addEventListener('click', async (e) => {
  const sortBy = e.target.dataset.path
  if (!sortBy) return
  const order = e.target.dataset.order
  for (const th of $tHeader.getElementsByTagName('th')) {
    th.removeAttribute('data-order')
  }
  e.target.dataset.order = order === 'asc' ? 'desc' : order === 'desc' ? 'asc' : 'asc'
  /* queryString.sorts = queryString.sorts.filter((sort) => {
    return sort.sortBy !== sortBy
  }) */
  queryString.sorts.push({ sortBy, order: e.target.dataset.order })
  await loadRowsData()
})

for (const $filter of $filters) {
  $filter.addEventListener('input', async (e) => {
    const filter = e.target.value
    const filterBy = e.target.parentElement.dataset.path
    /* queryString.filters = queryString.filters.filter((filter) => {
      return filter.filterby !== filterby
    }) */
    queryString.filters.push({ filterBy, filter })
    if (!filterTimer) {
      startFilterRequestTimer()
    } else {
      clearTimeout(filterTimer)
      startFilterRequestTimer()
    }
  })
}

const buildRows = (rows) => {
  const $tBody = $table.getElementsByTagName('tbody')[0]
  // const $tCaption = $table.querySelector('caption')
  $tBody.innerText = ''
  // $tCaption.innerText += ' ' + rows.length
  for (const row of rows) {
    const $tr = document.createElement('tr')
    // APIRELATED
    $tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.player1.name}</td>
      <td>${row.player2.name}</td>
      <td>${row.score}</td>
      <td>${row.tournament.name}</td>
      <td>${row.tournament.value}</td>
      <td>${row.surface}</td>
      <td>${dateFilter(row.createdAt)}</td>
    `
    // APIRELATED
    $tBody.appendChild($tr)
  }
}

const updateDOMPagination = () => {
  if (tConfig.total === 0) {
    $pagination.classList.add('hide')
  } else {
    $pagination.classList.remove('hide')
  }
  $pagination.querySelector('#total').innerText = tConfig.total
  $pagination.querySelector('#start').innerText = tConfig.start
  $pagination.querySelector('#end').innerText = tConfig.end
  $pagination.querySelector('#page').innerText = (tConfig.page + 1)
  $pagination.querySelector('#pages').innerText = tConfig.pages
}

const setNavigation = () => {
  $navigation.innerText = ''
  for (let i = 0; i < tConfig.pages; i++) {
    const $li = document.createElement('li')
    $li.innerText = (i + 1)
    $li.setAttribute('data-page', (i))
    if (i === tConfig.page) $li.classList.add('active')
    $navigation.appendChild($li)
  }
}

const loadRowsData = async () => {
  $table.classList.toggle('loading')
  await fetch(url + queryString.get())
    .then(response => response.json())
    .then((json) => {
      buildRows(json.matches) // APIRELATED
      tConfig.total = json.total // APIRELATED
    })
    .catch((error) => {
      $table.classList.add('error')
      console.error(error)
      tConfig.total = 0
    })
    .finally(() => {
      tConfig.pages = Math.ceil(tConfig.total / tConfig.limit)
      tConfig.end = tConfig.limit * (tConfig.page + 1)
      tConfig.start = (tConfig.end - tConfig.limit) + 1
      if (tConfig.end > tConfig.total) {
        tConfig.end = tConfig.total
        tConfig.start = (tConfig.limit * (tConfig.pages - 1)) + 1
      }
      updateDOMPagination()
      setNavigation()
      $table.classList.toggle('loading')
    })
}

const dTable = {
  init: async () => {
    await loadRowsData()
  }
}

export default dTable
