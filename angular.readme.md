

#### Angular 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.






### cli scaffolding project.

```sh
create-nx-workspace spike --npm-scope spike
ng g app dashboard --style scss --routing
ng g app admin --style scss --routing
ng g app si --style scss --routing
ng g lib front --directory core
ng g lib xyz-name --directory core
ng g lib front --directory theme
ng g lib dashboard --directory theme
ng g lib http
ng g lib guards
ng g lib states
ng add @angular/pwa --project dashboard
ng add @angular/pwa --project admin
ng add @angular/pwa --project si
```

```sh
comp

ng g app comp
ng g app xyz-admin
create folder xyz-admin at /libs/
create folder comp at /libs/
ng g lib pages --directory=comp --routing
ng g lib pages --directory=xyz-admin --routing
ng g lib http --directory=comp
ng g lib http --directory=xyz-admin
ng g lib interfaces --directory=comp
ng g lib interfaces --directory=xyz-admin
ng g lib services --directory=comp
ng g lib services --directory=xyz-admin
ng g lib components --directory=comp --routing
ng g lib components --directory=xyz-admin --routing
ng g lib states --directory=comp
ng g lib states --directory=xyz-admin
ng g lib resolvers --directory=comp
ng g lib resolvers --directory=xyz-admin

ng g c main --project=comp
ng g c main --project=xyz-admin

package.json
start:xyz-a: ng serve xyz-admin --proxy-config proxy/xyz-admin.json,
start:xyz: ng serve xyz --proxy-config proxy/comp.json,

generate user module
ng g m users --project=xyz-admin-pages --routing
ng g c user-list --project=xyz-admin-pages --routing

ng g m upload --project=xyz-pages --routing
ng g c upload --project=xyz-pages --routing

ng g m validation --project=xyz-admin-pages --routing
ng g c file-list --project=xyz-admin-pages --module=validation --routing
ng g c generate-result --project=xyz-admin-pages --module=validation --routing
ng g c benchmark-source --project=xyz-admin-pages --module=validation --routing
ng g c tender --project=xyz-pages

ng g m reports --project=xyz-pages --routing

ng g c reports/team --project=xyz-pages --routing
ng g c reports/priceModel --project=xyz-pages --routing
ng g c reports/exportToPims --project=xyz-pages --routing
ng g c reports/pimsResult --project=xyz-pages --routing
ng g c reports/cip --project=xyz-pages --routing
ng g c reports/exportToCrude --project=xyz-pages --routing
ng g c reports/tabMenu --project=xyz-pages --routing

ng g c productManagement --project=xyz-admin-pages --routing
ng g c crudeManagement --project=xyz-admin-pages --routing

ng g m scheduling --project=xyz-pages --routing
ng g c scheduling/crude-stock --project=xyz-pages --routing
ng g c scheduling/uploads --project=xyz-pages --routing
ng g c scheduling/main-scheduling --project=xyz-pages --routing
```
