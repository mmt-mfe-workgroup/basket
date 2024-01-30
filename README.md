# Basket Component

A sample basket component that will run as a federated module.

* SURGE_CDN: `unused-example.surge.sh`
* NETLIFY_CDN: `https://mmt-mfe-basket.netlify.app`
* FRAMEWORK: `react@18.2`
* COMPONENT: `Basket`

## Setup

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

## Usage

This basket component will use Custom Events to interact with other federated modules and has the following interface:

> * Event name: `addToBasket`
> * Direction: listen
> * Type: `Product`
> * Expects: `event.detail.product`
> * Action: Listens for items to add from the catalouge to the basket

<br/>

> * Event name: `basketItemCount`
> * Direction: dispatch
> * Type: `number`
> * Produces: `event.detail: { basketItemCount: 5 }`
> * Action: Emits a value representing the current number of items in the basket

<br/>

> * Event name: `applyVoucher`
> * Direction: listen
> * Type: `number`
> * Produces: `event.detail: { discountAmount: 0.5 }`
> * Action: Listens for an event that sends in the discount amount in percentage

<br/>

> * Event name: `goToCheckout`
> * Direction: dispatch
> * Type: `boolean`
> * Produces: `event.detail: { checkoutIntent: true }`
> * Action: Emits an event when the purchase button is clicked

<br/>

---

<br/>

![alt text](https://github.com/h-gomez/mmt-mfe-basket/blob/master/mfe-image.png?raw=true)