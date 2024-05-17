//import ReactDOM from 'react-dom/client';
import {Routes,Route} from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Event } from './pages/Event/Event';
import { Department } from './pages/Department/Department';
import { DepartmentDetails } from './pages/DepartmentDetails';
import { News } from './pages/News/News';
import { NewsDetails } from './pages/NewsDetails';
import { Test } from './pages/Test';
import { Resources } from './pages/Resources/Resources';
import { Podcast } from './pages/Podcast/Podcast';
import { Sermon } from './pages/Sermon/Sermon';
import { Contact } from './pages/Contact/Contact';
import { SignUp } from './pages/SignUp/SignUp';
import { FoodBank } from './pages/FoodBank/FoodBank';
import { Review } from './pages/Review/Review';
import { Donation } from './pages/Donation/Donation';
import { Give } from './pages/Give/Give';
import { Login } from './pages/Login/Login';
import { Logout } from './pages/Logout/Logout';
import { Category } from './pages/Category/Category';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { ProductDetails } from './pages/ProductDetails';
import { Product } from './pages/Product/Product';
import { Cart } from './pages/Cart/Cart';
import { CheckOut } from './pages/CheckOut/CheckOut';
import { Success } from './pages/Success/Success';


//import logo from './logo.svg';
//import './App.css';

function App() {
  return ( 
    <div>
       <Router>
          <NavBar/>
          <Routes>
              <Route exact path = "/" element={<Home/>}></Route>
              <Route path = "/about" element={<About/>}></Route>
              <Route path = "/events" element={<Event/>}></Route>
              <Route path = "/departments" element={<Department/>}></Route>
              <Route path = "/dept-details" element={<DepartmentDetails/>}></Route>
              <Route path = "/news-details" element={<NewsDetails/>}></Route>
              <Route path = "/news" element={<News/>}></Route>
              <Route path = "/resources" element={<Resources/>}></Route>
              <Route path = "/podcasts" element={<Podcast/>}></Route>
              <Route path = "/sermons" element={<Sermon/>}></Route>
              <Route path = "/contact" element={<Contact/>}></Route>
              <Route path = "/signup" element={<SignUp/>}></Route>
              <Route path = "/foodbank" element={<FoodBank/>}></Route>
              <Route path = "/review" element={<Review/>}></Route>
              <Route path = "/donation" element={<Donation/>}></Route> 
              <Route path = "/give" element={<Give/>}></Route>
              <Route path = "/login" element={<Login/>}></Route>
              <Route path = "/dashboard" element={<Dashboard/>}></Route>
              <Route path = "/logout" element={<Logout/>}></Route>
              <Route path = "/categories" element={<Category/>}></Route>
              <Route path = "/product" element={<Product/>}></Route>
              <Route path = "/product-details" element={<ProductDetails/>}></Route>
              <Route path = "/cart" element={<Cart/>}></Route>
              <Route path = "/checkout" element={<CheckOut/>}></Route>
              <Route path = "/success" element={<Success/>}></Route>
              <Route path = "/test" element={<Test/>}></Route>
          </Routes>
          <Footer/>
       </Router>
    </div>
  );
}

export default App;
