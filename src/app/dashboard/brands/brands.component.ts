import { Component, OnInit } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor() { }


  users: User[];

  cols: any[];
  ngOnInit() {
    this.users = [
      { id: '1', name: 'kiran',email:'kiran@gmail.com' },
      { id: '2', name: 'tom',email:'tom@gmail.com' },
      { id: '3', name: 'john',email:'john@gmail.com' },
      { id: '4', name: 'Frank',email:'frank@gmail.com' },

  ];
    this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
    ];
}
}
