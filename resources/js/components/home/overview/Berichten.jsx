import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import apiClient from "@/api";
import { toast } from "sonner";

const Berichten = ({ requests, setRequests }) => {
    const handleApprove = async (id) => {
        try {
            await apiClient
                .get(`lending/${id}/accept`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "ACCESS_TOKEN"
                        )}`,
                    },
                })
                .then(() => {
                    setRequests(
                        requests.filter((request) => request.id !== id)
                    );

                    toast.success("Aanvraag goedgekeurd");
                });
        } catch (error) {
            console.error(error);
        }
    };
    const handleReject = async (id) => {
        try {
            await apiClient
                .get(`lending/${id}/reject`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "ACCESS_TOKEN"
                        )}`,
                    },
                })
                .then(() => {
                    setRequests(
                        requests.filter((request) => request.id !== id)
                    );

                    toast.success("Aanvraag afgewezen");
                });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="space-y-8 overflow-y-scroll">
            {requests.map((request) => (
                <div key={request.updated_at} className="flex items-center">
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-bold leading-none">
                            {request.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {request.borrower.name}
                        </p>
                    </div>
                    <div className="ml-auto">
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleApprove(request.id)}
                        >
                            Goedkeuren
                        </Button>
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleReject(request.id)}
                        >
                            Afkeuren
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Berichten;
