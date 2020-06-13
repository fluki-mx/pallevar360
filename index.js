import React from 'react';

import { AppRegistry } from 'react-360';

import Catalog from './components/Catalog'; 
import CurrentMovie from './components/CurrentMovie'; 
import Controls from './components/Controls'; 

import * as Store from './utils/Store';
import seed from './utils/seed';

Store.initialize(seed);

AppRegistry.registerComponent('Catalog', () => Catalog);
AppRegistry.registerComponent('CurrentMovie', () => CurrentMovie);
AppRegistry.registerComponent('Controls', () => Controls);
