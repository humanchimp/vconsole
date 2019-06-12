# 🖨️ vconsole

Sometimes, for obscure reasons, you need a vconsole.

## installation

```
yarn add @topl/vconsole
```

## api

```javascript
import { wrapConsole } from "@topl/vconsole";

const vconsole = wrapConsole(console, callback);
```

## license

See [LICENSE](LICENSE)
