import { AllJobsProps } from "../../../types.ts";

const AllJobs: React.FC<AllJobsProps> = ({ jobs }) => {
  // Function to decode HTML entities
  const decodeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent || "";
  };
  return (
    <div>
      {jobs.data.length > 0 ? (
        jobs.data.map((job) => (
          <div key={job.jpid}>
            <div className="jobs mt-3">
              <h4>
                <a
                  href={`single-job?id=${encodeURIComponent(job.jpid)}`}
                  className="text-decoration-none"
                >
                  {job.jobTitle.toUpperCase()}
                </a>
              </h4>
              <div className="text-muted job-below py-2">
                <span>
                  <i className="bi bi-clock-fill text-black"></i>{" "}
                  {job.JobOpenDate}
                </span>
                <span className="mx-2">
                  <i className="bi bi-folder-fill spicon"></i>{" "}
                  <span className="sptext">{job.category.slug}</span>
                </span>
                <span>
                  {" "}
                  <i className="bi bi-geo-alt-fill spicon"></i>
                  <span className="sptext">{job.jLocation}</span>
                </span>
                <span className="mx-2">
                  {" "}
                  <i className="bi bi-tag-fill text-black"></i> {job.jobType}
                </span>
                <span className="mx-2">
                  {" "}
                  <i className="bi bi-cash text-black"></i> ${job.min_salary} -
                  ${job.max_salary} per Month
                </span>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(job.jobDescription),
                }}
              ></p>
              <hr className="mt-5" />
            </div>
          </div>
        ))
      ) : (
        <div className="d-flex flex-column justify-content-center">
          <div className="text-center">No jobs found.</div>
          <a href="/" className="btn btn-secondary mt-3">
            {" "}
            Return to jobs{" "}
          </a>
        </div>
      )}
    </div>
  );
};

export default AllJobs;
