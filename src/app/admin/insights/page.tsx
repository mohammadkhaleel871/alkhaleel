import { lessons } from "@/lib/mock-data";
import { AdminInsightsClient } from "@/components/admin-insights-client";

export default function AdminInsightsPage() {
    // In a real app, you would fetch this data from your database
    const availableLessons = lessons;

    return <AdminInsightsClient lessons={availableLessons} />;
}
