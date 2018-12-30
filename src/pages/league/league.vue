<template lang="pug">
    el-row()
        el-row.race-container
            el-col(:span='24')
                h2 联赛设置
            .league-setting
                el-button(type='primary' @click="addLeagueClick") 新增赛区
            el-table(
                v-loading="loading",
                :data='raceData',
                @row-click="itemClick"
            )
                el-table-column(
                prop='league_id',
                label='#'
                )
                el-table-column(
                prop='league_name',
                label='联赛名称'
                )
                el-table-column(
                prop='created_time',
                label='创建时间'
                )
                el-table-column(
                prop='updated_time',
                label='修改时间'
                )
                el-table-column(
                    prop='league_remark',
                    label='备注'
                )
                el-table-column(
                    prop='',
                    label='操作'
                )
                    template(slot-scope="scope")
                        el-button(
                        size="mini",
                        type="text",
                        :loading="scope.row.delLoading",
                        @click.stop="delLeague(scope.$index, scope.row)"
                        ) 删除
        el-dialog(
        :title="getDialogTitle",
        :visible.sync="showDialog",
        :close="closeDialog"
        )
            el-form(
            :model="form",
            ref="form",
            :rules="rules"
            )
                el-form-item(label="赛区名称", :label-width="'120px'" prop="league_name")
                    el-input(v-model="form.league_name")
                el-form-item(label="赛区备注", :label-width="'120px'" prop="league_remark")
                    el-input(
                    type="textarea",
                    :autosize="{ minRows: 2, maxRows: 4}",
                    placeholder="请输入内容"
                    v-model="form.league_remark"
                    )
            div(slot="footer" class="dialog-footer")
                el-button(@click="closeDialog") 取消
                el-button(@click="clickConfirm('form')" type="primary", :loading="addLoading") 确定

</template>
<script>
  export default {
    data() {
      return {
        form: {},
        raceData: [],
        showDialog: false,
        addLoading: false,
        dialogType: 'add',
        loading: false,
        rules: {
          league_name: [ { required: true, message: '请输入姓名', trigger: 'blur' } ],
        }
      };
    },
    methods: {
      /**
       * 点击确认
       * */
      clickConfirm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              this.addLoading = true;
              const params = {
                league_name: this.form.league_name,
                league_remark: this.form.league_remark,
              };
              if (this.dialogType === 'update') {
                params.league_id = this.form.league_id;
              }
              this.$axios.post(`/api/backstage/league/${this.dialogType}`, params).then(res => {
                this.$handleResponse(res.data.status, res.data.msg, () => {
                  this.getLeagueList();
                  this.closeDialog();
                });
              }).catch(() => {
                this.addLoading = false;
              });
            } else {
              return false;
            }
        })
      },
      /**
       * 删除联赛
       * @param index 行id
       * @param { league_id } 行数据中结构赋值id
       * */
      delLeague(index, {league_id}) {
        this.$confirm('此操作将删除该联赛, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.raceData[index].delLoading = true;
          const params = {league_id};
          console.log(params);
          this.$axios.post('/api/backstage/league/delete', params).then(res => {
            this.$handleResponse(res.data.status, res.data.msg, () => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getLeagueList();
            });
          }).catch(err => {
            console.log(err);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /**
       * 获得联赛列表
       * */
      getLeagueList() {
        this.loading = true;
        this.$axios.get('/api/backstage/league/list').then(res => {
          this.$handleResponse(res.data.status, res.data.msg, () => {
            this.raceData = res.data.data.league_list.map(item => {
              item.created_time = new Date(+item.created_time).toLocaleString();
              item.updated_time = new Date(+item.updated_time).toLocaleString();
              item.delLoading = false;
              return item;
            })
          });
          this.loading = false;
        }).catch(err => {
          console.log(err);
          this.loading = false;
        });
      },
      /**
       * 关闭dialog
       * */
      closeDialog() {
        this.form = {};
        this.showDialog = false;
        this.addLoading = false;
      },
      /**
       *  联赛item点击
       * */
      itemClick(row) {
        this.form = row;
        this.dialogType = 'update';
        this.showDialog = true;
      },
      addLeagueClick() {
        this.form = {};
        this.showDialog = true;
        this.dialogType = 'add';
      },
    },
    computed: {
      getDialogTitle() {
        return `${this.dialogType === 'add' ? '新增' : '修改'}赛区`
      }
    },
    created() {
      this.getLeagueList();
    }

  };
</script>
<style lang="less">
    .race-container {
        padding: 10px;
        border-radius: 4px;
        background: #ffffff;
        margin-bottom: 10px;
        .league-setting {
            text-align: right;
        }
    }
</style>

