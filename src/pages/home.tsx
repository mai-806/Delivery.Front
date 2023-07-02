import { HomePage } from "page_components/HomePage/HomePage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { pageHelper } from 'helpers/pages.helper';

function Home(): JSX.Element {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    pageHelper(router, setIsAuth, setTheme);
  }, [router]);

  if (isAuth) {
    return (
      <>
        <HomePage theme={theme} />
      </>
    );
  } else {
    return (
      <></>
    );
  }
}

export default Home;