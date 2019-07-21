<template>
    <div class="t-input-section2">
        <p>Hardware Specification</p>
        <div class="hw-selector">
            <button class="ui inverted button" v-on:click="toggleCategory()" style="width: 100%;"><i class="tag icon"></i> Category</button>
            <div class="category" v-if="toggleCat">
                <button class="ui inverted button">Standard</button>
                <button class="ui inverted red button">Red</button>
                <button class="ui inverted orange button">Orange</button>
            </div>
            <button class="ui inverted button2" style="width: 100%">Category2</button>
        </div>
        <div class="hw-specific">
        </div>
    </div>
</template>

<script>
export default {
    name: "TInputSection2",
    data: function() {
        return {
            toggleCat: false
        }
    },
    methods: {
        toggleCategory: function(){
            this.toggleCat = !this.toggleCat;
        }
    }
}
</script>

<style scoped>
.t-input-section2{
    position: absolute;
    background-color: blue;
    top: 21%;
    margin-top: 1%;
    height: 70%;
    width: 100%;
}
.hw-selector {
    position: absolute;
    background-color: white;
    top: 8%;
    left: 2%;
    height: 87%;
    width: 25%;
}
.hw-specific {
    position: absolute;
    background-color: yellowgreen;
    top: 8%;
    right: 2%;
    height: 87%;
    width: 70%;
}
p {
    color: white;
    margin-left: 2%;
}
</style>
