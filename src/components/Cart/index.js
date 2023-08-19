import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import OrderDetails from '../OrderDetails'

import './index.css'

const Cart = () => (
  <>
    <Header />
    <CartContext.Consumer>
      {value => {
        const {cartList, removeCartList} = value
        const showCartView = cartList.length === 0
        const removeAllItems = () => {
          removeCartList()
        }
        return showCartView ? (
          <EmptyCartView />
        ) : (
          <div className="cart-container">
            <div className="cart-content-container">
              <div className="header-remove-all">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={removeAllItems}
                >
                  Remove all
                </button>
              </div>
              <CartListView />
              <OrderDetails />
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  </>
)

export default Cart
