import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private readonly getTaskURL = '/tasks?householdId='
  private readonly getMembersURL = '/members?householdId='
  private readonly doneTaskURL = '/tasks/finishTask/'
  private readonly assignTaskURL = '/tasks?memberID='

  constructor(private http: HttpClient) { }

  getTasks(householdID: string){
    return this.http.get(environment.API_SERVER + this.getTaskURL + `${householdID}`);
  }

  getHouseHoldMembers(householdID: string){
    return this.http.get(environment.API_SERVER + this.getMembersURL + `${householdID}`);
  }

  assignTask(taskID: string, userID: string){
    return this.http.put(environment.API_SERVER + this.assignTaskURL + `${userID}&taskId=${taskID}`,'');
  }

  doneTask(taskID: string){
    return this.http.put(environment.API_SERVER + this.doneTaskURL + `${taskID}`,'');
  }
}
