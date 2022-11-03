//DENNA NYCKEL BEHÖVER UPPDATERAS FÖR ATT FUNGERA, HÄMTA HÄR https://developer.spotify.com/console/get-search-item/

export const token =
  "BQAjx-RSeQkQ0G7v3RWHtnPFhGIEAFKzTwKE5l1-POfMuzWojJppDBJQGEISrfs2jZjSZakqlyfHvt1xRup5E-yJyr9aO0MxnU6MbSlcRMGUUOicM2TZAjYu9QyTtDqT4KjDcMGz1SMglDjgsxeShjhcq_I_Sm4_Z64hfuUGjMB7pLE_j7uSdofb5XFN4IsmxwybcU76";

export const options = {
  method: "GET",
  headers: {
    Authorization: `"Bearer ${token}"`,
  },
};
