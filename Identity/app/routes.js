import App from './components/App.Component';

function errorLoading(error) {
    throw new Error(`Page loading faled: ${error}`);
}

function loadRoute(cb) {
    return module => cb(null, module.default);
}

export default (store) => {
    function requireAuth(nextState, replace) {
        if (!store.getState().auth.isAuthenticated) {
            replace({
                pathname: '/login',
                state: {
                    nextPathname: nextState.location.pathname,
                },
            });
        }
    }

    return { 
        path: '/',
        component: App,
        childRoutes: [
            {
                path: 'signup',
                getComponent(location, cb) {
                    System.import('./components/auth/signup/Signup.Container.jsx')
                        .then(loadRoute(cb))
                        .catch(errorLoading);
                },
            },

            {
                path: 'login',
                getComponent(location, cb) {
                    System.import('./components/auth/login/Login.Container.jsx')
                        .then(loadRoute(cb))
                        .catch(errorLoading);
                },
            },

            {
                path: 'details',
                onEnter: requireAuth,
                getComponent(location, cb) {
                    require.ensure(['./components/users/details/Details.Container.jsx', function (require) {
                        callback(null, require('./components/users/details/Details.Container.jsx').default)
                    }])
                }
            }
        ]
    };
}