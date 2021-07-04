export const PATHS = {
    HOME: {route:'/', name:'home'},
    SCHEDULE: {route:'/schedule', name:'schedule'},
    DRIVERS: {route: '/drivers', name: 'drivers'}
}

export const getRoute= (pathname) => {
    if (pathname === PATHS.HOME.route) return PATHS.HOME.name
    else return pathname.substr(1)
}