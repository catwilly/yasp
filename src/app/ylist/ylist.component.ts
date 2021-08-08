import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { YaspListProvider } from '../services/YaspListProvider';
import { IYaspList, IYaspItem } from '../model/YaspList';
import { MatDialog, MatSelectionListChange } from '@angular/material';
import { DialogAddItemComponent, DialogAddItemData } from '../dialog-add-item/dialog-add-item.component';
import { DialogConfirmComponent, DialogConfirmData } from '../dialog-confirm/dialog-confirm';
import { LangService } from '../services/lang.service';
import { TranslateService } from '@ngx-translate/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ylist',
  templateUrl: './ylist.component.html',
  styleUrls: ['./ylist.component.css']
})
export class YlistComponent implements OnInit {
  
  public list: IYaspList = null;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private listProvider: YaspListProvider, 
    public dialog: MatDialog,
    private translate: TranslateService,
    public lang: LangService) { }
    
    ngOnInit() {
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
        this.listProvider.yaspRepoObs.pipe(
          map(x => x.Lists.find(y => y.Name === params.get('name')))
          )
          )).subscribe(x => this.list = x);
        }
        
        public onHome() {
          this.router.navigate(['/'], { replaceUrl: true });
        }
        
        public onEdit(item: IYaspItem) {
          const dialogRef = this.dialog.open(DialogAddItemComponent, {
            data: new DialogAddItemData(item.Name, item.Quantity, "ASK_CHANGE_THING"),
            width: '99%'
          });        
          dialogRef.afterClosed().subscribe(itemObj => {
            if(itemObj) {
              let item2 = <IYaspItem>itemObj;
              // update item          
              const index = this.list.Items.indexOf(item);
              this.list.Items[index].Name = item2.Name;
              this.list.Items[index].Quantity = item2.Quantity;
              this.listProvider.OnRepoUpdated();
            }
          });
        }
        
        public onDelete(item: IYaspItem) {
          // remove
          const msg = this.translate.instant('DELETE', {x: item.Name});
          const dialogRef = this.dialog.open(DialogConfirmComponent, {data: new DialogConfirmData(msg)});
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              const index = this.list.Items.indexOf(item);
              this.list.Items.splice(index, 1);
              this.listProvider.OnRepoUpdated();
            }
          });    
        }
        
        public onAdd() {
          const dialogRef = this.dialog.open(DialogAddItemComponent, {
            data: new DialogAddItemData(undefined, 1, "ASK_NEW_THING"),
            width: '99%'
          });        
          dialogRef.afterClosed().subscribe(itemObj => {
            if(itemObj) {
              let item = <IYaspItem>itemObj;
              // create new item          
              this.list.Items.push(item);
              this.listProvider.OnRepoUpdated();
            }
          });
        }

        public drop(event: CdkDragDrop<string[]>) {
          moveItemInArray(this.list.Items, event.previousIndex, event.currentIndex);
          this.listProvider.OnRepoUpdated();
        }

        public onSelectionChange(event: MatSelectionListChange) {
          let listItem = <IYaspItem>event.option.value;
          listItem.Checked = event.option.selected;
          this.listProvider.OnRepoUpdated();
        }
        
      }
      