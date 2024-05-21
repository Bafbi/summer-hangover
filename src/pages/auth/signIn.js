// src/pages/auth/signIn.js
import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";
import styles from "../../styles/customAuth.module.css"; // Utilisez le module CSS

export default function SignIn({ providers }) {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();
    // Ajoutez la logique d'inscription ici
    console.log("Sign up with Summer");
  };

  const handleSignInSummer = (event) => {
    event.preventDefault();
    // Ajoutez la logique de connexion ici
    console.log("Sign in with Summer");
  };

  return (
    <div className={styles.customSigninContainer}>
      <div className={styles.customFormContainer}>
        {showSignUp ? (
          <form onSubmit={handleSignUp}>
            <h2>Sign Up with Summer</h2>
            <input type="text" placeholder="First Name" required className={styles.customInput} />
            <input type="text" placeholder="Last Name" required className={styles.customInput} />
            <input type="number" placeholder="Age" required className={styles.customInput} />
            <textarea placeholder="Description" required className={styles.customInput} />
            <input type="file" required className={styles.customFileInput} />
            <input type="email" placeholder="Email" required className={styles.customInput} />
            <input type="password" placeholder="Password" required className={styles.customInput} />
            <button type="submit" className={styles.customFormButton}>Sign Up with Summer</button>
            <button type="button" className={styles.customFormButton} onClick={() => setShowSignUp(false)}>Already have an account? Sign In</button>
          </form>
        ) : (
          <form onSubmit={handleSignInSummer}>
            <h2>Sign In with Summer</h2>
            <input type="email" placeholder="Email" required className={styles.customInput} />
            <input type="password" placeholder="Password" required className={styles.customInput} />
            <button type="submit" className={styles.customFormButton}>Sign In with Summer</button>
            <button type="button" className={styles.customFormButton} onClick={() => setShowSignUp(true)}>Don't have an account? Sign Up</button>
          </form>
        )}
      </div>
      <div className={styles.customFormContainer}>
        <h2>Sign In with</h2>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className={styles.customFormButton}
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
