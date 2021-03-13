<template>
    <div id = "orders">
        <u1 id="itemsList">
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </u1>
        <ul>
            <li v-for="order in orders" v-bind:key="order.id">
                <p v-bind:key="o.name" v-for="o in order.order">{{o.name + ":" + o.count}}</p>
                <button v-bind:id="order.id" v-on:click="deleteItem($event)">Delete</button>
                <button v-bind:id="order.id" v-on:click="route($event)">Modify</button>
            </li>
        </ul> 
    </div>
</template>

<script>
import database from "../firebase.js"
export default {
    name:"orders",
    data: function() {
        return {
            orders: [],
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then(snapshot => {
                
                snapshot.docs.forEach(doc => {
                    let order = [];
                    order = doc.data();
                    order.id = doc.id;

                    this.orders.push(order);
                });
            });
           console.log(this.orders)
        },
        deleteItem: function(event) {

            let doc_id = event.target.getAttribute("id") 
            database.collection('orders').doc(doc_id).delete();
            location.reload();
        },
        route: function(event) {
            let doc_id = event.target.getAttribute("id")
            this.$router.push({name: "modify", params: {id : doc_id}});
        }
    },
    created() {
        this.fetchItems();
        
    }
}
</script>

<style scoped>

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  list-style-type: none;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button  {
  width: 100px;
  height: 40px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  margin: 5px;
}

</style>
