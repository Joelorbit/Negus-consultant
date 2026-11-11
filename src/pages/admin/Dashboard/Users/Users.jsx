import React, { useState, useMemo } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  useRealtimeUsers,
  useDailyActiveUsers,
  useAggregatedUsers,
  useUsers,
} from "../../../../hooks/useAnalytics";
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
  Users,
  TrendingUp,
  Eye,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Activity,
  BarChart3,
  PieChart,
  RefreshCw,
} from "lucide-react";
import UsersTable from "./components/UsersTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const UserAnalytics = () => {
  const { data: users } = useUsers();
  const [range, setRange] = useState("daily");

  const { data: dailyData = [], isLoading: dailyLoading } =
    useDailyActiveUsers(30);
  const { data: realtimeData = [], isLoading: realtimeLoading } =
    useRealtimeUsers();
  const { isLoading: aggregatedLoading } = useAggregatedUsers(range);

  const loading = dailyLoading || realtimeLoading || aggregatedLoading;

  // Calculate key metrics
  const metrics = useMemo(() => {
    if (!dailyData.length) return {};

    const totalActiveUsers = dailyData.reduce(
      (sum, d) => sum + +d.activeUsers,
      0
    );
    const totalNewUsers = dailyData.reduce((sum, d) => sum + +d.newUsers, 0);
    const totalPageViews = dailyData.reduce((sum, d) => sum + +d.pageViews, 0);
    const totalSessions = dailyData.reduce((sum, d) => sum + +d.sessions, 0);

    // Device breakdown
    const deviceStats = dailyData.reduce((acc, d) => {
      if (!acc[d.device]) {
        acc[d.device] = {
          activeUsers: 0,
          newUsers: 0,
          pageViews: 0,
          sessions: 0,
        };
      }
      acc[d.device].activeUsers += +d.activeUsers;
      acc[d.device].newUsers += +d.newUsers;
      acc[d.device].pageViews += +d.pageViews;
      acc[d.device].sessions += +d.sessions;
      return acc;
    }, {});

    // Country breakdown
    const countryStats = dailyData.reduce((acc, d) => {
      if (!acc[d.country]) {
        acc[d.country] = {
          activeUsers: 0,
          newUsers: 0,
          pageViews: 0,
          sessions: 0,
        };
      }
      acc[d.country].activeUsers += +d.activeUsers;
      acc[d.country].newUsers += +d.newUsers;
      acc[d.country].pageViews += +d.pageViews;
      acc[d.country].sessions += +d.sessions;
      return acc;
    }, {});

    // Calculate growth rates
    const recentData = dailyData.slice(-7);
    const previousData = dailyData.slice(-14, -7);

    const recentAvg =
      recentData.reduce((sum, d) => sum + +d.activeUsers, 0) /
      recentData.length;
    const previousAvg =
      previousData.reduce((sum, d) => sum + +d.activeUsers, 0) /
      previousData.length;
    const growthRate =
      previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg) * 100 : 0;

    return {
      totalActiveUsers,
      totalNewUsers,
      totalPageViews,
      totalSessions,
      deviceStats,
      countryStats,
      growthRate,
      avgSessionDuration:
        totalSessions > 0 ? (totalPageViews / totalSessions).toFixed(2) : 0,
    };
  }, [dailyData]);

  // Chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: "Inter, sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        intersect: false,
        mode: "index",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: "Inter, sans-serif",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 11,
            family: "Inter, sans-serif",
          },
        },
      },
    },
  };

  // Device breakdown chart
  const deviceChartData = {
    labels: Object.keys(metrics.deviceStats || {}),
    datasets: [
      {
        label: "Active Users",
        data: Object.values(metrics.deviceStats || {}).map(
          (stat) => stat.activeUsers
        ),
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  // Daily active users trend
  const dailyTrendData = {
    labels: [...new Set(dailyData.map((d) => d.date))].slice(-14),
    datasets: [
      {
        label: "Active Users",
        data: [...new Set(dailyData.map((d) => d.date))]
          .slice(-14)
          .map((date) => {
            return dailyData
              .filter((d) => d.date === date)
              .reduce((sum, d) => sum + +d.activeUsers, 0);
          }),
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // Realtime users chart
  const realtimeChartData = {
    labels: realtimeData.map((d) => `${d.minutesAgo}m`),
    datasets: [
      {
        label: "Active Users",
        data: realtimeData.map((d) => +d.activeUsers),
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(34, 197, 94, 1)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Country distribution
  const topCountries = Object.entries(metrics.countryStats || {})
    .sort(([, a], [, b]) => b.activeUsers - a.activeUsers)
    .slice(0, 5);

  const countryChartData = {
    labels: topCountries.map(([country]) => country),
    datasets: [
      {
        data: topCountries.map(([, stats]) => stats.activeUsers),
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(168, 85, 247, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const getDeviceIcon = (device) => {
    switch (device.toLowerCase()) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "desktop":
        return <Monitor className="w-4 h-4" />;
      case "tablet":
        return <Tablet className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into user behavior and engagement
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={range === "daily" ? "default" : "outline"}
            size="sm"
            onClick={() => setRange("daily")}
          >
            Daily
          </Button>
          <Button
            variant={range === "weekly" ? "default" : "outline"}
            size="sm"
            onClick={() => setRange("weekly")}
          >
            Weekly
          </Button>
          <Button
            variant={range === "monthly" ? "default" : "outline"}
            size="sm"
            onClick={() => setRange("monthly")}
          >
            Monthly
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.totalActiveUsers?.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span
                  className={
                    metrics.growthRate >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {metrics.growthRate >= 0 ? "+" : ""}
                  {metrics.growthRate?.toFixed(1)}%
                </span>
                <span>from last week</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.totalNewUsers?.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
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
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.totalPageViews?.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {metrics.avgSessionDuration} pages per session
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Sessions
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.totalSessions?.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Active Users Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Daily Active Users Trend</span>
              </CardTitle>
              <CardDescription>Last 14 days performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={dailyTrendData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Device Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Device Distribution</span>
              </CardTitle>
              <CardDescription>Active users by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Doughnut data={deviceChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Real-time and Geographic Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Real-time Active Users</span>
                <Badge variant="secondary" className="ml-auto">
                  Live
                </Badge>
              </CardTitle>
              <CardDescription>Last 30 minutes activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={realtimeChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Countries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Top Countries</span>
              </CardTitle>
              <CardDescription>Active users by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Pie data={countryChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Analytics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Device Analytics</CardTitle>
              <CardDescription>
                Detailed breakdown by device type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(metrics.deviceStats || {}).map(
                  ([device, stats]) => (
                    <div
                      key={device}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center space-x-3">
                        {getDeviceIcon(device)}
                        <span className="font-medium capitalize">{device}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {stats.activeUsers.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stats.newUsers.toLocaleString()} new
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Country Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Geographic Analytics</CardTitle>
              <CardDescription>Top performing countries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCountries.map(([country, stats], index) => (
                  <div
                    key={country}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant="outline"
                        className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                      >
                        {index + 1}
                      </Badge>
                      <span className="font-medium">{country}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {stats.activeUsers.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stats.sessions.toLocaleString()} sessions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {users && <UsersTable users={users?.users} />}
    </div>
  );
};

export default UserAnalytics;
