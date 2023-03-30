import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./footer.module.css";
import { subscribeToKlaviyo } from "./subscribeToKlaviyo";

type FormFields = {
  email: string;
};

const Footer = () => {
  const [errorMessage, setErrorMessage] = useState("default");
  const [successMessage, setSuccessMessage] = useState("default");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as FormFields;

    await subscribeToKlaviyo(data)
      .then((res) => {
        if (res.ok) {
          form.reset();
          setErrorMessage("default");
          setSuccessMessage("You're signed up!");
          setTimeout(() => {
            setSuccessMessage("default");
          }, 5000);
        }
        return res.json();
      })
      .then((err) => {
        if (err.key) {
          setSuccessMessage("default");
          setErrorMessage("Oops! Something went wrong. Try again.");
          //todo
          // switch (err.key) {
          //   case 'GENERAL_ERROR': {
          //     break
          //   }
          //   case 'SAVING_ERROR': {
          //     break
          //   }
          //   default: {
          //   }
          // }
        }
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <p className={styles.heading}>Sign up to Shopstory waitlist</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
            <input
              type="email"
              name="email"
              placeholder="your e-mail"
              required
            />
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div className={styles.formMessages}>
          {errorMessage !== "default" && (
            <p className={styles.formError}>{errorMessage}</p>
          )}
          {successMessage !== "default" && (
            <p className={styles.formSuccess}>{successMessage}</p>
          )}
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© Shopstory demo store 2022</p>
        <p>
          Content credits:{" "}
          <Link href={`https://noo.ma/`} legacyBehavior>
            <a target={"_blank"}>noo.ma</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export { Footer };
