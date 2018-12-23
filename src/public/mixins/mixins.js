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
        }
    }
}