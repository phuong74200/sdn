## 1. How to run

```
yarn
yarn dev
```

Server will run at: _http://localhost:5300_

## 2. Note

- Frontend don't have hot reloading. So, reload the page your self
- Don't touch the `src/public` folder if you don't know what you're doing

## 3. Tech

#### This boilerplate:

- Using [handlebars](https://handlebarsjs.com/)
- Using [typescript](https://www.typescriptlang.org/)
- Using [sass](https://sass-lang.com/)
- Using [mongoose](https://mongoosejs.com/)

## 4. Known issues

If you encountered this error:
```
warning Pattern ["strip-ansi@^6.0.1"] is trying to unpack in the same destination...
```
or
```
const stripAnsi = require('strip-ansi');
                  ^

Error [ERR_REQUIRE_ESM]: require() of ES Module
```
just delete the yarn.lock file and run ```yarn install``` again