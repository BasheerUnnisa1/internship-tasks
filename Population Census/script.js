const searchBox = document.getElementById("searchBox");

let charts = [];
let debounceTimer;

/* CREATE CHARTS */
function createCharts(population) {

  // destroy old charts (safe way)
  charts.forEach(c => c.destroy());
  charts = [];

  let base = population / 1000000;

  // LINE
  charts.push(new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: ["2005","2010","2015","2020","2026"],
      datasets: [{
        label: "Population Trend",
        data: [base*0.5, base*0.65, base*0.8, base*0.9, base]
      }]
    },
    options: { animation: false }
  }));

  // PIE
  let male = 50;
  let female = 50;

  document.getElementById("male").innerText = male + "%";
  document.getElementById("female").innerText = female + "%";

  charts.push(new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Male","Female"],
      datasets: [{
        data: [male, female]
      }]
    },
    options: {
      animation: false,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  }));

  // BAR
  charts.push(new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["0-14","15-24","25-64","65+"],
      datasets: [{
        label: "Age %",
        data: [25,18,45,12]
      }]
    },
    options: { animation: false }
  }));

  // GROWTH
  let growthData = [1.2,1.1,1.05,1.0,0.95];

  document.getElementById("growth").innerText = "0.95%";
  document.getElementById("urban").innerText = "N/A";

  charts.push(new Chart(document.getElementById("growthChart"), {
    type: "bar",
    data: {
      labels: ["2022","2023","2024","2025","2026"],
      datasets: [{
        label: "Growth %",
        data: growthData
      }]
    },
    options: { animation: false }
  }));
}

/* LOAD COUNTRY */
function loadCountry(name) {

  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(res => res.json())
    .then(data => {

      let country = data.find(c =>
        c.name.common.toLowerCase() === name.toLowerCase()
      ) || data[0];

      let population = country.population;

      document.getElementById("population").innerText =
        (population/1000000).toFixed(1) + "M";

      document.getElementById("countryTitle").innerText =
        country.name.common + " Population";

      createCharts(population);
    });
}

/* SEARCH (DEBOUNCE) */
searchBox.addEventListener("input", function () {

  clearTimeout(debounceTimer);

  let value = this.value.trim();
  if (value.length < 2) return;

  debounceTimer = setTimeout(() => {
    loadCountry(value);
  }, 600); // slightly more delay = less jumping
});

/* DEFAULT INDIA */
window.onload = () => loadCountry("india");