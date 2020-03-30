import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {MatSelectChange} from '@angular/material';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  public currentLang: string = null;

  private readonly langKey: string = "yasp-user-lang";

  constructor(private translate: TranslateService, private storage: StorageMap) {
    
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');    
    
    this.initialize();
  }

  private async initialize() {
    let storedLang = await this.storage.get(this.langKey).toPromise();
    let lang = storedLang === undefined ? null : <string>storedLang;    
    if(lang == null) {
      // Detect browser language  
      let navLang = navigator.language;
      this.currentLang = navLang.substr(0,2);
      this.translate.use(this.currentLang);
      await this.persist();
    }
    else {
      // hack: force language
      //this.currentLang = 'es';
      this.currentLang = lang;
      this.translate.use(this.currentLang);
    }    
  }

  public setLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(this.currentLang);
    this.persist();
  }

  private async persist() {
    await this.storage.set(this.langKey, this.currentLang).toPromise();
}

}
