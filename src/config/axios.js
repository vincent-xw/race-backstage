/**
 * @file axios 统一配置文件
 */
import axios from 'axios';
export default () => {
    // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
    let pending = [];
    let CancelToken = axios.CancelToken;
    let removePending = config => {
        for (let p in pending) {
            // 当当前请求在数组中存在时执行函数体
            if (pending[p].u === config.url + '&' + config.method) {
                // 执行取消操作
                pending[p].f();
                // 把这条记录从数组中移除
                pending.splice(p, 1);
            }
        }
    };
    
    axios.interceptors.request.use(
        config => {
            removePending(config);
            // 在一个ajax发送前执行一下取消操作
            config.CancelToken = new CancelToken(c => {
                // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
                pending.push({
                    u: config.url + '&' + config.method,
                    f: c
                });
            });

            return config;
        },
        error => Promise.reject(error)
    );

    axios.interceptors.response.use(function (response) {
        // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
        removePending(response.config);
        return response;
    }, function (error) {
        if (error.response.status === 401) {
            location.href = '#/login?needLogin=1';
        }
        return Promise.reject(error);
    });
};
