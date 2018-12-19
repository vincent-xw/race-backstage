/**
 * Created by zhangjz on 2018/12/17.
 */

/**
 * @file mock.url
 * @author jiaxuewen
 * @description mockurl配置文件，需要被mock的接口均可以再此进行配置，格式参照如下
 * @param {url} 需要被mock的URL，可以使用正则可以使用字符串匹配，本项目使用字符串匹配
 * @param {callback} 当URL被匹配到的时候调用的callback，传三个参数，url,type,body分别表示当前模块的URL地址，请求类型，返回值类型及请求所带的body值，具体参考https://github.com/nuysoft/Mock/wiki/Mock.mock()
 */
export default [
  {
    url: /\/api\/backstage\/agent\/list/,
    callback: () => {
      return {
        "status": 0,
        "msg": "",
        "data": {
          "agent_list": [
            {
              "id": "1",
              "agent_name": "1",
              "agent_phone": "13911112222",
              "agent_wechat": "abc123",
              "agent_remark": "123"
            },
            {
              "id": "2",
              "agent_name": "2",
              "agent_phone": "13911112222",
              "agent_wechat": "abc123",
              "agent_remark": "123"
            },
            {
              "id": "3",
              "agent_name": "3",
              "agent_phone": "13911112222",
              "agent_wechat": "abc123",
              "agent_remark": "123"
            }
          ]
        }
      };
    }
  },
  {
    url: /\/api\/backstage\/league\/list/,
    callback: () => {
      return {
        "status": 0,
        "msg": "",
        "data": {
          "league_list": [
            {
              "league_id": "1001",
              "league_name": "1001",
              "created_time": 1544544513119,
              "uodated_time": 1544544513119,
              "league_status": 0,
              "league_remark": "1001",
            }
          ]
        }
      };
    }
  },
  {
    url: /\/api\/backstage\/league\/delete/,
    callback: () => {
      return {
        "status": 0,
        "msg": "删除成功"
      }
    }
  },
  {
    url: /\/api\/backstage\/agent\/delete/,
    callback: () => {
      return {
        "status": 0,
        "msg": "删除成功"
      }
    }
  },
  {
    url: /\/api\/backstage\/agent\/created/,
    callback: () => {
      return {
        "status": 0,
        "msg": "新增成功"
      }
    }
  },
  {
    url: /\/api\/backstage\/league\/created/,
    callback: () => {
      return {
        "status": 0,
        "msg": "新增成功"
      }
    }
  },
  {
    url: /\/api\/backstage\/league\/update/,
    callback: () => {
      return {
        "status": 0,
        "msg": "修改成功"
      }
    }
  },
  {
    url: /\/api\/backstage\/agent\/update/,
    callback: () => {
      return {
        "status": 0,
        "msg": "修改成功"
      }
    }
  },
];
