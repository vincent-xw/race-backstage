<template lang="pug">
    el-select(
        v-model="form.id",
        placeholder='请选择代理名称',
        clearable,
        :loading='agentLoading'
    )
        el-option(
            v-for="item in agentList",
            :key="item.id",
            :label="item.agent_name",
            :value="item.id"
        )
</template>
<script>
export default {
    props: ['form'],
    data() {
        return {
            agent_id: '',
            agentList: [],
            agentLoading: false
        };
    },
    created() {
        this.getAgent();
    },
    methods: {
        /**
         * 获取联赛列表
         */
        getAgent() {
            this.agentLoading = true;
            this.$axios.get('/api/backstage/agent/list')
            .then(res => {
                this.agentLoading = false;
                if (res.data.status === 0) {
                    this.agentList = res.data.data.agent_list;
                }
                else {
                    this.$message.error(res.data.msg);
                }
            })
            .catch(err => {
                this.agentLoading = false;
            });
        }
    }   
};
</script>