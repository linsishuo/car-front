import store from "@/store"
export default {
  openFile(url, fileName) {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    // xhr.open('POST', url, true);  // post 请求
    // xhr.setRequestHeader("content-type", 'application/json'); // post请求携带body体参数，需要设置此行
    //设置请求头参数的方式,如果没有可忽略此行代码
    xhr.setRequestHeader("Token", `${store.state.userInfo.accessToken}`)
    //设置响应类型为 blob
    xhr.responseType = "blob"
    // 关键部分
    xhr.onload = function (e) {
      // debugger;
      // 如果请求执行成功
      if (this.status == 200) {
        let blob = this.response
        let a = document.createElement("a")
        // blob.type = "application/octet-stream";
        let url = window.URL.createObjectURL(blob)
        // let fileName = decodeURIComponent(
        //   escape(
        //     xhr
        //       .getResponseHeader("content-disposition")
        //       .split(";")[1]
        //       .split("filename=")[1]
        //   )
        // );
        console.log(fileName, "fileName")
        if (window.navigator.msSaveBlob) {
          try {
            window.navigator.msSaveBlob(blob, fileName)
          } catch (e) {
            console.log(e)
          }
        } else {
          a.href = url
          a.download = fileName
          document.body.appendChild(a) // 火狐浏览器 必须把元素插入body中
          a.click()
          document.body.removeChild(a)
          // 释放之前创建的URL对象
          window.URL.revokeObjectURL(url)
        }
      } else {
        // 失败后需要将blob对象转换为 json 来获取异常信息
        const reader = new FileReader()
        reader.readAsText(this.response, "utf-8")
        reader.onload = () => {
          const { header } = JSON.parse(reader.result)
          console.error(header.msg)
        }
      }
    }
    xhr.send()
    // xhr.send(JSON.stringify({ id, orgNo, keyWord }))  // 将携带参数转化为 JSON
  },
  rTime(date) {
    let json_date = new Date(date).toJSON()
    let str_date = new Date(+new Date(json_date) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "")
    let arr_s = str_date.split(" ")
    let arr_st = arr_s[0].split("-")
    return arr_st[0] + "年" + arr_st[1] + "月" + arr_st[2] + "日"
  },
  is_iphone_x() {
    var reg = new RegExp("iphone", "gi")

    //x 375 724 xr 414 808
    let holiday_online = sessionStorage.getItem("holiday_online")
    // console.log(holiday_online + 'util');
    if (holiday_online == 1 || holiday_online == -1) {
      // console.log('x');
      if (reg.test(navigator.userAgent) && screen.width == 375 && screen.height == 812) {
        //iPhone X
        return 1
      }
      if (reg.test(navigator.userAgent) && screen.height >= 812) {
        //iPhone X系列
        return 1
      }
    } else {
      // console.log('y')
      if (reg.test(navigator.userAgent) && screen.width == 375 && screen.height == 724) {
        //iPhone X
        return 1
      }
      if (reg.test(navigator.userAgent) && screen.height >= 808) {
        //iPhone X系列
        return 1
      }
    }
    return 0
  },
  getUrlKey: function (name) {
    return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.href) || [, ""])[1].replace(/\+/g, "%20")) || null
  },

  isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
      return true
    } else {
      return false
    }
  },
  //判断是否是企微
  isWorkWeiXin() {
    return navigator.userAgent.match(/wxwork/i) == "wxwork"
  },
  is_pc() {
    //平台、设备和操作系统
    var system = {
      win: false,
      mac: false,
      xll: false,
      ipad: false,
    }
    //检测平台
    var p = navigator.platform

    system.win = p.indexOf("Win") == 0
    system.mac = p.indexOf("Mac") == 0
    system.x11 = p == "X11" || p.indexOf("Linux") == 0
    system.ipad = navigator.userAgent.match(/iPad/i) != null ? true : false
    if (system.win || system.mac || system.xll || system.ipad) {
      return 1
    } else {
      return 0
    }
  },
  back_fw() {
    let url =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx963179f52abc1968&redirect_uri=https%3A%2F%2Fsaic-dpmobile.saicmotor.com%2Fwxapi%2Fwxclientmenu%2F48927fbf5cdb4ddab71f9471f36dfd48&response_type=code&scope=SCOPE&agentid=1000131&state=1#wechat_redirect"
    window.location.href = url
  },
}
