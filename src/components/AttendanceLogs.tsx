
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar as CalendarIcon, Download, Filter, FileText, Printer } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const mockLogs = [
  { id: 1, studentName: "John Smith", timeIn: "8:15 AM", timeOut: "3:45 PM", status: "Present", date: "2024-01-15", grade: "Grade 10" },
  { id: 2, studentName: "Maria Garcia", timeIn: "8:45 AM", timeOut: "3:30 PM", status: "Late", date: "2024-01-15", grade: "Grade 11" },
  { id: 3, studentName: "David Johnson", timeIn: "8:10 AM", timeOut: "3:40 PM", status: "Present", date: "2024-01-15", grade: "Grade 9" },
  { id: 4, studentName: "Sarah Wilson", timeIn: "8:35 AM", timeOut: "3:35 PM", status: "Late", date: "2024-01-15", grade: "Grade 12" },
  { id: 5, studentName: "Michael Brown", timeIn: "8:05 AM", timeOut: "3:50 PM", status: "Present", date: "2024-01-15", grade: "Grade 10" },
];

export function AttendanceLogs() {
  const [logs, setLogs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<Date>();
  const [gradeFilter, setGradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === "all" || log.grade === gradeFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesDate = !dateFilter || log.date === format(dateFilter, "yyyy-MM-dd");
    return matchesSearch && matchesGrade && matchesStatus && matchesDate;
  });

  const exportToCSV = () => {
    const headers = ["Student Name", "Time In", "Time Out", "Status", "Date", "Grade"];
    const csvContent = [
      headers.join(","),
      ...filteredLogs.map(log => [
        log.studentName,
        log.timeIn,
        log.timeOut,
        log.status,
        log.date,
        log.grade
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance_logs.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Logs</h1>
          <p className="text-gray-600">View and manage daily attendance records</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateFilter && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? format(dateFilter, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
                <SelectItem value="Grade 11">Grade 11</SelectItem>
                <SelectItem value="Grade 12">Grade 12</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setDateFilter(undefined);
                setGradeFilter("all");
                setStatusFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{filteredLogs.length}</div>
            <p className="text-sm text-gray-600">Total Records</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {filteredLogs.filter(log => log.status === "Present").length}
            </div>
            <p className="text-sm text-gray-600">Present</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {filteredLogs.filter(log => log.status === "Late").length}
            </div>
            <p className="text-sm text-gray-600">Late</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {filteredLogs.filter(log => log.status === "Absent").length}
            </div>
            <p className="text-sm text-gray-600">Absent</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Daily Logs ({filteredLogs.length} records)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Time In</TableHead>
                  <TableHead>Time Out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.studentName}</TableCell>
                    <TableCell>{log.grade}</TableCell>
                    <TableCell>{log.timeIn}</TableCell>
                    <TableCell>{log.timeOut || "Not checked out"}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={log.status === 'Present' ? 'default' : log.status === 'Late' ? 'secondary' : 'destructive'}
                        className={
                          log.status === 'Present' ? 'bg-green-100 text-green-800' :
                          log.status === 'Late' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.date}</TableCell>
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
