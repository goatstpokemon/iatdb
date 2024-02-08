import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Container from './ui/container'
const Header = () => {
  return (
    <header className='sm:flex sm:justify-between py-3 px-4 shadow-sm w-full'>
      <Container>
      <NavigationMenu className="max-w-7xl justify-between">
      <NavigationMenuList>
          <NavigationMenuItem className='px-4'>
              <NavigationMenuLink href='/'>Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className='px-4'>
              <NavigationMenuLink href='/producten'>Producten</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className='px-4'>
              <NavigationMenuLink href='/'>Producten</NavigationMenuLink>
          </NavigationMenuItem>
      </NavigationMenuList>
      </NavigationMenu>

      </Container>
    </header>
  )
}

export default Header