import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/customAuth.module.css';
import axios from 'axios';

interface Provider {
  id: string;
  name: string;
}

interface SignInProps {
  providers: Record<string, Provider>;
}

export default function SignIn({ providers }: SignInProps) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    description: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await axios.post('/api/auth/signup', formData);
      router.push({
        pathname: '/',
        query: {
          showPopup: 'true',
          message: 'Vous êtes bien inscrit',
          type: 'success',
        },
      });
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  const handleSignInSummer = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        console.error('Error logging in user', result.error);
      } else {
        console.log('User logged in successfully');
        // Redirect to a page if needed
      }
    } catch (error) {
      console.error('Error logging in user', error);
    }
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
            <input type="text" name="firstName" placeholder="Prénom" required className={styles.customInput} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Nom" required className={styles.customInput} onChange={handleChange} />
            <input type="number" name="age" placeholder="Âge" required className={styles.customInput} onChange={handleChange} />
            <textarea name="description" placeholder="Description" required className={styles.customInput} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required className={styles.customInput} onChange={handleChange} />
            <input type="password" name="password" placeholder="Mot de passe" required className={styles.customInput} onChange={handleChange} />
            <button type="submit" className={styles.customFormButton}>S'inscrire avec Summer</button>
            <button type="button" className={styles.customLinkButton} onClick={() => setShowSignUp(false)}>Déjà un compte? Se connecter</button>
          </form>
        </div>
      ) : (
        <>
          <div className={styles.customFormContainer}>
            <form onSubmit={handleSignInSummer}>
              <h2 className={styles.customHeader}>Connexion avec Summer</h2>
              <input type="email" name="email" placeholder="Email" required className={styles.customInput} onChange={handleChange} />
              <input type="password" name="password" placeholder="Mot de passe" required className={styles.customInput} onChange={handleChange} />
              <button type="submit" className={styles.customFormButton}>Se connecter avec Summer</button>
              <button type="button" className={styles.customLinkButton} onClick={() => setShowSignUp(true)}>Pas de compte? S'inscrire</button>
            </form>
          </div>
          {Object.values(providers).map((provider) => {
            if (provider.id === 'credentials') return null; // Exclude credentials provider from rendering as a button
            return (
              <button
                key={provider.name}
                className={styles.providerButton}
                style={{ maxWidth: '320px' }} // Same width as the form container
                onClick={() => signIn(provider.id)}
              >
                {`Se connecter avec ${provider.name}`}
              </button>
            );
          })}
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
