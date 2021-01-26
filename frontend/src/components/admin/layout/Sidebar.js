import { Button, Container } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <div className="sidebar">
        <ul>
          <li>
            <Button variant="text" href="/dashboard">
              DASHBOARD
            </Button>
          </li>
          <li>
            <Button variant="text" href="/sale-vehicles">
              APPOINTMENTS
            </Button>
          </li>
          <li>
            <Button variant="text" href="/online-vehicles">
              ANIMALS
            </Button>
          </li>
          <li>
            <Button variant="text" href="/inquiries">
              REMINDERS
            </Button>
          </li>
          <li>
            <Button variant="text" href="/appointments">
              INVENTORY
            </Button>
          </li>
          <li>
            <Button variant="text" href="/reports">
              REPORTS
            </Button>
          </li>
          <li>
            <Button variant="text" href="/employees">
              EMPLOYEES
            </Button>
          </li>
          <li>
            <Button variant="text" href="/employees">
              CUSTOMERS
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
