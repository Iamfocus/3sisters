import Layout from "../Components/Layout.tsx";
import AllJobs from "../Components/Jobs/AllJobs.tsx";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import JobSide from "../Components/Jobs/JobSide.tsx";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { JobsResponse } from "../../types.ts";

const Jobs = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const secret = import.meta.env.VITE_SECRET_KEY;

  const [jobs, setJobs] = useState<JobsResponse>({
    current_page: 1,
    data: [],
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({
        search,
        page: page.toString(),
      }).toString();

      const response = await fetch(`${baseUrl}/api/jobs?${query}`, {
        headers: {
          "X-API-TOKEN": secret,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      setJobs(data.data);
      setLastPage(data.meta?.last_page || 1);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchJobs();
  };
  
  // NEW FUNCTION TO HANDLE PAGE CHANGES
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= lastPage) {
      setPage(newPage);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <Layout>
        <Container className="py-5">
          <Card className="border-0">
            <CardHeader
              className="py-4 text-white"
              style={{ background: "#203635" }}
            >
              Jobs Search
            </CardHeader>
            <CardBody>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-lg rounded-0"
                  placeholder="Search from below list"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span
                  className="input-group-text"
                  style={{ background: "#AF9A14" }}
                >
                  <Button
                    className="btn btn-sm border-0"
                    style={{ background: "#AF9A14" }}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </span>
              </div>
              <Row className="py-5">
                <Col
                  md={3}
                  sm={12}
                  style={{
                    borderRight: "1px solid #646C76",
                    minHeight: "100vh",
                  }}
                >
                  <JobSide
                    setSearch={setSearch}
                    handleSearch={handleSearch}
                    jobs={jobs}
                    fetchJobs={fetchJobs}
                  />
                </Col>
                <Col
                  md={9}
                  sm={12}
                  className="mt-2"
                  style={{ borderTop: "1px solid #646C76" }}
                >
                  <AllJobs
                    jobs={jobs}
                    lastPage={lastPage}
                    page={page}
                    onPageChange={handlePageChange} // PASSING THE NEW FUNCTION
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </Layout>
    </>
  );
};

export default Jobs;