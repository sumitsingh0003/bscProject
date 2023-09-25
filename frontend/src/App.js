import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header"
import Footer from "./components/Footer"
import MainPage from "./components/MainPage"
import AddStudent from "./components/AddStudent"
import EditStudent from './components/EditStudent';

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route exact path='/' element={<MainPage/>}/>
        <Route exact path='/add-student' element={<AddStudent/>}/>
        <Route path='/update-student/:id' element={<EditStudent />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
