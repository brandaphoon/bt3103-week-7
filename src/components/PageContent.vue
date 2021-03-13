<template>
    <div id = "pageContent">
        <u1 id="itemsList">
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </u1>
        <ul id="itemsList">
            <li v-bind:key="item.id" v-for="item in items">
                <h2 id="itemName">{{item.name}}</h2>
                <img v-bind:src="item.imageURL">
                <p id="price">{{"$" + item.price}}</p>
                <counter v-bind:item="item" v-on:counter="onCounter"/>
            </li>
        </ul> 
        <basket v-bind:itemsSelected="itemsSelected" id="shoppingBasket"/>
    </div>
</template>


<script>
import basket from './Basket.vue'
import database from "../firebase.js"

export default {
    data: function() {
        return {
            itemsSelected: [],
            items:[]
        
        }
    },
    components: {
        basket
    },
    methods: {
        fetchItems: function() {
            
            database.collection('menu').get().then(snapshot => {
                let item = {}
                snapshot.docs.forEach(doc => {
                    item=doc.data()
                    item.show=false
                    item.id=doc.id
                    this.items.push(item) 
                });
            });

        },
        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {

                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];

                    if (item_name == item.name && count > 0) {
                        // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                        this.$set(curr_item, 1, count);
                        //this.$set(this.itemsSelected, i, [item_name,count,item.price])

                        console.log("Update Counter")
                        console.log(this.itemsSelected)

                        break;

                    } else if (item_name == item.name && count === 0) {
                        // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                        this.itemsSelected.splice(i, 1);
                        
                        console.log("removed" );
                        
                        break;
                        
                    } else if (i != this.itemsSelected.length-1) {
                        
                        continue;

                    } else  {
                        // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.

                        this.itemsSelected.push([item.name, count, item.price]);

                        console.log("Pushed new order")
                        break;
                    }
                
                }
            }
            },
    },
    created() {
        this.fetchItems();

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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 35%;
  left: 78%;
}


</style>