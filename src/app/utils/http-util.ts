import { HttpHeaders } from '@angular/common/http';

export class HttpUtil {

    static httpOptionsJson = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
}
