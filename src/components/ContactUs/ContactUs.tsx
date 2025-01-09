import { Col, Container, Row, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import './contactus.scss'

interface FormValues {
    name: string,
    email: string,
    message: string
}

const InnerForm = (props: FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, status } = props;
    return (
        <Form>
            <div className="form-group">
                <label className="mb-1" htmlFor="name">Name:</label>
                <Field name="name" className={(touched.name && errors.name) ? 'form-control is-invalid' : 'form-control'} type="text" />
                {touched.name && errors.name ? (
                    <div className="invalid-feedback">{errors.name}</div>
                ) : null}
            </div>

            <div className="mt-3 form-group">
                <label className="mb-1" htmlFor="email">Email:</label>
                <Field name="email" className={(touched.email && errors.email) ? 'form-control is-invalid' : 'form-control'} type="email" />
                {touched.email && errors.email ? (
                    <div className="invalid-feedback">{errors.email}</div>
                ) : null}
            </div>
            <div className="mt-3 form-group">
                <label className="mb-1" htmlFor="message">Your Message:</label>
                <Field name="message" className={(touched.message && errors.message) ? 'form-control is-invalid' : 'form-control'} as="textarea" rows={2} />
                {touched.message && errors.message ? (
                    <div className="invalid-feedback">{errors.message}</div>
                ) : null}
            </div>
            <div className="mt-4 mb-4 form-group d-grid gap-2">
                <button type="submit" className="btn btn-primary bg-customGreen fw-bold rounded-3" disabled={isSubmitting}><FontAwesomeIcon className="me-2" icon={faPaperPlane} />{isSubmitting ? "Please wait..." : "Send Message"}</button>
            </div>
            {status === 'serverError' && <Alert className="bg-customRed white  text-center">
                Server dosn't response.Try again.
            </Alert>}
        </Form>
    );
};

interface MyFormProps {
    initialName?: string;
    initialEmail?: string;
    initialMessage?: string;
}

const MyForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: props => {
        return {
            name: props.initialName || '',
            email: props.initialEmail || '',
            message: props.initialMessage || ''
        };
    },

    validate: (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};
        if (!values.name) {
            errors.name = 'Name Required';
        }
        else if (values.name.length > 15) {
            errors.name = 'Name must be less than 15 character';
        }
        if (!values.email) {
            errors.email = 'Email Required';
        }
        else if (!isValidEmail(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.message) {
            errors.message = 'Email Required';
        }
        return errors;
    },

    handleSubmit: (values, { setSubmitting, setStatus }) => {
        setSubmitting(true);
        fetch('https://www.jeyserver.com/', {
            method: 'POST',
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                messsage: values.message,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },

        })
            .then((response) => console.log(response.json()))
            .catch((e) => {
                setTimeout(() => {
                    setStatus('serverError')
                }, 2000)
            })
            .finally(() => {
                setTimeout(() => {
                    setSubmitting(false);
                }, 2000)
            });
    },
})(InnerForm);

function isValidEmail(email: string): boolean {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return expression.test(email)

}
export default function ContactUs() {
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
                                <Link className="text-white" to="#">info@bonbaz.com</Link>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={7}>
                        <div className="border-for-form">
                            <div className="fs-5 text-customRed mt-2 mb-4">Send a Message for us</div>
                            <MyForm />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}