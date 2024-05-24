import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { useState, FormEvent } from 'react';
import Image from 'next/image';
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
    name: '',
    email: '',
    password: '',
    age: '',
    description: '',
    file: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      console.log('User registered successfully', response.data);
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  const handleSignInSummer = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/auth/signin', {
        email: formData.email,
        password: formData.password
      });
      const { token } = response.data;
      console.log('User logged in successfully', token);
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
            <input type="text" name="name" placeholder="Prénom" required className={styles.customInput} onChange={handleChange} />
            <input type="text" name="name" placeholder="Nom" required className={styles.customInput} onChange={handleChange} />
            <input type="number" name="age" placeholder="Âge" required className={styles.customInput} onChange={handleChange} />
            <textarea name="description" placeholder="Description" required className={styles.customInput} onChange={handleChange} />
            <input type="file" name="file" required className={styles.customFileInput} onChange={handleChange} />
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
