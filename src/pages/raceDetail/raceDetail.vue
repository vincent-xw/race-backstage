<template lang="pug">
    el-row()
        el-row.race-container
            el-col(:span='24')
                h2 比赛详情 - {{statusText}}
            el-col(:span='24')
                el-form(
                    ref='form',
                    :model='form',
                    label-width='80px',
                )
                    el-form-item(label='联赛归属')
                        el-select(
                            v-model="form.division",
                            placeholder='请选择联赛赛区'
                        )
                    el-form-item(label='马匹管理')
                        .horse-operation
                    el-form-item
                        el-button(type='primary') 新建马匹
                    el-form-item
                        el-button(type='primary') 保存
        el-row.race-container
            el-col(:span='24')
                h2 投注情况
            el-table(
                :data='betData'
            )
                el-table-column(
                    prop='id',
                    label='#'
                )
                el-table-column(
                    prop='agent',
                    label='代理'
                )
                el-table-column(
                    prop='betAmount',
                    label='投注额'
                )
                el-table-column(
                    prop='betTime',
                    label='投注时间'
                )
                el-table-column(
                    prop='',
                    label='操作'
                )
                    template(:solt-scope='scope')
                        el-button(
                            type='text',
                            size='mini'
                        )   删除
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
                  
</template>
<script>
export default {
    data() {
        return {
            form: {},
            raceDetail: {},
            betData: []
        };
    },
    methods: {

    },
    computed: {
        statusText() {
            let status = [
                '新创建',
                '已发布',
                '已结束'
            ];
            let statusIndex = this.raceDetail.status || 0;
            return status[statusIndex];
        }
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
    .horse-operation {
        border: 2px dashed #555555;
        padding: 10px 15px;
        border-radius: 4px;
    }
}
</style>

