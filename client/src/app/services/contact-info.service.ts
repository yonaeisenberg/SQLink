import { Injectable } from "@angular/core";

@Injectable()
export class ContactInfoService {
  name!: string;
  team!: string;
  joinedAt!: string;
  avatar!: string;

  setContactInfo(name: string, team: string, joinedAt: string, avatar: string) {
      this.name = name;
      this.team = team;
      this.joinedAt = joinedAt;
      this.avatar = avatar;
      //saving the data in local storage because it was lost on info page refresh
      localStorage.setItem('name', name);
      localStorage.setItem('team', team);
      localStorage.setItem('joinedAt', joinedAt);
      localStorage.setItem('avatar', avatar);
  }

  getContactInfo(){
      //if the data is undefined, get the data from local storage because it was lost on info page refresh
      if (!this.name){
        this.name = localStorage.getItem('name')!;
        this.team = localStorage.getItem('team')!;
        this.joinedAt = localStorage.getItem('joinedAt')!;
        this.avatar = localStorage.getItem('avatar')!;
      }
      return {
        name: this.name,
        team: this.team,
        joinedAt: this.joinedAt,
        avatar: this.avatar  
      }
  }
}