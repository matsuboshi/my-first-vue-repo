/**
 * API. :P
 *
 * @param   {string}  url
 * @param   {RequestInit}  options
 *
 * @return  {Object}
 */
const api = async (url, options, json = true) => {
  const response = await fetch(
    'https://vue-todo-tasks.herokuapp.com/api' + url,
    options
  )

  if (json) {
    const data = await response.json()
    return data
  }

  return response
}

export default api
