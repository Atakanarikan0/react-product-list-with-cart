import { useState } from 'react';
import products from './data.js'

function App() {
  return (
    <div className='container'>
      <RenderDessert products={products} />
      <RenderBasket />
    </div>

  )

}

function RenderDessert({ products }) {

  return (
    <div className='desserts'>
      <h1>Desserts</h1>
      <div className="dessert-list">
        {products.map((product) => (
          <div className='dessert' key={product.id}>
          <div className="product-img" >
            <Counter label={product} />
          </div>
          <span>{product.category}</span>
          <h3>{product.name}</h3>
          <h5>${product.price}</h5>
          </div>   
        ))}
      </div>
    </div>
  )
}
function Counter({ label}) {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1)
  }
  return ( 
    <>
      <img src={label.img} alt="" />
      <button className='add-btn' onClick={handleClick}><img src="/img/shopping-icon.svg" alt="" />Add to Cart {count}</button>
    </>
  )
}

function RenderBasket() {
  return (
    <div className='basket'>
      <h2>Your Cart</h2>
      <div className="empty-basket">
        <img src="/img/empty-list.png" alt="" />
        <p>Your added items will appear here</p>
      </div>
    </div>
  )
}
export default App
