<template lang="pug">
    el-select(
        v-model="form.league_id",
        placeholder='请选择联赛赛区',
        @change='emitName'
    )
        el-option(
            v-for="item in leagueList",
            :key="item.league_id",
            :label="item.league_name",
            :value="item.league_id"
        )
</template>
<script>
export default {
    props: ['form'],
    data() {
        return {
            league_id: '',
            leagueList: []
        };
    },
    created() {
        this.getLeague();
    },
    updated() {
        this.emitName();
    },
    methods: {
        /**
         * 获取联赛列表
         */
        getLeague() {
            this.$axios.get('/api/backstage/league/list')
            .then(res => {
                if (res.data.status === 0) {
                    this.leagueList = res.data.data.league_list;
                }
                else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        /**
         * 传递名称
         */
        emitName() {
            let league_name = '';
            for (let index = 0; index < this.leagueList.length; index++) {
                const element = this.leagueList[index];
                if (element.league_id === this.form.league_id){
                    league_name = element.league_name;
                    break;
                }
                
            }
            this.$emit('getLeagueName', league_name);
        }
    }   
};
</script>