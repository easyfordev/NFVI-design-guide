<template>
    <div class="t-result-section1">
        <p id="big-title" @click="goToHome">시스템 가상화 인프라 디자인</p>
        <p class="mid-title">{{ pageTitle }}</p>
        <div style="padding-left: 3%" >
            <h3>Draggable {{ draggingInfo }}</h3>
            <draggable
                    :list="list"
                    :disabled="!enabled"
                    class="list-group"
                    ghost-class="ghost"
                    :move="checkMove"
                    @start="dragging = true"
                    @end="dragging = false"
            >
                <div
                        class="list-group-item"
                        v-for="element in list"
                        :key="element.name"
                >
                    {{ element.name }}
                </div>
            </draggable>
            <!--<img src="../../assets/rack1.png" :style="myStyle" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onRackClicked">-->
            <!--<img src="../../assets/rack2.png" style="height: 650px; width: 200px; position: absolute; top:13%; left: 35%; border: 10px solid transparent">-->
<!--            <img src="../../assets/rack1.png" style="position: absolute; top: 12%; left: 50%;border: 10px solid transparent">-->
<!--            <img src="../../assets/rack2.png" style="height: 755px; width: 200px; position: absolute; top:13%; left: 73%;border: 10px solid transparent">-->
        </div>

    </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    name: "TResultSection1",
    components: {
        draggable,
    },
    data: function() {
        return {
            pageTitle: '',
            myStyle: 'position: absolute; top: 12%; height: 700px; border: 10px solid transparent',
            enabled: true,
            list: [
                { name: "John", id: 0 },
                { name: "Joao", id: 1 },
                { name: "Jean", id: 2 }
            ],
            dragging: false
        }
    },
    created: function() {
        this.pageTitle = 'Rack 구성도'
    },
    computed: {
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        }
    },
    methods: {
        onMouseEnter() {
            // alert("HI")
            this.myStyle = 'position: absolute; top: 12%; height: 700px; border: 10px solid lightcoral';
        },
        onMouseLeave() {
            this.myStyle = 'position: absolute; top: 12%; height: 700px; border: 10px solid transparent';
        },
        onRackClicked() {
            this.myStyle = 'position: absolute; top: 12%; height: 700px; border: 10px solid lightcoral';
            this.$router.push({
                name: 'TResultSection2'
            })
        },
        goToHome() {
            this.$router.push({
                name: 'TResultMain'
            })
        }
    }
}
</script>

<style scoped>
.t-result-section1{
    position: absolute;
    height: 100%;
    width: 40%;
    /*background-color: lightcoral;*/
}
#big-title {
    font-weight: 800;
    font-size: 20px;
    margin-left: 1%;
}
.mid-title {
    font-weight: 700;
    font-size: 18px;
    margin-left: 1%;
}
.buttons {
    margin-top: 35px;
}
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>
