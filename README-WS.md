Documentation Stream Bid

```javascript
  const productId = 1
  socket.on('connect', async function () {
    try {
      const response = await fetch('/api/v1/user') // get user info
      const user = await response.json();
      
      socket.emit('register', user.id);

      setTimeout(() => {
          socket.emit('subscribe', user.id);
      }, 2000)
    } catch (err) {
      console.info('failed to subscribe telegram listener');
    }
  });

  const handleSubsBid = (msg) => {
    console.info('ws', msg) // apply logic in this place
  }
  const hand
  socket.on(`product-bid::${productId}`, handleSubsBid)
```
