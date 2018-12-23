<template lang="pug">
    el-row()
        el-col(:span='24')
            el-form.login-form(
                ref='form',
                :model='form',
                label-width='80px')
                el-form-item(label='用户名')
                    el-input(v-model='form.username')
                el-form-item(label='密码')
                    el-input(v-model='form.password',
                    type='password')
                <el-button :loading="loading" type='primary' @click='onSubmit'>登录</el-button>
                
</template>
<script>

export default {
    data() {
        return {
            form: {},
            loading: false
        };
    },
    created() {
        let {needLogin = false} = this.$route.query;
        if (needLogin) {
            this.$message.error('登录状态过期，请重新登录后再继续操作');
        }
    },
    methods: {
        onSubmit() {
            this.loading = true;
            let data = {
                username: this.form.username,
                password: this.form.password
            };
            this.$axios.post('api/backstage/login', data)
            .then(res => {
                this.loading = false;
                if (res.data.status === 0) {
                    this.$router.replace({
                        name: 'race'
                    });
                }
                else {
                    this.$message.error(res.data.msg || '系统异常，登录失败');
                }
            })
            .catch(err => {
                this.loading = false;
            });
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

