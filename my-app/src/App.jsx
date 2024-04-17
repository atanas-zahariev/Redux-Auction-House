import { Route, Routes } from 'react-router-dom';

 import Home from './components/common/HomeComponent'


function App() {
  console.log('App is re-render');
  return (
    
          <div id="page-content">
            
            <main>
             
                  <Routes>

                    <Route path='/' element={<Home />} />
                  

                  </Routes>
             
            </main>

            <footer>SoftUni &copy; 2023 React Exam</footer>
          </div>
  
  );
}

export default App;
