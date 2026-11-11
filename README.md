# HMTZL Auto Lavado

Sitio web estático de promoción y cotización de Auto Lavado HMTZL, en Ario de Rosales, Michoacán.

## Qué incluye

- Presentación de servicios y paquetes.
- Información de contacto y ubicación.
- Cotizador interactivo que prepara la solicitud en WhatsApp.
- Diseño adaptable a móviles y escritorio.
- Metadatos SEO, datos estructurados, archivo robots.txt y mapa del sitio sitemap.xml.

## Estructura

- index.html: contenido y estructura del sitio.
- estilos.css: diseño visual y adaptación responsive.
- app.js: cotizador, navegación y enlaces de WhatsApp.
- fotos/: ilustraciones SVG utilizadas en la página.
- robots.txt: indicaciones para rastreadores.
- sitemap.xml: URL pública del sitio para buscadores.
- .github/workflows/static.yml: publicación automática en GitHub Pages.
- .github/workflows/codeql.yml: análisis de seguridad de GitHub Actions y JavaScript.

## Publicación

La página se publica desde la rama Principal mediante GitHub Actions.

Sitio: https://erickmtzm41-cpu.github.io/Lava-tu-auto-aqui/

## Prueba local

Desde la carpeta del proyecto, ejecuta:

```bash
python -m http.server 8000
```

Después abre http://localhost:8000

## Requisitos

- Navegador moderno.
- Conexión a internet para cargar Google Fonts y la imagen externa del encabezado.

## Mantenimiento

- Precios y lógica del cotizador: app.js y el contenido correspondiente en index.html.
- Textos y estructura: index.html.
- Estilos y diseño responsive: estilos.css.
- Rastreadores e indexación: robots.txt y sitemap.xml.

Proyecto de Auto Lavado HMTZL.
