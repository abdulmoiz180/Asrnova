"use client";

import { ReactNode } from "react";
import LoadingScreen from "./LoadingScreen";

interface ClientWrapperProps {
    children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
    return (
        <>
            <LoadingScreen />
            {children}
        </>
    );
}
