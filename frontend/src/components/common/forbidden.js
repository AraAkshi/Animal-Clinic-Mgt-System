import React from 'react';

function Forbidden() {
	let str = document.getElementById('demo');
	console.log(str);
	let i = 0;
	// document.getElementById('demo')[0].innerHTML = '';

	// setTimeout(function () {
	// 	let se = setInterval(function () {
	// 		i++;
	// 		document.getElementById('demo')[0].innerHTML = str.slice(0, i) + '|';
	// 		if (i == str.length) {
	// 			clearInterval(se);
	// 			document.getElementById('demo')[0].innerHTML = str;
	// 		}
	// 	}, 10);
	// }, 0);

	return (
		<div className='error-body'>
			<h1 className='error-no'>403</h1>
			<div className='error-msg' id='demo'>
				<p>
					&gt; <span>ERROR CODE</span>: "<i>HTTP 403 Forbidden</i>"
				</p>
				<p>
					&gt; <span>ERROR DESCRIPTION</span>: "
					<i>
						Access Denied. You Do Not Have The Permission To Access This Page On
						This Server
					</i>
					"
				</p>
				<p>
					&gt; <span>ERROR POSSIBLY CAUSED BY</span>: [
					<b>
						execute access forbidden, read access forbidden, write access
						forbidden, ssl required, ssl 128 required, ip address rejected,
						client certificate required, site access denied, too many users,
						invalid configuration, password change, mapper denied access, client
						certificate revoked, directory listing denied, client access
						licenses exceeded, client certificate is untrusted or invalid,
						client certificate has expired or is not yet valid, passport logon
						failed, source access denied, infinite depth is denied, too many
						requests from the same client ip
					</b>
					...]
				</p>
				<p>
					&gt;{' '}
					<span>
						SOME PAGES ON THIS SERVER THAT YOU DO HAVE PERMISSION TO ACCESS
					</span>
					:
					{localStorage.userRole === 'employee' ? (
						<p>
							[<a href='/admin/dashboard'>Dashboard</a>,
							<a href='/admin/animals'>Animals</a>,
							<a href='/admin/appointments'>Appointments</a>,
							<a href='/admin/treatments'>Treatments</a>,
							<a href='/admin/inventory'>Inventory</a>...]
						</p>
					) : (
						<p>
							[<a href='/about-us'>About Us</a>, <a href='/services'>Service</a>
							, <a href='/'>Home</a>...]
						</p>
					)}
				</p>
				<p>
					&gt; <span>HAVE A NICE DAY :-)</span>
				</p>
			</div>
		</div>
	);
}

export default Forbidden;
