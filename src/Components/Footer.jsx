import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-indigo-400 dark:bg-gray-800   py-4 text-white  ">
        <div className="container  md:flex mx-auto text-sm md:text-lg text-white font-normal md:justify-between text-center  ">
          <div>
            <span className="text-sm sm:text-center  ">
               Pratyush Mahapatra
            </span>
          </div>
          <div className="flex">
            <ul className="flex flex-wrap items-center mx-auto gap-3 text-sm mt-3 sm:mt-0">
              <li className="hover:underline">
                <a
                  href="https://github.com/pranikz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
  )
}

export default Footer