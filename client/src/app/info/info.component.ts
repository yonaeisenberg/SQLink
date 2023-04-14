import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input()
  name!: string;

  @Input()
  team!: string;

  @Input()
  joinedAt!: string;

  @Input()
  avatar!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route
      .params
      .subscribe((params: { [x: string]: string; }) => {
        this.name = params['name'];
        this.team = params['team'];
        this.joinedAt = params['joinedAt'];
        this.avatar = params['avatar'];
      });
  }
}
