/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { SpacialcrowdsourcingTestModule } from '../../../test.module';
import { WorkerTaskAssignmentComponent } from '../../../../../../main/webapp/app/entities/worker-task-assignment/worker-task-assignment.component';
import { WorkerTaskAssignmentService } from '../../../../../../main/webapp/app/entities/worker-task-assignment/worker-task-assignment.service';
import { WorkerTaskAssignment } from '../../../../../../main/webapp/app/entities/worker-task-assignment/worker-task-assignment.model';

describe('Component Tests', () => {

    describe('WorkerTaskAssignment Management Component', () => {
        let comp: WorkerTaskAssignmentComponent;
        let fixture: ComponentFixture<WorkerTaskAssignmentComponent>;
        let service: WorkerTaskAssignmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpacialcrowdsourcingTestModule],
                declarations: [WorkerTaskAssignmentComponent],
                providers: [
                    WorkerTaskAssignmentService
                ]
            })
            .overrideTemplate(WorkerTaskAssignmentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkerTaskAssignmentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkerTaskAssignmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new WorkerTaskAssignment(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.workerTaskAssignments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
