import 'babel-polyfill';
import './style/main.css';

import { apps } from './config';
import { load } from './utils/loader';

load(apps);
