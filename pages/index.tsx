import Head from 'next/head'

import { Inter } from 'next/font/google'
import { MonitorState } from '@/uptime.types'
import { KVNamespace } from '@cloudflare/workers-types'
import config from '@/uptime.config'
import OverallStatus from '@/components/OverallStatus'
import Header from '@/components/Header'

export const runtime = 'experimental-edge'
const inter = Inter({ subsets: ['latin'] })

export default function Home({ state }: { state: MonitorState }) {
  return (
    <>
      <Head>
        <title>{config.page.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inter.className}>
        
        <Header />
        <OverallStatus state={state} />

        {
          config.monitors.map(monitor => (
            <div key={monitor.id}>
              <h2>{monitor.name}</h2>
            </div>
          ))
        }
        <p>{JSON.stringify(state)}</p>
      </main>
    </>
  )
}


export async function getServerSideProps() {
  const { UPTIMEFLARE_STATE } = process.env as unknown as { UPTIMEFLARE_STATE: KVNamespace }
  const state = await UPTIMEFLARE_STATE.get('state', 'json') as unknown as MonitorState

  return { props: { state } }
}