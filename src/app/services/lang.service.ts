import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import i18n from '/workspace/cnd/env/ENV-CND-BASE/i18n.json';
import environment from '/workspace/cnd/env/ENV-CND-BASE/json-cnd-base.json';
import { StringUtil } from '../utils/string-util';

@Injectable({
  providedIn: 'root'
})
export class LangService {


  /** it contains the key of lang in the local storage */
  private static LOCAL_STORAGE_KEY_LANG = "cnd_lang";

  /** this is an observable that allows to get the current lang  */
  private subject = new BehaviorSubject<string>(this.getLang());

  constructor() { }

  /**
   * It returns an observable when the lang is changed
   */
  onChangeLang(): Observable<string> {
    return this.subject.asObservable()
  }

  /**
   * It declares a new language
   * @param lang language to be defined 
   */
  use(lang: string): boolean {
    if (lang && i18n && i18n[lang]) {
      localStorage.setItem(LangService.LOCAL_STORAGE_KEY_LANG, lang);
      this.subject.next(lang);
      return true;
    }
    console.log("Lang is not supported");
    return false;
  }

  /**
   * It returns the current lang
   */
  getLang() {
    const lang = localStorage.getItem(LangService.LOCAL_STORAGE_KEY_LANG);
    if (!lang || !i18n[lang])
      if (environment.lang)
        localStorage.setItem(LangService.LOCAL_STORAGE_KEY_LANG, environment.lang);
    return localStorage.getItem(LangService.LOCAL_STORAGE_KEY_LANG);
  }

  /**
   * It returns the list of langs
   */
  getListLang(): string[] {
    let listLang: string[] = [];
    if (i18n)
      for (const key in i18n)
        if (i18n.hasOwnProperty(key))
          listLang.push(key);
    return listLang;
  }

  /**
   * It translates the key with the current lang
   * @param key 
   */
  translate(key: string, args?: any) {
    return this.translateByLang(key, this.getLang(), args);
  }

  /**
   * It translates a key according to the lang
   * @param key String key of the text
   * @param lang 
   */
  private translateByLang(key: string, lang: string, args?: any): string {
    if (key && lang && i18n && i18n[lang]) {
      let translation = i18n[lang];
      const array = key.split(".");
      for (const element of array) {
        if (translation[element]) {
          translation = translation[element];
        } else {
          console.log("key not found: ", key);
          return "";
        }
      }
      if (typeof (translation) === 'string') return StringUtil.replaceText(translation, args);
      console.log("The object of the key is not a string: ", key);
    } else {
      console.log("The [key] or [lang] are not supported ", key, lang);
    }
    return "";
  }
}



