import { Component, Input } from '@angular/core';
import { ContactInfoService } from 'src/app/services/contact-info.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  name!: string;
  team!: string;
  joinedAt!: string;
  avatar!: string;
  
  constructor(private contactInfoService: ContactInfoService) {}

  ngOnInit() {
    // Get all the contact info
    let contactInfo = this.contactInfoService.getContactInfo();
    this.name = contactInfo.name;
    this.team = contactInfo.team;
    this.joinedAt = contactInfo.joinedAt;
    this.avatar = contactInfo.avatar;
  }
}
