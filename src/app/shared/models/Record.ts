import { Fields } from './Fields';
import { Geometry } from './Geometry';

export interface Record {
    
    datasetid: string;
    recordid: string;
    fields: Fields;
    geometry: Geometry;
    record_timestamp: string;
}
