<template>
    <div class="t-result-section2">
        <p class="mid-title" style="position: absolute; top: 0;width: 100%;height: 2%">비용 추정</p>
        <div class="cost-estimation">
        </div>

        <p class="mid-title" style="position: absolute; top: 45%;width: 100%;height: 5%">전력소모량 추정</p>
        <div class="power-estimation">
        </div>
    </div>
</template>

<script>
    export default {
        name: "TResultSection2"
    }
</script>

<style scoped>
.t-result-section2{
    position: absolute;
    height: 100%;
    right: 0;
    width: 50%;
}
.mid-title {
    font-weight: 700;
    font-size: 18px;
    margin-left: 1%;
}
.cost-estimation {
    position: absolute;
    top: 5%;
    left: 2%;
    width: 94%;
    height: 40%;
    background-color: #f4f6f6;
}
.power-estimation {
    position: absolute;
    top: 50%;
    left: 2%;
    width: 94%;
    height: 45%;
    background-color: #f4f6f6;
}
</style>
