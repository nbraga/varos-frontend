import { UserDashboardContent } from "@/app/_components/user-dashboard-content";
import { UserStats } from "@/app/_components/user-stats";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Varos - Dashboard",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background to-muted/20 flex flex-col">
      <Header />

      <div className="container mx-auto p-6 space-y-6 flex-1">
        <UserStats />

        <UserDashboardContent />
      </div>

      <Footer />
    </div>
  );
}
