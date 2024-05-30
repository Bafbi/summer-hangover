import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/customAuth.module.css';
import axios from 'axios';
import { Popup } from '../../components/Popup';

interface Provider {
  id: string;
  name: string;
}

interface SignInProps {
  providers: Record<string, Provider>;
}

interface PopupProps {
  message: string;
  type: 'success' | 'error' | null;
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [popup, setPopup] = useState<{ message: string, type: 'success' | null } | null>(null);

  useEffect(() => {
    const showPopupFromStorage = localStorage.getItem('showPopup');
    if (showPopupFromStorage) {
      setPopup({
        message: showPopupFromStorage,
        type: 'success',
      });
      localStorage.removeItem('showPopup');
      setTimeout(() => {
        setPopup(null);
      }, 3000);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      await axios.post('/api/auth/signup', formData);
      router.push('/');
      localStorage.setItem('showPopup', 'Vous êtes bien inscrit');
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMessage('Email déjà inscrit');
      } else {
        setErrorMessage('Erreur lors de l\'inscription');
      }
      console.error('Error registering user', error);
    }
  };

  const handleSignInSummer = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        console.error('Error logging in user', result.error);
        if (result.error === 'Invalid email') {
          setErrorMessage('Email invalide');
        } else if (result.error === 'Invalid password') {
          setErrorMessage('Mot de passe erroné');
        } else {
          setErrorMessage('Erreur de connexion');
        }
      } else {
        console.log('User logged in successfully');
        localStorage.setItem('showPopup', 'Connexion Etablie');
        router.push('/');
      }
    } catch (error) {
      console.error('Error logging in user', error);
      setErrorMessage('Erreur de connexion');
    }
  };

  return (
    <div className={styles.customSigninContainer}>
      
      {popup && (
        <Popup message={popup.message} type={popup.type} />
      )}
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
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
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
              {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
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
                className={`${styles.providerButton} ${styles.maxWidth320}`}
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
