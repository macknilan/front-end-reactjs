export const stateToQueryString = (object) => {
    let dataString = '';
    for (const key of Object.keys(object)) {
      if (object[key] != null) {
        dataString += key + '=' + encodeURIComponent(object[key]) + '&';
      }
    }
    return dataString.substring(0, dataString.length - 1);
};