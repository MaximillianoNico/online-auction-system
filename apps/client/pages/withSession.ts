const withSession = (gssp) => (context) => {
  const { req, res } = context;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const authCookies = req.cookies['tkn']

  if (!authCookies) {
    return {
      redirect: {
        destination: "/sign-in",
        statusCode: 302
      }
    }
  }

  return gssp(context);
}

export default withSession;
