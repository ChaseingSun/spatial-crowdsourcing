import { BaseEntity } from './../../shared';

export class Worker implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public location?: string,
        public capacity?: number,
    ) {
    }
}
