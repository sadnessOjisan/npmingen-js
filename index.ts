import request from "request";

const url = process.argv[2];
if (url === undefined) {
  console.error("please give me a url.");
}

request(url, (error, response, body) => {
  // エラーチェック
  if (error !== null) {
    console.error("error:", error);
    return false;
  }

  // レスポンスコードとHTMLを表示
  if (response.statusCode !== 200) {
    console.error("invalid status code");
  }

  let bodyJson;

  try {
    bodyJson = JSON.parse(body);
    const dependencies = bodyJson.dependencies;
    const devDependencies = bodyJson.devDependencies;

    if (dependencies === undefined || devDependencies === undefined) {
      console.error("parsed data is not pacage.json");
    }

    const dependenciesArray = Object.keys(dependencies);
    const devDependenciesArray = Object.keys(devDependencies);

    console.log(`npm install ${dependenciesArray.join(" ")}\n`);
    console.log(`npm install -D ${devDependenciesArray.join(" ")}`);
  } catch (e) {
    console.error("body parse error.");
  }
});
