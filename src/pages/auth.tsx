import { AuthPage } from "page_components/AuthPage/AuthPage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { pageHelper } from "helpers/pages.helper";


function Auth(): JSX.Element {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    pageHelper(router, setIsAuth);
  }, [router]);

  if (!isAuth) {
    return (
      <>
        <Head>
          <title>Auth</title>
        </Head>
        <AuthPage />
      </>
    );
  } else {
    return (
      <></>
    );
  }
}

export default Auth;