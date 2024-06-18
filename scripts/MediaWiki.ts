/// to filter out terms we dont usually want
export function checkWikiResult(word: string = "**null_placeholder**") {
  // these terms are the ones we dont usually want in our results
  const filters = [
    "**null_placeholder**",
    "(disambiguation)",
    "main_page",
    "special:",
    "wikipedia:",
  ];

  return !!!filters.some((filter) => word.toLowerCase().includes(filter));
}

/// Takes an api endpoint and forwards the results to another to get data in the format we
/// usually want it in
export async function getWikiRecursive(url: string, limit = 50) {
  const res = await fetch(url);
  const json = await res.json();

  if (json.query && !json.pages && json.query.pages) {
    json.pages = Object.values(json.query.pages);
  }
  if (json.pages) {
    return json.pages.filter((x: WikiData) => !x.invalidreason);
  } else if (json.items || json.query) {
    const items = json.query || json.items[0];
    if (items.articles || items.random) {
      const toProcess = items.articles || items.random;
      const articles = toProcess
        .filter((x: WikiData) => checkWikiResult(x.article || ""))
        .slice(0, limit)
        .map((x: WikiData) => {
          if (x.article) return x.article;
          else if (x.title) return x.title;
          return "";
        })
        .join("|");
      // the info we actually want, using titles from another response
      return await getWikiRecursive(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=description|pageimages&titles=${articles}&origin=*`,
      );
    }
  }

  return null;
}

// export async function fetchWikiAction(queryString: string) {
//   const apiEndpoint = "https://commons.wikimedia.org/w/api.php";
//   const params =
//   `action=query&list=allimages&ailimit=3&format=json&titles=china`;

//   /**
//    * Send the request to get the images
//    */
//   fetch(apiEndpoint + "?" + params + "&origin=*")
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (response) {
//       const allimages = response.query.allimages; // Process the output to
//       get the image names Object.keys(allimages).forEach(function (key) {
//         console.log(allimages[key].name);
//       });
//     });
// }
