import puppeteer from "puppeteer";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const url = searchParams.get("url");

	if (!url) return new Response("Missing URL", { status: 400 });

	let browser;

	try {
		browser = await puppeteer.launch({
			headless: "new",
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-dev-shm-usage",
				"--disable-gpu",
				"--disable-software-rasterizer",
			],
		});

		const page = await browser.newPage();
		await page.goto(url, {
			waitUntil: "networkidle2",
			timeout: 30000,
		});

		const screenshot = await page.screenshot({ fullPage: true });

		return new Response(screenshot, {
			status: 200,
			headers: { "Content-Type": "image/png" },
		});
	} catch (error) {
		console.error("PUPPETEER ERROR:", error);
		return new Response("Screenshot error", { status: 500 });
	} finally {
		if (browser) await browser.close();
	}
}
