// Since mermaid 11.17.0 the published ESM bundle contains UMD-wrapped dependencies that
// register with the global AMD `define` that Documenter's require.js provides instead of
// exporting themselves, so DocumenterMermaid's unpinned `mermaid@11` import throws before it
// renders anything (https://github.com/mermaid-js/mermaid/issues/8095). Render the diagrams
// here from the last version that works; DocumenterMermaid's own pass then skips them, since
// mermaid ignores diagrams already marked `data-processed`.
const MERMAID = "https://cdn.jsdelivr.net/npm/mermaid@11.16.1/dist/mermaid.esm.min.mjs";

async function renderMermaidDiagrams() {
  if (!document.querySelector(".mermaid")) {
    return;
  }
  const { default: mermaid } = await import(MERMAID);
  mermaid.initialize({ startOnLoad: false, theme: "neutral" });
  await mermaid.run({ querySelector: ".mermaid" });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderMermaidDiagrams);
} else {
  renderMermaidDiagrams();
}
