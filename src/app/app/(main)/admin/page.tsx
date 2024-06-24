"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import Link from "next/link";
import {
  type ClassAttributes,
  type HTMLAttributes,
  type JSX,
  useEffect,
  useState,
} from "react";
import { api } from "~/trpc/react";

export default function AdminPanel() {
  // Total of users
  const { data: totalUsersCount } = api.admin.getUsersCount.useQuery();
  const [totalUser, setTotalUser] = useState<number>(0);

  // Active users
  const { data: activeUsersCount } = api.admin.getActiveUsersCount.useQuery();
  const [activeUser, setActiveUser] = useState<number>(0);

  // Number of Groups
  const { data: groupsCount } = api.admin.getGroupsCount.useQuery();
  const [groups, setGroups] = useState<number>(0);

  // Number of Events
  const { data: eventsCount } = api.admin.getEventsCount.useQuery();
  const [events, setEvents] = useState<number>(0);

  // Users + Active Users par mois
  const { data: usersByMonth } = api.admin.getUsersByMonth.useQuery();
  const { data: activeUsersByMonth } =
    api.admin.getActiveUsersByMonth.useQuery();

  // Groups + Events par mois
  const { data: groupsByMonth } = api.admin.getGroupsByMonth.useQuery();
  const { data: eventsByMonth } = api.admin.getEventsByMonth.useQuery();

  // Notif + Chat par mois
  const { data: messagesByMonth } = api.admin.getMessagesByMonth.useQuery();
  const { data: notificationsByMonth } =
    api.admin.getNotificationsByMonth.useQuery();

  useEffect(() => {
    if (totalUsersCount) {
      setTotalUser(totalUsersCount.count);
    }
  }, [totalUsersCount]);

  useEffect(() => {
    if (activeUsersCount) {
      setActiveUser(activeUsersCount.count);
    }
  }, [activeUsersCount]);

  useEffect(() => {
    if (groupsCount) {
      setGroups(groupsCount.count);
    }
  }, [groupsCount]);

  useEffect(() => {
    if (eventsCount) {
      setEvents(eventsCount.count);
    }
  }, [eventsCount]);

  const generateSampleData = api.data.generateData.useMutation({
    onSuccess: () => console.log("Sample data generated successfully"),
  });

  const handleGenerateData = () => {
    generateSampleData.mutate();
  };

  return (
    <>
      {/* Header propre au admin */}
      <div className="bg-surface fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between border-inverse-surface px-2">
        <div className="flex-1 justify-between text-on-surface">
          <p className="text-2xl font-semibold text-on-surface">
            Summer Hangover
          </p>
        </div>
        <div className="flex justify-around space-x-3 text-on-surface-variant">
          <Link
            href="/app"
            replace={true}
            passHref
            className="relative flex items-center justify-center"
          >
            <span style={{ fontSize: 42 }} className="material-icons">
              home
            </span>
          </Link>
          <Link
            href="/app/profile"
            passHref
            className="relative flex items-center justify-center "
          >
            <span style={{ fontSize: 36 }} className="material-icons">
              account_circle
            </span>
          </Link>
        </div>
      </div>
      {/* Main content */}
      <div className="flex h-screen flex-col">
        <div className="mb-18 bg-surface mt-16 flex h-screen flex-col overflow-y-auto p-1 text-[#414940]">
          <div className="scrollbar-none flex-1 overflow-auto text-[#414940]">
            {/* Générals Info Block */}
            <div className="grid grid-cols-2 gap-4 p-4 text-[#414940] md:grid-cols-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-2">
                  <span
                    style={{ fontSize: 40 }}
                    className="material-icons items-center justify-between text-[#414940]"
                  >
                    person
                  </span>
                  <div className="text-2xl font-bold text-[#414940]">
                    {totalUser}
                  </div>
                  <p className="text-sm font-semibold text-[#414940]">
                    Total of users
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-2">
                  <span
                    style={{ fontSize: 40 }}
                    className="material-icons items-center justify-between text-[#414940]"
                  >
                    diversity_3
                  </span>
                  <div className="text-2xl font-bold text-[#414940]">
                    {groups}
                  </div>
                  <p className="text-center text-sm font-semibold text-[#414940]">
                    Number Of Groups
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-2">
                  <span
                    style={{ fontSize: 40 }}
                    className="material-icons items-center justify-between text-[#414940]"
                  >
                    speed
                  </span>
                  <div className="text-2xl font-bold text-[#414940]">
                    {activeUser}
                  </div>
                  <p className="text-center text-sm font-semibold text-[#414940]">
                    Active Users
                  </p>
                  <p className="px-4 text-center text-xs text-[#414940]">
                    (session of less than 7 days){" "}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-2">
                  <span
                    style={{ fontSize: 40 }}
                    className="material-icons items-center justify-between text-[#414940]"
                  >
                    local_activity
                  </span>
                  <div className="text-2xl font-bold text-[#414940]">
                    {events}
                  </div>
                  <p className="text-center text-sm font-semibold text-[#414940]">
                    Number Of Events
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Graph part */}
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
              {/* Total Of Users BarChart Graph */}
              <Card>
                <CardHeader
                  title={
                    <p className="text-center text-2xl font-bold text-[#414940]">
                      Number Of Users
                    </p>
                  }
                />
                <CardContent>
                  <BarChart
                    className="aspect-[5/3]"
                    color="#76AA75"
                    data={usersByMonth}
                  />
                </CardContent>
              </Card>
              {/* Active Users BarChart Graph */}
              <Card>
                <CardHeader
                  title={
                    <p className="text-center text-2xl font-bold text-[#414940]">
                      Active Users
                    </p>
                  }
                />
                <CardContent>
                  <BarChart
                    className="aspect-[5/3]"
                    color="#e11d48"
                    data={activeUsersByMonth}
                  />
                </CardContent>
              </Card>
              {/* Total of Groups + Event LineChart Graph */}
              <Card className="pb-4">
                <CardHeader
                  title={
                    <p className="-mb-6 text-center text-2xl font-semibold text-[#414940]">
                      App Usage Activity
                    </p>
                  }
                />
                <CardContent>
                  <DoubleLineChart
                    className="aspect-[5/3]"
                    color={
                      ["#06AA75", "#e11d48"] as string | (string & string[])
                    }
                    firstData={groupsByMonth}
                    secondData={eventsByMonth}
                  />
                </CardContent>
                <div className="mt-4 flex items-center justify-evenly ">
                  <div className="flex items-center gap-2 pl-6">
                    <div
                      style={{ backgroundColor: "#e11d48" }}
                      className="bg-error h-4 w-4 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm">Number</span>
                      <span className="text-sm">of groups</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      style={{ backgroundColor: "#06AA75" }}
                      className="h-4 w-4 flex-col rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm">Number</span>
                      <span className="text-sm">of event</span>
                    </div>
                  </div>
                </div>
              </Card>
              {/* Pusher Activity (chat + notif) LineChart Graph */}
              <Card className="pb-0">
                <CardHeader
                  title={
                    <p className="-mb-6 text-center text-2xl font-semibold text-[#414940]">
                      Pusher Metrics
                    </p>
                  }
                />
                <CardContent>
                  <DoubleLineChart
                    className="aspect-[5/3]"
                    color={
                      ["#2563EB", "#FF3040"] as string | (string & string[])
                    }
                    firstData={messagesByMonth}
                    secondData={notificationsByMonth}
                  />
                  <div className="mt-4 flex items-center justify-evenly">
                    <div className="flex items-center gap-2 pl-6">
                      <div
                        style={{ backgroundColor: "#FF3040" }}
                        className="bg-error h-4 w-4 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm">Number</span>
                        <span className="text-sm">of notifications</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        style={{ backgroundColor: "#2563EB" }}
                        className="h-4 w-4 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm">Number</span>
                        <span className="text-sm">of messages</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add sample data button */}
            <div className="mt-10 flex justify-center p-4">
              <button
                onClick={handleGenerateData}
                className="bg-primary rounded-md px-4 py-2 text-on-primary"
              >
                Add Sample Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Fonction pour trier les données par date (année-mois)
