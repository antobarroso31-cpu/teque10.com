# 🧀 Tequeñísimos Gourmet - Tienda Online de Tequeños Artesanales

¡Bienvenido al proyecto web de **Tequeñísimos Gourmet**! Una tienda online moderna, rápida y 100% interactiva diseñada para la venta y delivery de tequeños artesanales con queso llanero, sabores gourmet, combos para fiestas y pedidos directos a través de WhatsApp.

---

## 🌟 Características Destacadas

- **Diseño Gourmet & Moderno**: Paleta de colores cálida y atractiva (ámbar, queso derretido, modo oscuro elegante) con micro-animaciones y tipografía prémium de Google Fonts.
- **Fotografía Real en Alta Definición**: Incluye fotos reales de tequeños tradicionales, de guayaba y queso, chocolate/Nutella, tocineta ahumada y bandejas de fiesta.
- **Armador Interactivo de Combos ("Arma tu Fiesta")**:
  - Elige el tamaño del pack (12, 25, 50 o 100 tequeños).
  - Mezcla los sabores favoritos (Queso, Guayaba, Nutella, Tocineta, Jamón y Queso).
  - Selecciona salsas de la casa de regalo (Guasacaca criolla, Tártara de ajo, Miel mostaza, etc.).
  - Elige preparación: Fritos y calientes o Congelados para freír en casa/Airfryer.
- **Carrito de Compras Completo**:
  - Cajón lateral (*slide-over drawer*) con resumen en vivo.
  - Modificación de cantidades (+ / -) y eliminación de productos.
  - Soporte para códigos de descuento (ej: cupón `TEQUE10` para 10% OFF).
  - Cálculo automático de envío (Envío GRATIS en compras superiores a $25).
  - Persistencia con `localStorage` (no se borra al refrescar).
- **Integración con WhatsApp Directo**:
  - Modal de checkout con datos de entrega (Nombre, Teléfono, Dirección, Zona, Método de pago: Pago Móvil, Zelle, Efectivo, Tarjeta).
  - Genera automáticamente un mensaje estructurado con emojis y lista de productos para enviar por WhatsApp con un solo clic.
- **Guía Interactiva de Cocción (Airfryer / Sartén / Horno)**:
  - Calculador de tiempos y temperaturas exactas para que el queso estire y nunca se abra la masa.
- **Reseñas de Clientes & FAQ**:
  - Sección de testimonios reales y acordeón de preguntas frecuentes.
- **100% Responsivo**: Se adapta a la perfección a teléfonos celulares, tablets y computadoras de escritorio.

---

## 🚀 Cómo Probarla Localmente en tu Computadora

No necesitas instalar servidores complejos. Tienes dos opciones sencillas:

### Opción 1: Directo en tu Navegador
1. Ve a esta carpeta en el Explorador de Archivos de Windows.
2. Haz **doble clic en el archivo `index.html`**.
3. ¡Se abrirá inmediatamente en Google Chrome, Edge o tu navegador favorito!

### Opción 2: Con un Servidor Local Ligero (Opcional)
Si tienes Node.js instalado, puedes ejecutar en tu terminal:
```bash
npx serve .
```
Y abrir el enlace que aparece (ej: `http://localhost:3000`).

---

## ⚙️ Cómo Personalizar tu Tienda

Todos los ajustes clave están en el archivo [`app.js`](file:///c:/Users/Usuario/Documents/GitHub/spree/app.js) en la sección superior `STORE_CONFIG`:

```javascript
const STORE_CONFIG = {
  name: "Tequeñísimos Artesanal",
  whatsappNumber: "584121234567", // <-- Pon aquí tu número de teléfono con código de país
  currency: "$",
  deliveryFee: 2.50,
  freeDeliveryThreshold: 25.00,
  promoCodes: {
    "TEQUE10": 0.10, // 10% de descuento
    "FIESTA": 0.15   // 15% de descuento
  }
};
```

---

## 📤 Cómo Guardar este Proyecto en tu GitHub

Dado que ya tienes instalado **Git** y **GitHub Desktop**, puedes guardarlo en tu cuenta de GitHub (`antobarroso31-cpu`) siguiendo estos pasos:

### Opción A: Desde GitHub Desktop (La más fácil)
1. Abre el programa **GitHub Desktop**.
2. Verás los cambios listos en la pestaña de la izquierda.
3. En la esquina inferior izquierda escribe un título para el commit (ej: *"Página web de venta de tequeños gourmet"*).
4. Haz clic en **Commit to main**.
5. Si deseas publicarlo en un nuevo repositorio propio en GitHub:
   - Haz clic en el botón superior **Publish repository**.
   - Elige el nombre que desees (ej: `tienda-tequenos` o `tequenos-gourmet`).
   - Haz clic en **Publish repository**. ¡Listo!

### Opción B: Desde la Terminal (Git)
Si prefieres usar la terminal de comandos:
```bash
# 1. Agregar todos los archivos
git add .

# 2. Hacer el primer commit
git commit -m "Creación de la tienda online de Tequeñísimos Gourmet"

# 3. Vincular a tu repositorio en GitHub (crea uno vacío en github.com/new)
git remote add origin https://github.com/antobarroso31-cpu/tu-nuevo-repo.git

# 4. Subir los archivos a la rama main
git push -u origin main
```

---

## 🌐 Cómo Publicarla GRATIS en Internet con GitHub Pages

Una vez que hayas subido el proyecto a tu GitHub:
1. Entra a tu repositorio en **github.com**.
2. Ve a la pestaña **Settings** (Configuración) > **Pages** (en el menú izquierdo).
3. En **Branch**, selecciona `main` y la carpeta `/ (root)`.
4. Haz clic en **Save** (Guardar).
5. En 1 minuto tendrás un enlace público en internet (ej: `https://antobarroso31-cpu.github.io/tu-repo/`) para que tus clientes puedan pedir desde cualquier lugar del mundo.

---

*¡Hecho con cariño para hacer crecer tu negocio de tequeños!* 🧀🥖
