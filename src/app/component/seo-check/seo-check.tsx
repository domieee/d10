"use client";

import { useState } from "react";

type Check = {
	id: string;
	label: string;
	passed: boolean;
	details?: string;
	weight: number;
};

export default function SEOCheckPage() {
	const [domain, setDomain] = useState("");
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	async function runCheck(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setResult(null);

		try {
			const res = await fetch("/api/seo-check", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ domain }),
			});
			if (!res.ok) throw new Error(await res.text());
			const data = await res.json();
			setResult(data);
		} catch (err: any) {
			setError(err.message || "Fehler beim SEO-Check");
		} finally {
			setLoading(false);
		}
	}

	function gradeColor(grade: string) {
		switch (grade) {
			case "good":
				return "#4caf50"; // grün
			case "ok":
				return "#ff9800"; // orange
			default:
				return "#f44336"; // rot
		}
	}

	return (
		<main
			style={{
				maxWidth: "800px",
				margin: "0 auto",
				padding: "2rem",
				fontFamily: "Arial, sans-serif",
			}}
		>
			<h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
				Kostenloser SEO-Check
			</h1>

			<form onSubmit={runCheck} style={{ marginBottom: "2rem" }}>
				<input
					type="text"
					placeholder="Domain z. B. haus-hyazinthe.de"
					value={domain}
					onChange={(e) => setDomain(e.target.value)}
					style={{
						padding: "0.5rem",
						width: "70%",
						marginRight: "1rem",
						fontSize: "1rem",
						color: "#000",
					}}
				/>
				<button
					type="submit"
					disabled={loading}
					style={{
						padding: "0.5rem 1rem",
						fontSize: "1rem",
						backgroundColor: "#2196f3",
						color: "#fff",
						border: "none",
						cursor: "pointer",
					}}
				>
					{loading ? "Prüfe..." : "SEO-Check starten"}
				</button>
			</form>

			{error && (
				<p style={{ color: "#f44336", marginBottom: "1rem" }}>
					{error}
				</p>
			)}

			{result && (
				<>
					<h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
						Ergebnisse für {result.url}
					</h2>

					{/* Score-Leiste */}
					<div style={{ marginBottom: "1rem" }}>
						<div
							style={{
								width: "100%",
								backgroundColor: "#ddd",
								height: "24px",
								borderRadius: "4px",
								overflow: "hidden",
							}}
						>
							<div
								style={{
									width: `${result.score}%`,
									backgroundColor: gradeColor(result.grade),
									height: "100%",
								}}
							/>
						</div>
						<p style={{ marginTop: "0.5rem" }}>
							Score: {result.score} / 100 (
							{result.grade.toUpperCase()})
						</p>
					</div>

					{/* Detaillierte Checks */}
					<ul style={{ listStyle: "none", padding: 0 }}>
						{result.checks.map((c: Check) => (
							<li
								key={c.id}
								style={{
									padding: "1rem",
									marginBottom: "0.5rem",
									backgroundColor: c.passed
										? "#e8f5e9"
										: "#ffebee",
									borderRadius: "4px",
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<div>
									<span
										style={{
											fontWeight: "bold",
											color: "#555",
										}}
									>
										{c.label}
									</span>{" "}
									<span
										style={{
											fontSize: "0.9rem",
											color: "#555",
										}}
									>
										(Gewichtung: {c.weight})
									</span>
									{c.details && (
										<p
											style={{
												margin: 0,
												fontSize: "0.9rem",
												color: "#555",
											}}
										>
											{c.details}
										</p>
									)}
								</div>
								<span
									style={{
										fontWeight: "bold",
										color: c.passed ? "#388e3c" : "#d32f2f",
									}}
								>
									{c.passed ? "✓" : "✗"}
								</span>
							</li>
						))}
					</ul>
				</>
			)}
		</main>
	);
}
