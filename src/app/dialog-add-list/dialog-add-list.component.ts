import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class DialogAddListData {
  constructor(public name: string, public title: string) {
  }
}
@Component({
  selector: 'app-dialog-add-list',
  templateUrl: './dialog-add-list.component.html'
})
export class DialogAddListComponent implements OnInit {

  public name: string;
  public title: string;

  constructor(public dialogRef: MatDialogRef<DialogAddListComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogAddListData) { 
    this.name = data.name;
    this.title = data.title;
  }

  ngOnInit() {
  }

  public cantConfirm(): boolean {
    const canOk = this.name != null && (this.name.trim() != "");

    return !canOk;
  }
  
  onEnter() {
    this.dialogRef.close(this.name);
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

}
