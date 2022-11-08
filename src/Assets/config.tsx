//DENNA NYCKEL BEHÖVER UPPDATERAS FÖR ATT FUNGERA, HÄMTA HÄR https://developer.spotify.com/console/get-search-item/
//https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
//https://react-spotify-web-playback.gilbarbara.dev/

import { useEffect, useState } from "react";

export let test = async function () {
  const response = await fetch("http://localhost:2000/spotify");
  let hej = (await response.json()) || "no token";
  test = hej;
  return hej;
};

export let token =
  "BQDUvh94u-FPmEDispilhiGeAn1TR18TkkEhi2q7cBAOPchnSZRwYJK3kMigS2LD7WhOXZPBGaPwq2ot8mu0GFZ2iYeT7Jt7SS4SjMpCv-vdK1IIdHc";

export const options = {
  method: "GET",
  headers: {
    Authorization: `"Bearer ${token}"`,
  },
};

// console.log(options);
