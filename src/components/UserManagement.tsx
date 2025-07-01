
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Shield, Key } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockUsers = [
  { id: 1, username: "admin", email: "admin@school.edu", role: "Admin", status: "Active", lastLogin: "2024-01-15 09:30 AM" },
  { id: 2, username: "teacher1", email: "mary.jones@school.edu", role: "Teacher", status: "Active", lastLogin: "2024-01-15 08:45 AM" },
  { id: 3, username: "teacher2", email: "john.doe@school.edu", role: "Teacher", status: "Active", lastLogin: "2024-01-14 02:30 PM" },
  { id: 4, username: "staff1", email: "jane.smith@school.edu", role: "Staff", status: "Inactive", lastLogin: "2024-01-10 11:15 AM" },
];

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
    toast({
      title: "User Deleted",
      description: "User has been successfully removed from the system.",
    });
  };

  const handleResetPassword = (id: number) => {
    // Password reset logic would go here
    toast({
      title: "Password Reset",
      description: "Password reset link has been sent to the user's email.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage system users and their permissions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter username" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="password">Temporary Password</Label>
                <Input id="password" type="password" placeholder="Enter temporary password" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Create User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Admin</h3>
            </div>
            <p className="text-sm text-blue-700 mt-2">Full system access, user management, settings</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Teacher</h3>
            </div>
            <p className="text-sm text-green-700 mt-2">Student management, attendance logs, reports</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-orange-900">Staff</h3>
            </div>
            <p className="text-sm text-orange-700 mt-2">View-only access to attendance logs</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            System Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          user.role === 'Admin' ? 'border-blue-200 text-blue-800 bg-blue-50' :
                          user.role === 'Teacher' ? 'border-green-200 text-green-800 bg-green-50' :
                          'border-orange-200 text-orange-800 bg-orange-50'
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'Active' ? 'default' : 'secondary'}
                        className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleResetPassword(user.id)}
                        >
                          <Key className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                          disabled={user.role === 'Admin'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
