import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { dbAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  //private backendURL = 'http://localhost:8010/api/assignments';
  private backendURL = 'https://jawelbriki-assignmentsapi.onrender.com/api/assignments';

  assignments:Assignment[] = [];
  nextAssignmentID: number = 0;

  constructor(private http:HttpClient) { }

  getAssignmentsPagines(page:number, limit:number):Observable<any> {
    console.log("Service:getAssignments appelée !");

    // On utilise la methode get du service HttpClient
    // pour récupérer les données depuis le backend
    const URI = this.backendURL + '?page=' + page + '&limit=' + limit;
    return this.http.get<Assignment[]>(URI);
  }

  getAssignment(_id:string):Observable<Assignment|undefined> {
    console.log("Service:getAssignment appelée avec id = " + _id);
    // route = /api/assignments/:id côté serveur !
    let URI = this.backendURL + '/' + _id;

    return this.http.get<Assignment>(URI);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    // On ajoute l'assignment passé en paramètres
    // en l'envoyant par POST au backend
     return this.http.post<string>(this.backendURL, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    // On met à jour l'assignment passé en paramètres
    // en l'envoyant par PUT au backend
    return this.http.put<string>(this.backendURL, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
    // On supprime l'assignment passé en paramètres
    // en l'envoyant par DELETE au backend
    return this.http.delete<string>(this.backendURL + '/' + assignment._id);
  }

  // version améliorée
  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];

    dbAssignments.forEach(a => {
      const assignment = new Assignment();
      assignment._id = a.id;
      assignment.author = a.author;
      assignment.subject = a.subject;
      if (a.grade != null) assignment.grade = a.grade;
      assignment.nom = a.nom;
      assignment.dateDeRendu = new Date(a.dateDeRendu);
      assignment.rendu = a.rendu;
      if (a.remarks) assignment.remarks = a.remarks;

      appelsVersAddAssignment.push(this.addAssignment(assignment))
    });

    // On renvoie un observable qui va nous permettre de savoir
    // quand toutes les insertions sont terminées
    return forkJoin(appelsVersAddAssignment);
  }

  setNewAssignmentID(id: number): void {
    this.nextAssignmentID = id;
  }

  getNewAssignmentID(): number {
    return this.nextAssignmentID;
  }

}
