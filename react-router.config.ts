import type { Config } from "@react-router/dev/config";


export default {
  basename: "/",
  buildDirectory: "build",
  ssr: false,
  routeDiscovery: { mode: "initial" },
  prerender: [
    "/",
    "/about",
    "/experience",
    "/expertise",
    "/case-studies",
    "/case-studies/mobile-reliability",
    "/case-studies/payment-sdks",
    "/case-studies/fintech-architecture"
  ]
} satisfies Config;
