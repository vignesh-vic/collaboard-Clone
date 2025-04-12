"use client"
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignInButton, useAuth } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react"
import { ReactNode } from "react";
import { Loading } from "@/components/auth/loading";

interface ConvexClientProviderPros {
    children: ReactNode;
}

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;
const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!


const convex = new ConvexReactClient(CONVEX_URL)


export const ConvexClientProvider = ({ children }: ConvexClientProviderPros) => {
    return (
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <Authenticated>
                    {children}

                </Authenticated>
                {/* <Unauthenticated>
                    <SignInButton />

                </Unauthenticated> */}
                <AuthLoading>
                    <Loading/>
                </AuthLoading>


            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};