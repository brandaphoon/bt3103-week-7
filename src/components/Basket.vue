<template>
    <div>
        <h1>Menu</h1>
        <ul>
            <li v-bind:key="item[0]" v-for="item in itemsSelected">
                <h2>{{item[0] + " x " + item[1]}}</h2>
            </li>
        </ul>
        <button class="button" v-on:click="findTotal">Calculate Total</button>
        <h3 v-show="clicked">Subtotal: ${{this.subTotal}} </h3>
        <h3 v-show="clicked">Grand Total: ${{ calcGrand }} </h3>
        <button class="button" v-show="clicked" v-on:click="sendOrder">Send Order</button>
    </div>
</template>



<script>
import database from "../firebase.js"

export default {
    data: function() {
        return {
            subTotal:0,
            clicked: false
        }
    },
    props: {
        itemsSelected: Array
    },
    computed:{
        calcGrand: function() {
            
            return Math.round(this.subTotal*1.07*100)/100
        }
    },
    methods: {
        findTotal: function(){
            var total = 0;
            this.clicked=true;
            console.log(this.itemsSelected)
            for (let i=0; i < this.itemsSelected.length; i++) {
                const curr_item = this.itemsSelected[i];
                total +=(curr_item[1] * curr_item[2])
            }

            this.subTotal=total;
        },
        sendOrder:function() {

            var order = [{name: "Prawn omelette", count: 0}, 
                {name: "Dry Beef Hor Fun", count: 0}, 
                {name: "Sambal KangKung", count: 0}, 
                {name: "Pork Fried Rice", count: 0}, 
                {name: "Mapo Toufu", count: 0}, 
                {name: "Cereal Prawn", count: 0},
            ]

            order.forEach(order => {
                this.itemsSelected.forEach(item => {

                    if (item[0] == order.name) {
                        order.count = item[1] 
                    }
                
            });

            })

            database.collection('orders').add({order}).then(()=> {
                location.reload();
            })
            

        }
    }
}
</script>

<style scoped>

.button {
  background-color: #c88be4; /* Green */
  border: none;
  color: black;
  padding: 15px 32px;
  display: inline-block;
  font-size: 16px;
  width: 200px;
  height: 50px;
}


</style>