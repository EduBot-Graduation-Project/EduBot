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

### Students

#### Create Student

- **Endpoint:** `POST /api/students`
- **Description:** إضافة طالب جديد بالاسم والفصل (`classroomId`) مع التأكد من وجود الفصل وتوليد كود طالب تلقائي مميز بصيغة `STU-YY-XXXX`.
- **Used By:** Frontend (Admin Dashboard).
- **Authentication:** Required (Admin Role).

**Request & Response:**

```json
{
  "name": "Ahmed Mohamed",
  "classroomId": "01a2190f-2225-7c77-b2ea-5aeae7fe14ed"
}
```

```json
{
  "isSuccess": true,
  "message": "Student Added Successfully",
  "data": {
    "id": "01a21912-8b44-7123-9f10-123456789abc",
    "name": "Ahmed Mohamed",
    "studentCode": "STU-26-0482"
  },
  "errors": null
}
```

#### Get Students

- **Endpoint:** `GET /api/students`
- **Description:** استرجاع كل الطلبة مع أسماء فصولهم مترتبة بالمرحلة الدراسية ثم اسم الطالب، مع إمكانية الفلترة اختيارياً عن طريق `?gradeLevelEnum=Grade12`.
- **Used By:** Frontend (Admin Dashboard).
- **Authentication:** Required (Admin Role).

**Response:**

```json
{
  "isSuccess": true,
  "message": "Students Retrieved Successfully",
  "data": [
    {
      "id": "01a21912-8b44-7123-9f10-123456789abc",
      "name": "Ahmed Mohamed",
      "studentCode": "STU-26-0482",
      "classroomId": "01a2190f-2225-7c77-b2ea-5aeae7fe14ed",
      "classroomName": "A/1"
    },
    {
      "id": "01a21912-9c55-7456-8e21-987654321def",
      "name": "Sara Ali",
      "studentCode": "STU-26-1934",
      "classroomId": "01a2190f-2225-7c77-b2ea-5aeae7fe14ed",
      "classroomName": "A/1"
    }
  ],
  "errors": null
}
```

#### Get Student

- **Endpoint:** `GET /api/students/{id}`
- **Description:** استرجاع بيانات طالب معين واسم فصله عن طريق الـ `id`.
- **Used By:** Frontend (Admin Dashboard).
- **Authentication:** Required (Admin Role).

**Response:**

```json
{
  "isSuccess": true,
  "message": "Student Retrieved Successfully",
  "data": {
    "id": "01a21912-8b44-7123-9f10-123456789abc",
    "name": "Ahmed Mohamed",
    "studentCode": "STU-26-0482",
    "classroomId": "01a2190f-2225-7c77-b2ea-5aeae7fe14ed",
    "classroomName": "A/1"
  },
  "errors": null
}
```

#### Update Student

- **Endpoint:** `PUT /api/students/{id}`
- **Description:** تعديل اسم الطالب أو نقله لفصل تاني عن طريق الـ `id` مع التأكد من وجود الطالب والفصل الجديد في الداتابيز.
- **Used By:** Frontend (Admin Dashboard).
- **Authentication:** Required (Admin Role).

**Request & Response:**

```json
{
  "name": "Ahmed Mohamed Hassan",
  "classroomId": "01a2190f-5fab-70bb-a480-0483c9b3d2ed"
}
```

```json
{
  "isSuccess": true,
  "message": "Student Data Updated Successfully",
  "data": {
    "id": "01a21912-8b44-7123-9f10-123456789abc",
    "name": "Ahmed Mohamed Hassan",
    "studentCode": "STU-26-0482",
    "classroomId": "01a2190f-5fab-70bb-a480-0483c9b3d2ed",
    "classroomName": "A/2"
  },
  "errors": null
}
```

#### Delete Student

- **Endpoint:** `DELETE /api/students/{id}`
- **Description:** حذف طالب معين عن طريق الـ `id` مع التأكد من وجوده.
- **Used By:** Frontend (Admin Dashboard).
- **Authentication:** Required (Admin Role).

**Response:**

```json
{
  "isSuccess": true,
  "message": "Student Removed Successfully",
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
