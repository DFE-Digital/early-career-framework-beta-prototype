window.onload = () => {
  document.getElementById('upload-button').onclick = buttonClicked
}

function buttonClicked () {
  document.getElementById('upload-button').disabled = true
  document.getElementById('loading-message').innerText = 'Processing...'
  window.setTimeout(() => window.location.assign(`${window.location.origin}/declare-partnership/multiple/failed`), 5000)
}
