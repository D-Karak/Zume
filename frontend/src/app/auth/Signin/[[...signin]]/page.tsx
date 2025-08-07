import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-300 to-cyan-300 flex items-center justify-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
