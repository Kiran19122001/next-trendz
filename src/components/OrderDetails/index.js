import CartContext from '../../context/CartContext'
import './index.css'

const OrderDetails = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      const items = cartList.length
      cartList.forEach(each => {
        total += each.price * each.quantity
      })

      return (
        <div className="order-container">
          <div>
            <p className="order-bill">
              Order total : Rs <span className="bill">{total}</span>/-
            </p>
            <p className="items-in-c">
              <span className="tt-items">{items}</span> items in cart
            </p>
            <button type="button" className="check-btn">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default OrderDetails
