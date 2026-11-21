# EduBot - API Contracts

الملف ده بنوثق فيه طريقة التواصل بين أجزاء المشروع، سواء عن طريق HTTP APIs أو Real-time Events، عشان كل تيم يعرف الداتا اللي بيستقبلها وبيبعتها.

## 1. .NET Backend

### Authentication

#### Login

- **Endpoint:** `POST /api/auth/login`
- **Description:** تسجيل الدخول والحصول على JWT Token.
- **Used By:** Frontend (Admin / Teacher / Student).
- **Authentication:** Not Required.

**Request & Response:**

```json
{
  "email": "admin@edubot.com",
  "password": "password"
}
```

```json
{
  "isSuccess": true,
  "message": "Signed in successfully.",
  "data": {
    "token": "jwt-token"
  },
  "errors": null
}
```

## 2. Python AI Service

APIs provided by the Python team will be documented here.

## 3. Real-time Communication

SignalR / WebSocket events between the Backend, Robot and Smartboard will be documented here.

---

**Note:** Every new API or Event should follow the same documentation style, including its purpose, consumer, input and output.
