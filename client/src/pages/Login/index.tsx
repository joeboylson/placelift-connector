const { REACT_APP_AUTH_URL_BASE } = process.env;

export default function Login() {
  const redirectTo = window.location.origin;
  return (
    <a href={`${REACT_APP_AUTH_URL_BASE}&redirect_to=${redirectTo}/post-login`}>
      Login
    </a>
  );
}
