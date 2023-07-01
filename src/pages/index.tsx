import { pageHelper } from "helpers/pages.helper";
import { useRouter } from "next/router";
import { HomePage } from "page_components/HomePage/HomePage";
import { useEffect, useState } from "react";


function Home(): JSX.Element {
  const router = useRouter();
  const [theme, setTheme] = useState<string>('light');

  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    pageHelper(router, setIsAuth);
  }, [router]);

  console.log(isAuth);

  return (
    <HomePage theme={theme} isAuth={isAuth} />
  );
}

export default Home;

