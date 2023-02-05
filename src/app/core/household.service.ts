import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HouseholdService {

  private readonly householdurl = '/households';
  private readonly assignURL = '/members?memberId=';
  private readonly allMembers = '/members';

  constructor(private http: HttpClient) { }


  createHousehold(household: any){
    return this.http.post(environment.API_SERVER + this.householdurl, household);
  }

  assignHousehold(userID: string, householdID: number){
    return this.http.put(environment.API_SERVER + this.assignURL + `${userID}&houseId=${householdID}`,null);
  }

  getAllMembers(){
    return this.http.get(environment.API_SERVER + this.allMembers);
  }

}
