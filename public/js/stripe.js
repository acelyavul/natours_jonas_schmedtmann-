/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
//publisable key is used here
const stripe = Stripe(
  'pk_test_51K0jEMBBUFq3L6J2pRtk3LdbK0CpRSZI16ZzjwqrutAp3extWaU7B1cn3vsOIj8xNRTNcWzdiC8ZK3NOBfK8E37Y00BusB1Mh3'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
