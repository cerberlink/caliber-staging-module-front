import { AppRoutingModule } from './../../app-routing.module';
import { environment } from './../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { of } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { SwotService } from './swot.service';

const dummyData = {
  id: 5, 
  name: "JUnit", 
  type: "Strength", 
  note: "This associate really knows JUnit",
  swotAnalysisId: 5
}

describe('SwotService', () => {
  let service: SwotService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        HttpClientTestingModule
       ],
        providers: [ HttpClientModule, AngularFireModule, AppRoutingModule, SwotService],
    });
    service = TestBed.inject(SwotService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Needs a valid id number
  //1 is a placeholder
  it('getswot', ()=>{
    expect(service.getSwotByAssociatedId(1)).toBeTruthy;
  })

  it('addSwotItem posts data and returns the posted data as a response', ()=>{
    service.addItem(dummyData).subscribe((res) => {
      expect(res.toString()).toEqual(dummyData.toString());
    })

    const req = httpMock.expectOne((`${environment.BASE_URL}swot/item/new`));
    expect(req.request.method).toBe('POST');
    req.flush(dummyData);
  })

  //This test needs checking. I do not understand spyon mock test much.
  // let test:string = "testing";
  // let spy:any = spyOn(service, 'addSwot').and.returnValue(of(test));
  // it("addSwot", () => {
  //   expect(spy).toBe("testing");
  // })

});
