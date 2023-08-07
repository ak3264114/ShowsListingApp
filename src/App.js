import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AllShows from './component/AllShows';
import ViewSummery from './component/ViewSummery';

function App() {
  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<AllShows/>} />
      <Route path="/:id" element = {<ViewSummery/>} />
    </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
