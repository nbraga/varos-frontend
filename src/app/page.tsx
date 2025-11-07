import { UserDataTable } from "@/app/_components/user-data-table";
import { UserStats } from "@/app/_components/user-stats";
import { fetchUsers } from "@/app/actions/user";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getQueryClient } from "@/lib/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Varos - Dashboard",
};

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-muted/20 flex flex-col">
      <Header />

      <div className="container mx-auto p-6 space-y-6 flex-1">
        <UserStats />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <UserDataTable />
        </HydrationBoundary>
      </div>

      <Footer />
    </div>
  );
}
