import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateGroup from "./components/CreateGroup.tsx";
import ExpenseMain from "./components/ExpenseMain.tsx";
import AddMembers from "./components/AddMembers.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateGroup />} />
        <Route path='/members' element={<AddMembers />} />
        <Route path='/expense' element={<ExpenseMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
