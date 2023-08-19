import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    console.log(product)
    const existingItem = cartList.find(each => each.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
      const updatedCartList = cartList.map(item =>
        item.id === existingItem.id ? existingItem : item,
      )
      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const newCart = cartList.filter(each => each.id !== id)
    this.setState({cartList: newCart})
  }

  plusItem = product => {
    const {cartList} = this.state

    const existingItem = cartList.find(each => each.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
      const updatedCartList = cartList.map(item =>
        item.id === existingItem.id ? existingItem : item,
      )
      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, {...product, quantity: 1}],
      }))
    }
  }

  minusItem = product => {
    const {cartList} = this.state

    const existingItem = cartList.find(each => each.id === product.id)

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1
      const updatedCartList = cartList.map(item =>
        item.id === existingItem.id ? existingItem : item,
      )
      this.setState({cartList: updatedCartList})
    }
  }

  removeCartList = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            plusItem: this.plusItem,
            minusItem: this.minusItem,
            removeCartList: this.removeCartList,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
