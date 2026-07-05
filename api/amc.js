export default async function handler(req, res) {
  try {
    const page = await fetch("https://vileembeds.pages.dev/embed/amc-usa");
    const html = await page.text();

    // regex lebih fleksibel
    const match = html.match(/https?:\/\/[^"']+amc-usa\.m3u8[^"']*/);

    if (!match) {
      return res.status(500).send("Tidak menemukan link m3u8");
    }

    const m3u8Url = match[0];
    const m3u8Data = await fetch(m3u8Url).then(r => r.text());

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(m3u8Data);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
}
