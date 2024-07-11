# 🗃️ KonsisTest 
KonsisTest (менеджер паролей) — тестовое задание для "ООО Контрактные Системы".

## 📝 Выполненные задачи
- [x] Отображение списка записей, отсортированного от свежих записей к старым;
- [x] Три колонки в списке: название ресурса, пароль, дата добавления;
- [x] Пароль в записи отображается по клику пользователя;
- [x] Фильтрация списка через поиск по названию ресурса;
- [x] Редактор для создания новых записей в виде модального окна;
- [x] Возможность выбора типа записи по нажатию на соответствующий radio button;
- [x] Валидация редактора: 
  - [x] Все поля обязательны;
  - [x] Пароль не короче 8 символов
  - [x] Если запись является почтой, то название ресурса должно содержать символ '@'
- [x] Две кнопки в редакторе: сохранить запись и выйти без сохранения;
- [x] Нельзя сохранить две записи с одинаковым названием ресурса;

## 🌆 Скриншоты
<details>
  <summary>Открыть</summary>

  ![image](https://github.com/Neitralov/KonsisTest/assets/109409226/2d634c93-3014-4f14-bad8-88fa1e2f9217)
  ![image](https://github.com/Neitralov/KonsisTest/assets/109409226/e8970228-1528-49fd-9f2b-f731b1a81903)
</details>

## 🛠️ Сборка и запуск

### Вариант первый (вручную)
1. Клонировать репозиторий
`git clone https://github.com/Neitralov/KonsisTest.git`
2. Перейти в папку backend и запустить WebAPI
```bash
cd KonsisTest/server/src/WebAPI
dotnet run
```
3. Затем открыть вторую консоль, перейти в папку frontend, установить зависимости и запустить Frontend
```bash
cd KonsisTest/client
npm install
npm run dev
```

После открыть веб-приложение можно по адресу: `http://localhost:5173`

Открыть SwaggerUI можно по адресу: `http://localhost:5008/swagger`

## 🧰 Стек технологий
Fronted:

* [React](https://react.dev)
* [Tailwindcss](https://tailwindcss.com/)
* [Vite](https://vitejs.dev)

Backend:

* [ASP.NET Core 8](https://dotnet.microsoft.com/en-us/apps/aspnet)
* [LiteDB](https://github.com/mbdavid/litedb)
* [ErrorOr](https://github.com/amantinband/error-or)
* [Mapster](https://github.com/MapsterMapper/Mapster)
* [Swashbuckle.AspNetCore](https://github.com/domaindrivendev/Swashbuckle.AspNetCore)
