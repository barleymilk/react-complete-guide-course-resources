import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        // const response = await fetch("http://localhost:3000/places");
        // const resData = await response.json();
        // if (!response.ok) {
        //   throw new Error("Failed to fetch places");
        // }
        const places = await fetchAvailablePlaces();

        // async/await을 사용할 수 없다. getCurrentPosition은 Promise를 반환하지 않기 때문이다.
        // setIsFetching을 부르는 위치를 콜백 함수 안쪽으로 바꾸어 준다.
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            // resData.places,
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false); // 위치정보 모두 불러온 다음 isFetching 업데이트
        });

        // setAvailablePlaces(resData.places);
        setAvailablePlaces(places);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setIsFetching(false); // 에러가 난 상황에도 isFetching 업데이트
      }

      // 자바스크립트는 콜백함수가 완료될 때까지 기다리지 않는다.
      // 따라서 이 코드는 position을 불러오는 함수를 실행하는 즉시
      // setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
