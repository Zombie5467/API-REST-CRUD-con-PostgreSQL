# API REST con PostgreSQL, Prisma, JWT (Node.js + TypeScript)


API REST (CRUD) construida con **Node.js** y **TypeScript**, usando **Prisma** como ORM para **PostgreSQL**.  
Incluye **autenticación con JWT**, **encriptado de contraseñas con bcrypt**, **manejo de errores** y **despliegue en Railway**.  
Se utilizó **TablePlus** para inspección de la base de datos.

## 🚀 Tecnologías
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-363636?style=for-the-badge)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![TablePlus](https://img.shields.io/badge/TablePlus-FC6D26?style=for-the-badge)


## 🌐 Despliegue
👉 **Producción (Railway)**: https://railway.com/project/9db75164-6d04-4130-966a-745f905395d8/service/28e10ad9-d864-47e5-aaec-211522d97112/data?environmentId=ae1a6415-b276-4b86-8e75-6c02d864dfa4&state=table&table=user

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basado en `.env.template`.

Ejemplo de configuración:
```env
PORT=3000
JWT_SECRET="cambia-esto-por-un-secreto-fuerte"
POSTGRES_USER=tu_usuario
POSTGRES_PASSWORD=tu_password
POSTGRES_DB=tu_base_de_datos
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DB
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
```
# 🚀 Endpoints principales

Todos los endpoints se prueban usando la URL del despliegue:  
👉 [https://api-rest-crud-con-postgresql-production.up.railway.app](https://api-rest-crud-con-postgresql-production.up.railway.app)

---

## 📝 Crear un usuario
**POST → `/auth/register`**

- **Body** → Seleccionar `raw` y formato `JSON` en Postman.  
- Enviar un objeto con **email** y **password**:

```json
{
  "email": "arsenio@dosantos.com",
  "password": "testing"
}
```
📌 **Respuesta:** Devuelve un objeto con un mensaje de confirmación y un **token JWT**:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
## 👥 Obtener todos los usuarios

**GET → `/users`**

-   **Autenticación requerida**:  
    `Authorization` → `Bearer Token` → pegar el token generado en el registro de usuario.
    

📌 **Respuesta:** Devuelve todos los usuarios de la tabla:
```json
{
  "users": [
    {
      "id": 1,
      "email": "anna@blue",
      "password": "$2b$10$QFIKg3oL/waiuFwuNU9vUOK..."
    },
    {
      "id": 2,
      "email": "addel@santos.dov",
      "password": "$2b$10$7PdKDFy8wwi.W00kX27AjOm..."
    }
  ]
}
```
## ✏️ Actualizar un usuario

**PUT → `/users/:id`**

-   **Params** → `id` = número del usuario en la tabla.
    
-   **Body** → Seleccionar `raw` y formato `JSON`.
    
-   Enviar un objeto con los campos que quieras actualizar:
```json
{
  "email": "arsenio@rockmetal.com",
  "password": "nuevaContraseña123"
}
```
📌 **Respuesta:** Devuelve el usuario actualizado:
```json
{
  "user": {
    "id": 6,
    "email": "arsenio@rockmetal.com",
    "password": "$2b$10$5amJPg0/jG0qFSXeVjE1PuM..."
  }
}
```
## 🗑️ Eliminar un usuario

**DELETE → `/users/:id`**

-   **Params** → `id` = número del usuario en la tabla.
    
-   **Autenticación requerida**:  
    `Authorization` → `Bearer Token` → usar el token generado al crear usuario.
    

📌 **Respuesta:** Devuelve un mensaje confirmando la eliminación:
```json
{
  "message": "El usuario 6 ha sido eliminado"
}
```
## 📝 Changelog
[Ver detalles completos](./CHANGELOG.md)

----------
> Written with [StackEdit](https://stackedit.io/).