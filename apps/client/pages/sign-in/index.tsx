import LoginPage from '../../screens/signin'
import withSession from "../withSession";

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
        <LoginPage />
      </div>
    </div>
  )
}

export default Page;
