"use client";

import { useState, useTransition } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { finishPasskeyLogin, startPasskeyLogin } from "@/app/pages/user/functions";
import { Button } from "@/app/components/ui/button";
import {Card, CardTitle, CardDescription, CardHeader, CardContent} from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label";
import {Input} from "@/app/components/ui/input";
import {link} from "@/app/shared/links"

export function LoginCard({ questionText }: { questionText: String}) {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  const passkeyLogin = async () => {
    // 1. Get a challenge from the worker
    const options = await startPasskeyLogin();

    // 2. Ask the browser to sign the challenge
    const login = await startAuthentication({ optionsJSON: options });

    // 3. Give the signed challenge to the worker to finish the login process
    const success = await finishPasskeyLogin(login);

    if (!success) {
      setResult("Login failed");
    } else {
      window.location.href = link("/");
    }
  };

  const handlePerformPasskeyLogin = () => {
    startTransition(() => void passkeyLogin());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { username });
    // Here you would typically handle the login logic
  };

  // return (
  //   <main className="bg-bg">
  //     <h1 className="text-4xl font-bold text-red-500">YOLO</h1>
  //     <input
  //       type="text"
  //       value={username}
  //       onChange={(e) => setUsername(e.target.value)}
  //       placeholder="Username"
  //     />
  //     <Button onClick={handlePerformPasskeyLogin} disabled={isPending}>
  //       {isPending ? <>...</> : "Login with passkey"}
  //     </Button>
  //     {result && <div>{result}</div>}
  //   </main>
  // );

    return (
    <div className="h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <Card className="w-full max-w-md mx-auto sm:max-w-lg">
        <CardHeader className="space-y-2 text-center pt-8 pb-6">
          <CardTitle className="text-3xl sm:text-4xl">Bunker Buddies</CardTitle>
          <CardDescription className="text-base">
            Enter the bunker and connect with your survival crew
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 px-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Prominent witty question */}
            <div className="text-center py-8">
              <p className=" sm:text-3xl font-bold text-foreground leading-relaxed">
                {questionText}
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="username" className="text-base">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full h-12 text-base"
              />
            </div>

            <Button className="w-full h-12 text-base"
            onClick={handlePerformPasskeyLogin} disabled={isPending}>
             {isPending ? <>...</> : "Enter the Bunker"}
            </Button>
          </form>

          <div className="text-center text-base text-muted-foreground pt-4">
            Not yet a Bunker Buddy?{' '}
            <button className="text-primary hover:underline"
              onClick={()=> {window.location.href=link("/user/signup")}}
              >
              Get in
            </button>
          </div>
        </CardContent>
        {result && <div>{result}</div>}
      </Card>
    </div>
  );
}