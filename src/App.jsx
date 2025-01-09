import { useRef, useState } from 'react';
import products from './data.js'

function App() {
  const [selectDesserts, setSelect] = useState([]);

  function handleDesserts(desserts) {
    if(selectDesserts.find(x => x.id === desserts.id)) {
      selectDesserts.find(x => x.id === desserts.id).count++
      setSelect([...selectDesserts]);
    }else {
      setSelect([...selectDesserts, {...desserts, count:1}])
    }

  }

  return (
    <div className='container'>
      <RenderDessert products={products} handleDesserts={handleDesserts} setSelect={setSelect} selectDesserts={selectDesserts} />
      <RenderBasket selectDesserts={selectDesserts}  setSelect={setSelect}/>
    </div>
  )
}

function RenderDessert({ products, handleDesserts, setSelect, selectDesserts  }) {
  return (
    <div className='desserts'>
      <h1>Desserts</h1>
      <div className='dessert-list'>
        {products.map((product) => (
          <div className='dessert' key={product.id}>
          <div className='product-img' >
            <Counter label={product} handleDesserts={handleDesserts} isDesserts={selectDesserts.find(x => x.id === product.id)} setSelect={setSelect} selectDesserts={selectDesserts} />
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
function Counter({ label, handleDesserts, selectDesserts, setSelect, isDesserts  }) {

  function handleClick(id) {
    if(selectDesserts.find(x => x.id === id)) {
      selectDesserts.find(x => x.id === id).count++
      setSelect([...selectDesserts]);
    }
    // handleDesserts(label , newCount)
    
  }
  function decreaseClick(id) {
    if(selectDesserts.find(x => x.id === id).count !== 1) {
      if(selectDesserts.find(x => x.id === id)) {
        selectDesserts.find(x => x.id === id).count--
        setSelect([...selectDesserts]);
      }
    }else {
      setSelect(selectDesserts.filter(x => x.id !== id))
    }

    
  }
  return ( 
    <>
        <img src={label.img} alt="" className={isDesserts ? 'border' : '' }/>
        {!isDesserts ? (
          <button className='add-btn' onClick={() => handleDesserts(label)}>
            <img src="/img/shopping-icon.svg" alt="" />Add to Cart
          </button>
        ) :
        <div>
          <button onClick={() => decreaseClick(label.id)} >-</button>
          <span>{isDesserts.count}</span>
          <button onClick={() => handleClick(label.id)}>+</button>
        </div>

        }
    </>
  )
}


function RenderBasket({ selectDesserts, setSelect }) {
  const dialogRef = useRef(null);

  function handleRefresh() {
    setSelect([]) 
    dialogRef.current.close();
  };

  function removeDesserts(index) {
    setSelect(selectDesserts.filter((selectDesserts,  i) => i !== index))
  }
   
  function getTotal() {
    let total = 0;
    selectDesserts.map(x => (total += x.price * x.count))
    return total.toFixed(2);
  }

  function handleDialog() {
    dialogRef.current.showModal()
  }

  return (
    <div className='basket'>
      <h2>Your Cart</h2>
      {selectDesserts.length === 0  ? 
      <div className="empty-basket">
        <img src="/img/empty-list.png" alt="" />
        <p>Your added items will appear here</p>
      </div> : 
      <div className="order">
        <ul className="card-items">
          {selectDesserts.map((x, i) =>       
          <li key={i} className="card-item">
            <div className="product-info">
              <span className="item-name">{x.name}</span>
              <div>
                <span className="item-piece">{x.count}x</span>
                <span className="item-price">${x.price}</span>
                <span className="item-total">${(x.count * x.price).toFixed(2)}</span>
              </div>
            </div>
            <button className="remove-btn" onClick={() => removeDesserts(i)}><img src="/img/remove-btn.svg" alt="" /></button>
          </li>
          )}
        </ul>
        <div className="order-total">
          <h6>Order Total</h6>
          <span>${getTotal()}</span>
        </div>
        <div className="delivery-note">
          <img src="/img/carbon-neutral-icon.svg" alt="" />
          <p>This is a <strong>carbon-neutral</strong> delivery</p>
        </div>
        <button className="confirm-btn" onClick={handleDialog}>Confirm Order</button>
      </div>
      }
      <dialog ref={dialogRef} >
        <img src="/img/checked-icon.svg" alt="" />
        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>
        <ul className="order-summary">
        {selectDesserts.map((x, i) =>       
          <li key={i} className="card-item">
            <div className="product-info">
              <span className="item-name">{x.name}</span>
              <div>
                <span className="item-piece">{x.count}x</span>
                <span className="item-price">${x.price}</span>
                <span className="item-total">${(x.count * x.price).toFixed(2)}</span>
              </div>
            </div>
          </li>
          )}
          <div className="order-total">
            <h6>Order Total</h6>
            <span>${getTotal()}</span>
          </div>

        </ul>
        <button onClick={handleRefresh}>Start New Order</button>
    </dialog>
    </div>
  )
}
export default App
