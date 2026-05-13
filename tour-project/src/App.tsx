import { Routes, Route } from 'react-router-dom'
import './App.css'
import ContentfulCMS from './components/contentfulCMS/ContentfulCMS'
import Cart from './components/cart/Cart'
import CartReducer from './components/cart/CartReducer'
import ColorGenerator from './components/colorGenerator/ColorGenerator'
import GroceryBud from './components/colorGenerator/GroceryBud'
import Lorems from './components/Lorem/Lorems'
import Menu from './components/menu/Menu'
import Context from './components/navBar/Context'
import Navbar from './components/navBar/Navbar'
import StrapiSubmenus from './components/navBar/StrapiSubmenus'
import Question from './components/Questions/Question'
import Reviews from './components/Reviews/Reviews'
import Slider from './components/Reviews/Slider'
import Tab from './components/Tabs/Tab'
import Project from './components/tours/Project'
import Projects from './components/tours/Projects'
import TourPage from './components/tours/TourPage'
// import ProjectQuery from './components/tours/ProjectQuery'
import ReactQueryImage from './components/upasehImage/ReactQueryImage'
import UnsplashImage from './components/upasehImage/UnsplashImage'

function App() {
  return (
    <Routes>
      <Route index element={<ContentfulCMS />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/cart-reducer' element={<CartReducer />} />
      <Route path='/colorGenerator' element={<ColorGenerator />} />
      <Route path='/groceryBud' element={<GroceryBud />} />
      <Route path='/lorem' element={<Lorems />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/context' element={<Context />} />
      <Route path='/navBar' element={<Navbar />} />
      <Route path='/strapi' element={<StrapiSubmenus />} />
      <Route path='/question' element={<Question />} />
      <Route path='/review' element={<Reviews />} />
      <Route path='/slider' element={<Slider />} />
      <Route path='/tab' element={<Tab />} />
      <Route path='/tour' element={<Project />} />
      <Route path='/tours' element={<Projects />} />
      <Route path='/tourPage' element={<TourPage />} />
      {/* <Route path='/projectQuery' element={<ProjectQuery fetchTour={} />} /> */}
      <Route path='/ImageQuery' element={<ReactQueryImage />} />
      <Route path='/unsplashImage' element={<UnsplashImage />} />
    </Routes>
      )
}

export default App
