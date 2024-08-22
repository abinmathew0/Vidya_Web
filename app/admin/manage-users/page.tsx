'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '../../components/Loading';

interface User {
  _id: string;
  email: string;
  role: string;
}

export default function ManageUsers() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
      router.push('/auth/error');
    } else {
      fetchUsers();
    }
  }, [status, session, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter(user => user._id !== userId));
      setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
      setNotification('User deleted successfully.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) {
        throw new Error('Failed to update user role');
      }
      const updatedUser = await response.json();
      setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
      setFilteredUsers(filteredUsers.map(user => (user._id === updatedUser._id ? updatedUser : user)));
      setNotification('User role updated successfully.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    filterUsers(value, roleFilter);
  };

  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRoleFilter(value);
    filterUsers(search, value);
  };

  const filterUsers = (searchValue: string, roleValue: string) => {
    let filtered = users;
    if (searchValue) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(searchValue)
      );
    }
    if (roleValue) {
      filtered = filtered.filter(user => user.role === roleValue);
    }
    setFilteredUsers(filtered);
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex flex-col items-center bg-lightCream p-4">
        <h1 className="text-4xl font-extrabold text-darkRed mb-6">Manage Users</h1>

        {notification && (
          <div className="bg-green-500 text-white p-2 mb-4 rounded">
            {notification}
          </div>
        )}

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by email"
            value={search}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <select
            value={roleFilter}
            onChange={handleRoleFilterChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <table className="min-w-full bg-white rounded-md shadow-md overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-darkRed">Email</th>
              <th className="px-4 py-2 text-left text-darkRed">Role</th>
              <th className="px-4 py-2 text-left text-darkRed">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2 text-darkRed">{user.email}</td>
                <td className="px-4 py-2 text-darkRed">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
}
