const pageConfig = {
  // Title for your status page
  title: "wukaige's Status Page",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://github.com/gitduk', label: 'GitHub' },
    { link: 'https://blog.wukaige.com/', label: 'Blog' },
    { link: 'mailto:wukaigee@gmail.com', label: 'Email Me', highlight: true },
  ],
}

const workerConfig = {
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
    },
  ],
  notification: {
    appriseApiServer: "https://apprise.example.com/notify",
    recipientUrl: "tgram://bottoken/ChatID",
    timeZone: "Asia/Shanghai",
    gracePeriod: 5,
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

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig }
