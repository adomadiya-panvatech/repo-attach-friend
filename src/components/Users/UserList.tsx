
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as userService from '../../services/userService';
import UserForm from './UserForm';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Trash2, Edit, UserX, Search, Plus } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const UserList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchUsers = () => {
    if (user) {
      userService.getUsers(localStorage.getItem('token')!).then(setUsers);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await userService.deleteUser(id, localStorage.getItem('token')!);
      fetchUsers();
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (u: any) => setEditing(u);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userService.updateUser(editing.id, editing, localStorage.getItem('token')!);
      setEditing(null);
      fetchUsers();
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
    }
  };

  const handleBan = async (id: string) => {
    try {
      await userService.banUser(id, localStorage.getItem('token')!);
      fetchUsers();
      toast({
        title: "Success",
        description: "User banned successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to ban user",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) return <div className="text-center py-8 text-muted-foreground">Login required</div>;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <UserForm onUserCreated={() => {
              fetchUsers();
              setShowCreateForm(false);
            }} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Users ({filteredUsers.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {u.banned ? (
                        <Badge variant="destructive">Banned</Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleEdit(u)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                            </DialogHeader>
                            {editing && editing.id === u.id && (
                              <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="name">Name</Label>
                                  <Input
                                    id="name"
                                    value={editing.name}
                                    onChange={e => setEditing({ ...editing, name: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="role">Role</Label>
                                  <Select
                                    value={editing.role}
                                    onValueChange={value => setEditing({ ...editing, role: value })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="user">User</SelectItem>
                                      <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex gap-2">
                                  <Button type="submit">Save Changes</Button>
                                  <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                                    Cancel
                                  </Button>
                                </div>
                              </form>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {user?.role === 'admin' && u.role !== 'admin' && !u.banned && (
                          <Button variant="outline" size="sm" onClick={() => handleBan(u.id)}>
                            <UserX className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button variant="outline" size="sm" onClick={() => handleDelete(u.id)}>
                          <Trash2 className="h-4 w-4" />
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
};

export default UserList;
