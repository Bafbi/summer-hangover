// src/pages/auth/SignIn.tsx
import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { useState, FormEvent } from 'react';
import Image from 'next/image';
import styles from '../../styles/customAuth.module.css';

interface Provider {
  id: string;
  name: string;
}

interface SignInProps {
  providers: Record<string, Provider>;
}

export default function SignIn({ providers }: SignInProps) {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUp = (event: FormEvent) => {
    event.preventDefault();
    // Ajoutez la logique d'inscription ici
    console.log('Inscription avec Summer');
  };

  const handleSignInSummer = (event: FormEvent) => {
    event.preventDefault();
    // Ajoutez la logique de connexion ici
    console.log('Connexion avec Summer');
  };

  return (
    <div className={styles.customSigninContainer}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logoImage}
          src="/logo.png"
          alt="User Logo"
          width={600}
          height={600}
        />
        <div className={styles.logoSeparator}></div>
      </div>
      {showSignUp ? (
        <div className={styles.customFormContainer}>
          <form onSubmit={handleSignUp}>
            <h2 className={styles.customHeader}>Inscription avec Summer</h2>
            <input type="text" placeholder="Prénom" required className={styles.customInput} />
            <input type="text" placeholder="Nom" required className={styles.customInput} />
            <input type="number" placeholder="Âge" required className={styles.customInput} />
            <textarea placeholder="Description" required className={styles.customInput} />
            <input type="file" placeholder="files" required className={styles.customFileInput} />
            <input type="email" placeholder="Email" required className={styles.customInput} />
            <input type="password" placeholder="Mot de passe" required className={styles.customInput} />
            <button type="submit" className={styles.customFormButton}>S'inscrire avec Summer</button>
            <button type="button" className={styles.customLinkButton} onClick={() => setShowSignUp(false)}>Déjà un compte? Se connecter</button>
          </form>
        </div>
      ) : (
        <>
          <div className={styles.customFormContainer}>
            <form onSubmit={handleSignInSummer}>
              <h2 className={styles.customHeader}>Connexion avec Summer</h2>
              <input type="email" placeholder="Email" required className={styles.customInput} />
              <input type="password" placeholder="Mot de passe" required className={styles.customInput} />
              <button type="submit" className={styles.customFormButton}>Se connecter avec Summer</button>
              <button type="button" className={styles.customLinkButton} onClick={() => setShowSignUp(true)}>Pas de compte? S'inscrire</button>
            </form>
          </div>
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              className={styles.providerButton}
              style={{ maxWidth: '320px' }} // Même largeur que le conteneur de formulaire
              onClick={() => signIn(provider.id)}
            >
              {`Se connecter avec ${provider.name}`}
            </button>
          ))}
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
