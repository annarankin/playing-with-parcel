import * as React from 'react'

export class Canvas extends React.Component {
  private canvas: React.RefObject<HTMLCanvasElement>
  private style: { [key: string]: any }

  refs: {
    [key: string]: (Element);
    canvas: (HTMLCanvasElement);
  }

  props: {
    pixels?: Array<Array<string>>,
    gutter?: number,
    height: number,
    width: number,
    numSquares: number,
  }

  static defaultProps = {
    pixels: [
      ['red', 'red', 'red', 'red'],
      ['blue', 'blue', 'blue', 'blue'],
      ['green', 'green', 'green', 'green'],
      ['yellow', 'yellow', 'yellow', 'yellow'],
    ],
    gutter: 1,
  }

  constructor(p) {
    super(p)
    this.style = { border: '1px solid' }
    this.canvas = React.createRef()
  }

  componentDidMount() {
    console.log(this.props)
    this.props.pixels.forEach((row, y) => row.forEach((color, x) => {
      this.drawPixel(color, x, y)
    }))
  }

  componentDidUpdate(prevProps) {
    this.canvasContext().clearRect(0, 0, 300, 300)
    this.props.pixels.forEach((row, y) => row.forEach((color, x) => {
      this.drawPixel(color, x, y)
    }))
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

  render() {
    const { width, height } = this.props
    return <canvas ref={this.canvas} style={this.style} width={width} height={height}/>
  }
}
