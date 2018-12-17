/**
 * @file state初始化
 * @author Vincent
 */
export default {
    state: {
        test: 1
    },
    mutations: {
        updateTest(state, payload) {
            state.test = payload.test;
        }
    }
};
