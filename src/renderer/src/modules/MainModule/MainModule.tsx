import { AppShell, Button } from '@mantine/core'
import Navbar from '@renderer/components/layouts/Navbar'
import sample from '@renderer/locale/sample.json'

export default function MainModule(): JSX.Element {
  const stage = 1

  return (
    <AppShell layout="alt" navbar={<Navbar />}>
      <Group data={sample} stage={stage} label={'Logee Translation'} />
    </AppShell>
  )
}

function populateGroup(data, stage) {
  const HTML: JSX.Element[] = []
  for (const x in data) {
    if (typeof data[x] === 'object') {
      // console.log(`${x} push to group`)
      HTML.push(<Groups data={data[x]} label={x} stage={stage} />)
    }
    // if (typeof data[x] === 'string') {
    //   console.log(`${x} push to button`)
    //   HTML.push(<LinkGroup label={x} value={data[x]} />)
    // }
  }
  return HTML
}

function Group({ data, stage, label }) {
  // console.log(groups)
  return (
    <div>
      <Button>
        {stage} {label}
      </Button>
      <ol style={{ marginLeft: 10 }}>{populateGroup(data, stage + 1).map((el) => el)}</ol>
    </div>
  )
}

// function LinkGroup({ label, value }) {
//   // console.log('LinkGroup', label, value)
//   if (!value) {
//     return (
//       <Button>
//         {label} : {value ? 'has value' : ''}
//       </Button>
//     )
//   }
// }

function Groups({ data, stage, label }) {
  // console.log('Groups', label, data)
  return (
    <div>
      <br />
      <Group label={label} data={data} stage={stage + 1} />
    </div>
  )
}
