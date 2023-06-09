import { useState } from "react";
import { User } from "../../utils";

interface AppProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  } | undefined;
}
function Avatar({ user, className }: AppProps) {
  const [error, setError] = useState(false);
  const FirstLetter = user?.firstName?.[0]?.toUpperCase() || "F";
  const SecondLetter = user?.lastName?.[0]?.toUpperCase() || "L";
  if (user?.avatar && !error)
    return (
      <img
        src ={user.firstName ? `http://${window.location.hostname}/auth/${user?.avatar}` : `${user?.avatar}`}
        className={`aspect-square rounded-full ${className}`}
        onError={(e) => {
          setError(true);
        }}
      />
    );
  else
    return (
      <div
        className={`flex-center aspect-square bg-primary text-light brightness-110 rounded-full  ${className}`}
      >
        <span>{FirstLetter}</span>
        <span>{SecondLetter}</span>
      </div>
    );
}

export default Avatar;
