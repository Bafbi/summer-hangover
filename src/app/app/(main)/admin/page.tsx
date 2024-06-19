"use client";


import Link from "next/link";
import { AppHeader } from "~/app/_components/mainMenuHeader";
import { api } from "~/trpc/server";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { JSX, ClassAttributes, HTMLAttributes } from "react";

export default function AdminPanel() {
  

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
        <div className="mb-18 bg-surface mt-16 flex flex-col h-screen overflow-y-auto p-4 text-[#414940]">
            <div className="flex-1 overflow-auto scrollbar-none text-[#414940]">
                <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4 text-[#414940]">
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center gap-2">
                        <span
                            style={{ fontSize: 40 }}  
                            className="material-icons items-center justify-between text-[#414940]">
                            person
                        </span>
                        <div className="text-2xl font-bold text-[#414940]">1,234</div>
                        <p className="text-sm text-[#414940]">Total of users</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center gap-2">
                        <span
                            style={{ fontSize: 40 }}  
                            className="material-icons items-center justify-between text-[#414940]">
                            dns
                        </span>
                        <div className="text-2xl font-bold text-[#414940]">87%</div>
                        <p className="text-sm text-muted-foreground text-[#414940]">Server Capacity</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center gap-2">
                        <span
                            style={{ fontSize: 40 }}  
                            className="material-icons items-center justify-between text-[#414940]">
                            speed
                        </span>
                        <div className="text-2xl font-bold text-[#414940]">47</div>
                        <p className="text-sm text-muted-foreground text-[#414940]">Active Users</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center gap-2">
                        <span
                            style={{ fontSize: 40 }} 
                            className="material-icons items-center justify-between text-[#414940]">
                            local_activity
                        </span>
                        <div className="text-2xl font-bold text-[#414940]">68</div>
                        <p className="text-sm text-muted-foreground text-[#414940]">Total Of Event</p>
                        </CardContent>
                    </Card>
                    </div>
                    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                    <Card>
                        <CardHeader title={<p className="text-center text-2xl font-bold text-[#414940]">Device Usage</p>} />
                        <CardContent>
                        <BarChart className="aspect-[4/3]" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title={<p className="text-center text-2xl font-semibold text-[#414940]">Activity</p>} />
                        <CardContent>
                        <LineChart className="aspect-[4/3]" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

function BarChart(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) {
return (
    <div {...props}>
    <ResponsiveBar
        data={[
        { name: "Jan", count: 111 },
        { name: "Feb", count: 157 },
        { name: "Mar", count: 129 },
        { name: "Apr", count: 150 },
        { name: "May", count: 119 },
        { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#76AA75"]}
        axisBottom={{
        tickSize: 0,
        tickPadding: 16,
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
)
}

function LineChart(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) {
return (
    <div {...props}>
    <ResponsiveLine
        data={[
        {
            id: "Desktop",
            data: [
            { x: "Jan", y: 43 },
            { x: "Feb", y: 137 },
            { x: "Mar", y: 61 },
            { x: "Apr", y: 145 },
            { x: "May", y: 26 },
            { x: "Jun", y: 154 },
            ],
        },
        {
            id: "Mobile",
            data: [
            { x: "Jan", y: 60 },
            { x: "Feb", y: 48 },
            { x: "Mar", y: 177 },
            { x: "Apr", y: 78 },
            { x: "May", y: 96 },
            { x: "Jun", y: 204 },
            ],
        },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
        type: "point",
        }}
        yScale={{
        type: "linear",
        }}
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
        colors={["#76AA75", "#e11d48"]}
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
)
}