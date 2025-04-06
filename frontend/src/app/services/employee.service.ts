import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Define GraphQL queries and mutations
const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    getEmployeeById(id: $id) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

const SEARCH_EMPLOYEES = gql`
  query SearchEmployeeByDeptDesg($department: String, $designation: String) {
    searchEmployeeByDeptDesg(
      department: $department
      designation: $designation
    ) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!
    $last_name: String!
    $email: String!
    $gender: String
    $designation: String!
    $salary: Float!
    $date_of_joining: String!
    $department: String!
    $employee_photo: String
  ) {
    addEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      date_of_joining: $date_of_joining
      department: $department
      employee_photo: $employee_photo
    ) {
      id
      first_name
      last_name
      email
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployeeById(
    $id: ID!
    $first_name: String
    $last_name: String
    $email: String
    $gender: String
    $designation: String
    $salary: Float
    $date_of_joining: String
    $department: String
    $employee_photo: String
  ) {
    updateEmployeeById(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      date_of_joining: $date_of_joining
      department: $department
      employee_photo: $employee_photo
    ) {
      id
      first_name
      last_name
      email
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployeeById($id: ID!) {
    deleteEmployeeById(id: $id)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getAllEmployees(): Observable<any[]> {
    return this.apollo
      .query({
        query: GET_ALL_EMPLOYEES,
        fetchPolicy: 'network-only', // Don't cache this query
      })
      .pipe(map((result: any) => result.data.getAllEmployees));
  }

  getEmployeeById(id: string): Observable<any> {
    return this.apollo
      .query({
        query: GET_EMPLOYEE_BY_ID,
        variables: { id },
        fetchPolicy: 'network-only', // Don't cache this query
      })
      .pipe(map((result: any) => result.data.getEmployeeById));
  }

  searchEmployees(
    department?: string,
    designation?: string
  ): Observable<any[]> {
    return this.apollo
      .query({
        query: SEARCH_EMPLOYEES,
        variables: { department, designation },
        fetchPolicy: 'network-only', // Don't cache this query
      })
      .pipe(map((result: any) => result.data.searchEmployeeByDeptDesg));
  }

  addEmployee(employeeData: any): Observable<any> {
    return this.apollo
      .mutate({
        mutation: ADD_EMPLOYEE,
        variables: {
          ...employeeData,
        },
        refetchQueries: [
          { query: GET_ALL_EMPLOYEES }, // Refresh the employee list after adding
        ],
      })
      .pipe(map((result: any) => result.data.addEmployee));
  }

  updateEmployee(id: string, employeeData: any): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_EMPLOYEE,
        variables: {
          id,
          ...employeeData,
        },
        refetchQueries: [
          { query: GET_ALL_EMPLOYEES }, // Refresh the employee list after updating
        ],
      })
      .pipe(map((result: any) => result.data.updateEmployeeById));
  }

  deleteEmployee(id: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: DELETE_EMPLOYEE,
        variables: { id },
        refetchQueries: [
          { query: GET_ALL_EMPLOYEES }, // Refresh the employee list after deleting
        ],
      })
      .pipe(map((result: any) => result.data.deleteEmployeeById));
  }
}
