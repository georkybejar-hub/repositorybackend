const dotenv = require('dotenv')
const http = require('http')
const { URL } = require('url')

dotenv.config()

const port = process.env.PORT ? Number(process.env.PORT) : 3000

const css = `
:root {
  --ml-yellow: #ffe600;
  --ml-blue: #2d3277;
  --ml-text: #111;
  --ml-muted: rgba(0,0,0,.65);
  --ml-card: #fff;
  --ml-border: rgba(0,0,0,.12);
  --ml-shadow: 0 6px 18px rgba(0,0,0,.10);
}

* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: var(--ml-text);
  background: #ededed;
}

a { color: inherit; text-decoration: none; }
button, input { font: inherit; }

.wrap { max-width: 1200px; margin: 0 auto; padding: 0 16px; }

.topbar {
  background: var(--ml-yellow);
  border-bottom: 1px solid rgba(0,0,0,.08);
}

.topbar__row1 {
  display: grid;
  grid-template-columns: 180px 1fr 320px;
  gap: 16px;
  align-items: center;
  padding: 10px 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: .2px;
}

.logo {
  width: 44px;
  height: 26px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(0,0,0,.14);
  display: grid;
  place-items: center;
  overflow: hidden;
}

.logo svg { width: 36px; height: 20px; }

.location {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(0,0,0,.75);
}

.location strong { display: block; font-size: 12px; }
.location span { display: block; opacity: .9; }

.search {
  display: grid;
  grid-template-columns: 1fr 44px;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 1px 0 rgba(0,0,0,.10);
}

.search input {
  width: 100%;
  border: 0;
  padding: 10px 12px;
  outline: none;
}

.search button {
  border: 0;
  background: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  border-left: 1px solid rgba(0,0,0,.12);
}

.topbar__row2 {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  padding: 8px 0 10px;
  font-size: 13px;
  color: rgba(0,0,0,.78);
}

.nav { display: flex; gap: 14px; flex-wrap: wrap; }
.nav a { padding: 6px 4px; border-radius: 8px; }
.nav a:hover { background: rgba(0,0,0,.06); }

.actions { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; justify-content: flex-end; }
.pill {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.55);
  border: 1px solid rgba(0,0,0,.10);
  font-size: 12px;
}
.pill strong { font-size: 12px; }

.hero {
  background: linear-gradient(180deg, #fff 0%, #f1ecff 52%, #e7e7e7 100%);
  border-bottom: 1px solid rgba(0,0,0,.06);
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 18px;
  padding: 22px 0 16px;
  align-items: center;
}

.hero__text h1 {
  margin: 0;
  font-size: 42px;
  line-height: 1;
  color: var(--ml-blue);
  letter-spacing: -.6px;
}

.hero__text h1 em { font-style: italic; font-weight: 900; font-size: 56px; display: inline-block; }

.hero__deal {
  display: flex;
  justify-content: flex-end;
}

.deal {
  width: 100%;
  max-width: 430px;
  border-radius: 18px;
  background: radial-gradient(1200px 380px at 40% 60%, rgba(255,255,255,.9), rgba(255,255,255,.35));
  border: 1px solid rgba(0,0,0,.10);
  padding: 18px;
  box-shadow: var(--ml-shadow);
  position: relative;
  overflow: hidden;
}

.deal__badge {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  background: var(--ml-yellow);
  border-radius: 999px;
  padding: 6px 10px;
  font-weight: 800;
  font-size: 12px;
}

.deal__off {
  margin-top: 8px;
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.deal__off strong { font-size: 54px; color: #173eaa; }
.deal__off span { font-weight: 700; color: rgba(0,0,0,.75); }

.deal__meta {
  margin-top: 8px;
  font-size: 12px;
  color: rgba(0,0,0,.7);
  display: flex;
  gap: 10px;
  align-items: center;
}

.deal__img {
  position: absolute;
  right: -10px;
  top: -18px;
  width: 190px;
  height: 190px;
  opacity: .9;
}

.deal__img svg { width: 100%; height: 100%; }

.cards {
  margin-top: -12px;
  padding-bottom: 22px;
}

.cardRail {
  background: rgba(255,255,255,.78);
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 16px;
  box-shadow: var(--ml-shadow);
  padding: 10px 10px 12px;
}

.railHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 6px 10px;
}

.railHead strong { font-size: 14px; }
.railHead small { color: var(--ml-muted); }

.rail {
  position: relative;
  overflow: hidden;
}

.railInner {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(200px, 1fr);
  gap: 10px;
  transition: transform 260ms ease;
  will-change: transform;
  padding: 2px 44px 2px 2px;
}

.tile {
  background: var(--ml-card);
  border: 1px solid var(--ml-border);
  border-radius: 14px;
  padding: 14px 14px 12px;
  box-shadow: 0 1px 0 rgba(0,0,0,.05);
  min-height: 150px;
}

.tile__icon {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  background: rgba(255,230,0,.28);
  border: 1px solid rgba(0,0,0,.08);
  display: grid;
  place-items: center;
  margin-bottom: 10px;
}

.tile__icon svg { width: 34px; height: 34px; }

.tile h3 { margin: 0 0 6px; font-size: 14px; }
.tile p { margin: 0 0 10px; font-size: 12px; color: var(--ml-muted); line-height: 1.25; }

.tile a.btn {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 9px 10px;
  border-radius: 10px;
  border: 1px solid rgba(25,118,210,.25);
  background: rgba(25,118,210,.06);
  color: #1b63d8;
  font-weight: 700;
  font-size: 12px;
}

.tile a.btn:hover { background: rgba(25,118,210,.10); }

.railBtn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,.12);
  background: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  box-shadow: 0 10px 22px rgba(0,0,0,.12);
}

.railBtn:active { transform: translateY(-50%) scale(.98); }

.content {
  padding: 18px 0 60px;
}

.pageCard {
  background: #fff;
  border: 1px solid rgba(0,0,0,.10);
  border-radius: 16px;
  box-shadow: var(--ml-shadow);
  padding: 16px;
}

.pageCard h2 { margin: 0 0 6px; font-size: 18px; }
.pageCard p { margin: 0 0 12px; color: var(--ml-muted); }

.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.mini {
  border: 1px solid rgba(0,0,0,.10);
  border-radius: 14px;
  padding: 12px;
  background: rgba(255,255,255,.9);
}

.mini strong { display: block; margin-bottom: 6px; }
.mini span { color: var(--ml-muted); font-size: 12px; }

.cookie {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 50;
}

.cookie__bar {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255,255,255,.92);
  border: 1px solid rgba(0,0,0,.12);
  border-radius: 12px;
  box-shadow: var(--ml-shadow);
  padding: 10px 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.cookie__bar p { margin: 0; font-size: 12px; color: rgba(0,0,0,.72); }
.cookie__actions { display: flex; gap: 10px; }

.cbtn {
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,.14);
  background: #fff;
  cursor: pointer;
  font-weight: 700;
  font-size: 12px;
}

.cbtn.primary {
  border-color: rgba(25,118,210,.30);
  background: rgba(25,118,210,.08);
  color: #1b63d8;
}

.foot {
  padding: 18px 0 26px;
  color: rgba(0,0,0,.62);
  font-size: 12px;
}

@media (max-width: 980px) {
  .topbar__row1 { grid-template-columns: 160px 1fr; }
  .topbar__row1 .pill { display: none; }
  .hero__grid { grid-template-columns: 1fr; }
  .hero__deal { justify-content: flex-start; }
  .hero__text h1 { font-size: 34px; }
  .hero__text h1 em { font-size: 48px; }
}

@media (max-width: 560px) {
  .topbar__row2 { display: none; }
  .railInner { grid-auto-columns: minmax(220px, 1fr); padding-right: 46px; }
  .grid2 { grid-template-columns: 1fr; }
}
`

