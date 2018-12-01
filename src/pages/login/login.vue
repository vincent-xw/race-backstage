<template lang="pug">
    el-container
        el-header 
            headerBar
        el-main 这里是内容
</template>
<script>
import headerBar from '@/components/header/header';

export default {
    data() {
        return {};
    },
    components: {
        headerBar
    },
    methods: {

    }
};
</script>
<style lang="less">
body {
    margin: 0;
}
html {
    background: #f5f5f5;
}
</style>

