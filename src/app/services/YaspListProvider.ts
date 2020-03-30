import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IYaspList, Mockery, IYaspRepo } from '../model/YaspList';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
    providedIn: 'root'
  })
  export class YaspListProvider {
    
    private readonly repoKey: string = "yasp-repo-v0";

    private yaspRepoSub: ReplaySubject<IYaspRepo> = new ReplaySubject(1);
    public yaspRepoObs = this.yaspRepoSub.asObservable();

    private currentRepo: IYaspRepo = null;

    constructor(private storage: StorageMap) {
        // get grom storage
        this.initialize();
        
        // const mockLists = [ 
        //     Mockery.GetList("Willy's list", 6),
        //     Mockery.GetList("Danny's list", 6),
        // ]

        // this.yaspListsSub.next(mockLists);
    }

    public OnRepoUpdated() {
        this.persist();
    }

    private async initialize() {
        let storedRepo = await this.storage.get<IYaspRepo>(this.repoKey).toPromise();

        let repo = storedRepo === undefined ? null : <IYaspRepo>storedRepo;
        if(repo === null) {
            // create new repo
            this.currentRepo = { Lists: [] };
            await this.storage.set(this.repoKey, this.currentRepo).toPromise();
        }
        else {
            this.currentRepo = repo;
        }        
        
        this.yaspRepoSub.next(this.currentRepo);
    }

    private async persist() {
        await this.storage.set(this.repoKey, this.currentRepo).toPromise();
    }

  }