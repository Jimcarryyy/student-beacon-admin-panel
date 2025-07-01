
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings as SettingsIcon, Calendar as CalendarIcon, Bell, Database, Upload, Shield } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export function Settings() {
  const [schoolYearStart, setSchoolYearStart] = useState<Date>();
  const [schoolYearEnd, setSchoolYearEnd] = useState<Date>();
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    lateArrivalAlerts: true,
    missedCheckoutAlerts: true,
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your system settings have been updated successfully.",
    });
  };

  const handleBackupDatabase = () => {
    toast({
      title: "Backup Initiated",
      description: "Database backup has been started. You'll receive an email when complete.",
    });
  };

  const handleRestoreDatabase = () => {
    toast({
      title: "Restore Initiated",
      description: "Database restore process has been started.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system preferences and settings</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveSettings}>
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5" />
                <span>General Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input id="schoolName" defaultValue="Lincoln High School" />
                </div>
                <div>
                  <Label htmlFor="address">School Address</Label>
                  <Input id="address" defaultValue="123 Education St, Learning City" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" defaultValue="admin@lincolnhigh.edu" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="logo">School Logo</Label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium">Logo</span>
                  </div>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Logo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="est">Eastern Standard Time</SelectItem>
                      <SelectItem value="cst">Central Standard Time</SelectItem>
                      <SelectItem value="mst">Mountain Standard Time</SelectItem>
                      <SelectItem value="pst">Pacific Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Academic Year Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>School Year Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !schoolYearStart && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {schoolYearStart ? format(schoolYearStart, "PPP") : <span>Pick start date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={schoolYearStart}
                        onSelect={setSchoolYearStart}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label>School Year End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !schoolYearEnd && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {schoolYearEnd ? format(schoolYearEnd, "PPP") : <span>Pick end date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={schoolYearEnd}
                        onSelect={setSchoolYearEnd}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="lateThreshold">Late Arrival Threshold (minutes)</Label>
                  <Input id="lateThreshold" type="number" defaultValue="15" />
                </div>
                <div>
                  <Label htmlFor="earlyDismissal">Early Dismissal Time</Label>
                  <Input id="earlyDismissal" type="time" defaultValue="15:30" />
                </div>
              </div>

              <div>
                <Label>School Schedule</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="startTime" className="text-sm">School Start Time</Label>
                    <Input id="startTime" type="time" defaultValue="08:00" />
                  </div>
                  <div>
                    <Label htmlFor="endTime" className="text-sm">School End Time</Label>
                    <Input id="endTime" type="time" defaultValue="15:30" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-gray-600">Receive email notifications for important events</p>
                  </div>
                  <Switch 
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailAlerts: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-gray-600">Receive SMS notifications for urgent matters</p>
                  </div>
                  <Switch 
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, smsAlerts: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Late Arrival Alerts</Label>
                    <p className="text-sm text-gray-600">Get notified when students arrive late</p>
                  </div>
                  <Switch 
                    checked={notifications.lateArrivalAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, lateArrivalAlerts: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Missed Checkout Alerts</Label>
                    <p className="text-sm text-gray-600">Alert when students don't check out</p>
                  </div>
                  <Switch 
                    checked={notifications.missedCheckoutAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, missedCheckoutAlerts: checked})}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="adminEmail">Administrator Email</Label>
                    <Input id="adminEmail" type="email" defaultValue="admin@lincolnhigh.edu" />
                  </div>
                  <div>
                    <Label htmlFor="smsNumber">Administrator Phone</Label>
                    <Input id="smsNumber" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="60" />
                </div>
                <div>
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input id="passwordExpiry" type="number" defaultValue="90" />
                </div>
                <div>
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input id="maxLoginAttempts" type="number" defaultValue="5" />
                </div>
                <div>
                  <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                  <Input id="lockoutDuration" type="number" defaultValue="30" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Strong Passwords</Label>
                    <p className="text-sm text-gray-600">Enforce complex password requirements</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-gray-600">Log all user activities</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Backup & Restore</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Database Backup</h3>
                  <p className="text-sm text-gray-600">Create a backup of your database</p>
                  <Button className="w-full" onClick={handleBackupDatabase}>
                    <Database className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Database Restore</h3>
                  <p className="text-sm text-gray-600">Restore from a previous backup</p>
                  <Input type="file" accept=".sql,.db" />
                  <Button variant="outline" className="w-full" onClick={handleRestoreDatabase}>
                    <Upload className="w-4 h-4 mr-2" />
                    Restore Backup
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-4">Automatic Backup Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Automatic Backups</Label>
                      <p className="text-sm text-gray-600">Automatically backup database daily</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="backupTime">Backup Time</Label>
                      <Input id="backupTime" type="time" defaultValue="02:00" />
                    </div>
                    <div>
                      <Label htmlFor="retentionDays">Retention Period (days)</Label>
                      <Input id="retentionDays" type="number" defaultValue="30" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
