# get-countdown
> 轮询获取剩余毫秒倒计时长

## installation
npm i -S get-countdown

## Example
```js
const getCountdown = require('get-countdown')
getCountdown(60 * 1000, 1000, (countdownMs, timeoutId) => {
  // clearTimeout(timeoutId) // 清除定时器后，callback将不再执行
  // 当countdownMs小于等于0时，定时器自动清除，callback将不再执行
  console.log(`剩余倒计时长：${Math.ceil(countdownMs / 1000)}秒`)
})
```

## source code
```js
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
```