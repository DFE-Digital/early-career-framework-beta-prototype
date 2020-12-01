import { allSchools } from './data.js'

const prevOnload = window.onload
window.onload = () => {
  setupEventListeners()
  applyFiltering()
  prevOnload && prevOnload()
}

// function that takes a list of schools and filters a list of them based on pupil premium
function setupEventListeners () {
  const applyFiltersButtons = document.getElementsByName(
    'apply-school-filters'
  )[0]
  applyFiltersButtons.addEventListener('click', applyFiltering)
}

function applyFiltering () {
  const schools = filteredSchools()
  const resultsHtml = window.nunjucks.render('school-results.html', {
    schools: schools,
    results: schools.length
  })
  document.getElementById('school-results').innerHTML = resultsHtml
}

function filteredSchools () {
  let schools = getAllSchools()
  if (getName().length > 0) {
    schools = filterName(schools, getName())
  }
  if (getCharacteristics().length > 0) {
    schools = filterCharacteristics(schools, getCharacteristics())
  }

  if (hidePartneredSchools()) {
    schools = filterPartneredSchools(schools, getStatus())
  }

  return schools
}

function getAllSchools () {
  const isSuccessJourney = window.location.href.includes('success-journey')

  return isSuccessJourney ? allSchoolsWithSuccess : allSchools
}

function getName () {
  return document.getElementById('school-name').value
}

function getCharacteristics () {
  return checkedBoxes('characteristic')
}

function getStatus () {
  return checkedBoxes('partnership-status')
}

function checkedBoxes (name) {
  return Array.from(document.getElementsByName(name))
    .filter((box) => box.checked)
    .map((box) => box.value)
}

function filterName (schools, searchTerm) {
  return schools.filter((school) => {
    return (school.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
      || (school.network.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  })
}

function filterCharacteristics (schools, characteristics) {
  const showRural = characteristics.includes('rural')
  const showPupilPremium = characteristics.includes('pupil-premium')
  return schools.filter(
    (school) =>
      (showRural && school.rural) || (showPupilPremium && school.pupilPremium)
  )
}

function filterPartneredSchools (schools) {
  return schools.filter((school) => !school.alreadyPartnered)
}

function hidePartneredSchools () {
  return !document.getElementById('partnership-status').checked
}
