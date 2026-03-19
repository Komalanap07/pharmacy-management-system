import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../../src/componant/ProtectedRoute'
import { ROLES } from '../../roles'

import Login from '../../src/auth/login'
import AdminDashboard from '../pages/Dashboard'
import { RecentProjects } from '../pages/products/Project'
 
import Hydrograph from '../pages/hydrograph chart/StormwaterSizingGraph'
import AdminLayout from '../layout/AdminLayout'
import CalculationTableMain from '../pages/CalculationTable/CalculationTableMain'
import IFDTable from '../pages/IFD Table/IFDTableMain'
import EditProjectStormWater from '../pages/products/EditProject'
import ImageProductScanner from '../pages/products/ImgProductScanner'
import ImageAIScanner from '../pages/products/AIIMGProcess'
import AddProductManualy from '../pages/product/AddProduct'
import PharmaDashboardMain from '../pages/Dashboard/DashboardMain'
import Inventory from '../pages/Inventry/Inventry'
import ExpiryAlertsMain from '../pages/ExpiryAlert/ExpiryAlertMain'

// let volumeRequired =  {
//   // const volumeRequired =any
// };
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />} />

      {/* Login route */}
      <Route path='/login' element={<Login />} />

      <Route
        path='/admin'
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <PharmaDashboardMain />
          </ProtectedRoute>
        }
      />
      <Route
        path='/products'
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <RecentProjects />
          </ProtectedRoute>
        }
      />
      {/* First type calculator routes */}
      <Route
        path='/NewProduct'
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AddProductManualy />
          </ProtectedRoute>
        }
      />
      <Route
        path='/NewProductByScann'
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <ImageProductScanner />
          </ProtectedRoute>
        }
      />
      <Route
        path='/AIImgProcess'
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <ImageAIScanner />
          </ProtectedRoute>
        }
      />
      <Route
        path='/inventory'
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Inventory />
          </ProtectedRoute>
        }
      />
      <Route
        path='/expiry-alert'
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <ExpiryAlertsMain />
          </ProtectedRoute>
        }
      />
      <Route
        path='/EditProjectStormWater/:projectId'
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <EditProjectStormWater />
          </ProtectedRoute>
        }
      />
      
      <Route
        path='/calculation-table'
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <CalculationTableMain />
          </ProtectedRoute>
        }
      />
      <Route
        path='/ifd-table'
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <IFDTable />
          </ProtectedRoute>
        }
      />
    

      {/* Catch-all: redirect unknown routes to /login */}
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  )
}

export default AppRoutes
