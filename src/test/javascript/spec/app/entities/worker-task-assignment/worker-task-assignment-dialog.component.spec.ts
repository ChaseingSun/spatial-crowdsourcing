/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SpacialcrowdsourcingTestModule } from '../../../test.module';
import { WorkerTaskAssignmentDialogComponent } from '../../../../../../main/webapp/app/entities/worker-task-assignment/worker-task-assignment-dialog.component';
import { WorkerTaskAssignmentService } from '../../../../../../main/webapp/app/entities/worker-task-assignment/worker-task-assignment.service';
import { WorkerTaskAssignment } from '../../../../../../main/webapp/app/entities/worker-task-assignment/worker-task-assignment.model';

describe('Component Tests', () => {

    describe('WorkerTaskAssignment Management Dialog Component', () => {
        let comp: WorkerTaskAssignmentDialogComponent;
        let fixture: ComponentFixture<WorkerTaskAssignmentDialogComponent>;
        let service: WorkerTaskAssignmentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpacialcrowdsourcingTestModule],
                declarations: [WorkerTaskAssignmentDialogComponent],
                providers: [
                    WorkerTaskAssignmentService
                ]
            })
            .overrideTemplate(WorkerTaskAssignmentDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkerTaskAssignmentDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkerTaskAssignmentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WorkerTaskAssignment(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.workerTaskAssignment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'workerTaskAssignmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WorkerTaskAssignment();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.workerTaskAssignment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'workerTaskAssignmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
