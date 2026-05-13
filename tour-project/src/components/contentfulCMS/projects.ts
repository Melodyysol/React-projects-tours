import heroImg from '../../assets/item-1.jpeg'

type Project = {
  id: number;
  title: string;
  image: string;
  path: string;
}

const projects: Project[] = [{
  id: 1,
  title: 'Tour',
  image: heroImg,
  path: '/tour',
},{
  id: 2,
  title: 'Reviews',
  image: heroImg,
  path: '/review',
}, {
  id: 3,
  title: 'Cart Reducer',
  image: heroImg,
  path: '/cart-reducer',
}, {
  id: 4,
  title: 'Cart',
  image: heroImg,
  path: '/cart',
},{
  id: 5,
  title: 'Color Generator',
  image: heroImg,
  path: '/colorGenerator',
}, {
  id: 6,
  title: 'Grocery Bud',
  image: heroImg,
  path: '/groceryBud',
}, {
  id: 7,
  title: 'Lorems',
  image: heroImg,
  path: '/lore',
}, {
  id: 8,
  title: 'Menu',
  image: heroImg,
  path: '/menu',
},{
  id: 9,
  title: 'Context',
  image: heroImg,
  path: '/context',
}, {
  id: 10,
  title: 'NavBar',
  image: heroImg,
  path: '/navBsr',
}, {
  id: 11,
  title: 'Strapi Submenus',
  image: heroImg,
  path: '/strapi',
}, {
  id: 12,
  title: 'Questions',
  image: heroImg,
  path: '/question',
}, {
  id: 13,
  title: 'Slider',
  image: heroImg,
  path: '/slider',
}, {
  id: 14,
  title: 'Tour',
  image: heroImg,
  path: '/tour',
}, {
  id: 15,
  title: 'Tour',
  image: heroImg,
  path: '/tours',
}, {
  id: 16,
  title: 'Tour',
  image: heroImg,
  path: '/tourPage',
}, {
  id: 17,
  title: 'Images',
  image: heroImg,
  path: '/ImageQuery',
}, {
  id: 18,
  title: 'Unsplash Image',
  image: heroImg,
  path: '/unsplashImage',
}]

export default projects