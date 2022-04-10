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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from './utils/theme'
import toast, { Toaster } from 'react-hot-toast';

const customTheme = createTheme(theme);

function App() {

  document.title = 'DeTrace'
  return (
    <div className="App">
      <ThemeProvider theme={customTheme}>
        <AuthContextProvider>
          <ContractContextProvider>
            <BrowserRouter>
              <Toaster />
              <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/:role/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/:role/products" element={<Layout><ProductSearch /></Layout>} />
                <Route path="/:role/inventory" element={<Layout><Inventory /></Layout>} />
                <Route path="/:role/products/:product_id" element={<Layout><ProductDetails /></Layout>} />
                <Route path="/:role/purchases" element={<Layout><MyPurchases /></Layout>} />
              </Routes>
            </BrowserRouter>
          </ContractContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
