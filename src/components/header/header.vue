<template lang="pug">
    el-row
        el-col(:span='21')
            span.main-title 欢迎使用赛马管理后台
        el-col(:span='3',
            v-if="isLogin"
        )
            .user-operation 欢迎登录:管理员
    
</template>
<script>
export default {
    props: ['isLogin'],
    data() {
        return {};
    },
    methods: {

    }
};
</script>
<style lang="less">
header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
    background: #ffffff;
    border: 0;
    .logo {
        width: 100px;
        height: 100%;
        float: left;
    }
    .main-title {
        font-size: 24px;
        font-weight: bold;
        line-height: 60px;
    }
    .user-operation {
        line-height: 60px;
        text-align: right;
    }
}
</style>
