import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("about", "./routes/about.tsx"),
  route("experience", "./routes/experience.tsx"),
  route("expertise", "./routes/expertise.tsx"),
  route("case-studies", "./routes/case-studies.tsx"),
  route("case-studies/:slug", "./routes/case-study.tsx"),
] satisfies RouteConfig;
