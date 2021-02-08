import { SwotService } from './../../services/swot/swot.service';
import { SwotItem } from './../../models/swot-model/swot-item';
import { environment } from './../../../environments/environment';
import { AppRoutingModule } from './../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';

import { UpdateItemComponent } from './update-item.component';
import { FormsModule } from '@angular/forms';

describe('UpdateItemComponent', () => {
  let component: UpdateItemComponent;
  let fixture: ComponentFixture<UpdateItemComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
         
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        FormsModule
        
       ],
        providers: [ HttpClientModule, AngularFireModule, AppRoutingModule, SwotService,
        {
          useClass: class {swotItem = jasmine.createSpy("swotItem")},
        }],
        
      declarations: [ UpdateItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
