import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../lib/axiosInstance";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { RoleGuard } from "../../../../components/RoleGuard";
import { useUsers } from "../../../../hooks/useAnalytics";

const RoleManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users, isLoading } = useUsers();

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }) => {
      const { data } = await axiosInstance.patch(`/users/${userId}/role`, {
        role,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User role updated successfully!");
      setSelectedUser(null);
      setNewRole("");
    },
    onError: (error) => {
      toast.error("Failed to update user role");
      console.error("Error updating role:", error);
    },
  });

  const handleRoleUpdate = () => {
    if (!selectedUser || !newRole) {
      toast.error("Please select a user and role");
      return;
    }

    updateRoleMutation.mutate({
      userId: selectedUser.id,
      role: newRole,
    });
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "semiadmin":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case "admin":
        return "Full access to all dashboard features";
      case "semiadmin":
        return "Access to blog and user management only";
      default:
        return "Regular user with no admin access";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Role Management
        </h1>
        <p className="text-gray-600">
          Manage user roles and permissions for dashboard access
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users?.users?.map((user) => (
                <div
                  key={user.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedUser?.id === user.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {user.first_name} {user.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role Management */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Role</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedUser ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Selected User
                  </h3>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">
                      {selectedUser.first_name} {selectedUser.last_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedUser.email}
                    </p>
                    <Badge
                      className={`mt-2 ${getRoleBadgeColor(selectedUser.role)}`}
                    >
                      Current: {selectedUser.role}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Role
                  </label>
                  <Select value={newRole} onValueChange={setNewRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="semiadmin">Semi-Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Role Descriptions
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-gray-50 rounded">
                      <Badge className="bg-red-100 text-red-800 mr-2">
                        Admin
                      </Badge>
                      <span>{getRoleDescription("admin")}</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <Badge className="bg-yellow-100 text-yellow-800 mr-2">
                        Semi-Admin
                      </Badge>
                      <span>{getRoleDescription("semiadmin")}</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <Badge className="bg-gray-100 text-gray-800 mr-2">
                        User
                      </Badge>
                      <span>{getRoleDescription("user")}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleRoleUpdate}
                  disabled={!newRole || updateRoleMutation.isPending}
                  className="w-full"
                >
                  {updateRoleMutation.isPending ? "Updating..." : "Update Role"}
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Select a user from the list to manage their role</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Wrap with admin-only protection
const ProtectedRoleManagement = () => (
  <RoleGuard allowedRoles={["admin"]}>
    <RoleManagement />
  </RoleGuard>
);

export default ProtectedRoleManagement;
