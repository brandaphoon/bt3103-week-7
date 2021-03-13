<template>
    <div>
        <div id=orderDetails v-for="(item, index) in datapacket" v-bind:key="item.name">
            <p>{{item.name + " : " + item.count}}</p>
            <input placeholder=0 type="number" min="0" v-model=updatedField[index]>
        </div>
        <br>
        <button v-on:click="updateOrder">Update Order</button> 
    </div>
</template>

<script>
import database from "../firebase.js"
export default {
    data: function() {
        return {
            datapacket: [],
            id: "",
            updatedField: [0,0,0,0,0,0]
        }
    },
    methods:  {
        fetchItems: function() {
            database.collection('orders').doc(this.id).get().then(snapshot => {
                var snap = snapshot.data();
                var result = Object.keys(snap).map((key) => snap[key]);
                result[0].forEach(element => {
                    this.datapacket.push(element);
                });
            });
            console.log(this.datapacket)
        },
        updateOrder: function() {
            var order = this.datapacket;
            for (var i = 0; i < order.length; i++) {
                order[i].count = parseInt(this.updatedField[i])

            }
            database.collection("orders").doc(this.id).set({order});
            this.$router.push({name: "orders"});
            
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.fetchItems();
        
    }
}
</script>

<style scoped>
button  {
  width: 100px;
  height: 40px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}

</style>