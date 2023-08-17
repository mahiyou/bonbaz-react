import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './footer.scss'

function Footer() {
    return (
        <div className='footer-style'>
            <Row className="bg-primary mt-4 py-3">
                <Col className="text-center my-auto" xs={2}>
                    <FontAwesomeIcon icon={faCircle} size="2xs"/>
                    <a className="text-white text-decoration-none ms-2" href="#prices">Prices</a>
                </Col>
                <Col className="text-center my-auto" xs={2}>
                    <FontAwesomeIcon icon={faCircle} size="2xs"/>
                    <a className="text-white text-decoration-none ms-2" href="#archive">Archive</a>
                </Col>
                <Col className="text-center" xs={4}>
                    <a href="/">
                        <img
                            src="/imgs/navbar-icon.svg"
                            width="220"
                            alt="React Bootstrap logo"
                        />
                    </a>
                    <div className="align-middle text-white fs-6"><span className='text-customGreen'>Free</span> <span className='text-customRed'>API</span> for iranian Rial rates</div>
                </Col>
                <Col className="text-center my-auto" xs={2}>
                    <FontAwesomeIcon icon={faCircle} size="2xs"/>
                    <a className="text-white text-decoration-none ms-2" href="#graph">Graph</a>
                </Col>
                <Col className="text-center my-auto" xs={2}>
                    <FontAwesomeIcon icon={faCircle} size="2xs"/>
                    <a className="text-white text-decoration-none ms-2" href="#contact-us">Contact us</a>
                </Col>
            </Row>
            <div className="text-center footer-sentence mt-2">&copy; 2023 Bonbaz.com all rights reserved.</div>
        </div>
    );
}
export default Footer;