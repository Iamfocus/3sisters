import Layout from "../Components/Layout.tsx";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios"; // ADD THIS IMPORT

interface Job {
    jobTitle: string;
    JobOpenDate: string;
    category?: { slug: string };
    jLocation: string;
    jobType: string;
    min_salary: number;
    max_salary: number;
    jobDescription: string;
    jobQualification?: string;
    JobAdditionalInfo?: string;
    application_url: string;
    location_name: string;

}

const SingleJob = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const secret = import.meta.env.VITE_SECRET_KEY;

    const [searchParams] = useSearchParams();
    const ids = searchParams.get("id");

    const [singleJob, setSingleJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const decodeHTML = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.documentElement.textContent || '';
    };

    const fetchJob = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${baseUrl}/api/jobs/${ids}`, {
                headers: {
                    'X-API-TOKEN': secret,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setSingleJob(data.data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJob();
    }, []);

    const apply = async (appUrl: string) => { // ADD 'async' HERE
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${baseUrl}/api/apply/${ids}`, {}, {
                headers: {
                    'X-API-TOKEN': secret,
                    'Accept': 'application/json',
                },
            });
            window.location.href = appUrl;
         } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!singleJob) return <div>No job found.</div>;

    return (
        <Layout>
            <Container className="py-5">
                <Card className="border-0">
                    <CardHeader className="py-4 text-white" style={{ background: '#203635' }}>Job Description</CardHeader>
                    <CardBody>
                        <div className="return">
                            <a href="/" className="text-decoration-none">Back to search result</a>
                        </div>

                        <div className="jobs-single mt-3">
                            <h4>{singleJob.jobTitle}</h4>
                            <div className="text-muted job-below py-2">
                                <span><i className="bi bi-clock-fill text-black"></i> {singleJob.JobOpenDate}</span>
                                <span className="mx-2"><i className="bi bi-folder-fill spicon"></i> <span className="sptext">{singleJob.category?.slug}</span></span>
                                <span><i className="bi bi-geo-alt-fill spicon"></i><span className="sptext"> {singleJob.location_name}</span></span>
                                <span className="mx-2"><i className="bi bi-tag-fill text-black"></i> {singleJob.jobType}</span>
                                <span className="mx-2"><i className="bi bi-cash text-black"></i> ${singleJob.min_salary} - ${singleJob.max_salary} per year</span>
                            </div>
                        </div>

                        <Button className="slider-btn text-nowrap p-3" onClick={() => apply(singleJob.application_url)}>Click to apply</Button>

                        <Row className="py-4">
                            <Col md={8} sm={12}>
                                <Card>
                                    <CardHeader className="py-4 bg-white">Job Details</CardHeader>
                                    <CardBody>
                                        <p dangerouslySetInnerHTML={{ __html: decodeHTML(singleJob.jobDescription) }}></p>
                                        {singleJob.jobQualification && (
                                            <>
                                                <h4>Job Qualifications</h4>
                                                <p dangerouslySetInnerHTML={{ __html: decodeHTML(singleJob.jobQualification) }}></p>
                                            </>
                                        )}
                                        {singleJob.JobAdditionalInfo && (
                                            <>
                                                <h4>Additional Information</h4>
                                                <p dangerouslySetInnerHTML={{ __html: decodeHTML(singleJob.JobAdditionalInfo) }}></p>
                                            </>
                                        )}
                                            <Button className="slider-btn text-nowrap p-3" onClick={() => apply(singleJob.application_url)}>Click to apply</Button>
                                    </CardBody>
                                </Card>
                            </Col>

                  {/* <Col md={4} sm={12} className="bg-light job-detail-side p-4">
                                <h3>Similar Jobs</h3>
                                <div className="jobs mt-3">
                                    <h4>COMMUNICATION SPECIALIST- PEOPLE CHANGE MANAGEMENT (HYBRID)</h4>
                                    <div className="text-muted job-below py-2">
                                        <span><i className="bi bi-clock-fill text-black"></i> Apr, 1st 2024</span>
                                        <span className="mx-2"><i className="bi bi-folder-fill spicon"></i> <span className="sptext">Fake it</span></span>
                                        <span><i className="bi bi-geo-alt-fill spicon"></i> <span className="sptext">Iran</span></span>
                                        <span className="mx-2"><i className="bi bi-tag-fill text-black"></i> Contract</span>
                                        <span className="mx-2"><i className="bi bi-briefcase-fill text-black"></i> Indigenous</span>
                                        <span className="mx-2"><i className="bi bi-cash text-black"></i> $30 - $80 per Month</span>
                                    </div>
                                </div>
                            </Col> */}
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </Layout>
    );
};

export default SingleJob;