import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { listReservations } from "../../utils/api";

function Reservation() {
  const [reservation, setReservation] = useState([]);
  const { reservationId } = useParams;

  useEffect(() => {
    const findReservation = async () => {
      try {
        const currentReservation = await listReservations(reservationId);
        setReservation(() => currentReservation);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    };
    findReservation();
  }, [reservationId]);
}
