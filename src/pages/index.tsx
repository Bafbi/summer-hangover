import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from '../styles/customAuth.module.css';

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (router.query.showPopup) {
      setPopupMessage(router.query.message as string);
      setPopupType(router.query.type as 'success' | 'error');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        router.replace('/', undefined, { shallow: true });
      }, 3000);
    }
  }, [router.query]);

  useEffect(() => {
    if (sessionData) {
      void router.push("/g");
    }
  }, [sessionData, router]);

  const handleSignIn = () => {
    void signIn(undefined, { callbackUrl: "/g" });
  };

  return (
    <>
      <Head>
        <title>Summer Hangover</title>
        <meta name="description" content="Summer TRIP" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#1E5552]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Image
            className=""
            src={"/logo.png"}
            alt="User Logo"
            width={600}
            height={600}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase onSignIn={handleSignIn} />
          </div>
        </div>
      </main>
      {showPopup && (
        <div className={`${styles.popup} ${popupType === 'success' ? styles.success : styles.error}`}>
          {popupMessage}
        </div>
      )}
    </>
  );
};

export default Home;

type AuthShowcaseProps = {
  onSignIn: () => void;
};

const AuthShowcase: React.FC<AuthShowcaseProps> = ({ onSignIn }) => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Bienvenue {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : onSignIn}
      >
        {sessionData ? "Se déconnecter" : "Se connecter"}
      </button>
    </div>
  );
};
