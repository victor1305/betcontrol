export const checkLoginPage = (pathname: string) => /^\/login.*/.test(pathname);
export const checkVerifyTokenPage = (pathname: string) => /^\/verify-token.*/.test(pathname);
export const checkConfirmEmailPage = (pathname: string) => /^\/confirm-email.*/.test(pathname);
