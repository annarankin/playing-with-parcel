import * as React from 'react'
import { render } from 'react-dom'
import App from './app/app'
import 'antd/dist/antd.css'

const HalloWorld: React.SFC = () => (
  <div>
    <App/>
  </div>
)

render(<HalloWorld/>, document.getElementById('app'))
