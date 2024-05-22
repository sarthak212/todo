"use client";
import { getTokenDetails } from "@/app/lib/data";
import { useUser } from "@/hooks/user";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
const publicPath = ["auth"];
export default function AuthHandler() {
  const userDetails = useUser((state: any) => state.userDetails);
  const setUserDetails = useUser((state: any) => state.updateUserDetails);
  const pathname = usePathname();
  const router = useRouter();
  const prefix = pathname.split("/")[1];
  useEffect(() => {
    if (
      userDetails.authenticated === false &&
      publicPath.includes(prefix) === false
    ) {
      router.push("/auth/sign-in");
    }
  }, [pathname, userDetails]);

  useEffect(() => {
    async function updateToken() {
      const tokenDetails = await getTokenDetails();
      if (tokenDetails.id) {
        setUserDetails({ authenticated: true, ...tokenDetails });
      } else {
        setUserDetails({ authenticated: false });
      }
    }
    updateToken();
  }, []);
  return <></>;
}
