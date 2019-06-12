# 🖨️ vconsole

Sometimes, for obscure reasons, you need a vconsole.

## installation

```
yarn add @topl/vconsole
```

## example

```javascript
import { wrapConsole } from "@topl/vconsole";

const vconsole = wrapConsole(console, callback);

vconsole.log("lalala", 42, whatever); // callback("log", ["lalala", 42, whatever])
vconsole.dir([1,2,3], function () {}, {}) // callback("dir", [[1,2,3], function () {}, {}])
```

and so on for `.warn()`, `.error()`, `.dirxml()` and the rest of the console api

## license

See [LICENSE](LICENSE)
