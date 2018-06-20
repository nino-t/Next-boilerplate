import redirect from "./redirect"
import { setCookie, getCookie, removeCookie } from "./session"
import { authenticate } from "../services/authApi"
import { createUser } from "../services/userApi"
import { validateCredentials, validateNewUser } from "./validation"

export const signIn = async (email, password) => {
  const error = validateCredentials(email, password)
  if (error) {
    return error;
  }

  const res = await authenticate(email, password)
  if (!res) {
    return 'Error'
  }

  setCookie("jwt", res);
  redirect("/")
  return null;
};

export const signUp = async (data) => {
  const error = validateNewUser(data)
  if (error) {
    return error
  }

  const res = await createUser(data)

  if (!res.data) {
    return res
  }

  setCookie("success", `${data.name}, your account was created.`)
  redirect("/auth/login")
  return null
};

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie("jwt");
    redirect("/auth/login", ctx);
  }
};

export const getJwt = ctx => {
  return getCookie("jwt", ctx.req);
};

export const isAuthenticated = ctx => !!getJwt(ctx);

export const redirectIfAuthenticated = ctx => {
  if (isAuthenticated(ctx)) {
    redirect("/", ctx);
    return true;
  }
  return false;
};

export const redirectIfNotAuthenticated = ctx => {
  if (!isAuthenticated(ctx)) {
    redirect("/auth/login", ctx);
    return true;
  }
  return false;
};
