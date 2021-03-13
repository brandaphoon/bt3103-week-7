import { Bar } from 'vue-chartjs'
import database from "/src/firebase.js"

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: ["Prawn omelete", "Dry Beef Hor Fun", "Sambal Kang Kung", "Pork Fried Rice", "Mapo Toufu", "Cereal Prawn"],
            datasets: [ {
              data:[],
              borderColor:"#000",
              backgroundColor: ['#ff6384','#36a2eb', '#cc65fe','#ffce56', '#7C1', "#FF5733"]
            }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchData : function() {
        
        database.collection('orders').get().then(snapshot => {
          var sum = [0,0,0,0,0,0];
          let order = {};
          snapshot.docs.forEach(doc => {
              order = Object.values(doc.data().order);
              for(var i = 0; i < order.length; i++){
                sum[i] += order[i].count;
              }
          })
          sum.forEach(count => {
            this.datacollection.datasets[0].data.push(count);
          })
          this.renderChart(this.datacollection, this.options)
        })
        
        console.log(this.datacollection.datasets[0].data);
    }
  }, 
  created () {
    this.fetchData();
  }
} 
