import * as cheerio from "cheerio";

export async function POST(req: Request) {
	try {
		const { domain } = await req.json();
		if (!domain)
			return Response.json(
				{ error: "Keine Domain angegeben" },
				{ status: 400 },
			);

		let url = domain.trim();
		if (!/^https?:\/\//i.test(url)) url = "https://" + url;

		const response = await fetch(url, { redirect: "follow" });
		if (!response.ok)
			return Response.json(
				{ error: `Fehler beim Abruf: ${response.status}` },
				{ status: 400 },
			);

		const html = await response.text();
		const $ = cheerio.load(html);

		// On-Page Checks
		const title = $("title").first().text().trim() || null;
		const metaDescription =
			$('meta[name="description"]').attr("content") || null;
		const h1 = $("h1").first().text().trim() || null;
		const h2Count = $("h2").length;
		const images = $("img");
		const imagesWithAlt = images.filter((i, el) =>
			$(el).attr("alt"),
		).length;
		const canonical = $('link[rel="canonical"]').attr("href") || null;
		const internalLinks = $('a[href^="/"]').length;

		// Technical Checks
		const viewport = $('meta[name="viewport"]').attr("content") || null;
		const usesHttps = url.startsWith("https://");
		let robotsTxt = null;
		try {
			const robotsRes = await fetch(
				new URL("/robots.txt", url).toString(),
			);
			if (robotsRes.ok) robotsTxt = await robotsRes.text();
		} catch (e) {}
		let sitemapExists = false;
		try {
			const sitemapRes = await fetch(
				new URL("/sitemap.xml", url).toString(),
			);
			if (sitemapRes.ok) sitemapExists = true;
		} catch {}

		// Checks Array
		const checks = [
			{
				id: "title",
				label: "Title-Tag",
				passed: !!title,
				details: title || "Kein Title",
				weight: 10,
			},
			{
				id: "title-length",
				label: "Title-Länge",
				passed: title ? title.length <= 60 : false,
				details: title?.length || 0,
				weight: 5,
			},
			{
				id: "metaDescription",
				label: "Meta Description",
				passed: !!metaDescription,
				details: metaDescription || "Keine Description",
				weight: 10,
			},
			{
				id: "metaDescription-length",
				label: "Meta Description Länge",
				passed: metaDescription ? metaDescription.length <= 160 : false,
				details: metaDescription?.length || 0,
				weight: 5,
			},
			{
				id: "h1",
				label: "H1-Tag",
				passed: !!h1,
				details: h1 || "Kein H1",
				weight: 10,
			},
			{
				id: "h2",
				label: "H2-Überschriften",
				passed: h2Count > 0,
				details: `${h2Count} H2 gefunden`,
				weight: 5,
			},
			{
				id: "images-alt",
				label: "Bilder mit Alt",
				passed: imagesWithAlt === images.length,
				details: `${imagesWithAlt}/${images.length} Alt vorhanden`,
				weight: 5,
			},
			{
				id: "canonical",
				label: "Canonical",
				passed: !!canonical,
				details: canonical || "Kein Canonical",
				weight: 5,
			},
			{
				id: "viewport",
				label: "Viewport",
				passed: !!viewport,
				details: viewport || "Kein Viewport",
				weight: 5,
			},
			{
				id: "https",
				label: "HTTPS",
				passed: usesHttps,
				details: usesHttps ? "aktiv" : "nicht aktiv",
				weight: 10,
			},
			{
				id: "robots",
				label: "robots.txt",
				passed: !!robotsTxt,
				details: robotsTxt ? "vorhanden" : "nicht vorhanden",
				weight: 5,
			},
			{
				id: "sitemap",
				label: "sitemap.xml",
				passed: sitemapExists,
				details: sitemapExists ? "vorhanden" : "nicht gefunden",
				weight: 5,
			},
			{
				id: "internal-links",
				label: "Interne Links",
				passed: internalLinks > 0,
				details: `${internalLinks} Links`,
				weight: 5,
			},
		];

		let score = 0;
		checks.forEach((c) => {
			if (c.passed) score += c.weight;
		});

		let grade: "bad" | "ok" | "good" = "bad";
		if (score >= 80) grade = "good";
		else if (score >= 50) grade = "ok";

		return Response.json({ url, score, grade, checks }, { status: 200 });
	} catch (error) {
		console.error(error);
		return Response.json(
			{ error: "Interner Serverfehler beim SEO-Check" },
			{ status: 500 },
		);
	}
}
