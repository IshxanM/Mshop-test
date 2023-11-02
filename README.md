### Фамилия Имя: Манукян Ишхан
### Тестовое задание React
-------
## Описание проекта:
Интернет-магазин цифровой и бытовой техники. Реализовал с помощью библиотеки [React js](https://react.dev/) и библиотек готовых компонентов и стилей [Material UI](https://mui.com/) и [React-Bootstrap](https://react-bootstrap.github.io/). 

Сереверная часть была реализованна на фреймворке [Express js](https://expressjs.com/ru/). В качестве БД использовал [PostgreSQL 15](https://www.postgresql.org/)

Интернет магазин состоит из клиентской и административной части. Была реализованна функция Регистрации/Авторизации.
_____
<p>Клиентская часть.</p>
<img alt="Клиентская часть" src="https://github.com/IshxanM/Mshop-test/blob/main/БД/assets/client.png" width="300"/>.

-------
<p>Администритивная часть.</p>
<img alt="Администритивная часть" src="https://github.com/IshxanM/Mshop-test/blob/main/БД/assets/admin.png" width="300"/>.

_______

Для не зарегистрированных пользователей доступны следующие функции:
1. Просмотр главной страницы сайта(каталог).
2. Просмотр детальной информации о товаре.
3. Добавление товара в корзину.
4. Удаление товара из корзины.
5. Регистрация/Авторизация.
6. Фильтрация товаров по параметрам.
_____
Для зарегистрированных пользователй доступны следующие функции:
1. Те же функции которые доступны для не зарегистрированных пользователей.
2. Оформление заказа.
3. Отмена заказа.
4. Просмотр своих заказов.
5. Возможность оценить товар после оформления заказа.
6. Редактирование личных данных.
7. Восстановление пароля.
_____
Для администратора доступны следующие функции:
1. Добавление/редактирование/удаление товаров.
2. Добавление/редактирование/удаление типов.
3. Добавление/редактирование/удаление брендов.
4. Просмотр/подтверждение/отмена заказов пользователей.

______
## Подготовительные действия
Чтобы развернуть проект, клонируем этот репозиторий к себе на компьютер, в директорию Mshop
```
git clone https://github.com/IshxanM/Mshop-test.git Mshop
```
Далее нужно скачать и установить [PostgreSQL 15](https://www.postgresql.org/download/) и pgAdmin (они устанавливаются вместе)

После установки необходимо зайти в приложение pgAdmin и создать БД с названием Mshop

<p>Создание БД.</p>
<img alt="Клиентская часть" src="https://github.com/IshxanM/Mshop-test/blob/main/БД/assets/createBD.JPG" width="300"/>.

------
<p>Создание БД 2.</p>
<img alt="Клиентская часть" src="https://github.com/IshxanM/Mshop-test/blob/main/БД/assets/createBD2.JPG" width="300"/>.

После того как написали название БД нужно нажать на кнопку "Save"
______

Далее необходимо нажать правой кнопкой мыши на ранее созданном БД и выбрать пункт "Restore"

<img alt="Клиентская часть" src="https://github.com/IshxanM/Mshop-test/blob/main/БД/assets/import.png" width="300"/>.

Далее необходимо выбрать формат "Custom or tar", в поле "Filename" необходимо нажать на иконку папки, затем выбрать дирректорию с проектом, в папке БД нажать "Все файлы *" и выбрать файл "BD_Mshop", нажать на кнопку "Restore"

<img alt="Клиентская часть" src="https://github.com/IshxanM/Mshop-test/blob/main/БД/assets/import2.JPG" width="500"/>.
________

### Далее заходим в редактор кода

Имя БД и логин-пароль прописывам в server/.env
____
*DB_PASSWORD это пароль который вы вводили при установке pgAdmin. В моём случаи это "admin".
____
```
PORT= 3002
DB_NAME=Mshop
DB_USER=postgres
DB_PASSWORD=admin
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=secret123
REACT_APP_API_URL_FROM_SERVER = http://localhost:3000/
```
________
В папке client/.env прописываем 
```
REACT_APP_API_URL=http://localhost:3002/
REACT_APP_API_YANDEX_KEY="357710ac-ca1f-405d-bf90-f3b6acae35f7"
```
______
Переходим в директорию Mshop/server, устанавливаем пакеты и запускаем сервер
```
npm install
npm run dev
```
_____
Переходим в директорию Mshop/client, устанавливаем пакеты и запускаем клиент
```
npm install
npm start
```
Если возникнет такая ошибка с библиотекой Material ui,
```js
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR! 
npm ERR! While resolving: @material-ui/core@4.12.4
npm ERR! Found: react@18.2.0
npm ERR! node_modules/react
npm ERR!   react@"^18.2.0" from the root project
npm ERR!   peer react@">=16.8.0" from @emotion/react@11.11.1
npm ERR!   node_modules/@emotion/react
npm ERR!     @emotion/react@"^11.11.1" from the root project
npm ERR!     peer @emotion/react@"^11.0.0-rc.0" from @emotion/styled@11.11.0
npm ERR!     node_modules/@emotion/styled
npm ERR!       @emotion/styled@"^11.11.0" from the root project
npm ERR!       3 more (@mui/material, @mui/styled-engine, @mui/system)      
npm ERR!     3 more (@mui/material, @mui/styled-engine, @mui/system)        
npm ERR!   60 more (@emotion/styled, ...)
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^16.8.0 || ^17.0.0" from @material-ui/core@4.12.4      
npm ERR! node_modules/@material-ui/core
npm ERR!   @material-ui/core@"^4.12.4" from the root project
npm ERR!   peer @material-ui/core@"^4.0.0" from @material-ui/icons@4.11.3
npm ERR!   node_modules/@material-ui/icons
npm ERR!     @material-ui/icons@"^4.11.3" from the root project
npm ERR!   1 more (material-ui-confirmation)
npm ERR!
npm ERR! Conflicting peer dependency: react@17.0.2
npm ERR! node_modules/react
npm ERR!   peer react@"^16.8.0 || ^17.0.0" from @material-ui/core@4.12.4
npm ERR!   node_modules/@material-ui/core
npm ERR!     @material-ui/core@"^4.12.4" from the root project
npm ERR!     peer @material-ui/core@"^4.0.0" from @material-ui/icons@4.11.3
npm ERR!     node_modules/@material-ui/icons
npm ERR!       @material-ui/icons@"^4.11.3" from the root project
npm ERR!     1 more (material-ui-confirmation)
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See C:\Users\ISHXAN\AppData\Local\npm-cache\eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\ISHXAN\AppData\Local\npm-cache\_logs\2023-11-02T09_34_53_650Z-debug-0.log
```
то введите следующую команду в терминал
```
npm install @material-ui/core --force
```
______

База данных содержит несколько пользователей, как обычных, так и с правами администратора

1. Пользователь User@mail.ru, пароль 123456

2. Администртор admin@mail.ru, пароль 123456
