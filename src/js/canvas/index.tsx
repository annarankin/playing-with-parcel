import * as React from 'react'
import './pixel-canvas'
import createBlankMatrix from "../matrix/blank-matrix";

type Pixel = {
  x: number
  y: number
  color: string
}

interface PixelProps {
  pixels?: Array<Pixel>,
  gutter?: number,
  height: number,
  width: number,
  numSquares: number,
}

export class PixelCanvas extends React.Component<PixelProps, { pixels: Pixel[]}> {
  private canvas: React.RefObject<HTMLCanvasElement>
  state = {
    pixels: []
  }

  refs: {
    [key: string]: (Element);
    canvas: (HTMLCanvasElement);
  }

  static defaultProps = {
    gutter: 1,
  }

  constructor(p) {
    super(p)
    this.canvas = React.createRef()
  }

  componentDidMount() {
    this.matrix().forEach((row, y) => row.forEach((color, x) => {
      this.drawPixel(color, x, y)
    }))
  }

  componentDidUpdate(prevProps) {
    const { width, height } = this.props
    this.canvasContext().clearRect(0, 0, width, height)
    this.matrix().forEach((row, y) => row.forEach((color, x) => {
      this.drawPixel(color, x, y)
    }))
  }

  matrix() {
    const { numSquares } = this.props
    const { pixels } = this.state
    const grid = createBlankMatrix(numSquares, '#EEEEEE')
    pixels.forEach(pixel => {
      if(grid[pixel.y]) { grid[pixel.y][pixel.x] = pixel.color }
    })
    return grid
  }

  randomHex(): string {
    return `#${Array.from({ length: 6 }).map(() => Math.floor(Math.random() * 10)).join('')}`
  }

  drawPixel(color, x, y) {
    const size = this.pixelSize()
    this.canvasContext().fillStyle = color
    this.canvasContext().fillRect((x * size) + x * this.props.gutter, (y * size) + y * this.props.gutter, size, size)
  }

  pixelSize() {
    // square for now, one calc
    const { height, numSquares } = this.props
    return ((height - (this.props.gutter * (numSquares - 1))) / numSquares)
  }

  canvasContext() {
    return this.canvas.current.getContext('2d')
  }

  getCoordsFromClick(event: MouseEvent) {
    const size = this.pixelSize() + 1
    const x = Math.floor(event.offsetX / size)
    const y = Math.floor(event.offsetY / size)
    return({ x, y })
  }

  fillPixel = (x: number, y: number, color: string) => {
    const pixel: Pixel = { x, y, color }
    const existingPixel = this.state.pixels.find(p => p.x === x && p.y === y)
    if (existingPixel) { return }
    this.setState((prevState) => ({ ...prevState, pixels: [...prevState.pixels, pixel] }))
  }

  onCanvasClick = (event: React.SyntheticEvent<HTMLCanvasElement>) => {
    const { x, y } = this.getCoordsFromClick(event.nativeEvent as MouseEvent)
    this.fillPixel(x, y, '#333')
  }

  onMouseMove = (event: React.SyntheticEvent<HTMLCanvasElement>) => {
    if (event.nativeEvent.buttons !== 1) { return }
    const { x, y } = this.getCoordsFromClick(event.nativeEvent as MouseEvent)
    this.fillPixel(x, y, '#333')
  }

  render() {
    const { width, height } = this.props
    return(
      <div className="pixel-canvas">
        <h1>Pixel Canvas</h1>
        <canvas
          ref={this.canvas}
          width={width}
          height={height}
          onClick={this.onCanvasClick}
          onMouseMove={this.onMouseMove}
        />
      </div>
    )
  }
}
