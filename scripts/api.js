const endpoint = '/api/'

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

export default api