function iconSvg(name) {
  if (name === 'user') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Z" stroke="#111" stroke-width="1.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0" stroke="#111" stroke-width="1.6" stroke-linecap="round"/></svg>`
  }
  if (name === 'pin') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-4.2 6-10a6 6 0 0 0-12 0c0 5.8 6 10 6 10Z" stroke="#111" stroke-width="1.6"/><path d="M12 11.3a2.1 2.1 0 1 0-2.1-2.1 2.1 2.1 0 0 0 2.1 2.1Z" stroke="#111" stroke-width="1.6"/></svg>`
  }
  if (name === 'money') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h16v10H4V8Z" stroke="#111" stroke-width="1.6"/><path d="M7 11h2M15 15h2" stroke="#111" stroke-width="1.6" stroke-linecap="round"/><path d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="#111" stroke-width="1.6"/></svg>`
  }
  if (name === 'trend') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 16l6-6 4 4 6-6" stroke="#111" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 8h4v4" stroke="#111" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  }
  if (name === 'box') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 8.2 12 4l7.5 4.2v7.6L12 20l-7.5-4.2V8.2Z" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 4v16" stroke="#111" stroke-width="1.6"/></svg>`
  }
  if (name === 'shop') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9h16l-1 11H5L4 9Z" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/><path d="M7 9V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" stroke="#111" stroke-width="1.6"/></svg>`
  }
  if (name === 'tag') {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12V4h8l10 10-8 8L3 12Z" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/><path d="M7.5 7.5h0.01" stroke="#111" stroke-width="3" stroke-linecap="round"/></svg>`
  }
  return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16" stroke="#111" stroke-width="1.6" stroke-linecap="round"/></svg>`
}

