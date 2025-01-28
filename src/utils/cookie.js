const setCookie = (name, value) => {
  const maxAge = 30 * 24 * 60 * 60;
  document.cookie = `${name} = ${value}; max-age=${maxAge} path=/`;
};
function getCookie(name) {
  const value = `; ${document?.cookie}`;
  const parts = value?.split(`; ${name}=`);
  if (parts?.length === 2) return parts?.pop()?.split(";")?.shift();
}

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};
export { setCookie, getCookie, deleteCookie };
