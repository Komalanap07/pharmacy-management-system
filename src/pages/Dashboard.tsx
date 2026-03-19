// import { useEffect, useState } from "react"
// import axios from "axios"
// import AdminLayout from "../layout/AdminLayout"
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer
// } from "recharts"

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     availableStock: 0,
//     todaySales: 0
//   })

//   const [salesChart, setSalesChart] = useState([])
//   const [topProducts, setTopProducts] = useState([])
//   const [expiringSoon, setExpiringSoon] = useState([])
//   const [lowStock, setLowStock] = useState([])

//   useEffect(() => {
//     fetchDashboardData()
//   }, [])

//   const fetchDashboardData = async () => {
//     try {
//       const { data } = await axios.get("/api/dashboard")

//       setStats(data.stats)
//       setSalesChart(data.last7DaysSales)
//       setTopProducts(data.topSelling)
//       setExpiringSoon(data.expiringSoon)
//       setLowStock(data.lowStock)
//     } catch (error) {
//       console.error("Dashboard error:", error)
//     }
//   }

//   return (
//     <AdminLayout>
//       <div className="container py-4">

//         {/* KPI CARDS */}
//         <div className="row g-4 mb-4">
//           <DashboardCard label="Total Products" value={stats.totalProducts} />
//           <DashboardCard label="Available Stock" value={stats.availableStock} />
//           <DashboardCard label="Today's Sales (₹)" value={stats.todaySales} />
//         </div>

//         {/* LAST 7 DAYS SALES CHART */}
//         <div className="card shadow-sm mb-4">
//           <div className="card-body">
//             <h5 className="mb-3">Last 7 Days Sales</h5>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={salesChart}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="total" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="row">

//           {/* TOP SELLING PRODUCTS */}
//           <div className="col-md-6 mb-4">
//             <div className="card shadow-sm h-100">
//               <div className="card-body">
//                 <h5 className="mb-3">Top Selling Products</h5>
//                 <ul className="list-group">
//                   {topProducts.map((item, index) => (
//                     <li key={index} className="list-group-item d-flex justify-content-between">
//                       {item.name}
//                       <span>{item.quantity} sold</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* EXPIRING SOON PRODUCTS */}
//           <div className="col-md-6 mb-4">
//             <div className="card shadow-sm h-100">
//               <div className="card-body">
//                 <h5 className="mb-3 text-warning">Expiring Soon</h5>
//                 <ul className="list-group">
//                   {expiringSoon.map((item, index) => (
//                     <li key={index} className="list-group-item">
//                       {item.name} - {item.expiryDate}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* LOW STOCK ALERT */}
//         <div className="card shadow-sm">
//           <div className="card-body">
//             <h5 className="mb-3 text-danger">Low Stock Alert</h5>
//             <ul className="list-group">
//               {lowStock.map((item, index) => (
//                 <li key={index} className="list-group-item d-flex justify-content-between">
//                   {item.name}
//                   <span>{item.quantity} left</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//       </div>
//     </AdminLayout>
//   )
// }

// const DashboardCard = ({ label, value }) => {
//   return (
//     <div className="col-12 col-md-6 col-lg-4">
//       <div className="card border shadow-sm h-100">
//         <div className="card-body">
//           <p className="text-muted small mb-2">{label}</p>
//           <h4 className="fw-semibold mb-1">{value}</h4>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard

import { useEffect, useState } from "react"
import AdminLayout from "../layout/AdminLayout"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

interface SaleChart {
  date: string
  total: number
}

interface ProductRow {
  name: string
  quantity: number
}

interface ExpiryRow {
  name: string
  expiryDate: string
}

interface Stats {
  totalProducts: number
  availableStock: number
  todaySales: number
}

