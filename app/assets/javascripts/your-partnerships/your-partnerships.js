import { partneredSchools, partneredSchoolsForSingleJourney, partneredSchoolsForCsvJourney } from './data.js'

window.onload = () => {
  setupEventListeners()
  updateTable()
}

function setupEventListeners () {
  document.getElementById('sort').onchange = updateTable
}

function updateTable () {
  const tableBodyHtml = window.nunjucks.render('partnership-table-rows.html', {
    rows: sortedRows(),
  })
  document.getElementById('partnership-table-body').innerHTML = tableBodyHtml
}

function sortedRows () {
  const arePartneredSchools = getPartnerships()

  switch (getSortBy()) {
    case 'schoolName':
      return sortBySchoolName(arePartneredSchools)
    case 'dateAdded':
      return sortByDateAdded(arePartneredSchools)
    case 'partnershipStatus':
      return sortByPartnershipStatus(arePartneredSchools)
  }
}

function getPartnerships () {
  if (onSingleJourney()) {
    return partneredSchoolsForSingleJourney
  } else if (onCsvJourney()) {
    return partneredSchoolsForCsvJourney
  }

  return partneredSchools
}

function onSingleJourney() {
  return window.location.href.includes('single')
}
function onCsvJourney() {
  return window.location.href.includes('multiple')
}

function getSortBy () {
  return document.getElementById('sort').value
}

function sortBySchoolName (rows) {
  return _.sortBy(rows, (row) => row.name)
}

function sortByPartnershipStatus (rows) {
  return _.sortBy(rows, (row) => row.partnershipStatus)
}

function sortByDateAdded (rows) {
  return rows
}
