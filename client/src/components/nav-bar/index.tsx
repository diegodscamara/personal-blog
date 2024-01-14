import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

import { Button } from '../ui/button'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ModeToggle } from '../mode-toggle'
import React from 'react'

export function NavBar() {
  return (
    <nav className="flex items-center justify-between py-4 px-8">
      <h1 className="text-lg md:text-xl text-left break-words font-heading font-semibold leading-snug md:font-bold dark:text-white">
        <Link to="/">Personal Blog</Link>
      </h1>

      <div className="flex items-center gap-4">
        <ModeToggle />

        <NavigationMenu>
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" size="icon" title="Sign in options">
                    <ChevronDown size={32} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="p-2 flex flex-col gap-2 max-w-calc"
                >
                  <DropdownMenuLabel>Ready to get started?</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className='font-normal text-slate-400'>
                    Don&apos;t miss my next articles, sign in with your account.
                  </DropdownMenuLabel>

                  <DropdownMenuItem>
                    <NavigationMenuLink href="/login">Login</NavigationMenuLink>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <NavigationMenuLink href="/signup">
                      Signup
                    </NavigationMenuLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
