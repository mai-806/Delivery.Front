import { ProfilePage } from "page_components/ProfilePage/ProfilePage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { pageHelper, userTypeHelper } from "helpers/pages.helper";
import { setLocale } from "helpers/locale.helper";


function Profile(): JSX.Element {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('light');
  const [userType, setUserType] = useState<'customer' | 'executor' | 'admin'>('customer');

  useEffect(() => {
    pageHelper(router, setIsAuth, setTheme);
    userTypeHelper(setUserType);
  }, [router]);

  if (isAuth) {
    return (
      <>
        <Head>
          <title>{process.env.NEXT_PUBLIC_TITLE + ' - ' + setLocale(router.locale).profile}</title>
        </Head>
        <ProfilePage theme={theme} userType={userType} />
      </>
    );
  } else {
    return (
      <></>
    );
  }
}

export default Profile;