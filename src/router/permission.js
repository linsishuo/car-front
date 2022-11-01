import router from "./index"
import store from "@/store"
import { Toast } from "vant"
import util from "@/util"

router.beforeEach(async (to, from, next) => {
  const userInfo = store.getters.userInfo
  console.log(userInfo, 'userInfo')
  // 判断是否登录
  if (!userInfo) {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    })
    // 判断是否在企微内部
    const isInWorkWx = util.isWorkWeiXin()

    // 如果在企微内部 则直接忽略后端开关逻辑
    if (isInWorkWx) {
      //
      next()
    } else {
      //
      store
        .dispatch("allowLogin")
        .then(res => {
          console.log("登录成功")
          Toast.clear()
        })
        .catch(err => {
          console.log(err, "error")
        })
    }
  }

  next()
})

router.afterEach((to, from) => {
  if (Toast) {
    setTimeout(() => {
      Toast.clear()
    }, 1000)
  }
})
