
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, CheckCircle, AlertTriangle, Plus, FileText, Settings } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const mockData = {
  totalStudents: 1247,
  inToday: 1089,
  outToday: 876,
  lateToday: 43,
  presentToday: 1089,
  totalUsers: 12
};

const weeklyData = [
  { day: 'Mon', present: 1100, late: 35 },
  { day: 'Tue', present: 1150, late: 28 },
  { day: 'Wed', present: 1089, late: 43 },
  { day: 'Thu', present: 1200, late: 22 },
  { day: 'Fri', present: 980, late: 67 },
];

const recentActivity = [
  { student: "John Smith", action: "Checked In", time: "8:15 AM", status: "on-time" },
  { student: "Maria Garcia", action: "Checked Out", time: "3:45 PM", status: "on-time" },
  { student: "David Johnson", action: "Checked In", time: "8:45 AM", status: "late" },
  { student: "Sarah Wilson", action: "Checked In", time: "8:10 AM", status: "on-time" },
  { student: "Michael Brown", action: "Checked Out", time: "3:30 PM", status: "on-time" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{mockData.totalStudents}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{mockData.inToday}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Out Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{mockData.outToday}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Late Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{mockData.lateToday}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{mockData.presentToday}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{mockData.totalUsers}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance Chart */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Weekly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#3B82F6" />
                <Bar dataKey="late" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">{activity.student.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.student}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{activity.time}</p>
                    <Badge 
                      variant={activity.status === 'late' ? 'destructive' : 'default'}
                      className={activity.status === 'late' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}
                    >
                      {activity.status === 'late' ? 'Late' : 'On Time'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="p-6 h-auto flex flex-col items-center space-y-2">
              <Plus className="h-8 w-8 text-blue-600" />
              <span className="font-medium">Add New Student</span>
              <span className="text-sm text-gray-500">Register a new student</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex flex-col items-center space-y-2">
              <FileText className="h-8 w-8 text-green-600" />
              <span className="font-medium">Generate Report</span>
              <span className="text-sm text-gray-500">Create attendance report</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex flex-col items-center space-y-2">
              <Settings className="h-8 w-8 text-purple-600" />
              <span className="font-medium">System Settings</span>
              <span className="text-sm text-gray-500">Configure system options</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
