<template lang="pug">
    el-row()
        el-row.race-container
            el-col(:span='24')
                h2 联赛设置
            .league-setting
                el-button(type='primary') 新增联赛
            el-table(
                :data='raceData'
            )
                el-table-column(
                    prop='id',
                    label='#'
                )
                el-table-column(
                    prop='name',
                    label='联赛名称'
                )
                el-table-column(
                    prop='createdTime',
                    label='创建时间'
                )
                el-table-column(
                    prop='updatedTime',
                    label='修改时间'
                )
                el-table-column(
                    prop='status',
                    label='状态'
                )
                el-table-column(
                    prop='remark',
                    label='备注'
                )
                el-table-column(
                    prop='',
                    label='操作'
                )
                    template(solt-scope='scope')
                        el-button(
                            type='text',
                            size='mini'
                        ) 删除
                  
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
    .league-setting {
        text-align: right;
    }
}
</style>

