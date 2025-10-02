import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <link href="/static/pico.min.css" rel="stylesheet" />
        <link href="/static/styles.css" rel="stylesheet" />
        <title>Pitchfork Feed</title>
      </head>
      <body>{children}</body>
    </html>
  )
})
