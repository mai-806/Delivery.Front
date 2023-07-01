import { BasketPage } from "page_components/BasketPage/BasketPage";
import Head from "next/head";


function Basket(): JSX.Element {
    return (
        <>
          <Head>
            <title>Basket</title>
          </Head>
          <BasketPage />
        </>
      );
}

export default Basket;