const dotenv = require('dotenv')
const http = require('http')
const { URL } = require('url')

dotenv.config()

const port = process.env.PORT ? Number(process.env.PORT) : 3000

const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>despliegue01</title>
    <style>
      :root { color-scheme: light dark; }
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 0; padding: 24px; }
      .card { max-width: 720px; margin: 0 auto; border: 1px solid rgba(127,127,127,.35); border-radius: 12px; padding: 18px; }
      h1 { margin: 0 0 8px; font-size: 22px; }
      p { margin: 0 0 14px; opacity: .9; }
      button { padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(127,127,127,.45); background: transparent; cursor: pointer; }
      pre { margin: 14px 0 0; padding: 12px; border-radius: 10px; background: rgba(127,127,127,.12); overflow: auto; }
      .row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
      small { opacity: .75; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Frontend (sin framework)</h1>
      <p>Esta página vive en el mismo servidor Node. Prueba el endpoint <code>/api/health</code>.</p>
      <div class="row">
        <button id="btn">Consultar API</button>
        <small id="status">Listo</small>
      </div>
      <pre id="out">{}</pre>
    </div>
    <script>
      const btn = document.getElementById('btn')
      const out = document.getElementById('out')
      const status = document.getElementById('status')

      async function load() {
        status.textContent = 'Cargando...'
        out.textContent = '{}'
        try {
          const res = await fetch('/api/health', { headers: { 'Accept': 'application/json' } })
          const data = await res.json()
          out.textContent = JSON.stringify(data, null, 2)
          status.textContent = 'OK'
        } catch (e) {
          status.textContent = 'Error'
          out.textContent = String(e && e.message ? e.message : e)
        }
      }

      btn.addEventListener('click', load)
      load()
    </script>
  </body>
</html>`

function requestController(req, res) {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

  if (url.pathname === '/favicon.ico') {
    res.statusCode = 204
    res.end()
    return
  }

  if (url.pathname === '/') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(html)
    return
  }

  if (url.pathname === '/api/health') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(
      JSON.stringify({
        ok: true,
        service: 'despliegue01',
        method: req.method,
        path: url.pathname,
      })
    )
    return
  }

  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({ ok: false, error: 'Not Found', path: url.pathname }))
}

const server = http.createServer(requestController)

server.listen(port, '0.0.0.0', function () {
  console.log('Aplicacion corriendo en: ' + port)
})
