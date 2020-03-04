### In this Repo, I have mainly focused on migrating from TSLint to ESLint, within the angular application.

## **Pinch of History**

Those were the days when we struggled very hard to find syntax errors, version compatibilities, and formatting the code. To add to the complexity, If it is an Enterprise-level application then we were in complete oblivion.

Then came linting tools as our saviors.

![Imagine our superheroes as linting tools that came to our rescue from cosmic forces](https://dev-to-uploads.s3.amazonaws.com/i/65nb4hf2z5vwb19hber2.jpeg)Imagine our superheroes as linting tools that came to our rescue from cosmic forces(run time issues)

| Tool    | year |
| ------- | :--: |
| JS Lint | 2002 |
| JS Hint | 2011 |
| JSCS    | 2014 |
| ESLint  | 2013 |
| TSLint  | 2016 |

We all were so happy and celebrating the arrival of code quality tools.

As the Web Community started moving towards a more consistent and well-defined environment setup for Developers, so that they can just concentrate on work, leaving behind all there worries mentioned above.

Out of the crowd, There was a shout.. **which of them is best?**

![best Linting tool?](https://dev-to-uploads.s3.amazonaws.com/i/rm65ofg7s64zuwtroz3w.jpeg)

Every Tool has its own benefits, but Eslint came out as a clear winner in the case of JavaScript and frameworks based on JS(Vue and React).

But it is not the case with projects which were Built with typescript and Angular (as it embraces typescript).

Then Developers struggled a lot to fit in Both ESLint and TSLint into their projects. So there is a conflict between their AST(Abstract Syntax Tree) generated by their respective parsers.

> **Both ESLint and TypeScript rely on turning your source code into a data Structure called an AST(Abstract Syntax Tree) in order to do their jobs.**

> **The reason for this difference is not so interesting or important and is simply the result of different evolutions, priorities, and timelines of the projects. [🔗](https://github.com/typescript-eslint/typescript-eslint#why-does-this-project-exist)**

> **In Short, they were not compatible 👊**

![rage a war](https://dev-to-uploads.s3.amazonaws.com/i/2nww9bd5pyohca2yf21e.png 'TSLint vs ESLint')

> **😄 Good News**: _Palantir, the backers behind TSLint announced that they would be deprecating TSLint in favor of supporting typescript-eslint_.
> **😄 Good News**: _Angular announced v10 will embrace eslint_.

As Developers, We always have the anxiety to be the first one to try. So I have migrated my Angular project and typescript libraries to ESLint from TSLint.

I would say these guys behind this project are so awesome 👏, they made this migration so simple.

---

## **No more History, Just start implementing.**

### pre-requisites

- We should be familiar with Angular project creation.
- Using VSCode efficiently.
- Prettier and ESLint plugins installed in vscode.

### **1. Implementation in a New Angular Project.**

- Navigate to your angular project through terminal or vscode terminal.
- Install the required dependencies

```bash
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

> **eslint**: _core library_ > **@typescript-eslint/parser** : _This Parser provides ESLint with an alternative parser to use. (default ESLint parser is espree)_ > **@typescript-eslint/eslint-plugin** :_Contains set of eslint rules,
> which are specific to tslint._

- Now create a .eslintrc.js file with the following content.

```javascript
/* I prefer to use JavaScript file because i can write comment and other can understand it.
if you wish to use .eslintrc without js extension,then you need to remove all the comments and
its looks just like { ..eslint config as below} without module.export 
*/

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // we are changing default parser
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json' // path to tsconfig
  },

  /* A plugin provides you with a set of rules that you can 
individually apply depending on your need.
Just having a plugin does not enforce any rule.
You have to choose which rules you need. 
A plugin may provide you with zero, one, or more configuration files.
If the plugin provides a configuration file, then you can load
that in your extends section after adding the plugin in the plugins section.
*/
  plugins: ['@typescript-eslint'],

  /* extends uses a config file which applies set of rules 
when you add that to the extends options. */
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {},
  overrides: []
};
```

### **2. Basic setup is ready, Now time to configure Prettier.**

> **Prettier:** > _it is an opinionated code formatter, which helps to format code on save, focus-out of the file and many more. It will reduce discussion on formatting in code reviews, which saves you time and energy.[Want to know more about prettier? 🔗](https://prettier.io/docs/en/why-prettier.html)_

you have to make sure that prettier understands what ESLint says and format accordingly. So we need two more dev-dependencies

```bash
npm i -D prettier prettier-eslint eslint-config-prettier
```

- then update our eslintrc.js

```javascript
module.exports = {
  /* remaining configuration stays same*/
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ]
};
```

- Create .prettierrc

```json
{
  "singleQuote": true,
  "printWidth": 100
}
```

> **For vscode users:**
>
> 1. _you have to uninstall TSLint extension(if installed)._
> 2. _install prettier [vscode prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode),
>    This extension will automatically detect when you have prettier-eslint installed and use them instead of prettier by itself. For configuration of these linter integrations, see their respective documentation._
> 3. _install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)_
> 4. _open settings or workspace file_
>
> ```json
>   .
>   .
>   "editor.defaultFormatter": "esbenp.prettier-vscode",
>   "editor.formatOnSave": true,
>   "editor.codeActionsOnSave": {
> ```

            "source.fixAll.eslint": true
        },

.
.

````
***

We are good with basic setup and prettier configuration, But we never satisfied with the basic setup right.

***
### __I Would like to force my team to add header in all files.__

With the current setup, we can't have a rule like this.
In this situation, we should go to [TSLint to ESLint migration page](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md) and find a proper plugin for the header. I found a plugin called as eslint-plugin-header

```bash
npm i -D eslint-plugin-header
````

- add this new plugin and corresponding rules in eslintrc.js

```javascript
module.exports = {
  plugins: ['@typescript-eslint', 'header'],
  /* remaining config doesn't change */
  rules: {
    'header/header': [
      2,
      'line',
      [
        {
          pattern: 'License: \\(C\\) Entangled Cognition. ((20[0-9]{2}-?)?)((20[0-9]{2}))'
        }
      ]
    ]
  }
};
```

- if you go to any ts file in app then you would see an error like this
  ![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/4i7h3ujrrnsctsu4xmfz.PNG)
- to fix it we need to add below line on top
  ![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/axbdfutiho8pzg5zcmu5.PNG)

### **I Would like to force my team to add a line after each member in class.**

This is out of the box from existing setup we had.

```javascript
module.exports = {
  /*Remaining config doesn't change*/
  rules: {
    'lines-between-class-members': 'error'
  }
};
```

### **Other use cases.**

- if you are using nx, then you can use ESLint as a linting option now (nx >8.x).

```bash
nx g @nrwl/web:app --linter eslint
```

- if you want to use ESLint with React, you can use create-react-app and it is using eslint out of the box.

---

## References

- github repo for reference (https://github.com/bharathmuppa/tslint-to-elsint-migration-angular)
- list of awesome available plugins [go to page (https://github.com/dustinspecker/awesome-eslint)

- eslint rules [go to page](https://eslint.org/docs/rules/)
- [Article on TypeScript AST](https://medium.com/@urish/diving-into-the-internals-of-typescript-how-i-built-typewiz-d273bbef3565)

---

## **Learned something? please help others find this article.**
