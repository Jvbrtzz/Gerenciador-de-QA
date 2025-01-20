import { navigateToLogin } from "./redirectHome";

function deleteToken() {  

  localStorage.removeItem("accessToken");

  console.log("Token deletado com sucesso.");
  navigateToLogin()
  return true;
}

export default deleteToken;
