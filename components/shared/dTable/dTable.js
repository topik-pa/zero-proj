const url = 'https://dummyjson.com/users'
const $table = document.getElementById('dtable')

const buildTable = (rows) => {
  const $tBody = $table.getElementsByTagName('tbody')[0]
  const $tCaption = $table.querySelector('caption')
  $tBody.innerText = ''
  $tCaption.innerText += ' ' + rows.length
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

const dTable = {
  init: async () => {
    await fetch(url)
      .then(response => response.json())
      .then((json) => {
        buildTable(json.users)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        console.log('getRemoteData... done')
      })
  }
}

export default dTable
