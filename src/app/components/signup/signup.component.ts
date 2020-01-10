import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cnd-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent extends BaseComponent implements OnInit {

  formSignup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  constructor(protected baseService: BaseService, private personService: PersonService) {
    super(baseService);
  }

  ngOnInit() {
  }

  signup() {
    if (this.isValidForm(this.formSignup)) {
      const person: Person = this.fillObject(this.formSignup);
      this.personService.signup(person).subscribe((result: any) => {        
        this.baseService.getMessageService().success('signup.success');        
        this.formSignup.reset();
      }, (error: HttpErrorResponse) => {
        
        if (error.status == 400)
          if (error.error)           
              this.baseService.getMessageService().warning(error.error);
           

      })
    }
  }


}
