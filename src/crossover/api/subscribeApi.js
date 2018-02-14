import axios from 'axios';

export async function subscribe(email) {
  await axios.post('/subscribe', { email });
}
