import { Routes, Route, Navigate } from "react-router-dom";
import GlobalLayout from "./components/GlobalLayout";
import ROUTE_NAMES from "./routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GlobalLayout />}>
        <Route index element={<Navigate replace to="/account-list" />} />
        <Route
          path={ROUTE_NAMES.ACCOUNT_LIST}
          element={<div>account list</div>}
        />
        <Route
          path={ROUTE_NAMES.ACCOUNT_DETAIL}
          element={<div>account detail</div>}
        />
        <Route
          path={`${ROUTE_NAMES.ACCOUNT_DETAIL}/:id`}
          element={<div>account detail</div>}
        />
        <Route path={ROUTE_NAMES.USER_LIST} element={<div>user list</div>} />
        <Route
          path={ROUTE_NAMES.USER_DETAIL}
          element={<div>user detail</div>}
        />
      </Route>
      <Route path="/login" element={<div>login page</div>} />
    </Routes>
  );
}

export default App;
