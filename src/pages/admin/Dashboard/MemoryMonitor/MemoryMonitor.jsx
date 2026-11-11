import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  MemoryStick,
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Server,
  HardDrive,
  Cpu,
  Wifi,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "../../../../lib/axiosInstance";

const MemoryMonitor = () => {
  const [memoryStats, setMemoryStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchMemoryStats = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/video/memory-stats");
      setMemoryStats(response.data);
    } catch (error) {
      console.error("Error fetching memory stats:", error);
      toast.error("Failed to fetch memory statistics");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemoryStats();
  }, []);

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchMemoryStats, 5000); // Refresh every 5 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const getMemoryStatus = (heapUsed, heapTotal) => {
    const usagePercentage = (heapUsed / heapTotal) * 100;
    if (usagePercentage > 80) return { status: "critical", color: "red" };
    if (usagePercentage > 60) return { status: "warning", color: "yellow" };
    return { status: "good", color: "green" };
  };

  const getStreamingStatus = (activeStreams) => {
    if (activeStreams > 20) return { status: "high", color: "red" };
    if (activeStreams > 10) return { status: "medium", color: "yellow" };
    return { status: "low", color: "green" };
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  if (!memoryStats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading memory statistics...</span>
        </div>
      </div>
    );
  }

  const memoryStatus = getMemoryStatus(
    memoryStats.memory.heapUsed,
    memoryStats.memory.heapTotal
  );
  const streamingStatus = getStreamingStatus(
    memoryStats.streaming.activeStreams
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Memory Monitor</h1>
          <p className="text-muted-foreground mt-1">
            Real-time server memory and streaming performance monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`}
            />
            Auto Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchMemoryStats}
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className={`border-l-4 ${
              memoryStatus.status === "critical"
                ? "border-red-500"
                : memoryStatus.status === "warning"
                ? "border-yellow-500"
                : "border-green-500"
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Memory Status
              </CardTitle>
              {memoryStatus.status === "critical" ? (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              ) : memoryStatus.status === "warning" ? (
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  (memoryStats.memory.heapUsed / memoryStats.memory.heapTotal) *
                  100
                ).toFixed(1)}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                {memoryStats.memory.heapUsed}MB / {memoryStats.memory.heapTotal}
                MB
              </p>
              <Badge
                variant="outline"
                className={`mt-2 ${
                  memoryStatus.status === "critical"
                    ? "border-red-500 text-red-500"
                    : memoryStatus.status === "warning"
                    ? "border-yellow-500 text-yellow-500"
                    : "border-green-500 text-green-500"
                }`}
              >
                {memoryStatus.status.toUpperCase()}
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card
            className={`border-l-4 ${
              streamingStatus.status === "high"
                ? "border-red-500"
                : streamingStatus.status === "medium"
                ? "border-yellow-500"
                : "border-green-500"
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Streams
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {memoryStats.streaming.activeStreams}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently streaming
              </p>
              <Badge
                variant="outline"
                className={`mt-2 ${
                  streamingStatus.status === "high"
                    ? "border-red-500 text-red-500"
                    : streamingStatus.status === "medium"
                    ? "border-yellow-500 text-yellow-500"
                    : "border-green-500 text-green-500"
                }`}
              >
                {streamingStatus.status.toUpperCase()}
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Server Uptime
              </CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatUptime(memoryStats.uptime)}
              </div>
              <p className="text-xs text-muted-foreground">
                Since last restart
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Memory Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MemoryStick className="h-5 w-5" />
                <span>Memory Usage</span>
              </CardTitle>
              <CardDescription>Detailed memory breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <HardDrive className="w-4 h-4" />
                    <span className="font-medium">RSS Memory</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {memoryStats.memory.rss} MB
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Resident Set Size
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Cpu className="w-4 h-4" />
                    <span className="font-medium">Heap Total</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {memoryStats.memory.heapTotal} MB
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total allocated
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-4 h-4" />
                    <span className="font-medium">Heap Used</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {memoryStats.memory.heapUsed} MB
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Currently used
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-4 h-4" />
                    <span className="font-medium">External</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {memoryStats.memory.external} MB
                    </div>
                    <div className="text-sm text-muted-foreground">
                      External memory
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Streaming Statistics</span>
              </CardTitle>
              <CardDescription>
                Video streaming performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-4 h-4" />
                    <span className="font-medium">Active Streams</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {memoryStats.streaming.activeStreams}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Currently active
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <HardDrive className="w-4 h-4" />
                    <span className="font-medium">Total Bytes Streamed</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatBytes(memoryStats.streaming.totalBytesStreamed)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Since startup
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <MemoryStick className="w-4 h-4" />
                    <span className="font-medium">Peak Memory Usage</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {memoryStats.memory.peakUsage} MB
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Highest recorded
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Server className="w-4 h-4" />
                    <span className="font-medium">Server Uptime</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatUptime(memoryStats.uptime)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Time running
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Memory Usage Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Memory Usage Visualization</CardTitle>
            <CardDescription>
              Current memory allocation breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Heap Usage Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Heap Usage</span>
                  <span>
                    {(
                      (memoryStats.memory.heapUsed /
                        memoryStats.memory.heapTotal) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      memoryStatus.status === "critical"
                        ? "bg-red-500"
                        : memoryStatus.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${
                        (memoryStats.memory.heapUsed /
                          memoryStats.memory.heapTotal) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* RSS vs Heap */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>RSS vs Heap</span>
                  <span>
                    {(
                      (memoryStats.memory.heapUsed / memoryStats.memory.rss) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{
                      width: `${
                        (memoryStats.memory.heapUsed / memoryStats.memory.rss) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MemoryMonitor;
