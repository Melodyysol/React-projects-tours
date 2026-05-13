import Person1 from '../../assets/person-1.jpeg'
import Person2 from '../../assets/person-2.jpeg'
import Person3 from '../../assets/person-4.jpeg'
import Person4 from '../../assets/person-3.jpeg';

type Review = {
  id: number;
  image: string;
  name: string;
  title: string;
  description: string;
}

export const personsArray: Review[] = [{
  id: 1,
  image: Person1,
  name: 'Susan Smith',
  title: 'WEB DEVELOPER',
  description: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry"
}, {
  id: 2,
  image: Person2,
  name: 'anna johnson',
  title: 'WEB DEVELOPER',
  description: "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal."
}, {
  id: 3,
  image: Person3,
  name: 'peter jones',
  title: 'Intern',
  description: "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag."
}, {
  id: 4,
  image: Person4,
  name: 'bill anderson',
  title: 'The Boss',
  description: "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic."
},
]