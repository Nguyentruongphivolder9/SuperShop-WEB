import { Component } from 'react'
import CanvasJSReact from '@canvasjs/react-charts'

const CanvasJS = CanvasJSReact.CanvasJS
const CanvasJSChart = CanvasJSReact.CanvasJSChart

type AppProps = {}

type AppState = {}

class App extends Component<AppProps, AppState> {
  render() {
    const options = {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: 'Biểu đồ'
      },
      axisX: {
        title: 'Social Network',
        reversed: true
      },
      axisY: {
        title: 'Monthly Active Users',
        includeZero: true,
        labelFormatter: this.addSymbols
      },
      data: [
        {
          type: 'bar',
          name: 'Y1',
          showInLegend: true,
          dataPoints: [
            { y: 2200000000, label: 'Facebook' },
            { y: 1800000000, label: 'YouTube' },
            { y: 800000000, label: 'Instagram' },
            { y: 563000000, label: 'Qzone' },
            { y: 376000000, label: 'Weibo' },
            { y: 336000000, label: 'Twitter' },
            { y: 330000000, label: 'Reddit' }
          ]
        },
        {
          type: 'bar',
          name: 'Y2',
          showInLegend: true,
          dataPoints: [
            { y: 2500000000, label: 'Facebook' },
            { y: 1900000000, label: 'YouTube' },
            { y: 900000000, label: 'Instagram' },
            { y: 600000000, label: 'Qzone' },
            { y: 400000000, label: 'Weibo' },
            { y: 350000000, label: 'Twitter' },
            { y: 340000000, label: 'Reddit' }
          ]
        }
      ]
    }

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    )
  }

  addSymbols(e: { value: number }) {
    const suffixes = ['', 'K', 'M', 'B']
    let order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0)
    if (order > suffixes.length - 1) order = suffixes.length - 1
    const suffix = suffixes[order]
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix
  }
}

export default App
