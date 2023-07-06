import { HomePage } from "page_components/HomePage/HomePage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { pageHelper, userTypeHelper } from 'helpers/pages.helper';

function Home(): JSX.Element {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('light');
  const [userType, setUserType] = useState<'customer' | 'executor' | 'admin'>('customer');

  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    pageHelper(router, setIsAuth, setTheme);
    userTypeHelper(setUserType);
    let id = localStorage.getItem('user_id');

    if (id) {
      setUserId(id);
    }
  }, [router]);

  if (isAuth) {
    return (
      <>
        <HomePage theme={theme} userType={userType} userId={userId} />
      </>
    );
  } else {
    return (
      <></>
    );
  }
}

export default Home;