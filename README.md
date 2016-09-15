Phoenix
==================================

Acts as a delegator for separately deployed apps. It proxies them by referencing
a configured mapping between app name and absolute URL where the app is deployed.

### Usage

Modify `src/config.json` apps-map property.

E.g.
```
"apps-map": {
  "invoice-generator": {
    "url": "https://tg-invoice-generator.herokuapp.com",
    "rails": false
  },
  "line-sheet-generator": {
    "url": "https://morning-hamlet-88978.herokuapp.com",
    "rails": true
  }
}
```
tells the app to have https://tools.tradegecko.com/invoice-generator proxy https://tg-invoice-generator.herokuapp.com
and https://tools.tradegecko.com/line-sheet-generator-generator proxy https://morning-hamlet-88978.herokuapp.com

SEO FTW!
