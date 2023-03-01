import { ReactElement } from "react";

import Layout from '../../components/molecules/Layout'
import withSession from "../withSession";
import ProductPage from "../../screens/products"

export const getServerSideProps = withSession(
  async () => {
    return {
      props: {}
    }
  }
);

const Page = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <ProductPage />
      </div>
    </div>
  )
}


Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}


export default Page;
