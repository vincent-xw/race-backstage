/**
 * Created by zhangjz on 2018/12/17.
 */
/**
 * @file mock模块配置文件，如无特殊必要无需更改
 * @author jiaxuewen
 */
import mockjs from 'mockjs';
import mockUrl from './mock.url.js';

export default {
  init() {
    mockUrl.map(item => {
      mockjs.mock(item.url, item.callback);
    });
  }
};
