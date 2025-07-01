
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Calendar as CalendarIcon, Download, FileText, TrendingUp, Users, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const monthlyData = [
  { month: 'Jan', present: 1200, late: 150, absent: 50 },
  { month: 'Feb', present: 1180, late: 170, absent: 60 },
  { month: 'Mar', present: 1220, late: 140, absent: 40 },
  { month: 'Apr', present: 1190, late: 160, absent: 55 },
  { month: 'May', present: 1210, late: 145, absent: 45 },
  { month: 'Jun', present: 1150, late: 180, absent: 70 },
];

const gradeData = [
  { grade: 'Grade 9', present: 300, late: 35, absent: 15 },
  { grade: 'Grade 10', present: 320, late: 40, absent: 20 },
  { grade: 'Grade 11', present: 310, late: 38, absent: 18 },
  { grade: 'Grade 12', present: 290, late: 42, absent: 22 },
];

const statusData = [
  { name: 'Present', value: 1089, color: '#10B981' },
  { name: 'Late', value: 43, color: '#F59E0B' },
  { name: 'Absent', value: 18, color: '#EF4444' },
];

export function Reports() {
  const [reportType, setReportType] = useState("monthly");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const generatePDFReport = () => {
    // PDF generation logic would go here
    console.log("Generating PDF report...");
  };

  const exportCSVReport = () => {
    // CSV export logic would go here
    console.log("Exporting CSV report...");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive attendance reports and insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportCSVReport}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={generatePDFReport}>
            <FileText className="w-4 h-4 mr-2" />
            Generate PDF
          </Button>
        </div>
      </div>

      {/* Report Filters */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Report Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Report type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="daily">Daily Report</SelectItem>
                <SelectItem value="weekly">Weekly Report</SelectItem>
                <SelectItem value="monthly">Monthly Report</SelectItem>
                <SelectItem value="yearly">Yearly Report</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="grade-9">Grade 9</SelectItem>
                <SelectItem value="grade-10">Grade 10</SelectItem>
                <SelectItem value="grade-11">Grade 11</SelectItem>
                <SelectItem value="grade-12">Grade 12</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "PPP") : <span>From date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateTo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "PPP") : <span>To date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <Button className="bg-blue-600 hover:bg-blue-700">
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Daily Attendance</p>
                <div className="text-2xl font-bold text-gray-900">94.2%</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.3% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Late Rate</p>
                <div className="text-2xl font-bold text-gray-900">3.8%</div>
                <p className="text-xs text-red-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +0.5% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Best Performing Grade</p>
                <div className="text-2xl font-bold text-gray-900">Grade 10</div>
                <p className="text-xs text-gray-600">96.5% attendance rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Peak Check-in Time</p>
                <div className="text-2xl font-bold text-gray-900">8:15 AM</div>
                <p className="text-xs text-gray-600">Most students arrive</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Attendance Trend */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Monthly Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2} />
                <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Status Distribution */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Today's Attendance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Grade-wise Performance */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Grade-wise Attendance Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="present" fill="#10B981" />
              <Bar dataKey="late" fill="#F59E0B" />
              <Bar dataKey="absent" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
