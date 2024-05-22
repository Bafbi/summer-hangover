// src/pages/auth/signIn.js
import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";
import styles from "../../styles/customAuth.module.css"; // Utilisez le module CSS

export default function SignIn({ providers }) {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();
    // Ajoutez la logique d'inscription ici
    console.log("Inscription avec Summer");
  };

  const handleSignInSummer = (event) => {
    event.preventDefault();
    // Ajoutez la logique de connexion ici
    console.log("Connexion avec Summer");
  };

  return (
    <div className={styles.customSigninContainer}>
      <div className={styles.customFormContainer}>
        {showSignUp ? (
          <form onSubmit={handleSignUp}>
            <h2 className={styles.customHeader}>Inscription avec Summer</h2>
            <input type="text" placeholder="Prénom" required className={styles.customInput} />
            <input type="text" placeholder="Nom" required className={styles.customInput} />
            <input type="number" placeholder="Âge" required className={styles.customInput} />
            <textarea placeholder="Description" required className={styles.customInput} />
            <input type="file" required className={styles.customFileInput} />
            <input type="email" placeholder="Email" required className={styles.customInput} />
            <input type="password" placeholder="Mot de passe" required className={styles.customInput} />
            <button type="submit" className={styles.customFormButton}>S'inscrire avec Summer</button>
            <button type="button" className={styles.customLinkButton} onClick={() => setShowSignUp(false)}>Déjà un compte? Se connecter</button>
          </form>
        ) : (
          <form onSubmit={handleSignInSummer}>
            <h2 className={styles.customHeader}>Connexion avec Summer</h2>
            <input type="email" placeholder="Email" required className={styles.customInput} />
            <input type="password" placeholder="Mot de passe" required className={styles.customInput} />
            <button type="submit" className={styles.customFormButton}>Se connecter avec Summer</button>
            <button type="button" className={styles.customLinkButton} onClick={() => setShowSignUp(true)}>Pas de compte? S'inscrire</button>
          </form>
        )}
      </div>
      <div className={styles.customFormContainer}>
        <h2 className={styles.customHeader}>Se connecter avec</h2>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className={styles.customFormButton}
              onClick={() => signIn(provider.id)}
            >
              {`Se connecter avec ${provider.name}`}
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
