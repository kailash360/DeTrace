import Layout from './pages/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import MyPurchases from './pages/MyPurchases/MyPurchases'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import ProductSearch from './pages/ProductSearch/ProductSearch'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Inventory from './pages/Inventory/Inventory'
import AuthContextProvider from './context/AuthContext'
import ContractContextProvider from './context/ContractContext'

function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <ContractContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/products" element={<Layout><ProductSearch /></Layout>} />
              <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
              <Route path="/products/:product_id" element={<Layout><ProductDetails /></Layout>} />
              <Route path="/purchases" element={<Layout><MyPurchases /></Layout>} />
            </Routes>
          </BrowserRouter>
        </ContractContextProvider>
      </AuthContextProvider>
    </div>
  )
}

export default App
