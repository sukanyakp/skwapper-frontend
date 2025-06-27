import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios-instance";

export type AvailabilityData = {
  [day: string]: {
    start: string;
    end: string;
  };
};


export function withAvailability(WrappedComponent: React.ComponentType<any>) {
  return function WithAvailability(props: any) {
    const [availability, setAvailability] = useState<{ [key: string]: { start: string; end: string } }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchAvailability = async () => {
        try {
          const res = await axiosInstance.get("/tutor/availability");
          if (res.data?.availability) {
            setAvailability(res.data.availability);
          }
        } catch (error) {
          console.log("No previous availability found.");
        } finally {
          setLoading(false);
        }
      };

      fetchAvailability();
    }, []);

    const saveAvailability = async () => {
      return await axiosInstance.post("/tutor/availability", { availability });
    };

    
    const updateAvailability = async (newAvailability: any) => {
      return await axiosInstance.put("/tutor/availability", { availability: newAvailability });
    }

    return (
      <WrappedComponent
        {...props}
        availability={availability}
        setAvailability={setAvailability}
        saveAvailability={saveAvailability}
        updateAvailability={updateAvailability}
        loading={loading}
      />
    );
  };
}
