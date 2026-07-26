import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Felipe de Carvalho Figueiredo",
    short_name: "Felipe Figueiredo",
    description: "Academic profile of Felipe de Carvalho Figueiredo.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2eee6",
    theme_color: "#823d32",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
