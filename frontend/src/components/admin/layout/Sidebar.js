import { Button } from '@material-ui/core';
import React from 'react';
import Footer from './Footer';

function Sidebar() {
	return (
		<div>
			<div className='sidebar'>
				<ul>
					<li>
						<Button variant='text' href='/admin/dashboard'>
							DASHBOARD
						</Button>
					</li>
					<li>
						<Button variant='text' href='/admin/appointments'>
							APPOINTMENTS
						</Button>
					</li>
					<li>
						<Button variant='text' href='/admin/animals'>
							ANIMALS
						</Button>
					</li>
					<li>
						<Button variant='text' href='/admin/treatments'>
							TREATMENTS
						</Button>
					</li>
					<li>
						<Button variant='text' href='/admin/inventory'>
							INVENTORY
						</Button>
					</li>
					<li>
						<Button variant='text' href='/admin/reports'>
							REPORTS
						</Button>
					</li>
					<li>
						<Button variant='text' href='/admin/employees'>
							EMPLOYEES
						</Button>
					</li>
					<li>
						<Button variant='text' href='/admin/customers'>
							CUSTOMERS
						</Button>
					</li>
				</ul>
				<Footer />
			</div>
		</div>
	);
}

export default Sidebar;
