import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.scss'

function BasicExample() {
	return (
		<Navbar collapseOnSelect expand="lg" bg="primary" className="py-0">
			<Container className='navbar-style'>
				<Navbar.Brand >
					<a href="/">
						<img
							src="/imgs/navbar-icon.svg"
							width="220"
							alt="React Bootstrap logo"
						/>
					</a>
					<span className="align-middle ms-4 text-white fs-6 nav-sentences"><span className='text-customGreen'>Free</span> <span className='text-customRed'>API</span> for iranian Rial rates</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse className="justify-content-end">
					<Nav>
						<Nav.Link className="text-decoration-none" href="/"><div className="triangle-left" />Home</Nav.Link>
						<Nav.Link className="text-decoration-none ms-lg-5" href="/archive"><div className="triangle-left" />Archive</Nav.Link>
						<Nav.Link className="text-decoration-none ms-lg-5" href="/graph"><div className="triangle-left" />Graph</Nav.Link>
						<Nav.Link className="text-decoration-none ms-lg-5" href="/contact-us"><div className="triangle-left" />Contact us</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default BasicExample;
