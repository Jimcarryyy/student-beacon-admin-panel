
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, QrCode, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockStudents = [
  { id: 1, name: "John Smith", grade: "Grade 10", section: "A", status: "Active", photo: "/placeholder.svg", qrCode: "QR001" },
  { id: 2, name: "Maria Garcia", grade: "Grade 11", section: "B", status: "Active", photo: "/placeholder.svg", qrCode: "QR002" },
  { id: 3, name: "David Johnson", grade: "Grade 9", section: "C", status: "Inactive", photo: "/placeholder.svg", qrCode: "QR003" },
  { id: 4, name: "Sarah Wilson", grade: "Grade 12", section: "A", status: "Active", photo: "/placeholder.svg", qrCode: "QR004" },
  { id: 5, name: "Michael Brown", grade: "Grade 10", section: "B", status: "Active", photo: "/placeholder.svg", qrCode: "QR005" },
];

export function StudentsManagement() {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.section.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
    toast({
      title: "Student Deleted",
      description: "Student has been successfully removed from the system.",
    });
  };

  const handleRegenerateQR = (id: number) => {
    const newQRCode = `QR${Date.now()}`;
    setStudents(students.map(s => 
      s.id === id ? { ...s, qrCode: newQRCode } : s
    ));
    toast({
      title: "QR Code Regenerated",
      description: "New QR code has been generated for the student.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
          <p className="text-gray-600">Manage student records and QR codes</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter student name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="grade">Grade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="grade-9">Grade 9</SelectItem>
                      <SelectItem value="grade-10">Grade 10</SelectItem>
                      <SelectItem value="grade-11">Grade 11</SelectItem>
                      <SelectItem value="grade-12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="a">Section A</SelectItem>
                      <SelectItem value="b">Section B</SelectItem>
                      <SelectItem value="c">Section C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="photo">Student Photo</Label>
                <Input id="photo" type="file" accept="image/*" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Add Student
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
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Students ({filteredStudents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade/Section</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>QR Code</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.grade} - {student.section}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={student.status === 'Active' ? 'default' : 'secondary'}
                        className={student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{student.qrCode}</code>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRegenerateQR(student.id)}
                        >
                          <QrCode className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-600 hover:text-red-700"
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
