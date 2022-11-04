//DENNA NYCKEL BEHÖVER UPPDATERAS FÖR ATT FUNGERA, HÄMTA HÄR https://developer.spotify.com/console/get-search-item/
//https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

export const token =
  "BQBYXV1Dzry3A7ryFvVOjjRX8qT7_7IlvPa8U0RMXEQvdu-dgIowh5HAkFaHZC-6KBz9JO0b1pkz_Ie9hG0oS7o-3FxhcxcGAogH2aSeJAKY25vgBgVc8jyA9HpLX_JfjppqIEmH93re6X5sZD0gqy_9Zc6xPHbIG6-rPngSE_lyILuHqurW6X6nK5aXJ4UgTzllspceZI0kor5ukdQ8qgqVG_qobYWLWKw";

export const options = {
  method: "GET",
  headers: {
    Authorization: `"Bearer ${token}"`,
  },
};
