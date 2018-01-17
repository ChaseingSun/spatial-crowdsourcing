/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SpacialcrowdsourcingTestModule } from '../../../test.module';
import { WorkerTaskAssignmentDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/worker-task-assignment/worker-task-assignment-delete-dialog.component';
import { WorkerTaskAssignmentService } from '../../../../../../main/webapp/app/entities/worker-task-assignment/worker-task-assignment.service';

describe('Component Tests', () => {

    describe('WorkerTaskAssignment Management Delete Component', () => {
        let comp: WorkerTaskAssignmentDeleteDialogComponent;
        let fixture: ComponentFixture<WorkerTaskAssignmentDeleteDialogComponent>;
        let service: WorkerTaskAssignmentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpacialcrowdsourcingTestModule],
                declarations: [WorkerTaskAssignmentDeleteDialogComponent],
                providers: [
                    WorkerTaskAssignmentService
                ]
            })
            .overrideTemplate(WorkerTaskAssignmentDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkerTaskAssignmentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkerTaskAssignmentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
