// import { Component, OnInit } from '@angular/core';
// import { JobService } from 'src/app/service/job.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-create-new-job',
//   standalone: true,
//   imports: [FormsModule,CommonModule],
//   templateUrl: './create-new-job.component.html',
//   styleUrls: ['./create-new-job.component.css']
// })


// export class CreateNewJobComponent implements OnInit {
//   companies: any[] = [];
//   employers: any[] = [];
//   selectedCompanyId: number=0;
//   selectedEmployerId: number=0;
//   job = {
//     title: '',
//     description: '',
//     qualifications: '',
//     salary: 0,
//     jobType: '',
//     requiredSkills: '',
//     location: '',
//     industry: ''
//   };

//   constructor(private jobService: JobService) {}

//   ngOnInit() {
//     this.fetchCompanies();
//   }

//   // Fetch companies for dropdown
//   fetchCompanies() {
//     this.jobService.getCompanies().subscribe(companies => {
//       this.companies = companies;
//     });
//   }

//   // Fetch employers for selected company
//   fetchEmployers() {
//     this.jobService.getEmployers(this.selectedCompanyId).subscribe(employers => {
//       this.employers = employers;
//     });
//   }

//   // Create new company
//   createNewCompany() {
//     this.jobService.createCompany({ /* Company data */ }).subscribe(company => {
//       this.fetchCompanies(); // Re-fetch companies after creation
//     });
//   }

//   // Create new employer
//   createNewEmployer() {
//     const employerData = {
//       userId: 0,  // Assign a userId based on user data
//       companyId: this.selectedCompanyId
//     };
//     this.jobService.createEmployer(employerData).subscribe(employer => {
//       this.fetchEmployers(); // Re-fetch employers after creation
//     });
//   }

//   // Submit the job form
//   onSubmit() {
//     const jobData = {
//       ...this.job,
//       employerId: this.selectedEmployerId
//     };
//     this.jobService.createJob(jobData).subscribe(response => {
//       console.log('Job Created Successfully', response);
//     });
//   }
// }




import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/service/job.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-new-job',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-new-job.component.html',
  styleUrls: ['./create-new-job.component.css']
})
export class CreateNewJobComponent implements OnInit {
  companies: any[] = [];
  employers: any[] = [];
  filteredEmployers: any[] = [];
  selectedCompanyId: number = 0;
  selectedEmployerId: number = 0;
  userEmail: string = '';
  isLoggedIn: boolean = false;
  isEmployer: boolean = false;

  job = {
    title: '',
    description: '',
    qualifications: '',
    salary: 0,
    jobType: '',
    requiredSkills: '',
    location: '',
    industry: ''
  };

  newCompany = {
    companyId: 0,
    companyName: '',
    address: '',
    description: '',
    website: ''
  };

  newEmployer = {
    userId: 0,
    companyId: 0
  };

  showCompanyForm: boolean = false;

  constructor(
    private jobService: JobService
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.fetchCompanies();
    this.fetchUserEmail(); // Fetch user email on init
    this.fetchEmployers(); // Fetch all employers directly
  }

  // Check if user is logged in and decode token to check role
  checkLoginStatus() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.isLoggedIn = true;
      const decodedToken = this.decodeJWT(authToken);
      if (decodedToken && decodedToken.role === 'Employer') {
        this.isEmployer = true;
      }
    }
  }

  /**
   * Decodes the JWT token and returns the payload.
   */
  decodeJWT(token: string) {
    const payload = token.split('.')[1]; // JWT has 3 parts: header, payload, and signature
    const decoded = atob(payload); // Decode the base64 encoded payload
    return JSON.parse(decoded); // Parse the decoded payload as JSON
  }

  // Fetch all companies
  fetchCompanies() {
    this.jobService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  // Fetch all employers and apply email filtering
  fetchEmployers() {
    this.jobService.getEmployers().subscribe(
      (employers) => {
        this.employers = employers;
        console.log('Employers fetched:', this.employers); // Check the data fetched
        this.applyEmailFilter(); // Apply the email filter once employers are fetched
      },
      (error) => {
        console.error('Error fetching employers:', error);
      }
    );
  }

  // Apply email filter based on user email
  applyEmailFilter() {
    const filtered = this.employers.filter((employer) => {
      return employer.email === this.userEmail;
    });
    this.filteredEmployers = filtered;
    console.log('Filtered Employers:', this.filteredEmployers); // Log to check
  }

  // Decode userId from JWT token
  getUserIdFromToken() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.decodeJWT(token);
      return decodedToken.userId; // Assuming userId is stored in the token
    }
    return null;
  }

  // Fetch the user's email
  fetchUserEmail() {
    const userId = this.getUserIdFromToken();
    if (userId) {
      this.jobService.getUserById(userId).subscribe(
        (user) => {
          this.userEmail = user.email; // Populate the email field
          console.log('User email fetched:', this.userEmail);
        },
        (error) => {
          console.error('Error fetching user email:', error);
        }
      );
    }
  }

  // Create a new company
  submitNewCompany() {
    if (!this.newCompany.companyName || !this.newCompany.address) {
      alert('Company Name and Address are required!');
      return;
    }
    this.jobService.createCompany(this.newCompany).subscribe(
      (response) => {
        alert('Company created successfully!');
        this.fetchCompanies();
        this.resetCompanyForm();
      },
      (error) => {
        console.error('Error creating company:', error);
      }
    );
  }

  // Create a new employer
  createEmployer() {
    const userId = this.getUserIdFromToken();
    if (userId) {
      this.newEmployer.userId = userId;
      this.newEmployer.companyId = this.selectedCompanyId;

      this.jobService.createEmployer(this.newEmployer).subscribe(
        (employer) => {
          console.log('New employer created:', employer);
          this.fetchEmployers(); // Re-fetch employers after creation
        },
        (error) => {
          console.error('Error creating employer:', error);
          alert('An error occurred while creating the employer. Please try again.');
        }
      );
    }
  }

  // Create a new job
  createJob() {
    const jobData = {
      ...this.job,
      employerId: this.selectedEmployerId
    };

    this.jobService.createJob(jobData).subscribe(
      (response) => {
        alert('Job created successfully!');
      },
      (error) => {
        console.error('Error creating job:', error);
      }
    );
  }

  // Handle job form submission
  onSubmit() {
    if (this.selectedEmployerId === 0) {
      this.createEmployer();
    } else {
      this.createJob();
    }
  }

  // Reset company form
  resetCompanyForm() {
    this.newCompany = {
      companyId: 0,
      companyName: '',
      address: '',
      description: '',
      website: ''
    };
  }

  // Toggle company form visibility
  toggleCompanyForm(): void {
    this.showCompanyForm = !this.showCompanyForm;
  }
}
