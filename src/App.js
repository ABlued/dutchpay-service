import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateGroup from "./components/CreateGroup.jsx/index";
import ExpenseMain from "./components/ExpenseMain.tsx";
import AddMembers from "./components/AddMembers.tsx";
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
