<template>
    <div class="counter"> 
        <p>
            <button v-on:click="decrement()">-</button>
            {{counter}}
            <button v-on:click="increment()">+</button>
        </p>
    </div>
</template>

<script>

export default {
    name: "counter",
    props: {
        item: Object
    },
    data: function () {
        return {
            counter:0    
        }
    },
    methods:{
        increment:function() {
            if (this.counter == 10) {
                alert("You cannot buy more than 10 items.")
            } else {
                this.counter++;
            }
            this.$emit('counter', this.item, this.counter)
            console.log("increment: " + this.counter)
        },
        decrement:function() {

            if (this.counter > 0) {
                this.counter--;
            } 
            this.$emit('counter', this.item, this.counter)
            console.log("decrement: " + this.counter)
        }
    }
}

</script>

<style>

button {
    background-color: pink;
    width: 30px;
    height: 30px;
}
</style>