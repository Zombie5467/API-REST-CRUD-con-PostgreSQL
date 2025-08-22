## 🚀 Proyecto: Autenticación con JWT y PostgreSQL

  

### 📑 CHANGELOG

  

✅ **Estado:** La práctica fue completada con éxito.

📌 **Descripción:** Implementación de autenticación con JWT y manejo de usuarios con PostgreSQL mediante Prisma.

  

### 🐞 Registro de Bugs

  

1.  **Uso de `type` en importaciones de TypeScript**

-  **Descripción:** Al importar tipos de Express, fue necesario usar `type` para indicar que se trataba de importaciones de solo tipo.

-  **Ejemplo:**

```ts

import  type { Request, Response, NextFunction } from  "express";

```

-  **Estado:** No es un bug crítico, sino un detalle propio de TypeScript. Documentado para futuras referencias.

2.  **El token no se generaba al registrar un usuario**

-  **Descripción:** Durante las pruebas en Postman, el usuario se creaba correctamente en la base de datos, pero el token JWT no se incluía en la respuesta.

-  **Causa probable:** La tabla `user` no estaba creada en la base de datos.

-  **Solución aplicada:**

- Se ejecutaron los comandos:

```bash

npx prisma migrate reset

npx prisma generate

npm run dev

```

- Esto sincronizó la base de datos y regeneró el cliente de Prisma.

-  **Resultado:** Ahora cada usuario registrado recibe su token correctamente.

3.  **Los usuarios no podían ser modificados (PUT/PATCH)**

-  **Descripción:** Durante una prueba, los usuarios podían ser creados pero no modificados o eliminados.

-  **Solución aplicada:** Reiniciar el servidor manualmente:

- Detener la ejecución con `CTRL + C`.

- Volver a iniciar con `npm run dev`.

-  **Resultado:** El bug desapareció, y el CRUD de usuarios (crear, obtener, actualizar y eliminar) funciona correctamente.


> Written with [StackEdit](https://stackedit.io/).