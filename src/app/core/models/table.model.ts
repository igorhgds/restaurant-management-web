export type TableStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'OUT_OF_SERVICE';
export type TableLocation = 'INDOOR' | 'OUTDOOR' | 'BALCONY' | 'VIP';

export interface Table {
  id: string;
  number: number;
  status: TableStatus;
  location: TableLocation;
  capacity: number;
}
