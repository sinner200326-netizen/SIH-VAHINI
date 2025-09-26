"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, MapPin, Clock, Zap, TrendingDown, WifiOff, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

export function FaultDetection() {
  const faultCategories = [
    {
      name: "Overload / Load Exceeding",
      count: 5,
      severity: "high",
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      name: "Breaking of Line (LT)",
      count: 2,
      severity: "critical",
      icon: Zap,
      color: "text-red-600",
    },
    {
      name: "Power Line Down",
      count: 1,
      severity: "critical",
      icon: WifiOff,
      color: "text-red-600",
    },
    {
      name: "Equipment Faults",
      count: 3,
      severity: "medium",
      icon: Activity,
      color: "text-yellow-500",
    },
  ]

  const activeFaults = [
    {
      id: "F001",
      line: "LT-B3",
      type: "Breaking of Line (LT)",
      severity: "critical",
      location: "Lat: 28.6139, Lng: 77.2090",
      address: "Sector 15, Industrial Area",
      time: "2 hours ago",
      description: "Complete line break detected at transformer junction",
      status: "investigating",
    },
    {
      id: "F002",
      line: "LT-D1",
      type: "Power Line Down",
      severity: "critical",
      location: "Lat: 28.5355, Lng: 77.3910",
      address: "Residential Block C, Zone 4",
      time: "45 minutes ago",
      description: "Power line down due to weather conditions",
      status: "team_dispatched",
    },
    {
      id: "F003",
      line: "LT-A2",
      type: "Overload / Load Exceeding",
      severity: "high",
      location: "Lat: 28.7041, Lng: 77.1025",
      address: "Commercial District, Main Street",
      time: "15 minutes ago",
      description: "Load exceeding 95% capacity during peak hours",
      status: "monitoring",
    },
    {
      id: "F004",
      line: "LT-C1",
      type: "Equipment Faults",
      severity: "medium",
      location: "Lat: 28.4595, Lng: 77.0266",
      address: "Substation 7, Control Panel",
      time: "1 hour ago",
      description: "Voltage regulator showing irregular readings",
      status: "scheduled",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
      case "investigating":
        return <Badge className="bg-red-500 text-white">Investigating</Badge>
      case "team_dispatched":
        return <Badge className="bg-orange-500 text-white">Team Dispatched</Badge>
      case "monitoring":
        return <Badge className="bg-yellow-500 text-white">Monitoring</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500 text-white">Repair Scheduled</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Fault Detection & Management</h1>
        <p className="text-muted-foreground">Real-time fault monitoring and classification system</p>
      </div>

      {/* Fault Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {faultCategories.map((category) => {
          const Icon = category.icon
          return (
            <Card key={category.name}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={cn("w-5 h-5", category.color)} />
                  <div className={cn("w-2 h-2 rounded-full", getSeverityColor(category.severity))} />
                </div>
                <div className="text-2xl font-bold mb-1">{category.count}</div>
                <div className="text-sm text-muted-foreground">{category.name}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Active Faults */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Active Faults
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeFaults.map((fault) => (
            <Card key={fault.id} className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full", getSeverityColor(fault.severity))} />
                    <div>
                      <div className="font-semibold text-lg">
                        {fault.line} - {fault.type}
                      </div>
                      <div className="text-sm text-muted-foreground">Fault ID: {fault.id}</div>
                    </div>
                  </div>
                  {getStatusBadge(fault.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Location:</span>
                    </div>
                    <div className="text-sm text-muted-foreground ml-6">
                      <div>{fault.address}</div>
                      <div className="font-mono text-xs">{fault.location}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Detected:</span>
                      <span className="text-muted-foreground">{fault.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Severity:</span>
                      <Badge
                        variant="outline"
                        className={cn("text-xs", fault.severity === "critical" && "border-red-500 text-red-600")}
                      >
                        {fault.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium mb-1">Description:</div>
                  <div className="text-sm text-muted-foreground">{fault.description}</div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View on Map
                  </Button>
                  <Button size="sm" variant="outline">
                    Dispatch Team
                  </Button>
                  <Button size="sm" variant="outline">
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Fault Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fault Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Average Resolution Time</span>
                <span className="font-medium">2.4 hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Critical Faults (&lt; 1 hour)</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>High Priority (&lt; 4 hours)</span>
                <span className="font-medium">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prevention Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Preventive Maintenance</span>
                <span className="font-medium">78% effective</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Predicted Faults Prevented</span>
                <span className="font-medium">23 this month</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>System Reliability</span>
                <span className="font-medium">97.6%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
