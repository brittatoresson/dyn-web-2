//DENNA NYCKEL BEHÖVER UPPDATERAS FÖR ATT FUNGERA, HÄMTA HÄR https://developer.spotify.com/console/get-search-item/
//https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

export const token =
  "BQBwJz5n-mm2jMkHvcAH3X4qqPmh6urZsQ43sVbxKLkKkcRnWArrCpTTf2Bnk8g7A88kyQYMLde1wFSrodYNLXHFOUd5QtztxnXNEo_-D8Lfomkv1VOR6YM78K3-87V7WrBtfY0sPXU_7GN615hD8EjIs_jIN_RLjbxJUBk0nxBWvAsvXdeHoZWYS7eFyZTSvnN-5OaV";

export const options = {
  method: "GET",
  headers: {
    Authorization: `"Bearer ${token}"`,
  },
};
