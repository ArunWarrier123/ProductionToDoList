import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import LandingScreen from './Screens/LandingScreen/LandingScreen';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* landing page shown on first visit */}
          <Route exact path='/' element={<LandingScreen />} />
          {/* home screen displaying alll lists and add option */}
          <Route exact path='/home' element={<HomeScreen />} /> 
          {/* login page */}
          <Route path='/login' element={<LoginScreen />} />
          {/* create account page */}
          <Route path='/register' element={<RegisterScreen />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
