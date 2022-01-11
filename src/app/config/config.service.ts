import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) {}
    private configUrl = 'http://localhost:3001/registration';

    registerUser(data:any) {
        return this.http.post(this.configUrl, data)
    }
}