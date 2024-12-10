
import { CommonModule } from '@angular/common';
import { Component  , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'src/app/service/job.service';


@Component({
  selector: 'app-jobs',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {

  jobList: any []= [];
  constructor(private jobSer: JobService, private router: Router){

  }
  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobSer.GetActiveJobs().subscribe(
      (res: any) => {
        console.log('API Response:', res); 
        this.jobList = res; 
      },
      (error) => {
        console.error('Error fetching jobs:', error); // Handle errors gracefully
      }
    );
  }
  
  openJob(id: number) {
    this.router.navigate(['/job-detail',id])
  }
}