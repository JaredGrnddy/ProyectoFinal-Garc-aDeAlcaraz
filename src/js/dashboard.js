
const divTotalContacts = document.getElementById('totalContacts');
const divTotalCustomers = document.getElementById('totalCustomers');
const divTotalCompanies = document.getElementById('totalCompanies');
const canvas = document.getElementById('myChart');

let totalContacts = 0;

if (localStorage.getItem('totalContacts')) {
    totalContacts = parseInt(localStorage.getItem('totalContacts'));
}

divTotalContacts.innerText = `Total de contactos: ${totalContacts}`;

let totalCustomers = 0;

if (localStorage.getItem('totalCustomers')) {
    totalCustomers = parseInt(localStorage.getItem('totalCustomers'));
}

divTotalCustomers.innerText = `Total de clientes: ${totalCustomers}`;

let totalCompanies = 0;

if (localStorage.getItem('totalCompanies')) {
    totalCompanies = parseInt(localStorage.getItem('totalCompanies'));
}

divTotalCompanies.innerText = `Total de empresas: ${totalCompanies}`;

//! GRAFICO

let chartData = {
  labels: ['Contactos', 'Clientes', 'Empresas'],
  datasets: [{
    label: 'Cantidad',
    data: [totalContacts, totalCustomers, totalCompanies],
    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
    borderColor: ['#ff6384', '#36a2eb', '#ffce56'],
    borderWidth: 1
  }]
};

if (totalContacts === 0 && totalCustomers === 0 && totalCompanies === 0) {
  chartData = {
    labels: ['Sin datos'],
    datasets: [{
      label: 'Cantidad',
      data: [1],
      backgroundColor: ['gray'],
      borderWidth: 0
    }]
  };
}

const chart = new Chart(canvas, {
  type: 'doughnut',
  data: chartData,
  options: {
    legend: {
      position: 'bottom',
      align: 'start',
      labels: {
        fontColor: '#333',
        fontSize: 14,
        generateLabels: function(chart) {
          const data = chart.data.datasets[0].data;
          const colors = chart.data.datasets[0].backgroundColor;
          const labels = chart.data.labels;
          return labels.map(function(label, index) {
            return {
              text: label + ' (' + data[index] + ')',
              fillStyle: colors[index],
              strokeStyle: colors[index],
              lineWidth: 1,
              hidden: false,
              index: index
            };
          });
        },
        position: 'right'
      },
      maxWidth: 200
    },
    tooltips: {
      backgroundColor: '#fff',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 12,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest'
    },
    title: {
      display: true,
      text: 'Totales',
      fontSize: 16,
      fontColor: '#333'
    }
  }
});

chart.update();



  
  
  
