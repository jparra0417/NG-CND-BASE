import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

export class FormUtil {

    /** It validates if a formcontrol has any error */
    static hasErrors(formControl: FormControl) {
        return formControl && formControl.errors && (formControl.dirty || formControl.touched);
    }

    /** It validates if a formcontrol has a specific error */
    static hasError(formControl: FormControl, error: string) {
        return FormUtil.hasErrors(formControl) && formControl.errors[error];
    }

    /** It validates if a formcontrol value matches with another one */
    static match(controlToCompare :FormControl) : ValidatorFn {
        return (control : AbstractControl): {[key: string]: boolean} => {
            if(control.value === controlToCompare.value)
                return null;            
            return {'match': true}; 
        }
    }
}
