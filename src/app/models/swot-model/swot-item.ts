export class SwotItem {

    id: number;
    name: string;
    type: string;
    note: string;
    swotAnalysisId: number;



    constructor(id: number, name: string, type: string, note: string, swotAnalysisId?: number) {

        if (swotAnalysisId) {
            this.id = id;
            this.name = name;
            this.swotAnalysisId = swotAnalysisId;
            this.type = type;
            this.note =note;
        } else {
            this.id = id;
            this.name = name;
            this.type = type;
            this.note = note;
        }

    }


}
