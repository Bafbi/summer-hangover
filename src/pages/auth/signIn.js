// src/pages/auth/signIn.js
import { getProviders, signIn } from "next-auth/react";
import styles from "../../styles/customAuth.module.css"; // Utilisez le module CSS

export default function SignIn({ providers }) {
  return (
    <div className={styles.customSigninContainer}>
      <div className={styles.customSigninForm}>
        <h1>Sign in to Your Account</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className={styles.customSigninButton}
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className={styles.customSigninButton}>
            Sign in with Email
          </button>
        </form>
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
