var options = {
  series: [{
    name: 'cambio',
    data: [
      {
          x: new Date("2018-02-12").getTime(),
          y: 5.18,
        },
        {
          x: new Date("2018-02-13").getTime(),
          y: 5.3,
        },
        {
          x: new Date("2018-02-14").getTime(),
          y: 5.18,
        },
        {
          x: new Date("2018-02-15").getTime(),
          y: 5.11,
        },
        {
          x: new Date("2018-02-16").getTime(),
          y: 5.18,
        },
        {
          x: new Date("2018-02-17").getTime(),
          y: 5.25,
        },
        {
          x: new Date("2018-02-18").getTime(),
          y: 5.18,
        },
        {
          x: new Date("2018-02-19").getTime(),
          y: 5.2,
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  yaxis: {
    min: 5,
    tickAmount: 4,
    labels: {
      formatter: (value) => {
        return value.toFixed(1)
      },
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    axisTicks: {
      show: false,
    },
  },
  fill: {
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opcaityTo: 0.9,
      stops: [0, 90, 100],
    },
  },
  colors: ["#7C3AED"],
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      return `<div class="tooltip">
      <span>${String(series[seriesIndex][dataPointIndex]).replace('.', ',')}</span>
      <span>${new Date(
        w.globals.seriesX[seriesIndex] [dataPointIndex]
      ).toLocaleDateString("pt-BR", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })}</span>
      </div>`
    },
  },
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();

/**** */
"use strict";

const label_from_currency = document.getElementById('from_currency');
const input_from_ammount = document.getElementById('from_ammount');
const label_to_currency = document.getElementById('to_currency');
const input_to_ammount = document.getElementById('to_ammount');

const tax_info = document.getElementById('tax_info');
const swap = document.getElementById('swap');

label_from_currency.addEventListener('change', calculate);
input_from_ammount.addEventListener('input', calculate);
label_to_currency.addEventListener('change', calculate);
input_to_ammount.addEventListener('input', calculate);
swap.addEventListener('click', infoSwap);

main();

function main() {
  let currency = { "BRL": "Real", "EUR": "Euro", "USD": "Dollar" };
  let options = [];
  for (var [key, value] of Object.entries(currency)) {
    options.push(`<option value='${key}'>${value}</option>`);
  }
  label_from_currency.innerHTML = options.join('\n');
  label_to_currency.innerHTML = options.join('\n');
  calculate();
}

function infoSwap() {
  let temp = label_from_currency.value;
  label_from_currency.value = label_to_currency.value;
  label_to_currency.value = temp;
  calculate();
}

async function getURL(url) {
  return (await fetch(url)).json();
}

function getInfoSelect(select) {
  return select.options[select.selectedIndex].text;
}

async function calculate() {
  let from = label_from_currency.value;
  let to = label_to_currency.value;
  let { rates } = await getURL(`https://api.exchangerate-api.com/v4/latest/${from}`);
  let rate = rates[to];
  tax_info.innerText = `1 ${getInfoSelect(label_from_currency)} = ${rate} ${getInfoSelect(label_to_currency)}`
  input_to_ammount.value = (input_from_ammount.value * rate).toFixed(2);
}