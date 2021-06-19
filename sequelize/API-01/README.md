# API 01

## 📌 Topics 

* [Techs](#techs)
* [Features](#features)
* [API routes](#routes)
* [Test on your machine](#test)
* [License](#license)

<a id="techs"></a>
## 🌐 Techs

* [Nodejs](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)
* [PostgreSQL](https://www.postgresql.org/about/)
* [Redis](https://redis.io/)
* [Express](https://expressjs.com/pt-br/)
* [Sequelize](https://sequelize.org/master/)

<a id="features"></a>
## 📎 Features

* ✅ User authentication
* ✅ Adding books
* ✅ Image upload
* ✅ Deleting Books
* ✅ Update Books
* ✅ Book listing

<a id="routes"></a>
## 🛫 API Routes

### User Routes

_http://localhost:8080/api/user/register_

Method | Content type        | Image upload|
-------|---------------------|-------------|
POST   | Multipar-form-data  | True        |

__DATA SEND__

```json
{
  "name": "Test",
  "email": "testweb@gmail.com",
  "bio": "Full stack programmer",
  "password": "1234567",
  "image": "multipart-form-data-image-upload"
}
```

__DATA RESPONSE__

```json
{
  "name": "Test",
  "email": "testweb@gmail.com",
  "bio": "Full stack programmer",
  "id": "87750886-fa48-4aef-9923-3babda0d9a91",
  "avatar": "2d537928-d0af-46bb-a036-8815664ff94f-79208690.webp",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R3ZWJAZ21haWwuY29tIiwiaWQiOiI4Nzc1MDg4Ni1mYTQ4LTRhZWYtOTkyMy0zYmFiZGEwZDlhOTEiLCJpYXQiOjE2MjQwNjQyMDQsImV4cCI6MTYyNDMyMzQwNH0.UkGW24nIc2DHDilDFPHp9bHXctBPsgxCwBe9EmaQaAU"
}
```

_http://localhost:8080/api/user/login_

Method | Content type |
-------|--------------|
POST   | form data    |

__DATA SEND__

```json
{
  "email": "testweb@gmail.com",
  "password": "1234567",
}
```

__DATA RESPONSE__

```json
{
  "name": "Test",
  "email": "testweb@gmail.com",
  "bio": "Full stack programmer",
  "id": "87750886-fa48-4aef-9923-3babda0d9a91",
  "avatar": "2d537928-d0af-46bb-a036-8815664ff94f-79208690.webp",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R3ZWJAZ21haWwuY29tIiwiaWQiOiI4Nzc1MDg4Ni1mYTQ4LTRhZWYtOTkyMy0zYmFiZGEwZDlhOTEiLCJpYXQiOjE2MjQwNjQyMDQsImV4cCI6MTYyNDMyMzQwNH0.UkGW24nIc2DHDilDFPHp9bHXctBPsgxCwBe9EmaQaAU"
}
```

### Book Routes

_http://localhost:8080/api/session/book/create_

Method | Content type      | Headers           |
-------|-------------------|-------------------|
POST   | multipart-form    | Bearer token jwt  |

__DATA SEND__

```json
{
  "title": "Patterns of Enterprise Application Architecture",
  "author": "Martin Fowler",
  "released": "15/11/2002",
  "pages_total": 560,
  "likes": 0,
  "dislikes": 0
}
```

__DATA RESPONSE__

```json
{
  "user_id": "7ad60135-cdec-4b49-b3ef-c48fcbd9a625",
  "id": "e0dd70c1-1121-4657-811f-9305c76ff59c",
  "title": "Patterns of Enterprise Application Architecture",
  "author": "Martin Fowler",
  "released": "15/11/2002",
  "pages_total": 560,
  "image_name": "0a04466c-97d3-428d-ba3e-ec0609e1ef62-refactoring.webp",
  "likes": 0,
  "dislikes": 0
}
```

_http://localhost:8080/api/session/book/:id_

Method | Content type       | Headers           |
-------|--------------------|-------------------|
GET    | applicaton/json    | Bearer token jwt  |

__DATA RESPONSE__

```json
{
  "avatar": "24b36372-118f-4f2e-a76f-7125bcafbcad-79208690.webp",
  "name": "Edmilson",
  "books": [
    {
      "title": "",
      "author": "Robert Cecil Martin",
      "released": "13/08/2012",
      "pages_total": 432,
      "image_name": "ee4432cc-cb6e-40cf-b9c2-fc2f6bd318d9-clean-arch.webp",
      "likes": 0,
      "dislikes": 0,
      "id": "1b625fb8-591e-485f-8409-1ffcaa8df1a0",
      "user_id": "7ad60135-cdec-4b49-b3ef-c48fcbd9a625"
    }
  ]
}
```

_http://localhost:8080/api/session/book/all_

Method | Content type       | Headers           |
-------|--------------------|-------------------|
GET    | applicaton/json    | Bearer token jwt  |

__DATA RESPONSE__

```json
{
  "avatar": "24b36372-118f-4f2e-a76f-7125bcafbcad-79208690.webp",
  "name": "Edmilson",
  "total": 11,
  "books": [
    {
      "title": "Book 1",
      "author": "Martin Fowler",
      "released": "15/11/2002",
      "pages_total": 560,
      "image_name": "5d8be3a9-4c5c-4ba0-9444-0e9e88040543-refactoring.webp",
      "likes": 0,
      "dislikes": 0,
      "id": "7370aeb4-1e38-4551-a028-8503a947b4b7",
      "user_id": "7ad60135-cdec-4b49-b3ef-c48fcbd9a625"
    },
    {
      "title": "Book 2",
      "author": "Martin Fowler",
      "released": "15/11/2002",
      "pages_total": 560,
      "image_name": "9a5c50c8-7984-4a51-b7c6-70910a756df0-refactoring.webp",
      "likes": 0,
      "dislikes": 0,
      "id": "3a4296eb-4eac-4eb2-940d-3d75c60e94ca",
      "user_id": "7ad60135-cdec-4b49-b3ef-c48fcbd9a625"
    },
  ]
}
```

_http://localhost:8080/api/session/book/:id_

Method | Content type      | Headers           |
-------|-------------------|-------------------|
PUT    | form-data         | Bearer token jwt  |

__DATA SEND__

```json
{
  "title": "Patterns of Enterprise Application Architecture",
  "author": "Martin Fowler",
  "released": "15/11/2002",
  "pages_total": 560,
}
```

__DATA RESPONSE__

```json
{}
```

_http://localhost:8080/api/session/book/:id_

Method    | Content type      | Headers           |
----------|-------------------|-------------------|
DELETE    | application/json  | Bearer token jwt  |

__DATA RESPONSE__

```json
[
  "5d8be3a9-4c5c-4ba0-9444-0e9e88040543-refactoring.webp"
]
```

<a id="test"></a>
## 💻 Test on your machine

__1° First clone my repository on your machine (a little star please)__

> For this you need to have [git](https://git-scm.com/) installed on your machine.

```sh
git clone https://github.com/edmilson-dk/learning-from-cruds/
```

__2° After that enter the generated folder and install the dependencies__

> In this process it is necessary that you have [nodejs](https://nodejs.org/en/) installed in order to use the nodejs package manager, [npm](https://www.npmjs.com/), or [yarn](https://yarnpkg.com/), you choose.

```sh 
cd learning-from-cruds

learning-from-cruds$ yarn install 
# or with npm
learning-from-cruds$ npm install
```

__3° Finished the installation you must create a database in your [postresql](https://www.postgresql.org/about/).__

> If you don't have postgresql on your machine, find out how to install it.

__4° After that it is necessary that you have the [redis]((https://redis.io/)) at your disposal too, and start the redis server.__

__5° Now I need you to add the postgresql database connection data in a .env file that should be in the root of the project, you should follow the naming example that is in the env.example file.__

__6° Once that's done, let's test the database connection running our migrations, for that run the following command__

```sh 
npx sequelize-cli db:migrate
```

__7° If all goes well, start the server with the command below__

```sh 
yarn start
```

<a id="license"></a>
## 🤝 License

[MIT](https://github.com/edmilson-dk/learning-from-cruds/blob/main/LICENSE) Project License

Creator with 💙 by [Edmilson Jesus](https://www.linkedin.com/in/edmilson-jesus-4128711b5)
