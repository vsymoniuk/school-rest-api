#  REST API сервер для взаємодії з базою даних школи
 На сервері наявна авторизація за допомогою `JSONWebToken` і більшість роутів захищенні з використанням базового функціоналу `passportJS`. Щоб отримати доступ до всього функціоналу необхідно додати токен (буде дійсний протяом доби) в хедер Authorization. Сервер запускається з кореневої директорії командою `npm run start`
 
## Авторизація
Для отримання токена, спочаку необхідно створити користувача за допомогою ``POST /api/auth/register`` і зробивши запит по ``POST /api/auth/login``, використовуючи попередні дані, отримайте токен.


## Сутності
Для всіх таблиць бази існує однаковий набір CRUD запитів які підтримують `application/x-www-form-urlencoded` формати.
Для перегляду необхідних полів таблиць пергляньте розділ Моделі.

``POST /api/{entity}/`` створює нову сутність, повертає її екземпляр, при пропуску необхідних полів, або виникнення логічних помилок, наприклад створення екземпляра уроку для класу з 4 учнями в аудиторії з 3 місцями, користувач буде отримувати помилки з відповіними повідомленнями 
##### Приклад  помилки
```javascript
    {
        success: false,
        message: "error message"
    }
```

``GET /api/{entity}/?page={pageNumber}`` повертає всі екземпляри відповідної сутності, query парметр page вказує номер сторінки, розмір сторінки, за замовчуванням, рівний трьом.
##### Приклад  для `/api/user/?page=2`
```javascript
{
    "enrollingYear": 2020,
    "_id": "5e301906e820cb1c04a53ba0",
    "email": "pupil1",
    "password": "$2a$10$K469wLHTvKbGPIMNGTS6M.rRFQgLbxeVOn8Z/GYkzGKFBVvPKZR.O",
    "firstName": "",
    "lastName": "",
    "role": "pupil",
    "__v": 0
},
{
    "enrollingYear": 2020,
    "_id": "5e30190fe820cb1c04a53ba1",
    "email": "pupil2",
    "password": "$2a$10$tCAcHByvr34uKq/ZO7A/e.GZheGoydC8sylcOcRzJieHU1UuqBe.m",
    "firstName": "",
    "lastName": "",
    "role": "pupil",
    "__v": 0
}
```

``GET /api/{entity}/:id`` дозволяє отримати сутність за її ідентифікатором 
##### Приклад для  `/api/class/5e302c51bfaed0300f245b77`
```javascript
{
    "pupils": [
        {
            "enrollingYear": 2020,
            "_id": "5e2fea829663036a2a6c243d",
            "email": "pupil",
            "password": "$2a$10$t7sMuFhRluCkRrvx9vtQieNO5uGuxZb9dfWQI44Pt/Bdsbk5QwV8O",
            "firstName": "",
            "lastName": "",
            "role": "pupil",
            "__v": 0
        },
        {
            "enrollingYear": 2020,
            "_id": "5e30190fe820cb1c04a53ba1",
            "email": "pupil2",
            "password": "$2a$10$tCAcHByvr34uKq/ZO7A/e.GZheGoydC8sylcOcRzJieHU1UuqBe.m",
            "firstName": "",
            "lastName": "",
            "role": "pupil",
            "__v": 0
        }
    ],
    "_id": "5e302c51bfaed0300f245b77",
    "name": " 5-A",
    "curator": {
        "enrollingYear": 2020,
        "_id": "5e2fff0964e56a012de7383f",
        "email": "teacher",
        "password": "$2a$10$WaOSPQg7fofw/sUFpX1nzex6pj87u.PMvQ7Oahz6ZWWqjjSyWNkrK",
        "firstName": "",
        "lastName": "",
        "role": "teacher",
        "__v": 0
    },
    "__v": 0
}
```

``PATCH /api/{entity}/:id`` дає користувачу змогу модифікувати будь-яку сутність за її ідентифікатором, повертає відредагований варінт цієї сутності

``DELETE /api/{entity}/:id``  видаляє сутність за унікалним ідентифікатором, повертає інформацію про успіх операції
##### Приклад для  `/api/auditorium/5e301d0c67579e20a7a35130`
```javascript
{
    "message": "auditorium was deleted"
}
```
## Моделі
На ERD діаграмі схематично зображено зв'язки між таблицями, та позначенні поля, які є необхідними для успішності запиту.

![Image alt](/img/ERD.jpg)

## Помилки
У більшості запитів наявні перевірки, які завадять користувачу умисно внести дані, які можуть нарушити логіку програми і не дадуть помилитися при формуванні запиту. Оброблення помилок за допомогою наступних функцій
```javascript
module.exports.catch = (res, error) => {
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}

module.exports.response = (res, code, message) => {
    res.status(code).json({
        success: false,
        message: message
    })
}
```
