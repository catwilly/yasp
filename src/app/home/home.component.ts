import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { YaspListProvider } from '../services/YaspListProvider';
import { IYaspList, IYaspRepo, YaspConverter } from '../model/YaspList';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSelectChange } from '@angular/material';
import { DialogAddListComponent, DialogAddListData } from '../dialog-add-list/dialog-add-list.component';
import { DialogConfirmComponent, DialogConfirmData } from '../dialog-confirm/dialog-confirm';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '../services/lang.service';
import { DialogLangselComponent } from '../dialog-langsel/dialog-langsel-component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public yaspRepo: IYaspRepo = null;

 
  constructor(private listProvider: YaspListProvider, 
              private router: Router, 
              public dialog: MatDialog, 
              private route: ActivatedRoute,
              private translate: TranslateService, 
              public lang: LangService) {                      
  }
  
  ngOnInit() {
    this.listProvider.yaspRepoObs.subscribe(x => this.onRepoChanged(x));    

    if(this.yaspRepo != null) {
      this.checkNewListParam();
    }
  }

  public getLangFlagSrc(): string {
    const src = `../../assets/flags/${this.lang.currentLang}_flag.png`;
    return src;
  }

  public onLangSelected(e: MatSelectChange) {
    this.lang.setLang(e.value);

    // reload page
    window.location.reload();
  }
  
  private onRepoChanged(repo: IYaspRepo) {
    this.yaspRepo = repo;    
    this.checkNewListParam();
  }

  private checkNewListParam () {
    let newListParamUrl = this.route.snapshot.queryParamMap.get("newlist");
    if(newListParamUrl != null) {
      let decoded = decodeURI(newListParamUrl);
      let newList = YaspConverter.StringToList(decoded);
      
      newList.Name = this.getNewListName(this.yaspRepo, newList.Name);

      this.yaspRepo.Lists.push(newList);
      this.listProvider.OnRepoUpdated();

      this.router.navigate([''], { replaceUrl: true });
    }
  }

  private hasListName(repo: IYaspRepo, name: string): boolean {
    // check if exists
    const inx = repo.Lists.findIndex((v,i,o) => v.Name === name);

    return (inx >= 0);
  }

  private getNewListName(repo: IYaspRepo, name: string) : string {
    
    let retName = name;

    let nextSufix = 2;
    while(this.hasListName(repo, retName)) {
      retName = name + " " + nextSufix;
      nextSufix++;
    }

    return retName;
  }
  
  public onListClick(list: IYaspList) {
    this.router.navigate(['/ylist', list.Name]);
  }

  public cantShare(list: IYaspList) {
    const canShare: boolean = list.Items.length > 0;

    return !canShare;
  }

  public onShare(list: IYaspList) {
    // convert list to text
    const listStr = YaspConverter.ListToString(list);

    let url = "https://yasp.now.sh/?newlist=" + listStr;
    let urlEncoded = encodeURI(url);
    let whatsUrl: string = "whatsapp://send?text=" + url;

    window.open(whatsUrl);
  }
  
  public onListDelete(list: IYaspList) {
    // remove
    const msg = this.translate.instant('DELETE', {x: list.Name});
    const dialogRef = this.dialog.open(DialogConfirmComponent, {data: new DialogConfirmData(msg)});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.yaspRepo.Lists.indexOf(list);
        this.yaspRepo.Lists.splice(index, 1);
        this.listProvider.OnRepoUpdated();
      }
    });    
  }
  
  public onEdit(list: IYaspList) {
    const dialogRef = this.dialog.open(DialogAddListComponent, {
      data: new DialogAddListData(list.Name, "ASK_CHANGE_NAME"),
      width: '95%'
    });
    
    dialogRef.afterClosed().subscribe(name => {
      if(name) {
        let nameStr = <string>name;
        // update list
        const index = this.yaspRepo.Lists.indexOf(list);
        this.yaspRepo.Lists[index].Name = name;
        this.listProvider.OnRepoUpdated();
      }
    });
  }
  
  public onAdd() {
    const dialogRef = this.dialog.open(DialogAddListComponent, {
      data: new DialogAddListData(null, "ASK_NEW_LIST"),
      width: '95%'
    });
    
    dialogRef.afterClosed().subscribe(name => {
      if(name) {
        let nameStr = <string>name;
        nameStr = this.getNewListName(this.yaspRepo, nameStr);

        // create new list
        let newList: IYaspList = { Name: nameStr, Items: [] };
        this.yaspRepo.Lists.push(newList);
        this.listProvider.OnRepoUpdated();
      }
    });
  }

  public onSelectLang() {
    const dialogRef = this.dialog.open(DialogLangselComponent, {      
      width: '95%'
    });
    
    dialogRef.afterClosed().subscribe(lang => {
      if(lang) {
        this.lang.setLang(lang);
      }
    });

  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.yaspRepo.Lists, event.previousIndex, event.currentIndex);
  }
  
}

