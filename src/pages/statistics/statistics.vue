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
                            :unlink-panels='true',
                            range-separator='至',
                            start-placeholder='开始日期',
                            end-placeholder='结束日期',
                            value-format='timestamp'
                        )
                    el-form-item(label='联赛归属')
                        league-list(:form='form', @getLeagueName="getLeagueName")
                    el-form-item(label='统计类型')
                        el-select(
                            v-model="form.type",
                            placeholder='请选择比赛类型'
                        )
                            el-option(
                                key="year",
                                label="年",
                                value="year"
                            )
                            el-option(
                                key="month",
                                label="月",
                                value="month"
                            )
                            el-option(
                                key="day",
                                label="日",
                                value="day"
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
                    prop='league_id',
                    label='联赛归属'
                )
                el-table-column(
                    prop='bet_time',
                    label='投注时间'
                )
                el-table-column(
                    prop='all_count',
                    label='总投注'
                )
                el-table-column(
                    prop='win_count',
                    label='总盈利'
                )
                el-table-column(
                    prop='',
                    label='玩家总盈利'
                )
                    template(slot-scope = 'scope') {{scope.row.all_count - scope.row.win_count}}

                  

</template>
<script>
import leagueList from '@/components/leagueList/leagueList';
export default {
    data() {
        return {
            form: {},
            statisticsData: [],
            league_name: ''
        };
    },
    components: {
        leagueList
    },
    methods: {
        getData() {
            this.$axios.post('/api/backstage/stat', this.form).then(res => {
                if (res.data.data.list instanceof Array) {
                    this.statisticsData = res.data.data.list;
                    return;
                }
                this.statisticsData = [res.data.data.list];
            });
        },
        /**
         * 获取league_name
         */
        getLeagueName(name) {
            this.league_name = name;
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

