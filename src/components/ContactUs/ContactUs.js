import { Col, Container, Row, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useState } from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import './contactus.scss'

export default function ContactUs() {
    const [serverError, setServerError] = useState(false);
    return (
        <div className="contact-us">
            <div className="background">
            </div>
            <Container>
                <Row>
                    <Col xs={12} md={5} className="py-md-4 pt-4 align-end">
                        <div>
                            <div className="fw-bold align-text-bottom">Get in touch with us</div>
                            <div className="sentences">Lorem ipsum is a placeholder text commonly used to demonstrate:</div>
                            <div>
                                <FontAwesomeIcon className="me-2 text-customRed" icon={faEnvelope} />
                                <Link className="text-white" href="#">info@bonbaz.com</Link>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={7}>
                        <div className="border-for-form">
                            <div className="fs-5 text-customRed mt-2 mb-4">Send a Message for us</div>
                            <Formik
                                initialValues={{ name: '', email: '', message: '' }}
                                onSubmit={(values, { setSubmitting }) => {
                                    fetch('https://www.jeyserver.com/', {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            messsage: values,
                                        }),
                                        headers: {
                                            'Content-type': 'application/json; charset=UTF-8',
                                        },
                                    })
                                        .then((response) => response.json())
                                        .then((data) => {
                                            console.log(data);
                                        })
                                        .catch(() => {
                                            setServerError(true);
                                        })
                                        .finally(() => {
                                            setSubmitting(false)
                                        });
                                }}
                                validationSchema={Yup.object({
                                    name: Yup.string()
                                        .max(15, 'Must be 15 characters or less')
                                        .required('Name is required'),
                                    email: Yup.string()
                                        .email('Invalid email address')
                                        .required('Email is required'),
                                    message: Yup.string()
                                        .required('Message is required')
                                })}
                            >
                                {(formik, isSubmitting) => (
                                    <Form>
                                        <div className="form-group">
                                            <label className="mb-1" htmlFor="name">Name:</label>
                                            <Field name="name" className={(formik.touched.name && formik.errors.name) ? 'form-control is-invalid' : 'form-control'} type="text" />
                                            {formik.touched.name && formik.errors.name ? (
                                                <div className="invalid-feedback">{formik.errors.name}</div>
                                            ) : null}
                                        </div>

                                        <div className="mt-3 form-group">
                                            <label className="mb-1" htmlFor="email">Email:</label>
                                            <Field name="email" className={(formik.touched.email && formik.errors.email) ? 'form-control is-invalid' : 'form-control'} type="email" />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div className="invalid-feedback">{formik.errors.email}</div>
                                            ) : null}
                                        </div>
                                        <div className="mt-3 form-group">
                                            <label className="mb-1" htmlFor="message">Your Message:</label>
                                            <Field name="message" className={(formik.touched.message && formik.errors.message) ? 'form-control is-invalid' : 'form-control'} as="textarea" rows={2} />
                                            {formik.touched.message && formik.errors.message ? (
                                                <div className="invalid-feedback">{formik.errors.message}</div>
                                            ) : null}
                                        </div>

                                        <div className="mt-4 mb-4 form-group d-grid gap-2">
                                            <button type="submit" className="btn btn-primary bg-customGreen fw-bold rounded-3" disabled={isSubmitting}><FontAwesomeIcon className="me-2" icon={faPaperPlane} />{isSubmitting ? "Please wait..." : "Send Message"}</button>
                                        </div>
                                    </Form>
                                )
                                }
                            </Formik >
                            {serverError && <Alert className="bg-customRed white  text-center">
                                Server dosn't response.Try again.
                            </Alert>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}