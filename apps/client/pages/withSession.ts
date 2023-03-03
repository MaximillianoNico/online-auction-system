const withSession = (gssp) => (context) => {
  const { req, res, resolvedUrl } = context;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const authCookies = req.cookies['tkn']
  const isAuthPage = resolvedUrl === '/sign-in' || resolvedUrl === '/register';

  if (!authCookies && !isAuthPage) {
    return {
      redirect: {
        destination: "/sign-in",
        statusCode: 302
      }
    }
  }

  if (isAuthPage && authCookies) {
    return {
      redirect: {
        destination: "/products",
        statusCode: 302
      }
    }
  }

  return gssp(context);
}

export default withSession;
