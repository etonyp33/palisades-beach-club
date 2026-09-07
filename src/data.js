import Parse from "./parse";

export async function retrievePages(type = "member") {
  try {
    const parseQuery = new Parse.Query("Page");
    const res = await parseQuery.findAll();

    const pgsData = {};

    res.forEach((page) => {
      const name = page.get("name") || page.get("page");
      const content = page.get("content");

      if (!name) {
        console.warn("Skipping Page record with no name:", page.id);
        return;
      }

      // Calendar login only needs the calendar page.
      if (type === "calendar") {
        if (name === "calendar") {
          pgsData[name] = content;
        }
        return;
      }

      // Member and administrator get the normal page data.
      pgsData[name] = content;
    });

    pgsData.type = type;

    sessionStorage.setItem("pgsData", JSON.stringify(pgsData));

    console.log("Loaded Page records:", Object.keys(pgsData));

    return pgsData;
  } catch (error) {
    console.error("Unable to retrieve Page data:", error);
    return null;
  }
}