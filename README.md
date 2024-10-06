
# App de generación de actividades

Esta es una aplicación sencilla que permite generar actividades al azar o filtrarlas por categorías específicas como "educación", "social", "recreacional", entre otras. Los usuarios pueden seleccionar varios filtros y, si no hay filtros activos, la aplicación generará una actividad aleatoria desde un endpoint específico.

## Tecnologías

El proyecta está hecho con React, creado con Vite desde un [template](https://github.com/martinfrangul/Starter-Template-React-Tailwind-DaisyUI) propio.
Para el diseño se usó Tailwind + DaisyUI.

## Requisitos
**Node.js**
Se requiere la versión 14.0.0 o superior.

## Funcionalidades

- Selección de actividades mediante filtros: Los usuarios pueden elegir entre varias categorías para recibir actividades relacionadas.
- Generación de actividad aleatoria: Si no se selecciona ningún filtro, la aplicación generará una actividad al azar.
- Visualización de actividades: Muestra la actividad seleccionada en el área principal de la interfaz.
- Manejo de errores: Si ocurre un error en la solicitud, el mensaje de error se mostrará en pantalla.

## Componentes

### `App`
- **Estado**:
  - `filters`: Objeto que contiene los filtros activos.
  
  - `error`: Almacena cualquier error ocurrido durante las solicitudes a la API.
  
  - `filteredData`: Almacena los datos de actividades filtradas o generadas.
  
- **Funciones**:
  - `onFiltersChange(newFilters)`: Actualiza los filtros según la selección del componente `Filters`.
  
  - `onGenerateHandler()`: Llama a la API para generar actividades. Si no hay filtros activos, realiza una solicitud al endpoint `/random`. Si hay filtros activos, hace llamadas simultáneas por cada filtro.
  
### `Filters`
- Muestra botones que permiten activar o desactivar los filtros. Cada botón está asociado a una categoría de actividad.

## Instalación y Uso

1.  Clona el repositorio:
    
    ```bash   
    `git clone https://github.com/martinfrangul/boored-hackato.git` 
    ```
    
2.  Instala las dependencias:
    
    ```bash
    `npm install` 
3.  Inicia el servidor de desarrollo:
    ```bash    
    `npm run dev` 
    ```

La aplicación estará disponible en `http://localhost:3000`.


## Configuración de Vite

Este proyecto utiliza [Vite](https://vitejs.dev/) para el desarrollo. La configuración de Vite incluye un proxy para resolver problemas de CORS al hacer llamadas a la API.

### `vite.config.js`

```bash
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://bored-api.appbrewery.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

Este proxy redirige las solicitudes a la API a la URL correcta, evitando problemas de CORS durante el desarrollo.


