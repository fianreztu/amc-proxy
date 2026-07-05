export default async function handler(req, res) {
  try {
    // Menembak langsung ke penyedia stream dengan membawa identitas (Header) yang valid
    const response = await fetch('https://inproviszon.st/amc-usa.m3u8', {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://vileembeds.pages.dev/',
        'Origin': 'https://vileembeds.pages.dev',
        'Accept': '*/*'
      },
      redirect: 'manual' // Mencegah Vercel mengikuti redirect otomatis secara internal
    });

    // Mengambil URL final (termasuk token dinamis baru yang diberikan oleh server)
    const finalUrl = response.headers.get('location') || response.url;

    if (finalUrl) {
      // Mengarahkan player Anda langsung ke link dengan token terbaru tersebut
      res.setHeader('Location', finalUrl);
      return res.status(302).end();
    } else {
      return res.status(404).json({ error: 'Gagal mendapatkan token m3u8 terbaru.' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'Terjadi kesalahan sistem', details: error.message });
  }
}
