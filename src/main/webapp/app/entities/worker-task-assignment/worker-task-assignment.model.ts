import { BaseEntity } from './../../shared';

export class WorkerTaskAssignment implements BaseEntity {
    constructor(
        public id?: number,
        public worker?: string,
        public task?: string,
    ) {
    }
}
