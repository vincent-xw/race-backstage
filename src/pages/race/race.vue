<template lang="pug">
    el-row()
        el-row.race-container
            el-col(:span='24')
                h2 比赛信息
            el-col(:span='24')
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
                    el-form-item(label='比赛类型')
                        el-select(
                            v-model="form.type",
                            placeholder='请选择比赛类型'
                        )
                    el-form-item
                        el-button(type='primary') 搜索
                        el-button(type='primary') 创建比赛
        el-row.race-container
            el-table(
                :data='raceData'
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
                el-table-column(
                    prop='raceStatus',
                    label='比赛状态'
                )
            el-pagination(
                class='race-pagination'
                layout='prev, pager, next',
                :total='50'
            )
                  
</template>
<script>
export default {
    data() {
        return {
            form: {},
            raceData: []
        };
    },
    methods: {

    }
};
</script>
<style lang="less">
.race-container {
    padding: 10px;
    border-radius: 4px;
    background: #ffffff;
    margin-bottom: 10px;
    .race-pagination {
        text-align: center;
    }
}
</style>

