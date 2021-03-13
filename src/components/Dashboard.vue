<template>
    <div>
        <u1 id="itemsList">
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </u1>
        
        <bar-chart></bar-chart>
        <api-chart></api-chart>
    </div>
</template>

<script>
import barchart from "./charts/BarChart.vue"
import apichart from "./CallAPI.vue"

export default {
    components: {
        'bar-chart': barchart,
        'api-chart': apichart
    }
}
</script>

<style scoped>

#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  list-style-type: none;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

</style>