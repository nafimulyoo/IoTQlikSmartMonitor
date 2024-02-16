"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/auth";

export default function LoginPage() {
  return (
    <>

      <div className="hero min-h-screen  z-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left  ml-12">
            <h1 className="text-6xl font-bold">IoTQlik Smart Monitor</h1>
            <p className="py-6">
              To keep connected with us, please{" "}
              <span className="font-bold">login</span> with your account.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" action={login}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <Input
                  type="username"
                  className="input input-bordered"
                  name="username"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <Input
                  type="password"
                  className="input input-bordered"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <Button type="submit">Login </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
