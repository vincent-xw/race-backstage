<template lang="pug">
    el-row()
        el-row.race-container
            el-col(:span='24')
                h2 比赛详情 - {{statusText}}
                    el-button(type='text', v-if="raceDetail.race_status == 0") 发布比赛
                    el-button(type='text', v-if="raceDetail.race_status == 1") 结束比赛
                    el-button(type='text', v-if="raceDetail.race_status == 2") 发布成绩
                el-row
                    el-alert(type='error', v-if="raceDetail.status == '1'" title='已发布的比赛如需更新需要分开更新比赛信息及马匹信息，马匹信息更新请点击具体马匹')
            el-col(:span='24')
                el-form(
                    ref='form',
                    :model='form',
                    label-width='80px',
                )
                    el-form-item(label='联赛归属')
                        league-list(:form='form', @getLeagueName="getLeagueName")
                    el-form-item(label='联赛归属')
                        el-date-picker(
                            v-model='form.race_time',
                            type='date',
                            value-format='timestamp',
                            placeholder='请选择比赛时间'
                        )
                    el-form-item(label='马匹管理')
                        .horse-operation
                            el-button(
                                type="text",
                                v-for="item in horseInfo" :key="item.id",
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
                                        placeholder='请输入马匹名称'
                                    )
                                el-form-item(
                                    label='头限额'
                                )
                                    el-input(
                                        v-model="horseItem.head_limit",
                                        placeholder='请输入头限额'
                                    )
                                el-form-item(
                                    label='脚限额'
                                )
                                    el-input(
                                        v-model="horseItem.foot_limit",
                                        placeholder='请输入脚限额'
                                    )
                                el-form-item(
                                    label='马匹状态'
                                )
                                    el-select(
                                        :width='170',
                                        v-model="horseItem.horse_status",
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
                            el-row(v-if="raceDetail.race_status <= 1")
                                el-col(:span='11', align="center")
                                    el-button(type='primary', @click="confirmModify") 确定
                                el-col(:span='11', align="center")
                                    el-button(type='danger', @click="delHorse") 删除
                    
                    el-form-item
                        el-button(type='text' @click="addHorse" v-if="raceDetail.race_status == 0") 新建马匹
                    el-form-item(
                        label='赔率设置',
                        v-if="raceDetail.race_status == 2"
                    )
                        el-col(:span='11')
                            el-input(
                                v-model="form.head_odds",
                                placeholder='请输入头赔率',
                                width='49%'
                            )
                        el-col(:span='1') &nbsp;
                        el-col(:span='11')
                            el-input(
                                v-model="form.foot_odds",
                                placeholder='请输入脚赔率',
                                width='49%'
                            )
                    el-form-item
                        el-button(type='text', @click='saveRaceInfo' :loading='buttonLoading') 保存比赛信息
                        el-button(type='text', v-if="raceDetail.race_status == 2") 更新比赛赔率
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
import leagueList from '@/components/leagueList/leagueList';
export default {
    data() {
        return {
            // 比赛信息
            form: {},
            // 比赛详情
            raceDetail: {},
            // 投注信息
            betData: [],
            // 马匹信息数组
            horseInfo: [],
            // 马匹信息编辑窗口
            dialogVisible: false,
            // 单个马匹信息
            horseItem: {},
            // 接收联赛名称
            league_name: '',
            buttonLoading: false
        };
    },
    components: {
        leagueList
    },
    created() {
        let {detailId} = this.$route.params;
        this.raceDetail.race_status = detailId === 'created' ? 0 : '';
    },
    methods: {
        /**
         * 获取league_name
         */
        getLeagueName(name) {
            this.league_name = name;
        },
        /**
         * 保存或者更新比赛信息
         */
        saveRaceInfo() {
            this.buttonLoading = true;
            let postParam = {
                league_id: this.form.leagueId,
                league_name: this.league_name,
                race_time: this.form.race_time,
                horse_info: this.horseInfo
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
         * 格式化马匹名称
         */
        formatHorseName(item) {
            return item.horse_name;
        },
        /**
         * 新增马匹
         */
        addHorse() {
            this.horseInfo.push({
                id: new Date().getTime(),
                horse_name: '马匹_' + parseFloat(this.horseInfo.length + 1),
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
                for (let index = 0; index < this.horseInfo.length; index++) {
                    const element = this.horseInfo[index];
                    if (element.id === this.horseItem.id) {
                        this.horseInfo.splice(index, 1);
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
            for (let index = 0; index < this.horseInfo.length; index++) {
                const element = this.horseInfo[index];
                if (element.id === this.horseItem.id) {
                    this.horseInfo[index] = this.horseItem;
                    break;
                }
            }
            this.dialogVisible = false;
        }

    },
    computed: {
        statusText() {
            let status = [
                '新创建',
                '已发布',
                '已结束'
            ];
            let statusIndex = this.raceDetail.race_status || 0;
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

