## Multi project starter
- This is an angular project starter, can be used for any new project with multi support, just rename  `projects/act` to your project name, including `angular.json` 
- This setup has ./libs and ./projects seperation so you can borrow libs assets to any new project you create
- angular/material and lazy page routing is already setup


### Notes
` "@angular/material": "=11.2.0", "bootstrap": "=4.6.0" ` < need to stay in those versions for compatibility



## Angular start guide info
refer to > `./angular.readme.md`



### cli scaffolding project.

```sh
create-nx-workspace spike --npm-scope spike
ng g app dashboard --style scss --routing
ng g app admin --style scss --routing
ng g app si --style scss --routing
ng g lib front --directory core
ng g lib act-name --directory core
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
ng g app act-admin
create folder act-admin at /libs/
create folder comp at /libs/
ng g lib pages --directory=comp --routing
ng g lib pages --directory=act-admin --routing
ng g lib http --directory=comp
ng g lib http --directory=act-admin
ng g lib interfaces --directory=comp
ng g lib interfaces --directory=act-admin
ng g lib services --directory=comp
ng g lib services --directory=act-admin
ng g lib components --directory=comp --routing
ng g lib components --directory=act-admin --routing
ng g lib states --directory=comp
ng g lib states --directory=act-admin
ng g lib resolvers --directory=comp
ng g lib resolvers --directory=act-admin

ng g c main --project=comp
ng g c main --project=act-admin

package.json
start:act-a: ng serve act-admin --proxy-config proxy/act-admin.json,
start:act: ng serve act --proxy-config proxy/comp.json,

generate user module
ng g m users --project=act-admin-pages --routing
ng g c user-list --project=act-admin-pages --routing

ng g m upload --project=act-pages --routing
ng g c upload --project=act-pages --routing

ng g m validation --project=act-admin-pages --routing
ng g c file-list --project=act-admin-pages --module=validation --routing
ng g c generate-result --project=act-admin-pages --module=validation --routing
ng g c benchmark-source --project=act-admin-pages --module=validation --routing
ng g c tender --project=act-pages

ng g m reports --project=act-pages --routing

ng g c reports/team --project=act-pages --routing
ng g c reports/priceModel --project=act-pages --routing
ng g c reports/exportToPims --project=act-pages --routing
ng g c reports/pimsResult --project=act-pages --routing
ng g c reports/cip --project=act-pages --routing
ng g c reports/exportToCrude --project=act-pages --routing
ng g c reports/tabMenu --project=act-pages --routing

ng g c productManagement --project=act-admin-pages --routing
ng g c crudeManagement --project=act-admin-pages --routing

ng g m scheduling --project=act-pages --routing
ng g c scheduling/crude-stock --project=act-pages --routing
ng g c scheduling/uploads --project=act-pages --routing
ng g c scheduling/main-scheduling --project=act-pages --routing
```