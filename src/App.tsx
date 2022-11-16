import React, { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
const UserTest = React.lazy(() => import("./pages/userTest"));
const DataCollection = React.lazy(() => import("./pages/dataCollection"));
const DataProcess = React.lazy(() => import("./pages/dataProcess"));
const BatchSearch = React.lazy(() => import("./pages/batchSearch"));

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<></>}>
              <BatchSearch />
            </Suspense>
          }
        />
        <Route
          path="/userTest"
          element={
            <Suspense fallback={<></>}>
              <UserTest />
            </Suspense>
          }
        />
        <Route
          path="/dataCollection"
          element={
            <Suspense fallback={<></>}>
              <DataCollection />
            </Suspense>
          }
        />
        <Route
          path="/dataProcess"
          element={
            <Suspense fallback={<></>}>
              <DataProcess />
            </Suspense>
          }
        />
        <Route
          path="/batchSearch"
          element={
            <Suspense fallback={<></>}>
              <BatchSearch />
            </Suspense>
          }
        />
      </Routes>
    </HashRouter>
  );
}
export default App;
