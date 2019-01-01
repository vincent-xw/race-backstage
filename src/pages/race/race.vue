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
                        league-list(:form='form')
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
                        el-button(type='primary', @click="getRaceList", :loading='loading') 搜索
                        el-button(type='text', @click="gotoCreateRace") 创建比赛
        el-row.race-container
            el-table(
                :data='raceData',
                v-loading='loading',
                @cell-click='getDetail'
            )
                el-table-column(
                    align='center',
                    prop='race_id',
                    label='#'
                )
                el-table-column(
                    align='center',
                    prop='league_name',
                    label='联赛归属'
                )
                el-table-column(
                    align='center',
                    prop='race_time',
                    label='比赛时间',
                    :formatter='timeFormatter'
                )
                el-table-column(
                    align='center',
                    prop='created_time',
                    label='创建时间',
                    :formatter='timeFormatter'
                )
                el-table-column(
                    align='center',
                    prop='race_status',
                    label='比赛状态',
                    :formatter='raceStatusFromatter'
                )
                el-table-column(
                    align='center',
                    prop='',
                    label='操作'
                )
                    template(
                        slot-scope='scope'
                    )
                        el-button(type='text', @click='delRace(scope.row)') 删除
                        el-button(type='text', v-if="scope.row.race_status == 0", @click="startRace(scope.row)", :loading='startLoading') 发布比赛
            el-pagination(
                class='race-pagination'
                layout='prev, pager, next',
                :page-count='pageSize',
                :current-page.sync='currentPage',
                @current-change='getRaceList'
            ) 
</template>
<script>
import leagueList from '@/components/leagueList/leagueList';
import mixins from '@/public/mixins/mixins';
export default {
    mixins: [mixins],
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
            pageSize: 1,
            currentPage: 1,
            loading: false,
            startLoading: false,
            endLoading: false
        };
    },
    components: {
        leagueList
    },
    mounted() {
        this.getRaceList();
    },
    methods: {
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
                this.loading = false;
                let content = res.data;
                if (content.status === 0) {
                    let listData = content.data.list_data;
                    this.raceData = this.initListData(listData);
                    this.pageSize = content.data.page_count;
                    this.currentPage = +content.data.page_no || 1;
                }
                else {
                    this.$message.error(content.msg);
                }
            })
            .catch(err => {
                this.loading = false;
            });
        },
        /**
         * 跳转创建比赛列表
         */
        gotoCreateRace() {
            this.$router.push({
                name: 'raceDetail',
                params: {
                    detailId: 'created'
                }
            });
        },
        /**
         * 删除比赛
         */
        delRace(item) {
            this.$confirm('此操作将删除比赛, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/api/backstage/race/delete', {
                    race_id: item.race_id
                })
                .then(res => {
                    let content = res.data;
                    if (content.status === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getRaceList();
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: content.msg || '删除失败'
                        });
                    }
                });
            }).catch(() => {
                
            });
        },
        /**
         * 跳转详情
         */
        getDetail(row, event, column) {
            if (event.property === undefined) {
                return;
            }
            this.$router.push({
                name: 'raceDetail',
                params: {
                    detailId: row.race_id
                }
            });
        },
        /**
         * 开始发布比赛
         */
        startRace(raceDetail) {
            this.startLoading = true;
            this.$axios.post('/api/backstage/race/start', {
                race_id: raceDetail.race_id
            })
            .then(res => {
                let startLoading = false;
                let content = res.data;
                if (content.status === 0) {
                    this.$message.success('操作成功');
                    this.getRaceList();
                }
                else {
                    this.$message.error(content.msg || '操作失败');
                }
            })
            .catch(err => {
                this.startLoading = false;
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

