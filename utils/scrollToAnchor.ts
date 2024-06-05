'use client'

export default function scrolltoAnchor(event: any) {
  const duration = 300
  // const duration = 4000
  let Easing = {
    // Variable
    // x: percent (null)
    // t: current time (ms)
    // b: beginning value (gia tri 0)
    // c: change in value (gia tri 1)
    // d: duration (ms)
    easeOutQuad: function (x: any, t: number, b: number, c: number, d: number) {
      return -c *(t/=d)*(t-2) + b;
    }
  }

  // Main script
  let docElement = document.documentElement,
      requestAnimationFrame = window.requestAnimationFrame
      || function(callback: any) { return window.setTimeout(callback, 1000/60) }

  let cancelAnimationFrame = window.cancelAnimationFrame
      || window.clearTimeout

  // Get position-top and timer at begin
  let n = 0
  let request: number
  const tBegin = +new Date()
  const yBegin = docElement.scrollTop - (docElement.clientTop || 0)

  const $link = event.target
  const idTarget = $link?.dataset?.href
  const $target = document.getElementById( idTarget.substring(1) )
  const targetTop = $target?.getBoundingClientRect()?.top || 0
  const bodyTop = document.body.getBoundingClientRect().top
  const yTarget = Math.round(targetTop - bodyTop)
  const yEnd = yTarget
  const huong = yBegin <= yEnd ? 'tuTrenXuong' : 'tuDuoiLen'

  const header = document.getElementById('header')
  const heightHeader = !!header ? header.clientHeight : 0
  const khoangcach = yEnd - yBegin - (heightHeader + 10)

  // THE LOOP
  const step = () => {
    n++;

    // Set current position
    // [current position] + [added distance]
    const timeCur = (+new Date() - tBegin) / duration
    const chenhlech = khoangcach * timeCur
    const yCur = yBegin + chenhlech

    // Setup current position with [easing]
    // [current position] + [add distance with easing]
    const tyleEasing = Easing.easeOutQuad(null, +new Date() - tBegin, 0, 1, duration)
    const chenhlechEasing = khoangcach * tyleEasing
    let yCurEasing = yBegin + chenhlechEasing
    yCurEasing = Math.round(yCurEasing * 100) / 100

    // Move to the [current position]
    window.scrollTo(0, yCurEasing)

    // Request Animation Frame -> make loop
    request = requestAnimationFrame(step)

    // Remove [Animation frame]
    if( huong == 'tuTrenXuong' ) {
      if( yCur >= yEnd ) cancelStep()
    }
    else {
      if( yCur <= yEnd ) cancelStep()
    }
  }

  // Remove [Animation frame]
  const cancelStep = () => {
    cancelAnimationFrame(request)
  }

  // Init
  step()
  event.preventDefault()
}