import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Felipe de Carvalho Figueiredo",
    short_name: "Felipe Figueiredo",
    description:
      "Academic and research profile of Felipe de Carvalho Figueiredo.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f5ef",
    theme_color: "#315f4d",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
