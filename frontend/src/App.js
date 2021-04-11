import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PrivateRoute from './pages/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import FinalPage from './pages/FinalPage';
import Check from './pages/Check';
import Token from './pages/Token';
import Parcel from './pages/Parcel';

if(localStorage.token){
    setAuthToken(localStorage.token);
}

const customTheme = createMuiTheme({
    typography: {
     "fontFamily": `"Noto Sans", "Roboto", "Arial", sans-serif`,
     "fontSize": 14,
     "fontWeightRegular": 400,
     "fontWeightBold":700,
    },
});

function App() {
    
    React.useEffect(()=>{
        store.dispatch(loadUser());
    },[]);

    return (
        <ThemeProvider theme={customTheme}>
        <Provider store={store}>
            <BrowserRouter>
                <section>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/check" component={Check}/>
                        <Route exact path="/token" component={Token}/>
                        <Route exact path="/takeaway" component={Parcel}/>
                        <PrivateRoute exact path="/restaurant" component={Restaurant}/>
                        <PrivateRoute exact path="/Checkout" component={FinalPage}/>
                    </Switch>
                </section>
            </BrowserRouter>
        </Provider>
        </ThemeProvider>
    );
}

export default App;
