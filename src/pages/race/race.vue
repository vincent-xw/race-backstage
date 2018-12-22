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
                            value-format='timestamp',
                            range-separator='至',
                            start-placeholder='开始日期',
                            end-placeholder='结束日期'
                        )
                    el-form-item(label='联赛归属')
                        el-select(
                            v-model="form.leagueId",
                            placeholder='请选择联赛赛区'
                        )
                            el-option(
                                v-for="item in leagueList",
                                :key="item.league_id",
                                :label="item.league_name",
                                :value="item.league_id"
                            )
                    el-form-item(label='比赛类型')
                        el-select(
                            v-model="form.type",
                            placeholder='请选择比赛类型'
                        )
                            el-option(
                                label="未开始",
                                value="0"
                            )
                            el-option(
                                label="已发布",
                                value="1"
                            )
                            el-option(
                                label="已结束",
                                value="3"
                            )
                    el-form-item
                        el-button(type='primary', @click="getRaceList") 搜索
                        el-button(type='primary') 创建比赛
        el-row.race-container
            el-table(
                :data='raceData',
                v-loading='loading'
            )
                el-table-column(
                    prop='race_id',
                    label='#'
                )
                el-table-column(
                    prop='league_name',
                    label='联赛归属'
                )
                el-table-column(
                    prop='race_time',
                    label='比赛时间'
                )
                el-table-column(
                    prop='created_time',
                    label='创建时间'
                )
                el-table-column(
                    prop='race_status',
                    label='比赛状态'
                )
            el-pagination(
                class='race-pagination'
                layout='prev, pager, next',
                :page-count='pageSize',
                :current-page.sync='currentPage',
                @current-change='getRaceList'
            ) 
</template>
<script>
export default {
    data() {
        return {
            form: {
                date: [
                    new Date().getTime() - 86400000,
                    new Date().getTime()
                ],
                leagueId: '',
                type: ''
            },
            raceData: [],
            leagueList: [],
            pageSize: 1,
            currentPage: 1,
            loading: false
        };
    },
    mounted() {
        this.getLeague();
        this.getRaceList();
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
         * 获取比赛列表
         */
        getRaceList() {
            this.loading = true;
            let data = {
                start_time: this.form.date[0],
                end_time: this.form.date[1],
                league_id: this.form.leagueId || '',
                race_status: this.form.race_status,
                page_no: this.currentPage
            };
            for (const item in data) {
                if (data[item] === '') {
                    delete data[item];
                }
            }
            this.$axios.get('api/backstage/race/list' + '?' + this.$qs.stringify(data))
            .then(res => {
                if (res.data.status === 0) {
                    this.raceData = res.data.data.list_data;
                    this.loading = false;
                    this.pageSize = res.data.data.page_count;
                    this.currentPage = +res.data.data.page_no || 1;
                }
                else {
                    this.$message.error(res.data.msg);
                }
            });
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
}
</style>

