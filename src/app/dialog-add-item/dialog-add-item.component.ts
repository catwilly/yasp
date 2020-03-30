import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IYaspItem } from '../model/YaspList';

export class DialogAddItemData {
  constructor(public name: string, public quantity: number, public title:string) {
  }
}

@Component({
  selector: 'app-dialog-add-item',
  templateUrl: './dialog-add-item.component.html',
  styleUrls: ['./dialog-add-item.component.css']
})
export class DialogAddItemComponent implements OnInit {

  public name: string;
  public quantity: number;
  public title:string;

  constructor(public dialogRef: MatDialogRef<DialogAddItemComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogAddItemData) { 
    this.name = data.name;
    this.quantity = data.quantity;
    this.title = data.title;
  }

  ngOnInit() {
  }

  public onMinus() {
    if(this.quantity > 1) {
      this.quantity--;
    }
  }

  public onPlus() {
    this.quantity++;
  }

  public cantConfirm(): boolean {
    const canOk = this.name != null && (this.name.trim() != "") && this.quantity != null;

    return !canOk;
  }
  
  public onEnter() {
    const item: IYaspItem = { Name: this.name, Quantity: this.quantity }
    this.dialogRef.close(item);
  }

  public onNoClick(): void {
    this.dialogRef.close(null);
  }

}
