import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Tickets from './pages/Tickets';
import CreateTicket from './pages/CreateTicket';
import EditTicket from './pages/EditTicket';
import SelectTicketToEdit from './pages/SelectTicketToEdit';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

function AppRoutes() {
  const location = useLocation();
  const showHeader = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route path="/tickets" element={
          <PrivateRoute>
            <Tickets />
          </PrivateRoute>
        } />

        <Route path="/create" element={
          <PrivateRoute>
            <CreateTicket />
          </PrivateRoute>
        } />

        <Route path="/select-edit" element={
          <PrivateRoute>
            <SelectTicketToEdit />
          </PrivateRoute>
        } />

        <Route path="/edit/:id" element={
          <PrivateRoute>
            <EditTicket />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;


// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Tickets from './pages/Tickets';
// import CreateTicket from './pages/CreateTicket';
// import EditTicket from './pages/EditTicket';
// import Header from './components/Header';
// import SelectTicketToEdit from './pages/SelectTicketToEdit';

// function App() {
//   return (
//     <BrowserRouter>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/tickets" element={<Tickets />} />
//         <Route path="/create" element={<CreateTicket />} />
//         <Route path="/select-edit" element={<SelectTicketToEdit />} />
//         <Route path="/edit/:id" element={<EditTicket />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
