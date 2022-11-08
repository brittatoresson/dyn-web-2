function errorHandling(error: number) {
  let errorMsg = "";
  if (error == 400) {
    errorMsg = "Bad request";
  } else if (error == 401) {
    errorMsg = "Unauthorized";
  } else if (error == 404) {
    errorMsg = "Page not found, please try again";
  } else if (error == 500) {
    errorMsg = "Can't connect to server ";
  } else {
    errorMsg = "Oops something went wrong, please try again";
  }

  return errorMsg;
}

export default errorHandling;
