import axios from 'axios'
const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://raspberrypi:3100//ruuvitag'
    : 'http://192.168.10.38:3100/ruuvitag'

export async function tags(): Promise<any> {
  return await axios.get(`${API_URL}/tags`).then((res) => res.data)
}
