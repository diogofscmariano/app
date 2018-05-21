import 'babel-polyfill';
import './style/main.css';

import { apps } from './config';
import { load } from './utils/loader';
import { eventRegistry } from 'app-mediator';

document.querySelector('button').addEventListener('click', () => {
  eventRegistry.dispatch('some-event');
});

load(apps);
