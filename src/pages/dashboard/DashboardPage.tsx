import React, {useEffect, useState} from 'react';
import "./DashboardPage.scss";
import { useLocation, useNavigate } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Person2Icon from '@mui/icons-material/Person2';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';

import { useQueryClient } from '@tanstack/react-query'

// ICONS
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import LogoutIcon from '@mui/icons-material/Logout';

import useMediaQuery from '@mui/material/useMediaQuery';
import { Routes } from '../../routerConfig/routes';
import useAuth from '../../hooks/authHook';
import useLoading from '../../hooks/useLoading';

interface NavLink {
  label : string,
  icon : JSX.Element,
  link : string,
}

interface DashboardProps {
  children ?: React.ReactNode;
}

const DashboardPage = React.memo(({children}: DashboardProps) => {

  const [headerTitle, setHeaderTitle] = useState<string>("");
  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerWidth, setDrawerWidth] = useState('180');
  const location = useLocation();
  const navigate = useNavigate();
  const {logout} = useAuth();
  const {LoadingElem, setIsLoading} = useLoading();

  const queryClient = useQueryClient();

  useEffect(()=>{
    if (isMobile){
      setDrawerWidth('100%');
    } else {
      
      setDrawerWidth('180');
    }
  }, [isMobile]);

  useEffect(()=>{

    switch(location.pathname){
      case Routes.MY_TASKS : {
        setHeaderTitle("I tuoi task");
        break;
      }
      case Routes.SHARED_TASKS: {
        setHeaderTitle("Task condivisi con te");
        break;
      }
      case Routes.CHECKED_TASKS: {
        setHeaderTitle("Task completati");
        break;
      }
      case Routes.PROFILE: {
        setHeaderTitle("Profilo");
        break;
      }
      default : {
        setHeaderTitle("TeamFlow");
      }
    }

  }, [location.pathname]);
  
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

  }));
  
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const NavItems : NavLink[] = [
    {
      label:"I tuoi task",
      icon : <StickyNote2Icon/>,
      link : Routes.MY_TASKS
    },
    {
      label:"Task condivisi",
      icon : <CoPresentIcon/>,
      link : Routes.SHARED_TASKS
    },
    {
      label:"Task completati",
      icon : <AssignmentTurnedInRoundedIcon/>,
      link : Routes.CHECKED_TASKS
    },
    {
      label:"Profilo",
      icon : <Person2Icon/>,
      link : Routes.PROFILE
    },
  ];

  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const callLogout = async () =>{

    setIsLoading(true);    
    let loggedOut = await logout();
    setIsLoading(false);

    if (loggedOut){
      queryClient.clear();
    }

  }

  return (
    <>
      {LoadingElem}
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  mr: 2,
                },
                /* open && { display: 'none' }, */
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {headerTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            /* width: drawerWidth, */
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Typography 
              variant="h6" component="div"
              className="menu-title"
              style={{
                padding: theme.spacing(0, 1)
              }}
            >
              Menu
            </Typography>

            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            
          </DrawerHeader>
          <Divider />
          <List>
            {NavItems.map((item, index) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={()=>{
                    navigate(item.link);
                    setOpen(false);
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem key="logout" disablePadding>
              <ListItemButton
                onClick={()=>{
                  callLogout();
                  setOpen(false);
                }}
              >
                <ListItemIcon>
                  <LogoutIcon style={{color:theme.palette.error.light}}/>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {children ?? <></>}
        </Main>
      </Box>
      
    </>
  );
})

export default DashboardPage;