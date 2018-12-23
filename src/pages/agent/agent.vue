<template lang="pug">
    el-row.agent-container
        el-col(:span='24')
            h2 代理管理
            .agent-setting
            el-button(type='primary' @click="showDialog = true") {{getDialogTitle}}
            el-table(
                :data='agentData'
                @row-click="itemClick"
            )
                el-table-column(
                prop='id',
                label='#'
                )
                el-table-column(
                prop='agent_name',
                label='代理名称'
                )
                el-table-column(
                prop='agent_phone',
                label='代理电话'
                )
                el-table-column(
                prop='agent_wechat',
                label='其他联系方式'
                )
                el-table-column(
                prop='status',
                label='状态'
                )
                el-table-column(
                prop='agent_remark',
                label='备注'
                )
                el-table-column(
                label='操作'
                )
                    template(slot-scope="scope")
                        el-button(
                        size="mini"
                        type="text"
                        :loading="scope.row.delLoading"
                        @click="delAgent(scope.$index, scope.row)"
                        ) 删除代理
        el-dialog(
            title="新增代理"
            :visible.sync="showDialog"
            :close="closeDialog"
        )
            el-form(
            v-model="form"
            :rules="rules"
            ref="form"
            )
                el-form-item(label="姓名" :label-width="'120px'" props="agent_name")
                    el-input(v-model="form.agent_name")
                el-form-item(label="密码" :label-width="'120px'" props="agent_password")
                    el-input(v-model="form.agent_password")
                el-form-item(label="手机号码" :label-width="'120px'" props="agent_phone")
                    el-input(v-model="form.agent_phone")
                el-form-item(label="微信" :label-width="'120px'" props="agent_wechat")
                    el-input(v-model="form.agent_wechat")
                el-form-item(label="备注" :label-width="'120px'" props="agent_remark")
                    el-input(
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="form.agent_remark"
                    )
            div(slot="footer" class="dialog-footer")
                el-button(@click="closeDialog") 取消
                el-button(@click="clickConfirm" type="primary" :loading="addLoading") 确定

</template>
<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("不能为空"));
      }
    };

    return {
      agentData: [],
      showDialog: false,
      form: {
        agent_name: undefined,
        agent_password: undefined,
        agent_phone: undefined,
        agent_wechat: undefined,
        agent_remark: undefined
      },
      addLoading: false,
      dialogType: "created",
      rules: {
        agent_name: [{ validator: validatePass, trigger: "blur" }],
        agent_password: [{ validator: validatePass, trigger: "blur" }],
        agent_phone: [{ validator: validatePass, trigger: "blur" }],
        agent_wechat: [{ validator: validatePass, trigger: "blur" }],
        agent_remark: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    /**
     * 删除代理
     * @param index 行id
     * @param { id } 行数据中结构赋值id
     * */
    delAgent(index, { id }) {
      this.agentData[index].delLoading = true;
      const params = { id };
      console.log(params);
      this.$axios
        .post("/api/backstage/agent/delete", params)
        .then(res => {
          if (res.dat.status === 0) {
            this.getAgentList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 点击确认
     * */
    clickConfirm() {
      if (this.checkFormEmpty()) {
        return;
      }
      this.addLoading = true;
      const params = {
        ...this.form
      };
      console.log(params);
      this.$axios
        .post(`/api/backstage/agent/${this.dialogType}`, params)
        .then(res => {
          if (res.data.status === 0) {
            this.getAgentList();
            this.closeDialog();
          }
        })
        .catch(() => {
          this.addLoading = false;
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
     * 检验this.form 里面是否有数据
     * */
    checkFormEmpty(data = this.form) {
      //        return !(Object.keys(data).filter(item => !!data[item]).length > 0);
      return !(Object.keys(data).length > 0);
    },
    /**
     *  代理item点击
     * */
    itemClick(row) {
      this.form = row;
      this.showDialog = true;
      this.dialogType = "update";
    },
    addAgentClick() {
      this.form = {};
      this.showDialog = true;
      this.dialogType = "created";
    },
    /**
     * 获得代理列表
     * */
    getAgentList() {
      this.$axios
        .get("/api/backstage/agent/list")
        .then(res => {
          if (res.data.status === 0) {
            this.agentData = res.data.data.agent_list.map(item => {
              item.delLoading = false;
              return item;
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    getDialogTitle() {
      return `${this.dialogType === "update" ? "修改" : "新增"}代理`;
    }
  },
  created() {
    this.getAgentList();
  }
};
</script>
<style lang="less">
.agent-container {
  padding: 10px;
  border-radius: 4px;
  background: #ffffff;
  margin-bottom: 10px;
  .agent-setting {
    text-align: right;
  }
}
</style>

