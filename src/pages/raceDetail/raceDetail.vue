<template lang="pug">
    el-row(v-loading='raceDetailLoading')
        el-row.race-container
            el-col(:span='24')
                h2 比赛详情 - {{statusText}}
                    el-button(type='text', v-if="raceDetail.race_status == 3", @click="releaseSocre", :loading='releaseLoading') 发布成绩
                    el-button(type='text', v-if="raceDetail.race_status == 2", @click="endRace", :loading='endLoading') 结束比赛
                el-row
            el-col(:span='24')
                el-form(
                    ref='form',
                    :model='raceDetail',
                    label-width='80px',
                )
                    el-form-item(label='联赛归属')
                        league-list(:form='raceDetail', @getLeagueName="getLeagueName")
                    el-form-item(label='比赛时间')
                        el-date-picker(
                            v-model='raceDetail.race_time',
                            type='date',
                            value-format='timestamp',
                            placeholder='请选择比赛时间'
                        )
                    el-form-item(label='马匹管理')
                        .horse-operation
                            el-button(
                                type="text",
                                v-for="item in raceDetail.horse_info" :key="item.horse_id",
                                @click="modifyHorse(item)"
                            ) {{formatHorseName(item)}}
                        el-dialog(
                            title="编辑马匹信息",
                            :visible.sync='dialogVisible'
                        )
                            el-alert(
                                type='error',
                                title='比赛赔率设置之前不允许编辑马匹成绩，马匹成绩输入后会同步计算投注成绩，请谨慎操作',
                                :closable="false"
                            )
                            br
                            el-form(
                                :model='horseItem',
                                :inline='true'
                            )
                                el-form-item(
                                    label='马匹名称'
                                )
                                    el-input(
                                        v-model="horseItem.horse_name",
                                        :disabled='raceDetail.race_status != 0',
                                        placeholder='请输入马匹名称'
                                    )
                                el-form-item(
                                    label='头限额'
                                )
                                    el-input(
                                        v-model="horseItem.head_limit",
                                        :disabled='raceDetail.race_status != 0',
                                        placeholder='请输入头限额'
                                    )
                                el-form-item(
                                    label='脚限额'
                                )
                                    el-input(
                                        v-model="horseItem.foot_limit",
                                        :disabled='raceDetail.race_status != 0',
                                        placeholder='请输入脚限额'
                                    )
                                el-form-item(
                                    label='马匹状态'
                                )
                                    el-select(
                                        :width='170',
                                        v-model="horseItem.horse_status",
                                        :disabled='raceDetail.race_status != 0',
                                        placeholder='请选择马匹状态'
                                    )
                                        el-option(
                                            label='正常',
                                            :value='0'
                                        )
                                        el-option(
                                            label='不可参赛',
                                            :value='1'
                                        )
                                el-form-item(
                                    label='马匹成绩'
                                )
                                    el-input(
                                        v-model="horseItem.horse_score",
                                        :disabled='raceDetail.race_status != 2',
                                        placeholder='请输入马匹成绩'
                                    )
                            br
                            el-row(v-if="raceDetail.race_status == 0")
                                el-col(:span='11', align="center")
                                    el-button(type='primary', @click="confirmModify") 确定
                                el-col(:span='11', align="center")
                                    el-button(type='danger', @click="delHorse") 删除
                            el-row(v-if="raceDetail.race_status == 2")
                                el-col(:span='24', align="center")
                                    el-button(type='primary', :loading="updateScoreLoading", @click="updateHorseScore") 发布成绩
                    el-form-item
                        el-button(type='text' @click="createHorse" v-if="raceDetail.race_status <= 0") 新建马匹
                    el-form-item(
                        label='赔率设置',
                        v-if="raceDetail.race_status == 1"
                    )
                        el-col(:span='3')
                            span 第一名头赔率
                        el-col(:span='8')
                            el-input(
                                v-model="raceDetail.first_head_odds",
                                type="number",
                                placeholder='请输入头赔率',
                                width='49%'
                            )
                        el-col(:span='1') &nbsp;
                        el-col(:span='3') 
                            span 第一名脚赔率
                        el-col(:span='8')
                            el-input(
                                v-model="raceDetail.first_foot_odds",
                                type="number",
                                placeholder='请输入脚赔率',
                                width='49%'
                            )
                        el-col(:span='3')
                            span 第二名脚赔率
                        el-col(:span='8')
                            el-input(
                                v-model="raceDetail.second_foot_odds",
                                type="number",
                                placeholder='请输入头赔率',
                                width='49%'
                            )
                        el-col(:span='1') &nbsp;
                        el-col(:span='3') 
                            span 第三名脚赔率
                        el-col(:span='8')
                            el-input(
                                v-model="raceDetail.third_foot_odds",
                                type="number",
                                placeholder='请输入脚赔率',
                                width='49%'
                            )
                    el-form-item(
                        label='',
                        v-if="raceDetail.race_status == 1"
                    )
                        el-button(type='text', @click='submitOdds', :loading='oddsLoading') 提交赔率
                    el-form-item
                        el-button(type='text', v-if="detailId == 'created'" @click='saveRaceInfo' :loading='buttonLoading') 创建比赛信息
                        el-button(type='text', v-if="raceDetail.race_status == 0" @click='updateRaceInfo' :loading='buttonLoading') 更新比赛信息
        el-row.race-container
            el-col(:span='24')
                h2 投注情况
            el-table(
                :data='raceDetail.bet_info'
            )
                el-table-column(
                    prop='bet_id',
                    label='投注id'
                )
                el-table-column(
                    prop='username',
                    label='代理'
                )
                el-table-column(
                    prop='horse_name',
                    label='投注马匹'
                )
                el-table-column(
                    prop='bet_head',
                    label='投注头'
                )
                el-table-column(
                    prop='bet_foot',
                    label='投注脚'
                )
                el-table-column(
                    prop='bet_time',
                    label='投注时间',
                    :formatter='timeFormatter'
                )
                el-table-column(
                    prop='all_count',
                    label='总盈利',
                    :formatter='formatScore'
                )
                el-table-column(
                    prop='win_count',
                    label='玩家总盈利',
                    :formatter='formatScore'
                )
                el-table-column(
                    prop='',
                    label='操作'
                )
                    template(
                        slot-scope='scope'
                    )
                        el-button(
                            type='text',
                            size='mini'
                        )   删除
                  
