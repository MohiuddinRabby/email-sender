import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { sendEmail } from "./Api";
// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("User Name required"),
  email: Yup.string().email().required("Email required"),
  subject: Yup.string().required("Subject required"),
  message: Yup.string().required("Message required"),
});
const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const App = () => {
  return (
    <header id="home-section">
      <ToastContainer />
      <div className="home-inner container">
        <div className="row">
          <div className="col-lg-7">
            <div className="d-flex">
              <div className="p-4 align-self-end">
                <h1>Send Your Message</h1>
                <h5>We'll get back to you soon</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card bg-primary card-form">
              <div className="card-body">
                <h4>Please fill out this form to query</h4>
                <>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      const userData = {
                        service_id: process.env.REACT_APP_SERVICE_ID,
                        template_id: process.env.REACT_APP_TEMPLATE_ID,
                        user_id: process.env.REACT_APP_USER_ID,
                        template_params: {
                          name: values?.name,
                          email: values?.email,
                          subject: values?.subject,
                          message: values?.message,
                        },
                      };
                      sendEmail(userData);
                      resetForm();
                    }}
                  >
                    {({
                      handleSubmit,
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      isValid,
                    }) => (
                      <>
                        <Form>
                          <div className="col-lg-12 py-2">
                            <label>Name</label>
                            <Field
                              className="form-control"
                              name="name"
                              placeholder="Your Name"
                              value={values?.name}
                            />
                            <div className="text-warning">
                              <ErrorMessage name="name" />
                            </div>
                          </div>
                          <div className="col-lg-12 py-2">
                            <label>Email</label>
                            <Field
                              className="form-control"
                              name="email"
                              placeholder="Your Email"
                              value={values?.email}
                            />
                            <div className="text-warning">
                              <ErrorMessage name="email" />
                            </div>
                          </div>
                          <div className="col-lg-12 py-2">
                            <label>Subject</label>
                            <Field
                              className="form-control"
                              name="subject"
                              placeholder="Subject"
                              value={values?.subject}
                            />
                            <div className="text-warning">
                              <ErrorMessage name="subject" />
                            </div>
                          </div>
                          <div className="col-lg-12 py-2">
                            <label>Message</label>
                            <Field
                              className="form-control"
                              component="textarea"
                              name="message"
                              placeholder="User Message"
                              value={values?.message}
                            />
                            <div className="text-warning">
                              <ErrorMessage name="message" />
                            </div>
                          </div>
                          <div className="col-lg-12 py-2">
                            <button
                              type="submit"
                              className="btn btn-warning btn-sm"
                            >
                              Send
                            </button>
                          </div>
                        </Form>
                      </>
                    )}
                  </Formik>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default App;
