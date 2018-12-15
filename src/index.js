const loopSetTimeout = require('loop-setTimeout')

/**
 * getCountdown 轮询获取剩余毫秒倒计时长
 * @param  {Number} durationMs   倒计时持续时间(毫秒)
 * @param  {Number} timeout      定时延时时间(毫秒)
 * @param  {Function} loopCallback
 * @return {undefined}
 */
function getCountdown (durationMs, timeout = 1000, loopCallback) {
  let startTime = Date.now()

  const callback = timeoutId => {
    let nowTime = Date.now()
    durationMs = durationMs - (nowTime - startTime)
    startTime = nowTime

    try {
      loopCallback && loopCallback(durationMs, timeoutId)
    } catch(error) {
      console.log(error)
    }
    if (durationMs <= 0) {
      clearTimeout(timeoutId)
    }
  }

  loopSetTimeout(callback, timeout)
}

export default getCountdown
