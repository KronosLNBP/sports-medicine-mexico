# sports-medicine-mexico

Sitio de **Sports Medicine México — Sports & Science** (https://sportsmedicine.com.mx): fisioterapia avanzada para deportistas y personas mayores. 5 sedes en CDMX, Pachuca y Puebla. Parte de Grupo Empresarial Díaz.

Sitio estático (HTML, CSS y JavaScript, sin compilación). Reemplaza el sitio anterior hecho con Materialize.

## Estructura

```
index.html                     Página de inicio (una sola página con secciones)
atletas.html                   Fisioterapia para el atleta
personas-mayores.html          Fisioterapia para personas mayores (paciente y familiar)
sedes.html                     Las 5 sedes por ciudad: dirección, teléfono, cómo llegar y horario de Del Valle
aviso-de-privacidad.html       Aviso de privacidad
404.html                       Página de error
servicios.html, contacto.html  Redirigen a /#programas y /#cita (páginas del sitio anterior)
sucursales.html                Redirige a sedes.html
css/styles.css                 Estilos "bienestar suave": crema, azul suave y verde salvia (Fraunces + Nunito Sans)
js/config.js                   Número de WhatsApp (editar aquí)
js/main.js                     Menú, filtro de sedes, formulario, animaciones de entrada y botón «Volver arriba»
robots.txt, sitemap.xml        SEO
```

El logo (`img/logo.png`) ya está en el hosting y no se toca al publicar.

## Páginas publicadas
- `/` (inicio), `atletas.html`, `personas-mayores.html`, `sedes.html`, `aviso-de-privacidad.html`
- Redirecciones (no van en sitemap.xml): `servicios.html`, `sucursales.html`, `contacto.html`

## Datos usados (del sitio anterior)
- WhatsApp y citas: 55 3501 0034 · citas@sportsmedicine.com.mx
- Horario sede Del Valle: L–V 9:00–20:00, sábados 9:00–14:00
- Sedes: Del Valle, Tepeyac y Balbuena (CDMX), Pachuca (Hospital Intermédica) y Puebla (Col. Anzures), con sus teléfonos.

## Pendientes
- Fotos reales de las instalaciones y del equipo (el sitio anterior solo tenía imágenes de banco).
- Horarios de las demás sedes.
- Nombres y cédulas de los fisioterapeutas responsables.
- Precios o paquetes, si se quieren mostrar.
- Desactivar el listado de carpetas en el hosting (hoy /img/ muestra su contenido).

## Publicación
Cada cambio en `main` se publica por FTP (`.github/workflows/deploy.yml`) con los secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` y `FTP_SERVER_DIR` de este repositorio. Antes de subir, el flujo respalda las páginas que reemplaza en los *Artifacts* de cada ejecución (90 días).
