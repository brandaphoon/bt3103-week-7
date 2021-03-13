import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [
            { 
                label: "west",
                data: [],
                fill: false,
                backgroundColor: '#ff6384',
                borderColor: '#ff6384',
            },
            { 
                label: "national",
                data: [],
                fill: false,
                backgroundColor: '#36a2eb',
                borderColor: '#36a2eb',
            },
            { 
                label: "east",
                data: [],
                fill: false,
                backgroundColor: '#cc65fe',
                borderColor: '#cc65fe',
            },
            { 
                label: "central",
                data: [],
                fill: false,
                backgroundColor: '#ffce56',
                borderColor: '#ffce56',
            },
            { 
                label: "south",
                data: [],
                fill: false,
                backgroundColor: '#7C1',
                borderColor: '#7C1'
            },
            { 
                label: "north",
                data: [],
                fill: false,
                backgroundColor: "#FF5733",
                borderColor: "#FF5733",
            },
        ]
        },
        options: {
            legend: { display: true,},
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            var items = response.data.items;
            items.forEach(item => {
                this.datacollection.labels.push(item.timestamp);
                var tf_psi = Object.values(item.readings.psi_twenty_four_hourly);

                for(var i=0; i < tf_psi.length; i++){
                    this.datacollection.datasets[i].data.push(tf_psi[i])
                }
         
               
            })
            console.log(this.datacollection.datasets)
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}
