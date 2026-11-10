# HMTZL Auto Lavado

Sitio web de promoción y cotización del servicio de lavado de autos HMTZL, en Ario de Rosales.

## Descripción

Este proyecto es una landing page estática que permite:
- presentar servicios y paquetes;
- mostrar información de contacto y ubicación;
- generar cotizaciones con WhatsApp;
- ofrecer una experiencia rápida y móvil.

## Estructura del repositorio

- `index.html` — contenido principal del sitio.
- `estilos.css` — estilos visuales y responsive.
- `app.js` — lógica de cotizador, navegación y WhatsApp.
- `fotos/` — ilustraciones locales usadas por la página.
- `README.md` — documentación del proyecto.
- `SECURITY.md` — política de vulnerabilidades.

## Cómo abrir el proyecto

Puedes abrir el archivo `index.html` directamente en tu navegador o usar un servidor local sencillo como:

```bash
python -m http.server 8000
```

Luego entra a:

```text
http://localhost:8000
```

## Requisitos

- Navegador moderno.
- Conexión a internet para cargar la fuente de Google Fonts y la imagen de fondo principal.

## Personalización

Para cambiar:
- precios y servicios: edita `app.js` y el contenido del modal/cotizador en `index.html`;
- colores y estilo: modifica variables en `estilos.css`;
- textos y mensajes: actualiza el contenido en `index.html`.

## Créditos

Proyecto desarrollado para HMTZL.
