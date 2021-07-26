import { ask } from 'stdio'

let isExit: boolean = false
let canvas: string[][]

const handleInstruction = (instructionSet: string = '') => {
  const [instruction, ...parameters] = instructionSet.toLowerCase().split(' ')
  switch (instruction) {
    case 'q':
      isExit = true
      break
    case 'b':
      canvas = boundaryFill(canvas, parameters)
      break
    case 'l':
      canvas = drawLine(canvas, parameters)
      break
    case 'r':
      canvas = drawRectangle(canvas, parameters)
      break
    case 'w':
      canvas = createCanvas(parameters)
      break
    default:
      console.log('no valid instruction given')
      break
  }
  drawCanvas(canvas)
}

const boundaryFill = (canvas: string[][], parameters: string[]) => {
  const [w, h] = parameters.slice(0, 2).map((e) => Number(e))
  const [color] = parameters[2]
  if (
    canvas[h][w] != 'x' &&
    canvas[h][w] != color &&
    w > 0 &&
    h > 0 &&
    w < canvas[0].length - 1 &&
    h < canvas.length - 1
  ) {
    canvas[h][w] = color
    drawCanvas(canvas)
    boundaryFill(canvas, [`${w + 1}`, `${h}`, color])
    boundaryFill(canvas, [`${w}`, `${h + 1}`, color])
    boundaryFill(canvas, [`${w - 1}`, `${h}`, color])
    boundaryFill(canvas, [`${w}`, `${h - 1}`, color])
    boundaryFill(canvas, [`${w - 1}`, `${h - 1}`, color])
    boundaryFill(canvas, [`${w - 1}`, `${h + 1}`, color])
    boundaryFill(canvas, [`${w + 1}`, `${h - 1}`, color])
    boundaryFill(canvas, [`${w + 1}`, `${h + 1}`, color])
  }

  return canvas
}

const drawRectangle = (canvas: string[][], coordinates: string[]): string[][] => {
  const [w1, h1, w2, h2] = coordinates
  canvas = drawLine(canvas, [w1, h1, w2, h1])
  canvas = drawLine(canvas, [w1, h1, w1, h2])
  canvas = drawLine(canvas, [w2, h1, w2, h2])
  canvas = drawLine(canvas, [w1, h2, w2, h2])
  return canvas
}

const drawLine = (canvas: string[][], coordinates: string[]): string[][] => {
  const [w1, h1, w2, h2] = coordinates.map((c) => Number(c))
  for (let iw = w1; iw <= w2; iw++) {
    for (let ih = h1; ih <= h2; ih++) {
      canvas[ih][iw] = 'x'
    }
  }
  return canvas
}

const createCanvas = (coordinates: string[]): string[][] => {
  const [width, height] = coordinates.map((c) => Number(c))
  let newCanvas: string[][] = new Array(height + 2).fill(' ').map((n) => new Array(width + 2).fill(' '))
  newCanvas[0].fill('-')
  newCanvas[height + 1].fill('-')
  for (let index = 1; index <= height; index++) {
    newCanvas[index][0] = '|'
    newCanvas[index][width + 1] = '|'
  }
  return newCanvas
}

const drawCanvas = (canvas: string[][]): void => {
  let canvasString = canvas.map((row) => row.join('')).join('\n')

  console.log(canvasString)
}

;(async () => {
  while (!isExit) {
    const answer: string = await ask('Enter command')
    handleInstruction(answer)
  }
})()
