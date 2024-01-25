# Basket Component

A sample basket component that will run as a federated module.

* CDN_LOCATION: `unused-example.surge.sh`
* FRAMEWORK: `react@18.2`
* COMPONENT: `Basket`

## Usage

Update the **federated plugin** config found in your `vite.config.js` to include:

```javascript
remotes: {
  BASKET: "CDN_LOCATION/assets/remoteEntry.js",
}
```

Import the Component into your React application lazily as follows:

```javascript
import React, { lazy, Suspense } from 'react';
// see remote config key and remote file component entry
const Basket = lazy(() => import("basket/App"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Basket label="Click me" onClick={myHandler} />
    </Suspense>
  )
}
```

![alt text](https://github.com/h-gomez/mmt-mfe-basket/blob/master/mfe-image.png?raw=true)