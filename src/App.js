import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateGroup from "./components/CreateGroup.jsx";
import ExpenseMain from "./components/ExpenseMain.jsx";
import AddMembers from "./components/AddMembers.jsx";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<CreateGroup />} />
          <Route path='/members' element={<AddMembers />} />
          <Route path='/expense' element={<ExpenseMain />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
