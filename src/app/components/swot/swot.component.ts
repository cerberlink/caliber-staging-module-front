import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './../../services/login-service/login.service';
import { SwotItem } from './../../models/swot-model/swot-item';
import { Swot } from './../../models/swot-model/swot';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { SwotService } from 'src/app/services/swot/swot.service';
import { idTokenResult } from '@angular/fire/auth-guard';
import { Associate } from 'src/app/models/associate-model/associate.model';
import { Manager } from 'src/app/models/manager-model/manager';
// import { ToastrService } from 'ngx-toastr';
// import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-swot',
  templateUrl: './swot.component.html',
  styleUrls: ['./swot.component.css'],
})
export class SwotComponent implements OnInit {
  myImage: string = 'assets/img/swot1.png';
  swotAnalysis = new Swot();
  name : string;
  type : string = "";
  note: string = "";
  associateId : number;
  description: string;
  i : number = 0;
  hasData : boolean = false;
  @Input() passedId: number;
  //analysisItems: Array<SwotItems>;

  //initililizes empty array of swot items
  analysisItems: SwotItem[] = [];

  constructor(
    private swotService: SwotService,
    private loginService: LoginService,
    private modalService: NgbModal
  ) // private toastr: NotificationService
  {}
  ngOnInit(): void {
    this.associateId = this.passedId;
  }

  //collects data from form and creates item array in the user's view (PUSH METHOD)
  onSubmit(signInForm: NgForm){
   let item : SwotItem = new SwotItem(0, this.name, this.type, this.note, this.associateId);
   this.analysisItems.push(item);
   console.log(this.analysisItems);
    //  this.swotService.addSwot(this.swotAnalysis)
    //    .subscribe(data => {
    //      console.log(data);
    //    });
    this.hasData = true;
  }

  //deletes the item from the item array in the user's view on delete click(FILTER METHOD)
  delete(item: SwotItem): void {
    this.analysisItems = this.analysisItems.filter(
      (swotItem) => swotItem !== item
    ); // this is so the component maintains its own

    if (this.analysisItems.length == 0) {
      this.hasData = false;
    }
  }

  addSwot(): void{
    this.swotAnalysis.analysisItems = this.analysisItems;
    this.swotAnalysis.associate = new Associate(this.associateId); //associate model constructor needs to be adjusted
    this.swotAnalysis.description = this.description;
    console.log(this.analysisItems)
    console.log(this.swotAnalysis)
    this.swotAnalysis.manager = new Manager(Number(sessionStorage.getItem('managerId')));
     this.swotService.addSwot(this.swotAnalysis)
       .subscribe(data => {
         alert(`${data.message}`);
       });
    this.modalService.dismissAll();
  }
}
