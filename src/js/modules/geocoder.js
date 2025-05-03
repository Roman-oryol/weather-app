const API_KEY = 'dd9ebb11eff142e9870fae3fdd97cee7';
const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';

export async function geocodeCity(cityName) {
  const url = `${BASE_URL}?q=${encodeURIComponent(cityName)}&key=${API_KEY}&language=ru&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length === 0) {
      console.warn('Город не найден');
      return null;
    }

    const { lat, lng } = data.results[0].geometry;
    return `${lat},${lng}`;
  } catch (error) {
    console.error('Ошибка при геокодировании:', error);
    return null;
  }
}
