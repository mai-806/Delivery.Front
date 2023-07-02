import { IndexPage } from "page_components/IndexPage/IndexPage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { indexPageHelper } from 'helpers/pages.helper';

function Index(): JSX.Element {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean>(true);

  useEffect(() => {
    indexPageHelper(router, setIsAuth);
  }, [router]);

  if (!isAuth) {
    return (
      <IndexPage />
    );
  } else {
    return (
      <></>
    );
  }
}

export default Index;

