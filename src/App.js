import { Route, Routes } from "react-router-dom";
import Todos from "./Components/Todos";
import AddTodo from "./Components/AddTodo";
import EditTodo from "./Components/EditTodo";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Todos />} />
        <Route path='/addtodo' element={<AddTodo />} />
        <Route path="/edittodo/:todoId" element={<EditTodo />} />
      </Routes>
    </div>
  );
}

export default App;