function baseLayout({ title, activePath, content }) {
  const navLeft = [
    { href: '/categorias', label: 'Categorías' },
    { href: '/ofertas', label: 'Ofertas' },
    { href: '/cupones', label: 'Cupones' },
    { href: '/moda', label: 'Moda' },
    { href: '/mercadoplay', label: 'Mercado Play' },
    { href: '/vender', label: 'Vender' },
    { href: '/ayuda', label: 'Ayuda' },
  ]
  const navRight = [
    { href: '/cuenta', label: 'Crea tu cuenta' },
    { href: '/cuenta?tab=login', label: 'Ingresa' },
    { href: '/compras', label: 'Mis compras' },
    { href: '/carrito', label: 'Carrito' },
  ]

  function link(href, label) {
    const isActive = activePath === href
    return `<a href="${href}"${isActive ? ' style="background: rgba(0,0,0,.08); font-weight: 800;"' : ''}>${label}</a>`
  }

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>${css}</style>
  </head>
  <body>
    <header class="topbar">
      <div class="wrap">
        <div class="topbar__row1">
          <div>
            <a class="brand" href="/">
              <span class="logo" aria-hidden="true">
                <svg viewBox="0 0 100 60" fill="none">
                  <path d="M10 30c10-18 70-18 80 0-10 18-70 18-80 0Z" fill="#fff2" stroke="#111" stroke-width="3"/>
                  <path d="M34 33c5 6 27 6 32 0" stroke="#111" stroke-width="3" stroke-linecap="round"/>
                </svg>
              </span>
              <span>mercado<br/>libre</span>
            </a>
            <div class="location">
              <span aria-hidden="true">${iconSvg('pin')}</span>
              <div>
                <strong>Enviar a</strong>
                <span>Lima Metropolitana</span>
              </div>
            </div>
          </div>

          <form class="search" action="/buscar" method="GET" role="search">
            <input name="q" placeholder="Buscar productos, marcas y más..." autocomplete="off" />
            <button type="submit" aria-label="Buscar">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style="width:18px;height:18px;">
                <path d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" stroke="#111" stroke-width="1.7"/>
                <path d="M16.5 16.5 21 21" stroke="#111" stroke-width="1.7" stroke-linecap="round"/>
              </svg>
            </button>
          </form>

          <div class="actions">
            <span class="pill">
              <strong>ENVÍO GRATIS</strong>
              <span style="color: rgba(0,0,0,.65); font-weight: 700;">HASTA S/25 DTO</span>
            </span>
          </div>
        </div>

        <div class="topbar__row2">
          <nav class="nav" aria-label="Navegación principal">
            ${navLeft.map((i) => link(i.href, i.label)).join('')}
          </nav>
          <nav class="nav" aria-label="Acciones">
            ${navRight.map((i) => link(i.href, i.label)).join('')}
          </nav>
        </div>
      </div>
    </header>

    ${content}

    <footer class="foot">
      <div class="wrap">Demo para Render + GitHub. API disponible en <a href="/api/health" style="text-decoration: underline;">/api/health</a>.</div>
    </footer>

    <div class="cookie" id="cookie">
      <div class="cookie__bar">
        <p>Usamos cookies para mejorar tu experiencia. Consulta más en nuestro <a href="/privacidad" style="text-decoration: underline;">Centro de Privacidad</a>.</p>
        <div class="cookie__actions">
          <button class="cbtn" id="cookieCfg" type="button">Configurar cookies</button>
          <button class="cbtn primary" id="cookieOk" type="button">Aceptar cookies</button>
        </div>
      </div>
    </div>

    <script>
      ;(function () {
        const key = 'cookieAccepted'
        const cookie = document.getElementById('cookie')
        const ok = document.getElementById('cookieOk')
        const cfg = document.getElementById('cookieCfg')

        function hide() {
          if (cookie) cookie.style.display = 'none'
        }

        if (localStorage.getItem(key) === '1') hide()

        if (ok) {
          ok.addEventListener('click', function () {
            localStorage.setItem(key, '1')
            hide()
          })
        }

        if (cfg) {
          cfg.addEventListener('click', function () {
            alert('Demo: aquí podrías mostrar un modal de configuración de cookies.')
          })
        }
      })()
    </script>
  </body>
</html>`
}

function homePage() {
  const tiles = [
    {
      title: 'Ingresa a tu cuenta',
      desc: 'Disfruta de ofertas y compra sin límites.',
      cta: 'Ingresar a tu cuenta',
      href: '/cuenta?tab=login',
      icon: 'user',
    },
    {
      title: 'Ingresa tu ubicación',
      desc: 'Consulta costos y tiempos de entrega.',
      cta: 'Ingresar ubicación',
      href: '/ubicacion',
      icon: 'pin',
    },
    {
      title: 'Menos de S/100',
      desc: 'Descubre productos con precios bajos.',
      cta: 'Mostrar productos',
      href: '/productos?max=100',
      icon: 'money',
    },
    {
      title: 'Más vendidos',
      desc: 'Explora los productos con tendencia.',
      cta: 'Ir a Más vendidos',
      href: '/mas-vendidos',
      icon: 'trend',
    },
    {
      title: 'Compra protegida',
      desc: 'Puedes devolver tu compra gratis.',
      cta: 'Cómo funciona',
      href: '/compra-protegida',
      icon: 'box',
    },
    {
      title: 'Tiendas oficiales',
      desc: 'Encuentra tus marcas preferidas.',
      cta: 'Mostrar tiendas',
      href: '/tiendas',
      icon: 'shop',
    },
    {
      title: 'Cupones',
      desc: 'Aprovecha descuentos en categorías seleccionadas.',
      cta: 'Ver cupones',
      href: '/cupones',
      icon: 'tag',
    },
    {
      title: 'Ofertas relámpago',
      desc: 'Promos por tiempo limitado.',
      cta: 'Ver ofertas',
      href: '/ofertas',
      icon: 'tag',
    },
  ]

  const content = `
    <main>
      <section class="hero">
        <div class="wrap">
          <div class="hero__grid">
            <div class="hero__text">
              <h1>Lo que quiere<br/><em>mamá</em></h1>
            </div>
            <div class="hero__deal">
              <div class="deal" role="region" aria-label="Promoción">
                <span class="deal__badge">HASTA <strong>50%</strong> OFF</span>
                <div class="deal__off">
                  <strong>50%</strong>
                  <span>OFF</span>
                </div>
                <div class="deal__meta">
                  <span style="display:inline-flex;align-items:center;gap:8px;">
                    <span aria-hidden="true" style="width:16px;height:16px;display:inline-grid;place-items:center;">
                      <svg viewBox="0 0 24 24" fill="none"><path d="M3 7h13l5 5-5 5H3V7Z" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/><path d="M7 12h0.01" stroke="#111" stroke-width="3" stroke-linecap="round"/></svg>
                    </span>
                    Envíos gratis desde S/39
                  </span>
                </div>
                <div class="deal__img" aria-hidden="true">
                  <svg viewBox="0 0 200 200" fill="none">
                    <path d="M100 22c22 0 40 18 40 40 0 44-40 116-40 116S60 106 60 62c0-22 18-40 40-40Z" fill="rgba(173,120,255,.35)" stroke="rgba(45,50,119,.35)" stroke-width="2"/>
                    <path d="M78 92c12-10 32-10 44 0" stroke="rgba(45,50,119,.6)" stroke-width="4" stroke-linecap="round"/>
                    <path d="M72 66c18-18 38-18 56 0" stroke="rgba(45,50,119,.5)" stroke-width="4" stroke-linecap="round"/>
                    <path d="M92 112h16" stroke="rgba(45,50,119,.55)" stroke-width="5" stroke-linecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <section class="cards" aria-label="Accesos rápidos">
            <div class="cardRail">
              <div class="railHead">
                <div>
                  <strong>Accesos rápidos</strong>
                  <small>Más ventanas para navegar</small>
                </div>
                <small id="railState">1 / 2</small>
              </div>
              <div class="rail">
                <div class="railInner" id="railInner">
                  ${tiles
                    .map(
                      (t) => `
                    <article class="tile">
                      <div class="tile__icon" aria-hidden="true">${iconSvg(t.icon)}</div>
                      <h3>${t.title}</h3>
                      <p>${t.desc}</p>
                      <a class="btn" href="${t.href}">${t.cta}</a>
                    </article>
                  `
                    )
                    .join('')}
                </div>
                <button class="railBtn" id="railNext" type="button" aria-label="Siguiente">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style="width:18px;height:18px;">
                    <path d="M9 6l6 6-6 6" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section class="content">
        <div class="wrap">
          <div class="pageCard">
            <h2>Funciona en Render</h2>
            <p>El servidor usa <code>process.env.PORT</code> (o 3000 local) y entrega HTML en <code>/</code>. Prueba también:</p>
            <div class="grid2">
              <div class="mini">
                <strong>API de salud</strong>
                <span><a href="/api/health" style="text-decoration: underline;">/api/health</a></span>
              </div>
              <div class="mini">
                <strong>Búsqueda</strong>
                <span>Escribe algo en el buscador y verás resultados.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <script>
      ;(function () {
        const inner = document.getElementById('railInner')
        const next = document.getElementById('railNext')
        const state = document.getElementById('railState')
        if (!inner || !next) return

        let page = 0
        const pages = 2

        function apply() {
          const width = inner.parentElement ? inner.parentElement.clientWidth : 0
          const shift = Math.max(0, width - 62)
          inner.style.transform = 'translateX(' + (-page * shift) + 'px)'
          if (state) state.textContent = (page + 1) + ' / ' + pages
        }

        next.addEventListener('click', function () {
          page = (page + 1) % pages
          apply()
        })

        window.addEventListener('resize', apply)
        apply()
      })()
    </script>
  `

  return baseLayout({ title: 'mercado libre | demo', activePath: '/', content })
}

function pageTemplate({ title, headline, description, links }) {
  const content = `
    <main class="content">
      <div class="wrap">
        <div class="pageCard">
          <h2>${headline}</h2>
          <p>${description}</p>
          <div class="grid2">
            ${links
              .map(
                (l) => `
              <div class="mini">
                <strong><a href="${l.href}" style="text-decoration: underline;">${l.label}</a></strong>
                <span>${l.desc}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    </main>
  `
  return baseLayout({ title, activePath: '', content })
}

function buscarPage(query) {
  const q = (query || '').trim()
  const safe = q.replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]))
  const content = `
    <main class="content">
      <div class="wrap">
        <div class="pageCard">
          <h2>Resultados para: <span style="color: rgba(0,0,0,.72);">${safe || '(vacío)'}</span></h2>
          <p>Esta búsqueda funciona con un endpoint JSON (<code>/api/search</code>) y se renderiza en la página.</p>
          <div class="mini" style="margin-bottom: 12px;">
            <strong>Endpoint</strong>
            <span><a href="/api/search?q=${encodeURIComponent(q)}" style="text-decoration: underline;">/api/search?q=${encodeURIComponent(q)}</a></span>
          </div>
          <div id="results" class="grid2"></div>
        </div>
      </div>
    </main>
    <script>
      ;(async function () {
        const root = document.getElementById('results')
        if (!root) return
        const q = ${JSON.stringify(q)}
        const res = await fetch('/api/search?q=' + encodeURIComponent(q), { headers: { 'Accept': 'application/json' } })
        const data = await res.json()
        if (!data || !Array.isArray(data.items) || data.items.length === 0) {
          root.innerHTML = '<div class="mini"><strong>Sin resultados</strong><span>Prueba con: audífonos, laptop, zapatillas, perfume.</span></div>'
          return
        }
        root.innerHTML = data.items.map(function (item) {
          return '<div class="mini">' +
            '<strong>' + item.title + '</strong>' +
            '<span>Precio: S/ ' + item.price + ' · Envío: ' + item.shipping + '</span>' +
          '</div>'
        }).join('')
      })()
    </script>
  `
  return baseLayout({ title: `Buscar: ${safe || ''}`, activePath: '', content })
}