const sortByDate = (a: { month: string }, b: { month: string }) => {
  return new Date(a.month).getTime() - new Date(b.month).getTime();
};

function getMonthString(monthNumber: number) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[monthNumber - 1];
}

function getDateString(date: string) {
  const [year, month] = date.split("-");
  if (month === "01") return `${getMonthString(Number(month))} ${year}`;
  return `${getMonthString(Number(month))}`;
}

function BarChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement> & {
      color: string;
      data?: { month: string; count: number }[];
    },
) {
  // On inclus que les 6 derniers mois (pour pas avoir trop de barres sur le graphique)
  const filteredData = props.data
    ?.filter((item) => item.month !== null && item.month !== undefined)
    ?.sort(sortByDate) // trier par date
    ?.slice(-6) // prendre les 6 derniers mois (=> les 6 plus récents)
    ?.map((item) => ({
      name: getDateString(item.month),
      count: item.count,
    })) ?? [
    { name: "Jan", count: 34 },
    { name: "Feb", count: 27 },
    { name: "Mar", count: 73 },
    { name: "Apr", count: 108 },
    { name: "May", count: 135 },
    { name: "Jun", count: 87 },
  ];

  return (
    <div {...props}>
      <ResponsiveBar
        data={filteredData}
        keys={["count"]} // count par name => x : name (date), y : count
        indexBy="name"
        margin={{ top: 10, right: -5, bottom: 60, left: 40 }}
        padding={0.3}
        colors={[props.color]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

function DoubleLineChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement> & {
      color: string | string[];
      firstData?: { month: string; count: number }[];
      secondData?: { month: string; count: number }[];
    },
) {
  // Pour s'assurer que color est un tableau :
  const colors = Array.isArray(props.color) ? props.color : [props.color];

  const firstFormattedData =
    props.firstData
      ?.filter((item) => item.month !== null && item.month !== undefined)
      ?.sort(sortByDate)
      ?.slice(-6)
      ?.map((item) => ({
        x: item.month,
        y: item.count,
      })) ?? [];

  const secondFormattedData =
    props.secondData
      ?.filter((item) => item.month !== null && item.month !== undefined)
      ?.sort(sortByDate)
      ?.slice(-6)
      ?.map((item) => ({
        x: item.month,
        y: item.count,
      })) ?? [];

  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "first",
            data: firstFormattedData,
          },
          {
            id: "second",
            data: secondFormattedData,
          },
        ]}
        margin={{ top: 10, right: 20, bottom: 30, left: 42 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={colors}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
