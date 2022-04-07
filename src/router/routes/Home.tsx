import React, { lazy } from 'react'

const HomeView = lazy(() => import('../../views/Home/Home.view'))

export const renderHomeRoute = () => <HomeView />
