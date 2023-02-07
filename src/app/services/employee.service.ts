import { Injectable } from '@angular/core';

export interface Employee {
  name? :string;
  employeeId? :string;
  designation?: string;
  dateOfJoining?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }
}
