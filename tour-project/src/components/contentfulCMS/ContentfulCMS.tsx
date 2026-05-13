
import HeroImg from '../../assets/hero-image.svg';

import projects from './projects'

import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';

const ContentfulCMS = () => {
  return (
    <main>
      <section className="my-15 flex">
        <div className="mx-auto w-11/12 max-w-200 md:flex md:max-w-5xl gap-10 items-center">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl md:text-7xl">Contentful CMS</h1>
            <p className="my-8 text-gray-800 leading-loose max-w-150">
              Pitchfork schlitz tonx, coloring book celiac tousled succulents ascot affogato cardigan jianbing crucifix seitan. Synth man braid everyday carry try-hard pour-over keffiyeh slow-carb sriracha chillwave banjo gochujang kinfolk small batch mustache.
            </p>
          </div>
          <div>
            <img className="hidden md:block max-w-96" src={HeroImg} alt="" />
          </div>
        </div>
      </section>
      <section className="bg-gray-300/50 min-h-screen py-20 flex flex-col items-center">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl sm:text-3xl">Projects</h2>
          <div className="h-1 w-15 bg-blue-600"></div>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 items-center w-11/12 mt-15 gap-7'>
          {projects.map(project =>
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <NavLink to={project.path} className='flex flex-col items-center bg-white rounded cursor-pointer'>
                <img src={project.image} alt="" className='rounded-t' />
                <h3 className='text-sm py-4'>{project.title}</h3>
              </NavLink>
            </motion.div>
          )}

        </div>
      </section>
    </main>
  )
}

export default ContentfulCMS
