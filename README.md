# Forum

* Frontend application for [backend](https://github.com/innovember/forum)

## Installing SSL keys

- This project requires connection using ssl keys.
- You must generate your own ssl cert and key in the {root}/ssl directory.
- If needed, change cert name and key name in vite.config.ts file.

## Backend starting

- Go to the link given above, clone the repo and run the backend server.

## Frontend starting

- Forum requires [Node.js](https://nodejs.org/) to run.
- Make sure that you have the latest LTS version of node.
- Open a terminal instance in the root folder:

```sh
npm i
npm start
```

## Screenshots

- App preloader
  ![App preloader](src/assets/img/screenshots/app-preloader.jpg)
- Main page, user is not logged in
  ![Main page, user is not logged in](src/assets/img/screenshots/main-page-no-auth.jpg)
- Main page, user is logged in
  ![Main page, user is logged in](src/assets/img/screenshots/main-page-auth.jpg)
- Create post form
  ![Create post form](src/assets/img/screenshots/create-post.jpg)
- User page and notifications
  ![User page and notifications](src/assets/img/screenshots/user-page-and-notifications.jpg)
- Moderator dashboard
  ![Moderator dashboard](src/assets/img/screenshots/moderator-dashboard.jpg)
- Admin dashboard
  ![Admin dashboard](src/assets/img/screenshots/admin-dashboard.jpg)
