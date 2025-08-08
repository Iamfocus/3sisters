import {Col, Container, Row} from "react-bootstrap";

const Slider = () => {
    return (
        <div className="sliders">
            <Container>
                <Row>
                    <Col md={6} sm={12} className="py-5 mt-5">
                        <div className="slider-text">
                             <h2>Your Next Career Move<br/> Starts Here!</h2>
                        </div>

                    </Col>
                </Row>


            </Container>

        </div>
    );
};

export default Slider;