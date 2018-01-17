import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WorkerTaskAssignment } from './worker-task-assignment.model';
import { WorkerTaskAssignmentPopupService } from './worker-task-assignment-popup.service';
import { WorkerTaskAssignmentService } from './worker-task-assignment.service';

@Component({
    selector: 'jhi-worker-task-assignment-dialog',
    templateUrl: './worker-task-assignment-dialog.component.html'
})
export class WorkerTaskAssignmentDialogComponent implements OnInit {

    workerTaskAssignment: WorkerTaskAssignment;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private workerTaskAssignmentService: WorkerTaskAssignmentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.workerTaskAssignment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.workerTaskAssignmentService.update(this.workerTaskAssignment));
        } else {
            this.subscribeToSaveResponse(
                this.workerTaskAssignmentService.create(this.workerTaskAssignment));
        }
    }

    private subscribeToSaveResponse(result: Observable<WorkerTaskAssignment>) {
        result.subscribe((res: WorkerTaskAssignment) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: WorkerTaskAssignment) {
        this.eventManager.broadcast({ name: 'workerTaskAssignmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-worker-task-assignment-popup',
    template: ''
})
export class WorkerTaskAssignmentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workerTaskAssignmentPopupService: WorkerTaskAssignmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.workerTaskAssignmentPopupService
                    .open(WorkerTaskAssignmentDialogComponent as Component, params['id']);
            } else {
                this.workerTaskAssignmentPopupService
                    .open(WorkerTaskAssignmentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
