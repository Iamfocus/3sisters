import { Container, Row, Col, Form } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#708A45', color: '#fff', paddingTop: '60px' }}>
            <Container>
                <Row className="pb-5 py-5">
                    {/* Column 1: Logo + Message + Email */}
                    <Col md={4} className="mb-4">
                        <img
                            src="/images/threesisterslogo.svg" // replace with actual logo path
                            alt="Three Sisters Consulting"
                            style={{ width: '120px', marginBottom: '20px' }}
                        />
                        <p>We delivering innovative solutions that drive sustainable growth and success for you</p>
                        <Form className="footer-form">
                            <div className="input-group w-100">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="form-control  bg-transparent border-end-0"
                                />
                                <span className="input-group-text bg-transparent p-0 border-start-0">
                                     <img
                                         src="/images/Button.png"
                                         alt="Submit"

                                     />
                                </span>


                            </div>
                        </Form>


                    </Col>

                    {/* Column 2: Quick Links */}
                    <Col md={2} className="mb-4 quick-link">
                        <h5><strong>Quick links</strong></h5>
                        <ul className="list-unstyled mt-3">
                            <li><a href="https://threesistersconsulting.com/who-we-are/" className="text-decoration-none text-light">Our Story</a></li>
                            <li><a href="https://threesistersconsulting.com/our-services/" className="text-decoration-none text-light">Our Services</a></li>
                            <li><a href="https://threesistersconsulting.com/meet-the-team/" className="text-decoration-none text-light">Our Team</a></li>
                            <li><a href="https://threesistersconsulting.com/delivered-projects/" className="text-decoration-none text-light">Delivered Projects</a></li>
                        </ul>
                    </Col>

                    {/* Column 3: Services */}
                    <Col md={3} className="mb-4 services">
                        <h5><strong>Services</strong></h5>
                        <ul className="list-unstyled mt-3">
                             <li><a href="https://threesistersconsulting.com/service/facilitation-engagement/" className="text-decoration-none text-light">&raquo; Engagement & Facilitation </a></li>
                             <li><a href="https://threesistersconsulting.com/service/strategic-planning-advisory/" className="text-decoration-none text-light">&raquo; Strategic Planning & Advisory</a></li>
                             <li><a href="https://threesistersconsulting.com/service/training-capacity-building/" className="text-decoration-none text-light">&raquo; Capacity Building</a></li>
                             <li><a href="https://threesistersconsulting.com/service/indigenous-business-support/" className="text-decoration-none text-light">&raquo; Indigenous Business Mentorship</a></li>
                        </ul>
                    </Col>

                    {/* Column 4: Contact Info */}
                    <Col md={3} className="contacts">
                        <h5><strong>Contact Info</strong></h5>
                        <div className="mt-3">
                            <p className="text-light"><strong>Email</strong><br />info@threesistersconsulting.com</p>
                            <p className="text-light"><strong>Phone</strong><br />+1 519 365 3485</p>
                        </div>
                    </Col>

                </Row>

                {/* Bottom Bar */}

            </Container>
<hr />
                <Container>
                    <div className="pt-3 d-flex justify-content-between py-5 footer-final">
                         <span style={{ color: 'rgba(255, 255, 255, 0.8)'}}>
                            Copyright 2025 - Powered by <span style={{ color: '#f7a623' }}>Proinsight</span>
                        </span>
                        <div className="d-flex gap-4" style={{ color: 'rgba(255, 255, 255, 0.8)'}}>
                            <a href="#" className="text-white text-decoration-none">Terms & Condition</a>
                            <a href="#" className="text-white text-decoration-none">Privacy Policy</a>
                        </div>
                    </div>

                </Container>

        </footer>
    );
};

export default Footer;
