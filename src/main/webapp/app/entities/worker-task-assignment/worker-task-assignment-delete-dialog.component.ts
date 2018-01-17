import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WorkerTaskAssignment } from './worker-task-assignment.model';
import { WorkerTaskAssignmentPopupService } from './worker-task-assignment-popup.service';
import { WorkerTaskAssignmentService } from './worker-task-assignment.service';

@Component({
    selector: 'jhi-worker-task-assignment-delete-dialog',
    templateUrl: './worker-task-assignment-delete-dialog.component.html'
})
export class WorkerTaskAssignmentDeleteDialogComponent {

    workerTaskAssignment: WorkerTaskAssignment;

    constructor(
        private workerTaskAssignmentService: WorkerTaskAssignmentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.workerTaskAssignmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'workerTaskAssignmentListModification',
                content: 'Deleted an workerTaskAssignment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-worker-task-assignment-delete-popup',
    template: ''
})
export class WorkerTaskAssignmentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workerTaskAssignmentPopupService: WorkerTaskAssignmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.workerTaskAssignmentPopupService
                .open(WorkerTaskAssignmentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
