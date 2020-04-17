import axios from 'axios';
import * as cookies from '../../utils/cookies';
import { TOKEN } from '../../constants/cookies';

const axiosToAPI = axios.create({
 timeout: 5000,
 headers: {'Authorization': `Bearer ${cookies.get(TOKEN)}`}
});

export default axiosToAPI;
