export default async function handler(req, res) {
    const response = await fetch('https://bored-api.appbrewery.com' + req.url.replace('/api', ''));
    const data = await response.json();
  
    res.status(200).json(data);
  }
  