<template lang="pug">
    el-row()
        el-col(:span='24')
            el-form.login-form(
                ref='form',
                :model='form',
                label-width='80px')
                el-form-item(label='用户名')
                    el-input(v-model='form.name')
                el-form-item(label='密码')
                    el-input(v-model='form.name',
                    type='password')
                <el-button type='primary' @click='onSubmit'>登录</el-button>
                
</template>
<script>

export default {
    data() {
        return {
            form: {}
        };
    },
    methods: {
        onSubmit() {

        }
    }
};
</script>
<style lang="less">
.login-form {
    width: 550px;
    margin: 0 auto;
    padding: 50px;
    border-radius: 4px;
    background: #ffffff;
    text-align: center;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
}
</style>

