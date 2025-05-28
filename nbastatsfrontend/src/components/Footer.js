import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light border-top py-4">
      <Container>
        <Row className="gy-3">
          {/* Branding & copyright */}
          <Col xs={12} md={4} className="text-center text-md-start">
            <p className="mb-1">NBA Statistics Reference</p>
            <small className="text-muted">
              © {new Date().getFullYear()} All rights reserved
            </small>
          </Col>

          {/* Links section */}
          <Col xs={6} md={4} className="text-center text-md-start">
            <h6 className="mb-2">Links</h6>
            <ul className="list-unstyled mb-0">
              <li><div href="#support" className="text-decoration-none">Support</div></li>
              <li><div href="#blog"    className="text-decoration-none">Blog</div></li>
              <li><div href="#affiliates" className="text-decoration-none">Affiliates</div></li>
            </ul>
          </Col>

          {/* Legal section */}
          <Col xs={6} md={4} className="text-center text-md-start">
            <h6 className="mb-2">Legal</h6>
            <ul className="list-unstyled mb-0">
              <li><div href="#terms"   className="text-decoration-none">Terms of Service</div></li>
              <li><div href="#privacy" className="text-decoration-none">Privacy Policy</div></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;