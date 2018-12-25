/**
 * 混入对象，公共部分
 */
export default {
    data(){
        return {}
    },
    methods: {
        // 时间格式化
        timeFormatter(row, column, cellValue, index) {
            return new Date(cellValue).toLocaleDateString();
        },
        // 比赛状态格式化
        raceStatusFromatter (row, column, cellValue, index) {
            if (cellValue === 0) {
                return '未发布';
            }
            if (cellValue === 1) {
                return '已发布';
            }
            if (cellValue === 2) {
                return '已发布，已设定赔率';
            }
            if (cellValue === 3) {
                return '已结束';
            }
            if (cellValue === 4) {
                return '已发布成绩';
            }
        }
    }
}