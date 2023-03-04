import { useEffect, useState } from 'react'
import Socket from '../websocket'

const useProductBid = (productId = "") => {
  const [isConnected, setIsConnected] = useState(Socket.connected);
  const [bid, setBid] = useState({});
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (productId) {
      Socket.on('connect', () => setIsConnected(true));
      Socket.on(`product-bid::${productId}`, (data = {}) => setBid(data))

      return () => {
        Socket.off('connect');
        Socket.off(`product-bid::${productId}`);
      }
    }

    Socket.on('connect', () => setIsConnected(true));
    Socket.on('products', (data) => setProducts(data));

    return () => {
      Socket.off('connect');
      Socket.off('products')
    }
  }, [productId]);

  return { bid, isConnected, products }
}

export default useProductBid;