</template>
<script>
import leagueList from '@/components/leagueList/leagueList';
import mixins from '@/public/mixins/mixins';
export default {
    mixins: [mixins],
    data() {
        return {
            // 比赛详情
            raceDetail: {
                // 马匹信息数组
                horse_info: [],
                race_status: -1,
                bet_info: []
            },
            // 投注信息
            betData: [],
            // 马匹信息编辑窗口
            dialogVisible: false,
            // 单个马匹信息
            horseItem: {},
            // 接收联赛名称
            league_name: '',
            buttonLoading: false,
            raceDetailLoading: false,
            oddsLoading: false,
            updateScoreLoading: false,
            releaseLoading: false,
            endLoading: false,
            detailId: -1
        };
    },
    components: {
        leagueList
    },
    created() {
        this.detailId = this.$route.params.detailId;
        this.raceDetail.race_status = this.detailId === 'created' ? -1 : 1;
        if (this.detailId !== 'created') {
            this.getRaceDetail(this.detailId);
        }
    },
    methods: {
        /**
         * 获取比赛详情
         */
        getRaceDetail(detailId) {
            this.raceDetailLoading = true;
            this.$axios.get('/api/backstage/race/info' + '?' + this.$qs.stringify({
                race_id: detailId
            }))
            .then(res => {
                this.raceDetailLoading = false;
                let content = res.data;
                if (content.status === 0) {
                    this.raceDetail = content.data;
                    this.raceDetail.first_head_odds /= 10;
                    this.raceDetail.first_foot_odds /= 10;
                    this.raceDetail.second_foot_odds /= 10;
                    this.raceDetail.third_foot_odds /= 10;
                    this.raceDetail.bet_info = this.initListData(this.raceDetail.bet_info);
                    this.$message.success('请求成功');
                }
                else {
                    this.raceDetailLoading = false;
                    this.$message.error(content.msg || '请求失败');
                }
            });
        },
        /**
         * 获取league_name
         */
        getLeagueName(name) {
            this.league_name = name;
        },
        /**
         * 保存比赛信息
         */
        saveRaceInfo() {
            this.buttonLoading = true;
            let postParam = {
                league_id: this.raceDetail.league_id,
                league_name: this.league_name,
                race_time: this.raceDetail.race_time,
                horse_info: this.raceDetail.horse_info
            };
            if (!postParam.league_id || !postParam.league_name) {
                this.$message.error('请选择比赛赛区');
                this.buttonLoading = false;
                return;
            }
            if (!postParam.race_time) {
                this.$message.error('请选择比赛时间');
                this.buttonLoading = false;
                return;
            }
            if (postParam.horse_info.length === 0) {
                this.$message.error('请至少创建一匹比赛马匹');
                this.buttonLoading = false;
                return;
            }
            this.$axios.post('/api/backstage/race/add', postParam)
            .then(res => {
                this.buttonLoading = false;
                let content = res.data;
                if (content.status === 0) {
                    this.$message.success('创建成功');
                    this.$router.replace({
                        name: 'race'
                    });
                }
                else {
                    this.$message.error(content.msg);
                }
            })
            .catch(err => {
                this.buttonLoading = false;
            });
        },
        /**
         * 更新比赛信息
         */
        updateRaceInfo() {
            this.buttonLoading = true;
            let postParam = {
                race_id: this.raceDetail.race_id,
                league_id: this.raceDetail.league_id,
                league_name: this.league_name || this.raceDetail.league_name,
                race_time: this.raceDetail.race_time,
                horse_info: this.raceDetail.horse_info
            };
            if (!postParam.league_id || !postParam.league_name) {
                this.$message.error('请选择比赛赛区');
                this.buttonLoading = false;
                return;
            }
            if (!postParam.race_time) {
                this.$message.error('请选择比赛时间');
                this.buttonLoading = false;
                return;
            }
            if (postParam.horse_info.length === 0) {
                this.$message.error('不能删除所有的马匹');
                this.buttonLoading = false;
                return;
            }
            this.$axios.post('/api/backstage/race/update', postParam)
            .then(res => {
                this.buttonLoading = false;
                let content = res.data;
                if (content.status === 0) {
                    this.$message.success('更新成功');
                    this.$router.replace({
                        name: 'race'
                    });
                }
                else {
                    this.$message.error(content.msg);
                }
            })
            .catch(err => {
                this.buttonLoading = false;
            });
        },
        /**
         * 格式化马匹名称
         */
        formatHorseName(item) {
            let name = item.horse_name;
            if (item.horse_score !== 0) {
                name += '-第' + item.horse_score + '名';
            }
            if (item.horse_status === 1) {
                name += '-不可参赛';
            }
            return name;
        },
        /**
         * 新建马匹，可以连续创建待添加马匹
         */
        createHorse() {
            this.raceDetail.horse_info.push({
                horse_id: new Date().getTime(),
                horse_name: '马匹_' + parseFloat(this.raceDetail.horse_info.length + 1),
                horse_status: 0,
                head_limit: 100,
                foot_limit: 100,
                horse_score: 0
            });
        },
        /**
         * 删除马匹
         */
        delHorse() {
            this.$confirm('此操作将删除当前马匹信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                for (let index = 0; index < this.raceDetail.horse_info.length; index++) {
                    const element = this.raceDetail.horse_info[index];
                    if (element.horse_id === this.horseItem.horse_id) {
                        this.raceDetail.horse_info.splice(index, 1);
                        break;
                    }
                }
                this.dialogVisible = false;
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        /**
         * 修改马匹
         */
        modifyHorse(item) {
            this.dialogVisible = true;
            this.horseItem = item;
        },
        /**
         * 确认修改
         */
        confirmModify() {
            for (let index = 0; index < this.raceDetail.horse_info.length; index++) {
                const element = this.raceDetail.horse_info[index];
                if (element.horse_id === this.horseItem.horse_id) {
                    this.raceDetail.horse_info[index] = this.horseItem;
                    break;
                }
            }
            this.dialogVisible = false;
        },
        /**
         * 结束比赛
         */
        endRace() {
            this.$confirm('结束比赛以后就不可以继续单独设置马匹成绩了, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.endLoading = true;
                this.$axios.post('/api/backstage/race/end', {
                    race_id: this.raceDetail.race_id
                })
                .then(res => {
                    let endLoading = false;
                    let content = res.data;
                    if (content.status === 0) {
                        this.$message.success('操作成功');
                        this.getRaceDetail(this.raceDetail.race_id);
                        this.getRaceList();
                    }
                    else {
                        this.$message.error(content.msg || '操作失败');
                    }
                })
                .catch(err => {
                    this.endLoading = false;
                });
            });
        },
        /**
         * 提交赔率
         */
        submitOdds() {
            this.oddsLoading = true;
            this.$axios.post('/api/backstage/race/setOdds', {
                race_id: this.raceDetail.race_id,
                first_head_odds: this.raceDetail.first_head_odds * 10,
                first_foot_odds: this.raceDetail.first_foot_odds * 10,
                second_foot_odds: this.raceDetail.second_foot_odds * 10,
                third_foot_odds: this.raceDetail.third_foot_odds * 10
            })
            .then(res => {
                this.oddsLoading = false;
                let content = res.data;
                if (content.status === 0) {
                    this.$message.success('设置成功');
                    this.getRaceDetail(this.detailId);
                    return;
                }
                this.$message.error('设置失败');
            })
            .catch(err => {
                this.oddsLoading = false;
            });
        },
        /**
         * 更新马匹成绩
         */
        updateHorseScore() {
            this.updateScoreLoading = true;
            let data = {
                horse_score: this.horseItem.horse_score,
                horse_id: this.horseItem.horse_id,
                race_id: this.raceDetail.race_id
            };
            this.$axios.post('/api/backstage/race/horse/setScore', data)
            .then(res => {
                this.updateScoreLoading = false;
                let content = res.data;
                if (content.status === 0) {
                    this.$message.success('发布成功，您可以随时重复发布');
                    this.dialogVisible = false;
                    this.getRaceDetail(this.raceDetail.race_id);
                    return;
                }
                this.$message.error(content.msg || '发布失败');
            })
            .catch(err => {
                this.updateScoreLoading = false;
            });
        },
        /**
         * 发布成绩
         */
        releaseSocre() {
            
                this.releaseLoading = true;
                let data = {
                    race_id: this.raceDetail.race_id
                };
                this.$axios.post('/api/backstage/race/score/release', data)
                .then(res => {
                    this.releaseLoading = false;
                    let content = res.data;
                    if (content.status === 0) {
                        this.$message.success('发布成功');
                        this.dialogVisible = false;
                        this.$router.push({
                            name: 'race'
                        });
                        return;
                    }
                    this.$message.error(content.msg || '发布失败');
                })
                .catch(err => {
                    this.updateScoreLoading = false;
                });
        }
    },
    computed: {
        statusText() {
            let status = [
                '未发布',
                '已发布',
                '已结束',
                '待发布成绩',
                '已发布成绩'
            ];
            let statusIndex = this.raceDetail.race_status || 0;
            return status[statusIndex] || '新创建';
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

