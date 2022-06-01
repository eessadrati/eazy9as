import AuthState from "./context/auth/authState";
import Router from "./routes/Router";
import LoadingState from './context/loading/loadingState';
import ProductState from './context/products/productState';
import CartState from './context/cart/cartState';


function App() {
  return (
    <>
    <AuthState>
      <LoadingState>
        <ProductState>
          <CartState>
      <Router/>
      </CartState>
      </ProductState>
      </LoadingState>
    </AuthState>
    </>
  );
}

export default App;
