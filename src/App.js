
import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import Header from './components/Home/Header/Header';
import Todolist from './pages/Todolist/Todolist';
import ToDoListRedux from './pages/Todolist/ToDoListRedux';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/todolist/' element={<Todolist />} />
        <Route path='*' element={<Home />} />
        <Route path='/todolistredux' element={<ToDoListRedux />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
