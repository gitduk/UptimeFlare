import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: "wukaige's Status Page",
  
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://github.com/gitduk', label: 'GitHub' },
    { link: 'https://blog.wukaige.com/', label: 'Blog' },
    { link: 'mailto:wukaigee@gmail.com', label: 'Email Me', highlight: true },
  ],
  
  // [OPTIONAL] Group your monitors
  // If not specified, all monitors will be shown in a single list
  // If specified, monitors will be grouped and ordered, not-listed monitors will be invisble (but still monitored)
  // group: {
  //   '🌐 Public (example group name)': ['foo_monitor', 'bar_monitor', 'more monitor ids...'],
  //   '🔐 Private': ['test_tcp_monitor'],
  // },
}

const workerConfig: WorkerConfig = {
  // Write KV at most every 3 minutes unless the status changed
  kvWriteCooldownMinutes: 3,
  // Enable HTTP Basic auth for status page & API by uncommenting the line below, format `<USERNAME>:<PASSWORD>`
  // passwordProtection: 'username:password',
  // Define all your monitors here
  monitors: [
    {
      id: 'blog',
      name: "blog",
      method: 'GET',
      target: 'https://blog.wukaige.com/',
      statusPageLink: 'https://blog.wukaige.com/',
    },
    {
      id: 'myraw',
      name: "myraw",
      method: 'GET',
      target: 'https://raw.wukaige.com/',
      statusPageLink: 'https://raw.wukaige.com/',
    },
    {
      id: 'subc',
      name: "subc",
      method: 'GET',
      tooltip: 'sing-box 订阅转换',
      target: 'https://subc.wukaige.com/',
      statusPageLink: 'https://subc.wukaige.com/',
    },
    {
      id: 'zero',
      name: "zero",
      method: 'GET',
      target: 'https://zero.wukaige.com/',
      statusPageLink: 'https://zero.wukaige.com/',
    },
    {
      id: 'subs',
      name: "subs",
      method: 'GET',
      target: 'https://subs.wukaige.com/',
      statusPageLink: 'https://subs.wukaige.com/',
    }
  ],
  notification: {
    // [Optional] apprise API server URL
    // if not specified, no notification will be sent
    appriseApiServer: 'https://apprise.example.com/notify',
    // [Optional] recipient URL for apprise, refer to https://github.com/caronc/apprise
    // if not specified, no notification will be sent
    recipientUrl: 'tgram://bottoken/ChatID',
    // [Optional] timezone used in notification messages, default to "Etc/GMT"
    timeZone: 'Asia/Shanghai',
    // [Optional] grace period in minutes before sending a notification
    // notification will be sent only if the monitor is down for N continuous checks after the initial failure
    // if not specified, notification will be sent immediately
    gracePeriod: 5,
    // [Optional] disable notification for monitors with specified ids
    skipNotificationIds: ['zero'],
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called when there's a status change for any monitor
      // Write any Typescript code here
      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
      // Write any Typescript code here
    },
  },
}

// You can define multiple maintenances here
// During maintenance, an alert will be shown at status page
// Also, related downtime notifications will be skipped (if any)
// Of course, you can leave it empty if you don't need this feature
// const maintenances: MaintenanceConfig[] = []
const maintenances: MaintenanceConfig[] = [
  {
    // [Optional] Monitor IDs to be affected by this maintenance
    monitors: ['foo_monitor', 'bar_monitor'],
    // [Optional] default to "Scheduled Maintenance" if not specified
    title: 'Test Maintenance',
    // Description of the maintenance, will be shown at status page
    body: 'This is a test maintenance, server software upgrade',
    // Start time of the maintenance, in UNIX timestamp or ISO 8601 format
    start: '2025-04-27T00:00:00+08:00',
    // [Optional] end time of the maintenance, in UNIX timestamp or ISO 8601 format
    // if not specified, the maintenance will be considered as on-going
    end: '2025-04-30T00:00:00+08:00',
    // [Optional] color of the maintenance alert at status page, default to "yellow"
    color: 'blue',
  },
]

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig, maintenances }
