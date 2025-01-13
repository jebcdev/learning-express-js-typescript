### **1. Introducción a TypeScript**

**¿Qué es TypeScript?**
- Es un superconjunto tipado de JavaScript, desarrollado por Microsoft.

Cuando decimos que TypeScript (TS) es un "superconjunto" de JavaScript (JS), significa que TS amplía JS agregando características adicionales, pero manteniendo todo lo que ya existe en JS. En otras palabras:

TypeScript incluye todo JavaScript: Cualquier código JavaScript válido también es válido en TypeScript.
TypeScript añade nuevas capacidades que no están disponibles en JavaScript, como:
Tipado estático: Puedes definir tipos para variables, parámetros de funciones y más.
Interfaces y tipos personalizados: Facilitan estructurar datos de manera explícita.
Características avanzadas de POO: Como clases, interfaces y herencia con un sistema más robusto.
Verificación de errores en tiempo de desarrollo: Identifica errores antes de ejecutar el código.
- Permite detectar errores en tiempo de desarrollo gracias a su sistema de tipos.
- Transpila a JavaScript, lo que significa que puede ejecutarse en cualquier entorno compatible con JavaScript.

**¿Por qué usar TypeScript?**
- Mejora la calidad del código al detectar errores antes de ejecutar.
- Facilita el mantenimiento y escalabilidad en proyectos grandes.
- Ofrece mejores herramientas de autocompletado e IntelliSense en los IDEs.

---

### **2. Configuración Básica**

**Instalación**
- Requiere Node.js y npm instalados.
- Comando para instalar TypeScript: `npm install -g typescript`.

**Archivo `tsconfig.json`**
- Controla la configuración del compilador.
- Ejemplo básico:
  ```json
  {
    "compilerOptions": {
      "target": "ES6",
      "module": "CommonJS",
      "strict": true,
      "outDir": "./dist"
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
  }
  ```

**Compilación**
- Usa `tsc` para transpilar un archivo TypeScript: `tsc archivo.ts`.
- Para compilar un proyecto completo: `tsc`.

---

### **3. Tipos Básicos**

**Tipos Primitivos**
- `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.

**Ejemplo:**
```typescript
let nombre: string = "Juan";
let edad: number = 30;
let esActivo: boolean = true;
```

**Arreglos**
```typescript
let numeros: number[] = [1, 2, 3];
```

**Tuplas**
```typescript
let coordenadas: [number, number] = [10, 20];
```

**Enums**
```typescript
enum Color {
  Rojo,
  Verde,
  Azul,
}
let miColor: Color = Color.Verde;
```

**Any**
- Permite asignar cualquier tipo, pero debe usarse con cuidado.
```typescript
let variable: any = "Hola";
variable = 42;
```

**Void**
- Usado generalmente en funciones que no retornan valor.
```typescript
function saludar(): void {
  console.log("Hola");
}
```

---

### **4. Funciones y Tipos**

**Funciones con Tipos**
```typescript
function sumar(a: number, b: number): number {
  return a + b;
}
```

**Funciones con Parámetros Opcionales**
```typescript
function saludo(nombre: string, apellido?: string): string {
  return `Hola ${nombre} ${apellido || ""}`;
}
```

**Funciones con Valores por Defecto**
```typescript
function multiplicar(a: number, b: number = 2): number {
  return a * b;
}
```

**Tipos de Retorno**
- `never`: Para funciones que nunca retornan (errores o loops infinitos).
```typescript
function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
}
```

---

### **5. Clases y Objetos**

**Definición de Clases**
```typescript
class Persona {
  nombre: string;
  edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar(): string {
    return `Hola, soy ${this.nombre}`;
  }
}
```

**Modificadores de Acceso**
- `public` (por defecto), `private`, `protected`.

**Clases y Herencia**
```typescript
class Estudiante extends Persona {
  grado: string;

  constructor(nombre: string, edad: number, grado: string) {
    super(nombre, edad);
    this.grado = grado;
  }

  estudiar(): string {
    return `${this.nombre} está estudiando en ${this.grado}`;
  }
}
```

---

### **6. Interfaces**

**Definición de Interfaces**
```typescript
interface Usuario {
  nombre: string;
  edad: number;
  esActivo?: boolean; // Opcional
}
```

**Uso de Interfaces**
```typescript
const usuario: Usuario = { nombre: "Ana", edad: 25 };
```

**Extender Interfaces**
```typescript
interface Empleado extends Usuario {
  puesto: string;
}
```

---

### **7. Generics**

**Definición**
- Permiten crear componentes reutilizables y con tipado dinámico.
```typescript
function identidad<T>(valor: T): T {
  return valor;
}
```

**Ejemplo en Clases**
```typescript
class Caja<T> {
  contenido: T;

  constructor(contenido: T) {
    this.contenido = contenido;
  }
}
```

---

### **8. Módulos y Namespaces**

**Importar y Exportar**
```typescript
// archivo.ts
export const PI = 3.14;

// otroArchivo.ts
import { PI } from "./archivo";
```

---

### **9. Temas Avanzados**

**Decoradores**
- Funciones que se aplican a clases, métodos o propiedades para modificar su comportamiento.

**Utilización:**
```typescript
function Log(target: any, key: string) {
  console.log(`Propiedad: ${key}`);
}

class Prueba {
  @Log
  nombre: string = "Ejemplo";
}
```

**Unions y Type Guards**
```typescript
function procesar(input: string | number) {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input * 2;
}
```

**Utility Types**
- `Partial`, `Readonly`, `Pick`, `Omit`, entre otros.
```typescript
interface Producto {
  nombre: string;
  precio: number;
}

const productoParcial: Partial<Producto> = { nombre: "Lapiz" };
```

---

Esta es una visión general.