import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WorkerTaskAssignment } from './worker-task-assignment.model';
import { WorkerTaskAssignmentService } from './worker-task-assignment.service';

@Injectable()
export class WorkerTaskAssignmentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private workerTaskAssignmentService: WorkerTaskAssignmentService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.workerTaskAssignmentService.find(id).subscribe((workerTaskAssignment) => {
                    this.ngbModalRef = this.workerTaskAssignmentModalRef(component, workerTaskAssignment);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.workerTaskAssignmentModalRef(component, new WorkerTaskAssignment());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    workerTaskAssignmentModalRef(component: Component, workerTaskAssignment: WorkerTaskAssignment): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.workerTaskAssignment = workerTaskAssignment;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
