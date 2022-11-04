//DENNA NYCKEL BEHÖVER UPPDATERAS FÖR ATT FUNGERA, HÄMTA HÄR https://developer.spotify.com/console/get-search-item/

export const token =
  "BQADgUd8EcmjM87SJrU2-e9dZO_p-HvZGbUSgpG6zn2BV1ii41VdOY9Ebow9ePcWinUq4zTS83F6LjoLIgJ2cVzJI-jlxeAtF6BrI1UZpkENoErogN0SIZzLR9vB736wEseg-NTr2ZpXUc92vJIgOpUlLUgivSdMIIfDBwlETeUybQwcQk4oekoGhlRpg3RhMctAlcbh";

export const options = {
  method: "GET",
  headers: {
    Authorization: `"Bearer ${token}"`,
  },
};
