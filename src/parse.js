import Parse from "parse/dist/parse.min.js";

// console.log("parse", window);
if (typeof window !== "undefined") {
  Parse.initialize(
    "u5D9tHT4lhdycxqEiDDyt5nAXEuyQuPQ8IuKG0At",
    "Gnf9K4r6E5MYOVkABIirUYw3XcIjMHZx5s8NVALg"
  );
  Parse.serverURL = "https://parseapi.back4app.com/";
}

export default Parse;
