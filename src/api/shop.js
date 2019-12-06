/**
 * Mocking client-server processing
 */
const _products = [
    {"id": 1, "title": "iPad 4 Mini", "price": 100000, "inventory": 2},
    {"id": 2, "title": "H&M T-Shirt White", "price": 500, "inventory": 10},
    {"id": 3, "title": "Charli XCX - Sucker CD", "price": 2500, "inventory": 5}
  ]
  
  export default {
    getProducts (cb) {
      setTimeout(() => cb(_products), 100)
      
    },
  
    buyProducts (products, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
          ? cb()
          : errorCb()
      }, 100)
    }
  }