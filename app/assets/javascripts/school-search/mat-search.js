import { allMats } from './data.js'

const prevOnload = window.onload
window.onload = () => {
  setupMatEventListeners()
  applyMatFiltering()
  prevOnload && prevOnload()
}

// function that takes a list of schools and filters a list of them based on pupil premium
function setupMatEventListeners () {
  const applyFiltersButtons = document.getElementsByName('apply-mat-filters')[0]
  applyFiltersButtons.addEventListener('click', applyMatFiltering)
}

function applyMatFiltering () {
  const resultsHtml = window.nunjucks.render('mat-results.html', { mats: filteredMats() })
  document.getElementById('mat-results').innerHTML = resultsHtml
}

function filteredMats () {
  console.log(hidePartneredMats())
  if (hidePartneredMats()) {
    return filterPartneredMats(allMats)
  }
  return allMats
}

function hidePartneredMats () {
  return !document.getElementById('status').checked
}

function filterPartneredMats (mats) {
  return mats.filter(mat => !mat.partnered)
}
