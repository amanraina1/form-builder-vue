export const getIdFromUrl = (url) => {
  let urlArray = url.split("/");

  let idArray = urlArray.filter(function (item) {
    return parseInt(item) == item;
  });

  return idArray[idArray.length - 1];
};
