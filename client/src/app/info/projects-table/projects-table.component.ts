import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import axios from "axios";
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent {
  displayedColumns = ['name', 'score', 'durationInDays', 'bugsCount', 'madeDadeline'];
  projectsSource = new MatTableDataSource();
  projects: {
    "name": string,
    "score": number,
    "durationInDays": number,
    "bugsCount": number,
    "madeDadeline": boolean
  }[] = [];
  filteredProjects: {
    "name": string,
    "score": number,
    "durationInDays": number,
    "bugsCount": number,
    "madeDadeline": boolean
  }[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  average!: number;
  percentage!: number;
  filterText: string = "";

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private apiService: ApiService) {}

  ngOnInit() {
    let token = localStorage.getItem('token');

    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    this.apiService.getProjects(config).then((response: {
          "name": string,
          "score": number,
          "durationInDays": number,
          "bugsCount": number,
          "madeDadeline": boolean
        }[]) => {
      if (response){
        this.projects = response;
        console.log(this.projects);
        this.filteredProjects = this.projects;
        this.projectsSource.data = this.projects;
        this.calculateAverage();
        this.calculatePercentage();
        return response;
      }
      return [];
    })

  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe((by) => {
      if (by.direction == 'asc') {
        this.filteredProjects = this.filteredProjects.sort((a,b) => ((a as any)[by.active] > (b as any)[by.active]) ? 1 : (((b as any)[by.active] > (a as any)[by.active]) ? -1 : 0))
      } else {
        this.filteredProjects = this.filteredProjects.sort((a,b) => ((a as any)[by.active] < (b as any)[by.active]) ? 1 : (((b as any)[by.active] < (a as any)[by.active]) ? -1 : 0))
      }
      console.log(this.filteredProjects);
      this.projectsSource.data = this.filteredProjects;
      this.changeDetectorRefs.detectChanges();
    })
  }

  calculateAverage() {
    let scores = this.filteredProjects.map(p => p.score);
    this.average = scores.reduce((a, b) => a+b) / scores.length;
  }

  calculatePercentage() {
    let deadlineMadeProjects = this.filteredProjects.filter(p => p.madeDadeline);
    this.percentage = deadlineMadeProjects.length / this.filteredProjects.length;
  }

  onFilterChange() {
    let lowerFilter = this.filterText.toLowerCase();
    this.filteredProjects = this.projects.filter(p => p.name.toLowerCase().includes(lowerFilter) 
                                                              || String(p.score).toLowerCase().includes(lowerFilter)
                                                              || String(p.durationInDays).toLowerCase().includes(lowerFilter)
                                                              || String(p.bugsCount).toLowerCase().includes(lowerFilter)
                                                              || String(p.madeDadeline).toLowerCase().includes(lowerFilter));
    console.log(this.filteredProjects);                                                        
    this.projectsSource.data = this.filteredProjects;
    this.changeDetectorRefs.detectChanges();
    this.calculateAverage();
    this.calculatePercentage();
  }
}
