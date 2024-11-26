
function setup() {
  noCanvas();
  const randomHTML = generateHyperComplexHTML();
  displayGeneratedPage(randomHTML);
  const parsedData = crawlHyperComplexHTML(randomHTML);
  displayCrawlResults(parsedData);
}

// ハイパー複雑なHTMLを生成
function generateHyperComplexHTML() {
  const randomTitle = `Hyper Complex Page ${Math.floor(Math.random() * 1000)}`;
  const randomParagraphs = Array.from({ length: 10 }, (_, i) =>
    `<p style="background: rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5); color: #000;">
      Paragraph ${i + 1}: A reflection on randomness ${Math.floor(Math.random() * 10000)}.
    </p>`
  ).join("");

  const randomNestedDivs = Array.from({ length: 20 }, (_, i) =>
    `<div style="padding: ${i * 5}px; border: ${i}px solid #${Math.floor(Math.random() * 16777215).toString(16)};">
      Nested div ${i + 1}
      <div style="background: #${Math.floor(Math.random() * 16777215).toString(16)}; color: white; padding: 10px;">
        Deeply nested content ${Math.random().toFixed(2)}
        <ul>
          ${Array.from({ length: 5 }, (_, j) => `<li>List item ${j + 1}</li>`).join("")}
        </ul>
      </div>
    </div>`
  ).join("");

  const randomCustomElements = Array.from({ length: 5 }, (_, i) =>
    `<poetic-tag-${i + 1} style="display: block; background: #16a085; color: white; padding: 10px; margin: 5px 0;">
      Poetic Element ${i + 1}: "Beauty dwells in chaos" (${Math.random().toFixed(3)})
    </poetic-tag-${i + 1}>`
  ).join("");

  const randomSVGs = Array.from({ length: 5 }, () =>
    `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg" style="margin: 10px;">
      <rect width="200" height="100" fill="#${Math.floor(Math.random() * 16777215).toString(16)}" />
      <circle cx="100" cy="50" r="30" fill="#fff" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#333" font-size="20px">
        SVG Art
      </text>
    </svg>`
  ).join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>${randomTitle}</title>
      <style>
        poetic-tag-1, poetic-tag-2, poetic-tag-3, poetic-tag-4, poetic-tag-5 {
          font-style: italic;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <h1>${randomTitle}</h1>
      ${randomParagraphs}
      ${randomNestedDivs}
      ${randomCustomElements}
      ${randomSVGs}
    </body>
    </html>
  `;
}

// 生成されたHTMLをiframeに表示
function displayGeneratedPage(html) {
  const iframe = document.getElementById("generated-page");
  iframe.srcdoc = html;
}

// ハイパー複雑なHTMLを解析
function crawlHyperComplexHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const title = doc.querySelector("title")?.textContent || "No Title";
  const paragraphsCount = doc.querySelectorAll("p").length;
  const nestedDivsCount = doc.querySelectorAll("div").length;
  const customElements = Array.from(doc.querySelectorAll("poetic-tag-1, poetic-tag-2, poetic-tag-3, poetic-tag-4, poetic-tag-5"))
    .map(el => el.textContent.trim());
  const svgsCount = doc.querySelectorAll("svg").length;

  return {
    title,
    paragraphsCount,
    nestedDivsCount,
    customElements,
    svgsCount
  };
}

// 解析結果を表示（詩的な評価を含む）
function displayCrawlResults(data) {
  const resultsDiv = document.getElementById("results");

  const poeticEvaluation = `
    This document radiates the sublime chaos of ${data.nestedDivsCount} nested divs,
    whispers poetry through ${data.customElements.length} custom elements,
    and captures the ephemeral in ${data.svgsCount} SVG artworks.
  `;

  resultsDiv.innerHTML = `
    <h2>Analysis Results:</h2>
    <p><strong>Title:</strong> ${data.title}</p>
    <p><strong>Paragraph Count:</strong> ${data.paragraphsCount}</p>
    <p><strong>Nested Div Count:</strong> ${data.nestedDivsCount}</p>
    <p><strong>Custom Elements:</strong> ${data.customElements.join(", ")}</p>
    <p><strong>SVG Count:</strong> ${data.svgsCount}</p>
    <p><strong>Poetic Evaluation:</strong> ${poeticEvaluation}</p>
  `;
}
