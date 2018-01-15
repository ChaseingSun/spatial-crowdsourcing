import { BaseEntity } from './../../shared';

export class Task implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public source?: string,
        public destination?: string,
        public fromLattitude?: string,
        public fromLongitude?: string,
        public toLattitude?: string,
        public toLongitude?: string,
        public distance?: number,
    ) {
    }
}
