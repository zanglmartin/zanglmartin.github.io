import type { MetaDescriptor } from "react-router";

const siteUrl = "https://zanglmartin.github.io/";
const socialImageUrl = `${siteUrl}og.png`;

interface PageMeta {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
}

export function createPageMeta({
  title,
  description,
  path = "",
  type = "website",
}: PageMeta): MetaDescriptor[] {
  const canonical = new URL(path.replace(/^\//, ""), siteUrl).toString();

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: canonical },
    { property: "og:image", content: socialImageUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: socialImageUrl },
    { tagName: "link", rel: "canonical", href: canonical },
  ];
}
