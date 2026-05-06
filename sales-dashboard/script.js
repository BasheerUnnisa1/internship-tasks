// 1 BAR
new Chart(barChart, {
  type: "bar",
  data: {
    labels: ["Electronics","Clothing","Food","Books","Other"],
    datasets: [{ data: [300,220,180,140,200], backgroundColor: "#3b82f6" }]
  },
  options: { plugins: { legend: { display: false } } }
});

// 2 LINE
new Chart(lineChart, {
  type: "line",
  data: {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [{ data: [120,150,180,170,210,240,260], borderColor: "#22c55e", tension: 0.4 }]
  },
  options: { plugins: { legend: { display: false } } }
});

// 3 AREA
new Chart(areaChart, {
  type: "line",
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{
      data: [400,500,650,600,750,900],
      borderColor: "#a855f7",
      backgroundColor: "rgba(168,85,247,0.3)",
      fill: true
    }]
  },
  options: { plugins: { legend: { display: false } } }
});

// 4 REGION BAR
new Chart(regionChart, {
  type: "bar",
  data: {
    labels: ["North","South","East","West"],
    datasets: [{ data: [200,250,180,220], backgroundColor: "#f59e0b" }]
  },
  options: { plugins: { legend: { display: false } } }
});

// 5 PIE
new Chart(pieChart, {
  type: "pie",
  data: {
    labels: ["Completed","Pending","Cancelled"],
    datasets: [{ data: [70,20,10], backgroundColor: ["#22c55e","#facc15","#ef4444"] }]
  }
});

// 6 PROFIT
new Chart(profitChart, {
  type: "line",
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{ data: [50,80,120,100,140,180], borderColor: "#06b6d4", tension: 0.4 }]
  },
  options: { plugins: { legend: { display: false } } }
});