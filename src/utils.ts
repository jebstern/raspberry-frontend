import { format } from 'date-fns'


export const timestamp = (timestamp: number) =>
  format(new Date(timestamp), 'dd.MM.yyyy H:mm:ss')
