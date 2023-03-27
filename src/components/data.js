export function getData(pages, pageName) {
  if(!pageName) return
  let ret = [];
  let pgsData = pages,
    pgData;
  if (typeof pages === "undefined") {
    try {
      pgsData = JSON.parse(sessionStorage.getItem("pgsData"));
      pgData = decodeBase64(pgsData[pageName]);
      ret["content"] = pgData;
      ret["loginType"] = pgsData["type"];
      return ret;
    } catch (error) {
      return false;
    }
  } else {
    ret["content"] = decodeBase64(pages[pageName]);
    ret["loginType"] = pgsData["type"];
    return ret;
  }
}

export function getPageId(pages, pageName) {
  let ret = [];
  let pgsData = pages,
    pgData;
  if (typeof pages === "undefined") {
    try {
      pgsData = JSON.parse(sessionStorage.getItem("pgsData"));
      pgData = decodeBase64(pgsData[pageName]);
      ret["id"] = pgsData["objectId"];
      return ret;
    } catch (error) {
      return false;
    }
  } else {
    ret["content"] = decodeBase64(pages[pageName]);
    ret["id"] = pgsData["objectId"];
    return ret;
  }

}

export function getBoard(pages) {
  let ret = [];
  let pgsData = pages
  if (typeof pages === "undefined") {
    try {
      pgsData = JSON.parse(sessionStorage.getItem("pgsData"));
      ret['name'] = decodeBase64(pgsData['home-name'])
      ret['email'] = decodeBase64(pgsData['home-email'])
      return ret;
    } catch (error) {
      return false;
    }
  } else {
    ret['name'] = decodeBase64(pages['home-name'])
    ret['email'] = decodeBase64(pages['home-email'])
    return ret;
  }
}

export function getLogin(pages) {
  let pgsData = pages
  if (typeof pages === "undefined") {
    try {
      pgsData = JSON.parse(sessionStorage.getItem("pgsData"));
      return pgsData["type"];
    } catch (error) {
      return false;
    }
  } else {
    return pages["type"];
  }
}

const decodeBase64 = (data) => {
  return Buffer.from(data, "base64").toString("ascii");
};

