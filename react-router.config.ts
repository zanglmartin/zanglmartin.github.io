import type { Config } from "@react-router/dev/config";
import { routeManifest } from "./app/content/routes";
import "./app/content/validate";
export default {
  basename: "/",
  buildDirectory: "build",
  ssr: false,
  routeDiscovery: { mode: "initial" },
  prerender: routeManifest.map((route) => route.path),
} satisfies Config;
