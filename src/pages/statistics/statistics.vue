<template lang="pug">
    el-row()
        el-row.statistics-container
            el-col(:span='24')
                h2 报表统计
                el-form(
                    ref='form',
                    :model='form',
                    label-width='80px',
                    :inline='true'
                )
                    el-form-item(label='时间')
                        el-date-picker(
                            v-model="form.date",
                            type='daterange',
                            range-separator='至',
                            start-placeholder='开始日期',
                            end-placeholder='结束日期'
                        )
                    el-form-item(label='联赛归属')
                        el-select(
                            v-model="form.division",
                            placeholder='请选择联赛赛区'
                        )
                    el-form-item(label='统计类型')
                        el-select(
                            v-model="form.type",
                            placeholder='请选择比赛类型'
                        )
                    el-form-item
                        el-button(type='primary', @click="getData") 搜索
        el-row.statistics-container
            el-table(
                :data='statisticsData'
            )
                el-table-column(
                    prop='id',
                    label='#'
                )
                el-table-column(
                    prop='division',
                    label='联赛归属'
                )
                el-table-column(
                    prop='raceTime',
                    label='比赛时间'
                )
                el-table-column(
                    prop='createdTime',
                    label='创建时间'
                )
                el-table-column(
                    prop='totalBet',
                    label='总投注'
                )
                el-table-column(
                    prop='totalWin',
                    label='总盈利'
                )
                el-table-column(
                    prop='playerTotalWin',
                    label='玩家总盈利'
                )
            el-pagination(
                class='statistics-pagination'
                layout='prev, pager, next',
                :total='50'
            )
                  

</template>
<script>
export default {
    data() {
        return {
            form: {},
            statisticsData: []
        };
    },
    methods: {
        getData() {
            this.$axios.post('/api/backstage/stat', this.form).then(res => {

            });
        }
    }
};
</script>
<style lang="less">
.statistics-container {
    padding: 10px;
    border-radius: 4px;
    background: #ffffff;
    margin-bottom: 10px;
    .statistics-pagination {
        text-align: center;
    }
}
</style>

