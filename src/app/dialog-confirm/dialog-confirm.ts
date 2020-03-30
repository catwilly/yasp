import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export class DialogConfirmData {
  constructor(public title: string) {
  }
}

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: 'dialog-confirm.html'
})
export class DialogConfirmComponent {

  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogConfirmData) {
  }

}
