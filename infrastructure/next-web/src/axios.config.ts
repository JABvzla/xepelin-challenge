require('dotenv').config({ path: '../../.env' });
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL,
axios.defaults.headers.post['Content-Type'] = 'application/json';

