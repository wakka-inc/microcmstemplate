'use client'

import { useEffect, useState } from 'react'

type TypeOption = {
  stroke?: string,
  duration?: number,
  chieucaoToithieu?: number,
  chieucaoToida?: number,
  goc?: number,
}

function DrawLineCanvas(props: {
  id: string,
  option?: TypeOption
}) {

  /** Set the initial variable from [component] */
  const {
    stroke = '#000',
    duration = 2000,
    chieucaoToithieu = 10,
    chieucaoToida = 100,
    goc = 45,
  } = props.option as TypeOption

  let tRequestDraw: any
  let tResize: any


  /** FUNCTION TO DRAW [LINE] */
  function drawLine() {
    const c = document.getElementById(props.id + '__canvas') as HTMLCanvasElement
    const ctx = c.getContext('2d')
    if (!ctx) return

    /** Thiết lập kích thước cavans **/
    const $footer = document.getElementById(props.id)
    const canvasWidth = Math.round($footer?.clientWidth || 400)
    const canvasHeight = Math.round($footer?.clientHeight || 300)
    c.width = canvasWidth
    c.height = canvasHeight
    
    /** Global variables **/
    const khoangcachToithieu = 100
    const khoangcachToida = 300
    

    /** Set values for each [line]  */
    let soluongLine = 0
    let vBegin = 0
    let isLoop = true
    let dataline: any[] = []
    
    while (isLoop) {
      soluongLine++
      const chieucaoLine = chieucaoToithieu + (Math.random() * (chieucaoToida - chieucaoToithieu))
      const yInit = -chieucaoLine * (1 + (Math.random() * (10 - 1)))
      vBegin += (khoangcachToithieu + (Math.random() * (khoangcachToida - khoangcachToithieu)))

      // [X] position of the last [line] 
      let hTamgiac = canvasHeight - yInit
      const A1 = (hTamgiac / Math.sin((goc * Math.PI) / 180))
      const B1 = hTamgiac
      const C1 = (A1*A1) - (B1*B1)
      const canhkeTamgiac = Math.sqrt(C1)

      // Set [duration] value
      const durationMin = duration - (duration / 4)
      const durationMax = duration + (duration / 4)
      const durationRandom = durationMin + (Math.random() * (durationMax - durationMin))

      dataline.push({
        id: soluongLine,
        xInit: vBegin,
        chieucaoLine: chieucaoLine,
        chieucaoDichuyenToiDa: (-yInit) + canvasHeight + chieucaoLine,
        yInit: yInit,
        yBegin: yInit,
        yEnd: 0,
        duration: Math.round(durationRandom),
        tBegin: +new Date(),
      })

      // End loop for initial value setting
      if ((vBegin - canhkeTamgiac) > canvasWidth) {
        isLoop = false
      }
    }


    /** [STEP] FUNCTION */
    const step = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      dataline.forEach((line, index) => {

        // Setup [yBegin]
        const tCur = +new Date()
        const ratioDuration = (tCur - line.tBegin) / line.duration
        line.yBegin = line.yInit + (line.chieucaoDichuyenToiDa * ratioDuration) // Bởi vì yInit số âm nên dấu '+'
        line.yEnd = (line.yBegin + line.chieucaoLine)

        const A1 = (line.yBegin / Math.sin((goc * Math.PI) / 180))
        const B1 = line.yBegin
        const C1 = (A1*A1) - (B1*B1)
        let canhKeX1 = Math.sqrt(C1)

        const A2 = (line.yEnd / Math.sin((goc * Math.PI) / 180))
        const B2 = line.yEnd
        const C2 = (A2*A2) - (B2*B2)
        const canhKeX2 = Math.sqrt(C2)

        /** Coordinate after setup */
        // When [y1] negative, the value [canhKeX1] must be reversed
        if (line.yBegin <= 0) canhKeX1 *= -1
        const x1 = line.xInit - canhKeX1
        const x2 = line.xInit - canhKeX2

        /** Function to draw */
        ctx.beginPath()
        ctx.moveTo(x1, line.yBegin)
        ctx.lineTo(x2, line.yEnd)
        ctx.strokeStyle = stroke
        ctx.stroke()
        ctx.closePath()

        /** Redraw */
        if( line.yBegin >= canvasHeight + line.chieucaoLine ) {
          line.yBegin = line.yInit
          line.tBegin = +new Date()
        }
      })

      tRequestDraw = requestAnimationFrame(step)
    }
    cancelAnimationFrame(tRequestDraw)
    step()
  }

  useEffect(() => {
    drawLine()

    window.addEventListener('resize', () => {
      clearTimeout(tResize)
      tResize = setTimeout(drawLine, 300)
    })
    return () => {
      window.removeEventListener('resize', drawLine)
    }
  }, [])
  
  return (
    <div id={props.id} className="drawline">
      <canvas id={props.id + '__canvas'} className="drawline__canvas"></canvas>
    </div>
  )
}

export default DrawLineCanvas