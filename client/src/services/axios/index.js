import axios from 'axios';
import * as cookies from '../../utils/cookies';

const axiosToAPI = axios.create({
 timeout: 5000,
 headers: {'Authorization': `Bearer ${cookies.get('shokkothJWT')}`}
});

export default axiosToAPI;
