"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LineStatusOverviewProps {
  selectedRegion: string
}

export function LineStatusOverview({ selectedRegion }: LineStatusOverviewProps) {
  const regions = [
    {
      name: "North Region (Sector A)",
      lines: [
        { id: "A1", status: "operational", load: 78, voltage: "230V", amperage: "45A" },
        { id: "A2", status: "operational", load: 65, voltage: "230V", amperage: "52A" },
        { id: "A3", status: "maintenance", load: 0, voltage: "0V", amperage: "0A" },
        { id: "A4", status: "operational", load: 42, voltage: "230V", amperage: "41A" },
      ],
    },
    {
      name: "East Region (Sector B)",
      lines: [
        { id: "B1", status: "operational", load: 91, voltage: "230V", amperage: "58A" },
        { id: "B2", status: "operational", load: 88, voltage: "230V", amperage: "43A" },
        { id: "B3", status: "fault", load: 0, voltage: "0V", amperage: "0A" },
      ],
    },
    {
      name: "South Region (Sector C)",
      lines: [
        { id: "C1", status: "operational", load: 76, voltage: "230V", amperage: "49A" },
        { id: "C2", status: "operational", load: 54, voltage: "230V", amperage: "52A" },
        { id: "C3", status: "operational", load: 67, voltage: "230V", amperage: "41A" },
      ],
    },
    {
      name: "West Region (Sector D)",
      lines: [
        { id: "D1", status: "fault", load: 0, voltage: "0V", amperage: "0A" },
        { id: "D2", status: "operational", load: 72, voltage: "230V", amperage: "43A" },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500"
      case "maintenance":
        return "bg-yellow-500"
      case "fault":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-500 text-white">Operational</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500 text-white">Under Maintenance</Badge>
      case "fault":
        return <Badge className="bg-red-500 text-white">Fault Detected</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const filteredRegions =
    selectedRegion === "all"
      ? regions
      : regions.filter((region) => region.name.toLowerCase().includes(selectedRegion.toLowerCase()))

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Line Status Overview</h1>
        <p className="text-muted-foreground">Real-time monitoring of power distribution lines across all sectors</p>
      </div>

      <div className="space-y-6">
        {filteredRegions.map((region) => (
          <Card key={region.name}>
            <CardHeader>
              <CardTitle className="text-lg">{region.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {region.lines.map((line) => (
                  <Card key={line.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-3 h-3 rounded-full", getStatusColor(line.status))} />
                          <span className="font-bold text-lg">Line {line.id}</span>
                        </div>
                        {getStatusBadge(line.status)}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Voltage:</span>
                          <span className="font-medium">{line.voltage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current:</span>
                          <span className="font-medium">{line.amperage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Load:</span>
                          <span className="font-medium">{line.load}%</span>
                        </div>

                        {line.status === "operational" && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Load Capacity</span>
                              <span>{line.load}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={cn(
                                  "h-2 rounded-full transition-all",
                                  line.load > 80 ? "bg-red-500" : line.load > 60 ? "bg-yellow-500" : "bg-green-500",
                                )}
                                style={{ width: `${line.load}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {line.status === "fault" && (
                          <div className="mt-3 p-2 bg-red-50 rounded text-xs text-red-700">
                            Fault Detected - Requires immediate attention
                          </div>
                        )}

                        {line.status === "maintenance" && (
                          <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-yellow-700">
                            Scheduled maintenance in progress
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button className="bg-blue-600 hover:bg-blue-700">Load More Lines (115 remaining)</Button>
      </div>
    </div>
  )
}
