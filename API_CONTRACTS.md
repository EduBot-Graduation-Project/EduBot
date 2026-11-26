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

### Classrooms

#### Create Classroom

- **Endpoint:** `POST /api/classrooms`
- **Description:** إضافة فصل جديد بالاسم والمرحلة الدراسية مع منع تكرار نفس الاسم في نفس المرحلة.
- **Used By:** Frontend (Admin Dashboard).
- **Authentication:** Required (Admin Role).

**Request & Response:**

```json
{
  "gradeLevelEnum": "Grade12",
  "name": "A/1"
}
```

```json
{
  "isSuccess": true,
  "message": "Classroom Created Successfully.",
  "data": {
    "id": "01a2190f-2225-7c77-b2ea-5aeae7fe14ed",
    "gradeLevelEnum": "Grade12",
    "name": "A/1"
  },
  "errors": null
}
```

#### Get Classrooms

- **Endpoint:** `GET /api/classrooms`
- **Description:** استرجاع كل الفصول مترتبة بالمرحلة الدراسية والاسم، مع إمكانية الفلترة اختيارياً عن طريق `?gradeLevelEnum=Grade12`.
- **Used By:** Frontend (Admin Dashboard).
- **Authentication:** Required (Admin Role).

**Response:**

```json
{
  "isSuccess": true,
  "message": "Classrooms Retrieved Successfully",
  "data": [
    {
      "id": "01a2190f-2225-7c77-b2ea-5aeae7fe14ed",
      "gradeLevelEnum": "Grade12",
      "name": "A/1"
    },
    {
      "id": "01a2190f-5fab-70bb-a480-0483c9b3d2ed",
      "gradeLevelEnum": "Grade12",
      "name": "A/2"
    }
  ],
  "errors": null
}
```

#### Update Classroom

- **Endpoint:** `PUT /api/classrooms/{id}`
- **Description:** تعديل اسم الفصل أو مرحلته الدراسية عن طريق الـ `id` مع التأكد من عدم تكراره مع فصل تاني.
- **Used By:** Frontend (Admin Dashboard).
- **Authentication:** Required (Admin Role).

**Request & Response:**

```json
{
  "gradeLevelEnum": "Grade12",
  "name": "A/1"
}
```

```json
{
  "isSuccess": true,
  "message": "Classroom Updated Successfully",
  "data": {
    "id": "01a2190f-2225-7c77-b2ea-5aeae7fe14ed",
    "gradeLevelEnum": "Grade12",
    "name": "A/1"
  },
  "errors": null
}
```

#### Delete Classroom

- **Endpoint:** `DELETE /api/classrooms/{id}`
- **Description:** حذف فصل معين عن طريق الـ `id` (بيترفض الحذف لو الفصل مربوط بيه طلبة في جدول `Students`).
- **Used By:** Frontend (Admin Dashboard).
- **Authentication:** Required (Admin Role).

**Response:**

```json
{
  "isSuccess": true,
  "message": "Classroom Removed Successfully",
  "data": null,
  "errors": null
}
```

## 2. Python AI Service

APIs provided by the Python team will be documented here.

## 3. Real-time Communication

SignalR / WebSocket events between the Backend, Robot and Smartboard will be documented here.

---

**Note:** Every new API or Event should follow the same documentation style, including its purpose, consumer, input and output.
