import { Component } from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-task-confirm',
  templateUrl: './delete-task-confirm.component.html',
  styleUrls: ['./delete-task-confirm.component.scss']
})
export class DeleteTaskConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteTaskConfirmComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
