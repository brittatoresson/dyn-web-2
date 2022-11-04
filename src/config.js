//DENNA NYCKEL BEHÖVER UPPDATERAS FÖR ATT FUNGERA, HÄMTA HÄR https://developer.spotify.com/console/get-search-item/

export const token =
  "BQC2cgw803WfEiez5olQE-eX_ByIKZQDTIbHOqJNfZnDPSPbH-v9ZXlOKX3NbN_xAVGHvM6h9O3hTICMYgGQbj0bE7Nxqeehzop2MSvNwE5cDQ0CxyAOFm0mP_ShTwZzqBW0bIXU-MH7YCteDMXMid3JaEcmXeuH9y9UpUZAuSrho_E3wQAEfBMlyYrORQTa5Fn2xhbJ";

export const options = {
  method: "GET",
  headers: {
    Authorization: `"Bearer ${token}"`,
  },
};
