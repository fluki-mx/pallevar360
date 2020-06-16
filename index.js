/**
 * Contiene código React, registro los componentes que viven en la Plataforma
 **/

import { AppRegistry } from 'react-360';

import Catalog from './components/Catalog'; 
import CurrentMovie from './components/CurrentMovie'; 
import Controls from './components/Controls'; 

import * as Store from './utils/Store';
import seed from './utils/seed';

// Store del App (utils/Store.js)
Store.initialize(seed);

// Registro de los Componentes
AppRegistry.registerComponent('Catalog', () => Catalog);
AppRegistry.registerComponent('CurrentMovie', () => CurrentMovie);
AppRegistry.registerComponent('Controls', () => Controls);
