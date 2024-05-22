"use client";
import { useUser } from "@/hooks/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userDetails = useUser((state: any) => state.userDetails);
  const router = useRouter();
  useEffect(() => {
    if (userDetails.authenticated) {
      router.push("/");
    }
  }, [userDetails]);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-8 h-8 mr-2"
            width={32}
            height={32}
            src="https://cdn-icons-png.flaticon.com/512/4697/4697260.png"
            alt="logo"
          />
          Todo App
        </a>
        {children}
      </div>
    </section>
  );
}
