// src/pages/TutorDetails.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/api/axios-instance";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";


interface Tutor {
  _id: string;
  userId: string
  name: string;
  title: string;
  bio: string;
  skills: string;
  experience: number;
  location: string;
  hourlyRate: number;
  availability: string;
  profileImage: string;
}

const TutorDetails = () => {
  
  const { tutorId } = useParams();
  console.log(tutorId ,'tutorId  ');
  
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axiosInstance.get(`/user/tutor/${tutorId}`);
        console.log(res.data);
        
        setTutor(res.data);
      } catch (error) {
        console.error("Failed to fetch tutor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [tutorId]);

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)

  // const handleRequestSession = async ()=>{
  //   try {
  //     // const tUserId = tutor?.userId

      
  //     // const res = await axiosInstance.post(`user/tutor/request/${tUserId}`);
  //     // console.log(res.data);
      
  //   // 1. Create payment order on backend
  //     if(!tutor) return ; 
  //     const paymentRes = await axiosInstance.post(`payment/create-order`,{
  //       tutor : tutor
  //     })

  //     const sessionId = paymentRes.data.sessionId
  //        const stripe = await stripePromise;
  //   if (!stripe) {
  //     throw new Error("Stripe failed to initialize");
  //   }

  //   await stripe.redirectToCheckout({ sessionId });



  //     // toast("Video session request sent successfully!")
  //   } catch (error) {
  //       console.error("Failed to request session:", error);
  //     toast("Something went wrong while sending the request.");
  //   }
  // }


  const handleRequestSession = async () => {
  try {
    if (!tutor) return;

    const paymentRes = await axiosInstance.post(`/payments/create-order`, {
      tutor: tutor,
    });

    const sessionId = paymentRes.data.sessionId;

    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe failed to initialize");
    }

    await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
    console.error("Failed to request session:", error);
    toast("Something went wrong while sending the request.");
  }
};


  if (loading) {
    return <div className="text-white text-center py-10">Loading tutor...</div>;
  }

  if (!tutor) {
    return <div className="text-white text-center py-10">Tutor not found</div>;
  }

  return (
   
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-black/70 p-8 rounded-xl border border-gray-700 shadow-md">
        <img
          src={tutor.profileImage}
          alt={tutor.name}
          className="w-40 h-40 rounded-full object-cover mx-auto mb-4"
        />
        <h2 className="text-3xl text-cyan-400 text-center font-bold mb-1">{tutor.name}</h2>
        <p className="text-center italic text-gray-400 mb-6">{tutor.title}</p>

        <p className="mb-4"><strong>Bio:</strong> {tutor.bio}</p>
        <p className="mb-2"><strong>Skills:</strong> {tutor.skills}</p>
        <p className="mb-2"><strong>Experience:</strong> {tutor.experience} years</p>
        <p className="mb-2"><strong>Location:</strong> {tutor.location}</p>
        <p className="mb-2"><strong>Availability:</strong> {tutor.availability}</p>
        <p className="mb-4"><strong>Hourly Rate:</strong> ₹{tutor.hourlyRate}</p>

        <button onClick={handleRequestSession} className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded-md font-semibold transition">
          Request Video Session
        </button>
      </div>
    </div>
  );
};

export default TutorDetails;
