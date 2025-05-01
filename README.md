# ⚛️ Despliegue de Aplicación React

Este documento describe los pasos necesarios para **desplegar una aplicación React** en un entorno de producción.

---

## 📋 Requisitos del Servidor

- **Node.js >= 16.x**
- **npm o yarn**
- **Servidor Web**: Nginx, Apache o cualquier servidor de archivos estáticos (como Vercel o Netlify)

---

## 🚀 Pasos para el Despliegue

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo-react.git
cd tu-repo-react
```

### 2. Instalar dependencias

Si usas **npm**:

```bash
npm install
```

Si usas **yarn**:

```bash
yarn install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz si necesitas configurar variables personalizadas:

```
REACT_APP_API_URL=https://api.tudominio.com
```

> Las variables deben empezar con `REACT_APP_` para ser accesibles desde el código.

### 4. Generar la versión de producción

```bash
npm run build
```

o

```bash
yarn build
```

Esto generará una carpeta `/build` con todos los archivos listos para producción.

---

## 🌐 Subir al servidor web

Puedes servir los archivos estáticos generados desde cualquier servidor web. Aquí algunos ejemplos:

### Opción 1: Servir con Nginx

```nginx
server {
    listen 80;
    server_name tudominio.com;

    root /ruta/a/tu-repo-react/build;
    index index.html index.htm;

    location / {
        try_files $uri /index.html;
    }
}
```

### Opción 2: Subir a Vercel, Netlify o GitHub Pages

- **Vercel**: Solo haz `vercel --prod` (requiere configuración previa)
- **Netlify**: Arrastra la carpeta `build` a la interfaz de Netlify o usa `netlify deploy`
- **GitHub Pages**: Puedes usar `gh-pages`:

```bash
npm install gh-pages --save-dev
```

En tu `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Y luego:

```bash
npm run deploy
```

---

## 🧪 Comprobaciones

Accede en el navegador:

```
http://tudominio.com
```

Verifica que tu aplicación se carga correctamente.

---
