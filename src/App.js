import { Route, Routes } from "react-router-dom";
import Todos from "./Components/Todos";
import AddTodo from "./Components/AddTodo";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Todos />} />
        <Route path='/addtodo' element={<AddTodo />} />
      </Routes>
    </div>
  );
}

export default App;
