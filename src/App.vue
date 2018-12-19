<template lang="pug">
    el-container#app
        el-header 
            headerBar(:isLogin="!isLogin")
        el-aside(v-if="!isLogin")
            el-menu.nav-bar(
                default-active="2",
                class="el-menu-vertical-demo"
            )
                el-menu-item(index="1")
                    template
                        i.el-icon-location
                        span(
                        @click="jumpTo('race')"
                        ) 比赛管理
                el-menu-item(index="2")
                    template
                        i.el-icon-location
                        span(
                        @click="jumpTo('agent')"
                        ) 代理管理
                el-menu-item(index="3")
                    template
                        i.el-icon-location
                        span(
                        @click="jumpTo('statistics')"
                        ) 数据统计
                el-menu-item(index="4")
                    template
                        i.el-icon-location
                        span(
                        @click="jumpTo('league')"
                        ) 联赛管理
        el-main(:class="{'no-margin':isLogin}") 
            router-view 
</template>


<script>

import headerBar from '@/components/header/header';
export default {
    name: 'app',
    data() {
        return {
            isLogin: false
        };
    },
    components: {
        headerBar
    },
    mounted() {
        // 判定登录页面样式修改
        this.$router.afterEach(to => {
            if (to.name === 'login') {
                this.isLogin = true;
            }
            else {
                this.isLogin = false;
            }
        });
    },
    methods: {
        jumpTo(routeName) {
          this.$router.push({name: routeName})
        }
    }
}
</script>
<style lang="less">
html {
    background: #f5f5f5;
    body {
        margin: 0;
        .el-container {
            padding-top: 61px;
            .el-aside {
                background: #ffffff;
                position: absolute;
                height: 100%;
                box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
                overflow: hidden !important;
                .nav-bar {
                    width: 100%;
                }
            }
            .el-main {
                margin-left: 300px;
                overflow: auto;
            }
            .no-margin {
                margin-left: 0;
            }
        }
    }  
}

</style>

