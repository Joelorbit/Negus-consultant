import {
  useMyConnections,
  useRespondConnection,
} from "../../hooks/useMentorApplications";
import { useMe } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";

const MyConnections = () => {
  const { data, isLoading, isError } = useMyConnections();
  const connections = data?.data || [];

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError)
    return <p className="p-4 text-red-700">Could not load connections.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">My Connections</h1>
      <div className="space-y-3">
        {connections.map((c) => (
          <ConnectionRow key={c.id} connection={c} />
        ))}
        {connections.length === 0 && (
          <p className="text-sm text-gray-600">No connections yet.</p>
        )}
      </div>
    </div>
  );
};

const ConnectionRow = ({ connection }) => {
  const respond = useRespondConnection(connection.id);
  const { data: me } = useMe();
  const canRespond =
    connection.status === "requested" && me?.id === connection.mentor_id;

  return (
    <div className="border rounded p-4 bg-white flex items-center justify-between">
      <div>
        <div className="font-medium">
          Student: {connection.student_first_name}{" "}
          {connection.student_last_name}
        </div>
        <div className="text-sm">Status: {connection.status}</div>
        {connection.message && (
          <div className="text-sm text-gray-600">
            Message: {connection.message}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={!canRespond || respond.isLoading}
          onClick={() => respond.mutate("accepted")}
        >
          Accept
        </Button>
        <Button
          variant="destructive"
          disabled={!canRespond || respond.isLoading}
          onClick={() => respond.mutate("rejected")}
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default MyConnections;
