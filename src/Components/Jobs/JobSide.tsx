import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Collapse } from "react-bootstrap";
import { useState } from "react";

interface JobSideProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent) => void;
  jobs: any;
  fetchJobs: () => void;
}

// Example: mapping location IDs to names
const locationMap: Record<string, string> = {
  "4": "Alberta",
  "5": "Ontario",
  "6": "British Columbia",
  // add more as needed
};

const JobSide: React.FC<JobSideProps> = ({ jobs }) => {
  const [openFNMI, setOpenFNMI] = useState(false);
  const [openProvince, setOpenProvince] = useState(false);

  // Count jobs per FNMI (category)
  const fnmiCounts: Record<string, number> = {};
  (jobs?.data ?? []).forEach((job: any) => {
    const catName = job.category?.name
      ? JSON.parse(job.category.name).en
      : null;
    if (catName) {
      fnmiCounts[catName] = (fnmiCounts[catName] || 0) + 1;
    }
  });

  // Count jobs per location
  const locationCounts: Record<string, number> = {};
  (jobs?.data ?? []).forEach((job: any) => {
    const locationId = job.jLocation;
    const locationName = locationMap[locationId];
    if (locationName) {
      locationCounts[locationName] = (locationCounts[locationName] || 0) + 1;
    }
  });

  return (
    <div className="job-side">
      <div className="p-3">
        <h4 className="fw-bold text-dark">Refine Your Search</h4>

        {/* FNMI Jobs */}
        <div
          onClick={() => setOpenFNMI(!openFNMI)}
          className="d-flex justify-content-between align-items-center py-3"
          style={{ cursor: "pointer" }}
        >
          <span className="fw-bold">FNMI Jobs</span>
          {openFNMI ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        <Collapse in={openFNMI}>
          <div className="ps-3">
            {Object.entries(fnmiCounts).map(([category, count]) => (
              <div key={category} className="py-1">
                {category} ({count})
              </div>
            ))}
          </div>
        </Collapse>

        {/* Province/Territory */}
        <div
          onClick={() => setOpenProvince(!openProvince)}
          className="d-flex justify-content-between align-items-center py-3"
          style={{ cursor: "pointer" }}
        >
          <span className="fw-bold">Province/Territory</span>
          {openProvince ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        <Collapse in={openProvince}>
          <div className="ps-3">
            {Object.entries(locationCounts).map(([location, count]) => (
              <div key={location} className="py-1">
                {location} ({count})
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default JobSide;
