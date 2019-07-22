<template>
    <div class="t-input-section1">
        <p>시스템 정보</p>
        <div class="user-form">
            <label>
                Service Name
                <input type="text" id="name">
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: "TInputSection1"
}
</script>

<style scoped>
.t-input-section1{
    position: absolute;
    margin-top: 1%;
    height: 10%;
    width: 100%;
}
.user-form {
    background-color: #f4f6f6;
    /*height: 75%;*/
    margin-left: 2%;
    margin-right: 2%;
    padding: 10px;
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
</style>
