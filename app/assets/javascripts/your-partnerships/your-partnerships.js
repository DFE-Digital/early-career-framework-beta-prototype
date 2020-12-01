import { partneredSchools } from './data.js'

window.onload = () => {
  setupEventListeners()
  updateTable()
}

function setupEventListeners () {
  document.getElementById("sort").onchange = updateTable
}

function updateTable () {
  const tableBodyHtml = window.nunjucks.render('partnership-table-rows.html', { rows: sortedRows() })
  document.getElementById('partnership-table-body').innerHTML = tableBodyHtml
}

function sortedRows () {
  switch (getSortBy()) {
    case 'schoolName':
      return sortBySchoolName(partneredSchools)
    case 'dateAdded':
      return sortByDateAdded(partneredSchools)
    case 'partnershipStatus':
      return sortByPartnershipStatus(partneredSchools)
  }
}

function getSortBy () {
  return document.getElementById('sort').value
}

function sortBySchoolName (rows) {
  return _.sortBy(rows, row => row.name)
}

function sortByPartnershipStatus (rows) {
  return _.sortBy(rows, row => row.partnershipStatus)
}

function sortByDateAdded (rows) {
  return rows
}