const Dashboard = () => {

  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    availableStock: 0,
    todaySales: 0
  })

  const [salesChart, setSalesChart] = useState<SaleChart[]>([])
  const [topProducts, setTopProducts] = useState<ProductRow[]>([])
  const [expiringSoon, setExpiringSoon] = useState<ExpiryRow[]>([])
  const [lowStock, setLowStock] = useState<ProductRow[]>([])
  const [todayExpiry, setTodayExpiry] = useState<ExpiryRow[]>([])

  useEffect(() => {
    loadStaticData()
  }, [])

  const loadStaticData = () => {
    setStats({
      totalProducts: 1250,
      availableStock: 8420,
      todaySales: 5400
    })

    setSalesChart([
      { date: "Mon", total: 4200 },
      { date: "Tue", total: 5100 },
      { date: "Wed", total: 3900 },
      { date: "Thu", total: 6100 },
      { date: "Fri", total: 7200 },
      { date: "Sat", total: 6800 },
      { date: "Sun", total: 5400 }
    ])

    setTopProducts([
      { name: "Paracetamol 500mg", quantity: 120 },
      { name: "Azitreat 250", quantity: 95 }
    ])

    setExpiringSoon([
      { name: "Cefixime 200", expiryDate: "Apr 2026" },
      { name: "Ibuprofen 400", expiryDate: "May 2026" }
    ])

    setLowStock([
      { name: "Crocin Advance", quantity: 5 },
      { name: "Dolo 650", quantity: 8 }
    ])

    setTodayExpiry([
      { name: "Azitreat 250", expiryDate: "Today" }
    ])
  }

  return (
    <AdminLayout>
      <div className="container py-4">

        {/* KPI CARDS */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <p className="text-muted small mb-1">Total Products</p>
              <h4 className="fw-bold mb-0">{stats.totalProducts}</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card  shadow border-0 p-4">
              <p className="text-muted small mb-1">Available Stock</p>
              <h4 className="fw-bold mb-0">{stats.availableStock}</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <p className="text-muted small mb-1">Today's Sales (₹)</p>
              <h4 className="fw-bold mb-0">{stats.todaySales}</h4>
            </div>
          </div>
        </div>

        {/* SALES CHART */}
        <div className="card shadow border-0 mb-4 m mt-5">
          <div className="card-header fw-semibold text-success">
            Last 7 Days Sales
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#0d6efd" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="row mt-5">

          {/* TOP SELLING */}
          <div className="col-md-6 mb-4">
            <div className="card shadow border-0 h-100">
              <div className="card-header fw-semibold text-success">
                Top Selling Products
              </div>
              <div className="card-body">
                {topProducts.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between border-bottom py-2">
                    <span>{item.name}</span>
                    <span className="fw-bold text-success">{item.quantity} sold</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EXPIRING SOON */}
          <div className="col-md-6 mb-4">
            <div className="card shadow h-100 border-0">
              <div className="card-header text-warning fw-semibold">
                Expiring Soon
              </div>
              <div className="card-body">
                {expiringSoon.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between border-bottom py-2">
                    <span>{item.name}</span>
                    <span className="fw-semibold text-warning">{item.expiryDate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* LOW STOCK */}
        <div className="card shadow border-0 mb-4 mt-4">
          <div className="card-header text-warning fw-semibold">
            Low Stock Alert
          </div>
          <div className="card-body">
            {lowStock.map((item, index) => (
              <div key={index} className="d-flex justify-content-between border-bottom py-2">
                <span>{item.name}</span>
                <span className="fw-bold text-danger">{item.quantity} left</span>
              </div>
            ))}
          </div>
        </div>

        {/* <hr className="my-4" /> */}

        {/* TODAY EXPIRY AT LAST */}
        <div className="card shadow  border-0 mt-5">
          <div className="card-header bg-danger text-white fw-semibold text-center">
            ⚠ Today's Expiring Products
          </div>
          <div className="card-body">
            {todayExpiry.map((item, index) => (
              <div key={index} className="d-flex justify-content-between border-bottom py-2">
                <span>{item.name}</span>
                <span className="fw-bold text-danger">{item.expiryDate}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}

export default Dashboard