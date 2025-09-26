"use client"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Play,
  Square,
  RotateCcw,
  Wrench,
  TrendingUp,
  FileText,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
} from "lucide-react"

interface DashboardProps {
  selectedRegion: string
  activeView: string
}

const getRegionData = (region: string) => {
  const regionData = {
    all: {
      totalLines: "127",
      activeLines: "124",
      faultedLines: "3",
      powerLoad: "85.2%",
      uptime: "97.6%",
      systemHealth: [
        { name: "Transformer Health", value: 94, status: "good" },
        { name: "Line Integrity", value: 87, status: "warning" },
        { name: "Protection Systems", value: 98, status: "good" },
        { name: "Communication", value: 96, status: "good" },
      ],
      lineStatusData: [
        { id: "LT-001", voltage: "230V", current: "45A", status: "active", load: "78%" },
        { id: "LT-002", voltage: "230V", current: "52A", status: "active", load: "85%" },
        { id: "LT-003", voltage: "0V", current: "0A", status: "fault", load: "0%" },
        { id: "LT-004", voltage: "230V", current: "38A", status: "active", load: "65%" },
        { id: "LT-005", voltage: "230V", current: "42A", status: "active", load: "72%" },
        { id: "LT-006", voltage: "0V", current: "0A", status: "maintenance", load: "0%" },
        { id: "LT-007", voltage: "0V", current: "0A", status: "fault", load: "0%" },
        { id: "LT-008", voltage: "230V", current: "48A", status: "active", load: "82%" },
      ],
    },
    north: {
      totalLines: "32",
      activeLines: "31",
      faultedLines: "1",
      powerLoad: "78.4%",
      uptime: "96.9%",
      systemHealth: [
        { name: "Transformer Health", value: 96, status: "good" },
        { name: "Line Integrity", value: 92, status: "good" },
        { name: "Protection Systems", value: 99, status: "good" },
        { name: "Communication", value: 94, status: "good" },
      ],
      lineStatusData: [
        { id: "NT-001", voltage: "230V", current: "42A", status: "active", load: "75%" },
        { id: "NT-002", voltage: "230V", current: "38A", status: "active", load: "68%" },
        { id: "NT-003", voltage: "0V", current: "0A", status: "fault", load: "0%" },
        { id: "NT-004", voltage: "230V", current: "45A", status: "active", load: "80%" },
        { id: "NT-005", voltage: "230V", current: "40A", status: "active", load: "72%" },
        { id: "NT-006", voltage: "230V", current: "44A", status: "active", load: "78%" },
        { id: "NT-007", voltage: "230V", current: "39A", status: "active", load: "70%" },
        { id: "NT-008", voltage: "230V", current: "46A", status: "active", load: "82%" },
      ],
    },
    east: {
      totalLines: "28",
      activeLines: "27",
      faultedLines: "1",
      powerLoad: "82.1%",
      uptime: "96.4%",
      systemHealth: [
        { name: "Transformer Health", value: 91, status: "warning" },
        { name: "Line Integrity", value: 88, status: "warning" },
        { name: "Protection Systems", value: 97, status: "good" },
        { name: "Communication", value: 95, status: "good" },
      ],
      lineStatusData: [
        { id: "ET-001", voltage: "230V", current: "48A", status: "active", load: "85%" },
        { id: "ET-002", voltage: "230V", current: "52A", status: "active", load: "92%" },
        { id: "ET-003", voltage: "230V", current: "44A", status: "active", load: "78%" },
        { id: "ET-004", voltage: "230V", current: "46A", status: "active", load: "82%" },
        { id: "ET-005", voltage: "230V", current: "50A", status: "active", load: "88%" },
        { id: "ET-006", voltage: "230V", current: "46A", status: "active", load: "82%" },
        { id: "ET-007", voltage: "230V", current: "49A", status: "active", load: "87%" },
        { id: "ET-008", voltage: "230V", current: "47A", status: "active", load: "84%" },
      ],
    },
    south: {
      totalLines: "35",
      activeLines: "34",
      faultedLines: "1",
      powerLoad: "89.7%",
      uptime: "97.1%",
      systemHealth: [
        { name: "Transformer Health", value: 93, status: "good" },
        { name: "Line Integrity", value: 85, status: "warning" },
        { name: "Protection Systems", value: 98, status: "good" },
        { name: "Communication", value: 97, status: "good" },
      ],
      lineStatusData: [
        { id: "ST-001", voltage: "230V", current: "55A", status: "active", load: "95%" },
        { id: "ST-002", voltage: "230V", current: "53A", status: "active", load: "92%" },
        { id: "ST-003", voltage: "230V", current: "51A", status: "active", load: "89%" },
        { id: "ST-004", voltage: "230V", current: "49A", status: "active", load: "86%" },
        { id: "ST-005", voltage: "0V", current: "0A", status: "fault", load: "0%" },
        { id: "ST-006", voltage: "230V", current: "52A", status: "active", load: "91%" },
        { id: "ST-007", voltage: "230V", current: "54A", status: "active", load: "94%" },
        { id: "ST-008", voltage: "230V", current: "50A", status: "active", load: "88%" },
      ],
    },
    west: {
      totalLines: "32",
      activeLines: "32",
      faultedLines: "0",
      powerLoad: "76.8%",
      uptime: "100%",
      systemHealth: [
        { name: "Transformer Health", value: 98, status: "good" },
        { name: "Line Integrity", value: 95, status: "good" },
        { name: "Protection Systems", value: 99, status: "good" },
        { name: "Communication", value: 98, status: "good" },
      ],
      lineStatusData: [
        { id: "WT-001", voltage: "230V", current: "35A", status: "active", load: "62%" },
        { id: "WT-002", voltage: "230V", current: "38A", status: "active", load: "68%" },
        { id: "WT-003", voltage: "230V", current: "42A", status: "active", load: "75%" },
        { id: "WT-004", voltage: "230V", current: "40A", status: "active", load: "71%" },
        { id: "WT-005", voltage: "230V", current: "36A", status: "active", load: "64%" },
        { id: "WT-006", voltage: "230V", current: "44A", status: "active", load: "78%" },
        { id: "WT-007", voltage: "230V", current: "41A", status: "active", load: "73%" },
        { id: "WT-008", voltage: "230V", current: "39A", status: "active", load: "69%" },
      ],
    },
  }

  return regionData[region as keyof typeof regionData] || regionData.all
}

