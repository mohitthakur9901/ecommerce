import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { toggleTheme } from '../store/theme.js'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link, useNavigate  } from 'react-router-dom';
import { signoutSuccess } from '../store/auth.js';
import { CiShoppingCart } from "react-icons/ci";

const Header = () => {
  
  const {currentUser} = useSelector(state => state.user)
  const path = useLocation().pathname;
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state.theme)
  const navigate = useNavigate();
// console.log(currentUser);

  const handleSignout = async () =>  {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/signin')
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Shopify</span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-5">
      <Button
          className='w-12 h-12 sm:inline text-2xl'
          color='gray'
          pill
          onClick={() => navigate('/cart')}
        >
          <CiShoppingCart/>
        </Button>
        <Button
          className='w-12 h-12 sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link><Link to={'/dashboard'}>
              <Dropdown.Item>dashboard</Dropdown.Item>
            </Link>

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/signin'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link >
          <Navbar.Link active={path === '/mens'} as={'div'}>
            <Link to='/mens'>Men</Link>
          </Navbar.Link>
        </Navbar.Link>
        <Navbar.Link >
          <Navbar.Link active={path === '/womens'} as={'div'}>
            <Link to='/womens'>Women</Link>
          </Navbar.Link>
        </Navbar.Link>
        <Navbar.Link >
          <Navbar.Link active={path === '/kids'} as={'div'}>
            <Link to='/kids'>Kids</Link>
          </Navbar.Link>
        </Navbar.Link>
        <Navbar.Link >
          <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to='/about'>About</Link>
          </Navbar.Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header