/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { SpacialcrowdsourcingTestModule } from '../../../test.module';
import { WorkerTaskAssignmentDetailComponent } from '../../../../../../main/webapp/app/entities/worker-task-assignment/worker-task-assignment-detail.component';
import { WorkerTaskAssignmentService } from '../../../../../../main/webapp/app/entities/worker-task-assignment/worker-task-assignment.service';
import { WorkerTaskAssignment } from '../../../../../../main/webapp/app/entities/worker-task-assignment/worker-task-assignment.model';

describe('Component Tests', () => {

    describe('WorkerTaskAssignment Management Detail Component', () => {
        let comp: WorkerTaskAssignmentDetailComponent;
        let fixture: ComponentFixture<WorkerTaskAssignmentDetailComponent>;
        let service: WorkerTaskAssignmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpacialcrowdsourcingTestModule],
                declarations: [WorkerTaskAssignmentDetailComponent],
                providers: [
                    WorkerTaskAssignmentService
                ]
            })
            .overrideTemplate(WorkerTaskAssignmentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkerTaskAssignmentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkerTaskAssignmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new WorkerTaskAssignment(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.workerTaskAssignment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
