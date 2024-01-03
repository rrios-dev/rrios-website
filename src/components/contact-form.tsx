import { useForm } from "@formspree/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import "./contact-form.scss";

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  content: yup.string().required(),
});

const INITIAL_VALUES: yup.InferType<typeof validationSchema> = {
  email: "",
  name: "",
  content: "",
};

interface ContactFormProps {
  translations: {
    title: string;
    email: {
      placeholder: string;
      error: string;
    },
    name: {
      placeholder: string;
      error: string;
    },
    content: {
      placeholder: string;
      error: string;
    },
    error: string;
    success: string;
    submit: string;
  }
}

const ContactForm = ({ translations }: ContactFormProps) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [, handleSubmit] = useForm('mnqkplnq');


  if(success) return <div className="success-container">
    <p>{translations.success}</p>
    <p>🙂</p>
  </div>

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setError(false);
          setSubmitting(true);
          await handleSubmit(values)
          setSubmitting(false);
          setSuccess(true);
        } catch (_) {
          setError(true);
        }
      }}
      validationSchema={validationSchema}
    >
      {({ errors, submitCount, isSubmitting }) => {
        const hasSubmitted = submitCount > 0;
        return (
          <Form className="contact-form" noValidate>
            <h1>{translations.title} 👨🏻‍💻</h1>
            <fieldset>
              <Field
                data-error={Boolean(errors.email) &&  hasSubmitted}
                required
                autoComplete="email"
                name="email"
                type="email"
                placeholder={translations.email.placeholder}
              />
              {hasSubmitted && errors.email && <p className="error">{translations.email.error}</p>}
            </fieldset>
            <fieldset>
              <Field
                data-error={Boolean(errors.name) && hasSubmitted}
                required
                autoComplete="given-name"
                name="name"
                placeholder={translations.name.placeholder}
              />
              {hasSubmitted && errors.name && <p className="error">{translations.name.error}</p>}
            </fieldset>
            <fieldset>
              <Field
                data-error={Boolean(errors.content) && hasSubmitted}
                required
                as="textarea"
                name="content"
                placeholder={translations.content.placeholder}
                rows={11}
              />
              {hasSubmitted && errors.content && <p className="error">{translations.content.error}</p>}
            </fieldset>
            {error && <p className="error">{translations.error}</p>}
            <button disabled={isSubmitting} type="submit">{isSubmitting ? <span className="spinner" /> : translations.submit}</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContactForm;
