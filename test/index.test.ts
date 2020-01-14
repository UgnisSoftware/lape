const puppeteer = require("puppeteer");

describe("should load without error",  () => {
  it("asdasd", async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://15min.lt");

    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
      };
    });

    console.log("Dimensions:", dimensions);

    await new Promise(res => setTimeout(res, 2000));

    await browser.close();
  });
});
