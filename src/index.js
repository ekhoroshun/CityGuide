import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'moment-timezone';
import steem from 'steem';

import axios from 'axios';
import reducers from './reducers';

// Styling
import './sass/bootstrap.scss';
import './sass/App.scss';
import './sass/field.scss';

import 'react-select/dist/react-select.css'
import 'react-virtualized-select/styles.css'


// Components
import Bootstrap from './Bootstrap';
import Home from './components/Home';
import CityProfile from './components/CityProfile'
import News from './components/News'
import Photos from './components/Photos'

ReactDOM.render((
    <Provider store={reducers}>
        <Router>
            <Switch>

            	<Bootstrap>
                	
                         <Route exact path = "/" component={Home} />
                         <Route exact path ="/:cityName" component={CityProfile} />
                         <Route exact path = "/:cityName/news" component= {News} />
                         <Route exact path = "/:cityName/photos" component= {Photos} />

                </Bootstrap> 

            </Switch>
        </Router>
    </Provider> 
), document.getElementById('root'));