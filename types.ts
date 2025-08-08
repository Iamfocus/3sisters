// Job item
export interface Job {
    jpid: number;
    jobTitle: string;
    jobDescription: string;
    jobType: string;
    jobCat: number;
    jLocation: string;
    min_salary: string;
    max_salary: string;
    JobOpenDate: string;
    JobCloseDate: string;
    category: {
        id: number;
        name: string; // JSON string e.g. {"en":"Banking"}
        slug: string;
    };
}

// API response
export interface JobsResponse {
    current_page: number;
    data: Job[];
    last_page: number;
    per_page: number;
    total: number;
}

// Component props
export interface AllJobsProps {
    jobs: JobsResponse;
    lastPage: number;
    page: number;
}
