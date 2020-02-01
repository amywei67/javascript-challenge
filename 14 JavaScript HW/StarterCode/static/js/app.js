// from data.js
var tableData = data;

var tbody = d3.select("tbody");

function buildTable(data) {
  tbody.html("");

  data.forEach((dataRow) => {
    // Create row. 
    var row = tbody.append("tr");

    // Loop through each field.
    Object.values(dataRow).forEach((val) => {
      var cell = row.append("td");
      cell.text(val);
    });
  });
}

// Keep Track of all filters
var filters = {};

function updateFilters() {

  // Update filter input.
  var changedInput = d3.select(this).select("input");
  var inputValue = changedInput.property("value");
  var filterId = changedInput.attr("id");

  // Add filterId to the filters list if inputValue is not empty.
  if (inputValue) {
    filters[filterId] = inputValue;
  }
  else {
    delete filters[filterId];
  }

  // Apply filters and rebuild the table.
  filterTable();

}

function filterTable() {

  let filteredData = tableData;

  // Filter the matched data.
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  // Rebuild the table with filtered Data.
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter.
d3.selectAll(".filter").on("change", updateFilters);
