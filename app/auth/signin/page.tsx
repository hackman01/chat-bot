"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Chrome, Github } from "lucide-react";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose your preferred sign-in method
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 h-11"
            variant="outline"
          >
            <Chrome className="h-5 w-5" />
            Continue with Google
          </Button>

          <Button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 h-11"
            variant="outline"
          >
            <Github className="h-5 w-5" />
            Continue with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
