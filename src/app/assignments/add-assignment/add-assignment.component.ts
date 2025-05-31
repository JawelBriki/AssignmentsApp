import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  providers: [],
  selector: 'app-add-assignment',
  imports: [FormsModule, MatInputModule, MatDatepickerModule,
    MatButtonModule, MatFormFieldModule, MatSelectModule,
    MatNativeDateModule, CommonModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent implements OnInit {

  assignmentName = "";
  dueDate!: Date;
  selectedSubject = "";
  author = "";

  // Predefined subjects
  subjects: string[] = [
    "Web Development", "Data Structures and Algorithms", "Introduction to Computer Science",
    "Software Engineering", "Operating Systems", "Artificial Intelligence",
    "Computer Graphics", "Computer Networks", "Database Management", "Cybersecurity"
  ];

  constructor(private assignmentsService: AssignmentsService,
              private router: Router) {}

  ngOnInit(): void {}

  onSubmit(event: any) {
    console.log("Form submitted");

    // Validate the form
    if (this.assignmentName === "" || this.dueDate == null || this.selectedSubject === "" || this.author === "") {
      console.log("Invalid form");
      console.log(this.assignmentsService.getNewAssignmentID());
      return;
    }

    // Create a new assignment
    let a = new Assignment();
    console.log("NEW ASSIGNMENT ID = ", this.assignmentsService.getNewAssignmentID())
    a._id = this.assignmentsService.getNewAssignmentID();
    a.nom = this.assignmentName;
    a.dateDeRendu = this.dueDate;
    a.subject = this.selectedSubject;
    a.author = this.author;
    a.rendu = false;

    // Update the assignment ID tracker
    this.assignmentsService.setNewAssignmentID(a._id + 1)

    // Send the assignment to the service for insertion
    this.assignmentsService.addAssignment(a)
      .subscribe(message => {
        console.log(message);

        // Navigate to the assignments list
        this.router.navigate(['/home']);
      });
  }
}
