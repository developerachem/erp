import { Outlet, Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/Sidebar"
import Dashboard from "./pages/dashboard/Dashboard"
import SalseAdd from "./pages/salse/add/SalseAdd"
import SalseList from "./pages/salse/list/SalseList"
import WelcomePage from "./pages/welcome-page/WelcomePage"
import InvoiceEdit from "./pages/salse/edit/Invoice-edit"
import SinglePage from "./pages/salse/single-page/SinglePage"


function App() {

  return (
    <>
      {/* <Header /> */}
      <div className="flex justify-between" style={{backgroundColor : 'var(--main-bg)'}}>
        <Routes>
          <Route path="/" element={<WelcomePage />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales/add" element={<SalseAdd />} />
            <Route path="/sales/:name" element={<SinglePage />} />
            <Route path="/sales/list" element={<SalseList />} />
            <Route path="/sales/edit/:name" element={<InvoiceEdit />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
