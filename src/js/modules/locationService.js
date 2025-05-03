const requestUserLocation = () => {
  return new Promise((resolve) => {
    if (!('geolocation' in navigator)) {
      console.error('Геолокация не поддерживается этим браузером.');
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve(`${latitude},${longitude}`);
      },
      () => {
        console.log('Отказано в доступе к локации');
        resolve(null);
      },
    );
  });
};

export const getUserLocation = async () => {
  const coords = await requestUserLocation();

  return coords;
};
