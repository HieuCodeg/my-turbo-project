import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import * as React from "react";
import stylesheet from "./tailwind.css?url";

// temporarily simplified to isolate SSR error

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function meta() {
  return [
    { charset: "utf-8" },
    { title: "My Turbo Remix App" },
    { viewport: "width=device-width,initial-scale=1" },
  ];
}

export function links() {
  return [{ rel: "stylesheet", href: stylesheet }];
}
