import { Routes, Route } from "react-router-dom";


function Shop1() {
  return (
    <div>
      <h1>Some Wizard with Steps</h1>
      <Routes>
        <Route index element={<StepOne />} />
       
      </Routes>
    </div>
  );
}
export default Shop1