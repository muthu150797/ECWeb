import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, of, ReplaySubject} from 'rxjs';
import {IUser} from '../shared/models/user';
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class DasboardService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
  }

}
