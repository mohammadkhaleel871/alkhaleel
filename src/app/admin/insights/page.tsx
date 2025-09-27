import { lessons } from "@/lib/mock-data";
import { AdminInsightsClient } from "@/components/admin-insights-client";
import { BackButton } from "@/components/layout/back-button";

export default function AdminInsightsPage() {
    // In a real app, you would fetch this data from your database
    const availableLessons = lessons;

    return (
        <div>
            <BackButton />
            <AdminInsightsClient lessons={availableLessons} />
        </div>
    );
}
