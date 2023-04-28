

const $form = document.forms[0]
const $errors = document.getElementById('errors')
const $submit = $form.querySelector('button[type=submit]')

const listFormErrors = () => {
  $errors.innerText = ''
  const $invalids = $form.querySelectorAll(':invalid')
  if ($invalids.length > 0) $errors.classList.remove('hide')
  for (const elem of $invalids) {
    if (elem.nodeName === 'FIELDSET') continue
    let placeholder = elem.getAttribute('placeholder')
    let label = elem.id ? $form.querySelector(`label[for=${elem.id}]`).innerText : ''
    let error = placeholder ? placeholder : label
    let message = elem.validationMessage.toLowerCase() || 'invalid value.';
    error += ': '
    error += message
    const $li = document.createElement('li')
    $li.innerText = error
    $errors.append($li)
    // debugger
  }
}

$submit.addEventListener('click', (e) => {
  e.preventDefault
  listFormErrors()
})

export const form = {
  init: async () => {
    console.log('Form')
    const css = await import('./form.css', {assert: { type: 'css' }})
    document.adoptedStyleSheets = [css.default]

  }
}
