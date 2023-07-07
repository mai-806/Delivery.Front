import { ProfilePage } from "page_components/ProfilePage/ProfilePage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { pageHelper, userTypeHelper } from "helpers/pages.helper";
import { setLocale } from "helpers/locale.helper";
import axios from "axios";


function Profile(): JSX.Element {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('light');
  const [userType, setUserType] = useState<'customer' | 'executor' | 'admin'>('customer');

  const [userId, setUserId] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    pageHelper(router, setIsAuth, setTheme);
    userTypeHelper(setUserType);
    let id = localStorage.getItem('user_id');

    if (id) {
      setUserId(id);
    }
  }, [router]);

  if (userId) {
    let user = axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/v1/user/?id=' + userId);

    user.then((response) => {
      setUsername(response.data.login);
    });
  }

  if (isAuth) {
    return (
      <>
        <Head>
          <title>{process.env.NEXT_PUBLIC_TITLE + ' - ' + setLocale(router.locale).profile}</title>
        </Head>
        <ProfilePage theme={theme} userType={userType} userId={userId} username={username} />
      </>
    );
  } else {
    return (
      <></>
    );
  }
}

export default Profile;