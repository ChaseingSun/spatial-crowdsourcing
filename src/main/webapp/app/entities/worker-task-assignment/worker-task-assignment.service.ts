import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { WorkerTaskAssignment } from './worker-task-assignment.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class WorkerTaskAssignmentService {

    private resourceUrl = SERVER_API_URL + 'api/worker-task-assignments';

    constructor(private http: Http) { }

    create(workerTaskAssignment: WorkerTaskAssignment): Observable<WorkerTaskAssignment> {
        const copy = this.convert(workerTaskAssignment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(workerTaskAssignment: WorkerTaskAssignment): Observable<WorkerTaskAssignment> {
        const copy = this.convert(workerTaskAssignment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<WorkerTaskAssignment> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to WorkerTaskAssignment.
     */
    private convertItemFromServer(json: any): WorkerTaskAssignment {
        const entity: WorkerTaskAssignment = Object.assign(new WorkerTaskAssignment(), json);
        return entity;
    }

    /**
     * Convert a WorkerTaskAssignment to a JSON which can be sent to the server.
     */
    private convert(workerTaskAssignment: WorkerTaskAssignment): WorkerTaskAssignment {
        const copy: WorkerTaskAssignment = Object.assign({}, workerTaskAssignment);
        return copy;
    }
}
