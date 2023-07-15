document.addEventListener("DOMContentLoaded", function () {
  initializeCode();
});

function initializeCode() {
  fetch("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff")
    .then((response) => response.json())
    .then((data) => {
      const populationValues = data.dataset.value;
      fetch(
        "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
      )
        .then((response) => response.json())
        .then((employmentData) =>
          populateTable(data, employmentData, populationValues)
        )
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}

function populateTable(data, employmentData, populationValues) {
  const table = document.getElementById("municipality-table");
  const tableBody = table.querySelector("tbody");

  // Clear the existing table data
  tableBody.innerHTML = "";

  // Extract the municipality labels from the data
  const municipalities = data.dataset.dimension.Alue.category.label;

  // Extract the employment values from the employment data
  const employmentValues = employmentData.dataset.value;

  // Limit the number of rows to 11
  const rowCount = Math.min(11, municipalities.length);

  // Loop through the data and create table rows
  for (let i = 0; i < rowCount; i++) {
    const municipality = municipalities[i];
    const population = populationValues[i];
    const employment = employmentValues[i];

    const row = document.createElement("tr");
    const municipalityCell = document.createElement("td");
    const populationCell = document.createElement("td");
    const employmentCell = document.createElement("td");
    const additionalCell = document.createElement("td");

    municipalityCell.textContent = municipality;
    populationCell.textContent = population;
    employmentCell.textContent = employment;
    additionalCell.textContent = "Additional Data";

    row.appendChild(municipalityCell);
    row.appendChild(populationCell);
    row.appendChild(employmentCell);
    row.appendChild(additionalCell);

    tableBody.appendChild(row);
  }
}
