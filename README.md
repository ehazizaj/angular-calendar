# IntelycareTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Development server
Run `npm install` to install all dependencies
 
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `json-server --watch db.json` for a db server. `db.json` is a file located in the root of the app

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.



## Description
This project consist on 2 main components:
* Login
* Calendar

## Architecture
This project architecture on 5 main modules:
* Root Modules
* Core Module / Configs
* Layout module
* Shared module
* Features module


## Root Modules

Root modules has default module that are created on project create.

In the root module is the file `app-routing-.module.ts` responsible for project routes and lazy loading modules and `app.component.ts` is the file for loading routers

## Core Module / Configs

This module has config files of the project and login module.

* Components
  - Login Component and module which is loaded on / route if user is not logged
  

* Config
  - `toaster.config.ts `which indicates how the toaster will be shown in the project
  
* Guards
  - `auth.guard.ts` is the file that check if user can access modules that are auth protected
  

* Interceptors
  - `error.interceptor.ts` is loaded on the boot of the project and is responsible for any error managemnt that may occours by the server or client side  
  - `jwt.interceptor.ts` is loaded on the boot of the project and add the token in header of every request we do on a server, this interceptor excludes login


* Models
  - `user.ts` in the user interface


* Services
  - `auth.service.ts` is the service for logging user, save user token in local storage and also handle logout
  - `hotkeys.service.ts` is the service for creating keyboards shortcuts for a better navigation
  - `menu.service.ts` is the service responsible for creating menu that are shows on sidebar. This file aslo manages show / close of sidebar

## Layout Module
Layout module is the module responsible for creating the layout of the project. This module has its own module
`layout.module.ts` and everything used inside is declared in this file.
This module has 3 main components:
* Header
  - header module is the module responsible for the header in the layout, in this module user can also logout
* Main Layout
  - main layout component in the component responsible for the main view, this component manges keyboard shortcuts and side bar toggle
* Menu Item
  - menu item component is responsible for menu showing recursion in side bar

## Shared Module
Shared module in the module where are located files that are used in different components
* `dateUtilis.ts` is a pipe that transform the date when a calendar event is update
* `tranlucent.directive.ts` is a costum directive that apply styles to buttons

## Features Module
This module is responsible for every feature of the project. For the moment there is only Home component that
handle the calendar. Every feature should be separated in stateful components that implement all the business logic and stateless components that serve only what stateful components serves them.

* Stateful components are located on containers folder
  - main-home component is responsible for retreating all data from the local json server, create all calendar events, manage user interaction with the calendar, like click on days, click on events, update events, delete events.

* Stateless components are located inside components folder
  - song details is a dialog component that shows all the details of a calendar event, user can also choose to delete an event or just watch it
  - songs list by day is a dialog component that show a table of all events in the particular day

* Home Service
  - is the service dedicated to the feature, this service is responsible for retriving data, updating data and deleting data


## To Know

This project retrive data from 2 files in 2 different ways.
* `users.json` is a json file that has all registered users and based on this data a user can loggin or not
* `db.json` is a local server json file acting like a database for all calendar events

## Edge Cases
* A logged user token never expire
* If the project will be expanded on the future, the way we retrive data should be changed in a state solution.
Since we don't have any other module in this point of the future the array of data we have will never be retreived twice, because we never leave the home component and it will never be destroyed.
  If in a point we would add another feature, I would choose to save calendar events array in a rxjs state, in order to minify the request user do to the server at least once a day.
  I have also added the file example for rxjs store in the directory `src/app/store/store.ts`

