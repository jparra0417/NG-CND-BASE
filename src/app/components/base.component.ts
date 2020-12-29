import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FormUtil } from '../utils/form-util';

export abstract class BaseComponent {

  /** it contains the list of langs */
  listLang: string[];
  /** it contains the object keys to be used for iterate by the keys of an object */
  objectKeys = Object.keys;
  /** it contains if the user is logged */
  isAuthenticated: boolean;

  constructor(protected baseService: BaseService) {
    // set listLang
    this.listLang = this.baseService.getLangService().getListLang();

    // set isLogged
    this.baseService.getAccountService().isAuthenticated().subscribe((result: boolean) => {
      this.isAuthenticated = result;
    });
  }

  /**
   * It validates if form group is correct
   * @param formGroup 
   */
  isValidForm(formGroup: FormGroup): boolean {
    if (formGroup.valid)
      return true;
    for (const key in formGroup.controls)
      if (formGroup.controls.hasOwnProperty(key))
        formGroup.controls[key].markAsTouched();
    return false;
  }

  /**
   * return a object with the fields of the formgroup
   * @param formGroup 
   * @param object 
   */
  fillObject(formGroup: FormGroup, object?: any): any {
    if (!object) object = {};
    for (const key in formGroup.controls)
      if (formGroup.controls.hasOwnProperty(key))
        object[key] = formGroup.controls[key].value;
    return object;
  }


  /** less than */
  lt(x: any, y: any): boolean {
    return x < y;
  }
  /** less and equals than  */
  lte(x: any, y: any): boolean {
    return x <= y;
  }
  /** great than */
  gt(x: any, y: any): boolean {
    return x > y;
  }
  /** great and equals than */
  gte(x: any, y: any): boolean {
    return x >= y;
  }
  /** equals than */
  eq(x: any, y: any): boolean {
    return x == y;
  }
  /** not equals than */
  ne(x: any, y: any): boolean {
    return x != y;
  }
  /** it assign a value */
  assign(x: any, y: any) {
    x = y;
  }
  /** concat string */
  concat(...y: string[]): string {
    let r = "";
    if (y)
      y.forEach(i => {
        r += i;
      });
    return r;
  }

  /** is empty something */
  empty(x: any) {
    return !x || x.length == 0;
  }

  /** it substracts two numbers */
  substract(x: number, y: number) {
    return x - y;
  }

  /** it adds class by query */
  addClassByQuery(query: string, c: any) {
    if (c) {
      var elements = document.querySelectorAll(query);
      if (elements) {
        elements.forEach(element => {
          if (element.classList) {
            if (c instanceof Array) {
              element.classList.add(...c);
            } else if (typeof (c) === "string") {
              element.classList.add(c);
            }
          }
        });
      }
    }
  }

  /** it adds class by query */
  removeClassByQuery(query: string, c: any) {
    if (c) {
      var elements = document.querySelectorAll(query);
      if (elements) {
        elements.forEach(element => {
          if (element.classList) {
            if (c instanceof Array) {
              element.classList.remove(...c);
            } else if (typeof (c) === "string") {
              element.classList.remove(c);
            }
          }
        });
      }
    }
  }

  /** it returns the percentage according to value and total */
  getPercentage(value: number, total: number): number {
    return (value && total) ? (value / total) * 100 : 0;
  }

  /** it returns an array by index and an aditional array */
  getElementsArrayByIndex(index: number, array: string[], additionalClasses?: string[]): string[] {
    let classes: string[] = [];
    if (!index || index <= 0 || index >= array.length)
      classes.push(array[0]);
    else {
      classes.push(array[index]);
      if (additionalClasses)
        for (const c of additionalClasses)
          classes.push(c);
    }
    return classes;
  }


  /** This methods returns a boolean if the control has any error */
  hasErrors(formControl: FormControl) {
    return FormUtil.hasErrors(formControl);
  }
  /** This methods returns a boolean if the control has a specific error */
  hasError(formControl: FormControl, error: string) {
    return FormUtil.hasError(formControl, error);
  }

  /** get the authenticated name */
  getAuthenticatedName(): string {
    return this.baseService.getAccountService().getAuthenticatedName();
  }

  /** get the authenticated id */
  getAuthenticatedId(): string {
    return this.baseService.getAccountService().getAuthenticatedId();
  }
}
