export class Assignment {
    _id!:number;
    author!:string;
    subject!:string;
    grade!:number | null;
    dateDeRendu!:Date;
    nom!:string;
    rendu!:boolean;
    remarks!:string | null;
}
