import React, { Component, Suspense, useCallback, useState, useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
// import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import UserContext, { USER_CONSUMER, USER_PRODUCER } from '../../contexts/UserContext';

// const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const ConsumerHistory = React.lazy(() => import('../../views/Pages/Consumer/history'));
const ConsumerDashboard = React.lazy(() => import('../../views/Pages/Consumer/dashboard'));
const ProducerPreferences = React.lazy(() => import('../../views/Pages/Producer/preferences'));
const ProducerFeelGood = React.lazy(() => import('../../views/Pages/Producer/feelGood'));
const ProducerDashboard = React.lazy(() => import('../../views/Pages/Producer/dashboard'));

const Loading = () =>  <div className="animated fadeIn pt-1 text-center">Loading...</div>;

const DefaultLayout = (props) => {

  const signOut = useCallback((e) => {
    e.preventDefault()
    props.history.push('/login')
  }, [props.history]);

  const { viewType, setValue } = useContext(UserContext);

  // Automatically set view type based on location
  useEffect(() => {
    if (props.location.pathname.indexOf('consumer') !== -1 && viewType !== USER_CONSUMER) {
      setValue('viewType', USER_CONSUMER);
    } else if (props.location.pathname.indexOf('producer') !== -1 && viewType !== USER_PRODUCER) {
      setValue('viewType', USER_PRODUCER);
    }
  }, [props.location.pathname, viewType, setValue]);

  const consumerNavItems = {
    items: [
      {
        title: true,
        name: 'Consumer',
      },
      {
        name: 'Dashboard',
        url: '/consumer',
        icon: 'icon-home',
        exact: true,
      },
      {
        name: 'History',
        url: '/consumer/history',
        icon: 'icon-clock',
      },
      {
        name: 'Producer View',
        url: '/producer',
        icon: 'icon-energy',
        class: 'mt-auto',
        variant: 'info',
      },
    ],
  };
  
  const producerNavItems = {
    items: [
      {
        title: true,
        name: 'Producer',
      },
      {
        name: 'Dashboard',
        url: '/producer',
        icon: 'icon-home',
        exact: true,
      },
      {
        name: 'Preferences',
        url: '/producer/preferences',
        icon: 'icon-wrench',
      },
      {
        name: 'Personal report',
        url: '/producer/feel-good',
        icon: 'icon-heart',
      },
      {
        name: 'Consumer View',
        url: '/consumer',
        icon: 'icon-energy',
        class: 'mt-auto',
        variant: 'info',
      },
    ],
  };

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={<Loading />}>
        <DefaultHeader onLogout={signOut}/>
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav
              navConfig={viewType === USER_CONSUMER ? consumerNavItems : producerNavItems}
              {...props}
              router={router}
            />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <AppBreadcrumb appRoutes={routes} router={router}/>
          <Container fluid>
            <Suspense fallback={<Loading />}>
              <Switch>

                <Route exact path="/consumer/history" name="ConsumerHistory" render={props => <ConsumerHistory {...props}/>} />
                <Route exact path="/consumer" name="Consumer Dashboard" render={props => <ConsumerDashboard {...props}/>} />
                
                <Route exact path="/producer/preferences" name="Producer Preferences" render={props => <ProducerPreferences {...props}/>} />
                <Route exact path="/producer/feel-good" name="Producer Feel-Good" render={props => <ProducerFeelGood {...props}/>} />
                <Route exact path="/producer" name="Producer Dashboard" render={props => <ProducerDashboard {...props}/>} />


                {/* {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null);
                })} */}

                {/* Todo: if not logged in, redirect to LOG IN */}

                {/* <Redirect from="/" to="/landing" /> */}

              </Switch>
            </Suspense>
          </Container>
        </main>
        {/* <AppAside fixed>
          <Suspense fallback={<Loading />}>
            <DefaultAside />
          </Suspense>
        </AppAside> */}
      </div>
      <AppFooter>
          <Suspense fallback={<Loading />}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
}

export default DefaultLayout;
