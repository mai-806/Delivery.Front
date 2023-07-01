import { ProfilePage } from "page_components/ProfilePage/ProfilePage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { pageHelper, redirectHelper } from "helpers/pages.helper";


function Profile(): JSX.Element {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    pageHelper(router, setIsAuth);
    redirectHelper(router, 'auth', false);
  }, [router]);

  if (isAuth) {
    return (
      <>
        <Head>
          <title>Profile</title>
        </Head>
        <ProfilePage />
      </>
    );
  } else {
    return (
      <></>
    );
  }
}

export default Profile;