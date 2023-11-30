import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../api/api";

export function loginLoader({ request }) {
  const url = new URL(request.url);
  const message = url.searchParams.get("message");
  return message;
}

export async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/"

  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    const response = redirect(pathname);
    response.body = true;
    return response;
  } catch (error) {
    return error.message;
  }
}

export default function Login() {
  const error = useActionData();
  const message = useLoaderData();
  const navigation = useNavigation();
  return (
    <>
      <div className="row mt-5 ">
        <div
          className="col-lg-4 offset-4 border p-5
        "
        >
          <h2>Login to Continue..</h2>
          <Form replace method="post">
            <div className="mt-3">
              <label htmlFor="">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control "
                id=""
              />
            </div>

            <div className="mt-3">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                className="form-control "
                id="password"
              />
            </div>

            <div className="mt-3">
              <button className="btn btn-sm  btn-primary" disabled={navigation.state==="submitting"}>{navigation.state === "submitting"? "Signing In":"Log in"}</button>
            </div>

            <div className="mt-3 text-danger ">
              {error && <div className="alert alert-danger ">{error}</div>}
              {message && <div className="alert alert-danger ">{message}</div>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
