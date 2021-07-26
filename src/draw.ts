let canvas: string[][]

const handleInstruction = (instructionSet: string = ''): any => {
  const [instruction, ...parameters] = instructionSet.toLowerCase().split(' ')
  console.clear()
  console.log(`Last command: ${instructionSet}`)
  switch (instruction) {
    case 'q':
      return true
    case 'b':
      boundaryFill(canvas, parameters)
      break
    case 'l':
      drawLine(canvas, parameters)
      break
    case 'r':
      drawRectangle(canvas, parameters)
      break
    case 'c':
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
  if (canvas[h][w] != 'x' && canvas[h][w] != color && checkBoundary(canvas, w, h)) {
    canvas[h][w] = color
    boundaryFill(canvas, [`${w + 1}`, `${h}`, color])
    boundaryFill(canvas, [`${w}`, `${h + 1}`, color])
    boundaryFill(canvas, [`${w - 1}`, `${h}`, color])
    boundaryFill(canvas, [`${w}`, `${h - 1}`, color])
    boundaryFill(canvas, [`${w - 1}`, `${h - 1}`, color])
    boundaryFill(canvas, [`${w - 1}`, `${h + 1}`, color])
    boundaryFill(canvas, [`${w + 1}`, `${h - 1}`, color])
    boundaryFill(canvas, [`${w + 1}`, `${h + 1}`, color])
  }
}

const drawRectangle = (canvas: string[][], coordinates: string[]) => {
  const [w1, h1, w2, h2] = coordinates
  drawLine(canvas, [w1, h1, w2, h1])
  drawLine(canvas, [w1, h1, w1, h2])
  drawLine(canvas, [w2, h1, w2, h2])
  drawLine(canvas, [w1, h2, w2, h2])
}

const drawLine = (canvas: string[][], coordinates: string[]): void => {
  const [w1, h1, w2, h2] = coordinates.map((c) => Number(c))

  if (checkBoundary(canvas, w1, h1) && checkBoundary(canvas, w2, h2)) {
    for (let iw = w1; iw <= w2; iw++) {
      for (let ih = h1; ih <= h2; ih++) {
        canvas[ih][iw] = 'x'
      }
    }
  }
}

const createCanvas = (coordinates: string[]): string[][] => {
  const [width, height] = coordinates.map((c) => Number(c))
  let newCanvas: string[][] = new Array(height + 2).fill(' ').map((n) => new Array(width + 2).fill(' '))
  addHorizontalBoundarys(newCanvas, height)

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

const checkBoundary = (canvas: string[][], w: number, h: number): boolean => {
  return w > 0 && h > 0 && w < canvas[0].length - 1 && h < canvas.length - 1
}

const addHorizontalBoundarys = (newCanvas: string[][], height: number) => {
  newCanvas[0].fill('-')
  newCanvas[height + 1].fill('-')
}
export { handleInstruction }
