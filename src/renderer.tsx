import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <link href="/static/pico.min.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
})
