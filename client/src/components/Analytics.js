import React from "react";
import { Progress } from "antd";

const Analytics = ({ alltask }) => {
  //totaltasks
  const totalTask = alltask.length;
  const totalAcademicTask = alltask.filter((task) => task.type === "Academic");
  const totalPersonalTask = alltask.filter((task) => task.type === "Personal");
  const totalClubTask = alltask.filter((task) => task.type === "Club");
  const totalOtherTask = alltask.filter((task) => task.type === "Other");
  const totalAcademicPercent = (totalAcademicTask.length / totalTask) * 100;
  const totalPersonalPercent = (totalPersonalTask.length / totalTask) * 100;
  const totalClubPercent = (totalClubTask.length / totalTask) * 100;
  const totalOtherPercent = (totalOtherTask.length / totalTask) * 100;

  //totalHours
  const totalHours = alltask.reduce((acc, task) => acc + task.hours, 0);
  const totalAcademicHours = alltask
    .filter((task) => task.type === "Academic")
    .reduce((acc, task) => acc + task.hours, 0);
  const totalPersonalHours = alltask
    .filter((task) => task.type === "Personal")
    .reduce((acc, task) => acc + task.hours, 0);
  const totalClubHours = alltask
    .filter((task) => task.type === "Club")
    .reduce((acc, task) => acc + task.hours, 0);
  const totalOtherHours = alltask
    .filter((task) => task.type === "Other")
    .reduce((acc, task) => acc + task.hours, 0);

  const totalAcademicHoursPercent = (totalAcademicHours / totalHours) * 100;
  const totalPersonalHoursPercent = (totalPersonalHours / totalHours) * 100;
  const totalClubHoursPercent = (totalClubHours / totalHours) * 100;
  const totalOtherHoursPercent = (totalOtherHours / totalHours) * 100;

  return (
    <>
      <div className="row m-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Total Tasks:{totalTask}</div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-3">
                  <h5>Academic: {totalAcademicTask.length}</h5>
                  <Progress
                    type="circle"
                    strokeColor="blue"
                    className="mx-2"
                    percent={totalAcademicPercent.toFixed(0)}
                  />
                </div>
                <div className="col-3">
                  <h5>Personal: {totalPersonalTask.length}</h5>
                  <Progress
                    type="circle"
                    strokeColor="green"
                    className="mx-2"
                    percent={totalPersonalPercent.toFixed(0)}
                  />
                </div>
                <div className="col-3">
                  <h5>Club: {totalClubTask.length}</h5>
                  <Progress
                    type="circle"
                    strokeColor="violet"
                    className="mx-2"
                    percent={totalClubPercent.toFixed(0)}
                  />
                </div>
                <div className="col-3">
                  <h5>Other: {totalOtherTask.length}</h5>
                  <Progress
                    type="circle"
                    strokeColor="red"
                    className="mx-2"
                    percent={totalOtherPercent.toFixed(0)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Total Hours:{totalHours}</div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-3">
                  <h5>Academic: {totalAcademicHours}</h5>
                  <Progress
                    type="circle"
                    strokeColor="blue"
                    className="mx-2"
                    percent={totalAcademicHoursPercent.toFixed(0)}
                  />
                </div>
                <div className="col-3">
                  <h5>Personal: {totalPersonalHours}</h5>
                  <Progress
                    type="circle"
                    strokeColor="green"
                    className="mx-2"
                    percent={totalPersonalHoursPercent.toFixed(0)}
                  />
                </div>
                <div className="col-3">
                  <h5>Club: {totalOtherHours}</h5>
                  <Progress
                    type="circle"
                    strokeColor="violet"
                    className="mx-2"
                    percent={totalClubHoursPercent.toFixed(0)}
                  />
                </div>
                <div className="col-3">
                  <h5>Other: {totalOtherHours}</h5>
                  <Progress
                    type="circle"
                    strokeColor="red"
                    className="mx-2"
                    percent={totalOtherHoursPercent.toFixed(0)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
