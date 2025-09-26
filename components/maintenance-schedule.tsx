"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Wrench, CheckCircle, AlertCircle, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function MaintenanceSchedule() {
  const upcomingMaintenance = [
    {
      id: "M001",
      line: "LT-A3",
      type: "Preventive Maintenance",
      priority: "medium",
      scheduledDate: "2024-01-15",
      scheduledTime: "09:00 AM",
      duration: "4 hours",
      technician: "Mike Johnson",
      description: "Routine transformer inspection and cleaning",
      status: "scheduled",
    },
    {
      id: "M002",
      line: "LT-B1",
      type: "Equipment Replacement",
      priority: "high",
      scheduledDate: "2024-01-16",
      scheduledTime: "08:00 AM",
      duration: "6 hours",
      technician: "Sarah Wilson",
      description: "Replace aging voltage regulator unit",
      status: "approved",
    },
    {
      id: "M003",
      line: "LT-C2",
      type: "Emergency Repair",
      priority: "critical",
      scheduledDate: "2024-01-14",
      scheduledTime: "02:00 PM",
      duration: "8 hours",
      technician: "John Smith",
      description: "Repair damaged insulator due to weather",
      status: "in_progress",
    },
    {
      id: "M004",
      line: "LT-D2",
      type: "Calibration",
      priority: "low",
      scheduledDate: "2024-01-18",
      scheduledTime: "10:00 AM",
      duration: "2 hours",
      technician: "Lisa Chen",
      description: "Calibrate protection relay settings",
      status: "pending_approval",
    },
  ]

  const completedMaintenance = [
    {
      id: "M005",
      line: "LT-A1",
      type: "Preventive Maintenance",
      completedDate: "2024-01-12",
      technician: "Mike Johnson",
      duration: "3.5 hours",
      status: "completed",
      notes: "All systems functioning normally after maintenance",
    },
    {
      id: "M006",
      line: "LT-B2",
      type: "Emergency Repair",
      completedDate: "2024-01-11",
      technician: "John Smith",
      duration: "5 hours",
      status: "completed",
      notes: "Replaced faulty circuit breaker, system restored",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-500 text-white">Scheduled</Badge>
      case "approved":
        return <Badge className="bg-green-500 text-white">Approved</Badge>
      case "in_progress":
        return <Badge className="bg-orange-500 text-white">In Progress</Badge>
      case "pending_approval":
        return <Badge className="bg-yellow-500 text-white">Pending Approval</Badge>
      case "completed":
        return <Badge className="bg-green-600 text-white">Completed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Maintenance Schedule</h1>
        <p className="text-muted-foreground">Planned and ongoing maintenance activities for power distribution lines</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Scheduled</div>
              </div>
              <CalendarIcon className="w-5 h-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <Wrench className="w-5 h-5 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-muted-foreground">Overdue</div>
              </div>
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Maintenance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Upcoming Maintenance
          </CardTitle>
          <Button>Schedule New</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingMaintenance.map((maintenance) => (
            <Card key={maintenance.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full", getPriorityColor(maintenance.priority))} />
                    <div>
                      <div className="font-semibold text-lg">
                        {maintenance.line} - {maintenance.type}
                      </div>
                      <div className="text-sm text-muted-foreground">ID: {maintenance.id}</div>
                    </div>
                  </div>
                  {getStatusBadge(maintenance.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Date:</span>
                      <span>{maintenance.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Time:</span>
                      <span>{maintenance.scheduledTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Technician:</span>
                      <span>{maintenance.technician}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Duration:</span>
                      <span>{maintenance.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Priority:</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "ml-2 text-xs",
                          maintenance.priority === "critical" && "border-red-500 text-red-600",
                          maintenance.priority === "high" && "border-orange-500 text-orange-600",
                          maintenance.priority === "medium" && "border-yellow-500 text-yellow-600",
                          maintenance.priority === "low" && "border-blue-500 text-blue-600",
                        )}
                      >
                        {maintenance.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium mb-1">Description:</div>
                  <div className="text-sm text-muted-foreground">{maintenance.description}</div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Edit Schedule
                  </Button>
                  <Button size="sm" variant="outline">
                    Assign Technician
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Recently Completed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Recently Completed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {completedMaintenance.map((maintenance) => (
            <Card key={maintenance.id} className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-lg">
                      {maintenance.line} - {maintenance.type}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completed on {maintenance.completedDate} by {maintenance.technician}
                    </div>
                  </div>
                  {getStatusBadge(maintenance.status)}
                </div>

                <div className="mb-3">
                  <div className="text-sm">
                    <span className="font-medium">Duration:</span> {maintenance.duration}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium mb-1">Notes:</div>
                  <div className="text-sm text-muted-foreground">{maintenance.notes}</div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Report
                  </Button>
                  <Button size="sm" variant="outline">
                    Schedule Follow-up
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
