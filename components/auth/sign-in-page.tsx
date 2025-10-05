import { numoniLogoDark } from "@/constant/icons"
import { signInBg } from "@/constant/images"
import Image from "next/image"
import SignInForm from "./sign-in-form"



export default function SignInPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Image src={numoniLogoDark} alt="Logo" width={100} height={100} />

        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full ">
            <SignInForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={signInBg}
          alt="Image"
          width={500}
          height={500}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale bg-gray-100"
        />
        <div className="absolute inset-0 bg-theme-dark-green/20"></div>
        {/* <div className="absolute inset-0 flex items-end justify-center pb-8">
          <p className="text-white text-2xl font-bold">
            Welcome to numoni
          </p>
        </div> */}
      </div>
    </div>
  )
}
