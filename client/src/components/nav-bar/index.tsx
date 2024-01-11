import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

import { Link } from 'react-router-dom'
import { ModeToggle } from '../mode-toggle'
import React from 'react'

export function NavBar() {
  return (
    <nav className="flex items-center justify-between py-4 px-8">
      <h1 className="text-lg md:text-xl text-left break-words font-heading font-semibold leading-snug md:font-bold dark:text-white">
        <Link to="/">Personal Blog</Link>
      </h1>

      <div className="flex items-center gap-12">
        <NavigationMenu>
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <NavigationMenuLink
                className=" block rounded-lg px-2 py-1 ring-offset-2 transition-colors duration-150 group-focus:ring text-slate-900 hover:bg-slate-100 group-focus:ring-blue-600 group-focus:ring-offset-white dark:text-white dark:hover:bg-slate-800 dark:group-focus:ring-offset-slate-800 font-semibold text-opacity-100 dark:text-opacity-100"
                href="/"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className='block rounded-lg px-2 py-1 ring-offset-2 transition-colors duration-150 group-focus:ring text-slate-900 hover:bg-slate-100 group-focus:ring-blue-600 group-focus:ring-offset-white dark:text-white dark:hover:bg-slate-800 dark:group-focus:ring-offset-slate-800 font-semibold text-opacity-100 dark:text-opacity-100"'
                href="/loginn"
              >
                Login
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className='block rounded-lg px-2 py-1 ring-offset-2 transition-colors duration-150 group-focus:ring text-slate-900 hover:bg-slate-100 group-focus:ring-blue-600 group-focus:ring-offset-white dark:text-white dark:hover:bg-slate-800 dark:group-focus:ring-offset-slate-800 font-semibold text-opacity-100 dark:text-opacity-100"'
                href="/signup"
              >
                Signup
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
      </div>
    </nav>
  )
}
