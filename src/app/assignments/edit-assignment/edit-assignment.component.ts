import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  dateDeRendu?: Date = undefined;
  grade: number | null = null;
  remarks: string = '';

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const _id = this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(_id).subscribe((a) => {
      this.assignment = a;
      if (this.assignment) {
        this.dateDeRendu = this.assignment.dateDeRendu;
        if (this.assignment.rendu) {
          this.grade = this.assignment.grade;
          this.remarks = this.assignment.remarks || '';
        }
      }
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.dateDeRendu === undefined) return;

    this.assignment.dateDeRendu = this.dateDeRendu;

    if (this.assignment.rendu) {
      this.assignment.grade = this.grade;
      this.assignment.remarks = this.remarks;
    }

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }
}
