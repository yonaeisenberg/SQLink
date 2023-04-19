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
  }

  getContactInfo(){
      return {
        name: this.name,
        team: this.team,
        joinedAt: this.joinedAt,
        avatar: this.avatar  
      }
  }
}