/* const endpoint = '/api/'

const api = {
  get: async (path) => {
    const formattedResp = {}
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await fetch(endpoint + path, params)
      .then(resp => {
        formattedResp.status = resp.status
        return resp.json()
      })
      .then(data => { formattedResp.body = data })
      .catch((err) => { console.error(err) })
    return formattedResp
  },
  post: async (data = {}, path) => {
    const formattedResp = {}
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    await fetch(endpoint + path, params)
      .then(resp => {
        formattedResp.status = resp.status
        return resp.json()
      })
      .then(data => { formattedResp.body = data })
      .catch((err) => { console.error(err) })
    return formattedResp
  }
}

export default api */

export async function proxyFetch (path = '', data = {}, method = 'GET', headers = {}) {
  const obj = {}
  const params = {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }
  // Include JWT token if found
  const refreshJWT = undefined
  if (refreshJWT) {
    params.headers.authorization = `Bearer ${refreshJWT}`
  }

  // Add data if needed
  if (['post', 'put', 'patch', 'delete'].includes(method.toLowerCase())) {
    params.body = JSON.stringify(data)
  }
  // Start communication
  await fetch(path, params)
    .then(resp => {
      obj.status = resp.status
      return resp.json()
    })
    .then(data => { obj.body = data })
    .catch((err) => { console.error(err) }) // TODO: maybe a better error management?
  return obj
}
