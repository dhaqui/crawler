
function setup() {
  noCanvas();
  const chaoticHTML = generateChaoticHTML();
  displayGeneratedPage(chaoticHTML);
  const parsedData = crawlChaoticHTML(chaoticHTML);
  displayCrawlResults(parsedData);
}

// カオスなHTMLを生成
function generateChaoticHTML() {
  const randomTitle = `Chaotic Page ${Math.floor(Math.random() * 1000)}`;
  const randomParagraphs = Array.from({ length: 15 }, (_, i) =>
    `<p style="
      position: absolute;
      top: ${Math.random() * 80}vh;
      left: ${Math.random() * 80}vw;
      transform: rotate(${Math.random() * 360}deg);
      font-size: ${Math.random() * 2 + 1}em;
      color: rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255});
    ">
      Paragraph ${i + 1}: Random text ${Math.random().toFixed(3)}.
    </p>`
  ).join("");

  const randomNestedDivs = Array.from({ length: 10 }, (_, i) =>
    `<div style="
      position: absolute;
      top: ${Math.random() * 80}vh;
      left: ${Math.random() * 80}vw;
      border: ${Math.random() * 10}px dashed rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255});
      transform: scale(${Math.random() * 2});
      width: ${Math.random() * 30 + 10}vw;
      height: ${Math.random() * 30 + 10}vh;
      background: rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5);
    ">
      Chaotic Div ${i + 1}
    </div>`
  ).join("");

  const randomCustomElements = Array.from({ length: 5 }, (_, i) =>
    `<chaotic-tag-${i + 1} style="
      position: absolute;
      top: ${Math.random() * 90}vh;
      left: ${Math.random() * 90}vw;
      padding: ${Math.random() * 20}px;
      transform: rotate(${Math.random() * 360}deg);
      background: rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7);
      color: white;
      font-size: ${Math.random() * 1.5 + 1}em;
    ">
      Chaotic Element ${i + 1}: "Order is an illusion."
    </chaotic-tag-${i + 1}>`
  ).join("");

  const randomSVGs = Array.from({ length: 7 }, () =>
    `<svg width="${Math.random() * 200 + 100}" height="${Math.random() * 200 + 100}" xmlns="http://www.w3.org/2000/svg" style="
      position: absolute;
      top: ${Math.random() * 90}vh;
      left: ${Math.random() * 90}vw;
      transform: rotate(${Math.random() * 360}deg);
    ">
      <rect width="100%" height="100%" fill="rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})" />
      <circle cx="50%" cy="50%" r="${Math.random() * 50}" fill="#fff" />
    </svg>`
  ).join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>${randomTitle}</title>
      <style>
        body {
          position: relative;
          overflow: hidden;
          font-family: 'Courier New', Courier, monospace;
          background: linear-gradient(135deg, #8e44ad, #3498db);
          height: 100vh;
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <h1 style="position: absolute; top: 5%; left: 5%; transform: rotate(${Math.random() * 15}deg); font-size: 2em; color: #fff;">
        ${randomTitle}
      </h1>
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

// カオスなHTMLを解析
function crawlChaoticHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const title = doc.querySelector("title")?.textContent || "No Title";
  const paragraphsCount = doc.querySelectorAll("p").length;
  const nestedDivsCount = doc.querySelectorAll("div").length;
  const customElements = Array.from(doc.querySelectorAll("chaotic-tag-1, chaotic-tag-2, chaotic-tag-3, chaotic-tag-4, chaotic-tag-5"))
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
    A symphony of disorder and fragmented order, this page reflects the eternal dance
    of randomness, where ${data.nestedDivsCount} divs coexist with ${data.customElements.length} poetic tags,
    and ${data.svgsCount} abstract SVGs embody the chaos of the cosmos.
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
