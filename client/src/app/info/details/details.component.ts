import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @Input()
  name!: string;

  @Input()
  team!: string;

  @Input()
  joinedAt!: string;

  @Input()
  avatar!: string;
  
}
