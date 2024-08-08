import { BarChart } from '@mantine/charts'

export default function Demo() {
  return (
    <BarChart
      h={300}
      data={[
        { month: 'January', Clicks: 1800, Followers: 900, Revenue: 200, CostADS: 500, Search: 200 },
        { month: 'February', Clicks: 1200, Followers: 900, Revenue: 200, CostADS: 500, Search: 200 },
        { month: 'March', Clicks: 1200, Followers: 900, Revenue: 200, CostADS: 500, Search: 200 },
        { month: 'April', Clicks: 1200, Followers: 900, Revenue: 200, CostADS: 500, Search: 200 },
        { month: 'May', Clicks: 1200, Followers: 900, Revenue: 200, CostADS: 500, Search: 200 },
        { month: 'June', Clicks: 1200, Followers: 900, Revenue: 200, CostADS: 500, Search: 200 }
      ]}
      dataKey='month'
      xAxisLabel='Date'
      yAxisLabel='Amount'
      series={[
        { name: 'Clicks', color: 'violet.6' },
        { name: 'Followers', color: 'blue.6' },
        { name: 'Revenue', color: 'teal.6' }
      ]}
    />
  )
}