const getMaintenanceData = (region: string) => {
  const maintenanceData = {
    all: [
      { month: "Jan", scheduled: 12, completed: 11, emergency: 3 },
      { month: "Feb", scheduled: 15, completed: 14, emergency: 2 },
      { month: "Mar", scheduled: 18, completed: 17, emergency: 4 },
      { month: "Apr", scheduled: 14, completed: 13, emergency: 1 },
      { month: "May", scheduled: 16, completed: 15, emergency: 2 },
      { month: "Jun", scheduled: 20, completed: 19, emergency: 3 },
    ],
    north: [
      { month: "Jan", scheduled: 3, completed: 3, emergency: 1 },
      { month: "Feb", scheduled: 4, completed: 4, emergency: 0 },
      { month: "Mar", scheduled: 5, completed: 4, emergency: 1 },
      { month: "Apr", scheduled: 3, completed: 3, emergency: 0 },
      { month: "May", scheduled: 4, completed: 4, emergency: 1 },
      { month: "Jun", scheduled: 5, completed: 5, emergency: 0 },
    ],
    east: [
      { month: "Jan", scheduled: 3, completed: 2, emergency: 1 },
      { month: "Feb", scheduled: 4, completed: 3, emergency: 1 },
      { month: "Mar", scheduled: 4, completed: 4, emergency: 2 },
      { month: "Apr", scheduled: 3, completed: 3, emergency: 0 },
      { month: "May", scheduled: 4, completed: 3, emergency: 1 },
      { month: "Jun", scheduled: 5, completed: 5, emergency: 1 },
    ],
    south: [
      { month: "Jan", scheduled: 4, completed: 4, emergency: 1 },
      { month: "Feb", scheduled: 5, completed: 5, emergency: 1 },
      { month: "Mar", scheduled: 6, completed: 6, emergency: 1 },
      { month: "Apr", scheduled: 5, completed: 4, emergency: 1 },
      { month: "May", scheduled: 5, completed: 5, emergency: 0 },
      { month: "Jun", scheduled: 6, completed: 6, emergency: 1 },
    ],
    west: [
      { month: "Jan", scheduled: 2, completed: 2, emergency: 0 },
      { month: "Feb", scheduled: 2, completed: 2, emergency: 0 },
      { month: "Mar", scheduled: 3, completed: 3, emergency: 0 },
      { month: "Apr", scheduled: 3, completed: 3, emergency: 0 },
      { month: "May", scheduled: 3, completed: 3, emergency: 0 },
      { month: "Jun", scheduled: 4, completed: 3, emergency: 1 },
    ],
  }

  return maintenanceData[region as keyof typeof maintenanceData] || maintenanceData.all
}

