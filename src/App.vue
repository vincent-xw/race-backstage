<template lang="pug">
    #app
        el-container
            el-header 
                headerBar
            el-aside(v-if="isLogin") aside
            el-main 
                router-view 
</template>


<script>

import headerBar from '@/components/header/header';
export default {
    name: 'app',
    data() {
        return {
            isLogin: true
        };
    },
    components: {
        headerBar
    },
}
</script>
<style lang="less">
    .el-aside {
        background: #ffffff;
        padding-top: 61px;
        position: absolute;
        height: 100%;
        box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
    }
    .el-main {
        margin-left: 300px;
        overflow: auto;
    }
</style>

