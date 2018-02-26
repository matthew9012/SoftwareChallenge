import { InjectionToken } from '@angular/core';

export const BASE_PATH = new InjectionToken('basePath');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};
export const API_URL = 'http://localhost:3000/api';
export const LCBO_API_BASE = 'http://localhost:3000/searchBooze/';


