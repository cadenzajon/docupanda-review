import { build } from "bun";
import tailwind from "bun-plugin-tailwind";
import { rm, exists } from "fs/promises";

const outDir = "build";

console.log("🚀 Starting build process...");

if (await exists(outDir)) {
	console.log(`🗑️ Cleaning previous build at ${outDir}`);
	await rm(outDir, { recursive: true, force: true });
}

const start = performance.now();

await build({
	entrypoints: ["main.ts"],
	outdir: outDir,
	plugins: [tailwind],
	minify: true,
	target: "browser",
	sourcemap: "external",
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
});

const buildTime = (performance.now() - start).toFixed(2);

console.log(`✅ Build completed in ${buildTime}ms`);
