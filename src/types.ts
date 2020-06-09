export interface Ruuvitag {
  _id: string
  dataFormat: number
  rssi: number
  temperature: number
  humidity: number
  pressure: number
  accelerationX: number
  accelerationY: number
  accelerationZ: number
  battery: number
  txPower: number
  movementCounter: number
  measurementSequenceNumber: number
  mac: string
  id: string
  timestamp: number
  name: string
}
