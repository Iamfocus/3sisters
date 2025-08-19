import { AllJobsProps } from "../../../types.ts";

const AllJobs: React.FC<AllJobsProps> = ({ jobs }) => {
  const decodeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent || "";
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const today = new Date();

  const sortedJobs = jobs.data.sort((a, b) => {
    const dateA = new Date(a.JobOpenDate).getTime();
    const dateB = new Date(b.JobOpenDate).getTime();
    return dateB - dateA;
  });

  return (
    <div>
      {sortedJobs.length > 0 ? (
        sortedJobs
          .filter((job) => new Date(job.JobCloseDate) >= today)
          .map((job) => (
            <div key={job.jpid}>
              <div className="jobs mt-3">
                <h4>
                  {job.application_link ? (
                    <a
                      href={job.application_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      {job.jobTitle.toUpperCase()}
                    </a>
                  ) : (
                    <a
                      href={`single-job?id=${encodeURIComponent(job.jpid)}`}
                      className="text-decoration-none"
                    >
                      {job.jobTitle.toUpperCase()}
                    </a>
                  )}
                </h4>
                <div className="text-muted job-below py-2">
                  <span>
                    <i className="bi bi-clock-fill text-black"></i>{" "}
                    {job.JobOpenDate}
                  </span>
                  <span className="mx-2">
                    <i className="bi bi-folder-fill spicon"></i>{" "}
                    <span className="sptext">{job.category?.slug}</span>
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
                    ${job.max_salary} per year
                  </span>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: truncateDescription(decodeHTML(job.jobDescription), 100),
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