function json(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

function html(res, statusCode, markup) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(markup)
}

function mockSearchItems(q) {
  const base = [
    { title: 'Audífonos Bluetooth', price: 79.9, shipping: 'gratis desde S/39' },
    { title: 'Laptop 15" Ryzen', price: 1899, shipping: 'gratis' },
    { title: 'Zapatillas urbanas', price: 129.9, shipping: 'estándar' },
    { title: 'Perfume floral', price: 99.9, shipping: 'gratis desde S/39' },
    { title: 'Mochila impermeable', price: 59.9, shipping: 'estándar' },
    { title: 'Teclado mecánico', price: 149.9, shipping: 'gratis desde S/39' },
    { title: 'Mouse gamer', price: 69.9, shipping: 'estándar' },
    { title: 'Smartwatch', price: 119.9, shipping: 'gratis desde S/39' },
  ]
  const query = (q || '').trim().toLowerCase()
  if (!query) return base.slice(0, 6)
  return base.filter((i) => i.title.toLowerCase().includes(query)).slice(0, 8)
}

function requestController(req, res) {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

  if (url.pathname === '/favicon.ico') {
    res.statusCode = 204
    res.end()
    return
  }

  if (url.pathname === '/api/health') {
    json(res, 200, {
      ok: true,
      service: 'despliegue01',
      method: req.method,
      path: url.pathname,
    })
    return
  }

  if (url.pathname === '/api/search') {
    const q = url.searchParams.get('q') || ''
    json(res, 200, { ok: true, q, items: mockSearchItems(q) })
    return
  }

  if (req.method !== 'GET') {
    json(res, 405, { ok: false, error: 'Method Not Allowed', method: req.method })
    return
  }

  if (url.pathname === '/') {
    html(res, 200, homePage())
    return
  }

  if (url.pathname === '/buscar') {
    html(res, 200, buscarPage(url.searchParams.get('q') || ''))
    return
  }

  if (url.pathname === '/cuenta') {
    const tab = url.searchParams.get('tab') || 'registro'
    html(
      res,
      200,
      pageTemplate({
        title: 'Cuenta | demo',
        headline: tab === 'login' ? 'Ingresa a tu cuenta' : 'Crea tu cuenta',
        description:
          tab === 'login'
            ? 'Ventana de ingreso (demo). Aquí podrías validar credenciales y usar sesiones.'
            : 'Ventana de registro (demo). Aquí podrías crear usuarios.',
        links: [
          { href: '/cuenta?tab=login', label: 'Ir a Ingreso', desc: 'Simula el login.' },
          { href: '/cuenta?tab=registro', label: 'Ir a Registro', desc: 'Simula el registro.' },
          { href: '/api/health', label: 'Ver API', desc: 'Endpoint de salud del backend.' },
          { href: '/', label: 'Volver al inicio', desc: 'Home con el carrusel.' },
        ],
      })
    )
    return
  }

  if (url.pathname === '/ubicacion') {
    html(
      res,
      200,
      pageTemplate({
        title: 'Ubicación | demo',
        headline: 'Ingresa tu ubicación',
        description: 'Ventana de ubicación (demo). Aquí podrías guardar ciudad/distrito para calcular envíos.',
        links: [
          { href: '/buscar?q=envio', label: 'Buscar envíos', desc: 'Prueba el buscador.' },
          { href: '/compra-protegida', label: 'Compra protegida', desc: 'Ventana informativa.' },
          { href: '/tiendas', label: 'Tiendas oficiales', desc: 'Ventana de tiendas.' },
          { href: '/', label: 'Volver al inicio', desc: 'Home.' },
        ],
      })
    )
    return
  }

  if (url.pathname === '/productos') {
    const max = Number(url.searchParams.get('max') || '0')
    html(
      res,
      200,
      pageTemplate({
        title: 'Productos | demo',
        headline: max ? `Productos menos de S/${max}` : 'Productos',
        description: 'Ventana de productos (demo). La lista real vendría de tu base de datos.',
        links: [
          { href: '/buscar?q=audífonos', label: 'Buscar audífonos', desc: 'Ejemplo de búsqueda.' },
          { href: '/buscar?q=laptop', label: 'Buscar laptop', desc: 'Ejemplo de búsqueda.' },
          { href: '/mas-vendidos', label: 'Más vendidos', desc: 'Ventana de tendencia.' },
          { href: '/', label: 'Volver al inicio', desc: 'Home.' },
        ],
      })
    )
    return
  }

  if (url.pathname === '/mas-vendidos') {
    html(
      res,
      200,
      pageTemplate({
        title: 'Más vendidos | demo',
        headline: 'Más vendidos',
        description: 'Ventana de tendencia (demo). Puedes conectar con un endpoint real de productos.',
        links: [
          { href: '/buscar?q=zapatillas', label: 'Buscar zapatillas', desc: 'Ejemplo.' },
          { href: '/ofertas', label: 'Ver ofertas', desc: 'Ventana de ofertas.' },
          { href: '/cupones', label: 'Ver cupones', desc: 'Ventana de cupones.' },
          { href: '/', label: 'Volver al inicio', desc: 'Home.' },
        ],
      })
    )
    return
  }

  if (url.pathname === '/compra-protegida') {
    html(
      res,
      200,
      pageTemplate({
        title: 'Compra protegida | demo',
        headline: 'Compra protegida',
        description: 'Ventana informativa (demo). Aquí podrías mostrar políticas y un flujo de devoluciones.',
        links: [
          { href: '/api/health', label: 'Ver API', desc: 'Comprueba que el backend está activo.' },
          { href: '/ubicacion', label: 'Configurar ubicación', desc: 'Para calcular envíos.' },
          { href: '/tiendas', label: 'Tiendas oficiales', desc: 'Marcas preferidas.' },
          { href: '/', label: 'Volver al inicio', desc: 'Home.' },
        ],
      })
    )
    return
  }

  if (url.pathname === '/tiendas') {
    html(
      res,
      200,
      pageTemplate({
        title: 'Tiendas oficiales | demo',
        headline: 'Tiendas oficiales',
        description: 'Ventana de tiendas (demo). Aquí podrías mostrar marcas y catálogos.',
        links: [
          { href: '/buscar?q=smartwatch', label: 'Buscar smartwatch', desc: 'Ejemplo.' },
          { href: '/moda', label: 'Moda', desc: 'Ventana de categoría.' },
          { href: '/categorias', label: 'Categorías', desc: 'Navegación por categorías.' },
          { href: '/', label: 'Volver al inicio', desc: 'Home.' },
        ],
      })
    )
    return
  }

  const simplePages = {
    '/categorias': 'Categorías',
    '/ofertas': 'Ofertas',
    '/cupones': 'Cupones',
    '/moda': 'Moda',
    '/mercadoplay': 'Mercado Play',
    '/vender': 'Vender',
    '/ayuda': 'Ayuda',
    '/compras': 'Mis compras',
    '/carrito': 'Carrito',
    '/privacidad': 'Centro de Privacidad',
  }

  if (Object.prototype.hasOwnProperty.call(simplePages, url.pathname)) {
    const name = simplePages[url.pathname]
    html(
      res,
      200,
      pageTemplate({
        title: `${name} | demo`,
        headline: name,
        description: `Ventana "${name}" (demo).`,
        links: [
          { href: '/buscar?q=promo', label: 'Buscar promo', desc: 'Ejemplo de búsqueda.' },
          { href: '/api/health', label: 'API', desc: 'Salud del backend.' },
          { href: '/cuenta', label: 'Cuenta', desc: 'Registro / ingreso.' },
          { href: '/', label: 'Inicio', desc: 'Home con carrusel.' },
        ],
      })
    )
    return
  }

  json(res, 404, { ok: false, error: 'Not Found', path: url.pathname })
}

const server = http.createServer(requestController)

server.listen(port, '0.0.0.0', function () {
  console.log('Aplicacion corriendo en: ' + port)
})