export function Dashboard({ selectedRegion, activeView }: DashboardProps) {
  const regionData = getRegionData(selectedRegion)
  const maintenanceData = getMaintenanceData(selectedRegion)

  const teamMembers = [
    { name: "Prateek Sharma", role: "Grid Operator", status: "online", avatar: "PS" },
    { name: "Aditya Raj Singh", role: "Field Technician", status: "online", avatar: "AS" },
    { name: "Kartik", role: "Control Room", status: "online", avatar: "KT" },
    { name: "Himanshi", role: "Maintenance", status: "busy", avatar: "HM" },
    { name: "Daksh", role: "Engineer", status: "online", avatar: "DK" },
    { name: "Harshika", role: "Field Technician", status: "online", avatar: "HK" },
  ]

  const scheduledTasks = [
    { task: "Morning system check", status: "completed", time: "08:30" },
    { task: "LT-006 maintenance", status: "pending", time: "14:00 today" },
    { task: "Weekly load analysis", status: "pending", time: "Tomorrow" },
    { task: "Equipment calibration", status: "pending", time: "Friday" },
  ]

  const quickActions = [
    { label: "Start Line", icon: Play, color: "bg-green-500" },
    { label: "Stop Line", icon: Square, color: "bg-red-500" },
    { label: "Reset", icon: RotateCcw, color: "bg-blue-500" },
    { label: "Maintenance", icon: Wrench, color: "bg-yellow-500" },
    { label: "Analytics", icon: TrendingUp, color: "bg-purple-500" },
    { label: "Export", icon: FileText, color: "bg-gray-500" },
  ]

  const recentActivity = [
    {
      message: "Line LT-015 restored successfully",
      details: "Maintenance completed by Himanshi • 15 minutes ago",
      icon: CheckCircle,
      iconColor: "text-green-500",
    },
    {
      message: "Kartik logged in to control room",
      details: "Control room access • 32 minutes ago",
      icon: Users,
      iconColor: "text-blue-500",
    },
    {
      message: "High load warning triggered for Zone C",
      details: "Automatic alert • 45 minutes ago",
      icon: AlertTriangle,
      iconColor: "text-yellow-500",
    },
    {
      message: "Weekly report generated",
      details: "System automated • 1 hour ago",
      icon: FileText,
      iconColor: "text-purple-500",
    },
    {
      message: "Emergency response activated for LT-003",
      details: "Dispatched field team led by Aditya Raj Singh • 2 hours ago",
      icon: Zap,
      iconColor: "text-red-500",
    },
  ]

  const topStats = [
    {
      label: "Total Lines",
      value: regionData.totalLines,
      change: "+2.5% from last month",
      trend: "up",
      icon: BarChart3,
    },
    {
      label: "Active Lines",
      value: regionData.activeLines,
      change: `${regionData.uptime} operational`,
      trend: "up",
      icon: CheckCircle,
    },
    {
      label: "Faulted Lines",
      value: regionData.faultedLines,
      change: "Needs attention",
      trend: "down",
      icon: AlertTriangle,
    },
    { label: "Power Load", value: regionData.powerLoad, change: "High demand", trend: "up", icon: Zap },
  ]

  const criticalAlerts = [
    {
      title: "Line LT-003 Power Outage",
      description: "Complete power failure detected on residential line serving 450 customers",
      priority: "HIGH PRIORITY",
      time: "2 minutes ago",
      zone: "Zone: Residential-A",
      actions: ["Dispatch Team", "View Details"],
      type: "power",
    },
    {
      title: "Line LT-007 Voltage Fluctuation",
      description: "Unstable voltage detected, ranging between 180V-250V",
      priority: "MEDIUM PRIORITY",
      time: "8 minutes ago",
      zone: "Zone: Commercial-B",
      actions: ["Investigate", "Monitor"],
      type: "voltage",
    },
    {
      title: "High Load Warning - Multiple Lines",
      description: "15 lines operating above 85% capacity during peak hours",
      priority: "LOW PRIORITY",
      time: "12 minutes ago",
      zone: "Zone: Mixed",
      actions: ["Load Balance", "Schedule"],
      type: "load",
    },
  ]

  if (activeView === "analytics") {
    return (
      <div className="p-6 space-y-6">
        {/* Analytics Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Analytics Dashboard</h2>
              <p className="text-blue-100 dark:text-blue-200">
                Maintenance insights for{" "}
                {selectedRegion === "all"
                  ? "All Regions"
                  : selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}{" "}
                Region
              </p>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">
                  {maintenanceData.reduce((acc, curr) => acc + curr.completed, 0)}
                </div>
                <div className="text-sm text-blue-100 dark:text-blue-200">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {maintenanceData.reduce((acc, curr) => acc + curr.emergency, 0)}
                </div>
                <div className="text-sm text-blue-100 dark:text-blue-200">Emergency</div>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Maintenance Schedule vs Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-lg p-4">
                <div className="space-y-4">
                  {maintenanceData.map((data, index) => (
                    <div key={data.month} className="space-y-2">
                      <div className="flex justify-between text-sm font-medium dark:text-white">
                        <span>{data.month}</span>
                        <span>
                          {data.completed}/{data.scheduled}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div className="flex-1 bg-gray-200 dark:bg-slate-600 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(data.completed / data.scheduled) * 100}%` }}
                          />
                        </div>
                        <div className="w-12 text-xs text-center dark:text-gray-300">
                          {Math.round((data.completed / data.scheduled) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Emergency Maintenance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 rounded-lg p-4">
                <div className="space-y-4">
                  {maintenanceData.map((data, index) => (
                    <div key={data.month} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium dark:text-white">{data.month}</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex gap-1">
                          {Array.from({ length: Math.max(5, data.emergency) }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-4 h-6 rounded ${
                                i < data.emergency
                                  ? "bg-gradient-to-t from-red-500 to-red-400"
                                  : "bg-gray-200 dark:bg-slate-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium dark:text-gray-300">{data.emergency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Completion Rate</p>
                  <div className="text-2xl font-bold dark:text-white">
                    {Math.round(
                      (maintenanceData.reduce((acc, curr) => acc + curr.completed, 0) /
                        maintenanceData.reduce((acc, curr) => acc + curr.scheduled, 0)) *
                        100,
                    )}
                    %
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">+5% from last period</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 dark:bg-green-500/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Avg Response Time</p>
                  <div className="text-2xl font-bold dark:text-white">2.4h</div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">-0.3h improvement</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 dark:bg-blue-500/30 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Cost Efficiency</p>
                  <div className="text-2xl font-bold dark:text-white">₹2.1M</div>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">₹0.3M saved</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/30 dark:bg-purple-500/40 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {topStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      {stat.trend === "up" ? (
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Advanced Line Status Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{regionData.totalLines}</div>
              <div className="text-sm text-muted-foreground">Total Lines</div>
              <div className="text-xs text-muted-foreground mt-1">LT power distribution lines</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{regionData.activeLines}</div>
              <div className="text-sm text-muted-foreground">Active Lines</div>
              <div className="text-xs text-green-600 mt-1">Operational</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{regionData.faultedLines}</div>
              <div className="text-sm text-muted-foreground">Faulted</div>
              <div className="text-xs text-red-600 mt-1">Needs attention</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{regionData.uptime}</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <div className="text-xs text-blue-600 mt-1">System availability</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Row Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-500" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {regionData.systemHealth.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all",
                      item.status === "good" && "bg-green-500",
                      item.status === "warning" && "bg-yellow-500",
                      item.status === "critical" && "bg-red-500",
                    )}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Team Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              Team Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{member.name}</div>
                  <div className="text-xs text-muted-foreground">{member.role}</div>
                </div>
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    member.status === "online" && "bg-green-500",
                    member.status === "busy" && "bg-yellow-500",
                    member.status === "offline" && "bg-gray-400",
                  )}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Scheduled Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              Scheduled Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {scheduledTasks.map((task, index) => (
              <div key={index} className="flex items-center gap-3">
                {task.status === "completed" ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Clock className="w-4 h-4 text-muted-foreground" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{task.task}</div>
                  <div className="text-xs text-muted-foreground">Due: {task.time}</div>
                </div>
                <Badge variant={task.status === "completed" ? "default" : "secondary"}>{task.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Real-time Line Status
          </CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Fault</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Maintenance</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {regionData.lineStatusData.map((line) => (
              <div
                key={line.id}
                className={`p-4 rounded-lg border-2 ${
                  line.status === "active"
                    ? "border-green-500 bg-green-500/10"
                    : line.status === "fault"
                      ? "border-red-500 bg-red-500/10"
                      : "border-yellow-500 bg-yellow-500/10"
                }`}
              >
                <div className="text-sm font-medium mb-2">{line.id}</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>
                    {line.voltage} • {line.current}
                  </div>
                  <div>Load: {line.load}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" className="text-blue-600 bg-transparent">
              View All {regionData.totalLines} Lines →
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/50">
        <CardHeader className="bg-red-500/10">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Critical Alerts & Notifications
            </div>
            <Badge variant="destructive">3 Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {criticalAlerts.map((alert, index) => (
            <div key={index} className="p-4 border-b last:border-b-0 border-red-500/20">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {alert.type === "power" && <Zap className="w-4 h-4 text-red-500" />}
                    {alert.type === "voltage" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    {alert.type === "load" && <BarChart3 className="w-4 h-4 text-orange-500" />}
                    <h4 className="font-medium">{alert.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <Badge
                      variant={
                        alert.priority === "HIGH PRIORITY"
                          ? "destructive"
                          : alert.priority === "MEDIUM PRIORITY"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {alert.priority}
                    </Badge>
                    <span>{alert.time}</span>
                    <span>{alert.zone}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {alert.actions.map((action) => (
                    <Button key={action} size="sm" variant="outline">
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions & Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            Quick Actions & Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-20 flex-col gap-2 hover:bg-muted bg-transparent"
                >
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", action.color)}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs">{action.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            Recent Activity
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-blue-600">
            View All
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div key={index} className="flex items-start gap-3">
                <Icon className={cn("w-5 h-5 mt-0.5", activity.iconColor)} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{activity.message}</div>
                  <div className="text-xs text-muted-foreground">{activity.details}</div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-500" />
              Load Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Load distribution pie chart</p>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Residential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Commercial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span>Industrial</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
