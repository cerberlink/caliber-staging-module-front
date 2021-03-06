
import { Associate } from './../associate-model/associate.model';
import { SwotItem } from './swot-item';
import { Manager } from '../manager-model/manager';

export class Swot {

    id: number;
    associate: Associate;
    manager: Manager;
    createdOn: Date;
    lastModified: Date; 
    description: string;

    analysisItems: SwotItem[];

    constructor(){

        
        // this.id = 1;
        // this.associateId = 10;
        // this.createdBy = 20;
        this.createdOn = new Date();
        this.lastModified = new Date();
        
    }


}
