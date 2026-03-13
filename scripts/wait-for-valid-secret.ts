import { chromium } from "playwright";

const URL = "https://www.jurajuhlar.eu/cloudfront-v2-agent-v3-test";
const ERROR_TEXT = "Invalid proxy integration secret";
const POLL_INTERVAL_MS = 5000;

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let attempt = 0;

  while (true) {
    attempt++;
    console.log(`[${new Date().toISOString()}] Attempt ${attempt}: Loading ${URL}...`);

    await page.goto(URL, { waitUntil: "networkidle" });

    // Wait a bit extra for client-side JS to evaluate and populate the DOM
    await page.waitForTimeout(3000);

    const bodyText = await page.evaluate(() => document.body.innerText);

    if (bodyText.includes(ERROR_TEXT)) {
      console.log(`[${new Date().toISOString()}] Still seeing "${ERROR_TEXT}", retrying in ${POLL_INTERVAL_MS / 1000}s...`);
      await page.waitForTimeout(POLL_INTERVAL_MS);
    } else {
      const now = new Date().toISOString();
      console.log(`\n✅ "${ERROR_TEXT}" is GONE as of: ${now}`);
      console.log(`\nPage content snippet:\n${bodyText.slice(0, 800)}`);
      break;
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
