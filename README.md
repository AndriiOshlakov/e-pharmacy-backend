# 💊 E-Pharmacy Backend

## 📌 Загальна інформація

**E-Pharmacy (server)** — це backend частина веб-платформи для онлайн-аптек, яка забезпечує:

- аутентифікацію та авторизацію користувачів
- роботу з товарами (медикаментами)
- управління кошиком
- оформлення замовлень
- отримання аптек та відгуків

---

## 🎯 Мета проєкту

Розробити REST API для взаємодії з frontend-додатком:

- обробка запитів
- збереження даних
- забезпечення безпеки користувачів

---

## ⚙️ Технології

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT / Session-based auth (access + refresh tokens)**
- **bcrypt**
- **celebrate (Joi validation)**
- **cookie-parser**
- **cors**
- **helmet**

---

## 🚀 Запуск проєкту

```bash
npm install
npm run dev
```

---

## 🌐 Деплой

Backend розгорнутий на:

- Render (або аналогічному сервісі)

---

## 🗄️ База даних

Використовується **MongoDB**

### Основні моделі:

- User
- Session
- Product
- Store
- Cart
- Review

---

## 🔐 Аутентифікація

Використовується система:

- **Access Token (15 хв)**
- **Refresh Token (1 день)**
- **SessionId (зберігається в cookie)**

### 🔄 Як працює:

1. Користувач логіниться → створюється сесія
2. Сервер відправляє cookies:
   - accessToken
   - refreshToken
   - sessionId

3. При закінченні accessToken:
   - використовується refreshToken + sessionId
   - створюється нова сесія

---

## 📡 API Ендпоінти

### 🔑 Auth

#### ➕ Register

```
POST /api/user/register
```

- Валідація email, password, phone, name
- Хешування пароля
- Створення користувача
- Створення сесії

---

#### 🔐 Login

```
POST /api/user/login
```

- Перевірка email/password
- Створення нової сесії
- Видача cookies

---

#### 🔄 Refresh Session

```
POST /api/session
```

- Оновлення accessToken через refreshToken

---

#### 🚪 Logout

```
POST /api/user/logout
```

- Видалення сесії
- Очищення cookies

---

#### 👤 Get Current User

```
GET /api/user/user-info
```

- Повертає:
  - name
  - email
  - phone

---

## 🏪 Stores

#### 📍 Get Nearest Stores

```
GET /api/stores/nearest
```

#### 📋 Get Stores List

```
GET /api/stores
```

---

## 💊 Products

#### 🔍 Get Medicines

```
GET /api/products
```

Підтримує:

- search
- filter
- pagination

---

#### 📄 Get Product Details

```
GET /api/products/:id
```

---

## ⭐ Reviews

#### 💬 Get Customer Reviews

```
GET /api/customer-reviews
```

---

## 🛒 Cart

#### 🧾 Get Cart

```
GET /api/cart
```

---

#### ➕ Update Cart

```
PUT /api/cart/update
```

---

#### 💳 Checkout

```
POST /api/cart/checkout
```

- Приймає:
  - name
  - email
  - phone
  - address

- Створює замовлення

---

## 🛡️ Middleware

- **authenticate**
  - перевіряє accessToken
  - знаходить session
  - додає `req.user`

- **errorHandler**

- **notFoundHandler**

- **logger**

---

## ⚠️ Обробка помилок

Сервер повертає:

- `200 OK`
- `400 Bad Request`
- `401 Unauthorized`
- `404 Not Found`
- `500 Internal Server Error`

---

## 📌 Валідація

Використовується:

- **celebrate + Joi**

Перевіряється:

- email формат
- пароль
- телефон
- обов'язкові поля

---

## 🔄 CORS

Налаштований для роботи з frontend:

```js
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
```

---

## 🍪 Cookies

Використовуються:

- httpOnly
- secure
- sameSite: 'none'

---

## 📈 Можливості розширення

- ролі користувачів (admin/user)
- історія замовлень
- оплата онлайн
- кешування (Redis)
- rate limiting

---

## 👨‍💻 Автор

Проєкт створений в рамках навчання та практики Fullstack розробки.
