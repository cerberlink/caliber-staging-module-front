import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Associate } from 'src/app/models/associate-model/associate.model';
import { AssociateService } from 'src/app/services/associate/associate.service';

import { ViewAssociateComponent } from './view-associate.component';

describe('ViewAssociateComponent', () => {
  let mockedJob = [
    {
      batch: 1,
      email: "testemail@email.com",
      firstName: "test",
      id: 1,
      lastName: "associate",
      manager: 2,
      salesforceId: "1A",
      status: "PROJECT"
    }]

    let mockedAssociate = new Associate(1,
      '1',
      "hey",
      "test",
      "user",
      1,
      1,
      "project");
  

  //Mocking the jobServ 
  let MockService = {
    getAllAssociates: <Observable>() => {
      return of(mockedJob);
    },
    open() {}
  }

  let component: ViewAssociateComponent;
  let fixture: ComponentFixture<ViewAssociateComponent>;
  let router: Router;
  let associateServ: AssociateService;
  let mockClient: {get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy};;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), ReactiveFormsModule, FormsModule ],
      providers: [{provide: AssociateService, useValue: MockService}, 
                  {provide: HttpClient, useValue: mockClient}],
      declarations: [ ViewAssociateComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ViewAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    associateServ = TestBed.inject(AssociateService);
    mockClient = TestBed.get(HttpClient);
  });

  it('should create', () => {
    spyOn(MockService, 'getAllAssociates').and.returnValue(of(mockedJob));
    expect(component).toBeTruthy();
  });

  it('should call the updateBatch() method', waitForAsync(()=>{
    component.associates = [mockedAssociate];
    fixture.detectChanges();
    let updateBatchBttn = fixture.debugElement.query(By.css('.rev-btn')).nativeElement;
    spyOn(component, 'updateBatch').withArgs();
    updateBatchBttn.click();
    fixture.detectChanges();
    
    fixture.whenStable().then(()=>{
      expect(component.updateBatch).toHaveBeenCalled();
    });
  }));
});
