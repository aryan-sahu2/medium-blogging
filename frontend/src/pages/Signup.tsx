import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export const Signup = () => {
  return (
    <div>
      <div className="sm:flex flex-col sm:flex-row ">
        <div className="sm:w-1/2 w-full h-screen inline-block">
          <Auth type="signup" />
        </div>
        <div className="sm:w-1/2 h-[70vh] overflow-hidden sm:h-screen inline-block">
          <Quote />
        </div>
      </div>
    </div>
  );
};
