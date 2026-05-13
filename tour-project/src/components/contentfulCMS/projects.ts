import img2 from '../../assets/images/img2.png'
import img3 from '../../assets/images/img3.png'
import img4 from '../../assets/images/img4.png'
import img5 from '../../assets/images/img5.png'
import img6 from '../../assets/images/img6.png'
import img7 from '../../assets/images/img7.png'
import img8 from '../../assets/images/img8.png'
import img9 from '../../assets/images/img9.png'
import img10 from '../../assets/images/img10.png'
import img11 from '../../assets/images/img11.png'
import img12 from '../../assets/images/img12.png'
import img13 from '../../assets/images/img13.png'
import img14 from '../../assets/images/img14.png'
import img15 from '../../assets/images/img15.png'
// import img16 from '../../assets/images/img16.png'
// import img17 from '../../assets/images/img17.png'
// import img18 from '../../assets/images/img18.png'


type Project = {
  id: number;
  title: string;
  image: string;
  path: string;
}

const projects: Project[] = [{
  id: 1,
  title: 'Tours',
  image: img2,
  path: '/tours',
}, {
  id: 2,
  title: 'Reviews',
  image: img3,
  path: '/reviews',
}, {
  id: 3,
  title: 'Accordition',
  image: img4,
  path: '/accordition',
},{
  id: 4,
  title: 'Menu',
  image: img5,
  path: '/menu',
}, {
  id: 5,
  title: 'Tabs',
  image: img6,
  path: '/tabs',
}, {
  id: 6,
  title: 'Slider',
  image: img7,
  path: '/slider',
}, {
  id: 7 ,
  title: 'Lorem Ipsum',
  image: img8,
  path: '/lorem',
},{
  id: 8,
  title: 'Color Generator',
  image: img9,
  path: '/colorGenerator',
}, {
  id: 9,
  title: 'Grocery Bud',
  image: img10,
  path: '/groceryBud',
}, {
  id: 10,
  title: 'Navbar',
  image: img11,
  path: '/navBar',
}, {
  id: 11,
  title: 'Sidebar and Modal',
  image: img12,
  path: '/context',
}, {
  id: 12,
  title: 'Strapi Menu',
  image: img13,
  path: '/strapi',
}, {
  id: 13,
  title: 'Cart',
  image: img14,
  path: '/cart',
}, {
  id: 14,
  title: 'Unsplash Image',
  image: img15,
  path: '/unsplashImage',
}]

export default projects