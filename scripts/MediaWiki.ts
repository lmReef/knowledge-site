export async function fetchWikiAction(queryString: string) {
  const apiEndpoint = "https://commons.wikimedia.org/w/api.php";
  const params = `action=query&list=allimages&ailimit=3&format=json&titles=china`;

  /**
   * Send the request to get the images
   */
  fetch(apiEndpoint + "?" + params + "&origin=*")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const allimages = response.query.allimages; // Process the output to get the image names
      Object.keys(allimages).forEach(function (key) {
        console.log(allimages[key].name);
      });
    });
}
