<template>
    <div class="t-input-section1">
        <p>시스템 정보</p>
        <div class="user-form">
            <!--<label>-->
                <!--Service Name-->
                <!--<input type="text" id="name">-->
            <!--</label>-->
            <label>
                Workload 선택
                <select style="margin-right: 10px" class="type-dropdown" v-model="workloadType">
                    <option>Signaling</option>
                    <option>User Plain</option>
                    <option>ETC</option>
                </select>
                <input type="text" v-model="workloadName" style="width: 100px"/>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: "TInputSection1",
    data: function () {
        return{
            workloadType: '',
            workloadName: ''
        }
    },
    watch: {
        workloadType: function () {
            this.$store.commit('app/workloadType', this.workloadType);
        },
        workloadName: function () {
            this.$store.commit('app/workloadName', this.workloadName);
        },
    }
}
</script>

<style scoped>
.t-input-section1{
    position: absolute;
    margin-top: 0%;
    height: 10%;
    width: 100%;
}
.user-form {
    background-color: #f4f6f6;
    /*height: 75%;*/
    margin-left: 2%;
    margin-right: 2%;
    padding: 5px;
}
p {
    /*color: white;*/
    font-weight: 800;
    font-size: 20px;
    margin-left: 1%;
}
label {
    margin-left: 2%;
    font-weight: 600;
    font-size: 15px;
    color: #555555;
}
.type-dropdown{
    /*width: 200px;*/
    height: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 #a6b7cd;
    background-color: #ffffff;
}
</style>
