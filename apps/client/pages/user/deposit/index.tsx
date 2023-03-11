import { ReactElement } from "react";

import DepositPage from '../../../screens/deposit'
import Layout from '../../../components/molecules/Layout'
import withSession from "../../withSession";

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
        <DepositPage />
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
