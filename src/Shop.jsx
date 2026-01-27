import { Routes, Route } from "react-router";

function Shop() {
  return (
    <div>
      <h1>Some Wizard with Steps</h1>
      <Routes>
        <Route index element={<StepOne />} />
       
      </Routes>
    </div>
  );
}
export default Shop